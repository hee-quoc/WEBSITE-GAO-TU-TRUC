"use client";
import { useState } from "react";
import Image from "next/image";

type AccordionItem = {
  title: string;
  content: string;
};

export function ProductAccordion({ product }: { product: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // mở mặc định item đầu tiên

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="mt-10 space-y-2">
      
      
    </div>
  );
}