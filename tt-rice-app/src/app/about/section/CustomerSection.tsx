"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { ContactFormData } from "~/app/types/Types";
import type { Testimonial } from "~/app/types/Types"

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
export function CustomerSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const testimonial = testimonials[currentIndex];
  if (!testimonial) return ""; 
  return (
    <section className="pt-20 pb-5 bg-[#FBFFF2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-alegreya-sans" style={{ color: "#0A5B89" }}>
            Hạt gạo Tư Trúc qua câu chuyện<br className="sm:hidden" /> của mỗi người dùng
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 font-alegreya-sans" style={{ color: "#667085" }}>
            Khách hàng nói gì về Tư Trúc?
          </p>
          <div className="flex-shrink-0 md:flex-[0.25]" >
            <Image src="/img_.svg" alt="Quote" width={56} height={39} />
          </div>
          <div className="py-6">
            <p className="text-sm sm:text-base md:text-lg font-fz-poppins text-gray-light leading-relaxed flex-1" style={{color:"#667085"}}>
              {testimonial.content}
            </p>
          </div>
          <div className="flex flex-col items-center py-6 gap-4 md:flex-[1]">
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
    </section>
  );
}
