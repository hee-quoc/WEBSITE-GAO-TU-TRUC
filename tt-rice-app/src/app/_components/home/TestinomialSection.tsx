"use client";

import type { Testimonial } from "~/app/types/Types";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials: Testimonial[] = [
  {
    id: "1",
    content:
      "Làm lúa bao nhiêu năm nay, tôi hiểu rõ từng \n hạt gạo mình làm ra. Từ lúc gieo mạ đến \n ngày thu hoạch, đều tự tay chăm chút. \n Thành ra, bao năm nay tôi chỉ ăn mỗi gạo \n Tư Trúc, vì tôi biết chắc từng hạt cơm sạch sẽ, \n tử tế như chính công sức mình bỏ vào. ",
    author: "Anh Năm Tiến (37 tuổi)",
    position: "Nông dân Long Điền",
    avatar: "/testinomial_nam_tien.png",
  },
  {
    id: "2",
    content:
      "Nhà tui 3 người thì hết 2 người là đang \n làm việc cho xưởng này rồi: tui thì \n vận hành máy móc, vợ tui kiểm kho hàng. \n Thằng con tui thì mới thi đại học, tính ra \n toàn bộ học phí mười mấy năm của nó \n đều đến từ mấy nồi cơm thơm nóng \n của bà con hết đó chớ!",
    author: "Anh Long (37 tuổi)",
    position: "Công nhân nhà máy Tư Trúc",
    avatar: "/anh_long_testinomial.png",
  },
  {
    id: "3",
    content:
      "Hơn 30 năm gắn bó cùng hạt gạo, \n tôi luôn nghĩ: “Hạt cơm mình bán ra, \n cuối cùng cũng sẽ có ngày quay về \n mâm cơm nhà mình”. Nên mỗi mẻ gạo, \n tôi coi như làm cho chính người thân mình \n ăn vậy. Sạch, thật, tử tế, chỉ cần vậy, \n rồi khách hàng sẽ tự cảm nhận…",
    author: "Bà Tư (58 tuổi)",
    position: "Chủ nhà máy Tư Trúc",
    avatar: "/ba_tu_testinomial.png",
  },
];

export function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const testimonial = testimonials[currentIndex];
  const total = testimonials.length;

  const extendedTestimonials = [
    ...testimonials,
    { ...testimonials[0], id: "__loop_clone__" },
  ];

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = scrollRef.current;
      if (!container) return;
      const children = Array.from(
        container.querySelectorAll("[data-index]")
      );
      const child = children[index] as HTMLElement;
      if (child) {
        const containerWidth = container.offsetWidth;
        const childWidth = child.offsetWidth;
        const offsetLeft = child.offsetLeft;
        const scrollTo = offsetLeft - (containerWidth - childWidth) / 2;
        container.scrollTo({ left: scrollTo, behavior });
        setCurrentIndex(index % total);
      }
    },
    [total]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      setCurrentIndex(nextIndex);
      scrollToIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, total, scrollToIndex]);

  const variants = {
    enter: () => ({ x: 200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: () => ({ x: -300, opacity: 0 }),
  };

  if (!testimonial) return null;

  return (
    <section className="pb-20 pt-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-[25%_68%] gap-4 lg:gap-6">
          <div className="text-center lg:text-left flex flex-col justify-center">
            <h2 className="font-alegreya-sans font-[500] text-[36px] sm:text-[56px] leading-[100%] tracking-[0]  text-[#526D1D]">
              Mọi người nghĩ gì về <br /> Tư Trúc
            </h2>
          </div>

          <div
            className="bg-white sm:border rounded-2xl py-4 sm:p-6 lg:p-8 flex flex-col gap-6"
            style={{ borderColor: "#E9F2DA" }}
          >
            {/* Mobile */}
            <div
              ref={scrollRef}
              className="block lg:hidden overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4"
            >
              <div className="flex gap-2 w-max">
                {extendedTestimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial?.id}-${index}`}
                    data-index={index}
                    className="w-[297px] min-h-[395px] sm:w-[320px] flex-shrink-0 bg-white border rounded-xl p-4 flex flex-col gap-4 ml-8 "
                    style={{ borderColor: "#E9F2DA" }}
                  >
                    <div className="flex-shrink-0 md:flex-[0.25]">
                      <Image
                        src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/img_.svg"
                        alt="Quote"
                        width={56}
                        height={39}
                      />
                    </div>
                    <div
                      className="text-sm sm:text-base font-fz-poppins leading-relaxed break-words"
                      style={{ color: "#667085" }}
                    >
                      {testimonial?.content?.split("\n").map((line, i, arr) => (
                        <React.Fragment key={i}>
                          {line}
                          {i !== arr.length - 1 && <br className="hidden sm:inline" />}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <Image
                        src={testimonial?.avatar ?? "/testinomial_nam_tien.png"}
                        alt={testimonial?.author ?? "Author"}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4
                          className="text-[16px] font-bold font-alegreya-sans text-blue-dark"
                          style={{ color: "#0A5B89" }}
                        >
                          {testimonial?.author}
                        </h4>
                        <p
                          className="text-[14px] text-gray-muted font-alegreya-sans opacity-60"
                          style={{ color: "#5C6578" }}
                        >
                          {testimonial?.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-2 mt-4">
                      {testimonials.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className="rounded-full overflow-hidden transition duration-300"
                        >
                          <Image
                            src={
                              idx === currentIndex
                                ? "/Pagination_current.svg"
                                : "/Pagination.svg"
                            }
                            alt={item.author}
                            width={18}
                            height={8}
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop */}
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex]?.id}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="w-full hidden lg:flex flex-col md:flex-row gap-4 lg:gap-4"
              >
                <div className="flex-shrink-0 md:flex-[0.25]">
                  <Image src="https://nhamaygaotutruc-images.s3.ap-southeast-2.amazonaws.com/public/img_.svg" alt="Quote" width={56} height={39} />
                </div>

                <div className="flex flex-col md:flex-[3]">
                  <p
                    className="text-sm sm:text-base md:text-lg font-fz-poppins text-gray-light leading-relaxed flex-1 border-r-2 pr-4 border-[#E8EAED]"
                    style={{ color: "#667085" }}
                  >
                    {testimonial.content.split("\n").map((line, i, arr) => (
                      <React.Fragment key={i}>
                        {line}
                        {i !== arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="flex gap-2 mt-2 sm:mt-4">
                    {testimonials.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className="rounded-full overflow-hidden transition duration-300"
                      >
                        <Image
                          src={
                            index === currentIndex
                              ? "/Pagination_current.svg"
                              : "/Pagination.svg"
                          }
                          alt={item.author}
                          width={18}
                          height={8}
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 md:flex-[1] min-w-[256px]">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={56}
                    height={56}
                    className="rounded-full"
                  />
                  <div className="text-center">
                    <h4
                      className="text-[20px] sm:text-[20px] md:text-lg font-bold font-alegreya-sans text-blue-dark mb-1"
                      style={{ color: "#0A5B89" }}
                    >
                      {testimonial.author}
                    </h4>
                    <p
                      className="text-[16px] sm:text-[16px] text-gray-muted font-alegreya-sans opacity-60"
                      style={{ color: "#5C6578" }}
                    >
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
