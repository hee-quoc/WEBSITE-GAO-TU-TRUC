"use client";
import { useState } from "react";
import Image from "next/image";

type AccordionItem = {
  title: string;
  content: string;
};

export function ProductAccordion({ product }: { product: any }) {
  // Mặc định mở item đầu tiên (index 0). Nếu không muốn mở sẵn gì thì để new Set()
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  const handleToggle = (index: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);                   
      return next;
    });
  };

  const accordionData: AccordionItem[] = [
    { title: "Quy cách đóng gói", content: product.package },
    { title: "Thành phần", content: product.parts },
    { title: "Vùng nguyên liệu", content: product.ingredients },
    { title: "Quy trình canh tác", content: product.grow },
    { title: "Quy trình chế biến và bảo quản", content: product.cooking },
    { title: "Quy trình đóng gói", content: product.wrapProcess },
    { title: "Chứng nhận", content: product.certificate },
  ];

  return (
    <div className="mt-10 space-y-2">
      {accordionData.map((item, index) => {
        const isOpen = openSet.has(index);
        return (
          <div key={index} className="space-y-2">
            {/* Line chia block */}
            {index !== 0 && (
              <Image
                src="/certificate/Line.svg"
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
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${index}`}
              id={`accordion-button-${index}`}
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
                src="/certificate/chevron-down.svg"
                alt="arrow"
                width={20}
                height={20}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Nội dung mở rộng */}
            {isOpen && (
              <div
                id={`accordion-panel-${index}`}
                role="region"
                aria-labelledby={`accordion-button-${index}`}
                className="px-6 pt-1 pb-4 text-[#628423] font-alegreya-sans font-medium text-[20px] leading-[1]"
              >
                <Image
                  src="/certificate/quote.svg"
                  alt="quote icon"
                  width={56}
                  height={39}
                  className="mt-1 flex-shrink-0"
                />
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
