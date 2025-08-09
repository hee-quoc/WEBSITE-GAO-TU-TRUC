import { useState, useEffect } from 'react';
import type { Product } from '@prisma/client';
import Image from 'next/image';
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (isClicked) {
      const timerId = setTimeout(() => {
        setIsClicked(false);
        console.log("Card re-enabled.");
      }, 5000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isClicked]);
  const handleClick = () => {
    if (isClicked) {
      console.log('Action is temporarily disabled.');
      return;
    }

    setIsClicked(true);
    window.location.href = `/products/${product.slug}`;
  };
  return (
    <div className="flex flex-col items-center gap-4 md:h-[378px] md:w-[278] hover:scale-110" key={product.slug} onClick={handleClick}>
      <Image
          src={product.productImages[0] ? product.productImages[0] : '/default-image.png'}
          alt={product.title}
          width={278} 
          height={302}
          className="h-auto w-full rounded-md object-cover"
          loading="lazy" 
        />
      <h3 className="text-[20px] text-center font-medium text-steel-blue pb-1 hover:underline font-fz-poppins">{product.title}</h3>
    </div>
  );
}