---
name: animate-ui
description: Animated React components built with Tailwind CSS, Framer Motion / Motion, and TypeScript designed for shadcn/ui. Use when adding animated UI components, text effects, magnetic elements, custom cursors, smooth tab transitions, micro-interactions, and motion effects to React/Next.js projects.
---

# Animate UI

[Animate UI](https://github.com/imskyleen/animate-ui) is an open-source collection of animated, customizable React components built by `imskyleen` (`animate-ui.com`). Built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** (`motion/react`), Animate UI seamlessly integrates into existing **`shadcn/ui`** codebases via the `shadcn` CLI or copy-paste installation.

---

## Technical Stack & Required Dependencies

Ensure your React / Next.js project has `motion` (or `framer-motion`), `clsx`, `tailwind-merge`, `cva`, and `lucide-react` installed:

```bash
npm install motion clsx tailwind-merge class-variance-authority lucide-react
```

### Required Utility (`lib/utils.ts`)

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 1. Installation via Shadcn CLI

Animate UI components can be installed directly into your project using the standard `shadcn` CLI registry:

```bash
# Add components directly from the Animate UI registry
npx shadcn@latest add "https://animate-ui.com/r/magnetic.json"
npx shadcn@latest add "https://animate-ui.com/r/auto-height.json"
npx shadcn@latest add "https://animate-ui.com/r/counting-number.json"
npx shadcn@latest add "https://animate-ui.com/r/gradient-text.json"
```

---

## 2. Core Components & Implementation Examples

### A. Magnetic Hover Effect (`Magnetic`)

Attracts buttons or icons smoothly towards the user's cursor on hover using spring physics:

```tsx
// components/ui/magnetic.tsx
'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  intensity?: number;
  springOptions?: { stiffness?: number; damping?: number; mass?: number };
}

export function Magnetic({
  children,
  intensity = 0.5,
  springOptions = { stiffness: 150, damping: 15, mass: 0.1 },
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * intensity;
    const y = (e.clientY - (top + height / 2)) * intensity;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', ...springOptions }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
```

#### Usage:
```tsx
import { Magnetic } from '@/components/ui/magnetic';
import { Button } from '@/components/ui/button';

export function HeaderCTA() {
  return (
    <Magnetic intensity={0.4}>
      <Button className="rounded-full px-6 py-3 font-semibold">
        Get Started
      </Button>
    </Magnetic>
  );
}
```

---

### B. Dynamic Auto-Height Container (`AutoHeight`)

Smoothly animates container height changes whenever child elements change or mutate:

```tsx
// components/ui/auto-height.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface AutoHeightProps {
  children: React.ReactNode;
  className?: string;
  transition?: object;
}

export function AutoHeight({
  children,
  className,
  transition = { duration: 0.3, ease: 'easeInOut' },
}: AutoHeightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      animate={{ height }}
      transition={transition}
      className={`overflow-hidden ${className || ''}`}
    >
      <div ref={containerRef}>{children}</div>
    </motion.div>
  );
}
```

---

### C. Animated Counting Number (`CountingNumber`)

Smoothly counts up or down to a target numerical value:

```tsx
// components/ui/counting-number.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSpring, useTransform, motion } from 'motion/react';

interface CountingNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

export function CountingNumber({ value, duration = 2, className }: CountingNumberProps) {
  const spring = useSpring(0, { duration: duration * 1000 });
  const displayValue = useTransform(spring, (current) => Math.round(current).toLocaleString());
  const [renderedText, setRenderedText] = useState('0');

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return displayValue.on('change', (latest) => setRenderedText(latest));
  }, [displayValue]);

  return <span className={className}>{renderedText}</span>;
}
```

---

### D. Animated Tabs with Sliding Indicator (`Tabs`)

```tsx
// components/ui/animated-tabs.tsx
'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

export function AnimatedTabs({ tabs }: { tabs: Tab[] }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex space-x-1 rounded-xl bg-muted p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            'relative rounded-lg px-4 py-2 text-sm font-medium transition-colors outline-none',
            activeTab === tab.id ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="active-tab-indicator"
              className="absolute inset-0 rounded-lg bg-background shadow-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}
```

---

## 3. Component & Effect Summary Catalog

| Category | Component / Effect | Description |
| :--- | :--- | :--- |
| **Micro-Interactions** | `Magnetic` | Attracts target element towards cursor. |
| **Container & Motion**| `AutoHeight` | Animates height changes when content expands/collapses. |
| **Text Effects** | `CountingNumber` | Smooth animated counter/number ticker. |
| | `GradientText` | Shimmering multi-color gradient text background fill. |
| | `MorphingText` | Smooth character morphing between words. |
| | `TypingText` | Typewriter effect with dynamic cursor blinking. |
| **UI Controls** | `AnimatedTabs` | Tab bar with sliding spring background pill. |
| | `ScrollProgress` | Page or container scroll progress bar. |
| | `Cursor` | Custom follower cursor element. |
| | `ImageZoom` | Modal lightbox zoom transition for images. |

---

## Best Practices

1. **Use `motion/react`**: Motion package v12+ uses `motion/react`. Ensure imports match your project's Motion version (`motion/react` vs `framer-motion`).
2. **Performance**: Wrap layout animated components with `layoutId` carefully to prevent unnecessary layout recalculations.
3. **Accessibility**: Combine motion components with native HTML ARIA attributes (`aria-selected`, `aria-expanded`). Respect `prefers-reduced-motion` where necessary.
