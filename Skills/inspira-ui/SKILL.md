---
name: inspira-ui
description: Vue 3 and Nuxt 3 animated component library built with Tailwind CSS, Radix Vue, and Motion-v inspired by Magic UI & Aceternity UI. Use when building Vue/Nuxt apps that require high-grade animations, 3D card effects, glowing grids, text animations, and modern landing page components.
---

# Inspira UI

[Inspira UI](https://github.com/unovue/inspira-ui) is an open-source, copy-paste Vue 3 and Nuxt 3 UI component collection created by the `unovue` organization (`inspira-ui.com`). Inspired by **Magic UI** and **Aceternity UI**, Inspira UI brings advanced micro-interactions, particle FX, 3D tilt cards, glowing borders, and shader backgrounds to the Vue ecosystem using **Tailwind CSS**, **Radix Vue**, and **@vueuse/motion** / **motion-v**.

---

## Technical Stack & Required Dependencies

When initializing a Vue 3 or Nuxt 3 project with Inspira UI components, install the following foundational dependencies:

```bash
npm install clsx tailwind-merge cva @vueuse/core @vueuse/motion radix-vue lucide-vue-next
```

If using Nuxt 3, add `@vueuse/motion/nuxt` to `nuxt.config.ts`:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
  ],
});
```

---

## 1. Helper Utilities Setup (`lib/utils.ts`)

Create `lib/utils.ts` (or `utils/index.ts`) in your Vue/Nuxt project to power class names merging across Inspira components:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## 2. Tailwind CSS Configuration (`tailwind.config.js`)

Inspira UI components often rely on CSS variables and color plugins. You can install `@inspira-ui/plugins` or set up custom animation keyframes:

```bash
npm install -D @inspira-ui/plugins
```

```javascript
// tailwind.config.js
const { setupInspiraUI } = require("@inspira-ui/plugins");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [setupInspiraUI],
};
```

---

## 3. Core Component Patterns & Examples

### A. 3D Card Parallax Effect (`CardContainer`, `CardBody`, `CardItem`)

```vue
<!-- components/ui/card-3d/CardContainer.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{ className?: string; containerClassName?: string }>();
const isHovered = ref(false);
const rotateX = ref(0);
const rotateY = ref(0);

function handleMouseMove(e: MouseEvent) {
  const card = e.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  rotateX.value = -y / 10;
  rotateY.value = x / 10;
}

function handleMouseLeave() {
  isHovered.value = false;
  rotateX.value = 0;
  rotateY.value = 0;
}
</script>

<template>
  <div
    :class="cn('py-10 flex items-center justify-center perspective-1000', containerClassName)"
    @mouseenter="isHovered = true"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <div
      :class="cn('flex items-center justify-center relative transition-all duration-200 ease-linear transform-style-3d', className)"
      :style="{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }"
    >
      <slot />
    </div>
  </div>
</template>
```

### B. Shimmer Glow Button (`ShimmerButton.vue`)

```vue
<!-- components/ui/shimmer-button/ShimmerButton.vue -->
<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  shimmerColor?: string;
  shimmerSize?: string;
  shimmerDuration?: string;
  borderRadius?: string;
  background?: string;
  class?: string;
}

withDefaults(defineProps<Props>(), {
  shimmerColor: '#ffffff',
  shimmerSize: '0.05em',
  shimmerDuration: '3s',
  borderRadius: '100px',
  background: 'rgba(0, 0, 0, 1)',
});
</script>

<template>
  <button
    :class="cn(
      'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-white [background:var(--bg)] [border-radius:var(--radius)] transition-all duration-300 hover:scale-105 active:scale-95',
      $props.class
    )"
    :style="{
      '--radius': borderRadius,
      '--bg': background,
    }"
  >
    <div class="-z-30 absolute inset-0 overflow-visible [container-type:size]">
      <div class="absolute inset-0 h-[100cqh] animate-shimmer [aspect-ratio:1] [radius:0] [background:radial-gradient(ellipse_at_center,var(--shimmer-color)_0%,transparent_70%)]" />
    </div>
    <slot />
  </button>
</template>
```

### C. Text Typewriter Effect (`TypewriterEffect.vue`)

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  words: { text: string; className?: string }[];
}>();

const displayedText = ref('');
</script>

<template>
  <div class="flex space-x-1 font-bold text-2xl md:text-5xl">
    <span v-for="(word, idx) in words" :key="idx" :class="word.className">
      {{ word.text }}&nbsp;
    </span>
  </div>
</template>
```

---

## 4. Popular Inspira UI Component Catalog

| Category | Components |
| :--- | :--- |
| **Background FX** | `AuroraBackground`, `SparklesBg`, `WavyBackground`, `DotPattern`, `GridPattern`, `Meteors`, `Vortex` |
| **Cards & 3D** | `CardContainer`, `CardBody`, `CardItem`, `PinContainer`, `GlowingEffect`, `EvervaultCard` |
| **Text Animations**| `TextGenerateEffect`, `TypewriterEffect`, `FlipWords`, `MorphingText`, `HyperText`, `SparklesText` |
| **Buttons & Badges**| `ShimmerButton`, `RainbowButton`, `PulsatingButton`, `ShinyButton`, `BorderBeam` |
| **Layout & Grids** | `BentoGrid`, `Dock`, `Marquee`, `Timeline`, `Globe`, `InteractiveHoverButton` |

---

## 5. Nuxt 3 SSR Safety Guidelines

1. **Canvas & WebGL Effects**: Components rendering HTML5 Canvas (`SparklesBg`, `Vortex`, `Globe`) MUST be wrapped in `<ClientOnly>` inside Nuxt 3 templates:
   ```vue
   <template>
     <ClientOnly>
       <SparklesBg />
     </ClientOnly>
   </template>
   ```
2. **DOM Hydration**: Always initialize mouse/scroll listeners (`window`, `document`) inside Vue's `onMounted` lifecycle hook to avoid SSR hydration mismatches.
