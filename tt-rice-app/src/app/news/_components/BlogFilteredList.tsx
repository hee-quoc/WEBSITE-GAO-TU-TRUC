"use client"
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import BlogCard from "./BlogCard";
import { type BlogCategoryData } from "../page";
import { type Blog } from "@prisma/client";
interface FilteredProductListProps {
  blogs: Blog[];
  categories: Record<string, BlogCategoryData>;
}

export function BlogFilteredList({blogs, categories}: FilteredProductListProps){
    const searchParams = useSearchParams();
    const activeTag = searchParams?.get('tag');
  
    const filteredProducts = useMemo(() => {
      if (!activeTag) {
        return blogs;
      }
      blogs.map(blog => {
  
        console.log(`Product Title: ${blog.title}, Tag: ${blog.tag}`);
      })
      return blogs.filter(blog => blog.tag === activeTag);
    }, [activeTag, blogs]);
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <BlogCard key={product.id} blog={product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Không tìm thấy sản phẩm nào phù hợp.
          </p>
        )}
      </div>
    );
}