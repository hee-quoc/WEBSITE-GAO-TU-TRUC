"use client";
import Image from "next/image";
import { type ProductWithDetails } from "~/app/types/Types";

import { useState, useLayoutEffect, useRef } from 'react';

// Define types for our border positions for clarity
interface HorizontalBorder {
  top: number;
  width: number;
}
interface VerticalBorder {
  left: number;
  height: number;
}

export default function RiceTable({ guide }: { guide: ProductWithDetails["guide"]}) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);

  // State to store the calculated positions of our border lines
  const [horizontalBorders, setHorizontalBorders] = useState<HorizontalBorder[]>([]);
  const [verticalBorders, setVerticalBorders] = useState<VerticalBorder[]>([]);

  useLayoutEffect(() => {
    const calculateBorders = () => {
      const container = containerRef.current;
      const table = tableRef.current;
      const thead = theadRef.current;

      if (!container || !table || !thead) return;

      const containerRect = container.getBoundingClientRect();
      const tableRect = table.getBoundingClientRect();
      // --- Calculate Horizontal Borders ---
      const newHorizontalBorders: HorizontalBorder[] = [];
      newHorizontalBorders.push({
        top: 0, // Positioned at the very top of the container
        width: tableRect.width,
      });
      const tableRows = Array.from(table.querySelectorAll('tbody > tr'));
      const allRows = [thead, ...tableRows];

      // Create a border below every row except the last one
      allRows.forEach(row => {
        const rowRect = row.getBoundingClientRect();
        newHorizontalBorders.push({
          top: rowRect.bottom - containerRect.top, // Position from container's top
          width: rowRect.width,
        });
      });
      setHorizontalBorders(newHorizontalBorders);
      const newVerticalBorders: VerticalBorder[] = [];
      const firstRowCells = Array.from(thead.querySelectorAll('th'));
      firstRowCells.slice(0, -1).forEach(cell => {
        const cellRect = cell.getBoundingClientRect();
        newVerticalBorders.push({
          left: cellRect.right - containerRect.left, // Position from container's left
          height: table.offsetHeight,
        });
      });
      setVerticalBorders(newVerticalBorders);
    };
    calculateBorders();
    const resizeObserver = new ResizeObserver(calculateBorders);
    if (tableRef.current) {
        resizeObserver.observe(tableRef.current);
    }

    // Cleanup observer on component unmount
    return () => resizeObserver.disconnect();
  }, [guide]); // Rerun if data changes

  if(!guide){
    return <></>;
  }
  return (
    <div className="w-full p-4">
      <div ref={containerRef} className="relative mx-auto max-w-[500px]">
        <table ref={tableRef} className="w-full min-w-[300px] border-collapse text-center">
          <thead ref={theadRef} className="text-[16px] font-bold font-fz-poppins text-[#628423]">
            <tr>
              <th className="px-3 py-2">Lượng nước (chén)</th>
              <th className="px-3 py-2">Cơm sau nấu</th>
              <th className="px-3 py-2">Tương đương “lóng tay”</th>
            </tr>
          </thead>
          <tbody className="font-fz-poppins text-[14px] text-[#5C6578]">
            {guide.water.map((w: number, j: number) => (
              <tr key={j}>
                <td className="px-11 pt-3 pb-7 align-top">{w}</td>
                <td className="px-4 pt-3 pb-7 align-top">{guide.rice[j]}</td>
                <td className="px-6 pt-3 pb-7 align-top">{guide.finger[j]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pointer-events-none absolute inset-0 text-[#89A751]">
          {horizontalBorders.map((border, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 h-[2px] bg-[image:var(--tapered-border-h)] bg-[length:100%_100%]"
              style={{ top: border.top, width: border.width }}
            />
          ))}
          {verticalBorders.map((border, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 w-[2px] bg-[image:var(--tapered-border-v)] bg-[length:100%_100%]"
              style={{ left: border.left, height: border.height }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export function ProductUsageGuide({ guide }: { guide: ProductWithDetails["guide"]}) {
  return guide ? (
    <section className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-white text-center py-3 text-xl font-alegreya-sans bg-[#6C9126]">
        Hướng dẫn sử dụng
      </h2>

      <div className="p-6 space-y-6">
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
                <RiceTable guide={guide} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  ): (<></>);
}