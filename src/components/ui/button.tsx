'use client';

import { cn } from '@/lib/utils'; // optional utility for merging classNames
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button = ({ className, variant = 'default', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-200',
        variant === 'default'
          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
          : 'border border-blue-600 text-blue-600 hover:bg-blue-50',
        className
      )}
      {...props}
    />
  );
};
