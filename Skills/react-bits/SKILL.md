---
name: react-bits
description: Animated React statement components, custom text effects, interactive background shaders, 3D card tilt effects, and micro-interactions by David Haz (reactbits.dev). Use when adding high-impact visual effects, particle canvases, tilt cards, or animated hero typography to React projects.
---

# React Bits

[React Bits](https://github.com/DavidHDev/react-bits) is an open-source library created by David Haz (`reactbits.dev`) providing creative text animations, particle background effects, 3D card tilt effects, and interactive micro-interactions for React and Next.js applications.

---

## Technical Stack & Dependencies

```bash
npm install motion clsx tailwind-merge three @react-three/fiber @react-three/drei
```

---

## 1. Text Effects Examples

### A. Blur Text Entrance (`BlurText`)

```tsx
// components/ui/blur-text.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
}

export function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
}: BlurTextProps) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-50px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,50px,0)' };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0,0)',
  };

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{ duration: 0.5, delay: (index * delay) / 1000 }}
          className="inline-block"
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
}
```

---

### B. Shiny Metallic Text (`ShinyText`)

```tsx
// components/ui/shiny-text.tsx
'use client';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export function ShinyText({ text, disabled = false, speed = 5, className = '' }: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`text-[#b5b5b5a4] bg-clip-text inline-block ${disabled ? '' : 'animate-shiny-text'} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration,
      }}
    >
      {text}
    </div>
  );
}
```

Add CSS rule:
```css
@keyframes shiny-text {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
.animate-shiny-text {
  animation: shiny-text 5s linear infinite;
}
```

---

## 2. Interactive Cards & Components

### A. Tilted Card with Parallax (`TiltedCard`)

```tsx
// components/ui/tilted-card.tsx
'use client';

import { useRef, useState } from 'react';
import { motion } from 'motion/react';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
}

export function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  rotateAmplitude = 14,
  scaleOnHover = 1.05,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    setRotateX(rotationX);
    setRotateY(rotationY);
  };

  const handleMouseEnter = () => {
    setScale(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center perspective-1000"
      style={{ height: containerHeight, width: containerWidth }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-200 ease-out"
        animate={{
          rotateX,
          rotateY,
          scale,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <img src={imageSrc} alt={altText} className="h-full w-full object-cover" />
        {captionText && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white font-medium">
            {captionText}
          </div>
        )}
      </motion.div>
    </div>
  );
}
```

---

## 3. React Bits Catalog Summary

| Category | Popular Components |
| :--- | :--- |
| **Text Animations** | `BlurText`, `ShinyText`, `GlitchText`, `TextPressure`, `SplitText`, `CurvedText` |
| **Background FX** | `Iridescence`, `FaultyTV`, `Waves`, `Ballpit`, `PixelTrail`, `AuroraBackground` |
| **Cards & Layout** | `TiltedCard`, `DecayCard`, `Stack`, `CircularText`, `ScrollVelocity` |
| **Micro-Interactions**| `ClickSpark`, `SplashCursor`, `SpotlightCard`, `Magnet` |

---

## Best Practices

- **Copy-Paste Setup**: Copy individual component files directly into `components/ui/` from `reactbits.dev`.
- **Canvas Memory Safety**: When using WebGL-based background effects (`Iridescence`, `Ballpit`), ensure canvas contexts clean up when unmounted.
