// src/server/api/routers/blog.ts (or wherever you create blogs)
import { z } from "zod";
import slugify from "slugify";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

async function generateUniqueSlug(title: string): Promise<string> {
  const slug = slugify(title, { lower: true, strict: true });
  let count = 0;
  
  while (true) {
    const potentialSlug = count === 0 ? slug : `${slug}-${count}`;
    const existing = await db.blog.findUnique({
      where: { slug: potentialSlug },
    });
    
    if (!existing) {
      return potentialSlug; // It's unique, return it
    }
    
    count++; // It's not unique, increment counter and try again
  }
}

export const blogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        tag: z.string(),
        title: z.string().min(1),
        content: z.string(),
        bannerImageUrl: z.string().url().optional(), // Expect a URL for the banner
        contentImageUrls: z.array( // Expect an array of URLs for content images
          z.object({
            url: z.string().url(),
            altText: z.string().optional(),
            order: z.number().optional(),
          })
        ).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const uniqueSlug = await generateUniqueSlug(input.title);

      return ctx.db.blog.create({
        data: {
          tag: input.tag,
          title: input.title,
          slug: uniqueSlug,
          content: input.content,
          bannerImageUrl: input.bannerImageUrl,
          // Use a nested 'create' to add the related images in the same transaction
          contentImages: {
            create: input.contentImageUrls?.map((img) => ({
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
      id: z.string(), // We'll use the blog's ID to find it
      title: z.string().min(1),
      content: z.string(),
      // Add other fields you want to update, like bannerImageUrl
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Note: We are not updating the slug here to prevent breaking old links.
    // If you want to update the slug, you would need more complex logic.
    return ctx.db.blog.update({
      where: { id: input.id },
      data: {
        title: input.title,
        content: input.content,
      },
    });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.blog.delete({
        where: { id: input.id },
      });
    }),
    getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.blog.findMany({
      // Show the newest posts first
      orderBy: { createdAt: 'desc' },
      // Select only the fields needed for the card view to be efficient
      select: {
          id: true,
          title: true,
          slug: true,
          bannerImageUrl: true,
          createdAt: true,
      }
    });
  }),
});