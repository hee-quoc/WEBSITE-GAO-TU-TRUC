"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { ContactFormData } from "~/app/types/Types";
import type { Testimonial } from "~/app/types/Types"

const testimonials: Testimonial[] = [
    {
      id: '1',
      content: 'Gạo Tư Trúc nấu lên thơm nhẹ, hạt dẻo tơi đều, để nguội vẫn không hề khô cứng. Ăn vào lại thấy nhớ cái vị cơm ngày xưa - cái vị ngọt lành, mộc mạc mà giờ chẳng dễ tìm. Bây giờ nhờ có Tư Trúc, tôi mới có thể tìm lại được cái ngon giản dị ấy trong bữa ăn gia đình mỗi ngày.',
      author: 'Chị Mai',
      position: 'Nội trợ',
      avatar: '/chi_mai_story.png'
    },
    {
      id: '2',
      content: 'Tui đứng bếp trong căn tin bệnh viện cũng mấy chục năm rồi. Điều quan trọng nhất của của mỗi suất ăn là phải đủ chất, sạch sẽ, ngon miệng, để các y bác sĩ và bệnh nhân ăn no, đủ sức chống lại bệnh tật chứ. Mà tui nói thiệt là từ ngày đổi qua gạo Tư Trúc thấy  bệnh nhân và các nhân viên y tế ăn uống ngon miệng hơn,  nên bản thân cũng thấy an tâm hơn hẳn.',
      author: 'Cô Sáu',
      position: 'Bếp trưởng căn tin bệnh viện',
      avatar: '/cosau_story.png',
   },
   {
      id: '3',
      content: 'Làm thì mệt đó, nhưng mà bữa trưa lúc nào cũng có cơm ngon, nóng hổi, dẻo thơm, nên mấy anh em ai ai cũng vui bụng.  Một năm 12 tháng 4 mùa ăn cơm ở đây riết thấy quen miệng luôn, hổm bị bệnh nghỉ ở nhà mà tự nhiên tới trưa là thấy nhớ nhớ  cơm phần ở công ty…',
      author: 'Anh Cường',
      position: 'Công nhân khu công nghiệp',
      avatar: '/anh_cuong_story.png',
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
            <p className="max-w-[566px] text-[16px] sm:text-[8px] md:text-[16px] font-fz-poppins text-gray-light leading-relaxed flex-1" style={{color:"#667085"}}>
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
