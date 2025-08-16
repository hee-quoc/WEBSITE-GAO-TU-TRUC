// src/app/_components/AuthButton.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Button from "~/app/_components/ui/Button"; // Make sure this path is correct

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="h-12 w-32 animate-pulse rounded-full bg-gray-200"></div>
    );
  }

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-4">
        <Button
          onClick={() => signOut()} // Redirect to homepage after sign out
          variant="secondary"
              size="medium"
              className=" group flex items-center rounded-full bg-red-500 text-red-500  hover:bg-red-500 hover:text-white"
        >
          Sign Out
        </Button>
      </div>
    );
  }

  // The user is not authenticated, show a Sign In button
  return (
    <Link href="/login">
      <Button
        variant="secondary"
        size="medium"
        className=" group flex items-center gap-2 border-green-normal rounded-full text-green-normal hover:bg-green-dark hover:text-white"
      >
        Sign In
      </Button>
    </Link>
  );
}