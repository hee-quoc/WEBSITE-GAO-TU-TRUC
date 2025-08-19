// app/news/[slug]/page.tsx // Import useMemo
import { api } from "~/trpc/server";
import { Pencil } from "lucide-react";
import Link from "next/link";
import BlogView from "../_components/BlogView";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';
import DeleteBlogButton from "../_components/DeleteBlogButton";
import Image from "next/image";
type BlogPageProps = {
  params: Promise<{ slug: string }>;
};
export interface BlogCategoryData {
  name: string;
  id: number;
}

const CATEGORY_DATA: Record<string, BlogCategoryData> = {
  "tin-tuc":{name:"Tin tức/Thương hiệu", id:1},
  "vao-bep-cung-chung-toi":{name:"Vào bếp cùng chúng tôi",id:2},
}
export default async function BlogPage({ params }: BlogPageProps) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
      notFound();
  }
  const { slug } = await params;
  const blogData = await api.blog.getBySlug(
    { slug },
  );
  
  // Now we check for the blogData after the hook, so it's always defined below.
  if ( !blogData) {
    notFound();
  }
  
  if (blogData) {
    const blogs= await api.blog.getLatestByTag({tag: blogData.tag, id:blogData.id})
    return (
      <>
        {session?.user &&(<div className="max-w-7xl mt-20 justify-end">
          <Link
            href={`/news/edit/${slug}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Pencil className="h-4 w-4" />
            Chỉnh sửa sản phẩm
          </Link>
          <DeleteBlogButton blogId={blogData.id} />
        </div>)}
        <BlogView
          blog={blogData}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12">
          <h2 className="text-center text-3xl font-bold tracking-tight text-steel-blue sm:text-4xl">
            Bài viết liên quan
          </h2>
          
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => blog.thumbnailUrl && (
              <Link href={`/news/${blog.slug}`} key={blog.slug} className="group block">
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
                    {CATEGORY_DATA[blog.tag]?.name ?? 'Uncategorized'}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-steel-blue group-hover:text-green-dark">
                    {blog.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </>
      
    );
  }

  return <div className="text-center py-20">Something went wrong.</div>;
}