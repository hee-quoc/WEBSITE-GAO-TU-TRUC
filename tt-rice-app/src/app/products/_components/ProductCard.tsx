import { useMemo, useState, useEffect } from 'react';
import type { Product } from '@prisma/client';
import Image from 'next/image';
// Define a more specific type for the props we expect.
// The 'imageData' from a serialized Prisma 'Bytes' field is not a true Buffer on the client.
// It's an object with a 'data' array. We must handle this structure.
function toSlug(str: string): string {
  if (!str) {
    return '';
  }

  // 1. Convert to lower case
  let slug = str.toLowerCase();

  // 2. & 3. Decompose and remove diacritics
  // 'NFD' separates combined characters into the base character and the accent
  // /[\u0300-\u036f]/g matches all combining diacritical marks
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // 4. Handle the Vietnamese letter 'đ'
  slug = slug.replace(/đ/g, 'd');

  // 5. Replace spaces and consecutive spaces with a single hyphen
  slug = slug.replace(/\s+/g, '-');

  // 6. Remove all non-alphanumeric characters except the hyphen
  slug = slug.replace(/[^a-z0-9-]/g, '');

  // 7. Collapse consecutive hyphens
  slug = slug.replace(/-+/g, '-');

  // 8. Trim leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    // We only want to set a timer if the card has been clicked.
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
    // 2. If already clicked, do nothing.
    if (isClicked) {
      console.log('Action is temporarily disabled.');
      return;
    }

    // 3. Set state to true to begin the "disabled" period
    setIsClicked(true);

    // 4. Perform the navigation
    window.location.href = `/products/${toSlug(product.name)}`;

    // 5. Set a timer to re-enable the click after 5 seconds
    // Note: Since navigation happens immediately, the user won't see this.
    // This pattern is more visibly useful for actions that DON'T navigate away,
    // like adding to a cart. But the logic is sound.
  };
  const imageUrl = useMemo(() => {
    // 1. Guard against missing image data or type information.
    if (!product.imageData || !product.imageType) {
      return null;
    }

    // 2. Ensure we are actually working with a Uint8Array before proceeding.
    if (!(product.imageData instanceof Uint8Array)) {
      console.error("Product imageData is not a Uint8Array for product:", product.name);
      return null;
    }

    try {
      // 3. Convert the Uint8Array to a Base64 string.
      // The Buffer.from() method is the most robust way to handle this conversion.
      const base64String = Buffer.from(product.imageData).toString('base64');
      
      // 4. Construct the complete Data URL.
      return `data:${product.imageType};base64,${base64String}`;
    } catch (error) {
      console.error("Failed to construct image data URL for product:", product.name, error);
      return null;
    }
  }, [product.imageData, product.imageType, product.name]);

  return (
    <div className="flex flex-col items-center gap-4 md:h-[378px] md:w-[278] hover:scale-110" key={product.name} onClick={handleClick}>
      {imageUrl ? (
        // Use a standard <img> tag with the Data URL as its source.
        <Image
          src={imageUrl}
          alt={product.name}
          width={278} // Setting dimensions is good for layout stability
          height={302}
          className="h-auto w-full rounded-md object-cover"
          loading="lazy" // Crucial for performance with many images
        />
      ) : (
        // Fallback UI if there is no image
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={278} // Setting dimensions is good for layout stability
          height={302}
          className="h-auto w-full rounded-md object-cover"
          loading="lazy" // Crucial for performance with many images
        />
      )}
      <h3 className="text-[20px] text-center font-medium text-steel-blue pb-1 hover:underline font-fz-poppins">{product.name}</h3>
    </div>
  );
}