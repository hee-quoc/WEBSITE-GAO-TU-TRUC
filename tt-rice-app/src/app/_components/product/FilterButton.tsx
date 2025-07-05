'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link'; // Import the Link component
import { type CategoryData } from '~/app/products/page';

interface FilterButtonsProps {
  categories: Record<string, CategoryData>;
}

export function FilterButton({ categories }: FilterButtonsProps) {
  // We no longer need useRouter or usePathname, Link handles it for us.
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag');

  const allCategories = [{ slug: null, name: 'Tất cả' }, ...Object.entries(categories).map(([slug, data]) => ({ slug, name: data.name }))];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {allCategories.map(({ slug, name }) => {
        const isActive = activeTag === slug;
        
        // Construct the href for the Link component
        const href = slug ? `/products?tag=${slug}` : '/products';

        return (
          <Link
            key={slug ?? 'all'}
            href={href}
            // `replace` is equivalent to router.replace(), preventing browser history pollution
            //replace 
            // We apply the styling directly to the anchor tag created by Link
            className={`rounded-full border px-6 py-2 text-sm font-bold transition-colors duration-200
              ${isActive
                ? 'border-green-normal bg-green-normal text-white'
                : 'border-green-normal bg-white text-green-normal hover:bg-green-normal hover:text-white'
              }`}
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
}