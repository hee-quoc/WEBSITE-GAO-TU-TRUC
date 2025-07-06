"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { ContactFormData } from "~/app/types/Types";
const steps = [
  {
    img: '/gao_step1.svg',
    title: 'Gieo trồng & Chăm sóc',
    desc: 'Được thực hiện bởi những nông dân lành nghề, tuân thủ kỹ thuật và quy chuẩn chất lượng khắt khe.',
  },
  {
    img: '/gao_step2.svg',
    title: 'Thu hoạch & Tinh chọn',
    desc: 'Lúa chín được thu hoạch đúng thời điểm, kiểm tra chất lượng đầu vào trước khi đưa về nhà máy.',
  },
  {
    img: '/gao_step3.svg',
    title: 'Sấy lúa đạt chuẩn độ ẩm <14%',
    desc: 'Áp dụng công nghệ sấy hiện đại để kiểm soát độ ẩm tối ưu, bảo toàn chất lượng hạt gạo.',
  },
  {
    img: '/gao_step4.svg',
    title: 'Xay xát & Sàng lọc',
    desc: 'Quy trình xay xát, tách tạp chất và sàng lọc, đảm bảo từng hạt gạo đạt chuẩn đồng đều.',
  },
  {
    img: '/gao_step5.svg',
    title: 'Đóng gói & Phân phối',
    desc: 'Thành phẩm được đóng gói tỉ mỉ với quy trình hiện đại, được vận chuyển nhanh chóng đến khắp mọi miền.',
  },
];

export function RiceSection() {
  return (
    <section className="pt-20 pb-5 bg-[#6C9126]">
        <div className="bg-[#f9f9f3] relative flex flex-col justify-center mx-auto py-16 px-8 rounded-3xl border border-green-200 max-w-[1296px]">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mb-2">
              Hạt gạo Việt từ ruộng đồng đến bàn ăn
            </h2>
            <p className="text-gray-600 text-lg">
              Hành trình thương hiệu đưa sản phẩm đến người tiêu dùng
            </p>
          </div>

          {/* <div><Image src={"/step_line.svg"} alt={"process_line"}  className="absolute top-[41.2%] left-[28%]" width={932} height={370}/></div> */}
          {/* Steps */}
          <div className="flex flex-col gap-5 z-10">
            {/* Top Row - 3 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-12">
              {steps.slice(0, 3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] min-h-[345px]">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[8px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h3 className="font-semibold text-green-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600 max-w-[216px] min-h-[88px]">{step.desc}</p>
                </div>
              ))}
            </div>
              
            {/* Bottom Row - 2 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-12">
              {steps.slice(3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] min-h-[345px]">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[8px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h3 className="font-semibold text-green-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
}
