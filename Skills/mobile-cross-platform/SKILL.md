---
name: mobile-cross-platform
description: Mobile-first responsive web and React Native layout patterns (NativeWind, Tamagui, Expo UI). Use when designing mobile interfaces, touch targets, safe area insets, bottom sheets, and responsive mobile drawers.
---

# Mobile & Cross-Platform UI Architecture

This skill provides mobile-first responsive web and React Native design patterns (inspired by **NativeWind**, **Tamagui**, and **Expo UI**).

---

## 1. Touch-First Guidelines & Boundaries

- **Minimum Touch Target**: Every interactive element (buttons, icons, checkboxes) MUST have a minimum hit target of `44x44px` (`min-h-[44px] min-w-[44px]`).
- **Dynamic Viewport Height**: NEVER use `h-screen`. Use `h-dvh` (dynamic viewport height) or `h-svh` (small viewport height) to prevent mobile browser URL bar jump.
- **Safe Area Insets**: Fixed headers and bottom action bars MUST respect `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.

---

## 2. Mobile Bottom Sheet / Drawer Pattern (`Vaul` / Radix Dialog)

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MobileFilterBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="md:hidden flex items-center gap-2 min-h-[44px] px-4 rounded-full"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>Filters</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-3xl bg-background p-6 shadow-2xl border-t pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            >
              {/* Drag Handle Indicator */}
              <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted-foreground/30" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Filter Results</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] min-w-[44px]"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-1" data-lenis-prevent>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['All', 'Design', 'Code', 'AI Tools', 'Mobile'].map((cat) => (
                      <button
                        key={cat}
                        className="px-3.5 py-2 rounded-full border text-xs font-medium min-h-[44px] hover:bg-accent active:scale-95 transition-all"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button onClick={() => setIsOpen(false)} className="w-full min-h-[44px] rounded-xl">
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 3. Mobile CSS Utilities Baseline

```css
/* Ensure mobile viewport respects notch and gesture bars */
.mobile-safe-bottom {
  padding-bottom: env(safe-area-inset-bottom, 16px);
}
.mobile-safe-top {
  padding-top: env(safe-area-inset-top, 16px);
}

/* Prevent double-tap zoom delay on mobile buttons */
button, a {
  touch-action: manipulation;
}
```

---

## Best Practices

1. **Touch Feedback**: Add active feedback (`active:scale-95` or `active:bg-accent`) for every touch interaction.
2. **Prevent Overflow**: Set `overflow-x-hidden` on top-level layout containers to prevent unintended horizontal swipe jank on iOS Safari.
