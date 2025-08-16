// src/app/products/[slug]/_components/ProductTabs.tsx
'use client';

type ProductTabsProps = {
  descriptionHtml: string | null;
};


const ProductDescription = ({ htmlContent }: { htmlContent: string }) => {
  const details = `<p>${htmlContent.replace(/\n/g,"<br />")}</p>`
  console.log(htmlContent)
  return <div className="text-blue-500 prose max-w-none font-fz-poppins" dangerouslySetInnerHTML={{ __html: details }} />;
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