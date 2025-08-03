import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '~/server/api/root'; // 👈 Đúng nguồn router

export const api = createTRPCReact<AppRouter>();