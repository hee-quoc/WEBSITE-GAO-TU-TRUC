"use client";
import type { Testimonial } from "~/app/types/Types"
import Image from "next/image"
import { useState } from 'react';
const testimonials: Testimonial[] = [
    {
        id: '1',
        content: 'Làm lúc bao nhiêu năm nay, tôi hiểu rõ từng hạt gạo mình làm ra. Từ lúc gieo mạ đến ngày thu hoạch, đều tự tay chăm chút. Thành ra, bao năm nay tôi chỉ ăn mỗi gạo Tư Trúc, vì tôi biết chắc từng hạt cơm sạch sẽ, tử tế như chính công sức mình bỏ vào.',
        author: 'Anh Năm Tiến (37 tuổi)',
        position: 'Nông dân Long Điền',
        avatar: '/img_ellipse_15.png'
    },
    {
      id: '2',
      content: 'Tôi đã chọn Tư Trúc vì sự an tâm về chất lượng và quy trình canh tác sạch...',
      author: 'Chị Hoa (45 tuổi)',
      position: 'Tiểu thương chợ Bến Thành',
      avatar: '/img_ellipse_15.png',
  },
];
export function Testimonial(){
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const testimonial = testimonials[currentIndex];
  if (!testimonial) return ""; 
    return (
        <section className="pb-20 pt-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-[20%_70%] gap-8 lg:gap-12">
            {/* Title Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-green-dark font-alegreya-sans">
                Mọi người nghĩ gì về Tư Trúc
              </h2>
            </div>

            {/* Testimonial Content */}
            <div className="bg-white border rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col gap-6" style={{ borderColor: '#E9F2DA' }}>
              {/* Testimonial Text + Avatar */}
              <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
                {/* Quote Icon */}
                <div className="flex-shrink-0 md:flex-[0.25]" >
                  <Image src="/img_.svg" alt="Quote" width={56} height={39} />
                </div>

                {/* Content Text */}
                <div className="flex flex-col md:flex-[3]">
                  <p className="text-sm sm:text-base md:text-lg font-fz-poppins text-gray-light leading-relaxed flex-1" style={{color:"#667085"}}>
                    {testimonial.content}
                  </p>
                  {/* Pagination */}
                  <div className="flex gap-2 mt-2 sm:mt-4">
                    {testimonials.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="rounded-full overflow-hidden transition duration-300"
                      >
                        <Image
                          src={
                            index === currentIndex
                              ? '/Pagination_current.svg'
                              : '/Pagination.svg'
                          }
                          alt={item.author}
                          width={18}
                          height={8}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Divider and Avatar */}
                <div className="flex flex-col items-center gap-4 md:flex-[1]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div className="text-center">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold font-alegreya-sans text-blue-dark mb-1" style={{color:"#0A5B89"}}>
                      {testimonial.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-muted font-alegreya-sans "style={{color:"#5C6578"}}>
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}