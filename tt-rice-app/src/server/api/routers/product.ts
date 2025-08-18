// src/server/api/routers/product.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {generateUniqueSlug} from "../../utils/utils"
import {deleteS3ObjectByUrl} from "../../s3";


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

const CertificateInput = z.array(
  z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    // image giờ chỉ là string hoặc null (URL)
    image: z.string().nullable().optional(),
  })
)



async function triggerRevalidation() {
  const revalidateUrl = new URL('/api/revalidate', process.env.NEXT_PUBLIC_APP_URL);
  
  try {
    await fetch(revalidateUrl.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': process.env.REVALIDATE_SECRET_TOKEN!,
      },
      body: JSON.stringify({
        path: '/products', // The path we want to rebuild
      }),
    });
    console.log('Successfully triggered revalidation for /products');
  } catch (err) {
    console.error('Failed to trigger revalidation:', err);
  }
}
export const productRouter = createTRPCRouter({
  // INFINITE FETCHING
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(), // Prisma `id` is Int
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 20;
      const { cursor } = input;

      const items = await ctx.db.product.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }

      return { items, nextCursor };
    }),

  // GET ALL WITH OPTIONAL TAG FILTER
  getAll: publicProcedure
    .input(z.object({ tag: z.string().optional() }))
    .query(({ ctx, input }) => {
      const { tag } = input;

      return ctx.db.product.findMany({
        where: tag
          ? { tag: { has: tag } } // tag is now a String
          : {},
        orderBy: { createdAt: "asc" },
      });
    }),

  // CREATE PRODUCT
  create: protectedProcedure
    .input(
      z.object({
        form: z.object({
          title: z.string().min(1, "Title is required"),
          description: z.string().min(1, "Description is required"),
          price: z.string().min(1, "Price is required"),
          detail: z.string(),
          properties: z.array(z.number()),
          tag: z.array(z.string()),

          // Thay vì mảng object { file: any }, giờ là mảng string key/url
          productImages: z.array(z.string()),
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
                // image giờ chỉ là string hoặc null (URL)
                image: z.string().nullable().optional(),
              })
            )
            .optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { form } = input;
      const slug = await generateUniqueSlug(form.title);

      const { guide, cooking, certificates, productImages, productCertImages, ...rest } = form;

      // Không upload file nữa vì client đã gửi URL rồi
      // Bạn chỉ cần lưu URL/key vào database

      const newProduct = await ctx.db.product.create({
        data: {
          ...rest,
          slug,
          productImages: { set: productImages },
          productCertImages: { set: productCertImages },
          ...(guide && { guide: { create: guide } }),
          ...(cooking && { cooking: { create: cooking } }),
          ...(certificates && {
            certificates: {
              create: certificates.map((c) => ({
                name: c.name ?? "",
                description: c.description ?? "",
                image: c.image ?? "",
              })),
            },
          }),
        },
      });

    
      return {
        success: true,
        message: "Product created successfully",
        productId: newProduct.id,
        slug: newProduct.slug,
      };
    }),


  update: protectedProcedure
    .input(
        z.object({
          id: z.number(),
          slug: z.string(),
          form: z.object({
            title: z.string().min(1, "Title is required"),
            description: z.string().min(1, "Description is required"),
            price: z.string().min(1, "Price is required"),
            detail: z.string(),
            properties: z.array(z.number()),
            tag: z.array(z.string()),

            // Thay vì mảng object { file: any }, giờ là mảng string key/url
            productImages: z.array(z.string()),
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
                  // image giờ chỉ là string hoặc null (URL)
                  image: z.string().nullable().optional(),
                })
              )
              .optional(),
          }),
        })
    )
    .mutation(async ({ ctx, input }) => {
      const { id,slug,form } = input;
      const { guide, cooking, certificates, productImages, productCertImages, ...rest } = form;

      // 1. Lấy dữ liệu cũ từ DB
      const oldProduct = await ctx.db.product.findFirst({
        where: { id, slug: slug },
        select: {
          productImages: true,
          productCertImages: true,
          certificates: { select: { image: true } },
        },
      });

      // 2. Lấy danh sách ảnh cũ
      const oldProductImages = oldProduct?.productImages ?? [];
      const oldProductCertImages = oldProduct?.productCertImages ?? [];
      const oldCertificateImages = (oldProduct?.certificates ?? [])
        .map((c) => c.image)
        .filter(Boolean);

      // 3. Lấy danh sách ảnh mới
      const newProductImages = productImages ?? oldProductImages;
      const newProductCertImages = productCertImages ?? oldProductCertImages;
      const newCertificateImages = certificates
        ? certificates.map((c) => c.image).filter(Boolean)
        : oldCertificateImages;

      // 4. Tìm các URL cần xóa trên S3
      const imagesToDelete = [
        ...oldProductImages.filter((url) => !newProductImages.includes(url)),
        ...oldProductCertImages.filter((url) => !newProductCertImages.includes(url)),
        ...oldCertificateImages.filter((url) => !newCertificateImages.includes(url)),
      ];

      // 5. Xóa ảnh trên S3
      await Promise.all(imagesToDelete.map((url) => deleteS3ObjectByUrl(url)));

      await ctx.db.product.update({
        where: { id },
        data: {
           ...rest,
          ...(productImages && { productImages: { set: productImages } }),
          ...(productCertImages && { productCertImages: { set: productCertImages } }),
          ...(guide !== undefined && {
            guide: guide
              ? { upsert: { create: guide, update: guide } }
              : { delete: true },
          }),
          ...(cooking !== undefined && {
            cooking: cooking
              ? { upsert: { create: cooking, update: cooking } }
              : { delete: true },
          }),
          ...(certificates !== undefined && {
            certificates: {
              set: [],
              create: certificates.map((c) => ({
                name: c.name ?? "",
                description: c.description ?? "",
                image: c.image ?? "",
              })),
            },
          }),
        },
      });

      // 6. Update DB
      return {
        success: true,
        message: "Product updated successfully",
      };
  }),
  // DELETE PRODUCT
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      void triggerRevalidation();
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),

  // GET ALL SLUGS
  getAllSlugs: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.product.findMany({
      select: { slug: true },
    });
  }),

  // GET PRODUCT BY SLUG
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
      where: { slug: input.slug },
      include: {
        guide: true,
        cooking: true,
        certificates: true,
        },
      });
      if (!product) return null;
      return product;
    }),
});
