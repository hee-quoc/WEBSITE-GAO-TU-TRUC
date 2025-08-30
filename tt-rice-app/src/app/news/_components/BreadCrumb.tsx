// components/Breadcrumb.tsx
import { Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// In a real application, you would pass the breadcrumb items as props.
// For this example, we'll hardcode them to match your image.

export default function Breadcrumb({title, category}:{title:string, category:string}) {
  return (
    <nav aria-label="Breadcrumb" className="font-fz-poppins">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 transition-colors hover:text-gray-700">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <Link
            href="/news"
            className="text-gray-500 transition-colors hover:text-gray-700"
          >
            {category}
          </Link>
        </li>
        <li>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </li>
        <li>
          <span className="font-medium text-green-500  px-2 py-1 rounded-md">
            {title}
          </span>
        </li>
      </ol>
    </nav>
  );
}