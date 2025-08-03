// src/app/_components/BlogView.tsx
import { type Blog } from "@prisma/client";
import Image from "next/image";

interface BlogViewProps {
  blog: Blog & { contentImages: { url: string; altText: string | null }[] };
  isEditable: boolean;
  onEdit: () => void; // Function to trigger edit mode
}

export default function BlogView({ blog, isEditable, onEdit }: BlogViewProps) {
  return (
    <article className="mx-auto max-w-4xl py-12">
      {isEditable && (
        <div className="mb-8 flex justify-end">
          <button
            onClick={onEdit}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Edit Post
          </button>
        </div>
      )}

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
        {blog.title}
      </h1>
      <p className="mb-8 text-lg text-gray-500">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {blog.bannerImageUrl && (
        <div className="relative mb-8 h-96 w-full">
          <Image
            src={blog.bannerImageUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Render the Quill content safely */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
}