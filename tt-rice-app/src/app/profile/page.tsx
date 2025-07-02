// src/app/profile/page.tsx
"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

import { api } from "~/trpc/react";
import Button from "~/app/_components/ui/Button";
import Input from "~/app/_components/ui/Input";
import Card from "~/app/_components/ui/Card";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const updateUser = api.user.updateProfile.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
      toast('Please log in again with your new credentials.', { icon: 'ℹ️' });
      setTimeout(() => {
        signOut({ callbackUrl: '/login' });
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate(formData);
  };

  if (status === "loading") return <p className="p-8 text-center">Loading session...</p>;
  if (status === "unauthenticated") return <p className="p-8 text-center">Please log in to view this page.</p>;

  return (
    <main className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />
      <h1 className="mb-6 text-center text-3xl font-bold tracking-tight text-slate-900">
        Update Your Profile
      </h1>
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={`New Username`}
            id="username"
            type="text"
            placeholder="Leave blank to keep current"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <Input
            label="New Password"
            id="password"
            type="password"
            placeholder="Leave blank to keep current"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <div className="flex justify-end">
            <Button type="submit">
              Update Profile
            </Button>
          </div>
        </form>
      </Card>
    </main>
  );
}