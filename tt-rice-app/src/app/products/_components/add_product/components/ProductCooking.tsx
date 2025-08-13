import React from "react";
import { ArrayCardInput } from "../../utils/ArrayCardInput";
import { TextCardObject } from "../../utils/TextCard";
import { type ProductForm } from "../../utils/types";

interface CookingSectionProps {
  cooking: ProductForm["cooking"];
  showStep: boolean;
  setForm: React.Dispatch<React.SetStateAction<ProductForm>>;
  handleNestedArrayFieldChange: (
    section: keyof ProductForm,
    field: string,
    index: number,
    value?: any
  ) => void;
  handleNestedFieldChange: (
    section: keyof ProductForm,
    field: string,
    value: any
  ) => void;
}

export function CookingSection({
  cooking,
  showStep,
  setForm,
  handleNestedArrayFieldChange,
  handleNestedFieldChange,
}: CookingSectionProps) {
  return (
    <section className="w-full mb-5">
      <div className="text-[20px] font-bold w-full px-4">Quy trình chế biến và bảo quản</div>
      <div className="mb-2 text-sm text-gray-600 px-4">Mô tả cách chế biến và bảo quản</div>
      {showStep && (
        <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  cooking: {
                    ...prev.cooking,
                    step: [...prev.cooking.step, ""],
                  },
                }))
              }
              className="mt-2 ml-4 flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Thêm bước
            </button>
          </div>
          <div className="space-y-3">
            {cooking.step.map((_, index) => (
              <div key={index} className="flex w-full items-center gap-3">
                <div className="w-3/4">
                  <ArrayCardInput
                    section="cooking"
                    field="step"
                    value={cooking.step[index]}
                    title=""
                    index={index}
                    numericOnly={false}
                    onChange={handleNestedArrayFieldChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      cooking: {
                        ...prev.cooking,
                        step: prev.cooking.step.filter((_, i) => i !== index),
                      },
                    }))
                  }
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-100 hover:bg-red-200 text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.166L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .563c.34-.059.68-.114 1.022-.165m0 0L5.84 19.673a2.25 2.25 0 002.244 2.077h7.832a2.25 2.25 0 002.244-2.077L19.228 5.79m-14.456 0a48.11 48.11 0 013.478-.397m4.5 0v-.916c0-1.18.91-2.164 2.09-2.2a51.964 51.964 0 013.32 0c1.18.036 2.09 1.02 2.09 2.2v.916"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="my-2">
        <TextCardObject
          section="cooking"
          field="description"
          value={cooking.description}
          title=""
          index={null}
          isArea={true}
          onChange={(section, field, index, value) => handleNestedFieldChange(section, field, value)}
        />
      </div>
    </section>
  );
}