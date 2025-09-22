"use client";

import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { motion, easeOut } from "framer-motion";

// ✅ Data dùng cho desktop
const scrollData = [
  {
    icon: "/platform/icon.svg",
    title: ["Chủ động gieo trồng,", "vững vàng nguồn giống"],
    content:
      "Với lợi thế có hơn 150ha quỹ đất gia đình, Tư Trúc <br /> chủ động kiểm soát chặt chẽ từ lúa giống đến <br /> vùng trồng, đảm bảo chất lượng từ gốc. Nhờ vậy,<br /> doanh nghiệp luôn vững vàng trước mọi biến động <br />về thời tiết, dịch bệnh hay thị trường, sẵn sàng duy trì<br /> nguồn cung ổn định, cao cấp, đáp ứng kịp thời mọi<br /> nhu cầu về sản lượng của đối tác.",
    image: "/platform/1.svg",
    isHeader: false,
  },
  {
    icon: "/platform/icon.svg",
    title: ["Quy trình nghiêm ngặt,", "chất lượng vượt bậc"],
    content:
      "Mọi công đoạn sản xuất được Tư Trúc kiểm soát<br /> nghiêm ngặt và minh bạch, đảm bảo mỗi hạt gạo<br /> đều đạt chất lượng ổn định và đồng nhất.",
    image: "/platform/2.svg",
    isHeader: false,
  },
  {
    icon: "/platform/icon.svg",
    title: ["Sản phẩm an toàn,", "chứng nhận an tâm"],
    content:
      "Tư Trúc đã và đang nghiên cứu phát triển nhiều dòng<br /> sản phẩm đáp ứng đa dạng nhu cầu thưởng thức,<br /> đồng thời tuân thủ nghiêm ngặt các tiêu chuẩn<br /> quốc tế về an toàn sản xuất và thực phẩm.",
    image: "/platform/3.svg",
    isHeader: false,
  },
  {
    icon: "/platform/icon.svg",
    title: ["Uy tín hàng đầu,", "đồng hành dài lâu"],
    content:
      "Với bề dày kinh nghiệm trong ngành lúa gạo,<br /> Tư Trúc đã trở thành đối tác tin cậy lâu năm<br /> của nhiều doanh nghiệp trong và ngoài nước,<br /> khẳng định vững chắc vị thế uy tín hàng đầu<br /> trên thị trường.",
    image: "/platform/4.svg",
    isHeader: false,
  },
];

// ✅ Data dành riêng cho mobile
const scrollDataMobile = [
  {
    icon: "/platform/icon.svg",
    title: ["Chủ động gieo trồng,", "vững vàng nguồn giống"],
    content: [
      "Với lợi thế có hơn 150ha quỹ đất gia đình, Tư Trúc chủ động kiểm soát chặt chẽ từ lúa giống đến vùng trồng, đảm bảo chất lượng từ gốc. Nhờ vậy, doanh nghiệp luôn vững vàng trước mọi biến động về thời tiết, dịch bệnh hay thị trường, sẵn sàng duy trì nguồn cung ổn định, cao cấp, đáp ứng kịp thời mọi nhu cầu về sản lượng  của đối tác.",
    ],
    image: "/platform/1.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Quy trình nghiêm ngặt,", "chất lượng vượt bậc"],
    content: [
      "Mọi công đoạn sản xuất được Tư Trúc kiểm soát nghiêm ngặt và minh bạch, đảm bảo mỗi hạt gạo đều đạt chất lượng ổn định và đồng nhất.",
    ],
    image: "/platform/2.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Sản phẩm an toàn,", "chứng nhận an tâm"],
    content: [
      "Tư Trúc đã và đang nghiên cứu phát triển nhiều dòng sản phẩm đáp ứng đa dạng nhu cầu thưởng thức, đồng thời tuân thủ nghiêm ngặt các tiêu chuẩn quốc tế về an toàn sản xuất và thực phẩm.",
    ],
    image: "/platform/3.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Uy tín hàng đầu,", "đồng hành dài lâu"],
    content: [
      "Với bề dày kinh nghiệm trong ngành lúa gạo, Tư Trúc đã trở thành đối tác tin cậy lâu năm của nhiều doanh nghiệp trong và ngoài nước, khẳng định vững chắc vị thế uy tín hàng đầu trên thị trường."
    ],
    image: "/platform/4.svg",
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener(); // Initial check
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [query]);
  return matches;
}

export function PlatformSection() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <section className="w-full px-5 py-10 bg-white">
        {/* HEADER TEXT */}
        <div className="space-y-4">
          <h2 className="text-[42px] font-bold leading-[1] text-[#005B94] font-fz">
            Nền tảng chủ động <br /> năng lực vững vàng
          </h2>
          <p className="text-[28px] text-[#667085] leading-[1] font-alegreya">
            Thế mạnh sản phẩm & sản xuất của thương hiệu trong suốt 4 thập kỷ
          </p>
        </div>

        {/* ICON + QUOTE */}
        <div className="pt-8 space-y-3">
          <Image
            src="/platform/icon-ngoac-kep.svg"
            alt="Quote Icon"
            width={40}
            height={30}
          />
          <p className="text-[#0A5B89] text-[18px] font-alegreya-sans font-[500] leading-[1.2]">
            Suốt hơn 4 thập kỷ, Tư Trúc bền bỉ xây dựng nền tảng sản xuất chủ động, kiểm soát toàn diện từ chất lượng đến sản lượng, luôn sẵn sàng đồng hành lâu dài cùng các đối tác chiến lược
          </p>
        </div>

        {/* LINE DIVIDER */}
        <hr className="my-8 border-[#D0D5DD]" />

        {/* SLIDE SCROLL SECTION */}
        <div className="flex overflow-x-auto space-x-5 snap-x snap-mandatory pb-4">
          {scrollDataMobile.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[280px] max-w-[300px] shrink-0 snap-center rounded-xl p-4 "
            >
              <div className="w-full aspect-square relative mb-4 rounded-md overflow-hidden">
                <Image
                  src={item.image}
                  alt={`Image ${idx}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#628423] text-[28px] font-regular mb-2 font-fz leading-[1]">
                {item.title.map((line, i) => (
                  <Fragment key={i}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </h3>
              <div className="space-y-2">
                {item.content.map((line, i) => (
                  <p
                    key={i}
                    className="text-[#667085] text-[14px] font-fz-poppins leading-[1.5]"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // 💻 Desktop layout giữ nguyên
  const fullScrollData = [
    {
      isHeader: true,
      image: "/platform/Mask group.svg",
      icon: "",
      title: [],
      content: "",
    },
    ...scrollData,
  ];

  return (
    <section className="relative w-full bg-white z-10">
      <div className="relative w-full max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-2">
        <div className="w-full px-5 lg:pl-10">
          {fullScrollData.map((item, idx) => (
            <div key={idx} className="min-h-[80vh] flex items-center">
              {item.isHeader ? (
                <div className="w-full h-[550px] flex flex-col justify-between z-10">
                  <div className="space-y-4">
                    <h2 className="text-[56px] md:text-[44px] font-extrabold leading-tight text-[#005B94] font-fz">
                      Nền tảng chủ động <br /> năng lực vững vàng
                    </h2>
                    <p className="text-[32px] text-[#888888] leading-relaxed font-alegreya">
                      Thế mạnh sản phẩm & sản xuất của <br />
                      thương hiệu trong suốt 4 thập kỷ
                    </p>
                  </div>
                  <div className="space-y-3 pt-6">
                    <Image
                      src="/platform/icon-ngoac-kep.svg"
                      alt="Quote Icon"
                      width={56}
                      height={39}
                    />
                    <p className="text-[#005B94] text-[20px] leading-relaxed font-medium font-fz">
                      Suốt hơn 4 thập kỷ, Tư Trúc bền bỉ xây dựng nền tảng sản xuất <br className="hidden sm:inline"/> chủ động,
                      kiểm soát toàn diện từ chất lượng đến sản lượng,<br className="hidden sm:inline"/> luôn sẵn sàng đồng hành lâu dài
                      cùng các đối tác chiến lược
                    </p>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="w-full"
                  variants={textVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image src={item.icon} alt="" width={40} height={40} />
                  <h3 className="text-[#628423] text-[32px] font-fz font-regular leading-[1] mt-3">
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
              className="sticky h-[80vh] flex items-center "
              style={{ top: 0 }}
            >
              <div className="relative w-full max-w-[550px] h-[550px] rounded-xl shadow-md">
                <Image
                  src={item.image}
                  alt={item.isHeader ? "Ảnh nền ban đầu" : `Illustration for ${item.title[0]}`}
                  fill
                  sizes="550px, 550px"
                  className="object-cover rounded-xl"
                  priority={idx === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
