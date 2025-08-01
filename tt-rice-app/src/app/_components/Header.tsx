'use client';

import React, { useState, useEffect,useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '~/app/_components/ui/Button';
import { Menu, X } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { usePathname } from 'next/navigation';

const mobileLogo ={alt:"Tu Truc mobile logo", width: 64, height: 35}
const desktopLogo = { alt: 'Tu Truc logo', width: 150, height: 40}
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const lastScrollY = useRef(0); 
  const pathname = usePathname();
  const isProductsPage = pathname === '/products';
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current ||currentScrollY ===0 ) {
        setIsScrollingUp(false);
      } 
      else {
        setIsScrollingUp(true);
      }
      lastScrollY.current = currentScrollY;
    };
    const handleClick = (e: MouseEvent) => {
      const menu = document.getElementById('mobile-menu');
      if (menu && !menu.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isMenuOpen]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const isMobile = useMediaQuery('(max-width: 767px)');
    const activeLogo = isMobile ? mobileLogo : desktopLogo;
    const logoSrc = isMobile ? '/icon_logo_mobile.svg' : '/logo_header.svg';
  return isProductsPage? (<ProductHeader
      isScrollingUp={isScrollingUp}
      isMenuOpen={isMenuOpen}
      toggleMenu={toggleMenu}
      activeLogo={activeLogo}
      isMobile={isMobile}
    />):(
    <header
      className={`
         top-0 z-50 w-full ease-in-out  fixed ${isScrollingUp ? 'bg-green-50 shadow-sm' : ''}
      `}
    >
      <div className="max-w-8xl mx-auto"> 
        <div className="flex justify-between items-center h-18">
          <div className="flex-shrink-0 pl-10 lg:pl-[159px]">
            <Link href="/">
              <Image
                src={logoSrc}
                alt={activeLogo.alt}
                width={activeLogo.width}
                height={activeLogo.height}
                className="h-10 w-auto"
              />
            </Link>
          </div>
        
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-dark-gray hover:text-green-normal transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/products" className="text-dark-gray hover:text-green-normal transition-colors">
              Sản phẩm
            </Link>
            <Link href="#news" className="text-dark-gray hover:text-green-normal transition-colors">
              Tin tức
            </Link>
            <Link href="#contact" className="text-dark-gray hover:text-green-normal transition-colors">
              Liên hệ
            </Link>
            {/* <Link href="/login" className="text-dark-gray hover:text-green-normal transition-colors">
              Đăng nhập
            </Link> */}
          </nav>
          <div className="md:hidden flex items-center pr-4 ">
            <button onClick={toggleMenu} className="text-dark-gray focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center lg:pr-[159px] ">
            <Button
              variant="secondary"
              size="medium"
              className=" group flex items-center gap-2 border-green-normal rounded-full text-green-normal hover:bg-green-dark hover:text-white "
            >
              <span>Liên hệ</span>
              <Image 
                src="/img_icon_wheat.svg" 
                alt="Wheat Icon" 
                width={20} 
                height={20} 
                className="block group-hover:hidden" // Show by default, hide on hover
              />

              {/* Hover Icon: Hidden by default, visible when the group is hovered */}
              <Image 
                src="/icon_wheat_white.svg" // The new white icon
                alt="Wheat Icon Hover" 
                width={20} 
                height={20} 
                className="hidden group-hover:block" // Hide by default, show on hover
              />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div id="mobile-menu" className={`md:hidden ${isScrollingUp ? 'bg-green-50 shadow-sm' : 'bg-green-50'} shadow-md`}>
            <nav className="flex flex-col space-y-4 px-4 py-4 items-center">
              <Link
                href="/about"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Về chúng tôi
              </Link>
              <Link
                href="/products"
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
              {/* <Link
                href="/login"
                className="text-dark-gray hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Đăng nhập
              </Link> */}
              <Button
                variant="secondary"
                size="medium"
                className="w-[121px] h-[48px] group flex items-center gap-2 border-green-normal rounded-full text-green-normal hover:bg-green-dark hover:text-white"
              >
                <span className='flex-shrink-0'>Liên hệ</span>
                <Image 
                  src="/img_icon_wheat.svg" 
                  alt="Wheat Icon" 
                  width={20} 
                  height={20} 
                  className="block group-hover:hidden" 
                />
                <Image 
                  src="/icon_wheat_white.svg" // The new white icon
                  alt="Wheat Icon Hover" 
                  width={20} 
                  height={20} 
                  className="hidden group-hover:block" // Hide by default, show on hover
                />
              </Button>
              
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
function ProductHeader({
  isScrollingUp,
  isMenuOpen,
  toggleMenu,
  activeLogo,
  isMobile
}: {
  isScrollingUp: boolean;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  activeLogo: { alt: string; width: number; height: number };
  isMobile: boolean;
}) {
  return (
    <header
      className={`
        top-0 z-50 w-full fixed
        ${isScrollingUp ? 'shadow-sm' : ''}
      `}
    >
      <div className="max-w-8xl mx-auto">
        <div className="flex justify-between items-center h-18">
          <div className="flex-shrink-0 pl-10 lg:pl-[159px]">
            <Link href="/">
              <Image
                src={`${isMobile ? '/logo_white.svg' : '/icon/logo_white_desktop.svg'}`}
                alt={activeLogo.alt}
                width={activeLogo.width}
                height={activeLogo.height}
                className="h-10 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-white hover:text-green-normal transition-colors">
              Về chúng tôi
            </Link>
            <Link href="/products" className="text-white hover:text-green-normal transition-colors">
              Sản phẩm
            </Link>
            <Link href="#news" className="text-white hover:text-green-normal transition-colors">
              Tin tức
            </Link>
            <Link href="#contact" className="text-white hover:text-green-normal transition-colors">
              Liên hệ
            </Link>
          </nav>
          <div className="md:hidden flex items-center pr-4">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className="hidden md:flex items-center lg:pr-[159px]">
            <Button
              variant="secondary"
              size="medium"
              className="group flex items-center gap-2 border-green-normal rounded-full text-green-normal hover:bg-green-dark hover:text-white"
            >
              <span>Liên hệ</span>
              <Image
                src="/img_icon_wheat.svg"
                alt="Wheat Icon"
                width={20}
                height={20}
                className="block group-hover:hidden"
              />
              <Image
                src="/icon_wheat_white.svg"
                alt="Wheat Icon Hover"
                width={20}
                height={20}
                className="hidden group-hover:block"
              />
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div id="mobile-menu" className={`md:hidden bg-green-50 shadow-md`}>
            <nav className="flex flex-col space-y-4 px-4 py-4 items-center">
              <Link
                href="/about"
                className="text-black hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Về chúng tôi
              </Link>
              <Link
                href="/products"
                className="text-black hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Sản phẩm
              </Link>
              <Link
                href="#news"
                className="text-black hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Tin tức
              </Link>
              <Link
                href="#contact"
                className="text-black hover:text-green-normal transition-colors"
                onClick={toggleMenu}
              >
                Liên hệ
              </Link>
              <Button
                variant="secondary"
                size="medium"
                className="w-[121px] h-[48px] group flex items-center gap-2 border-green-normal rounded-full text-green-normal hover:bg-green-dark hover:text-white"
              >
                <span className="flex-shrink-0">Liên hệ</span>
                <Image
                  src="/img_icon_wheat.svg"
                  alt="Wheat Icon"
                  width={20}
                  height={20}
                  className="block group-hover:hidden"
                />
                <Image
                  src="/icon_wheat_white.svg"
                  alt="Wheat Icon Hover"
                  width={20}
                  height={20}
                  className="hidden group-hover:block"
                />
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;