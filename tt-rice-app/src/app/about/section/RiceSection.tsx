"use client";

import Image from "next/image";
import React from "react";
const steps = [
  {
    img: '/gao_step1.svg',
    title: 'Gieo trồng & Chăm sóc',
    desc: 'Được thực hiện bởi những nông dân lành nghề,\n tuân thủ kỹ thuật và quy \n chuẩn chất lượng khắt khe',
  },
  {
    img: '/gao_step2.svg',
    title: 'Thu hoạch & Tinh chọn',
    desc: ' Lúa chín được thu hoạch đúng thời điểm, kiểm tra chất lượng đầu vào trước khi đưa về nhà máy',
  },
  {
    img: '/gao_step3.svg',
    title: 'Sấy lúa đạt chuẩn \n độ ẩm <14%',
    desc: 'Áp dụng công nghệ sấy hiện đại để kiểm soát độ ẩm tối ưu, bảo toàn \n chất lượng hạt gạo',
  },
  {
    img: '/gao_step4.svg',
    title: 'Xay xát & Sàng lọc',
    desc: 'Tiến hành xay xát, tách tạp chất và sàng lọc, đảm bảo từng hạt gạo đạt chuẩn \n đồng đều',
  },
  {
    img: '/gao_step5.svg',
    title: 'Đóng gói & Phân phối',
    desc: 'Thành phẩm được đóng \n gói tự động với quy trình \n hiện đại, và vận chuyển \n đến khắp đất nước',
  },
];

export function RiceSection() {
  return (
    <section className="pt-20 pb-5 pt-[96px] bg-[#6C9126]">
        <div className="bg-[#f9f9f3] relative flex flex-col justify-center mx-auto py-96 px-8 rounded-3xl border border-green-200 w-[1296px] h-[1296px]">
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
        <div className="absolute top-[47%] left-[10%] z-0 w-full flex justify-center h-[390px]">
          <Image
            src="/step_line.svg"
            alt="process_line"
            width={930}
            height={380}
            className="pointer-events-none "
          />
        </div>
          {/* Steps */}
          <div className="flex flex-col z-10">
            {/* Top Row - 3 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-34">
              {steps.slice(0, 3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] h-[345px] ">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h4 className="font-alegreya-sans text-[20px] text-[#4D671B] font-[500] leading-[120%] mb-1 " >
                    {step.title.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h4>
                  <p className="text-[16px] max-w-[216px] min-h-[88px] font-fz-poppins font-[400]" style={{color:"#5C6578"}}>
                    {step.desc.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
              
            {/* Bottom Row - 2 Steps */}
            <div className="flex flex-col items-center sm:flex-row justify-center gap-34">
              {steps.slice(3).map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center max-w-[256px] h-[345px]">
                  <Image src={step.img} alt={step.title} width={80} height={80} className="mt-10 min-h-[190px] min-w-[176px]" />
                  <span className="relative mb-4">
                    <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
                  </span>
                  <h3 className="text-[20px] text-[#4D671B] font-[500]  leading-[120%]  mb-1 font-alegreya-sans">{step.title}</h3>
                  <p className="text-[16px] font-fz-poppins font-[400]" style={{color:"#5C6578"}}>
                    {step.desc.split('\n').map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 max-w-[973px] max-h-[223px] mx-auto pb-64 ">
        {/* Left Column: Title and Paragraph */}
        <div className="w-full md:basis-[56%] relative pt-64">
          <div className="absolute -top-2 -left-4 md:-left-10 w-10 md:w-14 h-8 md:h-10  opacity-50 pointer-events-none pt-64">
            <Image src="/quote_gray.svg" alt="Quote" width={56} height={39} />
          </div>

          <p className="text-[20px] text-white text-justify leading-relaxed font-alegreya-sans">
            Mỗi chén cơm ấm hiện diện trong từng bữa ăn đều là kết tinh từ <br /> sự hào phóng của thiên nhiên trù phú, và sự tận tụy của những <br /> người lao động thầm lặng.
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="w-full md:basis-[44%] flex justify-center relative">
          <Image
            src="/women_eat_rice.svg"
            alt="Women eat rice"
            width={304}
            height={230}
            className="md:absolute md:top-[-72px] z-10 w-[304px]"
          />
        </div>
      </div>
    </section>
  );
}


 
