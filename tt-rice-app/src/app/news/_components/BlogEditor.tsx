// src/app/_components/BlogEditor.tsx
"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState, useEffect } from "react";
// import { type Blog } from "@prisma/client";
import { Prisma } from "@prisma/client"
import toast from "react-hot-toast";

import { api } from "~/trpc/react";
import Button from "~/app/_components/ui/Button";
import { useQuill } from "~/app/hooks/useQuill"; // <-- Import the custom hook
import {uploadFileToS3} from "../../add_blog/utils/s3Upload"
import { SortableCard } from "../../add_blog/_components/SortableCard";
import { AddBlogPage } from '../../add_blog/_components/AddBlog';

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


type ContentBlock = {
  type: string
  payload: Record<string, unknown>;

}

type Blog = {
  title: string;
  slug: string;
  tag: string;
  content: ContentBlock[];
  // published: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  thumbnailUrl: string | null;
}

interface BlogEditorProps {
  blog: Blog;
}

type BlockType = "header" | "image" | "description";

type Block = {
  id: string;
  type: BlockType;
  header?: { level: 2 | 3 | 4; text: string };
  image?: { file?: File | null; preview?: string | null; caption?: string };
  description?: { code: string };
};

const newTypeOptions = [
        {label:"Tin tức/Thương hiệu",value:"tin-tuc"},
        {label:"Vào bếp cùng chúng tôi",value:"vao-bep-cung-chung-toi"}
    ]


type BlockPayload =
  | { type: "header"; payload: { level: 2 | 3 | 4; text: string } }
  | { type: "description"; payload: { code: string } }
  | { type: "image"; payload: { caption: string; image: string } };
// ---- Helpers ----    


export default function BlogEditor({ blog }: BlogEditorProps) {
  const router = useRouter();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const uid = (p = "blk") => `${p}_${Math.random().toString(36).slice(2, 10)}`;
  const blockData= blog.content.map((content)=>{
          const id = uid();
          const base: Block = { id, type:content.type } as Block;
          if (content.type === "header")  base.header = { level: 2, text: content.payload.text as string};
          else if (content.type === "image") base.image = { file: null, preview: content.payload.image as string , caption: content.payload.caption as string };
          else if (content.type === "description")  base.description = { code: content.payload.code as string };
          return base;
        })
  const [title, setTitle] = useState(blog.title);
  const [thumb, setThumb] = useState<{ file: File | null; preview: string | null; width?: number; height?: number  }>({ file : null, preview : blog.thumbnailUrl , width: undefined, height: undefined  });
  const [tag, setTag] = useState(blog.tag);
  const thumbInputRef = useRef<HTMLInputElement | null>(null);
  // const { quill, quillRef } = useQuill(); 
  const [blocks, setBlocks] = useState<Block[]>(blockData);
  const canSave = useMemo(() => title.trim().length > 0, [title]);


  // --- Blocks CRUD ---
  const addBlock = (type: BlockType, value: Record<string,unknown>) => {
    const id = uid();
    const base: Block = { id, type } as Block;
    if (type === "header") base.header = { level: 2, text: value.text as string};
    if (type === "image") base.image = { file: null, preview: value.image as string , caption: value.caption as string };
    if (type === "description") base.description = { code: value.code as string };
    setBlocks((prev) => [...prev, base]);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 0);
  };

  const updateBlogMutation = api.blog.update.useMutation();

  // useEffect(() => {
  //   if (blog) {
  //     console.log(blog)
  //     setBlocks((prev)=>{
  //       const blocks= blog.content.map((content)=>{
  //         const id = uid();
  //         const base: Block = { id, type:content.type } as Block;
  //         if (content.type === "header")  base.header = { level: 2, text: content.payload.text as string};
  //         else if (content.type === "image") base.image = { file: null, preview: content.payload.image as string , caption: content.payload.caption as string };
  //         else if (content.type === "description")  base.description = { code: content.payload.code as string };
  //         return base;
  //       })
  //       return [...prev,...blocks]
  //     })
  //     // blog.content.map((content)=>{
  //     //   addBlock(content.type as BlockType,content.payload)
  //     // })
      
  //     // if (quill && blog.content) {
  //     //   // quill.clipboard.dangerouslyPasteHTML(blog.content);
  //     // }
  //   }
  // }, []); // quill
  

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
      
      const createPresignedUrl = api.s3.createPresignedUrl.useMutation();
    


  const handleSave = async () => {
      if (!canSave || submitting) return;
      setSubmitting(true);
      try {
        if (!thumb.file){
          throw new Error("No thumbnail image");
        }
        const presignedThumbResults = await createPresignedUrl.mutateAsync({
                  fileName:thumb.file.name,
                  fileType:thumb.file.type,
                  })
        await uploadFileToS3(presignedThumbResults.url, thumb.file)
        const blocksPayload = (await Promise.all(
          blocks.map(async (b) => {
            if (b.type === "header"  && b.header?.text?.trim() ) return { type: b.type, payload: b.header ?? {}};
            else if (b.type === "description" && b.description?.code?.trim()) return { type: b.type, payload: b.description ?? {}};
            // image
            else if (b.type === "image"  && b.image?.file){
              const file = b.image.file;
              const presignedResults = await createPresignedUrl.mutateAsync({
                
                  fileName: file.name,
                  fileType: file.type,
                  })
              
              
              await uploadFileToS3(presignedResults.url, file)
              return { type: b.type, payload: { caption: b.image.caption ?? "", image: presignedResults.fileUrl ?? "" } };
            }
            // const imageBase64 = b.image?.file ? await fileToBase64(b.image.file) : null;
          })
        )).filter((b): b is BlockPayload => b !== null);;
  
  
        
  
        const payload = {slug: blog.slug, title: title.trim(),tag: tag, thumbnail: presignedThumbResults.fileUrl, blocks: blocksPayload , userId: "cmefggzc20000uv8kom0k3lng"};
        // console.log(payload)
      //   setJsonPreview(JSON.stringify(payload, null, 2));
        await updateBlogMutation.mutateAsync(payload);
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
        <h1 className="text-xl font-semibold">Chỉnh sửa Blog</h1>
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
        <div className="mb-6 rounded-2xl border bg-white p-4 shadow-sm">
          <label className="mb-2 block text-sm font-medium">
            Loại tin tức <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-1 w-[150px]">
            <div className="relative">
              <select
                value={tag}
                onChange={(e)=>{setTag(e.target.value)}}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
              >
                <option value="" disabled>
                  Loại tin tức
                </option>

                {newTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {/* Icon mũi tên */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
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
        {/* {isClient && } */}
        (
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
        </DndContext>)

        {/* Add content buttons (bottom) */}
        <div className="mt-6 border-t pt-4 flex flex-row justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-gray-600">Thêm nội dung:</span>
            <button onClick={() => addBlock("image", {caption:"",image:null})} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <ImageIcon className="h-4 w-4" /> Ảnh
            </button>
            <button onClick={() => addBlock("header",{level:2,text:""})} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <Heading className="h-4 w-4" /> Header
            </button>
            <button onClick={() => addBlock("description",{code:""})} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
              <LetterText className="h-4 w-4" /> Description
            </button>
            <button onClick={() => addBlock("header",{level:2,text:""})} className="inline-flex items-center gap-2 rounded-xl border bg-white px-3 py-2 text-sm shadow-sm">
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
      </div>
    </div>
  );
}