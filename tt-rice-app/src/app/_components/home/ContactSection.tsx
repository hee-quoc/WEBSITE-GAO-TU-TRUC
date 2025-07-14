"use client";

import Image from "next/image";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import React, { useState } from "react";
import type { ContactFormData } from "~/app/types/Types";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("Liên hệ đặt hàng & tư vấn từ website");
    const body = encodeURIComponent(
      `Họ và tên: ${formData.name}\nEmail: ${formData.email}\nĐiện thoại: ${formData.phone}\nGhi chú: ${formData.message}`
    );

    window.location.href = `mailto:contact@tutruc.com?subject=${subject}&body=${body}`;

    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row px-4 sm:px-6 lg:px-0 gap-8">
        {/* Left Box - Form */}
        <div className="w-full lg:w-1/2 pl-[110px]">
          <h2 className="text-[48px] leading-tight font-bold text-blue-dark mb-12"
            style={{ color: "#0A5B89" }} 
          >
            Liên hệ <br /> đặt hàng & tư vấn
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-[492px]">
            <Input
              label="Họ và tên"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-[#D0D5DD]"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-[#D0D5DD]"
            />
            <Input
              label="Điện thoại"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-[#D0D5DD]"
            />
            <Textarea
              label="Ghi chú thêm"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="shadow-[0_1px_2px_rgba(16,24,40,0.05)] border border-[#D0D5DD]"
            />
            <Button
              type="submit"
              size="small"
              className="bg-green-normal hover:bg-green-dark text-white transition-all duration-300 rounded-full px-5 py-3.5"
            >
              <span className="flex items-center gap-2">
                Gửi Thông Tin
                <Image
                  src="/icon_wheat_white.svg"
                  alt="icon"
                  width={20}
                  height={20}
                />
              </span>
            </Button>
          </form>
        </div>

        {/* Right Box - Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center relative">
          <Image
            src="/Group 7.svg"
            alt="Contact Illustration"
            width={900}
            height={646}
            className="absolute top-[134px] right-[100px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
