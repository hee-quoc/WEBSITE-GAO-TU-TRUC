import React from "react";
import { TextCard } from "../../utils/TextCard";
import { Dropdown, MultiSelectDropdown } from "../../utils/DropDownCard";
import { type ProductForm } from "../../utils/types";

interface ProductInfoSectionProps {
  form: ProductForm;
  riceTypeOptions: { label: string; value: string }[];
  scoreOptions: { label: string; value: string }[];
  onChange: (key: keyof ProductForm, value: any) => void;
  onArrayChange: (key: keyof ProductForm, index: number, value: any) => void;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
}

export function ProductInfoSection({
  form,
  riceTypeOptions,
  scoreOptions,
  onChange,
  onArrayChange,
  setForm,
}: ProductInfoSectionProps) {
  return (
    <section>
      <div className="flex flex-row w-full">
        <div className="w-2/3">
          <div className="text-[20px] font-bold w-full px-4">Tên sản phẩm</div>
          <TextCard
            field="title"
            value={form.title}
            title=""
            onUpdateField={onChange}
          />
        </div>
        <div className="px-12">
          <div className="text-[20px] font-bold w-full px-4">Loại gạo</div>
          <MultiSelectDropdown
            field="tag"
            options={riceTypeOptions}
            value={form.tag}
            setForm={setForm}
            placeholder="Loại gạo"
          />
        </div>
        <div className="px-4">
          <div className="text-[20px] font-bold w-full px-4">Giá</div>
          <TextCard
            field="price"
            value={form.price}
            title=""
            onUpdateField={onChange}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="text-[20px] font-bold w-full px-4">Mô tả về gạo</div>
        <TextCard
          field="description"
          value={form.description}
          title=""
          isArea={true}
          onUpdateField={onChange}
        />
      </div>
      <div className="w-full">
        <div className="text-[20px] font-bold w-full px-4">Chi tiết sản phẩm</div>
        <TextCard
          field="detail"
          value={form.detail}
          title=""
          isArea={true}
          onUpdateField={onChange}
        />
      </div>
      <div className="text-[20px] font-bold w-full px-4">Đặc tính sản phẩm</div>
      <div className="w-full flex justify-around rounded-2xl border border-gray-300 shadow-sm bg-white p-4 m">
        {["Độ thơm", "Độ dẻo", "Độ mềm", "Độ nở"].map((label, idx) => (
          <div className="flex" key={label}>
            <div className="text-[20px] font-bold w-full px-2">{label}</div>
            <Dropdown
              field="properties"
              options={scoreOptions}
              index={idx}
              value={form.properties[idx]}
              onChange={(field, value, index?: number) =>
                onArrayChange(field, Number(value), index)
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}