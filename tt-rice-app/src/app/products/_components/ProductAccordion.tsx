"use client";
import { useState } from "react";
import Image from "next/image";

type AccordionItem = {
  title: string;
  content: string;
};

export function ProductAccordion({ product }: { product: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // mở mặc định item đầu tiên

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData: AccordionItem[] = [
    { title: "Quy cách đóng gói", content: product.package },
    { title: "Thành phần", content: product.parts },
    { title: "Vùng nguyên liệu", content: product.ingredients },
    { title: "Quy trình canh tác", content: product.grow },
    { title: "Quy trình chế biến và bảo quản", content: product.cooking },
    { title: "Quy trình đóng gói", content: product.wrap_process },
    { title: "Chứng nhận", content: product.certificate },
  ];

  return (
    <div className="mt-10 space-y-2">
      {accordionData.map((item, index) => (
        <div key={index} className="space-y-2">
          {/* Line chia block */}
          {index !== 0 && (
            <Image
              src="/certificate/Line.svg" // đường line SVG của bạn
              alt="divider"
              width={600}
              height={10}
              className="mx-auto"
            />
          )}

          {/* Nút mở accordion */}
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white text-left"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/usageguide/Bullet point.svg"
                alt="Leaf Icon"
                width={20}
                height={20}
              />
              <span className="text-[#333842] font-alegreya-sans font-medium text-[20px]">
                {item.title}
              </span>
            </div>
            <Image
              src="/certificate/chevron-down.svg" // icon mũi tên của bạn
              alt="arrow"
              width={20}
              height={20}
              className={`transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Nội dung mở rộng */}
          {openIndex === index && (
            <div className="px-6 pt-1 pb-4 text-[#628423] font-alegreya-sans font-medium text-[20px] leading-[1]">
              <Image
      src="/certificate/quote.svg" // Đường dẫn đến icon quote
      alt="quote icon"
      width={56}
      height={39}
      className="mt-1 flex-shrink-0"
    />
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}