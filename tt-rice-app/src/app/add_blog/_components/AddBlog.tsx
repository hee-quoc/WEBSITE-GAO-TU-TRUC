"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { SortableCard } from "./SortableCard";
import { api } from '../../utils/api';
import {
  Save,
  Upload,
  Image as ImageIcon,
  Heading,
  LetterText ,
  X,
  Plus,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type BlockType = "header" | "image" | "description";

type Block = {
  id: string;
  type: BlockType;
  header?: { level: 2 | 3 | 4; text: string };
  image?: { file?: File | null; preview?: string | null; caption?: string };
  description?: { code: string };
};

// ---- Helpers ----

const uid = (p = "blk") => `${p}_${Math.random().toString(36).slice(2, 10)}`;

const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

// ---- Page Component ----

export  function AddBlogPage() {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const [title, setTitle] = useState("");
  const [thumb, setThumb] = useState<{ file: File | null; preview: string | null; width?: number; height?: number  }>({ file: null, preview: null });
  const thumbInputRef = useRef<HTMLInputElement | null>(null);

  const [blocks, setBlocks] = useState<Block[]>([
    { id: uid(), type: "header", header: { level: 2, text: "Ví dụ: Giới thiệu sản phẩm mới" } },
    { id: uid(), type: "image", image: { file: null, preview: null, caption: "Hình minh họa sản phẩm" } },
    { id: uid(), type: "description", description: { code: "Hãy viết gì đó..." } },
  ]);
  const [isClient, setIsClient] = useState(false);
  const addBlogMutation = api.blog.addBlog.useMutation();

    useEffect(() => {
    setIsClient(true);
    }, []);

  const canSave = useMemo(() => title.trim().length > 0, [title]);

  // --- Thumbnail ---
  const onPickThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setThumb({ file, preview: url });
  };

  const clearThumb = () => {
    if (thumb.preview) URL.revokeObjectURL(thumb.preview);
    setThumb({ file: null, preview: null });
    if (thumbInputRef.current) thumbInputRef.current.value = "";
  };

  // --- Blocks CRUD ---
  const addBlock = (type: BlockType) => {
    const id = uid();
    const base: Block = { id, type } as Block;
    if (type === "header") base.header = { level: 2, text: "" };
    if (type === "image") base.image = { file: null, preview: null, caption: "" };
    if (type === "description") base.description = { code: "" };
    setBlocks((prev) => [...prev, base]);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 0);
  };

  const removeBlock = (id: string) => setBlocks((prev) => prev.filter((b) => b.id !== id));

  const updateBlock = (id: string, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b)));
  };

  const setImageFile = (id: string, file: File | null) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id !== id || b.type !== "image") return b;
        if (b.image?.preview) URL.revokeObjectURL(b.image.preview);
        const preview = file ? URL.createObjectURL(file) : null;
        return { ...b, image: { ...(b.image ?? {}), file, preview } } as Block;
      })
    );
  };

  // --- Drag & Drop ---
  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    setBlocks((items) => arrayMove(items, oldIndex, newIndex));
  };

  // --- Save (demo JSON) ---
//   const [jsonPreview, setJsonPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    if (!canSave || submitting) return;
    setSubmitting(true);
    try {
      const thumbBase64 = thumb.file ? await fileToBase64(thumb.file) : "";
      const blocksPayload = await Promise.all(
        blocks.map(async (b) => {
          if (b.type === "header") return { type: b.type, payload: b.header ?? {}};
          if (b.type === "description") return { type: b.type, payload: b.description ?? {}};
          // image
          const imageBase64 = b.image?.file ? await fileToBase64(b.image.file) : null;
          return { type: b.type, payload: { caption: b.image?.caption ?? "", image: imageBase64 ?? "" } };
        })
      );

      const payload = { title: title.trim(), thumbnail: thumbBase64, blocks: blocksPayload };
    //   setJsonPreview(JSON.stringify(payload, null, 2));
        await addBlogMutation.mutateAsync(payload);
    } catch (e) {
      console.error(e);
      alert("Có lỗi khi tạo payload.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          
          
        </div>
      </div> */}

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="text-xl font-semibold">Thêm Blog</h1>
        {/* Title */}
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium">
            Tiêu đề bài viết <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nhập tiêu đề..."
            className="w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Thumbnail */}
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium">Ảnh thumbnail</label>
            {thumb.preview && (
              <button
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                onClick={clearThumb}
              >
                <X className="h-3 w-3" /> Xóa ảnh
              </button>
            )}
          </div>
        <div
            className="relative w-full overflow-hidden rounded-xl border border-dashed"
            style={{ height: thumb.height ? `${(thumb.height / thumb.width!) * 100}%` : 'auto' }}
        >
            {thumb.preview ? (
            <img
                src={thumb.preview}
                alt="thumbnail"
                className="w-full h-auto object-contain rounded-xl"
            />
            ) : (
            <div className="grid h-44 place-content-center text-center text-gray-500">
                <Upload className="mx-auto mb-2 h-6 w-6" />
                <p className="text-sm">Kéo & thả hoặc chọn ảnh làm thumbnail</p>
            </div>
            )}
            <input
            ref={thumbInputRef}
            type="file"
            accept="image/*"
            onChange={onPickThumb}
            className="absolute inset-0 cursor-pointer opacity-0"
            />
        </div>
        </div>

        {/* Blocks with Drag & Drop */}
        {isClient && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {blocks.map((b, i) => (
                <SortableCard
                  key={b.id}
                  id={b.id}
                  index={i}
                  block={b}
                  onRemove={() => removeBlock(b.id)}
                  onUpdate={updateBlock}
                  onSetImageFile={setImageFile}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>)}

        {/* Add content buttons (bottom) */}
        <div className="mt-6 border-t pt-4 flex flex-row justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Thêm nội dung:</span>
            <button onClick={() => addBlock("image")} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <ImageIcon className="h-4 w-4" /> Ảnh
            </button>
            <button onClick={() => addBlock("header")} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <Heading className="h-4 w-4" /> Header
            </button>
            <button onClick={() => addBlock("description")} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <LetterText className="h-4 w-4" /> Description
            </button>
            <button onClick={() => addBlock("header")} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <Plus className="h-4 w-4" /> Block mặc định
            </button>
          
          </div>
            <button
                disabled={!canSave || submitting}
                onClick={handleSave}
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium shadow-sm transition hover:shadow disabled:cursor-not-allowed disabled:opacity-50"
            >
                <Save className="h-4 w-4" /> Lưu
          </button>
        </div>

        {/* JSON preview */}
        {/* {jsonPreview && ( */}
          {/* <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-medium">JSON xem trước</div>
              <button onClick={() => setJsonPreview(null)} className="rounded-lg p-1 text-gray-600 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <pre className="max-h-[420px] overflow-auto rounded-xl bg-gray-900 p-3 text-xs text-gray-100">{jsonPreview}</pre>
          </div>
        // )} */}
      </div>
    </div>
  );
}