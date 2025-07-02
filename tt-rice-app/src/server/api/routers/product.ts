// src/server/api/routers/product.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

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
        include: {
          author: {
            select: { username: true },
          },
        },
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
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      orderBy: { createdAt: "desc" },
      // Include the author's username for display
      include: {
        author: {
          select: { username: true },
        },
      },
    });
  }),

  // PROTECTED PROCEDURE: Only logged-in users can create a product
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().optional(),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          ...input,
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

      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});