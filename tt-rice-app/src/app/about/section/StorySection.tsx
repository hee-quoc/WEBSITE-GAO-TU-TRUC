"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";

export function StorySection() {
  const storyFrameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const storyFrame = storyFrameRef.current;
    if (!storyFrame) return;

    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const unlockBodyScroll = () => {
      document.body.style.overflow = "";
    };

    storyFrame.addEventListener("mouseenter", lockBodyScroll);
    storyFrame.addEventListener("mouseleave", unlockBodyScroll);

    return () => {
      storyFrame.removeEventListener("mouseenter", lockBodyScroll);
      storyFrame.removeEventListener("mouseleave", unlockBodyScroll);
      unlockBodyScroll();
    };
  }, []);

  return (
    <section className="relative bg-[#FCFDF6] min-h-screen overflow-hidden">
      {/* ✅ Background fix (added relative parent for Image fill) */}
      <div className="absolute inset-0 -z-">
        <div className="relative w-full h-full">
          <Image
            src="/story/Background.svg"
            alt="Background"
            fill
            className="object-cover object-right"
            priority
          />
        </div>
      </div>

      {/* ✅ Story content frame */}
      <div
        id="story-frame"
        ref={storyFrameRef}
        className="
          absolute inset-0 z-20 p-8 md:p-0 
          md:left-[158px] md:top-0 md:w-[542.33px]
          h-screen overflow-y-auto no-scrollbar 
        "
      >
        <div className="md:pt-[112px] pb-16">
          <h2 className="text-[56px] font-bold text-steel-blue mb-4 leading-[96%]">
            Ba thập kỉ gắn liền với <br />
            đồng ruộng và nhà máy
          </h2>
          <h3 className="text-[32px] text-blue-normal mb-8">
            Câu chuyện truyền cảm hứng từ Tư Trúc
          </h3>
          <p className="text-blue-normal-active leading-7 mb-4 font-fz-poppins">
            Từ năm 1988, với khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa - Vũng Tàu, Tư Trúc đã đặt những viên gạch đầu tiên trên hành trình xây dựng thương hiệu gạo mang đậm giá trị Việt. Việc chủ động vùng nguyên liệu, đầu tư xây dựng nhà máy và quy trình trồng trọt - sản xuất nghiêm ngặt ngay từ những ngày đầu đã trở thành nền tảng vững chắc đưa doanh nghiệp đến với vị thế là đơn vị cung cấp gạo lớn nhất Bà Rịa - Vũng Tàu.
          </p>
          <p className="text-blue-normal-active leading-7 font-fz-poppins">
            Sau hơn 30 năm, Tư Trúc tiếp tục mở rộng quy mô, hoàn thiện công nghệ, đào tạo đội ngũ và nâng tầm giá trị &quot;hạt ngọc thực&quot; đất Việt - kết tinh giữa thiên nhiên, bàn tay con người và bản sắc văn hóa Việt Nam.
          </p>

          {/* ✅ Business fields */}
          <div className="w-full md:w-[531px] h-auto md:h-[669px] rounded-lg flex flex-col justify-between mt-8">
            <div>
              <h2 className="md:text-[32px] font-bold text-blue-normal font-alegreya">
                Lĩnh vực kinh doanh
              </h2>
              <div>
                {/* Card 1 */}
                <div className="flex items-start md:w-[531px] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6 mb-5">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">Thu mua lúa</span>
                    <p className="text-gray-700 font-fz-poppins">
                      Bên cạnh vùng chủ lực, Tư Trúc thu mua thêm từ các thương lái và vùng khác, đa dạng nguồn cung, cân đối sản lượng, kiểm soát chất lượng theo tiêu chuẩn riêng.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-start md:w-[531px] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6 mb-5">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">
                      Sản xuất & kinh doanh lúa gạo / <br />
                      nhập khẩu gạo: thu mua gạo nguyên liệu
                    </span>
                    <p className="text-gray-700 font-fz-poppins">
                      Thu hoạch lúa gạo nội địa và nhập khẩu gạo nguyên liệu đạt chuẩn, để đưa vào hệ thống sấy, xay xát, sàng lọc, đóng gói hiện đại, đảm bảo chất lượng đồng đều.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-start md:w-[531px] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">Xử lí các phụ phẩm (chủ yếu là cám)</span>
                    <p className="text-gray-700 font-fz-poppins">
                      Các loại phụ phẩm được tái sử dụng hiệu quả: làm thức ăn chăn nuôi, nguyên liệu tái chế hoặc nhiên liệu sản xuất, góp phần tối ưu tài nguyên và giảm phát thải.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10">
        {/* Hạt kim cương */}
        <div
          className="absolute z-30 transition-transform duration-300 hover:-rotate-5 hover:scale-110"
          style={{ top: "203px", left: "802px" }}
        >
          <Image
            src="/story/hat-kim-cuong.svg"
            alt="Hạt kim cương giữa đồng lúa"
            width={274.29}
            height={83.99}
          />
        </div>

        {/* Lấy chồng */}
        <div
          className="absolute z-20 transition-transform duration-300 hover:-rotate-5 hover:scale-95"
          style={{ top: "377px", left: "869px" }}
        >
          <Image
            src="/story/lay-chong.svg"
            alt="Cột báo lấy chồng"
            width={140.52}
            height={237.22}
          />
        </div>

        {/* Một tay chị */}
        <div
          className="absolute z-40 transition-transform duration-300 hover:rotate-5 hover:scale-105"
          style={{ top: "312px", left: "1062px" }}
        >
          <Image
            src="/story/mot-tay-chi.svg"
            alt="Một tay chị lo sổ sách"
            width={274.57}
            height={201.7}
          />
        </div>

        {/* Lái xe */}
        <div
          className="absolute z-10 transition-transform duration-300 hover:-rotate-5 hover:scale-105"
          style={{ top: "113px", left: "1144px" }}
        >
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
