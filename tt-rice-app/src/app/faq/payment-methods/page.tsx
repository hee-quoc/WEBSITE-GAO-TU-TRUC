"use client";

import React from "react";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px]">
        <Image
          src="/faq/thumbnail.svg"
          alt="banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg flex items-center justify-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold font-alegreya-sans text-center leading-snug">
            Hình thức thanh toán
          </h1>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        {/* Section 1 */}
        <section className="mb-10 leading-tight">
          <h1
            className="sm:text-2xl md:text-3xl font-medium text-[32px] mb-4 leading-tight"
            style={{ color: "#0A5B89" }}
          >
            Hình thức thanh toán
          </h1>
          <h3
            className="text-gray-600 mb-4 font-alegreya-sans text-[20px] font-medium leading-tight"
            style={{ color: "#333842" }}
          >
            Có 2 hình thức thanh toán, khách hàng có thể lựa chọn hình thức thuận tiện và phù hợp với mình nhất:
          </h3>
          <p
            className="text-gray-600 mb-4 font-alegreya-sans text-[20px] font-medium leading-tight"
            style={{ color: "#333842" }}
          >
            Cách 1:  Thanh toán tiền mặt trực tiếp địa chỉ của chúng tôi: 
          </p>
          <p className=" text-gray-600 mb-4 font-fz-poppins text-[16px] leading-tight">
            Khách hàng mua hàng tại địa điểm kinh doanh của chúng tôi, tại đây KH có thể thanh toán trực tiếp.
          </p>
  
        </section>

        {/* Section 2 */}
        <section className="mb-10 leading-tight">
          <h3
            className="text-gray-600 mb-4 font-alegreya-sans font-medium text-[20px] leading-tight"
            style={{ color: "#333842" }}
          >
            Cách 2: Thanh toán khi nhận hàng (COD)
          </h3>
          <p className="text-gray-600 mb-4 font-fz-poppins text-[16px] leading-tight">
            Với hình thức này khách hàng xem hàng tại nhà, thanh toán tiền mặt cho nhân viên giao nhận hàng.
          </p>
          <p className="text-gray-600 mb-4 font-alegreya-sans font-medium  text-[20px] leading-tight">
            Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng, có nguồn gốc.
          </p>
  
        </section>
      </main>
    </div>
  );
}
