import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({

  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    AWS_ACCESS_KEY_ID:z.string().min(1),
    AWS_SECRET_ACCESS_KEY:z.string().min(1),
    AWS_ROLE_ARN:z.string().min(1),
    AWS_S3_BUCKET_NAME:z.string().min(1),
    AWS_REGION:z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
  },

  client: {
    NEXT_PUBLIC_REGION:z.string().min(1),
    NEXT_PUBLIC_AWS_S3_BUCKET_NAME:z.string().min(1),
  },

  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_ROLE_ARN:process.env.AWS_ROLE_ARN,
    AWS_S3_BUCKET_NAME:process.env.AWS_S3_BUCKET_NAME,
    AWS_REGION:process.env.AWS_REGION,
    NEXT_PUBLIC_REGION:process.env.AWS_REGION,
    NEXT_PUBLIC_AWS_S3_BUCKET_NAME:process.env.AWS_S3_BUCKET_NAME,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});