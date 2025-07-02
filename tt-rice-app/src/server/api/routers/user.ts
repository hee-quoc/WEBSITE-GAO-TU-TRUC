// src/server/api/routers/user.ts
import { z } from "zod";
import { hash } from "bcryptjs";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  updateProfile: protectedProcedure
    .input(
      z.object({
        // Allow updating username or password, or both
        username: z.string().min(3).optional(),
        password: z.string().min(6).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // If nothing is being updated, do nothing.
      if (!input.username && !input.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Please provide a username or password to update.",
        });
      }

      const dataToUpdate: { username?: string; password?: string } = {};

      if (input.username) {
        dataToUpdate.username = input.username;
      }

      if (input.password) {
        // Always hash the new password before saving
        dataToUpdate.password = await hash(input.password, 12);
      }

      const updatedUser = await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: dataToUpdate,
      });

      return {
        success: true,
        message: "Profile updated successfully.",
        user: {
          id: updatedUser.id,
          username: updatedUser.username,
        },
      };
    }),
});