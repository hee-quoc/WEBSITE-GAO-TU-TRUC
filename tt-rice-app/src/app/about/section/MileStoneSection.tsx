"use client";

import Image from "next/image";
import React from "react";
import { useMediaQuery } from "~/app/hooks/useMediaQuery";

const milestoneSteps = [
  {
    id: "milestone-1988",
    image: "/milestone/Illustrator.svg",
    year: "1988",
    content: "Khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa – Vũng Tàu",
  },
  {
    id: "milestone-1990",
    image: "/milestone/Illustrator2.svg",
    year: "1990s",
    content: "Đầu tư sở hữu đất canh tác\nvà mở rộng quy mô nhà máy",
  },
  {
    id: "milestone-2000",
    image: "/milestone/2000.svg",
    year: "2000s",
    content:
      "Mở rộng và tự chủ vùng trồng. Nâng cao trang thiết bị máy móc, quy trình sản xuất và đội ngũ nhân công",
  },
  {
    id: "milestone-2010",
    image: "/milestone/2010.svg",
    year: "2010s",
    content: "Vươn lên vị trí nhà\ncung ứng gạo hàng đầu\nBà Rịa – Vũng Tàu",
  },
  {
    id: "milestone-2020",
    image: "/milestone/2020.svg",
    year: "2020s",
    content:
      "Lan tỏa giá trị hạt gạo Việt, \n cam kết bảo vệ môi trường, nâng đời sống nông dân – \n công nhân. Hướng đến vị thế \n là một trong những\n nhà cung cấp gạo hàng đầu \n Đông Nam Bộ",
  },
];

const milestoneStepsMobile = milestoneSteps.map((step) => ({
  ...step,
  image: step.image ?? "", // đảm bảo image không undefined
}));

const desktopBlocks = [
  {
    ...milestoneSteps[0],
    style: { top: 360, left: 155, width: 270, height: 324, padding: 20 },
    bigImage: { width: 190, height: 138, top: 20, left: 33 },
    smallImage: { width: 32, height: 32, top: 178, left: 112 },
    textPos: { top: 210, left: -20 },
  },
  {
    ...milestoneSteps[1],
    style: { top: 246, left: 673, width: 256, height: 324, padding: 20 },
    bigImage: { width: 190, height: 138, top: 20, left: 33 },
    smallImage: { width: 32, height: 32, top: 170, left: 112 },
    textPos: { top: 210, left: 10 },
  },
  {
    ...milestoneSteps[2],
    style: { top: 544, left: 378, width: 256, height: 368, padding: 20 },
    bigImage: { width: 190, height: 138, top: 20, left: 33 },
    smallImage: { width: 32, height: 32, top: 170, left: 112 },
    textPos: { top: 210, left: 10 },
  },
  {
    ...milestoneSteps[3],
    style: { top: 765, left: 651, width: 260, height: 310, padding: 20 },
    bigImage: { width: 190, height: 138, top: 20, left: 33 },
    smallImage: { width: 32, height: 32, top: 165, left: 112 },
    textPos: { top: 210, left: 0 },
  },
  {
    ...milestoneSteps[4],
    style: { top: 612, left: 1024, width: 256, height: 412, padding: 20 },
    bigImage: { width: 190, height: 138, top: 20, left: 33 },
    smallImage: { width: 32, height: 32, top: 165, left: 112 },
    textPos: { top: 210, left: 0 },
  },
];

export function MileStoneSection() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <section className="bg-[#FAFDF2] py-10 px-5 relative">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="font-alegreya-sans text-[42px] font-bold text-[#0A5B89] leading-[1]">
            Dấu ấn trên hành trình phát triển
          </h2>
          <p className="font-alegreya-sans text-[28px] leading-[1] text-[#6D6D6D] mt-2">
            Những cột mốc <br /> thương hiệu đã đi qua
          </p>
        </div>

        {/* Line dashed SVG */}
        <div className="relative overflow-x-auto scrollbar-hide -mx-5 px-5">
          <svg
            width="1100"
            height="4"
            viewBox="0 0 1100 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[215px] left-[150px] z-0"
          >
            <line
              x1="0"
              y1="2"
              x2="2000"
              y2="2"
              stroke="#D2DDBC"
              strokeWidth="4"
              strokeDasharray="8,8"
              strokeLinecap="round"
            />
          </svg>

          {/* Scroll blocks */}
          <div className="flex w-max relative z-10 space-x-6 pt-4 pb-2 snap-x snap-mandatory">
            {milestoneStepsMobile.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-[256px] h-[346px] p-4 flex flex-col items-center text-center snap-center"
              >
                <div className="relative w-full aspect-[190/138] mb-4">
                  <Image
                    src={item.image ?? ""}
                    alt={`Milestone ${item.year}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="relative mb-4">
                  <span className="block w-3 h-3 bg-[#6D9127] rounded-full"></span>
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-[7px] border-[#D2DDBC] rounded-full"></span>
                </span>
                <p className="text-[#4D671B] font-medium text-[20px] font-alegreya-sans font-[500]">
                  {item.year}
                </p>
                <p className="text-[#5C6578] text-[16px] leading-[1.4] whitespace-pre-line font-fz-poppins mt-1">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // === DESKTOP LAYOUT ===
  return (
    <section className="relative z-30 bg-[#FAFDF2] overflow-hidden py-[40px]">
      <div className="relative mx-auto" style={{ width: "1440px", height: "1149px" }}>
        {/* Line */}
        <div
          className="absolute pointer-events-none -z-10 left-1/2"
          style={{
            width: "869px",
            height: "545.93px",
            top: "429px",
            transform: "translateX(-50%)",
          }}
        >
          <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/line.svg" alt="Timeline Line" fill className="object-contain" />
        </div>

        {/* Decor */}
        <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/hinh-lua.svg" alt="Decor 1" width={45} height={70} className="absolute" style={{ top: 491, left: 976 }} />
        <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/hinh-lua.svg" alt="Decor 2" width={45} height={70} className="absolute" style={{ top: 422, left: 1000 }} />
        <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/hinh-lua.svg" alt="Decor 3" width={45} height={70} className="absolute" style={{ top: 808, left: 267 }} />
        <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/hinh-lua.svg" alt="Decor 4" width={45} height={70} className="absolute" style={{ top: 874, left: 320 }} />

        {/* Title */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 text-center">
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#005B94] font-fz leading-tight">
            Dấu ấn trên <br /> hành trình phát triển
          </h2>
          <p className="mt-4 text-[32px] text-[#6D6D6D] font-light font-alegreya">
            Những cột mốc thương hiệu đã đi qua
          </p>
        </div>

        {/* Blocks */}
        {desktopBlocks.map((item) => (
          <div
            key={item.id}
            className="absolute bg-transparent"
            style={{
              top: item.style.top,
              left: item.style.left,
              width: item.style.width,
              height: item.style.height,
              padding: item.style.padding,
            }}
          >
            {/* Hình lớn */}
            <div
              className="absolute"
              style={{
                top: item.bigImage.top,
                left: item.bigImage.left,
                width: `${item.bigImage.width}px`,
                height: `${item.bigImage.height}px`,
              }}
            >
              <Image
                src={item.image ?? ""}
                alt={`${item.id}-big`}
                fill
                className="object-contain"
              />
            </div>

            {/* Hình nhỏ */}
            <div
              className="absolute"
              style={{
                top: item.smallImage.top,
                left: item.smallImage.left,
                width: `${item.smallImage.width}px`,
                height: `${item.smallImage.height}px`,
              }}
            >
              <Image
                src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/milestone/Ellipse.svg"
                alt={`${item.id}-icon`}
                fill
                className="object-contain"
              />
            </div>

            {/* Text */}
            <div
              className="absolute text-center"
              style={{
                top: item.textPos.top,
                left: item.textPos.left,
                right: 0,
              }}
            >
              <p
                style={{
                  fontSize: "20px",
                  color: "#4D671B",
                  fontFamily: "Alegreya Sans",
                  fontWeight: 600,
                }}
              >
                {item.year}
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#5C6578",
                  fontFamily: "Fz Poppins",
                  fontWeight: 400,
                  lineHeight: "1.6",
                  whiteSpace: "pre-line",
                }}
              >
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
