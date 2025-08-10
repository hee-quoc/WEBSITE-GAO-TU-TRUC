// components/Breadcrumb.tsx
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// In a real application, you would pass the breadcrumb items as props.
// For this example, we'll hardcode them to match your image.
const breadcrumbData = {
  category: {
    name: "Danh sách sản phẩm",
    href: "/products",
  },
  productName: "Gạo ST25 Lúa Tôm",
};

export default function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-sm">
        {/* Home Icon Link */}
        <li>
          <Link href="/" className="text-gray-500 transition-colors hover:text-gray-700">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {/* First Separator */}
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>

        {/* Category Link */}
        <li>
          <Link
            href={breadcrumbData.category.href}
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            {breadcrumbData.category.name}
          </Link>
        </li>

        {/* Second Separator */}
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>

        {/* Current Page (Active) */}
        <li>
          <span className="font-medium text-green-500  px-2 py-1 rounded-md">
            {breadcrumbData.productName}
          </span>
        </li>
      </ol>
    </nav>
  );
}