import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ff6a00] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'clay-btn-terracotta text-white font-bold shadow-md',
        destructive:
          'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
        outline:
          'clay-card-antique text-[#1E1B4B] border border-amber-300/80 hover:bg-amber-50 shadow-sm',
        secondary:
          'bg-amber-50 text-[#B45309] border border-amber-200 hover:bg-amber-100',
        ghost:
          'text-[#52525B] hover:text-[#1E1B4B] hover:bg-amber-50',
        link: 'text-[#E05A47] underline-offset-4 hover:underline',
        orangeSubtle:
          'bg-amber-50 text-[#E05A47] border border-amber-200 hover:bg-amber-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded px-3 text-xs',
        lg: 'h-12 rounded px-8 text-base',
        icon: 'h-9 w-9 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, animate = true, ...props }, ref) => {
    const Comp = asChild ? Slot : animate ? motion.button : 'button';
    const motionProps = animate && !asChild ? { whileTap: { scale: 0.98 }, transition: { duration: 0.05 } } : {};

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
