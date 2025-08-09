// src/app/products/[slug]/page.tsx
import { ProductInfo } from "../_components/ProductInfo";
import { ProductTabs } from "../_components/ProductTabs";
import { ProductUsageGuide } from "../_components/ProductUsageGuide";
import { ProductAccordion } from "../_components/ProductAccordion";
import { ProductCertificates } from "../_components/ProductCertificates";
import { ProductFeatures } from "../_components/ProductFeatures";
import { ProductGallery } from "../_components/ProductGallery";
import Breadcrumb from "../_components/BreadCrumb";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await api.product.getBySlug({ slug: params.slug });
  if (!product) {
    notFound();
  }
  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-20">
          <Breadcrumb />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={product.productImages}/>
          </div>
          <div className="flex flex-col ">
            <ProductInfo product={product}/>
            <ProductTabs  descriptionHtml={product.detail}/>
            <ProductFeatures features={product.properties}/>
            <ProductCertificates/>
            <ProductUsageGuide guide={product.guide} />
            <ProductAccordion product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}