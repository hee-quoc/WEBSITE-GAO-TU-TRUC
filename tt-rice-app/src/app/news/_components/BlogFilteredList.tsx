// src/app/news/_components/BlogFilteredList.tsx

// Make sure to remove 'use client' if it was there!
// Also remove the import for `useSearchParams`.

import Link from 'next/link';
import Image from 'next/image';
import { type Blog } from '@prisma/client'; // Assuming you have generated types
import { type BlogCategoryData } from '../page';

interface BlogFilteredListProps {
  blogs: Blog[]; // Use the type from your data array or Prisma
  categories: Record<string, BlogCategoryData>;
}

// This is now a "dumb" component that just renders what it's given
export function BlogFilteredList({ blogs, categories }: BlogFilteredListProps) {
  // NO useSearchParams() HERE!
  // The filtering has already been done in the parent page.

  if (blogs.length === 0) {
    return (
      <div className="text-center text-gray-500">
        <p>Không tìm thấy bài viết nào.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => blog.thumbnailUrl&&(
        <Link href={`/news/${blog.slug}`} key={blog.id} className="group block">
          <div className="overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnailUrl}
              alt={blog.title}
              width={400}
              height={250}
              className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm text-green-dark">
              {categories[blog.tag]?.name ?? 'Uncategorized'}
            </p>
            <h3 className="mt-1 text-xl font-bold text-steel-blue group-hover:text-green-dark">
              {blog.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}