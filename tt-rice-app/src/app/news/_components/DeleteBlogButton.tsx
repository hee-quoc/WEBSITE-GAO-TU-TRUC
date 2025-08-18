// src/app/products/_components/DeleteProductButton.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { api } from '~/trpc/react';
import toast from 'react-hot-toast';
import Button from '~/app/_components/ui/Button';

interface DeleteBlogButtonProps {
  blogId: number;
}

export default function DeleteBlogButton({ blogId }: DeleteBlogButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Use the tRPC mutation hook for deleting a product
  const deleteBlog = api.blog.delete.useMutation({
    onSuccess: () => {
      toast.success('Sản phẩm đã được xoá thành công!');
      router.push('/news');
      router.refresh();
    },
    onError: (error) => {
      toast.error(`Lỗi khi xoá sản phẩm: ${error.message}`);
      setIsModalOpen(false);
    },
  });

  const handleDelete = () => {
    deleteBlog.mutate({ id: blogId });
  };

  const isDeleting = deleteBlog.status === 'pending';

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className="inline-flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600"
      >
        <Trash2 className="h-4 w-4" />
        Xoá sản phẩm
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 transition-opacity">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Xác nhận xoá</h3>
            <p className="mt-2 text-sm text-gray-600">
              Bạn có chắc chắn muốn xoá sản phẩm này không? Hành động này không thể hoàn tác.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                disabled={isDeleting} // Use the new variable
              >
                Huỷ bỏ
              </Button>
              <Button
                variant="primary"
                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400"
                onClick={handleDelete}
                disabled={isDeleting} // Use the new variable
              >
                {isDeleting ? 'Đang xoá...' : 'Xoá'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}