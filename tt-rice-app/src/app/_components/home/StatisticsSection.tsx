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
          <div className="relative">
            <div className="w-[full] pb-10 md:pb-16 flex flex-col items-center sm:flex-none sm:items-baseline">
              <h2 className="w-[335px] leading-[100%] tracking-[0%] md:w-full text-[42px] sm:text-[56px] md:text-[56px] font-[700] text-center sm:text-left font-alegreya-sans" style={{color:" #0A5B89"}}>
                Ươm hạt gạo, <br /> nuôi mạch nguồn Việt Nam
              </h2>
              <p className="mt-3 w-[335px] md:w-full text-[28px] sm:text-[32px] leading-[100%] tracking-[0%] text-center sm:text-left mb-2 font-alegreya" style={{color:"#667085"}}>
                Những giá trị mà hạt gạo <br className="sm:hidden"/> Tư Trúc đã mang lại
              </p>
              <Button
                size="large"
                className="bg-green-normal hover:bg-green-dark text-white transition-all duration-300 rounded-full px-5 py-3.5 mt-5"
                onClick={handleClick}
              >
                <span className="flex items-center gap-2">
                  Xem thêm
                  <Image src="/bonglua.svg" alt="icon" width={8} height={19} />
                </span>
              </Button>
            </div>
            <div className="w-[570px] h-[327px] absolute top-[-19] left-[52%] hidden sm:inline">
              <Image
                src="/img_rectangle_3.png"
                alt="Rice Field"
                width={587}
                height={327}
                className="w-full h-full rounded-2xl"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-5">
            {/* Left Statistics */}
            <div className="bg-[#F4F3EA] rounded-[16px] overflow-hidden relative w-full h-[442px] lg:w-full lg:h-[642px]">
              <Image
                src="/img_image_104.png"
                alt="Farmers"
                fill
                className="object-cover"
              />
              <div className="relative z-10 px-6 sm:px-6 text-white">
                <div className="mb-8">
                  <p className="text-[56px] sm:text-[82px] font-[700] text-white font-alegreya-sans leading-none pt-6">&gt;300</p>
                  <p className="text-white text-[14px] sm:text-[16px] font-fz-poppins opacity-80">
                    hộ nông dân tại các vùng canh tác<br /> đang
                    hợp tác cùng Tư Trúc
                  </p>
                </div>
                <div>
                  <div className="text-[56px] sm:text-[82px] font-[700] text-white font-alegreya-sans leading-none"> <svg className="inline-block w-16 h-16 sm:w-16 sm:h-16 align-middle mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L19 13H5L12 6Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/> {/* Triangle up icon */}
                  </svg>10%</div>
                  <p className="text-[14px] sm:text-[16px] font-fz-poppins opacity-80">
                    tổng thu nhập bình quân của dân địa phương,<br className="hidden sm:inline"/> nhờ quy trình thu mua ổn định & giá thu mua<br className="hidden sm:inline"/> cao hơn thị trường
                  </p>
                </div>
              </div>
            </div>

            {/* Right Statistics */}
            <div className="flex flex-col gap-5 w-full">
              {/* >100 & 70% */}
              <div className="bg-[#6D9127] rounded-[16px] px-6 sm:px-10 py-6 text-white w-full lg:w-[605px] h-[318px] lg:h-[311px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[56px] sm:text-[82px] font-bold font-alegreya-sans leading-none">&gt;100</div>
                    <p className="text-[14px] sm:text-[16px] font-fz-poppins">
                      ha diện tích được áp dụng quy<br className="hidden sm:inline"/> trình canh tác sạch, không hóa<br className="hidden sm:inline"/> chất độc hại,... để cho ra dòng<br className="hidden sm:inline"/> sản phẩm sạch mỗi năm
                    </p>
                  </div>
                  <div>
                    <div className="text-[56px] sm:text-[82px] font-bold font-alegreya-sans leading-none"><svg className="inline-block w-16 h-16 sm:w-16 sm:h-18 align-middle mr-1" viewBox="0 2 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Added stroke and stroke-width for border */}
                    <path d="M12 18L5 11H19L12 18Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>70%</div>
                    <p className="text-[14px] sm:text-[16px] font-fz-poppins">
                      lượng thuốc bảo vệ thực vật<br className="hidden sm:inline"/> so với <br className=" sm:hidden"/> phương pháp canh tác<br className="hidden sm:inline"/> truyền thống
                    </p>
                  </div>
                </div>
              </div>

              {/* 100% */}
              <div className="rounded-[16px] px-6 sm:px-10 py-6 relative overflow-hidden bg-cover bg-center w-full lg:w-[605px] h-[331px] lg:h-[311px]">
                <Image
                  src="/img__1.png"
                  alt="Environment"
                  fill
                  className=" scale-x-120 translate-x-7 sm:scale-140:translate-x-30:transform:object-cover rounded-[16px]"
                />
                <div className="relative z-10 pt-[50%] sm:flex-none sm:pt-[0%] text-white h-full">
                  <div className="text-[56px] sm:text-[82px] font-bold font-alegreya-sans leading-none">100%</div>
                  <p className="text-[14px] sm:text-[16px] font-fz-poppins opacity-80 sm:opacity-80:max-w-[251px]" style={{color:"#FBFFF2"}}>
                    phụ phẩm (trấu, cám, tro...) được tái chế làm phân bón hữu cơ và thức ăn chăn nuôi, góp phần giảm phát thải và gìn giữ môi trường
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