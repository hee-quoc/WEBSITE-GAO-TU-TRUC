// src/app/products/[slug]/_components/ProductTabs.tsx
'use client';

type ProductTabsProps = {
  descriptionHtml: string | null;
};


const ProductDescription = ({ htmlContent }: { htmlContent: string }) => {
  return <div className="prose max-w-none font-fz-poppins" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export function ProductTabs({ descriptionHtml }: ProductTabsProps) {
  
  return (
    <div className="mt-8">
      <div className=" border-gray-200">
        <ul className="font-bold flex space-x-4 font-fz-poppins mb-2" role="tablist">
          Chi tiết sản phẩm:
        </ul>
      </div>
      <div className="">
        <div role="tabpanel">
            {descriptionHtml ? (
              <ProductDescription htmlContent={descriptionHtml} />
            ) : (
              <p>Không có chi tiết sản phẩm.</p>
            )}
          </div>
      </div>
    </div>
  );
}