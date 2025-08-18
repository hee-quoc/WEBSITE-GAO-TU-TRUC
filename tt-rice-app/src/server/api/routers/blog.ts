// src/server/api/routers/blog.ts (or wherever you create blogs)
import { z } from "zod";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { s3Client } from "~/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {deleteS3ObjectByUrl} from "../../s3";
import {generateUniqueSlug} from "../../utils/utils"
import { Prisma } from "@prisma/client";


const BlockSchema = z.object({
  type: z.string(),
  payload: z.record(z.unknown()), // bạn có thể refine payload tuỳ type nếu muốn
});
const BlocksSchema = z.array(BlockSchema);

type Block = z.infer<typeof BlockSchema>;
function toPrismaJson<T>(v: T): Prisma.InputJsonValue {
        return JSON.parse(JSON.stringify(v)) as Prisma.InputJsonValue;
}

export const blogRouter = createTRPCRouter({
  create: protectedProcedure //TManh to do: thêm crediential 
    .input(
        z.object({
          title: z.string(),
          tag:z.string(),
          thumbnail: z.string(),
          blocks: BlocksSchema.optional(),
          userId: z.string()
        }),
      )
    .mutation(async ({ ctx, input }) => {
      const uniqueSlug = await generateUniqueSlug(input.title);
      const { title, tag, thumbnail, blocks, userId } = input;
    
       const imagesData: {
          url: string;
          altText?: string;
          order: number;
        }[] = [];
        let processedBlocks: object[] = [];
        if (blocks){
          processedBlocks = await Promise.all(
          blocks.map(async (block, idx) => {
            if (block.type === 'image' && typeof block.payload.image === 'string') {
              imagesData.push({
                url: block.payload.image,
                altText: (block.payload.caption as string),
                order: idx,
              });
            }

            return block;
          }),
        );
      }


      const newBlog = await ctx.db.blog.create({
        data: {
          title: title,
          slug: uniqueSlug,
          tag: tag,
          content: toPrismaJson(processedBlocks),
          thumbnailUrl: thumbnail,
          // Use a nested 'create' to add the related images in the same transaction
          contentImages: {
            create: imagesData.map((img) => ({
              url: img.url,
              altText: img.altText,
              order: img.order,
            })),
          },
          createdBy: userId
        },
      });

      return {
        success: true,
        message: "Blog created successfully",
        slug: newBlog.slug,
      };
    }),

  // Your getBySlug would now need to include the images
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const blog = await ctx.db.blog.findUnique({
        where: { slug: input.slug },
        include: {
          // Tell Prisma to fetch the related images as well
          contentImages: {
            orderBy: {
              order: 'asc', // Ensure they are in the correct order
            },
          },
        },
      });

      const contentParseBlog = BlocksSchema.safeParse(blog?.content)
      if (!contentParseBlog.success) {
        // xử lý dữ liệu không hợp lệ
        console.warn("Invalid content shape", contentParseBlog.error);
        return { ...blog!, content: [] as Block[] };
      }
      return { ...blog!, content: contentParseBlog.data};
    }),
  update: protectedProcedure //TManh to do: thêm crediential 
  .input(
     z.object({
          slug:z.string(),
          title: z.string(),
          tag:z.string(),
          thumbnail: z.string(),
          blocks: BlocksSchema,
          userId: z.string()
        }),
  )
  .mutation(async ({ ctx, input }) => {
    const { slug,title, tag, thumbnail, blocks, userId } = input;
    // Note: We are not updating the slug here to prevent breaking old links.
    // If you want to update the slug, you would need more complex logic.
    const oldBlogs = await ctx.db.blog.findFirst({
        where: {slug: slug },
         select: {
          thumbnailUrl: true,
          content: true,
          slug:true,
        },
      });
    const  newContentImages= blocks.map((block)=>{
      if(block.type === "image"){
        return block.payload.image
      }
    })
    const contentParseBlog = BlocksSchema.safeParse(oldBlogs?.content);
    const oldContentImages = contentParseBlog.data?.map((content)=>{
      if (content.type === "image"){
        return content.payload.image
      }
    })

    const imagesData: {
          url: string;
          altText?: string;
          order: number;
        }[] = [];

    const processedBlocks = await Promise.all(
        blocks.map(async (block, idx) => {
          if (block.type === 'image' && typeof block.payload.image === 'string') {
            imagesData.push({
              url: block.payload.image,
              altText: (block.payload.caption as string),
              order: idx,
            });
          }

          return block;
        }),
      );

    const imagesToDelete = oldContentImages?.filter((url) => !newContentImages.includes(url))
    // 5. Xóa ảnh trên S3
    await Promise.all(imagesToDelete!.map((url) => deleteS3ObjectByUrl(url as string)));

    const newUpdateBlog = await ctx.db.blog.update({
      where: { slug: input.slug },
      data: {
        title: title,
        tag: tag,
        thumbnailUrl: thumbnail,
        content: toPrismaJson(processedBlocks),
        contentImages: {
          deleteMany: {
            blogId: oldBlogs?.slug, // đảm bảo chỉ xoá ảnh của blog này
          },
          create: imagesData.map((img) => ({
            url: img.url,
            altText: img.altText,
            order: img.order,
          })),
        },
          createdBy: userId
      },
    });
    
    return {
        success: true,
        message: "Blog updated successfully",
        slug: newUpdateBlog.slug,
      };
  }),
  delete: protectedProcedure
    .input(z.object({ slug: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.delete({
        where: { slug: input.slug },
      });
    }),
    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.blog.findMany({
      // Show the newest posts first
      orderBy: { createdAt: 'desc' },
      // Select only the fields needed for the card view to be efficient
      select: {
          // id: true,
          title: true,
          slug: true,
          thumbnailUrl: true,
          createdAt: true,
          
      }
    });
  }),
});