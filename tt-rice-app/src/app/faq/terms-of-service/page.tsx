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
            Điều khoản & điều kiện sử dụng
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
            Điều khoản & Điều kiện sử dụng
          </h1>
          <p
            className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight"
            style={{ color: "#333842" }}
          >
            Chào mừng quý khách đến với cửa hàng của chúng tôi! Chúng tôi xin cảm ơn quý khách đã tin tưởng và lựa chọn mua sắm tại website của chúng tôi. Để đảm bảo quyền lợi và sự hài lòng của khách hàng, chúng tôi xây dựng các điều khoản dịch vụ dưới đây. Bằng việc sử dụng website của chúng tôi, quý khách đồng ý tuân thủ các điều khoản này.
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4">
            1. Chấp nhận các điều khoản:
        <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Khi truy cập và sử dụng dịch vụ tại website của cửa hàng, quý khách đồng ý tuân thủ và bị ràng buộc bởi các điều khoản dịch vụ này, bao gồm các thay đổi hoặc sửa đổi trong tương lai.
          </p>
          </p>
  
        </section>

        {/* Section 2 */}
        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
2. Tài khoản khách hàng:          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Đăng ký tài khoản: Quý khách có thể tạo một tài khoản trên website để tiện lợi cho việc mua sắm và quản lý đơn hàng.
            <br /> Bảo mật tài khoản: Quý khách có trách nhiệm bảo mật thông tin tài khoản và mật khẩu. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất nào phát sinh từ việc sử dụng tài khoản trái phép.
            <br /> Thông tin chính xác: Quý khách cam kết cung cấp thông tin chính xác, đầy đủ khi đăng ký và cập nhật kịp thời khi có thay đổi.

          </p>
         
        </section>


        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
3. Đặt hàng và thanh toán:        </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Quy trình đặt hàng: Quý khách có thể đặt hàng trực tuyến thông qua website bằng cách chọn sản phẩm, thêm vào giỏ hàng và hoàn tất thủ tục thanh toán.
            <br />Xác nhận đơn hàng: Sau khi quý khách đặt hàng, website sẽ gửi một email xác nhận đơn hàng. Đơn hàng chỉ được coi là hoàn tất khi chúng tôi xác nhận và chấp nhận đơn hàng.
            <br /> Thanh toán: Chúng tôi chấp nhận các phương thức thanh toán như thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và ví điện tử. Quý khách cần đảm bảo thông tin thanh toán chính xác và hợp lệ.


          </p>
         
        </section>

<section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
4. Giao hàng và vận chuyển:       </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Thời gian giao hàng: Thời gian giao hàng dự kiến sẽ được thông báo cụ thể khi quý khách đặt hàng và có thể thay đổi tùy thuộc vào vị trí địa lý và tình trạng hàng hóa.
            <br />Phí vận chuyển: Phí vận chuyển sẽ được tính dựa trên địa chỉ giao hàng và trọng lượng của sản phẩm. Thông tin chi tiết sẽ được hiển thị trong quá trình đặt hàng.

            <br /> Kiểm tra hàng hóa: Quý khách nên kiểm tra kỹ lưỡng hàng hóa ngay khi nhận để đảm bảo không có lỗi hoặc hư hỏng. Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với bộ phận Chăm sóc khách hàng của chúng tôi.


          </p>
         
        </section>


<section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
5. Chính sách đổi trả và bảo hành:     </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Đổi trả hàng hóa: Quý khách có thể yêu cầu đổi hoặc trả hàng trong vòng 07 ngày kể từ ngày nhận hàng nếu sản phẩm bị lỗi, hư hỏng hoặc không đúng mô tả. Chi tiết chính sách đổi trả có thể tham khảo tại Chính sách đổi trả.
            <br />Bảo hành sản phẩm: Các sản phẩm tại cửa hàng được bảo hành theo quy định của nhà sản xuất. Chi tiết chính sách bảo hành có thể tham khảo tại Chính sách bảo hành.


          </p>
         
        </section>

        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
6. Quyền và trách nhiệm của chúng tôi:     </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
            Quyền từ chối đơn hàng: Cửa hàng có quyền từ chối hoặc hủy bỏ bất kỳ đơn hàng nào nếu phát hiện có sai sót, gian lận hoặc vi phạm điều khoản dịch vụ.
            <br />Thay đổi dịch vụ: Cửa hàng có quyền thay đổi, tạm ngừng hoặc ngừng cung cấp dịch vụ mà không cần thông báo trước. Chúng tôi sẽ nỗ lực để thông báo kịp thời cho khách hàng nếu có bất kỳ thay đổi nào ảnh hưởng đến trải nghiệm mua sắm.


          </p>
         
        </section>

<section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
7. Quyền sở hữu trí tuệ:     </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
           Toàn bộ nội dung, hình ảnh, logo và các tài liệu khác trên website của cửa hàng đều thuộc quyền sở hữu của chúng tôi và được bảo vệ bởi luật sở hữu trí tuệ. Quý khách không được sao chép, sử dụng hoặc phân phối lại mà không có sự đồng ý bằng văn bản của chúng tôi.
          </p>
         
        </section>
        
        <section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
8. Giải quyết tranh chấp:     </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
           Mọi tranh chấp phát sinh từ việc sử dụng dịch vụ của chúng tôi sẽ được giải quyết trên tinh thần hợp tác và thiện chí. Trong trường hợp không thể giải quyết bằng thương lượng, tranh chấp sẽ được đưa ra giải quyết tại tòa án có thẩm quyền tại Việt Nam.
         </p>
        </section>

<section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
9. Thay đổi điều khoản dịch vụ:    </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
           Cửa hàng có quyền thay đổi và cập nhật các điều khoản dịch vụ này bất kỳ lúc nào. Mọi thay đổi sẽ được công bố trên website của chúng tôi và có hiệu lực ngay khi được đăng tải. Quý khách nên thường xuyên kiểm tra để cập nhật các thông tin mới nhất.
         </p>
        </section>

<section>
          <h3
            className="ext-xl sm:text-2xl md:text-3xl font-medium text-[20px] mb-4"
            style={{ color: "#333842" }}
          >
Kết luận:    </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 font-fz-poppins leading-tight">
           Chúng tôi mong rằng quý khách sẽ có những trải nghiệm mua sắm tuyệt vời tại website của chúng tôi. Mọi thắc mắc hoặc góp ý, vui lòng liên hệ với bộ phận Chăm sóc khách hàng để được hỗ trợ.
         </p>
        </section>


      </main>
    </div>
  );
}
