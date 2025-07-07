"use client";

import Image from "next/image";
import React from "react";

const milestoneBlocks = [
  {
    id: "milestone-1988",
    bigImage: {
      src: "/milestone/1988.svg",
      width: 190,
      height: 138,
      top: 20,
      left: 33,
    },
    smallImage: {
      src: "/milestone/Ellipse.svg",
      width: 32,
      height: 32,
      top: 178,
      left: 112,
    },
    text: {
      year: "1988",
      content: "Khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa – Vũng Tàu",
      top: 210,
      left: 0,
      yearFontSize: "20px",
      contentFontSize: "16px",
    },
    style: {
      top: 360,
      left: 155,
      width: 256,
      height: 324,
      padding: 20,
      gap: 20,
    },
  },
  {
    id: "milestone-1990",
    bigImage: {
      src: "/milestone/1990.svg",
      width: 190,
      height: 138,
      top: 20,
      left: 33,
    },
    smallImage: {
      src: "/milestone/Ellipse.svg",
      width: 32,
      height: 32,
      top: 170,
      left: 112,
    },
    text: {
      year: "1990s",
      content: "Đầu tư sở hữu đất canh tác và mở rộng quy mô nhà máy",
      top: 210,
      left: 10,
      yearFontSize: "20px",
      contentFontSize: "16px",
    },
    style: {
      top: 246,
      left: 673,
      width: 256,
      height: 324,
      padding: 20,
      gap: 20,
    },
  },
  {
    id: "milestone-2000",
    bigImage: {
      src: "/milestone/2000.svg",
      width: 190,
      height: 138,
      top: 20,
      left: 33,
    },
    smallImage: {
      src: "/milestone/Ellipse.svg",
      width: 32,
      height: 32,
      top: 170,
      left: 112,
    },
    text: {
      year: "2000s",
      content: "Mở rộng và tự chủ vùng trồng. Nâng cao trang thiết bị máy móc, quy trình sản xuất và năng lực đội ngũ nhân công",
      top: 210,
      left: 10,
      yearFontSize: "20px",
      contentFontSize: "16px",
    },
    style: {
      top: 544,
      left: 378,
      width: 256,
      height: 368,
      padding: 20,
      gap: 20,
    },
  },
  {
    id: "milestone-2010",
    bigImage: {
      src: "/milestone/2010.svg",
      width: 190,
      height: 138,
      top: 20,
      left: 33,
    },
    smallImage: {
      src: "/milestone/Ellipse.svg",
      width: 32,
      height: 32,
      top: 165,
      left: 112,
    },
    text: {
      year: "2010s",
      content: "Vươn lên vị trí nhà cung ứng gạo hàng đầu Bà Rịa – Vũng Tàu",
      top: 210,
      left: 0,
      yearFontSize: "20px",
      contentFontSize: "16px",
    },
    style: {
      top: 765,
      left: 651,
      width: 260,
      height: 310,
      padding: 20,
      gap: 20,
    },
  },
  {
    id: "milestone-2020",
    bigImage: {
      src: "/milestone/2020.svg",
      width: 190,
      height: 138,
      top: 20,
      left: 33,
    },
    smallImage: {
      src: "/milestone/Ellipse.svg",
      width: 32,
      height: 32,
      top: 165,
      left: 112,
    },
    text: {
      year: "2020s",
      content: "Lan tỏa giá trị hạt gạo Việt, gắn kết bảo vệ môi trường, nâng đời sống nông dân – công nhân. Hướng đến vị thế là nhà cung cấp gạo hàng đầu Đông Nam Bộ",
      top: 210,
      left: 0,
      yearFontSize: "20px",
      contentFontSize: "16px",
    },
    style: {
      top: 612,
      left: 1024,
      width: 256,
      height: 412,
      padding: 20,
      gap: 20,
    },
  },
];

export function MileStoneSection() {
  return (
    <section className="relative z-30 bg-[#FAFDF2] overflow-hidden py-[40px]">
      <div className="relative mx-auto" style={{ width: "1440px", height: "1149px" }}>
        {/* Đường nối timeline – chính giữa section */}
        <div
          className="absolute pointer-events-none -z-10 left-1/2"
          style={{
            width: "869px",
            height: "545.93px",
            top: "429px",
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

        {/* 4 hình trang trí thêm */}
        <Image
          src="/milestone/hinh-lua.svg"
          alt="Decor 1"
          width={45}
          height={70}
          className="absolute"
          style={{ top: 491, left: 976 }}
        />
        <Image
          src="/milestone/hinh-lua.svg"
          alt="Decor 2"
          width={45}
          height={70}
          className="absolute"
          style={{ top: 422, left: 1000 }}
        />
        <Image
          src="/milestone/hinh-lua.svg"
          alt="Decor 3"
          width={45}
          height={70}
          className="absolute"
          style={{ top: 808, left: 267 }}
        />
        <Image
          src="/milestone/hinh-lua.svg"
          alt="Decor 4"
          width={45}
          height={70}
          className="absolute"
          style={{ top: 874, left: 320 }}
        />

        {/* Tiêu đề */}
        <div className="absolute top-[40px] left-1/2 -translate-x-1/2 text-center">
          <h2 className="text-[40px] md:text-[56px] font-bold text-[#005B94] font-fz leading-tight">
            Dấu ấn trên <br /> hành trình phát triển
          </h2>
          <p className="mt-4 text-[32px] text-[#6D6D6D] font-light font-alegreya">
            Những cột mốc thương hiệu đã đi qua
          </p>
        </div>

        {/* Các block milestone */}
        {milestoneBlocks.map((item) => (
          <div
            key={item.id}
            className="absolute bg-transparent"
            style={{
              top: item.style.top,
              left: item.style.left,
              width: item.style.width,
              height: item.style.height,
              padding: item.style.padding,
              position: "absolute",
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
                src={item.bigImage.src}
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
                src={item.smallImage.src}
                alt={`${item.id}-icon`}
                fill
                className="object-contain"
              />
            </div>

            {/* Năm và nội dung */}
            <div
              className="absolute text-center"
              style={{ top: item.text.top, left: item.text.left, right: 0 }}
            >
              <p
                className="text-[#6D6D6D] font-alegreya"
                style={{ fontSize: item.text.yearFontSize }}
              >
                {item.text.year}
              </p>
              <p
                className="text-[#0C3A2D] font-medium font-alegreya leading-[1.6] max-w-[100%]"
                style={{ fontSize: item.text.contentFontSize }}
              >
                {item.text.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
