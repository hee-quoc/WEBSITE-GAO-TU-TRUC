
"use client"; 

import { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const slides = [
  { id: 0, imageSrc: "/image_hero.svg" },
  { id: 1, imageSrc: "/images/home/img_hero_background2.svg" },
  { id: 2, imageSrc: "/images/home/img_hero_background3.svg" },
  { id: 3, imageSrc: "/image_hero.svg" },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // 1. The main section is now a flex container to center the foreground content.
    <section className="relative min-h-screen bg-white overflow-hidden flex justify-center pt-[44px]">

      {/* --- BACKGROUND IMAGE SLIDER --- */}
      {/* 2. This container is positioned absolutely to sit behind everything. */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out z-0"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          // Each slide is now just the background image.
          <div key={slide.id} className="relative w-full flex-shrink-0 min-h-screen">
            <Image
              src={slide.imageSrc}
              alt={`Hero Background ${slide.id + 1}`}
              fill
              className="object-cover"
              priority={slide.id === 0} 
            />
          </div>
        ))}
      </div>
      <div id="hero-slogan" className="relative text-center z-10">
        <div className="relative inline-block mx-auto w-full max-w-[1020px] px-4">
          <h1 className="text-steel-blue font-alegreya-sans md:text-6xl text-4xl font-bold leading-tight text-blue-dark sm:text-4xl lg:text-6xl ">
            Thương Hiệu Gạo<br />
            Nâng Tầm Tinh Hoa Ngọc Thực Đất Việt
          </h1>
          <Button
            size="large"
            className="
              absolute left-1/2 -translate-x-1/2 mt-2 
              z-10 flex items-center gap-2 bg-green-normal 
              hover:bg-green-dark
              transition-colors  
              duration-200 
              rounded-full
              text-sm      
              md:text-base
            "
          >
            <span className='flex-shrink-0'>Khám phá sản phẩm</span>
            <Image
              src="/icon_wheat_white.svg"
              alt="Wheat Icon"
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </Button>
        </div>
      </div>

      {/* --- UI CONTROLS (ARROWS & DOTS) --- */}
      {/* These remain unchanged as they were already positioned correctly with z-index. */}
      <div className="absolute left-4 top-60 md:top-2/5 transform -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg hover:bg-green-normal transition-colors"
        >
          <Image src="/img_arrowleft.svg" alt="Previous" width={16} height={16} />
        </button>
      </div>
      <div className="absolute right-4 top-60 md:top-2/5 transform -translate-y-1/2 z-20">
        <button
          onClick={handleNext}
          className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg hover:bg-green-normal transition-colors"
        >
          <Image src="/img_arrowright.svg" alt="Next" width={16} height={16} />
        </button>
      </div>
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center gap-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className="cursor-pointer" 
            aria-label={`Go to slide ${index + 1}`}
          >
            <Image
              src={
                currentIndex === index
                  ? "/Pagination_current.svg" 
                  : "/Pagination.svg" 
              }
              alt={`Pagination dot ${index + 1}`}
              width={18} 
              height={18} 
              className="transition-all duration-300" 
            />
          </button>
        ))}
      </div>
    </section>
  );
}