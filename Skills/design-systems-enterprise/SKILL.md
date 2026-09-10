---
name: design-systems-enterprise
description: Architectural guidelines for enterprise design systems (Mantine, Carbon, Fluent UI, Primer, Ant Design, Base Web). Use when structuring large-scale component architecture, design tokens, token-driven theming, and accessibility contracts.
---

# Enterprise Design Systems & Token Architecture

This skill provides design system architectural standards drawn from enterprise frameworks like **IBM Carbon**, **Microsoft Fluent UI**, **GitHub Primer**, **Ant Design**, **Mantine**, and **Uber Base Web**.

---

## 1. Design Token Tiering Strategy

Enterprise design systems use a 3-tier token architecture:

```text
[Tier 1: Global Primitive Tokens]  (Raw HSL, Colors, Spacing, Typography)
  └── [Tier 2: Semantic Tokens]    (bg-background, text-foreground, border-muted)
       └── [Tier 3: Component Tokens] (--btn-bg, --card-radius, --input-border)
```

### CSS Token Definition (`tokens.css`)

```css
/* Tier 1: Global Primitives */
:root {
  --color-blue-500: #3b82f6;
  --color-purple-600: #9333ea;
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --radius-md: 0.5rem;
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* Tier 2: Semantic Abstractions */
[data-theme='light'] {
  --color-surface-bg: #ffffff;
  --color-surface-text: #0f172a;
  --color-brand-primary: var(--color-blue-500);
}

[data-theme='dark'] {
  --color-surface-bg: #0f172a;
  --color-surface-text: #f8fafc;
  --color-brand-primary: var(--color-purple-600);
}
```

---

## 2. Component Composition & Polymorphism (`asChild` Pattern)

Enterprise design systems prefer headless polymorphism via `@radix-ui/react-slot` to prevent unwanted DOM element nesting:

```tsx
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ asChild, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';
    return (
      <Component
        ref={ref}
        className={cn('box-border min-w-0', className)}
        {...props}
      />
    );
  }
);
Box.displayName = 'Box';
```

---

## 3. Design System Checklist

| Area | Requirement |
| :--- | :--- |
| **Token-Driven** | All colors, radii, shadows, and font sizes reference CSS custom properties. Zero hardcoded hex codes. |
| **Keyboard Focus** | Focus indicators (`ring-2 ring-primary ring-offset-2`) are enforced across interactive surfaces. |
| **Polymorphism** | Components support `asChild` to wrap Next.js `<Link>` or standard HTML tags natively. |
| **Controlled/Uncontrolled** | Input controls accept both `value` + `onChange` (controlled) and `defaultValue` (uncontrolled). |
