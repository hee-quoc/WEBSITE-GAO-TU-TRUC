import React, {  useState } from "react";
import {
  Upload,
  X,
} from "lucide-react";

type Image = {
    file?: File | null; 
    preview?: string | null; 
    width?: number; 
    height?: number;
}


export function AddProductCard({
    type,
    field,
    onUpdate,
    onSetImageFile,
    }: {
        type:string,
        field: string | number | Image | Array<any>
        onUpdate: (value:string|number) => void;
        onSetImageFile: (f: File | null) => void;
    }
){
    const [inputKey, setInputKey] = useState<number>(Date.now()); // Unique key for resetting input
   return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
        {type === "image" && (
            <div className="flex flex-col gap-3 sm:flex-row">
            <div className="sm:w-1/2">
                <div
                className={`relative grid h-48 place-content-center rounded-xl border border-dashed ${(field as Image).preview ? "bg-gray-100" : "bg-white"}`
                }      
                style={{ height: (field as Image).height ? `${((field as Image).height / (field as Image).width!) * 100}%` : 'auto' }}
                >
                {(field as Image)?.preview ? (
                    <img src={(field as Image).preview} alt="block" className="h-full w-full rounded-xl object-contain" />
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
                    onChange={(e) => onSetImageFile(e.target.files?.[0] ?? null,)}
                    className="absolute inset-0 cursor-pointer opacity-0"
                />
                {block.image?.preview && (
                    <button
                    onClick={() => {onSetImageFile(null)
                        setInputKey(Date.now());}}
                    
                    className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
                    >
                    <X className="h-4 w-4" />
                    </button>
                )}
                </div>
            </div>
            </div>
        )}
      </div>
   )
}