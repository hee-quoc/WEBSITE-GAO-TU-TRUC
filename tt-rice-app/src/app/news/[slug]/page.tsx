// app/news/[slug]/page.tsx
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react"; // Import useMemo
import { api } from "~/trpc/react";
import BlogEditor from "../_components/BlogEditor";
import { Pencil } from "lucide-react";
import Link from "next/link";
import BlogView from "../_components/BlogView";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';
import DeleteBlogButton from "../_components/DeleteBlogButton";

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
      notFound();
  }
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const [isEditMode, setIsEditMode] = useState(true);

  const { data: blogData, isLoading, error } = api.blog.getBySlug.useQuery(
    { slug },
  );

  
  if (isLoading) {
    return <div className="text-center py-20">Loading post...</div>;
  }
  
  // Now we check for the blogData after the hook, so it's always defined below.
  if (error || !blogData) {
    notFound();
  }
  
  if (blogData) {
    return (
      <>
      {session?.user &&(<div className="max-w-7xl mt-20 justify-end">
              <Link
                href={`/products/edit/${slug}`}
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Pencil className="h-4 w-4" />
                Chỉnh sửa sản phẩm
              </Link>
              <DeleteBlogButton blogId={blogData.id} />
            </div>)}
      <BlogView
        blog={blogData}
        isEditable={session?.user? true : false}
        onEdit={() => setIsEditMode(true)}
      />
      </>
      
    );
  }

  return <div className="text-center py-20">Something went wrong.</div>;
}