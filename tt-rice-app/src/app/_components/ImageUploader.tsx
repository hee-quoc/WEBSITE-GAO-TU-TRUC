// src/app/_components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // Get the tRPC mutation hook
  const { mutate: getPresignedUrl } = api.s3.createPresignedUrl.useMutation({
    // The `_variables` parameter is unused, so we prefix it with an underscore
    onSuccess: async (data, _variables) => {
      setMessage("Uploading to S3...");

      // The `file` object is available here from the component's state
      if (!file) {
        setMessage("Error: File not found after getting URL.");
        return;
      }

      // Use the presigned URL to upload the file directly to S3
      const response = await fetch(data.url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (response.ok) {
        setMessage(`Upload successful! URL: ${data.fileUrl}`);
        // Here you would typically save the data.publicUrl to your database
        // e.g., by calling another tRPC mutation like `product.updateImage({ id: ..., imageUrl: data.publicUrl })`
        console.log("Final public URL:", data.fileUrl);
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

// The module declaration block has been removed as it was unnecessary and causing errors.