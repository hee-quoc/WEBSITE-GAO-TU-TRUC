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
    alert("Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại sớm nhất.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section className="w-full h-[797px] bg-white relative overflow-hidden py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
          {/* Left: Form block */}
          <div className="top-[96px] right-[788px] w-[492px] h-[594px]">
            <h2 className="text-[48px] leading-tight font-bold text-blue-dark mb-12">
              Liên hệ <br /> đặt hàng & tư vấn
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Right: Decorative images */}
          <div className="relative w-full h-full">
            <Image
              src="/Group 918.svg"
              alt="Contact Illustration"
              width={850}
              height={498}
              className="absolute top-[183px] left-[-103px] h-auto"
            />
            <Image
              src="/Frame 327.svg"
              alt="Rice Product"
              width={550}
              height={605}
              className="absolute top-[96px] right-[60px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
