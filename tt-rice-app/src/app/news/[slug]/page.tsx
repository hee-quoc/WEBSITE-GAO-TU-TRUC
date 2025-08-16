// app/news/[slug]/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react"; // Import useMemo
import { api } from "~/trpc/react";
import BlogEditor from "../_components/BlogEditor";
import BlogView from "../_components/BlogView";

// BEST PRACTICE: Define a more specific type for your blog content blocks.
// This gives you amazing autocompletion and type safety.
// Replace with the actual structure from your editor (e.g., Quill, Editor.js).
interface ContentBlock {
  type: 'paragraph' | 'header' | 'image' | 'list';
  data: unknown; // Be as specific as you can here
}

export default function BlogPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';

  const { data: session } = useSession();
  const isAdmin = !!session?.user; 

  const [isEditMode, setIsEditMode] = useState(false);

  const { data: blogData, isLoading, error } = api.blog.getBySlug.useQuery(
    { slug },
  );

  // Safely parse the blog content only when blogData changes.
  // This is efficient and prevents runtime errors.
  const parsedContent = useMemo((): ContentBlock[] => {
    if (!blogData?.content) {
      return [];
    }

    try {
      const parsed = JSON.parse(blogData.content) as unknown;

      if (Array.isArray(parsed)) {
        // THE FIX: We've confirmed it's an array.
        // Now we assert that its contents match our ContentBlock type.
        return parsed as ContentBlock[]; 
      }

      console.warn("Parsed blog content was not an array.");
      return [];
    } catch (e) {
      console.error("Failed to parse blog content JSON:", e);
      return [];
    }
  }, [blogData]); // Only re-run this logic when blogData changes.

  
  if (isLoading) {
    return <div className="text-center py-20">Loading post...</div>;
  }
  
  // Now we check for the blogData after the hook, so it's always defined below.
  if (error || !blogData) {
    return <div className="text-center py-20">Post not found.</div>;
  }
  
  if (isAdmin && isEditMode) {
    // The editor likely needs the raw blogData object with the string content
    return <BlogEditor blog={blogData} />;
  }
  
  // Create the new data object with the parsed content for the view component.
  const newBlogData = { ...blogData, content: parsedContent };

  return (
    <BlogView
      blog={newBlogData}
      isEditable={isAdmin}
      onEdit={() => setIsEditMode(true)}
    />
  );
}