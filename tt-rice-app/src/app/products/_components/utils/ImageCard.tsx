import React, { useState, useCallback } from "react";
import { Upload, X } from "lucide-react";
import { type ImageUploadFieldProps, type Image, type ProductForm } from "./types";


export function ImageCard({
  type,
  field,
  subField,
  value,
  index,
  form,
  setForm,
  onSetImageFile,
  onRemove
}: ImageUploadFieldProps) {
  const [inputKey, setInputKey] = useState<number>(Date.now());
  const image = value as Image;

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] ?? null;
      if (file && file.size > 5 * 1024 * 1024) {
        alert("Ảnh quá lớn (tối đa 5MB)");
        return;
      }
      onSetImageFile(index ?? null, file, field, subField);
    },
    [onSetImageFile, index]
  );

  
  const removeImage = (index: number | null, field: keyof ProductForm) => {
          setForm(prev => {
              const currentValue = prev[field];
  
              // Chỉ xử lý khi field là mảng
              if (Array.isArray(currentValue)) {
                  const updatedArray = currentValue.filter((_, i) => i !== index);
                  return { ...prev, [field]: updatedArray as ProductForm[keyof ProductForm] };
              }
  
              console.warn(`removeImage: Field "${String(field)}" không phải là mảng`);
              return prev;
          });
          console.log(form)
      };

  
  const handleRemoveBlock = useCallback(() =>{
    removeImage(index ?? null,field);
  },[removeImage,index])

  const handleRemove = useCallback(() => {
    onSetImageFile(index ?? null, null,field,subField);
    setInputKey(Date.now());
  }, [onSetImageFile,index]);

  const handleRemoveClick = useCallback(() => {
    if (index !== null) {
      onRemove(index);
    }
  }, [onRemove, index]);
  return (
    <div className={`flex flex-col mr-4 gap-3 sm:flex-row ${type === "image" ? "w-[400px]" : "w-[200px]"}`}>
      <div className="sm:w-full">
        <div
          className={`relative grid h-48 place-content-center rounded-xl border border-dashed ${
            image?.preview ? "bg-gray-100" : "bg-white"
          }`}
          style={
            image?.height && image?.width
              ? { height: `${(image.height / image.width) * 100}%` }
              : { height: "auto" }
          }
        >
          {image?.preview ? (
            <img
              src={image.preview}
              alt="block"
              className="h-full w-full rounded-xl object-contain"
            />
          ) : (
            <div className="place-content-center text-center text-gray-500 h-full">
              <Upload className="mx-auto mb-2 h-48 w-6" />
              {/* <p className="text-sm">Chọn ảnh cho block</p> */}
            </div>
          )}
          <input
            key={inputKey}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          
          {value && (value as Image).preview && (
            <button
              onClick={handleRemove}
              className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {(image?.preview || subField) ?  (
            <div></div>
           ):(
            <button
              onClick={handleRemoveClick}
              className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
           )} 
        </div>
      </div>
    </div>
  );
}