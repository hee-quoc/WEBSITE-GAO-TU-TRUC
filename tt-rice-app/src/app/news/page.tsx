import { Suspense } from "react";
import { BlogFilterButton } from "./_components/BlogFilterButton";
import { BlogFilteredList } from "./_components/BlogFilteredList";
import Image from "next/image";
// Corrected mock data to match the visual design
const blogs = [
  {
    id: "1",
    slug: "cau-chuyen-san-pham-gao-sach-thom-ngon",
    title: "Câu chuyện sản phẩm - Gạo sạch thơm ngon từ Tư Trúc",
    tag: "tin-tuc",
    content: "Đây là nội dung chi tiết cho bài viết về câu chuyện sản phẩm gạo sạch thơm ngon từ Tư Trúc. Nội dung này sẽ được hiển thị trên trang chi tiết của blog.",
    published: true,
    createdAt: new Date("2023-10-26T10:00:00Z"),
    updatedAt: new Date("2023-10-26T10:00:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [], // Matches the BlogImage[] relation
  },
  {
    id: "2",
    slug: "hat-kim-cuong-giua-dong-ruong",
    title: "“Hạt kim cương” giữa đồng ruộng",
    tag: "tin-tuc",
    content: "Nội dung chi tiết về 'Hạt kim cương' giữa đồng ruộng. Khám phá giá trị và chất lượng đặc biệt của sản phẩm.",
    published: true,
    createdAt: new Date("2023-10-25T11:30:00Z"),
    updatedAt: new Date("2023-10-25T11:30:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [],
  },
  {
    id: "3",
    slug: "cong-thuc-com-rang-dua-bo",
    title: "Công thức: Cơm rang dừa bò",
    tag: "vao-bep-cung-chung-toi",
    content: "Hướng dẫn từng bước để làm món cơm rang dừa bò thơm ngon, lạ miệng cho cả gia đình thưởng thức.",
    published: true,
    createdAt: new Date("2023-10-24T09:00:00Z"),
    updatedAt: new Date("2023-10-24T09:00:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [],
  },
  {
    id: "4",
    slug: "cong-thuc-com-chien-toi-trung",
    title: "Công thức: Cơm chiên tỏi trứng",
    tag: "vao-bep-cung-chung-toi",
    content: "Một công thức cơm chiên tỏi trứng đơn giản nhưng không kém phần hấp dẫn, phù hợp cho bữa ăn nhanh gọn.",
    published: true,
    createdAt: new Date("2023-10-23T14:00:00Z"),
    updatedAt: new Date("2023-10-23T14:00:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [],
  },
  {
    id: "5",
    slug: "cong-thuc-com-ga-hoi-an",
    title: "Công thức: Cơm gà Hội An",
    tag: "vao-bep-cung-chung-toi",
    content: "Mang hương vị đặc sản Hội An vào căn bếp của bạn với công thức chuẩn vị cho món cơm gà trứ danh.",
    published: true,
    createdAt: new Date("2023-10-22T08:45:00Z"),
    updatedAt: new Date("2023-10-22T08:45:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [],
  },
  {
    id: "6",
    slug: "tu-truc-va-dong-gop-cho-xa-hoi",
    title: "Tư Trúc và những đóng góp cho xã hội & cộng đồng",
    tag: "tin-tuc",
    content: "Tìm hiểu về các hoạt động xã hội và những đóng góp ý nghĩa của thương hiệu Tư Trúc cho cộng đồng.",
    published: true,
    createdAt: new Date("2023-10-21T16:20:00Z"),
    updatedAt: new Date("2023-10-21T16:20:00Z"),
    bannerImageUrl: "/images/news/img_news_banner1.svg",
    contentImages: [],
  },
];

export interface BlogCategoryData {
  name: string;
  id: number;
}

const CATEGORY_DATA: Record<string, BlogCategoryData> = {
  "tin-tuc":{name:"Tin tức/Thương hiệu", id:1},
  "vao-bep-cung-chung-toi":{name:"Vào bếp cùng chúng tôi",id:2},
}
function FilterButtonsFallback() {
  return (
    <div className="mt-8 flex flex-wrap animate-pulse items-center justify-center gap-4 md:justify-start">
      <div className="h-9 w-24 rounded-full bg-gray-200"></div>
      <div className="h-9 w-28 rounded-full bg-gray-200"></div>
    </div>
  );
}

export default async  function NewsIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
  
}) {
  const resolvedSearchParams = await searchParams;
  const activeTag = resolvedSearchParams?.tag;
  const filteredBlogs = activeTag
    ? blogs.filter((blog) => blog.tag === activeTag)
    : blogs;
  return (
    <div>
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px]">
        <Image
          src="/faq/thumbnail.svg"
          alt="banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg flex items-center justify-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold font-alegreya-sans text-center leading-snug">
            Tin Tức
          </h1>
        </div>
      </div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      
      <div className={`mt-[43px] flex flex-col items-center mb-5`}>
        <div className="relative z-10 w-full">
          <Suspense fallback={<FilterButtonsFallback />}>
            <BlogFilterButton categories={CATEGORY_DATA} />
          </Suspense>
        </div>
      </div>
      <BlogFilteredList blogs={filteredBlogs} categories={CATEGORY_DATA}/>
    </main>
    </div>
  );
}