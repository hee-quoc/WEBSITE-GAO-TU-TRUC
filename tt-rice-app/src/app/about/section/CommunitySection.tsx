"use client";

import Image from "next/image";
import React from "react";
import { useMediaQuery } from "~/app/hooks/useMediaQuery";
const farmerMobile ={alt:"Tu Truc mobile logo",src:"/images/about/img_farmer.svg", width: 335, height: 264}
const farmerDesktop = { alt: 'Tu Truc logo',src: "/images/about/community_about_2.png",width: 311, height: 407}
function MobileCard(){
  return(
    <section className="pt-20 pb-5 bg-white">
        <div className={`max-w-7xl flex flex-col items-center mx-auto px-5 `}>
          <div className="max-w-[732px]">
            <h2 className="text-4xl mb-3 text-center font-bold  font-alegreya-sans" style={{ color: "#0A5B89" }}> 
              Giá trị gửi trao <br /> đến cộng đồng
            </h2>
            <p className="max-w-[732px] text-[16px] sm:text-[16px] text-center text-gray-light mb-8 sm:mb-12 font-fz-poppins" style={{ color: "#667085" }}> 
              Thấu hiểu giá trị của đất lành, nước mát và bàn tay người lao động trong hành trình nuôi dưỡng hạt gạo Việt, Tư Trúc luôn đặt trọn tâm huyết vào việc bảo vệ hệ sinh thái canh tác, nâng cao giá trị nghề nông và cải thiện đời sống người lao động.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-6 sm:gap-8 mt-6 sm:mt-10"> 
            <div className="bg-[#F4F3EA] rounded-[16px] overflow-hidden relative w-full h-[677px] "> 
              <Image
                src="/images/about/community_about_1.png"
                alt="Farmers_lar"
                fill
                className="object-cover"
                />
              <div className="relative z-10 py-5 sm:py-5 px-6 w-full pt-2"> 
                <div className=" mb-6 sm:mb-4"> 
                  <div className="text-[82px] font-bold font-alegreya-sans leading-[1] p-0 m-0" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>30</div> 
                  <p className="text-[16px]  font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Hộ nông dân địa phương <br /> đồng hành lâu dài
                  </p>
                </div>
                <div className=" mb-6 sm:mb-8"> 
                  <div className="text-[82px] font-bold font-alegreya-sans leading-[1] p-0 m-0" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>40</div> 
                  <p className="font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Công nhân có việc làm ổn định <br /> tại nhà máy
                  </p>
                </div>
                <div>
                  <div className="text-[82px] font-bold font-alegreya-sans leading-[1] p-0 m-0" style={{ color: "#6D9127" }}> 
                    <svg className="inline-block w-17 h-17 align-middle mr-1" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L19 13H5L12 6Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/> 
                    </svg>10%
                  </div> 
                  <p className=" font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Thu nhập bình quân
                  </p>
                </div>
                <p className="text-[14px] mt-6 sm:mt-8 font-fz-poppins" style={{ color: "#667085" }}> 
                  Tư Trúc trực tiếp thu mua lúa từ hàng ngàn hộ nông dân, đảm bảo đầu ra ổn định, thu nhập bền vững.<br />Song song đó, thường hiệu chủ trong đào tạo, chuyển giao kỹ thuật và ứng dụng công nghệ cho đội ngũ công nhân bản địa, giúp người lao động nâng cao tay nghề, tiếp cận tri thức mới nhưng vẫn gìn giữ nghề lúa nước truyền thống.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className={`basis-[60%] flex flex-col text-white w-full  h-auto `}>
                <div className="relative bg-[#6D9127] w-full aspect-[335/264] rounded-[16px] overflow-hidden">
                  <Image
                      src="/images/about/img_farmer.svg"
                      fill
                      alt="Farmers_lar"
                      className="object-cover z-0"
                      />
                  <div className="pt-[35px] py-5 z-10 relative h-[56px]">
                    <div className=" h-[56px] flex items-center pl-[20px] overflow-hidden z-10 relative mb-2">
                      <Image
                        src="/images/about/icon_polygon.svg"
                        width={56}
                        height={56}
                        alt="Farmers_lar"
                        className="object-contain z-0"
                      />
                      <p className="font-alegreya-sans font-bold text-[82px] leading-[1] tracking-normal ml-2">
                        70%
                      </p>
                    </div>
                      <p className="pl-[20px] text-[16px] font-fz-poppins opacity-80"style={{ color: "#EFF0F2" }} >
                        lượng thuốc bảo vệ thực vật
                      </p>
                  </div>
                </div>
                <div className="gap-4 mt-6 bg-[#F4F3EA] rounded-[16px] px-5 py-10 flex flex-col justify-around h-[352px]">
                  <div>
                    <div className="text-7xl sm:text-7xl md:text-7xl font-bold  font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>100 ha</div> 
                    <p className=" text-gray-700 font-fz-poppins" style={{ color: "#7D8493" }}> 
                      ha diện tích canh tác không hóa chất độc hại
                    </p>
                  </div>
                  <p className=" text-gray-700 font-fz-poppins" style={{ color: "#7D8493" }}> {/* Adjusted font sizes and margin-top */}
                    Tư Trúc kiên trì mô hình canh tác sạch, không hóa chất độc hại, giúp giảm lượng thuốc bảo vệ thực vật đáng kể, giúp bảo vệ được sức khỏe đất đai, người trồng và mang đến những mùa vụ gạo sạch, an toàn.
                  </p>
                </div>
              </div>
               <div className="mt-2 h-[352px] rounded-[16px] relative overflow-hidden bg-center">
                <Image
                  src="/images/about/img_hand_husk.svg"
                  alt="Environment"
                  fill
                  className="object-cover rounded-[16px]"
                />
                <div className="relative z-10 text-white px-[39px]">
                  <div className="pt-6">
                    <div className="text-[82px] font-bold font-alegreya-sans leading-[1] p-0 m-0">100%</div> 
                    <p className="text-white font-fz-poppins opacity-80" style={{color:"#EFF0F2"}}> 
                      Phụ phẩm tái chế phục vụ chăn nuôi & canh tác bền vững
                    </p>
                  </div>
                  
                  <p className="max-w-[345px] mt-8 text-white font-fz-poppins" style={{color:"#EFF0F2"}}> 
                    Quy trình sản xuất áp dụng các công nghệ tiết kiệm năng lượng, tái sử dụng phụ phẩm nông nghiệp, hạn chế tối đa rác thải nhựa và phát thải CO₂, ra môi trường.
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </div>
    </section>
  )
}
export function CommunitySection() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const activeFarmer = isMobile ? farmerMobile : farmerDesktop;
  return (
    isMobile ? <MobileCard /> :
    <section className="pt-20 pb-5 bg-white">
        <div className={`max-w-7xl flex flex-col items-center mx-auto px-5 md:px-4 sm:px-6 lg:px-8`}>
          <div className="max-w-[732px]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[56px] text-center font-bold mb-4 font-alegreya-sans" style={{ color: "#0A5B89" }}> 
              Giá trị gửi trao đến cộng đồng
            </h2>
            <p className="max-w-[732px] text-[16px] sm:text-[16px] text-center text-gray-light mb-8 sm:mb-12 font-fz-poppins" style={{ color: "#667085" }}> 
              Thấu hiểu giá trị của đất lành, nước mát và bàn tay người lao động trong hành trình nuôi<br /> dưỡng hạt gạo Việt, Tư Trúc luôn đặt trọn tâm huyết vào việc bảo vệ hệ sinh thái canh tác,<br /> nâng cao giá trị nghề nông và cải thiện đời sống người lao động.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-6 sm:gap-8 mt-6 sm:mt-10"> 
            <div className="bg-[#F4F3EA] rounded-[16px] overflow-hidden relative w-full h-[500px] sm:h-[600px] lg:w-[495px] lg:h-[642px]"> 
              <Image
                src="/images/about/community_about_1.png"
                alt="Farmers_lar"
                fill
                className="object-cover"
                />
              <div className="relative z-10 py-5 sm:py-5 px-6 w-full pt-2"> 
                <div className="max-w-[194px] mb-6 sm:mb-4"> 
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>30</div> 
                  <p className="text-[16px] sm:text-[16px] font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Hộ nông dân địa phương đồng hành lâu dài
                  </p>
                </div>
                <div className="max-w-[194px] mb-6 sm:mb-8"> 
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>40</div> 
                  <p className="text-sm sm:text-base font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Công nhân có việc làm ổn định tại nhà máy
                  </p>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold font-alegreya-sans" style={{ color: "#6D9127" }}> 
                    <svg className="inline-block w-12 h-12 sm:w-12 sm:h-12 align-middle mr-1" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L19 13H5L12 6Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/> 
                    </svg>10%
                  </div> 
                  <p className="text-sm sm:text-base font-fz-poppins opacity-80" style={{ color: "#667085" }}> 
                    Thu nhập bình quân
                  </p>
                </div>
                <p className="text-sm sm:text-base mt-6 sm:mt-8 " style={{ color: "#667085" }}> 
                  Tư Trúc trực tiếp thu mua lúa từ hàng ngàn hộ nông dân, đảm bảo đầu ra ổn định, thu nhập bền vững.<br />Song song đó, thường hiệu chủ trong đào tạo, chuyển giao kỹ thuật và ứng dụng công nghệ cho đội ngũ công nhân bản địa, giúp người lao động nâng cao tay nghề, tiếp cận tri thức mới nhưng vẫn gìn giữ nghề lúa nước truyền thống.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className={`basis-[60%] flex flex-row gap-2 text-white w-full lg:w-[605px] h-auto lg:h-[311px]`}>
                <div className="w-1/2 bg-[#6D9127] rounded-[16px] px-4 sm:px-4 gap-6 overflow-hidden relative">
                  <Image
                      src={activeFarmer.src}
                      fill
                      alt="Farmers_lar"
                      className="object-cover"
                      />
                  <div className="relative py-5">
                    <div className="text-7xl sm:text-7xl font-[700] font-alegreya-sans"> <svg className="inline-block w-16 h-16 sm:w-16 sm:h-16 align-middle mr-1" viewBox="0 3 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Added stroke and stroke-width for border */}
                    <path d="M12 18L5 11H19L12 18Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>70%</div>
                    <p className="text-sm font-fz-poppins opacity-80"style={{ color: "#EFF0F2" }} >
                      lượng thuốc bảo <br /> vệ thực vật
                    </p>
                  </div>
                </div>
                <div className="w-1/2 bg-[#F4F3EA] rounded-[16px] px-4 sm:px-8 flex flex-col justify-around">
                  <div>
                    <div className="text-7xl sm:text-7xl md:text-7xl font-bold  font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>100 ha</div> {/* Adjusted font sizes */}
                    <p className="text-xs sm:text-sm text-gray-700 font-fz-poppins" style={{ color: "#7D8493" }}> {/* Adjusted font sizes */}
                      ha diện tích canh tác không hóa chất độc hại
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-fz-poppins mt-4" style={{ color: "#7D8493" }}> {/* Adjusted font sizes and margin-top */}
                    Tư Trúc kiên trì mô hình canh tác sạch, không hóa chất độc hại, giúp giảm lượng thuốc bảo vệ thực vật đáng kể, giúp bảo vệ được sức khỏe đất đai, người trồng và mang đến những mùa vụ gạo sạch, an toàn.
                  </p>
                </div>
              </div>
               <div className="basis-[40%] rounded-[16px] px-6 sm:px-10 py-2 relative overflow-hidden bg-cover bg-center w-full lg:w-[605px] h-auto lg:h-[311px]">
                <Image
                  src="/images/about/community_about_3.png"
                  alt="Environment"
                  fill
                  className="object-cover rounded-[16px]"
                />
                <div className="relative z-10 text-white">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 font-alegreya-sans">100%</div> 
                  <p className="text-sm sm:text-sm text-white font-fz-poppins opacity-80" style={{color:"#EFF0F2"}}> 
                    Phụ phẩm tái chế phục vụ chăn nuôi & <br /> canh tác bền vững
                  </p>
                  <p className="max-w-[345px] text-xs sm:text-sm mt-4 text-white font-fz-poppins" style={{color:"#EFF0F2"}}> 
                    Quy trình sản xuất áp dụng các công nghệ tiết kiệm năng lượng, tái sử dụng phụ phẩm nông nghiệp, hạn chế tối đa rác thải nhựa và phát thải CO₂, ra môi trường.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
