// ProductFeatures.tsx
"use client";
//import { useMediaQuery } from "~/app/hooks/useMediaQuery";
import Image from "next/image";

const StarRating = ({ rating, totalStars = 5 }: { rating: number; totalStars?: number }) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalStars }, (_, i) => {
        const starNumber = i + 1;
        return (
          <Image
            key={starNumber}
            src={
              starNumber <= rating
                ? "/images/products/icon_star.svg"
                : "/images/products/icon_gray_star.svg"
            }
            alt={starNumber <= rating ? "Full star" : "Empty star"}
            width={24}
            height={24}
          />
        );
      })}
    </div>
  );
};

export function ProductFeatures({ features }: { features: number[] }) {
  const featureLabels = [
    { label: "Độ thơm", rating: features[0] ?? 0 },
    { label: "Độ dẻo", rating: features[1] ?? 0 },
    { label: "Độ mềm", rating: features[2] ?? 0 },
    { label: "Độ nở", rating: features[3] ?? 0 },
  ];
  //const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section className="bg-[url('/images/products/img_features_background.svg')] rounded-xl shadow overflow-hidden mt-12 bg-no-repeat bg-right-bottom bg-contain mb-8">
      <h2 className="text-white text-center py-3 text-xl font-alegreya-sans bg-[#6C9126]">
        Đặc tính sản phẩm
      </h2>
      <div className="pl-7 pr-8 pt-4 pb-4 md:pr-7">
        
        <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] items-center">
          <div className="grid gap-1">
            {featureLabels.map((feature) => (
              <div
                key={feature.label}
                className="flex justify-between items-center"
              >
                <span className="text-[20px] font-medium text-blue-800">
                  {feature.label}
                </span>
                <StarRating rating={feature.rating} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}