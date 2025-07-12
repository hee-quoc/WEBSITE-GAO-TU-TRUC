
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface RiceCardProps {
  image: string;
  hoverImage: string;
  label: string;
  slug: string;
}

const RiceCard: React.FC<RiceCardProps> = ({ image, hoverImage, label, slug }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
    useEffect(() => {
      if (isClicked) {
        // 1. Set a timer for 5000 milliseconds (5 seconds).
        const timerId = setTimeout(() => {
          // 2. After 5 seconds, set 'isClicked' back to false.
          setIsClicked(false);
          console.log("Card re-enabled.");
        }, 5000);
        return () => {
          clearTimeout(timerId);
        };
      }
    }, [isClicked]);
    const handleClick = () => {
      if (isClicked) {
        console.log('Action is temporarily disabled.');
        return;
      }
  
      setIsClicked(true);
      window.location.href = `/products?tag=${slug}`;
    };
  return (
    <div
      className="w-full sm:w-[274px] h-auto pt-5 pb-5 flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="w-full sm:w-[274px] h-[274px] flex items-center justify-center">
        <Image
          src={isHovered ? hoverImage : image}
          alt={label}
          width={274}
          height={342}
          className="object-contain"
        /> 
      </div> 
      <p
        className="w-full sm:w-[274px] h-[28px] text-[20px] sm:text-[20px] font-medium leading-[140%] text-center font-alegreya-sans" style={{color: "#415717"}}
      >
        {label}
      </p>
    </div>
  );
};

export default RiceCard;