'use client'

import Image from "next/image"
import Button from "../ui/Button"
import { useState,useEffect } from 'react';

export function StatisticSection(){
  const [isClicked, setIsClicked] = useState(false);
        useEffect(() => {
          if (isClicked) {
            // 1. Set a timer for 5000 milliseconds (5 seconds).
            const timerId = setTimeout(() => {
              // 2. After 5 seconds, set 'isClicked' back to false.
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
            console.log('Action is temporarily disabled.');
            return;
          }
      
          setIsClicked(true);
          window.location.href = "/about";
        };
    return (
        <section className="pt-20 pb-5 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[56px] sm:text-[80px] md:text-5xl font-bold mb-2 font-alegreya-sans" style={{color:" #0A5B89"}}>
                Ươm hạt gạo, <br /> nuôi mạch nguồn Việt Nam
              </h2>
              <p className="text-[32px] sm:text-[32px] text-gray-light mb-4 font-alegreya-sans" style={{color:"#667085"}}>
                Những giá trị mà hạt gạo Tư Trúc đã mang lại
              </p>
              <Button
                size="large"
                className="bg-green-normal hover:bg-green-dark text-white transition-all duration-300 rounded-full px-5 py-3.5"
                onClick={handleClick}
              >
                <span className="flex items-center gap-2">
                  Xem thêm
                  <Image src="/bonglua.svg" alt="icon" width={8} height={19} />
                </span>
              </Button>
            </div>
            <div>
              <Image
                src="/img_rectangle_3.png"
                alt="Rice Field"
                width={587}
                height={327}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-8">
            {/* Left Statistics */}
            <div className="bg-[#F4F3EA] rounded-[16px] overflow-hidden relative w-full h-auto lg:w-[495px] lg:h-[642px]">
              <Image
                src="/img_image_104.png"
                alt="Farmers"
                fill
                className="object-cover"
              />
              <div className="relative z-10 p-6 sm:p-10 text-white">
                <div className="mb-8">
                  <div className="text-5xl sm:text-6xl font-bold mb-4 text-white font-alegreya-sans">&gt;300</div>
                  <p className="text-white font-fz-poppins">
                    Hộ nông dân tại các vùng canh tác đang<br />
                    hợp tác cùng Tư Trúc
                  </p>
                </div>
                <div>
                  <div className="text-5xl sm:text-6xl font-bold mb-4 text-white font-alegreya-sans">10%</div>
                  <p className="text-white font-fz-poppins">
                    Thu nhập bình quân tăng 10% nhờ thu mua<br />
                    ổn định & giá thu cao hơn thị trường
                  </p>
                </div>
              </div>
            </div>

            {/* Right Statistics */}
            <div className="flex flex-col gap-8 w-full">
              {/* >100 & 70% */}
              <div className="bg-[#6D9127] rounded-[16px] px-6 sm:px-10 py-[37px] text-white w-full lg:w-[605px] h-auto lg:h-[311px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-5xl sm:text-6xl font-bold mb-4 font-alegreya-sans">&gt;100</div>
                    <p className="text-green-lightest-1 font-fz-poppins">
                      Trên 100 HA diện tích được<br />
                      áp dụng quy trình canh tác sạch, không hóa chất độc hại...
                    </p>
                  </div>
                  <div>
                    <div className="text-5xl sm:text-6xl font-bold mb-4 font-alegreya-sans">70%</div>
                    <p className="text-green-lightest-1 font-fz-poppins">
                      Giảm 70% lượng thuốc bảo vệ thực phẩm hữu so với canh tác truyền thống
                    </p>
                  </div>
                </div>
              </div>

              {/* 100% */}
              <div className="rounded-[16px] px-6 sm:px-10 py-10 relative overflow-hidden bg-cover bg-center w-full lg:w-[605px] h-auto lg:h-[311px]">
                <Image
                  src="/img__1.png"
                  alt="Environment"
                  fill
                  className="object-cover rounded-[16px]"
                />
                <div className="relative z-10 text-white">
                  <div className="text-5xl sm:text-6xl font-bold mb-4 font-alegreya-sans">100%</div>
                  <p className="text-green-lightest-2 font-fz-poppins">
                    Tận dụng 100% phụ phẩm (trấu, cám, tro..) tái chế làm phân bón hữu cơ và thức ăn chăn nuôi. Góp phần giảm<br />
                    chất thải và gìn giữ môi trường
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-cream rounded-2xl overflow-hidden relative">
              <Image
                src="/img_image_104.png"
                alt="Farmers"
                fill
                className="object-cover"
              />
              <div className="relative z-10 p-8 text-white">
                <div className="mb-8">
                  <div className="text-6xl font-bold mb-4">&gt;300</div>
                  <p className="text-green-lightest-2">
                    Hộ nông dân tại các vùng canh tác đang<br />
                    hợp tác cùng Tư Trúc
                  </p>
                </div>
                <div>
                  <div className="text-6xl font-bold mb-4">10%</div>
                  <p className="text-green-lightest-2">
                    Thu nhập bình quân tăng 10% nhờ thu mua<br />
                    ổn định & giá thu cao hơn thị trường
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-green-primary rounded-2xl p-8 text-white">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-6xl font-bold mb-4">&gt;100</div>
                    <p className="text-green-lightest-1">
                      Trên 100 HA diện tích được<br />
                      áp dụng quy trình canh tác sạch, không hóa chất độc hại...
                    </p>
                  </div>
                  <div>
                    <div className="text-6xl font-bold mb-4">70%</div>
                    <p className="text-green-lightest-1">
                      Giảm 70% lượng thuốc bảo vệ thực phẩm hữu so với canh tác truyền thống
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl p-8 relative overflow-hidden">
                <Image
                  src="/img__1.png"
                  alt="Environment"
                  fill
                  className="object-cover"
                />
                <div className="relative z-10 text-white">
                  <div className="text-6xl font-bold mb-4">100%</div>
                  <p className="text-green-lightest-2">
                    Tận dụng 100% phụ phẩm (trấu, cám, tro..) tái chế làm phân bón hữu cơ và thức ăn chăn nuôi. Góp phần giảm<br />
                    chất thải và gìn giữ môi trường
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      
    )
}