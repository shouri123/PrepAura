---
name: gsap-motion
description: High-performance animation engines using GSAP (ScrollTrigger, Flip, Timeline) and Motion (Framer Motion / motion/react). Use when implementing scroll timelines, FLIP layout transitions, spring physics, dynamic text splitting, or complex interactive UI animations.
---

# GSAP & Motion (Framer Motion) Animation

This skill provides production guidance and implementation patterns for the web's two premier animation libraries: **GSAP** (`greensock/GSAP`) and **Motion** (`motiondivision/motion` / `motion/react`).

---

## Technical Stack & Packages

```bash
# GSAP installation
npm install gsap

# Motion (Framer Motion) installation
npm install motion
```

---

## 1. Motion (`motion/react`) Implementation Patterns

### A. Layout Animation (`layoutId` Hero Transition)

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CardItem {
  id: string;
  title: string;
  category: string;
}

export function ExpandableCardList({ items }: { items: CardItem[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedItem = items.find((item) => item.id === selectedId);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            className="cursor-pointer p-4 border rounded-xl bg-card hover:bg-accent transition-colors"
          >
            <motion.h4 layoutId={`title-${item.id}`} className="font-semibold text-lg">
              {item.title}
            </motion.h4>
            <motion.p layoutId={`cat-${item.id}`} className="text-sm text-muted-foreground">
              {item.category}
            </motion.p>
          </motion.div>
        ))}
      </div>

      {/* Expanded Modal Overlay */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-${selectedItem.id}`}
              className="w-full max-w-lg p-6 bg-background rounded-2xl border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.h4 layoutId={`title-${selectedItem.id}`} className="text-2xl font-bold">
                {selectedItem.title}
              </motion.h4>
              <motion.p layoutId={`cat-${selectedItem.id}`} className="text-sm text-primary mt-1">
                {selectedItem.category}
              </motion.p>
              <p className="mt-4 text-muted-foreground text-sm">
                Detailed modal description content animated seamlessly from card item layout.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

---

### B. Scroll-Linked Progress & Parallax (`useScroll`, `useTransform`)

```tsx
'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section ref={containerRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden my-20">
      <motion.div style={{ y, opacity }} className="text-center">
        <h2 className="text-5xl font-black">Smooth Parallax Heading</h2>
        <p className="mt-2 text-muted-foreground">Driven by Motion useScroll and useTransform hooks</p>
      </motion.div>
    </section>
  );
}
```

---

## 2. GSAP & ScrollTrigger Patterns

### A. Timeline Orchestration with ScrollTrigger

```typescript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGSAPHeroAnimation(container: HTMLElement) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1, // Smooth scrub effect
    },
  });

  tl.from(container.querySelector('.hero-title'), {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
  })
    .from(
      container.querySelectorAll('.hero-badge'),
      {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
      },
      '-=0.5'
    )
    .from(
      container.querySelector('.hero-image'),
      {
        y: 50,
        opacity: 0,
        duration: 1.2,
      },
      '-=0.6'
    );

  return () => {
    // Cleanup on component unmount
    tl.kill();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}
```

---

## 3. Library Selection Guidelines

| Feature Requirement | Recommended Library | Reason |
| :--- | :--- | :--- |
| **React State / UI Transitions** | `Motion` (`motion/react`) | Built for React lifecycle, JSX `layoutId`, and state animations. |
| **Complex Multi-Step Timelines** | `GSAP Timeline` | Unmatched timeline control, `.add()`, `.seek()`, stagger math. |
| **Pinned Scroll Storytelling** | `GSAP ScrollTrigger` | Robust canvas/DOM pinning and scrub timeline management. |
| **Layout Morphing (FLIP)** | `Motion` or `GSAP Flip` | Both support FLIP. `Motion` handles layout props natively in React. |

---

## Performance & Best Practices

1. **Compositor Props**: Animate `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`. NEVER animate `width`, `height`, `margin`, or `padding` directly in loops.
2. **React Cleanup**: Always clean up GSAP timelines inside `useEffect` or `useLayoutEffect` return functions (`tl.kill()`).
3. **GPU Acceleration**: Add `will-change: transform` only during active animations.
