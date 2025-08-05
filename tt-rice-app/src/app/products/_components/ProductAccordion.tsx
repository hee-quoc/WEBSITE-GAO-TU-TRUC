"use client";
import { useState } from "react";

export function ProductAccordion({ sections }: { sections: { title: string; content: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-12">
      {sections.map((sec, i) => (
        <div key={i} className="border-b">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between py-4 text-left font-semibold"
          >
            {sec.title}
            <span>{openIndex === i ? "−" : "+"}</span>
          </button>
          {openIndex === i && <div className="pb-4 text-gray-700">{sec.content}</div>}
        </div>
      ))}
    </div>
  );
}
