// src/app/_components/BlogEditor.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Blog } from "@prisma/client";
import toast from "react-hot-toast";

import { api } from "~/trpc/react";
import Button from "~/app/_components/ui/Button";
import { useQuill } from "~/app/hooks/useQuill"; // <-- Import the custom hook

interface BlogEditorProps {
  blog?: Blog;
}

export default function BlogEditor({ blog }: BlogEditorProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const { quill, quillRef } = useQuill(); 

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      if (quill && blog.content) {
        quill.clipboard.dangerouslyPasteHTML(blog.content);
      }
    }
  }, [blog, quill]);

  const createBlog = api.blog.create.useMutation({
    onSuccess: (data) => {
      // On success, navigate to the newly created post's page
      router.push(`/news/${data.slug}`);
      router.refresh(); // Refresh server components
    },
  });

  const updateBlog = api.blog.update.useMutation({
    onSuccess: () => {
      router.refresh(); 
    },
  });

  const deleteBlog = api.blog.delete.useMutation({
    onSuccess: () => {
      toast.success("Post deleted successfully!");
      // On success, navigate to the main news page
      router.push("/news");
      router.refresh();
    },
    onError: (err) => {
        toast.error(`Failed to delete post: ${err.message}`);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quill) {
      toast.error("Editor is not ready yet.");
      return;
    }
    const content = quill.root.innerHTML;
    const promise = blog
      ? updateBlog.mutateAsync({ id: blog.id, title, content })
      : createBlog.mutateAsync({ title, content });
    
    await toast.promise(promise, {
      loading: blog ? 'Updating post...' : 'Creating post...',
      success: `Post ${blog ? 'updated' : 'created'} successfully!`,
      error: `Failed to ${blog ? 'update' : 'create'} post.`,
    });
  };

  const handleDelete = () => {
    if (!blog) return;

    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
        deleteBlog.mutate({ id: blog.id });
    }
  };

  const isLoading = createBlog.isPending || updateBlog.isPending || deleteBlog.isPending;

  return (
    <div className="mx-auto max-w-4xl py-12">
      <h1 className="text-4xl font-bold mb-8">
        {blog ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          {/* Quill editor's container div */}
          <div style={{ height: '300px' }} className="bg-white">
            <div ref={quillRef} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Show delete button only when editing */}
          {blog && (
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteBlog.isPending ? 'Deleting...' : 'Delete Post'}
            </Button>
          )}

          <Button type="submit" size="large" disabled={isLoading} className="ml-auto">
            {isLoading ? 'Saving...' : (blog ? 'Update Post' : 'Create Post')}
          </Button>
        </div>
      </form>
    </div>
  );
}