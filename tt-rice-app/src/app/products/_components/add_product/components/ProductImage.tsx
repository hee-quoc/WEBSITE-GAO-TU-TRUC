import { ImageCard } from "../../utils/ImageCard";
import { type ImageType } from "../../utils/types";

interface ProductImageSectionProps {
  images: ImageType[];
  onAdd: () => void;
  onSetImageFile: (index: number, file: File | null ) => void;
  onRemove: (index: number | undefined) => void; 
}

export function ProductImageSection({ images, onAdd, onSetImageFile, onRemove }: ProductImageSectionProps) {
  
  return (
    <section>
      <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh sản phẩm</div>
      <div className="w-full mt-5 flex flex-row overflow-x-auto">
        {images.map((img, idx) => (
          <div key={idx} className="flex-shrink-0">
            <ImageCard
              field="productImages"
              subField=""
              type="image"
              value={img}
              index={idx}
              onSetImageFile={(i, file) => onSetImageFile(i!, file)}
              onRemove={onRemove}
            />
          </div>
        ))}
        <button
          type="button"
          className="flex items-center flex-shrink-0 gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition"
          onClick={onAdd}
        >
          <span>+ Thêm ảnh sản phẩm</span>
        </button>
      </div>
    </section>
  );
}