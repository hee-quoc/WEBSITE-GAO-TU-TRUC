"use client";

import Image from "next/image";
import React from "react";
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
    desc: 'Tiến hành xay xát, tách tạp chất và sàng lọc, đảm bảo từng hạt gạo đạt chuẩn đồng đều',
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
          <div className="flex flex-col text-center mb-12 items-center">
            <h2 className="font-alegreya-sans text-[56px] md:text-[56px] font-[700] font-bold text-[#0A5B89] mb-2 max-w-[542px] leading-[100%] tracking-[0%]">
              Hạt gạo Việt từ ruộng đồng đến bàn ăn
            </h2>
            <p className="font-alegreya-sans text-[32px]" style={{color:"#667085"}}>
              Hành trình thương hiệu đưa sản phẩm đến người tiêu dùng
            </p>
          </div>
          {/* Process Line - place above dots */}
        <div className="absolute top-[47.4%] left-[10%]  z-0 w-full flex justify-center">
          <Image
            src="/step_line.svg"
            alt="process_line"
            width={873}
            height={370}
            className="pointer-events-none"
          />
        </div>
          {/* Steps */}
          <div className="flex flex-col z-10">
            {/* Top Row - 3 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-22">
              {steps.slice(0, 3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] h-[345px] ">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h3 className="text-[20px] text-[#4D671B] font-[500]  mb-1 font-alegreya-sans" >{step.title}</h3>
                  <p className="text-[16px] max-w-[216px] min-h-[88px] font-fz-poppins font-[400]" style={{color:"#5C6578"}}>{step.desc}</p>
                </div>
              ))}
            </div>
              
            {/* Bottom Row - 2 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-16">
              {steps.slice(3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] h-[345px]">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h3 className="text-[20px] text-[#4D671B] font-[500]  mb-1 font-alegreya-sans">{step.title}</h3>
                  <p className="text-[16px] font-fz-poppins font-[400]" style={{color:"#5C6578"}}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8 max-w-[1122px] mx-auto py-16 px-4">
        {/* Left Column: Title and Paragraph */}
        <div className="w-full md:w-2/3 relative pb-16 ">
          <div className="absolute -top-2 -left-4 md:-left-10 w-10 md:w-14 h-8 md:h-10  opacity-50 pointer-events-none">
            <Image src="/quote_gray.svg" alt="Quote" width={56} height={39} />
          </div>

          <p className="text-[20px] text-white text-justify leading-relaxed font-alegreya-sans">
            Mỗi chén cơm ấm hiện diện trong từng bữa ăn đều là kết tinh từ sự hào phóng của <br />thiên nhiên trù phú, và sự tận tụy của những người lao động thầm lặng.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="w-full md:w-1/3 flex justify-center relative min-h-[240px] md:min-h-[auto]">
          <Image
            src="/women_eat_rice.svg"
            alt="Women eat rice"
            width={300}
            height={226}
            className="md:absolute md:top-[-150px] z-10 "
          />
        </div>
      </div>
    </section>
  );
}


 
