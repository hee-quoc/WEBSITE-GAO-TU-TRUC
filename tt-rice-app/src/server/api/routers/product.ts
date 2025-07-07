// src/server/api/routers/product.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
function toSlug(str: string): string {
  if (!str) {
    return '';
  }

  // 1. Convert to lower case
  let slug = str.toLowerCase();

  // 2. & 3. Decompose and remove diacritics
  // 'NFD' separates combined characters into the base character and the accent
  // /[\u0300-\u036f]/g matches all combining diacritical marks
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 4. Handle the Vietnamese letter 'đ'
  slug = slug.replace(/đ/g, 'd');

  // 5. Replace spaces and consecutive spaces with a single hyphen
  slug = slug.replace(/\s+/g, '-');

  // 6. Remove all non-alphanumeric characters except the hyphen
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // 7. Collapse consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // 8. Trim leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}
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
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // The 'id' of the last item fetched
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 20; // Default limit to 20
      const { cursor } = input;

      const items = await ctx.db.product.findMany({
        take: limit + 1, // Get one extra item to see if there's a next page
        cursor: cursor ? { id: cursor } : undefined,
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // Remove the extra item
        nextCursor = nextItem!.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  // PUBLIC PROCEDURE: Anyone can view the products
  getAll: publicProcedure
    .input(z.object({
      tag: z.string().optional(),
    }))
    .query(({ ctx, input }) => {
      const { tag } = input;

      return ctx.db.product.findMany({
        where: tag ? {
          tags: {
            has: tag, // Filter by tag if it exists
          },
        } : {}, // No filter if tag is not provided
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  // PROTECTED PROCEDURE: Only logged-in users can create a product
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        SKU: z.string().min(1, "SKU is required"),
      })
    )
    .mutation(({ ctx, input }) => {
      triggerRevalidation();
      const slug = toSlug(input.name);
      return ctx.db.product.create({
        data: {
          ...input,
          slug: slug,
          authorId: ctx.session.user.id, // Associate with the logged-in user
        },
      });
    }),

  // PROTECTED PROCEDURE: Only the author can update their product
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...dataToUpdate } = input;

      const product = await ctx.db.product.findUnique({ where: { id } });

      // Authorization check: Ensure the user owns the product
      if (product?.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      triggerRevalidation();
      return ctx.db.product.update({
        where: { id },
        data: dataToUpdate,
      });
    }),

  // PROTECTED PROCEDURE: Only the author can delete their product
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({ where: { id: input.id } });

      // Authorization check
      if (product?.authorId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      triggerRevalidation();
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
    getAllSlugs: publicProcedure.query(async ({ ctx }) => {
      const products = await ctx.db.product.findMany({
        select: {
          slug: true,
        },
      });
      return products;
    }),

    /**
     * Fetches a single product by its unique slug.
     * Used by getStaticProps to get the data for a specific page.
     */
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ ctx, input }) => {
        const product = await ctx.db.product.findUnique({
          where: {
            slug: input.slug,
          },
        });
        return product;
      }),
  });