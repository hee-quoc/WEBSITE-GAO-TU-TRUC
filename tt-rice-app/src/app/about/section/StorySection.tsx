"use client";

import Image from "next/image";
import React, { useRef, useEffect } from "react";
import { useMediaQuery } from "~/app/hooks/useMediaQuery";
const desktopImages = [
  { id: 'hat-kim-cuong', src: '/story/hat-kim-cuong.svg', width: 274, height: 84, style: { top: '21.19%', left: '50%', width: '19.05%' }, zIndex: 'z-30', hover: 'hover:-rotate-5 hover:scale-110' },
  { id: 'lay-chong', src: '/story/lay-chong.svg', width: 140, height: 237, style: { top: '39.35%', right: '35.35%', width: '9.76%' }, zIndex: 'z-20', hover: 'hover:-rotate-5 hover:scale-95' },
  { id: 'mot-tay-chi', src: '/story/mot-tay-chi.svg', width: 274, height: 201, style: { top: '33.57%', right: '10.75%', width: '19.07%' }, zIndex: 'z-40', hover: 'hover:rotate-5 hover:scale-105' },
  { id: 'lai-xe', src: '/story/lai-xe.svg', width: 371, height: 267, style: { top: '11.8%', right: '0%', width: '25.83%' }, zIndex: 'z-10', hover: 'hover:-rotate-5 hover:scale-105' },
];

// --- Data for Mobile Layout (Percentages calculated from your pixel values) ---
const mobileImages = [
  { id: 'hat-kim-cuong', src: '/story/hat-kim-cuong.svg', width: 167, height: 51, style: { top: '123px', left: '0px', width: '44.58%' }, zIndex: 'z-10', hover: 'hover:-rotate-5 hover:scale-110' },
  { id: 'lay-chong', src: '/story/lay-chong.svg', width: 85, height: 144, style: { top: '214px', left: '47px', width: '22.84%' }, zIndex: 'z-20', hover: 'hover:-rotate-5 hover:scale-95' },
  { id: 'mot-tay-chi', src: '/story/mot-tay-chi.svg', width: 167, height: 123, style: { top: '38%', left: '40%', width: '44.63%' }, zIndex: 'z-40', hover: 'hover:rotate-5 hover:scale-105' }, // Adjusted from your data
  { id: 'lai-xe', src: '/story/lai-xe.svg', width: 227, height: 163, style: { top: '10%', right: '-8%', width: '60.46%' }, zIndex: 'z-30', hover: 'hover:-rotate-5 hover:scale-105' }, // Adjusted from your data
];

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
  const isMobile = useMediaQuery('(max-width: 767px)');
  const activeImages = isMobile ? mobileImages : desktopImages;
  const backgroundSrc = isMobile ? '/story/img_story_background_mobile.png' : '/story/img_story_background.png';
  return (
    <section className="relative bg-green-50 w-full overflow-x-hidden">
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full`}>
        <div
          id="story-frame"
            ref={storyFrameRef}
            className={`
              relative
              ${isMobile
                ? 'w-full max-h-[501px] h-[501px] overflow-y-auto no-scrollbar pl-[20px] pr-[20px] mt-20'
                : 'md:absolute inset-0 z-40 p-8 md:p-0 top-10 md:left-[159px] md:top-0 md:w-[531px] h-full overflow-y-auto no-scrollbar'
              }
            `}
        >
          <div className="md:pt-[112px] pb-16">
            <h2 className={`${isMobile ? 'text-[42px]' : 'text-[56px]'} font-bold text-steel-blue leading-[96%] "`}>
              Ba thập kỉ gắn liền 
            </h2>
            <h2 className={`${isMobile ? 'text-[42px]' : 'text-[56px]'} mb-0 font-bold text-steel-blue leading-[96%] -mt-2"`}>
              với đồng ruộng
            </h2>
            <h2 className={`${isMobile ? 'text-[42px]' : 'text-[56px]'} font-bold text-steel-blue leading-[96%] -mt-4"`}>
               và nhà máy
            </h2>
            <h3 className={`${isMobile ? 'text-[28px]' : 'text-[32px]'} text-blue-normal font-alegreya`}>
              Lịch sử hình thành và
            </h3>
            <h3 className={`${isMobile ? 'text-[28px]' : 'text-[32px]'} text-blue-normal mb-8 font-alegreya`}>
              phát triển của doanh nghiệp
            </h3>
            <p className="text-[14px] md:text-[16px] text-blue-normal-active leading-7 mb-4 font-fz-poppins">
              Từ năm 1988, với khởi nguồn từ nhà máy xay xát nhỏ tại Bà Rịa - Vũng Tàu, Tư Trúc đã đặt những viên gạch đầu tiên trên hành trình xây dựng thương hiệu gạo mang đậm giá trị Việt. Việc chủ động vùng nguyên liệu, đầu tư xây dựng nhà máy và quy trình trồng trọt - sản xuất nghiêm ngặt ngay từ những ngày đầu đã trở thành nền tảng vững chắc đưa doanh nghiệp đến với vị thế là đơn vị cung cấp gạo lớn nhất Bà Rịa - Vũng Tàu.
            </p>
            <p className="text-[14px] md:text-[16px] text-blue-normal-active leading-7 font-fz-poppins">
              Sau hơn 30 năm, Tư Trúc tiếp tục mở rộng quy mô, hoàn thiện công nghệ, đào tạo đội ngũ và nâng tầm giá trị &quot;hạt ngọc thực&quot; đất Việt - kết tinh giữa thiên nhiên, bàn tay con người và bản sắc văn hóa Việt Nam.
            </p>
            <div className="w-full md:w-[531px] h-auto md:h-[691px] rounded-lg flex flex-col justify-between mt-8">
              <div>
                <h2 className=" text-[28px] md:text-[32px] text-blue-normal font-alegreya">
                  Lĩnh vực kinh doanh
                </h2>
                <div>
                  <div className={`gap-x-6 mb-5 ${isMobile ? 'flex flex-col' : 'flex items-start md:w-[531px]' } p-8 backdrop-blur-none bg-white/60 rounded-xl`}>
                    <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                    <div className=" md:w-[386px]">
                      <span className="text-green-600 text-[20px] pb-[4px]">Thu mua lúa</span>
                      <p className="text-gray-700 font-fz-poppins">
                        Bên cạnh sản lượng từ vùng trồng chủ lực, <br /> Tư Trúc thu mua thêm từ thương lái và các vùng khác, đáp ứng đa dạng nguồn cung, cân đối sản lượng, kiểm soát chất lượng theo tiêu chuẩn riêng
                      </p>
                    </div>
                  </div>
                  <div className={`gap-x-6 mb-5 ${isMobile ? 'flex flex-col' : 'flex items-start md:w-[531px]' } p-8 backdrop-blur-none bg-white/60 rounded-xl`}>
                    <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                    <div className=" md:w-[386px]">
                      <span className="text-green-600 text-[20px] pb-[4px]">
                        Sản xuất & kinh doanh lúa gạo / <br />
                        nhập khẩu gạo: thu mua gạo nguyên liệu
                      </span>
                      <p className="text-gray-700 font-fz-poppins">
                        Thu hoạch lúa gạo nội địa và nhập khẩu gạo nguyên liệu đạt chuẩn, để đưa vào hệ thống sấy, xay xát, sàng lọc, đóng gói hiện đại, đảm bảo chất lượng đồng đều.
                      </p>
                    </div>
                  </div>
                  <div className={`gap-x-6 ${isMobile ? 'flex flex-col' : 'flex items-start md:w-[531px]' } p-8 backdrop-blur-none bg-white/60 rounded-xl`}>
                    <Image src="/icon_rice_husk.svg" alt="icon" width={56} height={56} />
                    <div className=" md:w-[386px]">
                      <span className="text-green-600 text-[20px] pb-[4px]">Xử lí các phụ phẩm (chủ yếu là cám)</span>
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
        <div
          className={`
            relative
            ${isMobile ? 'w-full aspect-[375/498] min-h-[250px] flex-shrink-0' : ''}
            ${isMobile ? 'block' : 'flex-shrink-0'}
            ${isMobile ? '' : 'md:w-full'}
          `}
        >
          
          <Image
            src={backgroundSrc}
            alt="Story section background"
            fill={isMobile}
            width={isMobile ? undefined : 1440}
            height={isMobile ? undefined : 958}
            quality={85}
            sizes="100vw"
            className={`object-cover w-full h-full ${isMobile ? 'absolute inset-0' : ''}`}
            priority
          />
          
          <div className={`absolute inset-0 ${isMobile ? '' : 'hidden md:block'}`}>
            {activeImages.map((img) => (
              <div
                key={img.id}
                className={`absolute transition-transform duration-300 ${img.zIndex} ${img.hover}`}
                style={img.style}
              >
                <Image
                  src={img.src}
                  alt={img.id.replace('-', ' ')}
                  width={img.width}
                  height={img.height}
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </section>
  );
}
