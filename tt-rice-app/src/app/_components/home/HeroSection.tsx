

import Image from 'next/image';
import Button from '../ui/Button';
export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/favicon.ico"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-dark mb-8 leading-tight">
              Thương Hiệu Gạo<br />
              Nâng Tầm Tinh Hoa Ngọc Thực Đất Việt
            </h1>
            <Button size="large" className="mb-12">
              Khám phá sản phẩm
            </Button>
          </div>
          {/* Navigation Arrows */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <button className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Previous" width={16} height={16} />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <button className="w-9 h-9 bg-white-transparent border border-green-light-2 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Next" width={16} height={16} />
            </button>
          </div>
          {/* Pagination */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
            <Image src="/favicon.ico" alt="Pagination" width={78} height={18} />
          </div>
          {/* Social Icons */}
          <div className="absolute right-8 bottom-20 flex flex-col gap-4">
            <div className="w-11 h-11 bg-green-light-1 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Social Icon" width={24} height={24} />
            </div>
            <div className="w-11 h-11 bg-green-light-1 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Social Icon" width={24} height={24} />
            </div>
            <div className="w-11 h-11 bg-green-light-1 rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Social Icon" width={24} height={24} />
            </div>
            <div className="w-11 h-11 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Image src="/favicon.ico" alt="Social Icon" width={24} height={24} />
            </div>
          </div>
        </div>
      </section>
  );
}