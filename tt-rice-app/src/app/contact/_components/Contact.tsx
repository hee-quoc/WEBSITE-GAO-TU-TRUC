import React from "react";
import Button from "../../../app/_components/ui/Button";
import Image from 'next/image';

export function ContactPage() {
  return (
    <div className="flex flex-col">
      <div className=" bg-white px-4 py-30 md:px-16 lg:px-42 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Contact Form */}
        <div className="flex flex-col justify-center">
          <h2 className="text-[42px] md:text-[56px] font-[700] text-[#0A5B89] font-alegreya-sans mb-2">Liên hệ</h2>
          <p className="text-[28px] md:text-[32px] text-[#667085] font-[400] mb-4 font-alegreya-sans ">
            Bạn cần hỗ trợ? Hãy gửi thông tin cho <br className="hidden md:inline"/> chúng tôi
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block md:text-[400] md:text-[16px] text-[#344054] md:leading-[140%] font-fz-poppins ">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full md:h-[40px] rounded-md border border-[#D0D5DD] bg-white px-4 py-2 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block md:text-[400] md:text-[16px] text-[#344054] md:leading-[140%] font-fz-poppins">
                Điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full md:h-[40px] rounded-md border border-[#D0D5DD] bg-white px-4 py-2 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block md:text-[400] md:text-[16px] text-[#344054] md:leading-[140%] font-fz-poppins">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full md:h-[40px] rounded-md border border-[#D0D5DD] bg-white px-4 py-2 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block md:text-[400] md:text-[16px] text-[#344054] md:leading-[140%] font-fz-poppins">
                Ghi chú thêm
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full md:h-[91px] rounded-md border border-[#D0D5DD] bg-white px-4 py-2 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <Button
              size="large"
                className="w-[153px] h-[48px] bg-[#6C9126] text-[#FFFFFF] text-[16px] font-bold rounded-[32px] px-[20px] py-[14px] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] hover:bg-green-700 transition duration-300 flex flex-row"
              // onClick={}
            >
              <span className="pt-0.5 text-center font-alegreya-sans font-[700] text-[16px] leading-[100%] tracking-[0%] ">
                Gửi Thông Tin 
              </span>
              <Image src="/icontact_icon.svg" alt="contact" width={20} height={20}/>
            </Button>
          </form>
        </div>

        {/* Right Section - Google Map */}
        <div>
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/@10.5069778,107.2003944,13z?entry=ttu&g_ep=EgoyMDI1MDcyOS4wIKXMDSoASAFQAw%3D%3D"
            width="100%"
            height="100%"
            className="w-full h-[600px] rounded-lg shadow-lg"
            allowFullScreen
            loading="lazy"
          ></iframe>
          {/* <iframe src="https://www.google.com/maps/d/embed?mid=1vNR_YalR7weOV3JGtvNAF8plowitRZo&hl=vi&ehbc=2E312F" width="640" height="480"></iframe> */}
        </div>
      </div>
      {/* Company Info Footer */}
        <div className="mt-2 mb-40 bg-white md:px-16 lg:px-42 ">
          <div className="md:h-[284px]  relative border rounded-[12px] border-transparent bg-[#f9fff5]">
            <div className="md:h-[84px]    flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-start md:justify-between md:w-full px-8 md:px-24 mt-4">
                <div className="flex flex-col items-start  md:w-1/2">
                  <h2 className="text-[#6C9126] font-[500] text-[36px] md:text-[56px] mb-2 font-alegreya-sans">Chúng tôi ở đây</h2>
                </div>

                <div className="w-full md:w-1/2 md:mt-4 md:pl-6">
                  <h4 className="text-[20px] md:text-[20px] font-[500] font-alegreya-sans leading-[120%] text-[#545C6D]">Công ty TNHH Tư Trúc</h4>

                  <div className="flex items-start mt-2">
                    <Image src="/map_pin_area.svg" alt="address contact" width={24} height={30} className="mr-2"/>
                    <p className="text-[16px] md:text-[16px] font-[400] leading-[140%] font-fz-poppins text-[#545C6D]">Đường số 14, Ấp Bắc 2, Hòa Long, Bà <br className="hidden md:inline"/> Rịa - Vũng Tàu</p>
                  </div>

                  <div className="flex items-center mt-2 ">
                    <Image src="/telephone_icon.svg" alt="telephone contact" width={18.75} height={18.75} className="mr-2"/>
                    <p className="text-[16px] md:text-[16px] font-[400] leading-[140%] text-[#545C6D] font-fz-poppins  tracking-[0px] ">0963719942 - 0983826158</p>
                  </div>

                  <div className="flex items-center mt-2">
                    <Image src="/telephone_hostline_icon.svg" alt="telephone hostline contact" width={18.75} height={18.75} className="mr-2"/>
                    <p className="text-[16px] md:text-[16px] font-[400] leading-[140%] text-[#545C6D] font-fz-poppins   tracking-[0px] ">0773.81.86.88</p>
                  </div>

                  <div className="flex items-center mt-2">
                    <Image src="/mail_contact.svg" alt="mail contact" width={18.75} height={18.75} className="mr-2"/>
                    <p className="text-[16px] md:text-[16px] font-[400] leading-[140%] text-[#545C6D] font-fz-poppins  tracking-[0px]  ">Contact@tutruc.com</p>
                  </div>
                </div>
              </div>
            </div>
      {/* style={{ backgroundImage: 'url("/contact_bg.svg")',}} */}
            <div className="h-[200px] md:h-[200px] bg-[#f9fff5] bg-cover bg-center rounded-md" > 
                <Image src="/contact_bg.svg" alt="glass background"  width={18.75} height={18.75} className="hidden md:block w-full border rounded-[12px]"/>
                <Image src="/contact_bg_mobile.svg" alt="glass background"  width={18.75} height={18.75} className="md:hidden w-full border rounded-[12px]"/>
            </div>
          </div>
        </div>
    </div>
  )
}