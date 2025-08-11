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
            Chính sách đổi trả dịch vụ
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
            Chính sách đổi trả dịch vụ
          </h1>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
1. Điều kiện đổi trả          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Quý Khách hàng cần kiểm tra tình trạng hàng hóa và có thể đổi hàng/ trả lại hàng ngay tại thời điểm giao/nhận hàng trong những trường hợp sau:
<br /> - Hàng không đúng chủng loại, mẫu mã trong đơn hàng đã đặt hoặc như trên website tại thời điểm đặt hàng.
<br /> - Không đủ số lượng, không đủ bộ như trong đơn hàng.
<br /> - Tình trạng bên ngoài bị ảnh hưởng như rách bao bì, bong tróc, bể vỡ…
<br /> Khách hàng có trách nhiệm trình giấy tờ liên quan chứng minh sự thiếu sót trên để hoàn thành việc hoàn trả/đổi trả hàng hóa.

           
          </p>
  
        </section>

        {/* Section 2 */}
        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
            2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Thời gian thông báo đổi trả: trong vòng 48h kể từ khi nhận sản phẩm đối với trường hợp sản phẩm thiếu phụ kiện, quà tặng hoặc bể vỡ.
<br /> Thời gian gửi chuyển trả sản phẩm: trong vòng 14 ngày kể từ khi nhận sản phẩm.
<br /> Địa điểm đổi trả sản phẩm: Khách hàng có thể mang hàng trực tiếp đến văn phòng/ cửa hàng của chúng tôi hoặc chuyển qua đường bưu điện.

          </p>
         
        </section>
<section>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Trong trường hợp Quý Khách hàng có ý kiến đóng góp/khiếu nại liên quan đến chất lượng sản phẩm, Quý Khách hàng vui lòng liên hệ đường dây chăm sóc khách hàng của chúng tôi.
          </p>
         
        </section>
        {/* Section 2 */}
        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
            3. Hình thức đổi trả
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            - Chúng tôi thực hiện đổi hàng hóa đúng loại sản phẩm mà khách hàng đặt đối với sản phẩm giao sai hàng/ sai số lượng hoặc khi phát sinh sản phẩm không đạt cam kết.
<br /> -  Đổi sản phẩm khác có giá trị tương đương cho khách hàng trong trường hợp sản phẩm khách hàng đã đặt hết hàng nếu khách hàng đồng ý.
          </p>
         
        </section>

        <section>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Trường hợp khách hàng không còn nhu cầu nữa do lỗi hàng hóa hoặc không đồng ý với hàng hóa được đổi lại, công ty sẽ hoàn phí cho khách hàng bằng hình thức chuyển khoản hoặc theo phương thức thỏa thuận với khách hàng trong vòng 07 ngày làm việc kể từ ngày nhận được yêu cầu. Phí chuyển khoản khách hàng sẽ chịu (nếu có).
<br /> Khi phát sinh chi phí vận chuyển của hàng đổi trả, khách hàng sẽ chịu chi phí này và thanh toán trực tiếp cho bên vận chuyển.
          </p>
         
        </section>
      </main>
    </div>
  );
}
