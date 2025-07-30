"use client";

import Image from 'next/image';
import { useMediaQuery } from '~/app/hooks/useMediaQuery';


export function ProductHero() {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const imageSrc = isMobile ? '/images/products/img_product_background_mobile.svg' : '/images/products/img_product_background.svg';
    const imageWidth = isMobile ? 375 : 1440;
    const imageHeight = isMobile ? 400 : 357; 
  return (
    <div
        className={`relative transition-transform duration-500 ease-in-out${isMobile ? 'min-h-screen' : ''}`}
        style={{width: `100%`,}}
    >
        <div
            className="flex-shrink-0"
            style={{ width: `100%` }} 
        >
            <Image
            src={imageSrc}
            alt="products background"
            width={imageWidth}
            height={imageHeight}
            quality={85}
            sizes="100vw"
            className="w-full h-auto"
            />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center w-full h-full">
            <h1 className="text-[42px] md:text-[56px] text-white font-bold leading-[96%] tracking-[0%] font-alegreya-sans">
                Gạo thơm cơm dẻo
            </h1>
            <h1 className="text-[42px] md:text-[56px] text-white font-bold leading-[96%] tracking-[0%] font-alegreya-sans mt-2">
                cho mọi nhà
            </h1>
            <h2 className={`${isMobile? "w-[230px]" :''} text-[28px] md:text-[32px] text-white leading-[140%] font-alegreya mt-4`}>
                Các loại sản phẩm có mặt tại Tư Trúc
            </h2>
        </div>
        
    </div>
  );
}