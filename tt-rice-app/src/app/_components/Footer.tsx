import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BookOpen, Phone, Mail } from 'lucide-react'; // Using lucide-react for icons

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

  return (
    // The main footer container with a relative position to place the wave image
    <footer className="relative bg-green-normal text-white pt-20 pb-10">
      
      {/* The decorative wavy top border */}
      <div className="absolute top-0 left-0 w-full h-auto">
        {/* We move it up by half its height to make it "bleed" off the top */}
        <Image
          src="/footer_header.svg"
          alt="Footer decoration"
          width={1440} 
          height={143}  
          className="w-full object-cover -translate-y-1/2"
        />
      </div>

      {/* Main content grid */}
      <div className="container mx-auto px-4 relative z-10">
        {/* We now define a 12-column grid on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-x-8 gap-y-12">

          {/* Column 1: Logo and Contact Info - Spans 3 of the 12 columns */}
          <div className="lg:col-span-2">
            <div className="flex flex-col items-start space-y-6">
              <Link href="/">
                <Image
                  src="/logo_white.svg"
                  alt="Tu Truc Logo"
                  width={150}
                  height={75}
                />
              </Link>
            </div>
          </div>

          {/* Column 2: Company Info - Spans 4 of the 12 columns */}
          <div className="lg:col-span-4">
            <h3 className="font-bold text-lg mb-6 font-alegreya-sans-sans-serif">Sản phẩm của công ty TNHH Tư Trúc</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0">{item.icon}</span>
                  <p className="text-sm">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Information Links - Spans 2 of the 12 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6 font-alegreya-sans-sans-serif">Thông tin</h3>
            <ul className="space-y-4">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support Links - Spans 3 of the 12 columns */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-6 font-alegreya-sans-sans-serif">Hỗ trợ</h3>
            <ul className="space-y-4">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:underline text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}