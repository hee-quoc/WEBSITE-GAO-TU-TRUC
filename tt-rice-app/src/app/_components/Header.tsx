'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '~/app/_components/ui/Button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`
        sticky top-0 z-50 w-full 
        transition-colors duration-300 ease-in-out 
        ${isScrolled ? 'bg-white shadow-sm' : 'bg-green-lightest'} 
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo_header.svg"
                alt="Tu Truc Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-dark-gray hover:text-green-normal transition-colors">
              Về chúng tôi
            </Link>
            <Link href="#products" className="text-dark-gray hover:text-green-normal transition-colors">
              Sản phẩm
            </Link>
            <Link href="#news" className="text-dark-gray hover:text-green-normal transition-colors">
              Tin tức
            </Link>
            <Link href="#contact" className="text-dark-gray hover:text-green-normal transition-colors">
              Liên hệ
            </Link>
          </nav>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-dark-gray focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center">
            <Button
              variant="secondary"
              size="medium"
              className="flex items-center gap-2 border-green-normal rounded-full text-green-normal"
            >
              <span>Liên hệ</span>
              <Image src="/img_icon_wheat.svg" alt="Wheat Icon" width={20} height={20} />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className={`md:hidden ${isScrolled ? 'bg-white shadow-sm' : 'bg-green-lightest'} shadow-md`}>
            <nav className="flex flex-col space-y-4 px-4 py-4">
              <Link
                href="#about"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Về chúng tôi
              </Link>
              <Link
                href="#products"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Sản phẩm
              </Link>
              <Link
                href="#news"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Tin tức
              </Link>
              <Link
                href="#contact"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Liên hệ
              </Link>
              <Button
                variant="secondary"
                size="medium"
                className="flex items-center gap-2 border-green-normal rounded-full w-fit text-green-normal"
                onClick={toggleMenu}
              >
                <span>Liên hệ</span>
                <Image src="/img_icon_wheat.svg" alt="Wheat Icon" width={20} height={20} />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;