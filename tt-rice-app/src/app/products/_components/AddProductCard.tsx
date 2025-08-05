import React, {  useState , useCallback} from "react";
import {
  Upload,
  X,
} from "lucide-react";

import { type Image, type ProductForm, type Guide } from "./AddProductPage"; // Assuming Image type is defined in AddProductPage

interface AddProductCardProps {
  type: 'image' | 'text' | 'number' | 'array'; // mở rộng thêm các type khác nếu cần
  field: string | number | Image | unknown[];
  title?: string; // Tiêu đề hiển thị cho trường này
  index?: number | null; // Chỉ sử dụng khi type là 'image'
  onUpdateField?: (field: keyof ProductForm,value: string | number | unknown[]) => void;
  onSetImageFile: (index:number | null, f: File | null) => void;
  handlePropertiesChange: (key: keyof Guide, index: number, value: number) => void;
  disabled?: boolean;
  error?: string;
}

export function AddProductCard({
    type,
    field,
    title,
    index,
    onUpdateField,
    onSetImageFile,
    handlePropertiesChange,
    }: AddProductCardProps
){
    const [inputKey, setInputKey] = useState<number>(Date.now()); // Unique key for resetting input
    // Validate file (ví dụ: chỉ nhận ảnh < 5MB)
    const handleFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > 5 * 1024 * 1024) {
            alert('Ảnh quá lớn (tối đa 5MB)');
            return;
        }
        onSetImageFile(index ?? null, file);
        },
        [onSetImageFile]
    );

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onUpdateField?.(field as keyof ProductForm, e.target.value);
        },
        [onUpdateField]
    )
    
    const handleNumberArrayChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e.target.value);
            if (/^\d*$/.test(e.target.value)) {
                handlePropertiesChange?.(field as keyof Guide, index ?? 0 , value);
            }   
        },
        [handlePropertiesChange]
    )

    const handleRemove = useCallback(() => {
        onSetImageFile(null, null);
        setInputKey(Date.now());
    }, [onSetImageFile]);


    const image = field as Image;
    const text = field as string;
    const value = field as string | number;
   return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm mx-4">
        {type === "image" && (
            <div className="flex flex-col gap-3 sm:flex-row w-[400px] ">
                <div className="sm:w-full">
                    <div
                    className={`relative grid h-48 place-content-center rounded-xl border border-dashed ${ image?.preview ? "bg-gray-100" : "bg-white"}`
                    }      
                    style={
                        image?.height && image?.width
                            ? { height: `${((image.height / image.width) * 100)}%` }
                            : { height: 'auto' }
                    }
                    >
                    {image?.preview ? (
                        <img
                            src={image.preview}
                            alt="block"
                            className="h-full w-full rounded-xl object-contain"
                        />
                    ) : (
                        <div className="place-content-center text-center text-gray-500 h-48">
                        <Upload className="mx-auto mb-2 h-6 w-6" />
                        <p className="text-sm">Chọn ảnh cho block</p>
                        </div>
                    )}
                    <input
                        key={inputKey} // Use key to force re-render
                        type="file"
                        accept="image/*"
                        onChange= {handleFileChange}
                        className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    {field && (field as Image).preview && (
                        <button
                        onClick= {handleRemove}
                        className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
                        >
                        <X className="h-4 w-4" />
                        </button>
                    )}
                    </div>
                </div>
            </div>
        )}
        {type === "text" && (
            <div>
                <label className="mb-1 block text-sm font-medium">{title}</label>
                <input
                    value={text ?? ""}
                    onChange={(e) =>
                        handleInputChange(e)
                    }
              placeholder="Nhập tiêu đề cho phần này..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
            </div>
        )}
        {type === 'array' && (
            <div>
                <label className="mb-1 block text-sm font-medium">{title}</label>
                <input
                    type="text"
                    id="numberInput"
                    value= {0}
                    onChange={handleNumberArrayChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Chỉ nhập số..."
                />
            </div>
        )}
      </div>
   )
}