---
name: radix-ui
description: Headless accessible UI primitives for React applications using Radix UI (radix-ui/primitives). Use when building accessible custom design systems, unstyled dialogs, popovers, dropdowns, accessible tabs, tooltips, and complex UI controls.
---

# Radix UI Headless Primitives

[Radix UI](https://github.com/radix-ui/primitives) is the unstyled, accessible React primitive foundation powering **`shadcn/ui`**, **Origin UI**, and modern design systems (`radix-ui.com`). Radix handles low-level ARIA roles, focus management, screen reader navigation, collision detection, and keyboard controls.

---

## Technical Stack & Packages

```bash
# Core Primitives
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-accordion @radix-ui/react-tooltip @radix-ui/react-scroll-area @radix-ui/react-tabs @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-slot
```

---

## 1. Core Primitives Reference

### A. Accessible Dialog / Modal (`@radix-ui/react-dialog`)

```tsx
'use client';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

export function AccessibleModal() {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="rounded-lg bg-primary px-4 py-2 text-primary-foreground font-medium shadow hover:bg-primary/90">
        Open Modal
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-xl bg-background p-6 shadow-lg border duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogPrimitive.Title className="text-lg font-semibold">
            Modal Title
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-2 text-sm text-muted-foreground">
            Fully accessible dialog modal with automatic focus lock, keyboard ESC closing, and screen reader announcements.
          </DialogPrimitive.Description>
          <div className="mt-6 flex justify-end gap-3">
            <DialogPrimitive.Close className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent">
              Cancel
            </DialogPrimitive.Close>
          </div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
```

---

### B. Popover with Automatic Collision Detection (`@radix-ui/react-popover`)

```tsx
'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';

export function AccessiblePopover() {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger className="rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent">
        Toggle Options
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={8}
          className="z-50 w-72 rounded-lg border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        >
          <h4 className="font-medium text-sm">Popover Settings</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            Radix Popover automatically adjusts positioning to remain inside browser boundaries.
          </p>
          <PopoverPrimitive.Arrow className="fill-popover" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
```

---

## 2. Radix UI Primitive Map

| Component Primitive | Radix Package | Primary Usage |
| :--- | :--- | :--- |
| **Dialog / Modal** | `@radix-ui/react-dialog` | Accessible overlay modals with focus trapping. |
| **Dropdown Menu** | `@radix-ui/react-dropdown-menu` | Contextual menus with keyboard arrow key navigation. |
| **Popover** | `@radix-ui/react-popover` | Floating popovers with automatic collision detection. |
| **Select** | `@radix-ui/react-select` | Custom styled select inputs adhering to native select ARIA. |
| **Accordion** | `@radix-ui/react-accordion` | Expandable collapsibles with single/multiple expand modes. |
| **Tabs** | `@radix-ui/react-tabs` | Accessible tabbed panels with keyboard arrow switching. |
| **Tooltip** | `@radix-ui/react-tooltip` | Hover/focus floating hints with configurable delay. |
| **Slot** | `@radix-ui/react-slot` | Utility for merging props onto child components (`asChild`). |

---

## Best Practices

1. **Use `asChild`**: Wrap existing custom components with `asChild` on Radix Triggers/Controls to pass accessibility event handlers and refs directly onto child nodes without introducing extra wrapper `<div>`s.
2. **Keyboard Navigation**: Ensure custom item primitives don't override native `keydown` events unless explicitly managing focus index.
