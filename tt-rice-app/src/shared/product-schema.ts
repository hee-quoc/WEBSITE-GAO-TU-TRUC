// src/shared/product-schema.ts
import { z } from "zod";

const GuideInput = z.object({
  water: z.array(z.number()),
  rice: z.array(z.string()),
  finger: z.array(z.string()),
  step: z.array(z.string()),
});

const CookingInput = z.object({
  step: z.array(z.string()),
  description: z.string(),
});

// This is the main schema we will use for validation
export const productFormSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
  description: z.string().min(1, "Vui lòng nhập mô tả ngắn"),
  price: z.string().min(1, "Vui lòng nhập giá. Nhập 0 nếu muốn giá hiển thị là \"Liên hệ\" "),
  detail: z.string(),
  properties: z.array(z.number()),
  tag: z.array(z.string()),
  productImages: z.array(z.string()).min(1, "Vui lòng thêm ít nhất một ảnh sản phẩm"),
  package: z.string(),
  parts: z.string(),
  ingredients: z.string(),
  grow: z.string(),
  wrapProcess: z.string(),
  productCertImages: z.array(z.string()),
  guide: GuideInput.optional(),
  cooking: CookingInput.optional(),
  certificates: z
    .array(
      z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        image: z.string().nullable().optional(),
      })
    )
    .optional(),
});