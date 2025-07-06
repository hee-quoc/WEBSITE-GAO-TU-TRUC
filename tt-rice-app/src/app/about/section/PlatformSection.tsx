"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { useInView } from "framer-motion";

export function PlatformSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-20% 0px -20% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-white overflow-visible z-10"
    >
      <div className="w-full max-w-[1280px] mx-auto px-6 py-16 flex flex-col lg:flex-row items-stretch justify-between gap-12">
        {/* CỘT TRÁI */}
        <div className="flex-1 flex flex-col justify-between max-w-[550px] gap-8 z-10">
          <div className="space-y-4">
            <h2 className="text-[56px] md:text-[44px] font-extrabold leading-tight text-[#005B94] font-fz">
              Nền tảng chủ động <br /> cho năng lực vững vàng
            </h2>
            <p className="text-[32px] text-[#888888] leading-relaxed font-alegreya">
              Thế mạnh sản phẩm & sản xuất của <br /> thương hiệu trong suốt 3 thập kỷ <br /> qua
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Image
                src="/platform/icon-ngoac-kep.svg"
                alt="Quote Icon"
                width={56}
                height={39}
              />
            </div>
            <p className="text-[#005B94] text-[20px] leading-relaxed font-medium font-fz">
              Suốt hơn 3 thập kỷ, Tư Trúc bền bỉ xây dựng nền tảng sản xuất chủ động,
              kiểm soát toàn diện từ chất lượng đến sản lượng, luôn sẵn sàng đồng hành lâu dài
              cùng các đối tác chiến lược
            </p>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="flex-1 flex justify-center items-start relative">
          {/* Ghost giữ layout */}
          <div className="w-[550px] h-[550px] invisible" />

          {/* Hình ảnh hiện đúng vị trí, không bị tràn ra ngoài */}
          {isInView && (
            <div className="absolute top-1/2 right-0 translate-y-[-50%] w-[550px] h-[550px] rounded-xl overflow-hidden shadow-md z-0">
              <Image
                src="/platform/Mask group.svg"
                alt="Cánh đồng lúa"
                fill
                className="object-cover object-center"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
