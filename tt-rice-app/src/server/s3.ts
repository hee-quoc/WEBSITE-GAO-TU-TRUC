import { S3Client,  DeleteObjectCommand  } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  endpoint: `https://s3.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

export async function deleteS3ObjectByUrl(url: string) {
  try {
    // Giả sử url dạng https://bucket.s3.amazonaws.com/key
    const { AWS_S3_BUCKET } = process.env;
    const key = decodeURIComponent(new URL(url).pathname.slice(1));
    await s3Client.send(new DeleteObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }));
  } catch (err) {
    console.error("Failed to delete S3 object:", url, err);
  }
}