// app/news/[slug]/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";
import BlogEditor from "../_components/BlogEditor";
import BlogView from "../_components/BlogView";

export default function BlogPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { data: session } = useSession();
  const isAdmin = !!session?.user; 

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: blogData, isLoading, error } = api.blog.getBySlug.useQuery(
    { slug },
  );
  
  if (isLoading) {
    return <div className="text-center py-20">Loading post...</div>;
  }
  if (error || (!blogData)) {
    return <div className="text-center py-20">Post not found.</div>;
  }
  if (isAdmin && isEditMode && blogData) {
    return <BlogEditor blog={blogData} />;
  }
  if (blogData) {
    return (
      <BlogView
        blog={blogData}
        isEditable={isAdmin}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return <div className="text-center py-20">Something went wrong.</div>;
}