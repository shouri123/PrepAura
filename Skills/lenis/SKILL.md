---
name: lenis
description: Smooth scroll integration for React, Vue, GSAP ScrollTrigger, and Vanilla JS using darkroomengineering/lenis. Use when adding smooth scrolling, scroll progress, scroll snapping, scroll synchronization, or pairing smooth scroll with GSAP/Framer Motion.
---

# Lenis Smooth Scroll

[Lenis](https://github.com/darkroomengineering/lenis) is a lightweight, high-performance, open-source smooth scrolling library built by `darkroom.engineering`. It maintains native browser scroll behavior, accessibility, and CSS features (`position: sticky`, anchor links, keyboard navigation) while delivering buttery smooth momentum scrolling and seamless animation frame synchronization.

---

## Technical Stack & Packages

| Package | Framework / Usage | Import Path |
| :--- | :--- | :--- |
| `lenis` | Core / Vanilla JS | `import Lenis from 'lenis'` |
| `lenis/react` | React 18+ / Next.js | `import { ReactLenis, useLenis } from 'lenis/react'` |
| `lenis/vue` | Vue 3 / Nuxt 3 | `import { Lenis, useLenis } from 'lenis/vue'` |

---

## 1. Core / Vanilla JS Integration

### Installation
```bash
npm install lenis
```

### Basic Setup with RequestAnimationFrame (RAF)
```javascript
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'; // Optional base styles

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
  orientation: 'vertical', // 'vertical' | 'horizontal'
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

// Listen to scroll events
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  console.log({ scroll, limit, velocity, direction, progress });
});

// Setup continuous RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Clean up when destroying page/component
// lenis.destroy();
```

---

## 2. React / Next.js Integration (`lenis/react`)

### Root Layout Setup (Next.js App Router / Vite React)

```tsx
// components/providers/smooth-scroll-provider.tsx
'use client';

import { ReactLenis } from 'lenis/react';
import { ReactNode } from 'react';

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
```

### Using the `useLenis` Hook

```tsx
'use client';

import { useLenis } from 'lenis/react';
import { useState } from 'react';

export function ScrollHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);

  const lenis = useLenis(({ scroll, progress, velocity }) => {
    setScrollProgress(progress);
  });

  const scrollToBottom = () => {
    lenis?.scrollTo('bottom', { duration: 2, easing: (t) => t });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/80 backdrop-blur-md">
      <div className="h-1 bg-primary transition-all" style={{ width: `${scrollProgress * 100}%` }} />
      <button onClick={scrollToBottom} className="mt-2 text-sm font-medium">
        Scroll to Bottom
      </button>
    </header>
  );
}
```

---

## 3. Vue 3 / Nuxt 3 Integration (`lenis/vue`)

### Nuxt 3 Plugin or Component Setup

```vue
<!-- components/SmoothScroll.vue -->
<script setup lang="ts">
import { Lenis } from 'lenis/vue';
import { ref } from 'vue';

const lenisOptions = ref({
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});
</script>

<template>
  <Lenis root :options="lenisOptions">
    <slot />
  </Lenis>
</template>
```

### Manual Composition API Setup in Vue

```vue
<script setup lang="ts">
import Lenis from 'lenis';
import { onMounted, onUnmounted } from 'vue';

let lenis: Lenis | null = null;
let rafId: number;

onMounted(() => {
  lenis = new Lenis({ lerp: 0.1 });

  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);
});

onUnmounted(() => {
  lenis?.destroy();
  cancelAnimationFrame(rafId);
});
</script>
```

---

## 4. GSAP ScrollTrigger Synchronization

When pairing Lenis with GSAP ScrollTrigger, **NEVER** let ScrollTrigger listen to native window scroll separately. Connect GSAP's ticker directly to Lenis:

```typescript
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.1 });

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);

// Direct GSAP ticker to update Lenis RAF
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // GSAP provides seconds, Lenis expects milliseconds
});

// Disable GSAP lag smoothing to prevent stutter
gsap.ticker.lagSmoothing(0);
```

---

## 5. Preventing Lenis in Specific Containers (`data-lenis-prevent`)

For inner scrollable containers (modals, dropdowns, sidebars, `overflow-y-auto` divs), add `data-lenis-prevent` to prevent Lenis from taking over the inner element's scroll event.

```html
<!-- Inside a Modal or Drawer -->
<div 
  class="max-h-96 overflow-y-auto p-4" 
  data-lenis-prevent
>
  <!-- Long scrollable modal list content -->
</div>
```

---

## 6. Key Configuration Options Reference

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `lerp` | `number` | `0.1` | Smoothness intensity (0.05 = super smooth/heavy, 0.2 = snappy). |
| `duration` | `number` | `1.2` | Duration of scroll animation in seconds. |
| `easing` | `function` | `(t) => ...` | Custom Easing curve function `(t: number) => number`. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Primary scroll direction. |
| `smoothWheel` | `boolean` | `true` | Enables smooth scrolling for mouse wheel events. |
| `wheelMultiplier` | `number` | `1` | Sensitivity multiplier for mouse wheel. |
| `touchMultiplier` | `number` | `2` | Sensitivity multiplier for touch gestures. |
| `infinite` | `boolean` | `false` | Enable infinite loop scrolling. |

---

## 7. Instance API Methods

```typescript
// Scroll to target element, selector, or position offset
lenis.scrollTo(target: string | HTMLElement | number, options?: {
  offset?: number;
  duration?: number;
  easing?: (t: number) => number;
  immediate?: boolean;
  lock?: boolean;
  onComplete?: () => void;
});

// Control Lenis execution
lenis.stop();   // Pauses smooth scroll processing
lenis.start();  // Resumes smooth scroll processing
lenis.destroy();// Removes event listeners & cleans up memory
```

---

## Best Practices & Rules

1. **Required CSS Baseline**:
   Ensure root HTML and Body do not force `height: 100%` with `overflow: hidden`, which breaks native scroll measurement.
   ```css
   html.lenis, html.lenis body {
     height: auto;
   }
   .lenis.lenis-smooth {
     scroll-behavior: auto !important;
   }
   .lenis.lenis-smooth [data-lenis-prevent] {
     overscroll-behavior: contain;
   }
   ```
2. **Preventing Double RAF**: Ensure only one RAF loop or GSAP ticker drives `lenis.raf()`.
3. **Modal & Popup Handling**: Call `lenis.stop()` when opening full-screen modal overlays, and `lenis.start()` when closing them.
