// src/app/products/[slug]/page.tsx
import { ProductInfo } from "../_components/ProductInfo";
import { ProductTabs } from "../_components/ProductTabs";
import { ProductUsageGuide } from "../_components/ProductUsageGuide";
import { ProductAccordion } from "../_components/ProductAccordion";

import { ProductFeatures } from "../_components/ProductFeatures";
import { ProductGallery } from "../_components/ProductGallery";
import Breadcrumb from "../_components/BreadCrumb";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { api } from "~/trpc/server";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import DeleteProductButton from "../_components/utils/DeleteProductButton";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const product = await api.product.getBySlug({ slug });
  if (!product) {
    notFound();
  }
  return (
    <main className="bg-green-50">
      {session?.user &&(<div className="max-w-7xl mt-20 justify-end">
        <Link
          href={`/products/edit/${slug}`}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Pencil className="h-4 w-4" />
          Chỉnh sửa sản phẩm
        </Link>
        <Link
          href={`/products/create`}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Pencil className="h-4 w-4" />
          Thêm sản phẩm mới
        </Link>
        <DeleteProductButton productId={product.id} />
      </div>)}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mt-20">
          <Breadcrumb title={product.title}/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16">
          
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={product.productImages}/>
          </div>
          <div className="flex flex-col ">
            <ProductInfo product={product}/>
            <ProductTabs  descriptionHtml={product.detail}/>
            {!product.tag.includes("phu-pham")&&<>
            <ProductFeatures features={product.properties}/>
            <ProductUsageGuide guide={product.guide} />
            <ProductAccordion product={product} />
            </>}
            
          </div>
        </div>
      </div>
    </main>
  );
}
