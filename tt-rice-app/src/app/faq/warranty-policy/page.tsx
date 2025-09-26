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
            Chính sách bảo hành
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
            Chính sách bảo hành
          </h1>
          <h3
            className="text-gray-600 mb-4 font-alegreya-sans text-[20px] font-medium leading-tight"
            style={{ color: "#333842" }}
          >
            1. Điều kiện bảo hành:
          </h3>
          <p
            className="text-gray-600 mb-4 font-alegreya-sans text-[20px] font-medium leading-tight"
            style={{ color: "#333842" }}
          >
            Khách hàng có thể yêu cầu bảo hành sản phẩm trong các trường hợp sau:
          </p>
          <p className=" text-gray-600 mb-4 font-fz-poppins text-[16px] leading-relaxed">
            Sản phẩm bị lỗi kỹ thuật do nhà sản xuất.
            <br/>
            Sản phẩm còn trong thời gian bảo hành được quy định bởi nhà sản xuất hoặc chúng tôi.
            <br/>
            Sản phẩm có phiếu bảo hành (nếu có) hoặc hóa đơn mua hàng tại cửa hàng.
          </p>
  
        </section>

        {/* Section 2 */}
        <section className="mb-10 leading-tight">
          <h3
            className="text-gray-600 mb-4 font-alegreya-sans font-medium text-[20px] leading-tight"
            style={{ color: "#333842" }}
          >
            2. Thời gian bảo hành:
          </h3>
          <p className="text-gray-600 mb-4 font-fz-poppins text-[16px] leading-relaxed">
            Thời gian bảo hành cụ thể sẽ được ghi rõ trên phiếu bảo hành hoặc thông tin sản phẩm tại website.
            <br/>
            Thời gian bảo hành thường dao động từ 6 tháng đến 1 năm tùy theo loại sản phẩm và quy định của nhà sản xuất.
          </p>
  
        </section>

        <section className="mb-10 leading-tight">
          <h3
            className="text-gray-600 mb-4 font-alegreya-sans font-medium text-[20px] leading-tight"
            style={{ color: "#333842" }}
          >
            3. Quy trình bảo hành:
          </h3>
          <p className="text-gray-600 mb-4 font-fz-poppins text-[16px] leading-relaxed">
            Bước 1: Kiểm tra điều kiện bảo hành của sản phẩm, đảm bảo sản phẩm còn trong thời gian bảo hành và đáp ứng các điều kiện bảo hành.
            <br/>
            Bước 2: Liên hệ với bộ phận Chăm sóc khách hàng của chúng tôi qua hotline hoặc email để thông báo về yêu cầu bảo hành.
            <br />
            Bước 3: Cung cấp thông tin chi tiết về sản phẩm cần bảo hành, bao gồm mã sản phẩm, số hóa đơn, mô tả lỗi và hình ảnh (nếu có).
            <br />
            Bước 4: Gửi sản phẩm về địa chỉ bảo hành của chúng tôi hoặc nhà sản xuất theo hướng dẫn của bộ phận Chăm sóc khách hàng.
            <br />
            Bước 5: Sau khi nhận và kiểm tra sản phẩm, [Tên cửa hàng] sẽ tiến hành sửa chữa hoặc thay thế sản phẩm mới tùy thuộc vào tình trạng lỗi và điều kiện bảo hành.
          </p>

        </section>
      </main>
    </div>
  );
}
