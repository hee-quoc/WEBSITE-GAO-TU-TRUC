
"use client"; 

import { useState,useEffect } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import { useMediaQuery } from '~/app/hooks/useMediaQuery';

const slidesDesktop = [
  { id: 0, imageSrc: "/images/home/img_hero_background2.svg" , width: 1440, height: 915},
  { id: 1, imageSrc: "/images/home/img_hero_background2.svg" , width: 1440, height: 915},
  { id: 2, imageSrc: "/images/home/img_hero_background2.svg" , width: 1440, height: 915},
  { id: 3, imageSrc: "/images/home/img_hero_background2.svg" , width: 1440, height: 915},
];
const slidesMobile = [
  { id: 0, imageSrc: "/images/home/img_hero_background_mobile.png", width: 375, height: 798 },
  { id: 1, imageSrc: "/images/home/img_hero_background_mobile.png", width: 375, height: 798 },
  { id: 2, imageSrc: "/images/home/img_hero_background_mobile.png", width: 375, height: 798 },
  { id: 3, imageSrc: "/images/home/img_hero_background_mobile.png", width: 375, height: 798 },
];

export function HeroSection() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const slides = isMobile ? slidesMobile : slidesDesktop;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
      if (isClicked) {
        // 1. Set a timer for 5000 milliseconds (5 seconds).
        const timerId = setTimeout(() => {
          // 2. After 5 seconds, set 'isClicked' back to false.
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
      window.location.href = "/products";
    };
    
  return (
    
    <section className={`relative w-full overflow-x-hidden ${isMobile ? 'min-h-screen' : ''}`}>
      <div
        className={`flex transition-transform duration-500 ease-in-out ${isMobile ? 'min-h-screen' : ''}`}
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / slides.length}%)`,
        }}
      >
        {slides.map((slide) => (
          // Each slide is now a flexible item that takes up its share of the container width.
          <div
            key={slide.id}
            className="flex-shrink-0"
            style={{ width: `${100 / slides.length}%` }} // e.g., 33.33% width for 3 slides
          >
            <Image
              src={slide.imageSrc}
              alt={`Hero Background ${slide.id + 1}`}
              width={slide.width}
              height={slide.height}
              priority={slide.id === 0}
              quality={85}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
        <div id="hero-slogan" className="absolute inset-0 flex top-[116px] z-10 text-center ">
            <div className="relative inline-block mx-auto w-full max-w-[1020px] px-4">
              {isMobile?<h1 className="text-steel-blue text-[42px] font-bold leading-[96%] top-1">
                Thương Hiệu<br /> 
                Gạo Nâng Tầm <br />
                Tinh Hoa Ngọc <br />
                Thực Đất Việt
              </h1>:<h1 className="text-steel-blue md:text-[56px] font-bold top-1 leading-[96%]">
                Thương Hiệu Gạo<br />
                Nâng Tầm Tinh Hoa Ngọc Thực Đất Việt
              </h1>}
              <Button
                size="medium"
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
                onClick={handleClick}
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

          <div className="absolute left-4 top-[425px] md:top-2/5 transform -translate-y-1/2 z-20">
            <button
              onClick={handlePrev}
              className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg hover:bg-green-normal transition-colors"
            >
              <Image src="/img_arrowleft.svg" alt="Previous" width={16} height={16} />
            </button>
          </div>
          <div className="absolute right-4 top-[425px] md:top-2/5 transform -translate-y-1/2 z-20">
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