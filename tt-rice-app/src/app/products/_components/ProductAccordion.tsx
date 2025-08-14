"use client";
import { useState } from "react";
import Image from "next/image";
import { type ProductWithDetails } from "~/app/types/Types";
import { AccordionItem } from "./AccorditionItem";
// (Paste the AccordionItem helper component from Step 1 here)
// ...

export function ProductAccordion({ product }: { product: ProductWithDetails}) {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set([0]));

  const handleToggle = (index: number) => {
    
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const Divider = () => (
    <Image
      src="/certificate/Line.svg"
      alt="divider"
      width={600}
      height={10}
      className="mx-auto my-2" // Added vertical margin
    />
  );

  return (
    <div className="mt-10 space-y-2">
      {/* --- Item 1: Quy cách đóng gói --- */}
      {product.package && (
        <AccordionItem
          title="Quy cách đóng gói"
          isOpen={openSet.has(0)}
          onToggle={() => handleToggle(0)}
        >
          <p className="text-blue-500">{product.package}</p>
        </AccordionItem>
      )}

      {/* --- Item 2: Thành phần --- */}
      {product.parts && (
        <>
          <Divider />
          <AccordionItem
            title="Thành phần"
            isOpen={openSet.has(1)}
            onToggle={() => handleToggle(1)}
          >
            <p className="text-blue-500">{product.parts}</p>
          </AccordionItem>
        </>
      )}
      
      {/* --- Item 3: Vùng nguyên liệu --- */}
      {product.ingredients && (
        <>
          <Divider />
          <AccordionItem
            title="Vùng nguyên liệu"
            isOpen={openSet.has(2)}
            onToggle={() => handleToggle(2)}
          >
            <p className="text-blue-500">{product.ingredients}</p>
          </AccordionItem>
        </>
      )}
      
      {/* --- Item 4: Quy trình canh tác --- */}
      {product.grow && (
        <>
          <Divider />
          <AccordionItem
            title="Quy trình canh tác"
            isOpen={openSet.has(3)}
            onToggle={() => handleToggle(3)}
          >
            <p className="text-blue-500">{product.grow}</p>
          </AccordionItem>
        </>
      )}

      {/* --- Item 5: Quy trình chế biến (cooking is an object) --- */}
      {product.cooking && (
        <>
          <Divider />
          <AccordionItem
            title="Quy trình chế biến và bảo quản"
            isOpen={openSet.has(4)}
            onToggle={() => handleToggle(4)}
          >
            <div className="space-y-3">
              {product.tag.includes('gao-an')&& <>
                <ol className="list-decimal list-inside space-y-2 text-blue-800 font-small">
                  {product.cooking.step.map((s, i) => <p key={i}>{s}</p>)}
                </ol>
                <Divider />
              </>}
              <p className="text-green-600 bg-[url('/certificate/quote.svg')]  bg-no-repeat bg-left-top pt-5">{product.cooking.description}</p>
            </div>
          </AccordionItem>
        </>
      )}

      {product.wrapProcess && (
        <>
          <Divider />
          <AccordionItem
            title="Quy trình đóng gói"
            isOpen={openSet.has(5)}
            onToggle={() => handleToggle(5)}
          >
            <p className="text-blue-500">{product.wrapProcess}</p>
          </AccordionItem>
        </>
      )}
      {product.productCertImages && product.productCertImages.length > 0 && (
        <>
          <Divider />
          <button
            onClick={() => handleToggle(6)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white text-left"
            aria-expanded={openSet.has(6)}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/usageguide/Bullet point.svg"
                alt="Leaf Icon"
                width={20}
                height={20}
              />
              <span className="text-[#333842] font-alegreya-sans font-medium text-[20px]">
                Chứng nhận
              </span>
            </div>
            <Image
              src="/certificate/chevron-down.svg"
              alt="arrow"
              width={20}
              height={20}
              className={`transition-transform duration-300 ${
                openSet.has(6) ? "rotate-180" : ""
              }`}
            />
          </button>
          {openSet.has(6) && (
            <div className="flex flex-wrap items-center gap-4 px-6 pt-1 pb-4">
              {product.productCertImages.map((certImage, index) => (
                <Image
                  key={index}
                  src={certImage}
                  alt={`Certificate ${index + 1}`}
                  width={88}
                  height={88}
                  className="flex-shrink-0" 
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}