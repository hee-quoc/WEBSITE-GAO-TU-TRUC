// src/app/products/[slug]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '~/server/db';
import { api } from '~/trpc/server';
import { ProductTabs } from '../_components/ProductTabs';

type ProductPageProps = {
  params: { slug: string };
};

// Fetch data for metadata (unchanged)
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await db.product.findUnique({ where: { slug: params.slug }, select: { name: true, description: true } });
  if (!product) return { title: 'Product Not Found' };
  return { title: `${product.name} | Gạo Store`, description: product.description?.substring(0, 150) ?? '' };
}

// Generate static paths (unchanged)
export async function generateStaticParams() {
  const products = await db.product.findMany({ select: { slug: true } });
  return products.map((product) => ({ slug: product.slug }));
}

// --- Component for the Breadcrumb banner at the top ---
const BreadcrumbBanner = ({ productName }: { productName: string }) => {
  const bannerImageUrl = 'https://omweb-prod.s3.ap-southeast-1.amazonaws.com/58/nhamaygaotutruc/___nh_banner______cut.png';
  return (
    <div
      className="bg-cover bg-center py-16 text-white"
      style={{ backgroundImage: `url(${bannerImageUrl})` }}
    >
      <div className="container mx-auto bg-black/30 p-4 text-center backdrop-blur-sm">
        <h2 className="text-4xl font-bold">{productName}</h2>
        <ul className="mt-4 flex justify-center space-x-2 text-lg">
          <li><Link href="/" className="hover:underline">Trang chủ</Link></li>
          <li><span>/</span></li>
          <li><span className="font-semibold">{productName}</span></li>
        </ul>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const product = await api.product.getBySlug({ slug });

  // Fetch a few related products to show at the bottom
  const relatedProducts = await db.product.findMany({
    where: { NOT: { slug: slug } }, // Exclude the current product
    take: 3, // Get 3 other products
  });

  if (!product) {
    notFound();
  }

  const productUrl = `https://your-domain.com/products/${product.slug}`; // Replace with your actual domain

  return (
    <main>
      <BreadcrumbBanner productName={product.name} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Main Content (9 columns on desktop) */}
          <div className="col-span-12 md:col-span-9">
            {/* --- Top section with Image and Info --- */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Image Gallery */}
              <div className="w-full">
                <ProductImage
                  imageData={product.imageData}
                  imageType={product.imageType}
                  alt={product.name}
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                
                {/* Placeholder for SKU/Brand if you add them later */}
                <div className="mt-4 text-sm text-gray-500">
                  <p>Thương hiệu: <span className="font-semibold text-gray-700">Thương hiệu</span></p>
                  <p>SKU: <span className="font-semibold text-gray-700">M8S4</span></p>
                </div>
                
                <div className="mt-6 rounded-lg bg-gray-50 p-4">
                  <p className="text-lg font-semibold">Giá: <span className="text-red-600">Liên hệ</span></p>
                  <p className="mt-2 text-gray-700">Vui lòng liên hệ để biết thêm chi tiết</p>
                </div>

                 {/* Add to Cart button or Contact button */}
                 <div className="mt-auto pt-8">
                  <button className="w-full rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700">
                    Liên hệ ngay
                  </button>
                </div>
              </div>
            </div>

            {/* --- Tabs section --- */}
            <ProductTabs descriptionHtml={product.description} productUrl={productUrl} />
          </div>

          {/* Sidebar (3 columns on desktop, hidden on mobile) */}
          <aside className="col-span-12 md:col-span-3">
            <div className="rounded-lg border p-4">
              <h2 className="text-xl font-bold">Danh mục</h2>
              <ul className="mt-4 space-y-2">
                {/* This would be dynamically generated */}
                <li><a href="#" className="hover:text-blue-600">Gạo Thơm</a></li>
                <li><a href="#" className="hover:text-blue-600">Gạo Dẻo</a></li>
                <li><a href="#" className="hover:text-blue-600">Gạo Lứt</a></li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center">Sản phẩm liên quan</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related) => (
              <Link href={`/products/${related.slug}`} key={related.id} className="h-100 group block rounded-lg border p-4 text-center transition hover:shadow-lg">
                <div className="relative h-auto w-full overflow-hidden rounded item-center justify-center">
                   <ProductImage imageData={related.imageData} imageType={related.imageType} alt={related.name}/>
                </div>
                <h3 className="mt-4 font-semibold text-gray-800 group-hover:text-blue-600">{related.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}


// Helper component for rendering an image (unchanged from before)
const ProductImage = ({imageData, imageType, alt}: {imageData: Uint8Array | null; imageType: string | null; alt: string;}) => {
  if (!imageData || !imageType) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">
        No Image
      </div>
    );
  }
  const base64String = Buffer.from(imageData).toString('base64');
      
      // 4. Construct the complete Data URL.
      const base64Image = `data:${imageType};base64,${base64String}`;
   
  return (
    <div className="relative h-full w-full item-center justify-center">
      <Image
        src={base64Image}
        alt={alt}
        width={278} // Setting dimensions is good for layout stability
        height={302}
        className="rounded-md object-cover"
        loading="lazy" // Crucial for performance with many images
      />
    </div>
  );
};