// src/app/_components/ui/Card.tsx
import React from 'react';

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      <div className="p-6">{children}</div>
    </div>
  );
}