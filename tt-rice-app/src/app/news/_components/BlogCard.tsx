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
      className="block group overflow-hidden rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={blog.bannerImageUrl}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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