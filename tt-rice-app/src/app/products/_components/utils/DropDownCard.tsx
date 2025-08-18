"use client";
import { type DropdownProps , type MultiSelectDropdownProps, type ProductForm } from "./types";
import React, { useCallback , useRef, useState, useEffect} from "react";


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
          onChange(field as keyof ProductForm, e.target.value, index!);
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


export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  title,
  field,
  options,
  value,
  placeholder = "",
  disabled = false,
  setForm
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) setOpen((prev:boolean) => !prev);
  };

  // const handleMultiTagChange = (field: keyof ProductForm, newTags: string[]) => {
  //         setForm(prev => ({
  //             ...prev,
  //             [field]: newTags
  //         }));
  //         };

  const handleOptionChange = useCallback(
    (optionValue: string) => {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      setForm(prev => ({
          ...prev,
          [field]: newValue
      }));
    },
    [value, setForm, field]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-[200px] relative" ref={dropdownRef}>
      {title && <label className="text-sm font-medium text-gray-700">{title}</label>}
      <div
        className={`w-full rounded-lg border px-4 py-2 bg-white text-sm shadow-sm cursor-pointer ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
        onClick={handleToggle}
      >
        {value.length > 0 ? options.filter(o => value.includes(o.value)).map(o => o.label).join(", ") : placeholder}
      </div>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full rounded-lg border bg-white shadow-lg z-10 max-h-60 overflow-y-auto">
          {options.map(opt => (
            <label key={opt.value} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(opt.value)}
                onChange={() => handleOptionChange(opt.value)}
                className="mr-2"
              />
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
