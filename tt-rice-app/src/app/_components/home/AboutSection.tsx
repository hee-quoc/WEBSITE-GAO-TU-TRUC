"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useMediaQuery } from "~/app/hooks/useMediaQuery";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.6,
    },
  }),
};

export function AboutSection() {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [hasMounted, setHasMounted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    window.location.href = "/about";
  };

  if (!hasMounted) return null; // ✅ Tránh flash layout khi hydrate

  return (
    <section className="bg-white overflow-hidden w-full">
      {isMobile ? (
        // ========== ✅ Mobile layout ==========
        <div className="flex flex-col items-center text-center px-6 py-16">
          <h2 className="text-[32px] font-bold text-[#0A5B89] leading-tight mb-4">
            Hành trình nâng tầm giá trị gạo Việt
          </h2>
          <p className="text-[18px] text-[#667085] mb-6 leading-[1.4]">
            Câu chuyện truyền cảm hứng từ Tư Trúc
          </p>
          <Button
            size="small"
            className="bg-[#6C9126] text-white rounded-full px-6 py-3 mb-10"
            onClick={handleClick}
          >
            <span className="flex items-center justify-center gap-2">
              Tìm hiểu thêm
              <Image src="/icon_wheat_white.svg" alt="icon" width={20} height={20} />
            </span>
          </Button>

          {/* Block 1 */}
          <Image src="/Group 930.svg" alt="Tu Truc Story" width={249} height={249} className="mb-5" />
          <p className="text-[15px] leading-[1.6] text-[#525A6A] mb-10 max-w-[340px] font-fz-poppins">
            Câu chuyện của Tư Trúc bắt đầu từ <b>hơn 30 năm trước</b>, nơi vùng đất{" "}
            <b>Hòa Long màu mỡ</b>, tại một <b>nhà máy xay xát lúa nhỏ bé</b> mang trong mình{" "}
            <b>sứ mệnh lớn lao – nâng tầm và lan tỏa giá trị “hạt ngọc thực”</b>.
          </p>

          {/* Block 2 */}
          <Image src="/Group 929.svg" alt="Rice Field" width={250} height={250} className="mb-5" />
          <p className="text-[15px] leading-[1.6] text-[#525A6A] mb-10 max-w-[340px] font-fz-poppins">
            Với Tư Trúc, gạo là kết tinh từ <b>sự ưu đãi của thiên nhiên</b>,{" "}
            <b>đôi bàn tay cần mẫn của người nông dân</b> và <b>công nhân, nhà máy</b> –{" "}
            <b>những giá trị luôn bền bỉ theo thời gian.</b>
          </p>

          {/* Block 3 */}
          <Image src="/Layer_2.svg" alt="Tu Truc Heritage" width={350} height={175} className="mb-10" />

          {/* Block 4 */}
          <p className="text-[15px] leading-[1.6] text-[#334155] max-w-[340px] font-fz-poppins">
            Chính vì lẽ đó, suốt hành trình phát triển, bên cạnh việc{" "}
            <b>không ngừng nâng cấp chất lượng sản phẩm và hiện đại hóa hệ thống máy móc</b>, Tư Trúc
            vẫn luôn đặt trọng tâm việc <b>tôn vinh thức quà tinh túy</b> – để mỗi hạt gạo trở thành{" "}
            <b>ký ức, nguồn cội, văn hóa và bản sắc Việt.</b>
          </p>
        </div>
      ) : (
        // ========== ✅ Desktop layout ==========
        <div className="relative w-[1440px] h-[1458px] mx-auto">
          {/* Header */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.4 }}
            className="absolute top-[80px] left-1/2 transform -translate-x-1/2 text-center z-10 w-full"
          >
            <h2 className="text-[56px] leading-[1] font-bold mb-6 max-w-[573px] mx-auto text-[#0A5B89]">
              Hành trình nâng tầm giá trị gạo Việt
            </h2>
            <p className="text-[32px] leading-[1.4] font-normal mb-8 max-w-[573px] mx-auto text-[#667085]">
              Câu chuyện truyền cảm hứng từ Tư Trúc
            </p>
            <Button
              size="small"
              className="bg-[#6C9126] text-white rounded-full px-5 py-3.5"
              onClick={handleClick}
            >
              <span className="flex items-center gap-2">
                Tìm hiểu thêm
                <Image src="/icon_wheat_white.svg" alt="icon" width={20} height={20} />
              </span>
            </Button>
          </motion.div>

          {/* Cloud */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[421.75px] right-[41.95px] w-[183px] h-[70px] z-10"
          >
            <Image src="/cloud.svg" alt="Cloud" width={183} height={70} />
          </motion.div>

          {/* Decorative elements */}
          <Image src="/Ellipse 12.svg" alt="Dot" width={32} height={32} className="absolute top-[509px] left-[659px] z-10" />
          <Image src="/Ellipse 12.svg" alt="Dot" width={32} height={32} className="absolute top-[660px] left-[843px] z-10" />
          <Image src="/Ellipse 12.svg" alt="Dot" width={32} height={32} className="absolute top-[914px] left-[345px] z-10" />
          <div className="absolute top-[519.5px] left-[357.25px] w-[502px] h-[566px] z-0">
            <Image src="/line.svg" alt="Decorative line" width={502} height={566} />
          </div>

          {/* Block 1 */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.4 }}
            className="absolute top-[352px] left-[119px] w-[571px] flex flex-col items-center gap-[20px] text-center z-10"
          >
            <Image src="/Group 930.svg" alt="Tu Truc Story" width={249} height={249} className="mb-5" />
            <div className="text-[#525A6A] text-[16px] leading-[1.4] max-w-[530px] font-fz-poppins font-[400]">
              <p>
                Câu chuyện của Tư Trúc bắt đầu từ <b>hơn 30 năm trước</b>, nơi vùng đất{" "}
                <b>Hòa Long màu mỡ</b>, tại một <b>nhà máy xay xát lúa nhỏ bé</b> mang sứ mệnh{" "}
                <b>nâng tầm và lan tỏa giá trị “hạt ngọc thực”</b>.
              </p>
            </div>
          </motion.div>

          {/* Block 2 */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.4 }}
            className="absolute top-[494px] right-[127px] w-[490px] text-center flex flex-col items-center z-10"
          >
            <Image src="/Group 929.svg" alt="Rice Field" width={250} height={250} className="mb-5" />
            <div className="text-[#525A6A] text-[16px] leading-[1.4] max-w-[530px] font-fz-poppins font-[400]">
              <p>
                Với Tư Trúc, gạo là kết tinh từ <b>sự ưu đãi của thiên nhiên</b>,{" "}
                <b>đôi bàn tay cần mẫn của người nông dân</b> và <b>công nhân, nhà máy</b> –{" "}
                <b>những giá trị luôn bền bỉ theo thời gian.</b>
              </p>
            </div>
          </motion.div>

          {/* Block 3 */}
          <motion.div
            custom={3}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="absolute top-[848px] left-[355px] w-[716px] h-[359px] z-[1]"
          >
            <Image src="/Layer_2.svg" alt="Tu Truc Heritage" width={716} height={359} />
          </motion.div>

          {/* Block 4 */}
          <motion.div
            custom={4}
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true, amount: 0.2 }}
            className="absolute text-center max-w-[567px] z-[3] leading-[1.4]"
            style={{ top: "1244px", left: "437px", color: "#334155" }}
          >
            <p className="text-[16px] font-fz-poppins font-[400]">
              Chính vì lẽ đó, suốt hành trình phát triển, bên cạnh việc{" "}
              <b>không ngừng nâng cấp chất lượng sản phẩm và hiện đại hóa hệ thống máy móc</b>, Tư Trúc
              vẫn luôn đặt trọng tâm việc <b>tôn vinh thức quà tinh túy</b> – để mỗi hạt gạo trở thành{" "}
              <b>ký ức, nguồn cội, văn hóa và bản sắc Việt.</b>
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
