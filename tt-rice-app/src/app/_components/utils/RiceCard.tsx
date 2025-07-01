
"use client";
import React, { useState } from 'react';
import Image from 'next/image';

interface RiceCardProps {
  image: string;
  hoverImage: string;
  label: string;
}

const RiceCard: React.FC<RiceCardProps> = ({ image, hoverImage, label }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-[274px] h-[342px] pt-[20px] pb-[20px] flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[274px] h-[274px] flex items-center justify-center">
        <Image
          src={isHovered ? hoverImage : image}
          alt={label}
          width={200}
          height={250}
          className="object-contain"
        />
      </div>
      <p
        className="w-[274px] h-[28px] text-[20px] font-medium leading-[140%] text-center"
        style={{ fontFamily: 'Alegreya Sans, sans-serif' }}
      >
        {label}
      </p>
    </div>
  );
};

export default RiceCard;