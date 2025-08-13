import React, { useCallback } from "react";
import { type TextAreaFieldProps } from "./types";
import { type ProductForm } from "../AddProductPage";

export function TextAreaCard({ value, field, onUpdateField }: TextAreaFieldProps) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdateField?.(field as keyof ProductForm, e.target.value);
    },
    [onUpdateField, field]
  );

  return (
    <textarea
      value={(value as string) ?? ""}
      onChange={handleInputChange}
      placeholder="Hãy viết gì đó..."
      className="h-40 w-full rounded-xl border bg-gray-50 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-black/10"
    />
  );
}