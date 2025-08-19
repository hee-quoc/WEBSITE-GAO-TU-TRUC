// app/news/create/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { notFound } from 'next/navigation';
// import BlogEditor from "../_components/BlogEditor"; // Adjust path if needed
import { AddBlogPage } from '../_components/AddBlog';

export default async function CreateBlogPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
      notFound();
  }
  return <AddBlogPage />;
}