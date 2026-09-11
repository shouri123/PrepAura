import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-amber-200 bg-[#FAF7F2] px-3.5 py-2 text-xs text-[#1E1B4B] placeholder:text-[#A1A1AA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E05A47] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';
