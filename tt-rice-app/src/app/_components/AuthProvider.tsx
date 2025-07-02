// src/app/_components/AuthProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

// This is a client component that wraps the SessionProvider
// so we can use it in our root layout, which is a server component.
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}