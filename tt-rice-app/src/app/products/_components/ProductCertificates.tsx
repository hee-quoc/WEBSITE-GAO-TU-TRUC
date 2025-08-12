// src/app/products/_components/ProductCertificates.tsx
"use client";
import Image from "next/image";

export function ProductCertificates() {
  return (
    <section className="rounded-lg shadow overflow-hidden mt-12 mb-8">
      <h2 className="text-white text-center py-3 text-xl font-alegreya-sans bg-[#6C9126]">
        Chứng nhận quốc tế
      </h2>

      <div className="p-6">
        {/* Hình ảnh 2 chứng nhận */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <Image
            src="/certificate/image 23.svg" // bạn đổi lại đúng đường dẫn ảnh
            alt="OCOP Certificate"
            width={195}
            height={279}
            className="object-contain"
          />
          <Image
            src="/certificate/image 24.svg" // bạn đổi lại đúng đường dẫn ảnh
            alt="ISO Certificate"
            width={199}
            height={280}
            className="object-contain"
          />
        </div>

        {/* Phần mô tả chứng nhận */}
        <div className="mt-6 space-y-4 text-[20px] text-[#334155] font-alegreya-sans font-medium">
          <div>
            <p className="font-alegreya-sans font-medium text-[20px]">ISO (2025)</p>
            <p className="font-fz-poppins text-[16px]">
              Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu
              (Thực phẩm không biến đổi gen)
            </p>
          </div>
          <div>
            <p className="font-alegreya-sans font-medium text-[20px]">OCCP (2023)</p>
            <p className="font-fz-poppins text-[16px]">
              Gạo đạt chứng nhận sản phẩm không chứa Gluten, an toàn thực phẩm Châu Âu
              (Thực phẩm không biến đổi gen)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}