"use client";

import React from "react";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Banner */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[400px]">
        <Image
          src="/images/news/img_banner.png"
          alt="banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg flex items-center justify-center px-4">
          <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold font-alegreya-sans text-center leading-snug">
            Chính sách bảo mật
          </h1>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto">
        {/* Section 1 */}
        <section className="mb-10">
          <h1
            className="sm:text-2xl md:text-3xl font-medium text-[32px] mb-4"
            style={{ color: "#0A5B89" }}
          >
            Chính sách bảo mật
          </h1>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
            Mục đích và phạm vi thu thập thông tin
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Cửa hàng thông báo, chia sẻ hay trao đổi thông tin cá nhân của khách hàng thu
            thập trên trang web cho một bên thứ ba nào khác. Thông tin cá nhân thu thập được
            sẽ chỉ được sử dụng trong nội bộ cửa hàng.
            <br /> Họ và tên
            <br /> Địa chỉ
            <br /> Điện thoại
            <br /> Email
            <br /> Tên sản phẩm
            <br /> Số lượng
            <br /> Thời gian giao nhận sản phẩm
          </p>
  
        </section>

        {/* Section 2 */}
        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
            Phạm vi sử dụng thông tin
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Thông tin cá nhân thu thập được sẽ chỉ được cửa hàng sử dụng trong nội bộ công ty
            và cho một hoặc tất cả các mục đích sau đây:
            <br /> Hỗ trợ khách hàng
            <br /> Cung cấp thông tin liên quan đến dịch vụ
            <br /> Xử lý đơn đặt hàng và cung cấp dịch vụ, thông tin qua trang web
            <br /> Quản lý tài khoản khách hàng
            <br /> Nâng cao chất lượng hỗ trợ khách hàng
            <br /> Thực hiện các hoạt động quảng bá liên quan đến sản phẩm và dịch vụ của cửa hàng
          </p>
         
        </section>
      </main>
    </div>
  );
}
