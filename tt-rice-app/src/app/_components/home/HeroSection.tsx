

import Image from 'next/image';
import Button from '../ui/Button';
export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/image_hero.svg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div id="frame-225" className="text-center">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-6xl font-bold text-blue-dark leading-tight ">
                Thương Hiệu Gạo<br />
                Nâng Tầm Tinh Hoa Ngọc Thực Đất Việt
              </h1>
              <Button 
                size="large" 
                className="
                  absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2
                  z-10 flex items-center gap-2
                "
              >
                <span>Khám phá sản phẩm</span>
                <Image
                  src="/img_icon_wheat.svg"
                  alt="Wheat Icon"
                  width={20}
                  height={20}
                />
              </Button>

            </div>
          </div>
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/img_arrowleft.svg" alt="Previous" width={16} height={16} />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/img_arrowright.svg" alt="Next" width={16} height={16} />
            </button>
          </div>
          {/* Pagination */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <Image src="/favicon.ico" alt="Pagination" width={78} height={18} />
          </div>
        </div>
        
      </section>
  );
}