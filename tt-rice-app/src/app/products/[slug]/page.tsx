// src/app/products/[slug]/page.tsx
import { ProductInfo } from "../_components/ProductInfo";
import { ProductTabs } from "../_components/ProductTabs";
import { ProductUsageGuide } from "../_components/ProductUsageGuide";
import { ProductAccordion } from "../_components/ProductAccordion";
import { ProductCertificates } from "../_components/ProductCertificates";
import { ProductFeatures } from "../_components/ProductFeatures";
import { ProductGallery } from "../_components/ProductGallery";
import type { info } from "console";

export default async function ProductPage() {
  const product={
    images: [
      '/images/products/Graphic.svg',
      '/images/products/Graphic.svg',
      '/images/products/Graphic.svg',
    ],
    info: {
      name: 'Gạo Tư Trúc',
      description: 'Gạo Tư Trúc là sản phẩm gạo chất lượng cao',
    },
      price: 100000,
      category: 'Gạo ăn',
      origin: 'Việt Nam',
      weight: '5kg',
      sku: 'GT12345',
      stock: 50,
      features: [
        'Hạt gạo dài, thơm ngon',
        'Chất lượng ổn định',
        'Không chứa hóa chất độc hại',
      ],
      
  }
  return (
    <main>
      <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto px-4 py-8">
        <div className="w-full lg:w-1/2">
          <ProductGallery />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-y-6">
          <ProductInfo />
          <ProductTabs  />
          <ProductFeatures />
          <ProductCertificates />
          <ProductUsageGuide />
          <ProductAccordion />
        </div>
      </div>
    </main>
  );
}