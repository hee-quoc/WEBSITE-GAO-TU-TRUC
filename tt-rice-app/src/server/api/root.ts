import { productRouter } from "~/server/api/routers/product";
import { userRouter } from "~/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { s3Router } from "~/server/api/routers/s3";
import { blogRouter } from "./routers/blog";

export const appRouter = createTRPCRouter({
  user: userRouter,
  product: productRouter,
  s3: s3Router,
  blog: blogRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
