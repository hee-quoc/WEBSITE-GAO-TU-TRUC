// src/app/products/_components/FilterButton.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { type CategoryData } from '~/app/products/page';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterButtonProps {
  categories: Record<string, CategoryData>;
}

export function FilterButton({ categories }: FilterButtonProps) {
  const searchParams = useSearchParams();
  const activeTag = searchParams?.get('tag');

  const allCategories = [{ slug: null, name: 'Tất cả', id: 0 }, ...Object.entries(categories).map(([slug, data]) => ({ slug, name: data.name, id: data.id }))];

  // Define icon dimensions and desired gap
  const ICON_WIDTH = 24;
  const ICON_MARGIN_RIGHT = 8; // ml-2 in Tailwind
  const RESERVED_SPACE = ICON_WIDTH + ICON_MARGIN_RIGHT; // Total space the icon and its margin needs

  return (
    // <div className={`flex flex-wrap items-center justify-center`}>
    //   {allCategories.map(({ slug, name, id }) => {
    //     const isActive = !slug ? !activeTag : activeTag === slug;
    //     const href = slug ? `/products?tag=${slug}` : '/products';

    //     return (
    //       <div
    //         key={id}
    //         className={`${isActive ? "border-b border-green-normal" : "border-b border-gray-200"} h-[50px] leading-[120%] text-[16px] md:text-[20px]`}
    //       >
    //         <Link
    //           href={href}
    //           className={`
    //             mr-3
    //             ml-3
    //             relative flex h-full items-center
    //             pr-6
    //             pl-[${RESERVED_SPACE + 20}px]
    //             items-center justify-center
    //           `}
    //         >
    //           <AnimatePresence>
    //             {isActive && (
    //               <motion.span
    //                 key="active-icon" 
    //                 className="absolute left-5 inline-block" // left-5 to match right padding
    //                 initial={{ x: RESERVED_SPACE, opacity: 0 }} // Start right of its final spot (e.g., 32px right)
    //                 animate={{ x: -20, opacity: 1 }} // Move to final spot
    //                 exit={{ x: RESERVED_SPACE, opacity: 0 }} // Exit back to the right
    //                 transition={{ type: "spring", stiffness: 300, damping: 30 }}
    //               >
    //                 <Image
    //                   src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/icon/icon_product_button.svg"
    //                   alt="Active filter icon"
    //                   width={ICON_WIDTH}
    //                   height={ICON_WIDTH}
    //                 />
    //               </motion.span>
    //             )}
    //           </AnimatePresence>
    //           <motion.span
    //             layout="position" 
    //             transition={{ type: "spring", stiffness: 300, damping: 30 }}
    //             animate={{ x: isActive ? RESERVED_SPACE : 0 }}
    //             className=""
    //           >
    //             {name}
    //           </motion.span>
    //         </Link>
    //       </div>
    //     );
    //   })}
    // </div>
    <div
      className="
        flex items-center justify-center
        overflow-x-auto whitespace-nowrap
        md:overflow-x-visible md:whitespace-normal
        scrollbar-hide
        px-2
        w-full
      "
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {allCategories.map(({ slug, name, id }) => {
        const isActive = !slug ? !activeTag : activeTag === slug;
        const href = slug ? `/products?tag=${slug}` : '/products';

        return (
          <div
            key={id}
            className={`
              ${isActive ? "border-b border-green-normal" : "border-b border-gray-200"}
              h-[50px] leading-[120%] text-[16px] md:text-[20px]
              inline-block
            `}
          >
            <Link
              href={href}
              className={`
                mr-3
                ml-3
                relative flex h-full items-center
                pr-6
                pl-[${RESERVED_SPACE + 20}px]
                items-center justify-center
              `}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key="active-icon"
                    className="absolute left-5 inline-block"
                    initial={{ x: RESERVED_SPACE, opacity: 0 }}
                    animate={{ x: -20, opacity: 1 }}
                    exit={{ x: RESERVED_SPACE, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Image
                      src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/icon/icon_product_button.svg"
                      alt="Active filter icon"
                      width={ICON_WIDTH}
                      height={ICON_WIDTH}
                    />
                  </motion.span>
                )}
              </AnimatePresence>
              <motion.span
                layout="position"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                animate={{ x: isActive ? RESERVED_SPACE : 0 }}
                className=""
              >
                {name}
              </motion.span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}