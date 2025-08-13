// src/app/_components/BlogView.tsx
// import { type Blog } from "@prisma/client";
import Image from "next/image";

interface Blog{
  title: string;
  slug: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl: string | null;
}

interface BlogViewProps {
  blog: Blog & { contentImages: { url: string; altText: string | null }[] };
  isEditable: boolean;
  onEdit: () => void; // Function to trigger edit mode
}
type Block = {
  type: 'header' | 'image' | 'description';
  payload: Record<string, any>;
};

export default function BlogView({ blog, isEditable, onEdit }: BlogViewProps) {
  let blocks: Block[] =[]
  if(blog.content){
    try {
      blocks = JSON.parse(blog.content);
    } catch (error) {
      console.error('Invalid JSON content:', error);
      return <p className="text-red-500">Nội dung không hợp lệ.</p>;
    }
  }
  
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

      {blog.thumbnailUrl && (
        <div className="relative mb-8 h-96 w-full">
          <Image
            src={blog.thumbnailUrl}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Render the Quill content safely */}
      {/* <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      /> */}
      {blocks && (
      <div className="flex flex-col gap-6">
        {blocks.map((block, index) => {
          switch (block.type) {
            case 'header':
              return (
                <h3 key={index} className="text-2xl font-semibold">
                  {block.payload.text}
                </h3>
              );
            case 'image':
              return (
                <div key={index} className="w-full">
                  <Image
                    src={block.payload.image}
                    alt={block.payload.caption || 'Blog Image'}
                    width={800}
                    height={450}
                    className="rounded-lg object-contain"
                  />
                  {block.payload.caption && (
                    <p className="text-sm text-center mt-2 text-gray-600">
                      {block.payload.caption}
                    </p>
                  )}
                </div>
              );
            case 'description':
              return (
                <p key={index} className="text-base leading-relaxed">
                  {block.payload.code}
                </p>
              );
            default:
              return null;
          }
        })}
      </div>)}
    </article>
  );
}