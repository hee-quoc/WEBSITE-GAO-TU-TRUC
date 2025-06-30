
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Image
                src="/favicon.ico"
                alt="Tu Truc Logo"
                width={154}
                height={84}
                className="mb-4"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">Sản phẩm của công ty TNHH Tư Trúc</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Image src="/favicon.ico" alt="Location" width={24} height={24} />
                <span className="text-green-bg">Đường số 14, Xã Hoà Long, Thành phố Bà Rịa, Tỉnh Bà Rịa Vũng Tàu</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/favicon.ico" alt="Map" width={24} height={24} />
                <span className="text-green-bg">Tìm đường Google map</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/favicon.ico" alt="Phone" width={24} height={24} />
                <span className="text-green-bg">0963719942 - 0983826158</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/favicon.ico" alt="Phone" width={24} height={24} />
                <span className="text-green-bg">0773.81.86.88</span>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/favicon.ico" alt="Email" width={24} height={24} />
                <span className="text-green-bg">Contact@tutruc.com</span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-xl font-bold mb-4">Thông tin</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Hình thức thanh toán
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Chính sách bảo hành
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Chính sách đổi trả dịch vụ
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Điều khoản & điều kiến sử dụng
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hỗ trợ</h3>
            <div className="space-y-3">
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Trang chủ
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Giới thiệu công ty
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Sản phẩm
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Liên hệ
              </Link>
              <Link href="#" className="block text-green-bg hover:text-white transition-colors">
                Tin tức
              </Link>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-end">
          <Image
            src="/favicon.ico"
            alt="Social Media Icons"
            width={48}
            height={48}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;