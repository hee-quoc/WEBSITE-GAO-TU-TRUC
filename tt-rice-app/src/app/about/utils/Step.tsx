"use client";
import Image from "next/image";
import React from "react";
interface Step {
  img: string;
  title: string;
  desc: string;
}
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

export default function StepSectionResponsive() {
  return (
    <div className="bg-[#f9f9f3] relative flex flex-col justify-center mx-auto py-96 px-8 rounded-3xl border border-green-200 w-[337px] h-[770px] sm:w-[1296px] sm:h-[1296px] ">
      {/* Title */}
      <div className="text-center mb-12 hidden md:block">
        <h2 className="font-alegreya-sans text-[32px] sm:text-[48px] md:text-[56px] font-bold text-[#0A5B89] mb-2 leading-tight max-w-[542px] mx-auto">
          Hạt gạo Việt từ ruộng đồng đến bàn ăn
        </h2>
        <p className="font-alegreya-sans text-[20px] sm:text-[28px] md:text-[32px] text-[#667085]">
          Hành trình thương hiệu đưa sản phẩm đến người tiêu dùng
        </p>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex flex-col gap-9 items-center">
        <div className="absolute top-[47%] left-[10%] z-0 w-full flex justify-center h-[390px]">
          <Image src="/step_line.svg" alt="process_line" width={930} height={380} className="pointer-events-none hidden sm:inline" />
        </div>

        <div className="flex gap-28 z-10">
          {steps.slice(0, 3).map((step, i) => (
            <StepCard key={i} step={step} />
          ))}
        </div>
        <div className="flex gap-24 z-10">
          {steps.slice(3).map((step, i) => (
            <CustomStepCard key={i + 3} step={step} />
          ))}
        </div>
      </div>
      
      {/* Mobile horizontal scroll layout */}
      <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="flex gap-6 w-max">
          {steps.map((step, i) => (
            <div key={i} className="flex-shrink-0 w-[280px] h-auto bg-white border border-[#D2DDBC] rounded-xl p-4 flex flex-col items-center text-center">
              <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4" />
              <span className="relative mb-4">
                <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
              </span>
              <h4 className="text-[18px] text-[#4D671B] font-semibold mb-2 font-alegreya-sans">
                {step.title.split('\n').map((line, idx, arr) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h4>
              <p className="text-[15px] text-[#5C6578] font-fz-poppins">
                {step.desc.split('\n').map((line, idx, arr) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx !== arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[256px] h-[345px]">
      <Image src={step.img} alt={step.title} width={80} height={80} className="mb-4 min-h-[190px] min-w-[176px]" />
      <span className="relative mb-4">
        <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
      </span>
      <h4 className="font-alegreya-sans text-[20px] text-[#4D671B] font-[500] leading-[120%] mb-1">
        {step.title.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h4>
      <p className="text-[16px] max-w-[216px] min-h-[88px] font-fz-poppins font-[400] text-[#5C6578]">
        {step.desc.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}

function CustomStepCard({ step }: { step: Step }) {
  return (
    <div className="flex flex-col items-center text-center max-w-[256px] h-[345px]">
      <Image src={step.img} alt={step.title} width={80} height={80} className="mb-1 min-h-[190px] min-w-[176px]" />
      <span className="relative mb-4">
        <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
      </span>
      <h4 className="font-alegreya-sans text-[20px] text-[#4D671B] font-[500] leading-[120%] mb-1">
        {step.title.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h4>
      <p className="text-[16px] max-w-[216px] min-h-[88px] font-fz-poppins font-[400] text-[#5C6578]">
        {step.desc.split('\n').map((line, i, arr) => (
          <React.Fragment key={i}>
            {line}
            {i !== arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
}
