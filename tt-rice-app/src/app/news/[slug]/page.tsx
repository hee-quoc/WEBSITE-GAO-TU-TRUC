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
import Breadcrumb from "../_components/BreadCrumb";
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
        <div className=" mb-5 pl-10 pt-25 lg:pl-[159px]">
          <Breadcrumb title={blogData.title} category={CATEGORY_DATA[blogData.tag]?.name ?? 'Uncategorized'}/>
        </div>
        {session?.user &&(<div className="max-w-7xl mt-20 justify-end">
          <Link
            href={`/news/edit/${slug}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Pencil className="h-4 w-4" />
            Chỉnh sửa tin tức
          </Link>
          <DeleteBlogButton blogId={blogData.id} />
        </div>)}
        <BlogView
          blog={blogData}
        />
        <div className="flex flex-col md:items-center">
          <div className=" w-0 md:w-[740px] h-[0px] rounded-[1px] border-[1px] border-[#EFF0F2] mb-5"></div>
            <h2 className="text-[28px] md:text-center md:text-[32px] font-[400] tracking-tight text-[#272A32] sm:text-[32px]">
              Các bài viết khác
            </h2>
        </div>
        <div className="mx-auto max-w-7xl px-4 pt-2 pb-6 sm:px-6 lg:px-12 flex flex-col items-center  overflow-auto">
          {/* grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 */}
          <div className="mt-5 flex flex-col md:flex-row items-center max-w-[360px]"> 
            {blogs.map((blog) => blog.thumbnailUrl && (
              <Link href={`/news/${blog.slug}`} key={blog.slug} className="group block mx-4">
                <div className="overflow-hidden rounded-lg w-[360px] h-[203px]">
                  <Image
                    src={blog.thumbnailUrl}
                    alt={blog.title}
                    width={400}
                    height={250}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-[16px] font-[500] text-[#6C9126] font-fz-poppins">
                    {CATEGORY_DATA[blog.tag]?.name.toUpperCase() ?? 'Uncategorized'}
                  </p>
                  <h3 className="mt-1 text-[24px] font-[500] text-[#272A32] group-hover:text-green-dark font-alegreya-sans">
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