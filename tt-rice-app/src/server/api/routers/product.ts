// src/server/api/routers/product.ts
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {generateUniqueSlug} from "../../utils/utils"


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

const CertificateInput = z.object({
  name: z.string(),
  image: z.string(),
  description: z.string(),
});



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
          ? { tag: { equals: tag } } // tag is now a String
          : {},
        orderBy: { createdAt: "desc" },
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
          productImage: z.array(z.string()),
          package: z.string(),
          parts: z.string(),
          ingredients: z.string(),
          grow: z.string(),
          wrapProcess: z.string(),

          productCertImage: z.array(z.string()),
          guide: GuideInput.optional(),
          cooking: CookingInput.optional(),

          certificate: z
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

      const { guide, cooking, certificate, productImage, productCertImage, ...rest } = form;

      // Không upload file nữa vì client đã gửi URL rồi
      // Bạn chỉ cần lưu URL/key vào database

      const newProduct = await ctx.db.product.create({
        data: {
          ...rest,
          slug,
          productImages: { set: productImage },
          productCertImages: { set: productCertImage },
          ...(guide && { guide: { create: guide } }),
          ...(cooking && { cooking: { create: cooking } }),
          ...(certificate && {
            certificates: {
              create: certificate.map((c) => ({
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
        id: z.number(), // ID of the product to update
        // All fields are optional for an update
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        price: z.string().optional(),
        detail: z.string().optional(),
        properties: z.array(z.number()).optional(),
        tag: z.string().optional(),
        productImages: z.array(z.string()).optional(),
        package: z.string().optional(),
        parts: z.string().optional(),
        ingredients: z.string().optional(),
        grow: z.string().optional(),
        wrapProcess: z.string(),
        productCertImages: z.array(z.string()).optional(),
        
        // Relational fields are also optional
        guide: GuideInput.optional().nullable(),
        cooking: CookingInput.optional().nullable(),
        certificates: z.array(CertificateInput).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // void triggerRevalidation();

      const { id, guide, cooking, certificates, ...productData } = input;

      return ctx.db.product.update({
        where: { id },
        data: {
          // Update scalar fields
          ...productData,
          // Update relational fields using Prisma's powerful nested write operations
          ...(guide !== undefined && { 
            guide: guide ? { upsert: { create: guide, update: guide } } : { delete: true }
          }),
          ...(cooking !== undefined && { 
            cooking: cooking ? { upsert: { create: cooking, update: cooking } } : { delete: true }
          }),
          ...(certificates !== undefined && { 
            certificates: { 
              // This replaces all existing certificates with the new list
              set: [], 
              create: certificates 
            }
          }),
        },
      });
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
      return ctx.db.product.findUnique({
        where: { slug: input.slug },
        include: {
          guide: true,        
          cooking: true,  
          certificates: true, 
        },
      });
    }),
});
