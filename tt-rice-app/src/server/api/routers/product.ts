// src/server/api/routers/product.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { createUniqueSlug } from "~/lib/utils";
async function triggerRevalidation() {
  const revalidateUrl = new URL('/api/revalidate', process.env.NEXT_PUBLIC_APP_URL);
  
  try {
    await fetch(revalidateUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET_TOKEN!,
      },
      body: JSON.stringify({
        path: '/products', // The path we want to rebuild
      }),
    });
    console.log('Successfully triggered revalidation for /products');
  } catch (err) {
    console.error('Failed to trigger revalidation:', err);
  }
}
export const productRouter = createTRPCRouter({
  // INFINITE FETCHING
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // Prisma `id` is Int
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      const items = await ctx.db.product.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return { items, nextCursor };
    }),

  // GET ALL WITH OPTIONAL TAG FILTER
  getAll: publicProcedure
    .input(z.object({ tag: z.string().optional() }))
    .query(({ ctx, input }) => {
      const { tag } = input;

      return ctx.db.product.findMany({
        where: tag
          ? { tag: { equals: tag } } // tag is now a String
          : {},
        orderBy: { createdAt: "desc" },
      });
    }),

  // CREATE PRODUCT
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        slug: z.string().min(1, "Slug is required"),
        description: z.string().min(1, "Description is required"),
        price: z.string().min(1, "Price is required"),
        detail: z.string(),
        properties: z.array(z.number()),
        tag: z.string().min(1, "Tag is required"),
        productImages: z.array(z.string()),
        package: z.string(),
        parts: z.string(),
        ingredients: z.string(),
        grow: z.string(),
        cooking: z.string(),
        productCertImages: z.array(z.string()),
      })
    )
    .mutation(({ ctx, input }) => {
      void triggerRevalidation();
      return ctx.db.product.create({
        data: input,
      });
    }),

  // UPDATE PRODUCT
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        detail: z.string().optional(),
        properties: z.array(z.number()).optional(),
        tag: z.string().optional(),
        productImages: z.array(z.string()).optional(),
        package: z.string().optional(),
        parts: z.string().optional(),
        ingredients: z.string().optional(),
        grow: z.string().optional(),
        cooking: z.string().optional(),
        productCertImages: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataToUpdate } = input;
      void triggerRevalidation();
      return ctx.db.product.update({
        where: { id },
        data: dataToUpdate,
      });
    }),

  // DELETE PRODUCT
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      void triggerRevalidation();
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),

  // GET ALL SLUGS
  getAllSlugs: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      select: { slug: true },
    });
  }),

  // GET PRODUCT BY SLUG
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { slug: input.slug },
      });
    }),
});
