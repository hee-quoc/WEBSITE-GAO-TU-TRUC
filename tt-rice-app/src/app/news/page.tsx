// // src/app/news/page.tsx
// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { api } from "~/trpc/react";
// import BlogCard from "./_components/BlogCard";
// import Button from "../_components/ui/Button";

// export default function NewsIndexPage() {
//   const { data: session } = useSession();
//   const { data: blogs, isLoading, error } = api.blog.getAll.useQuery();

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//       <div className="flex items-center justify-between border-b border-gray-200 pb-6">
//         <h1 className="text-4xl font-bold tracking-tight text-gray-900">
//           News & Updates
//         </h1>
//         {/* Conditionally render the "Create" button for admins */}
//         {session?.user && (
//           <Link href="/news/create">
//             <Button size="large">Create New Post</Button>
//           </Link>
//         )}
//       </div>

//       {isLoading && <p className="mt-8 text-center">Loading posts...</p>}
//       {error && <p className="mt-8 text-center text-red-500">Failed to load posts.</p>}

//       <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {blogs?.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))}
//       </div>
//     </div>
//   );
// }

// src/app/news/page.tsx
// app/news/page.tsx

// "use client"; // This can now be a Server Component if you fetch data!

import BlogCard from "./_components/BlogCard";

// Corrected mock data to match the visual design
const blogs = [
  {
    id: "1",
    slug: "cau-chuyen-san-pham-gao-sach-thom-ngon",
    title: "Câu chuyện sản phẩm - Gạo sạch thơm ngon từ Tư Trúc",
    bannerImageUrl: "/images/news/img_news_banner1.svg", // Replace with your actual image paths
    category: "TIN TỨC / THƯƠNG HIỆU",
  },
  {
    id: "2",
    slug: "hat-kim-cuong-giua-dong-ruong",
    title: "“Hạt kim cương” giữa đồng ruộng",
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    category: "TIN TỨC / THƯƠG HIỆU",
  },
  {
    id: "3",
    slug: "cong-thuc-com-rang-dua-bo",
    title: "Công thức: Cơm rang dừa bò",
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    category: "CƠM NHÀ HÔM NAY CÓ GÌ",
  },
  {
    id: "4",
    slug: "cong-thuc-com-chien-toi-trung",
    title: "Công thức: Cơm chiên tỏi trứng",
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    category: "CƠM NHÀ HÔM NAY CÓ GÌ",
  },
  {
    id: "5",
    slug: "cong-thuc-com-ga-hoi-an",
    title: "Công thức: Cơm gà Hội An",
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    category: "CƠM NHÀ HÔM NAY CÓ GÌ",
  },
  {
    id: "6",
    slug: "tu-truc-va-dong-gop-cho-xa-hoi",
    title: "Tư Trúc và những đóng góp cho xã hội & cộng đồng",
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    category: "TIN TỨC / THƯƠNG HIỆU",
  },
];


export default function NewsIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Optional: Add a page title */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Tin Tức & Công Thức
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Khám phá những câu chuyện và công thức nấu ăn ngon từ Tư Trúc.
        </p>
      </div>

      {/* The Grid Layout */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {/*
          - The data structure was [{id, blog: {...}}]. We pass `item.blog` to the card.
          - If you simplify your data to be [{id, title, ...}], you can just pass `item`.
        */}
        {blogs.map((item) => (
          <BlogCard key={item.id} blog={item} />
        ))}
      </div>
    </div>
  );
}