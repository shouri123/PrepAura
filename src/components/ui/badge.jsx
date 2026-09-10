import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-[#FAF7F2] text-[#1E1B4B] border border-amber-900/10 font-medium',
        primary:
          'bg-amber-50 text-[#B45309] border border-amber-300/80 font-bold',
        secondary:
          'bg-white text-[#52525B] border border-amber-900/10 font-medium',
        success:
          'bg-emerald-50 text-[#0F766E] border border-emerald-300/80 font-bold',
        warning:
          'bg-amber-50 text-[#D97706] border border-amber-300 font-bold',
        error:
          'bg-rose-50 text-rose-700 border border-rose-200 font-bold',
        outline:
          'bg-transparent text-[#71717A] border border-amber-900/15 font-medium',
        pill:
          'rounded-full px-3 py-1 bg-amber-50 border border-amber-200 text-[#B45309] text-[10px] uppercase tracking-wider font-mono font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
