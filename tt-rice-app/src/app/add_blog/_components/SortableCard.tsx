import React, {  useState } from "react";
import {
  Upload,
  Trash2,
  X,
  GripVertical,
} from "lucide-react";

import {
  useSortable,
} from "@dnd-kit/sortable";

import { CSS } from '@dnd-kit/utilities';

// ---- Sortable card ----
type BlockType = "header" | "image" | "description";

type Block = {
  id: string;
  type: BlockType;
  header?: { level: 2 | 3 | 4; text: string };
  image?: { file?: File | null; preview?: string | null; caption?: string  ;width?: number; height?: number;};
  description?: { code: string };
};


export function SortableCard({
  id,
  index,
  block,
  onRemove,
  onUpdate,
  onSetImageFile,
}: {
  id: string;
  index: number;
  block: Block;
  onRemove: () => void;
  onUpdate: (id: string, patch: Partial<Block>) => void;
  onSetImageFile: (id: string, f: File | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };
  const [inputKey, setInputKey] = useState<number>(Date.now()); // Unique key for resetting input
    
  return (
    <div ref={setNodeRef} style={style} className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <button
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs text-gray-600 hover:bg-gray-100"
            title="Giữ và kéo để sắp xếp"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" /> Kéo thả
          </button>
          <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium">
            {block.type.toUpperCase()}
          </span>
          <span className="text-xs text-gray-400">#{index + 1}</span>
        </div>
        <button onClick={onRemove} className="rounded-lg p-1 text-red-600 hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Body per type */}
      {block.type === "header" && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="sm:w-1/3">
            <label className="mb-1 block text-sm font-medium">Cấp header</label>
            <select
              value={block.header?.level ?? 2}
              onChange={(e) =>
                onUpdate(id, {
                  header: { ...(block.header ?? { level: 2, text: "" }), level: Number(e.target.value) as 2 | 3 | 4 },
                })
              }
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            >
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
          </div>
          <div className="sm:w-2/3">
            <label className="mb-1 block text-sm font-medium">Nội dung header</label>
            <input
              value={block.header?.text ?? ""}
              onChange={(e) =>
                onUpdate(id, { header: { ...(block.header ?? { level: 2, text: "" }), text: e.target.value } })
              }
              placeholder="Nhập tiêu đề cho phần này..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>
      )}

      {block.type === "image" && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="sm:w-1/2">
            <div
              className={`relative grid h-48 place-content-center rounded-xl border border-dashed ${block.image?.preview ? "bg-gray-100" : "bg-white"}`
            }      
            style={{ height: (block.image?.height && block.image?.width) ? `${(block.image?.height / block.image.width) * 100}%` : 'auto' }}
            >
              {block.image?.preview ? (
                <img src={block.image.preview} alt="block" className="h-full w-full rounded-xl object-contain" />
              ) : (
                <div className="place-content-center text-center text-gray-500 h-48">
                  <Upload className="mx-auto mb-2 h-6 w-6" />
                  <p className="text-sm">Chọn ảnh cho block</p>
                </div>
              )}
              <input
                key={inputKey} // Use key to force re-render
                type="file"
                accept="image/*"
                onChange={(e) => onSetImageFile(id, e.target.files?.[0] ?? null,)}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {block.image?.preview && (
                <button
                  onClick={() => {onSetImageFile(id, null)
                    setInputKey(Date.now());}}
                  
                  className="absolute right-2 top-2 rounded-lg bg-white/80 p-1 text-red-600 shadow hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <div className="sm:w-1/2">
            <label className="mb-1 block text-sm font-medium">Chú thích (tùy chọn)</label>
            <input
              value={block.image?.caption ?? ""}
              onChange={(e) => onUpdate(id, { image: { ...(block.image ?? {}), caption: e.target.value } })}
              placeholder="Nhập chú thích cho ảnh..."
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>
        </div>
      )}

      {block.type === "description" && (
        <div>
          <div className="mb-2 text-sm text-gray-600">Hãy viết về nội dung của bạn</div>
          <textarea
            value={block.description?.code ?? ""}
            onChange={(e) => onUpdate(id, { description: { code: e.target.value } })}
            placeholder={`Hãy viết gì đó....`}
            className="h-40 w-full rounded-xl border bg-gray-50 p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      )}
    </div>
  );
}