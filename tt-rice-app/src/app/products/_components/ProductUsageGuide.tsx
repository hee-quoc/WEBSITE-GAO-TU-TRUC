"use client";
import Image from "next/image";

export function ProductUsageGuide({ guide }: { guide: any }) {
  return (
    <section className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-white text-center py-3 text-xl font-alegreya-sans bg-[#6C9126]">
        Hướng dẫn sử dụng
      </h2>

      <div className="p-6 space-y-6">
        {/* Các bước sử dụng */}
        {guide.step.map((s: string, i: number) => (
          <div key={i}>
            <div className="flex items-start gap-3">
              <Image
                src="/usageguide/Bullet point.svg"
                alt="icon step"
                width={24}
                height={24}
                className="mt-1"
              />
              <div>
                <p className="font-medium text-[#628423] text-[20px]">Bước {i + 1}</p>
                <p className="text-[#5C6578] font-fz-poppins text-[16px]">{s}</p>
              </div>
            </div>

            {/* Chèn bảng sau bước 2 */}
            {i === 1 && (
              <div className="flex flex-col md:flex-row items-start gap-6 mt-4">
                {/* Icon minh họa */}
                <div className="w-full md:w-auto flex-shrink-0">
                  <Image
                    src="/usageguide/Frame 1156.svg"
                    alt="icon bảng nước"
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                </div>

                {/* Bảng lượng nước */}
                <div className="w-full">
                  <div className="max-w-[500px] mx-auto">
                    <table className="w-full text-center min-w-[300px]">
                      <thead className="font-bold font-fz-poppins text-[#628423] text-[16px]">
                        <tr>
                          <th className="border-[1px] border-[#89A751] px-3 py-2">Lượng nước (chén)</th>
                          <th className="border-[1px] border-[#89A751] px-3 py-2">Cơm sau nấu</th>
                          <th className="border-[1px] border-[#89A751] px-3 py-2">Tương đương “lóng tay”</th>
                        </tr>
                      </thead>
                      <tbody className="font-fz-poppins text-[#5C6578] text-[14px]">
                        {guide.water.map((w: number, j: number) => (
                          <tr key={j}>
                            <td className="border-[1px] border-[#89A751] px-11 pt-3 pb-7 align-top">{w}</td>
                            <td className="border-[1px] border-[#89A751] px-4 pt-3 pb-7  align-top">{guide.rice[j]}</td>
                            <td className="border-[1px] border-[#89A751] px-6 pt-3 pb-7  align-top">{guide.finger[j]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}