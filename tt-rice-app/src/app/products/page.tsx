import { api } from "~/trpc/server";
import { Suspense } from "react";
import { FilteredProductList } from '~/app/products/_components/FilteredProductList';
import { FilterButton } from "./_components/FilterButton";
import Image from "next/image";
// This page is now fully static by default, perfect for On-Demand ISR.
// When you update a product, you will trigger the revalidation API
// to rebuild this page with fresh data.

export interface CategoryData {
  name: string;
  description: string;
  image: string;
}

const CATEGORY_DATA: Record<string, CategoryData> = {
  'gao-an': { name: 'Gạo ăn', description: 'Câu chuyện về Tư Trúc bắt đầu từ hơn 3 thập kỉ trước tại một nhà máy xay xát lúa, với một niềm tự hào về việc giữ gìn nền văn minh lúa nước ngàn năm và nâng tầm, lan tỏa giá trị của hạt ngọc thực đến với mỗi người Việt', image: '/img_category_decorative.png' },
  'gao-nguyen-lieu': { name: 'Gạo nguyên liệu', description: 'Canh tác theo quy trình hữu cơ nghiêm ngặt...', image: '/img_category_decorative.png' },
  'gao-thong-dung': { name: 'Gạo thông dụng', description: 'Giàu dinh dưỡng, chất xơ và chất chống oxy hóa...', image: '/img_category_decorative.png' },
  'gao-cam-trau': { name: 'Cám/trấu', description: 'Hạt to tròn, dẻo thơm đặc trưng, chuyên dùng để nấu xôi...', image: '/img_category_decorative.png' },
};

// A simple loading skeleton for the entire product list area
function FilterButtonsFallback() {
  return (
    <div className="mt-8 flex flex-wrap animate-pulse items-center justify-center gap-4 md:justify-start">
      <div className="h-9 w-24 rounded-full bg-gray-200"></div>
      <div className="h-9 w-28 rounded-full bg-gray-200"></div>
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const allProducts = await api.product.getAll({});
  const {tag} = await searchParams;

  return (
    // Set main container to relative for background image positioning
    <main className="relative mx-auto max-w-screen-xl overflow-hidden px-4 sm:px-6 lg:px-8">
      
      {/* Conditionally render the large background image for the default view */}
      {!tag && (
        <Image
          src="/img_product_background.png"
          alt="Product background illustration"
          width={850}
          height={498}
          className="absolute -right-16 top-0 -z-10 h-auto w-2/3 max-w-[850px] lg:-right-24"
          priority
        />
      )}

      {/* Dynamic Header Section */}
      <div className={`mt-[43px] flex flex-col ${
          // If a tag is active, center everything. Otherwise, center on mobile but align left on larger screens.
          tag ? 'items-center' : 'items-center md:items-start md:pl-10'
        }`}
      >
        <h1 className="text-5xl font-bold text-steel-blue md:text-[56px]">Sản phẩm</h1>

        {/* Filter Buttons Wrapper */}
        <div className="relative z-10 mt-8 w-full">
          {/* Conditionally render the small decorative lines for the filtered view */}
          {tag && (
            <div className="absolute inset-x-0 top-0 -z-10 -mt-4 hidden h-32 w-full items-center justify-center overflow-hidden lg:flex">
              <div className="h-full w-64 bg-[url('/images/decorative-lines.svg')] bg-contain bg-center bg-no-repeat opacity-50"></div>
            </div>
          )}
          <Suspense fallback={<FilterButtonsFallback />}>
            <FilterButton categories={CATEGORY_DATA} />
          </Suspense>
        </div>
      </div>
      
      {/* Product list remains a client component, but no longer contains the buttons */}
      <FilteredProductList allProducts={allProducts} categories={CATEGORY_DATA} />

      <div className="h-20" />
    </main>
  );
}