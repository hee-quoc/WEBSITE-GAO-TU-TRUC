
import BlogEditor from "../../_components/BlogEditor";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';
import { api } from "~/trpc/server";

type EditBlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProduct({ params }: EditBlogPageProps) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        notFound();
    }
    const { slug } = await params;
    const blogData= await api.blog.getBySlug(
        { slug },
    );
    if ( !blogData) {
        notFound();
    }
    if (blogData) {
        return(
            <main className=""> 
                <BlogEditor blog={blogData}/>
            </main>
        )
    }
    
}