// src/app/news/_components/BlogCard.tsx
import Image from "next/image";
import Link from "next/link";

// Define the type based on the 'select' in our getAll query
type BlogCardProps = {
  blog: {
    // id: string;
    title: string;
    slug: string;
    thumbnailUrl: string | null;
    createdAt: Date;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link
      href={`/news/${blog.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative h-48 w-full">
        {blog.thumbnailUrl ? (
          <Image
            src={blog.thumbnailUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}