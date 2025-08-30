// src/server/api/routers/blog.ts (or wherever you create blogs)
import { z } from "zod";
// import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
// import { db } from "~/server/db";
import { s3Client } from "~/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {deleteS3ObjectByUrl} from "../../s3";
import {generateUniqueSlug} from "../../utils/utils"
import { Prisma } from "@prisma/client";
import { triggerRevalidation } from "../../utils/utils";
import { TRPCError } from "@trpc/server";




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
  // getAll: publicProcedure
  //     .input(z.object({ tag: z.string().optional() }))
  //     .query(({ ctx, input }) => {
  //       const { tag } = input;
  
  //       return ctx.db.blog.findMany({
  //         where: tag
  //           ? { tag: {equals: tag} } // tag is now a String
  //           : {},
  //         orderBy: { createdAt: "asc" },
  //       });
  //     }),
  create: protectedProcedure //TManh to do: thêm crediential 
    .input(
        z.object({
          tag: z.string(),
          title: z.string(),
          thumbnail: z.string(),
          blocks: BlocksSchema.optional(),
        }),
      )
    .mutation(async ({ ctx, input }) => {
      const uniqueSlug = await generateUniqueSlug(input.title);
      const { title, tag, thumbnail, blocks } = input;
    
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

      const userId = ctx.session.user.id;
      const newBlog = await ctx.db.blog.create({
        data: {
          tag:tag, 
          title: title,
          slug: uniqueSlug,
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
    .input(z.object({ slug: z.string()}))
    .query(async ({ ctx, input }) => {
      const blog = await ctx.db.blog.findUnique({
        where: { slug: input.slug },
        include: {
          contentImages: {
            orderBy: {
              order: 'asc', // Ensure they are in the correct order
            },
          },
          user: true,
        },
      });
      if (!blog) {
        return null;
      }
      const contentParseBlog = BlocksSchema.safeParse(blog?.content)
      if (!contentParseBlog.success) {
        // xử lý dữ liệu không hợp lệ
        console.warn("Invalid content shape", contentParseBlog.error);
        return { ...blog, content: [] as Block[] };
      }
      return { ...blog, content: contentParseBlog.data};
    }),
  update: protectedProcedure //TManh to do: thêm crediential 
  .input(
     z.object({
          slug:z.string(),
          title: z.string(),
          tag:z.string(),
          thumbnail: z.string(),
          blocks: BlocksSchema,
        }),
  )
  .mutation(async ({ ctx, input }) => {
    const { slug,title, tag, thumbnail, blocks } = input;
    const userId = ctx.session.user.id;
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
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const blogToDelete = await ctx.db.blog.findUnique({
        where: { id: input.id },
        select: {
          contentImages: true,
          thumbnailUrl: true,
        },
      });

      // Handle case where product doesn't exist
      if (!blogToDelete) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Product with ID ${input.id} not found.`,
        });
      }

      // Step 2: Gather all image URLs into a single list.
      const ImageUrls = blogToDelete.contentImages
        .map((cert) => cert.url)
        .filter((url): url is string => !!url); // Filter out null/empty strings

      const allImageUrls = [
        ...(blogToDelete.thumbnailUrl ? [blogToDelete.thumbnailUrl] : []),
        ...ImageUrls,
      ];

      // Step 3: Delete all images from S3 in parallel.
      
      if (allImageUrls.length > 0) {
        await Promise.all(allImageUrls.map(url => deleteS3ObjectByUrl(url)));
      }
      await ctx.db.blog.delete({
        where: { id: input.id },
      });

      // Step 5: Trigger revalidation to update the static cache.
      void triggerRevalidation("news");

      return {
        success: true,
        message: "Blog and all associated data deleted successfully.",
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.blog.findMany({
      // Show the newest posts first
      orderBy: { createdAt: 'desc' },
      // Select only the fields needed for the card view to be efficient
      // select: {
      //     // id: true,
      //     title: true,
      //     slug: true,
      //     thumbnailUrl: true,
      //     createdAt: true,
      //     tag: true,
      // }
    });
  }),
  getLatestByTag: publicProcedure
    .input(
      z.object({
        tag: z.string(),
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const blogs = await ctx.db.blog.findMany({
        where: {
          tag: input.tag,
          id: {
            not: input.id,
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: 2,
        select: {
          title: true,
          slug: true,
          thumbnailUrl: true,
          createdAt: true,
          tag: true,
        },
      });

      return blogs;
    }),
});
