// src/app/_components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // Get the tRPC mutation hook
  const { mutate: getPresignedUrl } = api.s3.getPresignedUrl.useMutation({
    onSuccess: async (data, variables) => {
      setMessage("Uploading to S3...");

      // Use the presigned URL to upload the file directly to S3
      const response = await fetch(data.presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file!.type,
        },
      });

      if (response.ok) {
        setMessage(`Upload successful! URL: ${data.publicUrl}`);
        // Here you would typically save the data.publicUrl to your database
        // e.g., by calling another tRPC mutation like `product.updateImage({ id: ..., imageUrl: data.publicUrl })`
        console.log("Final public URL:", data.publicUrl);
      } else {
        setMessage("Upload to S3 failed.");
        console.error("S3 Upload Error:", await response.text());
      }
    },
    onError: (error) => {
      setMessage(`Error getting presigned URL: ${error.message}`);
      console.error(error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }
    
    setMessage("Getting presigned URL...");
    // Call the tRPC mutation to get the URL
    getPresignedUrl({
      fileName: file.name,
      fileType: file.type,
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload Image
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

// A trick to pass the file object through tRPC without it being part of the input schema
declare module "~/trpc/react" {
  interface MyTRPCMutationOptions<T> {
    file?: File;
  }

  export namespace api {
    export namespace s3 {
      export namespace getPresignedUrl {
        export type Options = MyTRPCMutationOptions<any>;
      }
    }
  }
}