// src/app/_components/product/FilteredProductList.tsx

'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Product } from '@prisma/client';
import Image from 'next/image';

import { ProductCard } from '~/app/products/_components/ProductCard';
import { type CategoryData } from '~/app/products/page';

interface FilteredProductListProps {
  allProducts: Product[];
  categories: Record<string, CategoryData>;
}
const ProductDescription = ({ htmlContent }: { htmlContent: string }) => {
  return <div className="text-blue-500 font-fz-poppins leading-relaxed" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export function FilteredProductList({ allProducts, categories }: FilteredProductListProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag');

  const filteredProducts = useMemo(() => {
    if (!activeTag) {
      return allProducts;
    }
    return allProducts.filter(product => product.tag.includes(activeTag));
  }, [activeTag, allProducts]);

  const selectedCategory = activeTag ? categories[activeTag] : null;

  return (
    <div className="mt-12 lg:w-[1280px]">
      <div className="grid grid-cols-2 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4 ">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp.
          </p>
        )}
      </div>

      {selectedCategory && (
        
        <section className="mt-20 rounded-lg bg-green-lightest sm:mt-20">
          <div className="grid grid-cols-1 items-center lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col pl-2 md:pl-16">
              <h2 className="text-[56px] font-bold text-steel-blue">{selectedCategory.name}</h2>
              <ProductDescription htmlContent={selectedCategory.description} />
            </div>

            <div className="flex w-full justify-end">
              <Image 
                src={selectedCategory.image} 
                alt={`${selectedCategory.name} decorative image`}
                width={506}
                height={372} 
                className="h-auto w-full max-w-[506px] object-cover" 
                sizes="(max-width: 1024px) 100vw, 506px" 
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}