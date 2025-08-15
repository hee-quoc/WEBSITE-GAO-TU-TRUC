import React from "react";
import { ArrayCardInput } from "../../utils/ArrayCardInput";
import { type ProductForm } from "../../utils/types";

interface GuideSectionProps {
  guide: ProductForm["guide"];
  handleNestedChange: (
    section: keyof ProductForm,
    field: string,
    index: number,
    value: string | number
  ) => void;
}

export function GuideSection({ guide, handleNestedChange }: GuideSectionProps) {
  return (
    <section className="flex flex-col items-center rounded-2xl border border-gray-300 shadow-sm bg-white p-6 my-4 shadow-sm w-full">
      <div className="text-[56px]">Hướng dẫn sử dụng</div>
      <div className="md:w-[1080px]">
        {[0, 1].map((stepIdx) => (
          <div key={stepIdx}>
            <div className="text-[20px] font-bold w-full px-4 mt-4">{`Bước ${stepIdx + 1}`}</div>
            <ArrayCardInput
              section="guide"
              field="step"
              value={guide.step[stepIdx]}
              title=""
              index={stepIdx}
              numericOnly={false}
              onChange={handleNestedChange}
            />
          </div>
        ))}
        <div className="flex flex-row">
          <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
            {guide.water.map((_, index) => (
              <div className="flex flex-row gap-2" key={index}>
                <span className="text-center">Lượng nước</span>
                <ArrayCardInput
                  section="guide"
                  field="water"
                  value={guide.water[index]}
                  title=""
                  index={index}
                  onChange={handleNestedChange}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
            {guide.rice.map((_, index) => (
              <div className="flex flex-row gap-2" key={index}>
                <span className="text-center">Cơm sau nấu</span>
                <ArrayCardInput
                  section="guide"
                  field="rice"
                  value={guide.rice[index]}
                  title=""
                  index={index}
                  numericOnly={false}
                  onChange={handleNestedChange}
                />
              </div>
            ))}
          </div>
          <div className="mx-auto max-w-5xl px-4 py-2 flex flex-col gap-4">
            {guide.finger.map((_, index) => (
              <div className="flex flex-row gap-2" key={index}>
                <span className="text-center">Tương đương <br />{"\"lóng tay\""}</span>
                <ArrayCardInput
                  section="guide"
                  field="finger"
                  value={guide.finger[index]}
                  title=""
                  index={index}
                  numericOnly={false}
                  onChange={handleNestedChange}
                />
              </div>
            ))}
          </div>
        </div>
        {[2, 3].map((stepIdx) => (
          <div key={stepIdx}>
            <div className="text-[20px] font-bold w-full px-4 mt-4">{`Bước ${stepIdx + 1}`}</div>
            <ArrayCardInput
              section="guide"
              field="step"
              value={guide.step[stepIdx]}
              title=""
              index={stepIdx}
              numericOnly={false}
              onChange={handleNestedChange}
            />
          </div>
        ))}
      </div>
    </section>
  );
}