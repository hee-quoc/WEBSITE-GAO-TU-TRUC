import { api } from "~/trpc/server";
import { Suspense } from "react";
import { FilteredProductList } from '~/app/_components/product/FilteredProductList';
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
function ProductListFallback() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap animate-pulse items-center justify-center gap-4 mt-8">
        <div className="h-9 w-24 rounded-full bg-gray-200"></div>
        <div className="h-9 w-28 rounded-full bg-gray-200"></div>
        <div className="h-9 w-32 rounded-full bg-gray-200"></div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-4">
            <div className="h-48 w-full rounded-md bg-gray-200"></div>
            <div className="h-6 w-3/4 rounded-md bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  // 1. Fetch ALL products once. The `tag` is no longer needed here.
  const allProducts = await api.product.getAll({});
  return (
    <main className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="mt-[43px] flex flex-col items-center">
        <h1 className="md:text-[56px] font-bold text-steel-blue text-5xl">Sản phẩm</h1>
      </div>
      <div className="relative w-full h-full">
        <Image
          src="/img_product_background.png"
          alt="Product Illustration"
          width={850}
          height={498}
          className="absolute top-[-183px] right-[-103px] h-auto"
        />
        </div>
      <Suspense fallback={<ProductListFallback />}>
        <FilteredProductList allProducts={allProducts} categories={CATEGORY_DATA} />
      </Suspense>
      
      <div className="h-20" />
    </main>
  );
}