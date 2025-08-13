import React, { useCallback } from "react";
import { type TextFieldProps ,type TextCardObjectProps, type ProductForm} from "./types";

export function TextCard({ title, value, field, isArea = false, onUpdateField }: TextFieldProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onUpdateField?.(field as keyof ProductForm, e.target.value);
    },
    [onUpdateField, field]
  );

  return (
    <div>
      {title && <label className="mb-1 block text-sm font-medium">{title}</label>}
      {!isArea ? (
      <input
        value={(value as string) ?? ""}
        onChange={handleInputChange}
        placeholder="Nhập tiêu đề cho phần này..."
        className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />) : (
        <textarea
          value={(value as string | number) ?? ""}
          onChange={handleInputChange}
          placeholder="Hãy viết gì đó..."
          className="h-40 w-full rounded-xl border bg-gray-50 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-black/10"
        />
      )}
    </div>
  );
}

export function TextCardObject({  
  section,
  title,
  value,
  field,
  index,
  isArea,
  onChange }: TextCardObjectProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // onUpdateField?.(field as keyof ProductForm, e.target.value);
      onChange(section as keyof ProductForm, field as string, index ?? 0, e.target.value);
    },
    [onChange, section ,field,index]
  );

  return (
    <div>
      {title && <label className="mb-1 block text-sm font-medium">{title}</label>}
      {!isArea ? (
      <input
        value={(value as string) ?? ""}
        onChange={handleInputChange}
        placeholder="Nhập tiêu đề cho phần này..."
        className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />) : (
        <textarea
            value={(value as string | number) ?? ""}
            onChange={handleInputChange}
            placeholder="Hãy viết gì đó..."
            className="h-40 w-full rounded-xl border bg-gray-50 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
      )}
    </div>
  );
}