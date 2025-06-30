'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '~/app/_components/ui/Button';

const Header: React.FC = () => {
  return (
    <header className="bg-green-lightest shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/header_logo.png"
                alt="Tu Truc Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="#about" className="text-dark-gray hover:text-green-primary transition-colors">
              Về chúng tôi
            </Link>
            <Link href="#products" className="text-dark-gray hover:text-green-primary transition-colors">
              Sản phẩm
            </Link>
            <Link href="#news" className="text-dark-gray hover:text-green-primary transition-colors">
              Tin tức
            </Link>
            <Link href="#contact" className="text-dark-gray hover:text-green-primary transition-colors">
              Liên hệ
            </Link>
          </nav>

          {/* Contact Button */}
          <div className="flex items-center">
            <Button variant="secondary" size="medium" className="flex items-center gap-2 border-green-normal">
              <span>Nhắn tin</span>
              <Image
                src="/img_icon_wheat.svg"
                alt="Wheat Icon"
                width={20}
                height={20}
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;