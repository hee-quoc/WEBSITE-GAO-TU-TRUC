import React, { useCallback } from "react";
import { type NumberArrayFieldProps, type ProductForm } from "./types";

interface ExtendedNumberArrayFieldProps extends NumberArrayFieldProps {
  numericOnly?: boolean; // true = chỉ cho phép số, false = cho phép cả text và số
  isArea?: boolean;
}

export function ArrayCardInput({
    section,
  title,
  value,
  field,
  index,
  onChange,
  numericOnly = true, // mặc định là chỉ cho nhập số
  isArea = false,
}: ExtendedNumberArrayFieldProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

     if (numericOnly) {
      // Chỉ cho phép số nguyên hoặc số thập phân (dấu chấm hoặc dấu phẩy)
      if (!/^\d*(\.|,)?\d*$/.test(inputValue)) return;

      // Chuyển dấu phẩy thành dấu chấm
      const normalizedValue = inputValue.replace(",", ".");

      // Nếu người dùng đang nhập dang dở số thập phân ("1." hoặc "1,")
      if (/^\d+(\.|,)$/.test(inputValue) || normalizedValue === ".") {
        onChange(section as keyof ProductForm, field as string, index ?? 0, normalizedValue);
      } else {
        // Chuyển thành số nếu hợp lệ, hoặc giữ nguyên nếu rỗng
        const numValue = normalizedValue === "" ? "" : parseFloat(normalizedValue);
        onChange(section as keyof ProductForm, field as string, index ?? 0, numValue);
      }
    } else {
      // Cho phép mọi ký tự
      onChange(section as keyof ProductForm, field as string, index ?? 0, inputValue);
    }
    },
    [numericOnly, onChange, field, index]
  );

  return (
    <div>
      {title && <label className="mb-1 block text-sm font-medium">{title}</label>}
      {!isArea && (
        <input
        type="text"
        value={(value as string | number) ?? ""}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={numericOnly ? "Chỉ nhập số..." : "Nhập chữ hoặc số..."}
      />
      )}
      {isArea && (
        <textarea
            value={(value as string | number) ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={numericOnly ? "Chỉ nhập số..." : "Nhập chữ hoặc số..."}
      />
      )}
    </div>
  );
}