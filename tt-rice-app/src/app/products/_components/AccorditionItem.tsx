// Helper component for individual accordion items
// It uses `children` to accept any kind of content (text, lists, etc.)
import Image from 'next/image';
export function AccordionItem({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Image
            src="/usageguide/Bullet point.svg"
            alt="Leaf Icon"
            width={20}
            height={20}
          />
          <span className="text-[#333842] font-alegreya-sans font-medium text-[20px]">
            {title}
          </span>
        </div>
        <Image
          src="/certificate/chevron-down.svg"
          alt="arrow"
          width={20}
          height={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pt-1 pb-4 font-fz-poppins font-medium text-[16px] leading-[1.4]">
          
          {children}
        </div>
      )}
    </div>
  );
}