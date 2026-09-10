---
name: micro-interactions-carousels
description: Micro-interactions, spring physics, touch carousels, and swipe gestures using Embla Carousel, Keen Slider, React Spring, and Framer Motion gestures. Use when adding smooth sliders, testimonial carousels, spring physics, drag-to-dismiss cards, and micro-feedback interactions.
---

# Micro-Interactions & Carousels

This skill covers touch carousels, drag gestures, and physics-driven micro-interactions using **Embla Carousel**, **Keen Slider**, **React Spring**, and **Framer Motion**.

---

## Technical Stack & Packages

```bash
# Touch Carousels & Sliders
npm install embla-carousel-react embla-carousel-autoplay

# Physics & Micro-interactions
npm install motion @react-spring/web
```

---

## 1. Embla Carousel with Autoplay & Dot Navigation

```tsx
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-3xl mx-auto px-4 py-8">
      {/* Embla Viewport */}
      <div className="overflow-hidden rounded-2xl border bg-card p-6 shadow-md" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((item) => (
            <div key={item.id} className="flex-[0_0_100%] min-w-0 px-4">
              <p className="text-lg italic text-muted-foreground">"{item.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <img src={item.avatar} alt={item.author} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-semibold text-sm">{item.author}</h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-1.5">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === selectedIndex ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={scrollPrev} className="h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={scrollNext} className="h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## 2. Swipe-to-Dismiss Gesture Card (Framer Motion Gestures)

```tsx
'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Trash2 } from 'lucide-react';

export function SwipeToDismissCard({ onDismiss }: { onDismiss?: () => void }) {
  const [removed, setRemoved] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['rgba(239, 68, 68, 0.2)', 'rgba(0,0,0,0)', 'rgba(239, 68, 68, 0.2)']
  );

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 120) {
      setRemoved(true);
      if (onDismiss) onDismiss();
    }
  };

  if (removed) return null;

  return (
    <motion.div
      style={{ x, opacity, background }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="relative flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm cursor-grab active:cursor-grabbing touch-pan-y"
    >
      <div>
        <h4 className="font-medium text-sm">Swipeable Notification Card</h4>
        <p className="text-xs text-muted-foreground">Drag left or right to dismiss this notification.</p>
      </div>
      <Trash2 className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
    </motion.div>
  );
}
```

---

## Best Practices

1. **Touch Action**: Set `touch-pan-y` on horizontal drag containers so mobile vertical scroll remains unblocked.
2. **Carousel Accessibility**: Provide keyboard focusable navigation buttons and visible slide indicators.
