
"use client"; // This component might have client-side interactions (like links)

import Image from 'next/image';
import Link from 'next/link'; // Using Link for proper navigation

// Define a type for our social links for better organization
type SocialLink = {
  href: string;
  alt: string;
  iconSrc: string;
  iconWidth: string;
  iconHeight: string;
  bgColorClass: string; // To handle different background colors
};

// Array of social links data
const socialLinks: SocialLink[] = [
  { href: 'https://nhamaygaotutruc.com/contact', alt: 'Facebook', iconHeight:"h-[45px]",iconWidth:"w-[45px]",iconSrc: 'https://tutruc-images.s3.ap-southeast-2.amazonaws.com/icon/icon_mail.svg', bgColorClass: 'bg-green-light-1' },
  { href: 'https://zalo.me/0963719942', alt: 'Phone', iconHeight:"h-[45px]",iconWidth:"w-[45px]",iconSrc: '/icon_phone.svg', bgColorClass: 'bg-green-light-1' },
  { href: 'https://www.facebook.com/share/17KxH1a2YL/?mibextid=wwXIfr', alt: 'Messenger',iconHeight:"h-[45px]",iconWidth:"w-[45px]", iconSrc: '/icon_messenger.svg', bgColorClass: 'bg-green-light-1' },
  { href: 'https://zalo.me/0963719942', alt: 'Zalo',iconHeight:"h-[45px]",iconWidth:"w-[45px]", iconSrc: '/images/home/icon_zalo.svg', bgColorClass: 'bg-primary' },
];

/**
 * A reusable component for a single social icon link.
 * This creates the "circle inside a rectangle" effect.
 */
function SocialIcon({ link }: { link: SocialLink }) {
  return (
    <Link href={link.href} target="_blank" rel="noopener noreferrer">
      <div className="group h-[45px] w-[45px] bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110">
        
        <div className={`absolute ${link.iconHeight} ${link.iconWidth} ${link.bgColorClass} center-0 rounded-full overflow-hidden`}>
          <Image
            src={link.iconSrc}
            alt={link.alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

// ... (FloatingSocialLinks main component remains the same) ...
export function FloatingSocialLinks() {
  return (
    <div className="fixed right-4 md:right-8 bottom-8 flex flex-col gap-4 z-50">
      {socialLinks.map((link) => (
        <SocialIcon key={link.alt} link={link} />
      ))}
    </div>
  );
}