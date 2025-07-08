"use client";

import Image from "next/image";
import React from "react";

export function CommunitySection() {
  return (
    <section className="pt-20 pb-5 bg-white">
        <div className="max-w-7xl flex flex-col items-center mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[732px]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[56px] text-center font-bold mb-4  font-alegreya-sans" style={{ color: "#0A5B89" }}> {/* Adjusted font sizes for better responsiveness */}
              Giá trị gửi trao đến cộng đồng
            </h2>
            <p className="max-w-[732px] text-[16px] sm:text-[16px] text-center text-gray-light mb-8 sm:mb-12 font-fz-poppins" style={{ color: "#667085" }}> {/* Adjusted font sizes and margin */}
              Thấu hiểu giá trị của đất lành, nước mát và bàn tay người lao động trong hành trình nuôi<br /> dưỡng hạt gạo Việt, Tư Trúc luôn đặt trọn tâm huyết vào việc bảo vệ hệ sinh thái canh tác,<br /> nâng cao giá trị nghề nông và cải thiện đời sống người lao động.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-6 sm:gap-8 mt-6 sm:mt-10"> {/* Adjusted gap and margin-top */}
            {/* Left Statistics - Image with text overlay */}
            <div className="bg-[#F4F3EA] rounded-[16px] overflow-hidden relative w-full h-[500px] sm:h-[600px] lg:w-[495px] lg:h-[642px] flex items-end"> {/* Adjusted height for smaller screens */}
              <Image
                src="/community_about_1.png"
                alt="Farmers_lar"
                fill
                className="object-cover"
                />
              <div className="relative z-10 p-6 sm:p-10 w-full pt-10"> {/* Removed bg-gradient-to-t and text-white */}
                <div className="max-w-[194px] mb-6 sm:mb-4"> {/* Adjusted margin-bottom */}
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>30</div> {/* Changed text color to #6D9127 */}
                  <p className="text-[16px] sm:text-[16px] font-fz-poppins opacity-80" style={{ color: "#667085" }}> {/* Changed text color to #667085 */}
                    Hộ nông dân địa phương đồng hành lâu dài
                  </p>
                </div>
                <div className="max-w-[194px] mb-6 sm:mb-8"> {/* Adjusted margin-bottom */}
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>40</div> {/* Changed text color to #6D9127 */}
                  <p className="text-sm sm:text-base font-fz-poppins opacity-80" style={{ color: "#667085" }}> {/* Changed text color to #667085 */}
                    Công nhân có việc làm ổn định tại nhà máy
                  </p>
                </div>
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 font-alegreya-sans" style={{ color: "#6D9127" }}> 
                    <svg className="inline-block w-12 h-12 sm:w-12 sm:h-12 align-middle mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6L19 13H5L12 6Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/> {/* Triangle up icon */}
                    </svg>10%
                  </div> {/* Changed text color to #6D9127 */}
                  <p className="text-sm sm:text-base font-fz-poppins opacity-80" style={{ color: "#667085" }}> {/* Changed text color to #667085 */}
                    Thu nhập bình quân
                  </p>
                </div>
                <p className="text-sm sm:text-base mt-6 sm:mt-8 " style={{ color: "#667085" }}> {/* Changed text color to #667085 */}
                  Tư Trúc trực tiếp thu mua lúa từ hàng ngàn hộ nông dân, đảm bảo đầu ra ổn định, thu nhập bền vững.<br />Song song đó, thường hiệu chủ trong đào tạo, chuyển giao kỹ thuật và ứng dụng công nghệ cho đội ngũ công nhân bản địa, giúp người lao động nâng cao tay nghề, tiếp cận tri thức mới nhưng vẫn gìn giữ nghề lúa nước truyền thống.
                </p>
              </div>
            </div>

            {/* Right Statistics */}
            <div className="flex flex-col gap-8 w-full">
              {/* >100 & 70% rounded-[16px] px-6 sm:px-10 py-[37px]*/}
              <div className="basis-[60%] flex flex-row gap-4 text-white w-full lg:w-[605px] h-auto lg:h-[311px]">
                <div className="w-1/2 bg-[#6D9127] rounded-[16px] px-6 sm:px-10 gap-6 overflow-hidden relative">
                  <Image
                      src="/community_about_2.png"
                      alt="Farmers_lar"
                      fill
                      className="object-cover"
                      />
                  <div className="relative py-6">
                    <div className="text-6xl sm:text-6xl font-bold mb-4 font-alegreya-sans"> <svg className="inline-block w-12 h-12 sm:w-12 sm:h-12 align-middle mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Added stroke and stroke-width for border */}
                    <path d="M12 18L5 11H19L12 18Z" fill="#FFB000" stroke="#FFB000" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>70%</div>
                    <p className="text-sm text-green-lightest-1 font-fz-poppins opacity-80"style={{ color: "#EFF0F2" }} >
                      lượng thuốc bảo <br /> vệ thực vật
                    </p>
                  </div>
                </div>
                <div className="w-1/2 bg-[#F4F3EA] rounded-[16px] px-4 sm:px-8 flex flex-col justify-around">
                  <div>
                    <div className="text-6xl sm:text-6xl md:text-6xl font-bold  font-alegreya-sans" style={{ color: "#6D9127" }}><span style={{ color: "#FFB000" }}>&gt;</span>100 ha</div> {/* Adjusted font sizes */}
                    <p className="text-xs sm:text-sm text-gray-700 font-fz-poppins" style={{ color: "#7D8493" }}> {/* Adjusted font sizes */}
                      ha diện tích canh tác không hóa chất độc hại
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-fz-poppins mt-4" style={{ color: "#7D8493" }}> {/* Adjusted font sizes and margin-top */}
                    Tư Trúc kiên trì mô hình canh tác sạch, không hóa chất độc hại, giúp giảm lượng thuốc bảo vệ thực vật đáng kể, giúp bảo vệ được sức khỏe đất đai, người trồng và mang đến những mùa vụ gạo sạch, an toàn.
                  </p>
                </div>
              </div>

              {/* 100% */}
              <div className="basis-[40%] rounded-[16px] px-6 sm:px-10 py-2 relative overflow-hidden bg-cover bg-center w-full lg:w-[605px] h-auto lg:h-[311px]">
                <Image
                  src="/community_about_3.png"
                  alt="Environment"
                  fill
                  className="object-cover rounded-[16px]"
                />
                <div className="relative z-10 text-white">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 font-alegreya-sans">100%</div> {/* Adjusted font sizes */}
                  <p className="text-sm sm:text-sm text-white font-fz-poppins opacity-80" style={{color:"#EFF0F2"}}> {/* Adjusted font sizes */}
                    Phụ phẩm tái chế phục vụ chăn nuôi & <br /> canh tác bền vững
                  </p>
                  <p className="max-w-[345px] text-xs sm:text-sm mt-4 text-white font-fz-poppins" style={{color:"#EFF0F2"}}> {/* Adjusted font sizes and margin-top */}
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
