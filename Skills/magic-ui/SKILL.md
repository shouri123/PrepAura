---
name: magic-ui
description: Animated React components built with Tailwind CSS and Framer Motion / Motion. Use when adding hero sections, bento grids, marquee animations, animated background patterns, magic cards, border beams, and interactive landing page components to React/Next.js projects.
---

# Magic UI

[Magic UI](https://github.com/magicuidesign/magicui) is a premier open-source library of animated React components specifically designed for landing pages, SaaS product pages, and marketing websites (`magicui.design`). Built on top of **Tailwind CSS** and **Framer Motion** (`motion/react`), it is fully compatible with **`shadcn/ui`**.

---

## Technical Stack & Dependencies

```bash
npm install motion clsx tailwind-merge class-variance-authority lucide-react
```

### Required Helper (`lib/utils.ts`)
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 1. CLI Installation

Initialize Magic UI in your React or Next.js codebase or install individual components directly:

```bash
# Initialize Magic UI config and helper utilities
npx magicui-cli init

# Add a specific component
npx magicui-cli add bento-grid
npx magicui-cli add marquee
npx magicui-cli add border-beam

# Alternatively, add via shadcn CLI
npx shadcn@latest add https://magicui.design/r/bento-grid.json
npx shadcn@latest add https://magicui.design/r/border-beam.json
```

---

## 2. Core Components & Implementation Patterns

### A. Bento Grid (`BentoGrid`, `BentoCard`)

A responsive, animated bento grid for feature showcases:

```tsx
// components/ui/bento-grid.tsx
import { ReactNode } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const BentoGrid = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={cn('grid w-full auto-rows-[22rem] grid-cols-3 gap-4', className)}>
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl',
      'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
      'transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
      className
    )}
  >
    <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75 dark:text-neutral-300" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <Button variant="ghost" asChild className="pointer-events-auto">
        <a href={href}>
          {cta} <ArrowRightIcon className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);
```

---

### B. Infinite Marquee (`Marquee`)

An infinite scrolling container for client logos, testimonials, and features:

```tsx
// components/ui/marquee.tsx
import { cn } from '@/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
        {
          'flex-row': !vertical,
          'flex-col': vertical,
        },
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={cn('flex shrink-0 justify-round [gap:var(--gap)]', {
            'animate-marquee flex-row': !vertical,
            'animate-marquee-vertical flex-col': vertical,
            'group-hover:[animation-play-state:paused]': pauseOnHover,
            '[animation-direction:reverse]': reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
```

---

### C. Animated Border Beam (`BorderBeam`)

Adds a glowing moving gradient beam along container borders:

```tsx
// components/ui/border-beam.tsx
import { cn } from '@/lib/utils';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam = ({
  className,
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 1.5,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  delay = 0,
}: BorderBeamProps) => {
  return (
    <div
      style={
        {
          '--size': size,
          '--duration': duration,
          '--anchor': anchor,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `-${delay}s`,
        } as React.CSSProperties
      }
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent]',
        '![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]',
        'after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:animate-border-beam after:[animation-delay:var(--delay)] after:[background-linear-gradient(to_left,var(--color-from),var(--color-to),transparent)] after:[offset-anchor:calc(var(--anchor)*1%)_50%] after:[offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]',
        className
      )}
    />
  );
};
```

---

## 3. Magic UI Component Catalog

| Category | Popular Components |
| :--- | :--- |
| **Landing Components** | `BentoGrid`, `Marquee`, `Dock`, `OrbitingCircles`, `AnimatedBeam`, `Globe` |
| **Text Effects** | `NumberTicker`, `AnimatedShinyText`, `TextReveal`, `WordRotate`, `HyperText` |
| **Background Patterns**| `FlickeringGrid`, `RetroGrid`, `DotPattern`, `AnimatedGridPattern`, `WarpBackground` |
| **Buttons & Badges** | `RainbowButton`, `ShimmerButton`, `RippleButton`, `PulsatingButton`, `BorderBeam` |
| **Mockups** | `Safari`, `iPhoneMockup`, `AndroidMockup`, `CodeComparison` |

---

## Best Practices

1. **Required Animations in `tailwind.config.js`**: Ensure `animate-marquee`, `animate-border-beam`, and `animate-shimmer` keyframes exist in Tailwind config.
2. **Composition**: Combine `BorderBeam` or `ShimmerButton` on top of standard `shadcn/ui` cards and dialogs for high-conversion CTAs.
