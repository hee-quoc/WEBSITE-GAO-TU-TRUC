// components/ProductGallery.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define and export the data structure. This is a best practice.
export interface ProductImage {
  src: string;
  thumbnailSrc: string;
  alt: string;
}

export function ProductGallery({ images }: {images: string[]}) {
  // Gracefully handle cases where there are no images.
  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full rounded-lg bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No Images Available</p>
      </div>
    );
  }
  const productImages: ProductImage[] = images.map((image, index) => ({
    src: image,
    thumbnailSrc: image, 
    alt: `Product Image ${index + 1}`,
  }));
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          
          src={productImages[activeIndex] ? productImages[activeIndex].src : "" }
          alt={productImages[activeIndex] ? productImages[activeIndex].alt : "" }
          fill
          className="object-contain p-4 transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={true}
        />
      </div>
      <div className="mt-4 flex items-center  pl-5 pr-5 gap-2">
        <button
          onClick={handlePrev}
          className="w-9 h-9 bg-whisper-white border border-green-light rounded-full flex items-center justify-center shadow-lg hover:bg-green-light-active transition-colors"
        >
          <Image src="/img_arrowleft.svg" alt="Previous" width={16} height={16} />
        </button>

        {/* Thumbnail Images */}
        <div className="flex flex-1 items-center justify-center gap-2">
          {/* Map over the passed-in images prop */}
          {productImages.map((image, index) => (
            <button
              key={index} // Use a unique value like src for the key
              onClick={() => setActiveIndex(index)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all
                ${activeIndex === index ? 'border-green-600 shadow-md' : 'border-blue-50  hover:border-green-300'}
              `}
            >
              <Image
                // Use the `thumbnailSrc` for the thumbnail
                key={index}
                src={image.thumbnailSrc}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
        <button
          onClick={handleNext}
          className="w-9 h-9 bg-whisper-white border border-green-light rounded-full flex items-center justify-center shadow-lg hover:bg-green-light-active transition-colors"
        >
          <Image src="/img_arrowright.svg" alt="Next" width={16} height={16} />
        </button>
      </div>
    </div>
  );
}