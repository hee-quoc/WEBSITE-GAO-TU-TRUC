"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

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
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      const timerId = setTimeout(() => {
        setIsClicked(false);
        console.log("Card re-enabled.");
      }, 5000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isClicked]);

  const handleClick = () => {
    if (isClicked) {
      console.log("Action is temporarily disabled.");
      return;
    }

    setIsClicked(true);
    window.location.href = "/about";
  };

  return (
    <section className="bg-white overflow-hidden">
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
          <h2
            className="text-[56px] leading-[1] font-bold mb-6 max-w-[573px] mx-auto text-center"
            style={{ color: "#0A5B89" }}
          >
            Hành trình nâng tầm giá trị gạo Việt
          </h2>
          <p
            className="text-[32px] leading-[1.4] font-normal mb-8 max-w-[573px] mx-auto text-center"
            style={{ color: "#667085" }}
          >
            Câu chuyện truyền cảm hứng từ Tư Trúc
          </p>
          <Button
            size="small"
            className="bg-[#6C9126] hover:bg-[#6C9126] text-white transition-all duration-300 rounded-full px-5 py-3.5"
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

        {/* Ellipses */}
        <Image
          src="/Ellipse 12.svg"
          alt="Green dot"
          width={32}
          height={32}
          className="absolute top-[509px] left-[659px] z-10"
        />
        <Image
          src="/Ellipse 12.svg"
          alt="Green dot"
          width={32}
          height={32}
          className="absolute top-[660px] left-[843px] z-10"
        />
        <Image
          src="/Ellipse 12.svg"
          alt="Green dot"
          width={32}
          height={32}
          className="absolute top-[914px] left-[345px] z-10"
        />

        {/* Decorative line */}
        <div className="absolute top-[519.5px] left-[357.25px] w-[502px] h-[566px] z-0">
          <Image src="/line.svg" alt="Decorative line" width={502} height={566} />
        </div>

        {/* Block 1: Nhà máy */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.4 }}
          className="absolute top-[352px] left-[119px] w-[571px] flex flex-col items-center gap-[20px] text-center z-10"
        >
          <Image
            src="/Group 930.svg"
            alt="Tu Truc Story"
            width={249}
            height={249}
            className="mb-5"
          />
          <p className="text-base font-normal leading-[1.4] max-w-[457px]" style={{ color: "#334155" }}>
            Câu chuyện về Tư Trúc bắt đầu từ{" "}
            <span style={{ fontWeight: 700, color: "#525A6A" }}> hơn 30 năm trước, một nhà máy xay xát lúa</span>, với{" "}
            <span style={{ fontWeight: 700, color: "#525A6A" }}>một niềm tự hào về việc giữ gìn nền văn minh lúa nước ngàn năm</span> và{" "}
            <span style={{ fontWeight: 700, color: "#525A6A" }}>nâng tầm, lan tỏa giá trị &quot;hạt ngọc thực&quot;</span> đến với mỗi người Việt{" "}
          </p>
        </motion.div>

        {/* Block 2: Nông dân */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.4 }}
          className="absolute top-[494px] right-[127px] w-[490px] text-center flex flex-col items-center z-10"
        >
          <Image
            src="/Group 929.svg"
            alt="Rice Field"
            width={250}
            height={250}
            className="mb-5"
          />
          <p className="text-base font-normal leading-[1.4]" style={{ color: "#334155" }}>
            Với Tư Trúc, gạo là kết tinh từ{" "}
            <span style={{ fontWeight: 700, color: "#525A6A" }}>sự ưu đãi của thiên nhiên</span>, từ{" "}
            <span style={{ fontWeight: 700, color: "#525A6A" }}>đôi bàn tay cần mẫn của người nông dân</span> và {" "} 
            <span style={{ fontWeight: 700, color: "#525A6A" }}> công nhân nhà máy, </span> từ{" "} 
            <span style={{ fontWeight: 700, color: "#525A6A" }}> những giá trị luôn bền bỉ theo thời gian. </span>
          </p>
        </motion.div>

        {/* Block 3: Hình ảnh */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute top-[848px] left-[355px] w-[716.26px] h-[359.37px] z-[1]"
        >
          <Image
            src="/Layer_2.svg"
            alt="Tu Truc Heritage"
            width={716}
            height={359}
          />
        </motion.div>

        {/* Block 4: Text cuối */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute text-center text-base font-normal leading-[140%] max-w-[567px] z-[3]"
          style={{
            top: "1244px",
            left: "437px",
            color: "#334155",
          }}
        >
          Chính vì lẽ đó, suốt hành trình phát triển, bên cạnh việc{" "}
          <span style={{ fontWeight: 700, color: "#525A6A" }}>không ngừng nâng cấp </span>{" "}
          <span style={{ fontWeight: 700, color: "#525A6A" }}>chất lượng sản phẩm và hiện đại hóa hệ thống máy móc</span>, Tư Trúc vẫn luôn đặt trọng tâm{" "}
          <span style={{ fontWeight: 700, color: "#525A6A" }}>việc tôn vinh thức quà tinh túy</span> này - để mỗi hạt gạo không chỉ là một phần không thể thiếu của gian bếp, mà còn trở thành ký ức, nguồn cội, văn hóa và bản sắc Việt {" "}
          {/* <span style={{ fontWeight: 700, color: "#525A6A" }}>một phần không thể thiếu của gian bếp</span>, mà còn trở thành{" "}
          <span style={{ fontWeight: 700, color: "#525A6A" }}>ký ức, nguồn cội, văn hóa và bản sắc Việt</span>. */}
        </motion.div>
      </div>
    </section>
  );
}
