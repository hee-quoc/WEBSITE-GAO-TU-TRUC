'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { type Product } from '@prisma/client';
import Image from 'next/image';

import { FilterButton } from '~/app/_components/product/FilterButton'; // Note I renamed the component to plural
import { ProductCard } from '~/app/_components/product/ProductCard';
import { type CategoryData } from '~/app/products/page';

interface FilteredProductListProps {
  // We receive ALL products from the server component
  allProducts: Product[];
  categories: Record<string, CategoryData>;
}

export function FilteredProductList({ allProducts, categories }: FilteredProductListProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag');

  // Use useMemo to efficiently filter products only when the activeTag changes.
  // This is much faster than re-filtering on every render.
  const filteredProducts = useMemo(() => {
    if (!activeTag) {
      return allProducts; // If no tag, show all products
    }
    return allProducts.filter(product => product.tags.includes(activeTag));
  }, [activeTag, allProducts]);

  const selectedCategory = activeTag ? categories[activeTag] : null;

  return (
    <>
      <div className="relative mt-8">
        {activeTag && (
          <div className="absolute inset-x-0 top-0 -z-10 -mt-4 hidden h-32 w-full items-center justify-center overflow-hidden lg:flex">
            <div className="h-full w-64 bg-[url('/images/decorative-lines.svg')] bg-contain bg-center bg-no-repeat opacity-50"></div>
          </div>
        )}
        <FilterButton categories={categories} />
      </div>

      <div className=" grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
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
        <section className="mt-20 rounded-lg bg-green-lightest p-6 lg:p-8 sm:mt-20 lg:h-[384px]">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 h-full">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-gray">{selectedCategory.name}</h2>
              <p className="text-gray leading-relaxed font-fz-poppins">{selectedCategory.description}</p>
            </div>
            <div className="flex items-center justify-center h-full w-auto">
              <Image 
                src={selectedCategory.image} 
                alt={`${selectedCategory.name} decorative image`}
                width={408} 
                height={320}
                className="h-full w-auto"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}