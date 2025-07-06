"use client";

import Image from "next/image";
import React from "react";

const milestones = [
  {
    year: "1988",
    text: "Khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa – Vũng Tàu",
    icon: "/milestone/1988.svg",
  },
  {
    year: "1990s",
    text: "Đầu tư sở hữu đất canh tác và mở rộng quy mô nhà máy",
    icon: "/milestone/1990.svg",
  },
  {
    year: "2000s",
    text: "Mở rộng và tự chủ vùng trồng. Nâng cao trang thiết bị máy móc, quy trình sản xuất và năng lực đội ngũ nhân công",
    icon: "/milestone/2000.svg",
  },
  {
    year: "2010s",
    text: "Vươn lên vị trí nhà cung ứng gạo hàng đầu Bà Rịa – Vũng Tàu",
    icon: "/milestone/2010.svg",
  },
  {
    year: "2020s",
    text: "Lan tỏa giá trị hạt gạo Việt, gắn kết bảo vệ môi trường, nâng đời sống nông dân – công nhân. Hướng đến vị thế là nhà cung cấp gạo hàng đầu Đông Nam Bộ",
    icon: "/milestone/2020.svg",
  },
];

export function MileStoneSection() {
  return (
    <section className="relative z-30 bg-[#FAFDF2] overflow-hidden py-[96px] px-[160px]">
      {/* Đường nối timeline – chính giữa section 1440px */}
      <div
        className="absolute pointer-events-none -z-10 left-1/2"
        style={{
          width: "869px",
          height: "545.93px",
          top: "132.65px",
          transform: "translateX(-50%)",
        }}
      >
        <Image
          src="/milestone/line.svg"
          alt="Timeline Line"
          fill
          className="object-contain"
        />
      </div>

      {/* Tiêu đề */}
      <div className="text-center mb-20">
        <h2 className="text-[40px] md:text-[56px] font-bold text-[#005B94] font-fz leading-tight">
          Dấu ấn trên <br /> hành trình phát triển
        </h2>
        <p className="mt-4 text-[32px] text-[#6D6D6D] font-light font-alegreya">
          Những cột mốc thương hiệu đã đi qua
        </p>
      </div>

      {/* Các milestone */}
      <div className="flex flex-col gap-[96px] max-w-[1120px] mx-auto relative">
        {milestones.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={index}
              className={`flex items-center justify-between gap-8 ${
                isLeft ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Icon */}
              <div className="w-[160px] h-[160px] relative shrink-0">
                <Image
                  src={item.icon}
                  alt={item.year}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text content */}
              <div className="max-w-[500px]">
                <p className="text-[#6D6D6D] font-alegreya text-sm mb-2">
                  {item.year}
                </p>
                <p className="text-[#0C3A2D] text-base font-medium font-alegreya leading-[1.6]">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
