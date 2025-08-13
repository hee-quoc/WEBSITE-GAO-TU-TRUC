import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { randomUUID } from "crypto";
import { en } from "zod/v4/locales";

export const s3Router = createTRPCRouter({
  createPresignedUrl: publicProcedure
    .input(z.object({ 
      fileName: z.string(),
      fileType: z.string(),
    }))
    .mutation(async ({ input }) => {
      // 1. Setup the STS client with your long-term credentials
      // These are the credentials of the user/role that has permission to *assume* the target role.
      const stsClient = new STSClient({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      });

      // 2. Mimic `aws sts assume-role`
      const assumeRoleCommand = new AssumeRoleCommand({
        RoleArn: env.AWS_ROLE_ARN,
        RoleSessionName: `ManualUploadSession-${randomUUID()}`, // Session name must be unique
        DurationSeconds: 900, // 15 minutes, the default
      });
      
      const assumedRole = await stsClient.send(assumeRoleCommand);

      if (!assumedRole.Credentials) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not assume role, credentials not provided.",
        });
      }

      // 3. Create a new S3 client with the *temporary* credentials from the assumed role
      const s3Client = new S3Client({
        region: env.AWS_REGION,
        credentials: {
          accessKeyId: assumedRole.Credentials.AccessKeyId!,
          secretAccessKey: assumedRole.Credentials.SecretAccessKey!,
          sessionToken: assumedRole.Credentials.SessionToken!,
        },
      });

      // Generate a unique key for the S3 object
      const uniqueKey = `public/uploads/${randomUUID()}-${input.fileName}`;
      
      // 4. Create the Presigned URL for a PUT request
      const putObjectCommand = new PutObjectCommand({
        Bucket: env.AWS_S3_BUCKET_NAME,
        Key: uniqueKey,
        ContentType: input.fileType,
        ACL: 'public-read', // Optional: Set ACL to public-read 
      });

      const signedUrl = await getSignedUrl(s3Client, putObjectCommand, {
        expiresIn: 60, // URL expires in 60 seconds
      });
      const fileUrl = `https://${env.AWS_S3_BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/${uniqueKey}`;
      console.log("Successfully created signed URL for", uniqueKey);
      
      // 5. Return the URL and the key to the client
      return {
        url: signedUrl,
        fileUrl: fileUrl,
        key: uniqueKey, // The client might want to know the final key
      };
    }),
});