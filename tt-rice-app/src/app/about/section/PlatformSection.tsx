"use client";

import Image from "next/image";
import React, { Fragment } from "react";
import { motion, easeOut } from "framer-motion";

const scrollData = [
  {
    icon: "/platform/icon.svg",
    title: ["Chủ động gieo trồng,", "vững vàng nguồn giống"],
    content:
      "Với lợi thế có hơn 150ha quỹ đất gia đình, Tư Trúc <br /> chủ động kiểm soát chặt chẽ từ lúa giống đến <br /> vùng trồng, đảm bảo chất lượng từ gốc. Nhờ vậy, <br /> doanh nghiệp luôn vững vàng trước mọi biến động <br /> về thời tiết, dịch bệnh hay thị trường, sẵn sàng duy trì <br /> nguồn cung ổn định, cao cấp, đáp ứng kịp thời mọi <br /> nhu cầu về sản lượng của đối tác.",
    image: "/platform/1.svg",
    isHeader: false, 
  },
  {
    icon: "/platform/icon.svg",
    title: ["Quy trình nghiêm ngặt,", "chất lượng vượt bậc"],
    content:
      "Mọi công đoạn sản xuất được Tư Trúc kiểm soát <br /> nghiêm ngặt và minh bạch, đảm bảo mỗi hạt gạo <br /> đều đạt chất lượng ổn định và đồng nhất.",
    image: "/platform/2.svg",
    isHeader: false,
  },
  {
    icon: "/platform/icon.svg",
    title: ["Sản phẩm an toàn,", "chứng nhận an tâm"],
    content:
      "Tư Trúc đã và đang nghiên cứu phát triển nhiều dòng <br /> sản phẩm đáp ứng đa dạng nhu cầu thưởng thức,<br />đồng thời tuân thủ nghiêm ngặt các tiêu chuẩn <br /> quốc tế về an toàn sản xuất và thực phẩm.",
    image: "/platform/3.svg",
    isHeader: false,
  },
  {
    icon: "/platform/icon.svg",
    title: ["Uy tín hàng đầu,", "đồng hành dài lâu"],
    content:
      "Với bề dày kinh nghiệm trong ngành lúa gạo, <br /> Tư Trúc đã trở thành đối tác tin cậy lâu năm <br /> của nhiều doanh nghiệp trong và ngoài nước, <br />khẳng định vững chắc vị thế uy tín hàng đầu <br /> trên thị trường.",
    image: "/platform/4.svg",
    isHeader: false,
  },
];

// Animation variants for the text blocks fading in
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function PlatformSection() {
  // STEP 1: Consolidate all image data into one array.
  // The header image is now the first item.
  const fullScrollData = [
    {
      isHeader: true, // A flag to identify this special item
      image: "/platform/Mask group.svg",
      // Add dummy data to prevent errors in the map for non-header items
      icon: "", 
      title: [],
      content: "",
    },
    ...scrollData, // The rest of the items
  ];

  return (
    <section className="relative w-full bg-white z-10 ">
      <div className="relative w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
        {/* LEFT COLUMN: Contains ALL text blocks, including the header text */}
        <div className="w-full px-5 lg:px-10">
          {fullScrollData.map((item, idx) => (
            <div
              key={idx}
              className="min-h-[80vh] flex items-center" // This provides the scroll height for each step
            >
              {/* STEP 2: Render the header text for the first item, and regular text for the rest */}
              {item.isHeader ? (
                // This is the content from your original header
                <div className="w-full flex flex-col justify-start z-10">
                  <div className="space-y-4">
                    <h2 className="text-[56px] md:text-[44px] font-extrabold leading-tight text-[#005B94] font-fz">
                      Nền tảng chủ động <br /> năng lực vững vàng
                    </h2>
                    <p className="text-[32px] text-[#888888] leading-relaxed font-alegreya">
                      Thế mạnh sản phẩm & sản xuất của <br />
                      thương hiệu trong suốt 3 thập kỷ
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Image
                      src="/platform/icon-ngoac-kep.svg"
                      alt="Quote Icon"
                      width={56}
                      height={39}
                    />
                    <p className="text-[#005B94] text-[20px] leading-relaxed font-medium font-fz">
                      Suốt hơn 3 thập kỷ, Tư Trúc bền bỉ xây dựng nền tảng sản xuất chủ động,
                      kiểm soát toàn diện từ chất lượng đến sản lượng, luôn sẵn sàng đồng hành lâu dài
                      cùng các đối tác chiến lược
                    </p>
                  </div>
                </div>
              ) : (
                // This is the content for all subsequent scroll items
                <motion.div
                  className="w-full"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={40}
                    height={40}
                    className=""
                  />
                  <h3 className="text-[#628423] text-[32px] font-fz font-regular leading-[1]">
                    {item.title.map((line, i) => (
                      <Fragment key={i}>
                        {line}
                        <br />
                      </Fragment>
                    ))}
                  </h3>
                  <p
                    className="text-[#667085] text-[16px] leading-[1.4] font-fz-poppins font-[400] mt-3"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:block w-full">
          {fullScrollData.map((item, idx) => (
            <div
              key={idx}
              className="sticky h-[80vh] flex items-center justify-center"
              style={{ top: 0 }}
            >
              <div className="relative w-full max-w-[550px] h-[550px] rounded-xl shadow-md">
                <Image
                  src={item.image}
                  alt={item.isHeader ? "Ảnh nền ban đầu" : `Illustration for ${item.title[0]}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 550px"
                  className="object-cover rounded-xl"
                  priority={idx === 0} // Only the first image (header image) is high priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}