'use client';

// Textarea.tsx
import React from 'react';
import type { TextareaHTMLAttributes } from 'react'; // <-- Use 'import type'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const textareaClasses = `w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary focus:border-transparent resize-vertical ${error ? 'border-red-500' : ''} ${className}`;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-medium mb-2">
          {label}
        </label>
      )}
      <textarea
        className={textareaClasses}
        rows={4}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Textarea;