"use client";

import Image from "next/image";
import React, { useState , useEffect} from "react";
import type { ContactFormData } from "~/app/types/Types";
const backgroundImages = [
  '/about_glass_background.jpg',
  '/about_glass_background.jpg',
  '/about_glass_background.jpg',
]; // Add your actual image paths here (place in public folder)

const textContent = [
  {
    heading: 'Củng cố vị trí tại thị trường Đông Nam Bộ và hướng đến cung ứng gạo toàn quốc',
    paragraph:
      'Từ Trúc hướng đến việc củng cố vị thế tại thị trường Đông Nam Bộ, và vươn mình trở thành "thương hiệu quốc dân" - có mặt trong mỗi căn bếp Việt, trở thành biểu tượng cho chất lượng và sự an tâm trong từng bữa ăn.',
  },
  {
    heading: 'Phát triển sản phẩm thân thiện với môi trường',
    paragraph:
      'Từ Trúc cam kết bảo vệ môi trường thông qua quy trình sản xuất sạch, giảm thiểu tác động và hướng tới một tương lai bền vững cho ngành nông nghiệp Việt Nam.',
  },
  {
    heading: 'Mở rộng xuất khẩu ra thị trường quốc tế',
    paragraph:
      'Đưa sản phẩm gạo Việt chất lượng cao vươn xa hơn trên bản đồ thế giới, xây dựng thương hiệu uy tín trong mắt người tiêu dùng toàn cầu.',
  },
];


const coreValues = [
  {
    title: 'Vững đầu ra cho nông dân',
    description:
      'Tôn trọng người nông dân gìn giữ nghề truyền thống; hỗ trợ kỹ thuật và công nghệ vào sản xuất, đảm bảo đầu ra ổn định, nâng cao thu nhập bền vững.',
  },
  {
    title: 'Vững chất lượng sản phẩm',
    description: '...',
  },
  {
    title: 'Vững cân bằng môi trường',
    description: '...',
  },
  {
    title: 'Vững lan toả giá trị văn hoá',
    description: '...',
  },
  // Thêm các giá trị khác tương tự
];

export function MissionSection() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % backgroundImages.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="pt-20 pb-5 bg-white">
      <div className="flex justify-center flex-col md:flex-row items-start  max-w-[1122px] mx-auto  py-8  "> 
            {/* Left Column: Title */}
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h2 className="text-blue-900 text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
                Sứ mệnh <br className="hidden sm:block" />
                tôn vinh <br className="hidden sm:block" />
                hạt ngọc thực
              </h2>
            </div>

            {/* Right Column: Content */}
          <div className="w-full md:w-2/3 relative">
            <h3 className="text-gray-700 text-lg sm:text-xl md:text-2xl font-medium mb-4">
              Giá trị của hạt gạo qua lăng kính của Từ Trúc
            </h3>

            <div className="relative">
              {/* Quote image placed behind paragraph */}
              <div className="absolute -top-2 -left-3 w-14 h-10  opacity-30 pointer-events-none">
              <Image src="/img_.svg" alt="Quote" width={56} height={39} />
              </div>

              <p className="text-gray-600 text-justify leading-relaxed">
                Với nhiều người, gạo chỉ đơn thuần là lương thực để no bụng. Nhưng với Từ Trúc, đó là kết tinh của đất trời hào phóng,
                đôi tay cần mẫn của người nông dân, sự kỹ lưỡng, chỉn chu trong từng công đoạn của người công nhân và hơn hết,
                đó còn là niềm tự hào về nền văn minh lúa nước ngàn đời!
              </p>
            </div>
          </div>
        </div>
        <div className="relative bg-cover bg-center text-white overflow-hidden rounded-[16px] mx-auto w-full max-w-[1122px] h-[509px] md:h-[509px] opacity-100">
          <div className={`flex flex-col inset-0 backdrop-blur-sm w-full h-full items-center text-center px-4 py-6 md:px-12 md:py-12 transition-opacity duration-1000 `}
          style={{ backgroundImage: `url(${backgroundImages[index]})` ,
                  transition: "opacity 0.8s ease-in-out",
                  opacity: fade ? 100 : 0,
                  
          }} >
            <div>
              <p className="text-sm font-medium tracking-wide text-yellow-400 uppercase mb-2">
                Tầm nhìn | Vision
              </p>
             <h2 className={`text-lg sm:text-xl md:text-2xl font-semibold mb-4 max-w-[90%] transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {textContent[index]?.heading}
              </h2>
              <p className={`text-white text-sm md:text-base max-w-[90%] mb-6 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {textContent[index]?.paragraph}
              </p>
            </div>
            {/* Pagination Dots as images */}
            <div className="flex gap-2">
              {backgroundImages.map((_, i) => (
                <img
                  key={i}
                  src={i === index ? '/Pagination_current.svg' : '/Pagination.svg'}
                  alt={`dot-${i}`}
                  className="w-4 h-4 transition-all duration-300"
                />
              ))}
            </div>
          </div>
        </div>
        {/* Core Values Accordion Section */}
        <div className="max-w-[1122px] mx-auto px-4 py-12 flex flex-col md:flex-row gap-6">
          <h3 className="text-[#54585A] text-lg font-semibold md:w-1/4 font-alegreya-sans">Giá trị cốt lõi</h3>
          <div className="md:w-3/4 space-y-4">
            {coreValues.map((item, idx) => (
              <div key={idx} className={`border-b-1 ${idx === openIndex ? "py-8": "py-4" }`}
              style = {{borderColor: "#CCCFD5"}}>
                <button
                  onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                  className="w-full flex items-start justify-between text-left text-green-900 font-semibold focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <img src="/lotus.svg" alt="lotus" className="w-10 h-10" />
                    <span className="font-alegreya-sans">{item.title}</span>
                  </div>
                  <Image
                    src={openIndex === idx ? '/arrow_up.svg' : '/arrow_down.svg'}
                    alt="toggle-icon"
                    width={12}
                    height={5}
                  />
                </button>
                {openIndex === idx && (
                  <p className="mt-2 text-gray-600 text-sm md:text-base font-alegreya-sans ml-12">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
    </section>
  );
}
