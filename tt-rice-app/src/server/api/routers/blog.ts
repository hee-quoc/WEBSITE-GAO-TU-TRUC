// src/server/api/routers/blog.ts (or wherever you create blogs)
import { z } from "zod";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { s3Client } from "~/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import {generateUniqueSlug} from "../../utils/utils"



export const blogRouter = createTRPCRouter({
  create: publicProcedure
    .input(
        z.object({
          title: z.string(),
          thumbnail: z.string().startsWith('data:image/'),
          blocks: z.array(
            z.object({
              type: z.string(),
              payload: z.record(z.unknown()),
            }),
          ),
        }),
      )
    // .input(
    //   z.object({
    //     title: z.string().min(1),
    //     content: z.string(),
    //     bannerImageUrl: z.string().url().optional(), // Expect a URL for the banner
    //     contentImageUrls: z.array( // Expect an array of URLs for content images
    //       z.object({
    //         url: z.string().url(),
    //         altText: z.string().optional(),
    //         order: z.number().optional(),
    //       })
    //     ).optional(),
    //   })
    // )
    .mutation(async ({ ctx, input }) => {
      const uniqueSlug = await generateUniqueSlug(input.title);
      const { title, thumbnail, blocks } = input;
      const timestamp = new Date().toISOString();
      const folderPath = `blogs/${timestamp.substring(0, 10)}/${uniqueSlug}`;

      // Upload thumbnail
      const [thumbMeta, thumbBase64] = thumbnail.split(',');
      if (!thumbBase64) throw new Error('Invalid thumbnail image');
      const thumbExt = thumbMeta?.split('/')[1]?.split(';')[0];
      const thumbBuffer = Buffer.from(thumbBase64, 'base64');
      const thumbKey = `${folderPath}/thumbnail.${thumbExt}`;
      const thumbUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${thumbKey}`;
      
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: thumbKey,
          Body: thumbBuffer,
          ContentEncoding: 'base64',
          ContentType: `image/${thumbExt}`,
        }),
      );

       const imagesData: {
          url: string;
          altText?: string;
          order: number;
        }[] = [];

       const processedBlocks = await Promise.all(
        blocks.map(async (block, idx) => {
          if (block.type === 'image' && typeof block.payload.image === 'string') {
            const [imgMeta, imgBase64] = block.payload.image.split(',');
            if (!imgBase64) throw new Error(`Invalid base64 in block ${idx}`);
            const imgExt = imgMeta?.split('/')[1]?.split(';')[0];
            const imgBuffer = Buffer.from(imgBase64, 'base64');
            const imgKey = `${folderPath}/block-image-${idx}.${imgExt}`;


            await s3Client.send(
              new PutObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: imgKey,
                Body: imgBuffer,
                ContentEncoding: 'base64',
                ContentType: `image/${imgExt}`,
              }),
            );
            const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${imgKey}`;
            
            // block.payload.caption = undefined
            block.payload.image = url

            imagesData.push({
              url,
              altText: (block.payload.caption as string),
              order: idx,
            });
          }

          return block;
        }),
      );

      return ctx.db.blog.create({
        data: {
          title: title,
          slug: uniqueSlug,
          content: JSON.stringify(processedBlocks),
          thumbnailUrl: thumbUrl,
          // Use a nested 'create' to add the related images in the same transaction
          contentImages: {
            create: imagesData.map((img) => ({
              url: img.url,
              altText: img.altText,
              order: img.order,
            })),
          },
        },
      });
    }),

  // Your getBySlug would now need to include the images
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string()}))
    .query(async ({ ctx, input }) => {
      return ctx.db.blog.findUnique({
        where: { slug: input.slug },
        include: {
          contentImages: {
            orderBy: {
              order: 'asc', // Ensure they are in the correct order
            },
          },
        },
      });
    }),
  update: protectedProcedure
  .input(
    z.object({
      slug: z.string(), // We'll use the blog's ID to find it
      title: z.string().min(1),
      content: z.string(),
      // Add other fields you want to update, like bannerImageUrl
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Note: We are not updating the slug here to prevent breaking old links.
    // If you want to update the slug, you would need more complex logic.
    return ctx.db.blog.update({
      where: { slug: input.slug },
      data: {
        title: input.title,
        content: input.content,
      },
    });
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