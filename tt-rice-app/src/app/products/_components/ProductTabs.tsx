// src/app/products/[slug]/_components/ProductTabs.tsx
'use client';

import { useState } from 'react';

type ProductTabsProps = {
  descriptionHtml: string | null;
};

// A helper to sanitize and render the HTML from the database
const ProductDescription = ({ htmlContent }: { htmlContent: string }) => {
  // WARNING: This is safe if the HTML comes from a trusted source (like your admin panel/seed file).
  // If this HTML could ever come from untrusted user input, you MUST sanitize it
  // using a library like 'dompurify' to prevent XSS attacks.
  return <div className="prose max-w-none font-fz-poppins" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export function ProductTabs({ descriptionHtml }: ProductTabsProps) {
  return (
    <div className="mt-8">
      <div className="border-b border-gray-200">
        <ul className="-mb-px flex space-x-4 font-fz-poppins" role="tablist">
          Chi tiết sản phẩm
        </ul>
      </div>
      <div className="mt-6">
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