"use client";

import Image from "next/image";
// 1. Import the necessary React hooks
import React, { useRef, useEffect } from "react";

export function StorySection() {
  // 2. Create a ref to attach to our scrolling div
  const storyFrameRef = useRef<HTMLDivElement | null>(null);

  // 3. Use an effect to manage the body scroll lock
  useEffect(() => {
    const storyFrame = storyFrameRef.current;
    if (!storyFrame) return;

    const lockBodyScroll = () => {
      document.body.style.overflow = "hidden";
    };

    const unlockBodyScroll = () => {
      document.body.style.overflow = ""; // Resets to default
    };

    // When the mouse enters the div, lock the main page's scroll
    storyFrame.addEventListener("mouseenter", lockBodyScroll);
    // When the mouse leaves the div, unlock it
    storyFrame.addEventListener("mouseleave", unlockBodyScroll);

    // 4. Cleanup function: This is crucial!
    // It runs when the component unmounts to prevent memory leaks.
    return () => {
      storyFrame.removeEventListener("mouseenter", lockBodyScroll);
      storyFrame.removeEventListener("mouseleave", unlockBodyScroll);
      // Also ensure scroll is unlocked if component unmounts while mouse is inside
      unlockBodyScroll();
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    // The main section remains relative for positioning context
    <section className="relative bg-[#FCFDF6] h-screen overflow-hidden">
      {/* The background can stay as it is */}
      <div className="relative w-full h-full">
        <Image
          src="/story/Background.svg"
          alt="Background"
          fill
          className="object-cover object-right"
          priority
        />
      </div>

      {/* 5. UPDATE THE STORY FRAME DIV */}
      <div
        id="story-frame"
        ref={storyFrameRef} // Attach the ref here
        className="
          absolute inset-0 z-20 p-8 md:p-0 
          md:left-[148px] md:top-0 md:w-[542.33px]
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
            Sau hơn 30 năm, Tư Trúc tiếp tục mở rộng quy mô, hoàn thiện công nghệ, đào tạo đội ngũ và nâng tầm giá trị "hạt ngọc thực" đất Việt - kết tinh giữa thiên nhiên, bàn tay con người và bản sắc văn hóa Việt Nam.
          </p>

          {/* This content card remains the same */}
          <div className="w-full md:w-[531px] h-auto md:h-[669px] rounded-lg flex flex-col justify-between mt-8">
            <div>
              <h2 className="md:text-[32px] font-bold text-blue-normal font-alegreya">Lĩnh vực kinh doanh</h2>
              <div>
                <div className="flex items-start md:w-[531[x] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6 mb-5">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">Thu mua lúa</span>
                    <p className=" text-gray-700 font-fz-poppins">
                      Bên cạnh vùng chủ lực, Tư Trúc thu mua thêm từ các thương lái và vùng khác, đa dạng nguồn cung, cân đối sản lượng, kiểm soát chất lượng theo tiêu chuẩn riêng
                    </p>
                  </div>
                </div>
                <div className="flex items-start md:w-[531[x] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6 mb-5">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">
                      <span>Sản xuất & kinh doanh lúa gạo / <br /> </span>
                      <span>nhập khẩu gạo: thu mua gạo nguyên liệu</span></span>
                    <p className=" text-gray-700 font-fz-poppins">
                      Thu hoạch lúa gạo nội địa và nhập khẩu gạo nguyên liệu đạt chuẩn, để đưa vào hệ thống sấy, xay xát, sàng lọc, đóng gói hiện đại, đảm bảo chất lượng đồng đều.
                    </p>
                  </div>
                </div>
                <div className="flex items-start md:w-[531[x] md:h-[184px] p-8 backdrop-blur-md bg-white/40 rounded-xl gap-x-6">
                  <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                  <div className="md:h-[120px] md:w-[386px]">
                    <span className="text-green-600 text-[20px]">Xử lí các phụ phẩm (chủ yếu là cám)</span>
                    <p className=" text-gray-700 font-fz-poppins">
                      Các loại phụ phẩm được tái sử dụng hiệu quả: làm thức ăn chăn nuôi, nguyên liệu tái chế hoặc nhiên liệu sản xuất, góp phần tối ưu tài nguyên và giảm phát thải
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute z-10"
        style={{ top: "0px", left: "940px" }}
      >
        <div className="z-30 transition-transform duration-300  hover:-rotate-5 hover:scale-120">
          <Image
            src="/story/hat-kim-cuong.svg"
            alt="Hạt kim cương giữa đồng lúa"
            width={274.29}
            height={83.99}
          />
        </div>

        <div className=" z-20 transition-transform duration-300  hover:-rotate-5 hover:scale-80">
          <Image
            src="/story/lay-chong.svg"
            alt="Cột báo lấy chồng"
            width={140.52}
            height={237.22}
          />
        </div>
        <div className=" z-40 transition-transform duration-300  hover:rotate-5 hover:scale-105">
          <Image
            src="/story/mot-tay-chi.svg"
            alt="Một tay chị lo sổ sách"
            width={274.57}
            height={201.7}
          />
        </div>
        <div className=" z-10 transition-transform duration-300  hover:-rotate-5 hover:scale-105">
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
