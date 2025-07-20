"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '../hooks/useMediaQuery';
export default function Footer() {
  const contactInfo = [
    {
      icon: <Image
          src="/map.svg"
          alt="Map decoration"
          width={20} 
          height={20} 
        />,
      text: 'Đường số 14, Xã Hoà Long, Thành phố Bà Rịa, Tỉnh Bà Rịa Vũng Tàu',
    },
    { icon: <Image
          src="/google_map.svg"
          alt="Google Map decoration"
          width={20} 
          height={20}  
        />, text: 'Tìm đường Google map' },
    { icon: <Image
          src="/Phone.svg"
          alt="Phone decoration"
          width={20} 
          height={20}  
        />, text: '0963719942 - 0983826158' },
    { icon: <Image
          src="/phone_ring.svg"
          alt="Phone ring decoration"
          width={20} 
          height={20}   
        />, text: '0773.81.86.88' },
    { icon: <Image
          src="/mail.svg"
          alt="Mail decoration"
          width={20} 
          height={20}  
        />, text: 'Contact@tutruc.com' },
  ];

  const infoLinks = [
    { href: '/privacy-policy', label: 'Chính sách bảo mật' },
    { href: '/payment-methods', label: 'Hình thức thanh toán' },
    { href: '/warranty-policy', label: 'Chính sách bảo hành' },
    { href: '/return-policy', label: 'Chính sách đổi trả dịch vụ' },
    { href: '/terms-of-service', label: 'Điều khoản & điều kiện sử dụng' },
  ];

  const supportLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/about', label: 'Giới thiệu công ty' },
    { href: '/products', label: 'Sản phẩm' },
    { href: '/contact', label: 'Liên hệ' },
    { href: '/news', label: 'Tin tức' },
  ];
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <footer className="relative text-white ">
        <div className="">
          {isMobile ?
          <Image
            src="/images/footer/img_mobile_footer_decorate.svg"
            alt="Footer decoration"
            width={1440} 
            height={143}  
            className="w-full"
          /> : <Image
            src="/footer_header.svg"
            alt="Footer decoration"
            width={1440} 
            height={143}  
            className="w-full"
          />}
          
        </div>
        <div className='bg-green-normal pb-10 border-bg-green-normal'>
          <div className="container m-auto px-4 relative z-10  ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-x-8 gap-y-12">
              <div className="lg:col-span-2">
                <div className="flex flex-col items-start space-y-6">
                  {isMobile ? <Link href="/">
                    <Image
                      src="/images/footer/icon_logo_mobile.svg"
                      alt="Tu Truc Logo"
                      width={180}
                      height={48}
                    />
                  </Link>: <Link href="/">
                    <Image
                      src="/logo_white.svg"
                      alt="Tu Truc Logo"
                      width={150}
                      height={75}
                    />
                  </Link>}
                  
                </div>
              </div>
              <div className="lg:col-span-4">
                <h3 className="font-alegreya-sans font-bold text-[20px] md:text-[24px] mb-6 font-alegreya-sans-sans-serif">Sản phẩm của công ty TNHH Tư Trúc</h3>
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="font-fz-poppins flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0">{item.icon}</span>
                      <p className="text-[14px] md:text-[16px]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="flex flex-row md:flex-row gap-8">
                  <div className="lg:col-span-2 flex-1">
                    <h3 className="font-alegreya-sans font-bold text-[20px] md:text-[24px] mb-6 font-alegreya-sans-sans-serif">Thông tin</h3>
                    <ul className="space-y-4">
                      {infoLinks.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className=" font-fz-poppins hover:underline text-[14px] md:text-[16px]">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-2 flex-1 text-white">
                    <h3 className="font-alegreya-sans font-bold text-[20px] md:text-[24px] mb-6 font-alegreya-sans-sans-serif">Hỗ trợ</h3>
                    <ul className="space-y-4">
                      {supportLinks.map((link) => (
                        <li key={link.href}>
                          <Link href={link.href} className="font-fz-poppins hover:underline text-[14px] md:text-[16px]">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        
    </footer>
  );
}