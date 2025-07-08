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
  'gao-an': {
    name: 'Gạo ăn',
    description: `<p>Tư Trúc tin rằng gạo không chỉ là lương thực để no bụng, mà còn là thức quà để thưởng, để nghiệm, và để tự hào. </p>
    <p>Mỗi hạt gạo Tư Trúc đều được tinh chọn từ giống lúa chất lượng, canh tác theo quy trình nghiêm ngặt, thu hoạch đúng vụ, và được sàng lọc kỹ lưỡng từ đội ngũ công nhân nhiều năm kinh nghiệm bằng cả chuyên môn lẫn tâm huyết - để đem chất lượng hạt gạo ổn định, hương vị thuần khiết và ngọt lành từ đồng nội đến mỗi bữa cơm Việt. </p>`,
    image: '/images/products/Graphic.svg',
  },
  'gao-nguyen-lieu': {
    name: 'Gạo nguyên liệu',
    description: `<p>Gạo nguyên liệu là dòng gạo chuyên dụng được chọn lọc kỹ về hàm lượng tinh bột, độ tấm và độ ẩm, dùng để làm bún tươi, bánh phở, bánh tráng và các món truyền thống khác.</p> 
    <p>Gạo có hạt thon vừa hoặc hơi tròn, màu trắng đục, chắc, khô, ít tạp chất để dễ xay thành bột mịn mà không bị vữa. Gạo được chọn lọc kỹ lưỡng, không pha trộn giống, không xử lý hương - đảm bảo độ thuần nhất, ổn định trong từng mẻ sản xuất. Thành phẩm sau chế biến đạt độ dai vừa phải, không bở, có độ trong, độ trắng và dẻo tự nhiên, không cần phụ gia tạo dai.</p>
`,
    image: '/images/products/Graphic.svg',
  },
  'gao-thong-dung': {
    name: 'Gạo thông dụng',
    description: `
    <p>Gạo công nghiệp Tư Trúc là sự lựa chọn phổ biến cho các bếp ăn tập thể nhờ độ ổn định, giá hợp lý và phù hợp với nhiều đối tượng.</p>
<p>Từng hạt gạo được kiểm soát chặt chẽ từ đầu vào đến thành phẩm, không pha tạp, không tẩm hương nhân tạo - đảm bảo chất lượng đồng đều và ổn định mỗi lần nấu. Khi chín, cơm giữ được độ mềm hoặc độ tơi tuỳ từng loại, dễ ăn, phù hợp cho các suất ăn quy mô lớn như nhà máy, trường học, bệnh viện hay căn - tin doanh nghiệp.</P>
`,
    image: '/images/products/Graphic.svg',
  },
  'gao-cam-trau': {
    name: 'Cám/trấu',
    description: `<p>Tại Tư Trúc, không chỉ hạt gạo được chăm chút, mà phụ phẩm từ xay xát như cám và trấu cũng được tận dụng tối đa, góp phần phát triển mô hình sản xuất nông nghiệp tuần hoàn, không lãng phí:</p>
    <p> Cám gạo có thể dùng để sản xuất dầu cám gạo cho thực phẩm và mỹ phẩm; Trấu được ứng dụng trong sản xuất và đời sống - từ nhiên liệu đốt lò, sấy nông sản, đến ủ phân hữu cơ, làm giá thể trồng cây, lót chuồng chăn nuôi, hoặc tái chế thành củi trấu, gạch không nung, ván ép sinh học.</p>
`,
    image: '/images/products/Graphic.svg',
  },
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
  searchParams: Promise<{ tag?: string }>;
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