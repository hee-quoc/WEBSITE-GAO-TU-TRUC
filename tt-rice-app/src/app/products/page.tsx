// src/app/products/page.tsx
"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import toast, { Toaster } from "react-hot-toast";

import Button from "~/app/_components/ui/Button";
import Input from "~/app/_components/ui/Input";
import Card from "~/app/_components/ui/Card";

export default function ProductsPage() {
  const { data: session } = useSession();
  const utils = api.useUtils();

  const [newProduct, setNewProduct] = useState({ name: '', description: '' });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading, // Changed from isLoadingProducts
    } = api.product.getInfinite.useInfiniteQuery(
        { limit: 12 }, // Fetch 12 items per page
        {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        }
    );

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      toast.success("Product created!");
      utils.product.getAll.invalidate();
      setNewProduct({ name: '', description: '' });
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      toast.success("Product deleted!");
      utils.product.getAll.invalidate();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProduct.mutate(newProduct);
  };


// The 'data' object is now structured differently, so we flatten it
const products = data?.pages.flatMap((page) => page.items);
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <Toaster position="top-center" />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Our Products</h1>
      </div>

      {session && (
        <Card className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-slate-800">Add a New Product</h2>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
              <Input
                placeholder="Product Description (optional)"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end">
              {/* <Button type="submit" isLoading={createProduct.isLoading}>
                Create Product
              </Button> */}
              <Button type="submit">
                Create Product
              </Button>
            </div>
          </form>
        </Card>
      )}
      {isLoading && <p>Loading products...</p>}
      
      <div className="grid ...">
        {products?.map((product) => (
          <Card key={product.id} className="flex flex-col">
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{product.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-slate-500">By: {product.author.username}</p>
                {session?.user.id === product.authorId && (
                  <div className="flex space-x-2">
                    <Button 
                      
                      onClick={() => {
                        if (confirm("Are you sure?")) {
                          deleteProduct.mutate({ id: product.id });
                        }
                      }}
                    //   isLoading={deleteProduct.isLoading && deleteProduct.variables?.id === product.id}
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </Card>
        ))}
      </div>

      {/* Add a "Load More" button */}
      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => fetchNextPage()}
            variant="secondary"
          >
            Load More
          </Button>
        </div>
      )}
    </main>
  );
}