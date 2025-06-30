import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().optional(),
      imageUrl: z.string().url("Must be a valid URL").optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // ctx.session.user is available because this is a protectedProcedure
      const authorId = ctx.session.user.id;

      const product = await ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          imageUrl: input.imageUrl,
          // You MUST connect it to an author
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });

      return product;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    // ctx.db is the Prisma Client instance.
    // .product refers to the Product model in your schema.prisma.
    // .findMany() is the Prisma method to retrieve all records.
    return ctx.db.product.findMany({
      // It's good practice to order the results for consistency.
      orderBy: {
        createdAt: "desc", // Show the newest products first
      },
    });
  }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const product = await ctx.db.product.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return product ?? null;
  }),
});
