"use client"
import Image from "next/image"
import Button from "../ui/Button"
import Input from "../ui/Input"
import React, { useState } from 'react';
import type { ContactFormData } from "~/app/types/Types";
import Textarea from "../ui/Textarea";
export function ContactSection(){
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Handle form submission logic here
        alert('Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ lại sớm nhất.');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };
    return (
        <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold text-blue-dark mb-12 leading-tight">
                Liên hệ đặt hàng & tư vấn
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Họ và tên"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Điện thoại"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Textarea
                  label="Ghi chú thêm"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                />
                <Button type="submit" size="large">
                  Gửi Thông Tin
                </Button>
              </form>
            </div>
            <div className="relative">
              <div className="relative">
                <Image
                  src="/images/img_group_918.png"
                  alt="Contact Illustration"
                  width={813}
                  height={498}
                  className="w-full h-auto"
                />
                <div className="absolute top-0 right-0">
                  <Image
                    src="/images/img_gao_lai_sua_1.png"
                    alt="Rice Product"
                    width={240}
                    height={374}
                  />
                </div>
                <div className="absolute bottom-0 right-0">
                  <Image
                    src="/images/img_d744c6c61e_1.png"
                    alt="Rice Product"
                    width={257}
                    height={209}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}