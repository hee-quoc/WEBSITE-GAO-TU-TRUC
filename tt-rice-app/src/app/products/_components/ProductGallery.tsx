"use client";
import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div>
      <Image src={mainImage} alt="Product image" width={500} height={500} className="rounded-md" />
      <div className="mt-4 flex gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => setMainImage(img)}>
            <Image src={img} alt="thumb" width={80} height={80} className="rounded-md border" />
          </button>
        ))}
      </div>
    </div>
  );
}
