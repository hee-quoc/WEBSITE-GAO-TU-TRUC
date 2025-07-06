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

export function FilteredProductList({ allProducts, categories }: FilteredProductListProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag');

  const filteredProducts = useMemo(() => {
    if (!activeTag) {
      return allProducts;
    }
    return allProducts.filter(product => product.tags.includes(activeTag));
  }, [activeTag, allProducts]);

  const selectedCategory = activeTag ? categories[activeTag] : null;

  return (
    // The component now starts with the product grid. Add margin-top for spacing.
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
        <section className="mt-20 rounded-lg bg-green-lightest p-6 sm:mt-20 lg:h-[384px] lg:p-8">
          <div className="grid h-full grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-gray">{selectedCategory.name}</h2>
              <p className="text-gray font-fz-poppins leading-relaxed">{selectedCategory.description}</p>
            </div>
            <div className="relative flex h-full w-auto items-center justify-center">
              <Image 
                src={selectedCategory.image} 
                alt={`${selectedCategory.name} decorative image`}
                width={408} 
                height={320}
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}