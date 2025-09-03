// app/news/_components/BlogCard.tsx

import Image from 'next/image';
import Link from 'next/link';

// Define the shape of the blog prop we expect
interface Blog {
  slug: string;
  title: string;
  bannerImageUrl: string;
  category: string;
}

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    // The `group` class allows us to apply styles to children on hover of the parent
    <Link
      href={`/news/${blog.slug}`}
      className="block group overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg max-w-[400px]"
    >
      {/* Image Container */}
      <div className="overflow-hidden rounded-lg w-[400px] h-[250px]">
        <Image
          src={blog.bannerImageUrl}
          alt={blog.title}
          width={400}
          height={250}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="p-4 sm:p-5">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-green-700">
          {blog.category}
        </p>
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}