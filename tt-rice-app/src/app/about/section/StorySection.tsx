"use client";

import Image from "next/image";
import React from "react";

export function StorySection() {
  return (
    <section className="relative bg-[#FCFDF6] min-h-screen overflow-hidden">
      {/* Background */}
      <div className="relative w-full min-h-screen h-[958px]">
        <Image
          src="/story/Background.svg"
          alt="Background"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* Cụm TEXT bên trái */}
      <div
        className="absolute z-20"
        style={{ top: "159px", left: "148px", width: "542.33px" }}
      >
        <h2 className="text-[56px] font-bold text-[#004785] mb-4 leading-[96%]">
          Ba thập kỉ gắn liền với <br />
          đồng ruộng và nhà máy
        </h2>
        <p className="text-2xl text-[#7D7D7D] mb-8">
          Câu chuyện truyền cảm hứng từ Tư Trúc
        </p>
        <p className="text-[#3F3F3F] leading-7 mb-4">
          Từ năm 1988, với khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa – Vũng Tàu,
          Tư Trúc đã đặt những viên gạch đầu tiên trên hành trình xây dựng thương
          hiệu gạo mang đậm giá trị Việt...
        </p>
        <p className="text-[#3F3F3F] leading-7">
          Sau hơn 30 năm, Tư Trúc tiếp tục mở rộng quy mô, hoàn thiện công nghệ, đào tạo đội ngũ
          và nâng tầm giá trị “hạt ngọc thực” đất Việt – kết tinh giữa thiên nhiên, bàn tay con người
          và bản sắc văn hóa Việt Nam.
        </p>
      </div>

      {/* Cụm HÌNH ẢNH bên phải */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{ top: "0px", left: "940px" }}
      >
        {/* Hạt kim cương */}
        <div className="absolute z-30" style={{ top: "13.63px", left: "40px" }}>
          <Image
            src="/story/hat-kim-cuong.svg"
            alt="Hạt kim cương giữa đồng lúa"
            width={274.29}
            height={83.99}
          />
        </div>

        {/* Lấy chồng */}
        <div className="absolute z-20" style={{ top: "48.23px", left: "30px" }}>
          <Image
            src="/story/lay-chong.svg"
            alt="Cột báo lấy chồng"
            width={140.52}
            height={237.22}
          />
        </div>

        {/* Một tay chị */}
        <div className="absolute z-40" style={{ top: "36.61px", left: "110px" }}>
          <Image
            src="/story/mot-tay-chi.svg"
            alt="Một tay chị lo sổ sách"
            width={274.57}
            height={201.7}
          />
        </div>

        {/* Lái xe */}
        <div className="absolute z-10" style={{ top: "120px", left: "70px" }}>
          <Image
            src="/story/lai-xe.svg"
            alt="Lái xe chở gạo"
            width={371.98}
            height={267.12}
          />
        </div>
      </div>
    </section>
  );
}
