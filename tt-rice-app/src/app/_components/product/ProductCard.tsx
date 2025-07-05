import { useMemo } from 'react';
import type { Product } from '@prisma/client';
import Image from 'next/image';
// Define a more specific type for the props we expect.
// The 'imageData' from a serialized Prisma 'Bytes' field is not a true Buffer on the client.
// It's an object with a 'data' array. We must handle this structure.
interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // useMemo will create the Data URL only when the product image data changes.
  // This is an important optimization to prevent re-calculating on every render.
  const imageUrl = useMemo(() => {
    // 1. Guard against missing image data or type information.
    if (!product.imageData || !product.imageType) {
      console.error("data null");
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
    <div className="flex flex-col items-center gap-4 h-[378px]">
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
        <div className="flex h-48 w-full items-center justify-center rounded-md bg-gray-200">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h3 className="text-[20px] text-center font-medium text-steel-blue">{product.name}</h3>
    </div>
  );
}