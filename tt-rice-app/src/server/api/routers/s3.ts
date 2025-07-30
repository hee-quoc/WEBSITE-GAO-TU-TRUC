// src/server/api/routers/s3.ts
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { s3Client } from "~/server/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";

export const s3Router = createTRPCRouter({
  getPresignedUrl: protectedProcedure // Or publicProcedure if anyone can upload
    .input(z.object({
      fileName: z.string(),
      fileType: z.string(),
    }))
    .mutation(async ({ input }) => {
      const { fileName, fileType } = input;
      
      // You can add more validation here, e.g., for file types or sizes
      if (!fileType.startsWith("image/")) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Only image files are allowed.",
        });
      }

      // Generate a unique key for the S3 object
      const key = `${Date.now()}-${fileName}`;

      const putCommand = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
        ContentType: fileType,
      });

      // Generate the presigned URL
      const url = await getSignedUrl(s3Client, putCommand, {
        expiresIn: 60 * 5, // 5 minutes
      });

      return {
        presignedUrl: url,
        // The final public URL after the upload is complete
        publicUrl: `https://${process.env.S3_BUCKET_NAME!}.s3.${process.env.S3_REGION!}.amazonaws.com/${key}`,
      };
    }),
});