// app/news/create/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import BlogEditor from "../_components/BlogEditor"; // Adjust path if needed
import { AddBlogPage } from '../_components/AddBlog';

export default function CreateBlogPage() {
  const {status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   // If the session is loaded and the user is not authenticated, redirect
  //   if (status === "unauthenticated") {
  //     router.push("/login");
  //   }
  // }, [status, router]);

  // While the session is loading, show a loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is authenticated, render the editor
  // The BlogEditor without a `blog` prop is automatically in "create" mode
  if (status === "authenticated") {
    return <AddBlogPage />;
  }

  // Fallback, in case the redirect hasn't happened yet
  return <AddBlogPage />;
}