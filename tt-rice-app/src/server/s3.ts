import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { env } from "~/env";
import { randomUUID } from "crypto";
import { TRPCError } from "@trpc/server";

export const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: `https://s3.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});


const stsClient = new STSClient({
  region: env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
});

async function getTemporaryS3Client() {
  const assumeRoleCommand = new AssumeRoleCommand({
    RoleArn: env.AWS_ROLE_ARN,
    RoleSessionName: `S3DeleteSession-${randomUUID()}`,
    DurationSeconds: 900, // 15 minutes is plenty
  });

  const assumedRole = await stsClient.send(assumeRoleCommand);

  if (!assumedRole.Credentials) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Could not assume role to get temporary credentials for S3.",
    });
  }

  // Create a new S3 client with the *temporary* credentials
  return new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accessKeyId: assumedRole.Credentials.AccessKeyId!,
      secretAccessKey: assumedRole.Credentials.SecretAccessKey!,
      sessionToken: assumedRole.Credentials.SessionToken!,
    },
  });
}


export async function deleteS3ObjectByUrl(fileUrl: string) {
  if (!fileUrl?.startsWith('http')) {
    console.warn(`Attempted to delete an invalid S3 URL: ${fileUrl}`);
    return;
  }

  try {
    // 1. Get an S3 client that is using the temporary role credentials
    const s3ClientWithRole = await getTemporaryS3Client();

    const bucketName = env.AWS_S3_BUCKET_NAME;
    const key = new URL(fileUrl).pathname.substring(1);

    console.log(`Attempting to delete from S3 (with assumed role):`);
    console.log(`  - Bucket: ${bucketName}`);
    console.log(`  - Key: ${key}`);

    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    // 2. Use the role-based client to send the command
    await s3ClientWithRole.send(command);
    console.log(`Successfully deleted ${key} from S3.`);

  } catch (err) {
    console.error(`Failed to delete S3 object with URL: ${fileUrl}`, err);
  }
}