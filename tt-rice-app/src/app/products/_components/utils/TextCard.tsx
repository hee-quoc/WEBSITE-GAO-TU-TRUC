import React, { useCallback } from "react";
import { type TextFieldProps ,type TextCardObjectProps} from "./types";
import { type ProductForm } from "../AddProductPage";

export function TextCard({ title, value, field, onUpdateField }: TextFieldProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateField?.(field as keyof ProductForm, e.target.value);
    },
    [onUpdateField, field]
  );

  return (
    <div>
      {title && <label className="mb-1 block text-sm font-medium">{title}</label>}
      <input
        value={(value as string) ?? ""}
        onChange={handleInputChange}
        placeholder="Nhập tiêu đề cho phần này..."
        className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}

export function TextCardObject({  
  section,
  title,
  value,
  field,
  index,
  onChange }: TextCardObjectProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // onUpdateField?.(field as keyof ProductForm, e.target.value);
      onChange(section as keyof ProductForm, field as string, index ?? 0, e.target.value);
    },
    [onChange, section ,field,index]
  );

  return (
    <div>
      {title && <label className="mb-1 block text-sm font-medium">{title}</label>}
      <input
        value={(value as string) ?? ""}
        onChange={handleInputChange}
        placeholder="Nhập tiêu đề cho phần này..."
        className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
      />
    </div>
  );
}