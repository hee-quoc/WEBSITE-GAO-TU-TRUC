// app/news/_components/BlogCard.tsx

import Image from 'next/image';
import Link from 'next/link';
import {type Blog } from '@prisma/client';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  if(!blog.bannerImageUrl){
    return (
      <div>No blog</div>
    );
  }

  return (
    // The `group` class allows us to apply styles to children on hover of the parent
    <Link
      href={`/news/${blog.slug}`}
      className="block group overflow-hidden  transition-all duration-300 hover:shadow-lg"
    >
      <div className=" rounded-xl relative aspect-video w-full overflow-hidden">
        <Image
          src={blog.bannerImageUrl}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="pt-5">
        <p className="font-fz-poppins mb-1 text-xs font-medium uppercase tracking-wider text-green-500">
          {blog.tag}
        </p>
        <h3 className="text-lg font-medium text-blue-900 line-clamp-2">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}