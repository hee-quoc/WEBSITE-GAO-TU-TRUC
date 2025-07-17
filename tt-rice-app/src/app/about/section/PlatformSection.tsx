"use client";

import Image from "next/image";
import React, { useRef, Fragment } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const scrollData = [
  {
    icon: "/platform/icon.svg",
    title: ["Chủ động gieo trồng,", "vững vàng nguồn giống"],
    content:
      "Với lợi thế có hơn 150ha quỹ đất gia đình, Tư Trúc <br /> chủ động kiểm soát chặt chẽ từ lúa giống đến <br /> vùng trồng, đảm bảo chất lượng từ gốc. Nhờ vậy, <br /> doanh nghiệp luôn vững vàng trước mọi biến động <br /> về thời tiết, dịch bệnh hay thị trường, sẵn sàng duy trì <br /> nguồn cung ổn định, cao cấp, đáp ứng kịp thời mọi <br /> nhu cầu về sản lượng của đối tác.",
    image: "/platform/1.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Quy trình nghiêm ngặt,", "chất lượng vượt bậc"],
    content:
      "Mọi công đoạn sản xuất được Tư Trúc kiểm soát <br /> nghiêm ngặt và minh bạch, đảm bảo mỗi hạt gạo <br /> đều đạt chất lượng ổn định và đồng nhất.",
    image: "/platform/2.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Sản phẩm an toàn,", "chứng nhận an tâm"],
    content:
      "Tư Trúc đã và đang nghiên cứu phát triển nhiều dòng <br /> sản phẩm đáp ứng đa dạng nhu cầu thưởng thức,<br />đồng thời tuân thủ nghiêm ngặt các tiêu chuẩn <br /> quốc tế về an toàn sản xuất và thực phẩm.",
    image: "/platform/3.svg",
  },
  {
    icon: "/platform/icon.svg",
    title: ["Uy tín hàng đầu,", "đồng hành dài lâu"],
    content:
      "Với bề dày kinh nghiệm trong ngành lúa gạo, <br /> Tư Trúc đã trở thành đối tác tin cậy lâu năm <br /> của nhiều doanh nghiệp trong và ngoài nước, <br />khẳng định vững chắc vị thế uy tín hàng đầu <br /> trên thị trường.",
    image: "/platform/4.svg",
  },
];

export function PlatformSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Gọi useTransform ở top-level, không lồng trong map
  const y0 = useTransform(scrollYProgress, [0.0, 0.25], [50, 0]);
  const o0 = useTransform(scrollYProgress, [0.0, 0.25], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.25, 0.5], [50, 0]);
  const o1 = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.5, 0.75], [50, 0]);
  const o2 = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.75, 1.0], [50, 0]);
  const o3 = useTransform(scrollYProgress, [0.75, 1.0], [0, 1]);

  const transforms = [
    { y: y0, opacity: o0 },
    { y: y1, opacity: o1 },
    { y: y2, opacity: o2 },
    { y: y3, opacity: o3 },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white overflow-visible z-10"
    >
      <div className="w-full max-w-[1280px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-12">
        {/* CỘT TRÁI */}
        <div className="flex-1 flex flex-col justify-start max-w-[550px] gap-8 z-10 pl-[40px] pt-[96px] pb-[99px]">
          {/* GIỚI THIỆU */}
          <div className="space-y-4">
            <h2 className="text-[56px] md:text-[44px] font-extrabold leading-tight text-[#005B94] font-fz">
              Nền tảng chủ động <br /> năng lực vững vàng
            </h2>
            <p className="text-[32px] text-[#888888] leading-relaxed font-alegreya">
              Thế mạnh sản phẩm & sản xuất của <br />
              thương hiệu trong suốt 3 thập kỷ
            </p>
          </div>

          <div className="space-y-3 mt-[120px]">
            <Image
              src="/platform/icon-ngoac-kep.svg"
              alt="Quote Icon"
              width={56}
              height={39}
            />
            <p className="text-[#005B94] text-[20px] leading-relaxed font-medium font-fz">
              Suốt hơn 3 thập kỷ, Tư Trúc bền bỉ xây dựng nền tảng sản xuất <br /> chủ động,
              kiểm soát toàn diện từ chất lượng đến sản lượng, <br /> luôn sẵn sàng đồng hành lâu dài
              cùng các đối tác chiến lược
            </p>
          </div>

          {/* TEXT SCROLL 2–5 */}
          <div className="flex flex-col gap-32 pt-32">
            {scrollData.map((item, idx) => (
              <div key={idx} className="min-h-[70vh] flex flex-col justify-center">
                <Image
                  src={item.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="mb-4"
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
              </div>
            ))}
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="flex-1 sticky top-0 min-h-[700px] flex items-start justify-center pt-[96px] pb-[99px] pr-[-30px]">
          <div className="relative w-[550px] h-[550px] rounded-xl shadow-md overflow-hidden">
            {/* Ảnh nền cố định */}
            <Image
              src="/platform/Mask group.svg"
              alt="Ảnh nền ban đầu"
              fill
              sizes="550px"
              priority
              className="object-cover object-center rounded-xl z-0"
            />
            {/* Ảnh scroll động */}
            {scrollData.map((item, idx) => (
              <motion.div
                key={idx}
                className="absolute top-0 left-0 w-full h-full"
                style={transforms[idx]}
              >
                <Image
                  src={item.image}
                  alt={`Scroll image ${idx + 2}`}
                  fill
                  className="object-cover object-center rounded-xl"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
