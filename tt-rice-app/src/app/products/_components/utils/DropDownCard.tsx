import { type DropdownProps } from "./types";
import React, { useCallback } from "react";
import { type ProductForm } from "../AddProductPage";
export function Dropdown({
  title,
  field,
  options,
  value,
  index,
  onChange,
  disabled = false,
  placeholder = "chọn",
}: DropdownProps) {
     const handleSelectChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
          console.log(e.target.value)
          onChange?.(field as keyof ProductForm, e.target.value, index as number);
        },
        [onChange, field,index]
      );
  return (
    <div className="flex flex-col gap-1 w-[150px]">
      {title && <label className="text-sm font-medium text-gray-700">{title}</label>}
      <div className="relative">
        <select
          value={(value as string | number | string[]) ?? ""}
          onChange={handleSelectChange}
          disabled={disabled}
          className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Icon mũi tên */}
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
