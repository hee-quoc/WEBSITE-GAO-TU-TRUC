import React from "react";
import { ImageCard } from "../../utils/ImageCard";
import { TextCardObject } from "../../utils/TextCard";
import { X } from "lucide-react";
import { type ProductForm, type Image } from "../../utils/types";

interface CertificateSectionProps {
  certificates: ProductForm["certificates"];
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  setImageFile: (
    indexImage: number | null,
    fileOrUndefined: File | null | undefined,
    field: keyof ProductForm,
    subField?: string
  ) => void;
  handleArrayObjectFieldChange:(
    section: keyof ProductForm,
    field: string,
    index: number,
    value: string
  ) => void;
  onRemove: (index: number | undefined) => void; 
}

interface ProductCertImageSectionProps {
  images: Image[];
  onAdd: () => void;
  onSetImageFile: (index: number, file: File | null) => void;
  onRemove: (index: number | undefined) => void; 
}

export function CertificateSection({
  certificates,
  setForm,
  setImageFile,
//   handleFieldChange,
  handleArrayObjectFieldChange,
  onRemove
}: CertificateSectionProps) {
  return (
    <section>
      <div className="text-[20px] font-bold w-full px-4 mt-5">Chứng nhận quốc tế</div>
      <div className="w-full space-y-4 flex flex-row overflow-x-auto">
        {certificates.map((cer, idx) => (
          <div
            key={idx}
            className="items-center relative rounded-2xl border border-gray-300 shadow-sm bg-white p-6 m-4 shadow-sm"
          >
            <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh chứng nhận</div>
            <ImageCard
              field="certificates"
              subField="image"
              type="image"
              value={cer.image}
              index={idx}
              onSetImageFile={setImageFile}
              setForm={setForm}
              form={{} as ProductForm}
              onRemove={onRemove}
            />
            <div className="text-[20px] font-bold w-full px-4 mt-5">Tên chứng nhận</div>
            <TextCardObject
              section="certificates"
              field="name"
              value={cer.name}
              index={idx}
              title=""
              isArea={false}
              onChange={handleArrayObjectFieldChange}
            />
            <div className="text-[20px] font-bold w-full px-4 mt-5">Chi tiết chứng nhận</div>
            <TextCardObject
              section="certificates"
              field="description"
              value={cer.description}
              index={idx}
              title=""
              isArea={false}
              onChange={handleArrayObjectFieldChange}
            />
            <button
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  certificates: prev.certificates.filter((_, i) => i !== idx),
                }))
              }
              className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="pb-6 pt-2">
          <button
            type="button"
            className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition h-full"
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                certificates: [
                  ...prev.certificates,
                  {
                    name: "",
                    image: { file: null, preview: null, width: undefined, height: undefined },
                    description: "",
                  },
                ],
              }))
            }
          >
            <span>+ Thêm chứng nhận</span>
          </button>
        </div>
      </div>
    </section>
  );
}

export function ProductCertImageSection({
  images,
  onAdd,
  onSetImageFile,
  onRemove
}: ProductCertImageSectionProps) {
  return (
    <section>
      <div className="text-[20px] font-bold w-full px-4 mt-5">Ảnh chứng nhận</div>
      <div className="w-full mt-5 space-y-4 flex flex-row overflow-x-auto">
        {images.map((img, idx) => (
          <div key={idx} className="flex-shrink-0">
            <ImageCard
              field="productCertImages"
              subField=""
              type="logo"
              value={img}
              index={idx}
              onSetImageFile={(i, file) => onSetImageFile(i!, file)}
              setForm={()=>{return}}
              form={{} as ProductForm}
              onRemove={onRemove}
            />
          </div>
        ))}
        <div className="pb-4">
          <button
            type="button"
            className="flex items-center flex-shrink-0 gap-2 rounded-lg border border-dashed border-gray-400 px-4 py-2 text-gray-700 hover:bg-gray-50 transition h-full"
            onClick={onAdd}
          >
            <span>+ Thêm ảnh chứng nhận</span>
          </button>
        </div>
      </div>
    </section>
  );
}