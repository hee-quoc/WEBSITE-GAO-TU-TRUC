// src/hooks/useQuill.ts
"use client";

import { useEffect, useRef, useState } from 'react';
import type Quill from 'quill';

export const useQuill = () => {
  const [quill, setQuill] = useState<Quill | null>(null);
  const quillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect runs only on the client
    if (quillRef.current && !quill) {
      // Dynamically import Quill only on the client side
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        const editor = new Quill(quillRef.current!, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'], // You'll need custom handlers for images
              ['clean'],
            ],
          },
        });
        setQuill(editor);
      }).catch((err) => { // <-- THE FIX IS HERE
        console.error("Failed to load Quill:", err);
      });
    }

    // Cleanup function
    return () => {
      if (quill) {
        setQuill(null);
      }
    };
  }, [quill]); // Empty dependency array ensures this runs only once

  return { quill, quillRef };
};