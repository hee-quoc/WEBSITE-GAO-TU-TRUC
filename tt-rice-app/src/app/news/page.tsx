// src/app/news/page.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import BlogCard from "./_components/BlogCard";
import Button from "../_components/ui/Button";

export default function NewsIndexPage() {
  const { data: session } = useSession();
  const { data: blogs, isLoading, error } = api.blog.getAll.useQuery();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          News & Updates
        </h1>
        {/* Conditionally render the "Create" button for admins */}
        {session?.user && (
          <Link href="/news/create">
            <Button size="large">Create New Post</Button>
          </Link>
        )}
      </div>

      {isLoading && <p className="mt-8 text-center">Loading posts...</p>}
      {error && <p className="mt-8 text-center text-red-500">Failed to load posts.</p>}

      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}