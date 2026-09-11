---
name: origin-ui
description: Production-ready Tailwind CSS and React component collection for dashboards, SaaS input controls, switches, sliders, select controls, and micro-interactions. Use when building complex forms, admin panels, settings pages, and interactive SaaS control inputs.
---

# Origin UI

[Origin UI](https://github.com/origin-space/originui) is an open-source, copy-and-paste collection of production-grade React components built with **Tailwind CSS** and **Radix UI** (`originui.com`). It specializes in micro-interactions, complex form inputs, customized switches, sliders, multi-selects, tabs, and dashboard metrics.

---

## Foundational Utilities

Origin UI components integrate with standard `shadcn/ui` projects and require Radix primitives alongside Tailwind merge utilities:

```bash
npm install clsx tailwind-merge lucide-react @radix-ui/react-slider @radix-ui/react-switch @radix-ui/react-popover @radix-ui/react-tooltip
```

---

## 1. Production Form & SaaS Components

### A. Password Input with Strength Meter & Show/Hide Toggle

```tsx
'use client';

import { useState, useId } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PasswordInputWithStrength() {
  const id = useId();
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
      { regex: /[^A-Za-z0-9]/, text: 'At least 1 special character' },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(password);
  const score = strength.filter((req) => req.met).length;

  return (
    <div className="space-y-3 max-w-sm">
      <Label htmlFor={id}>Password</Label>
      <div className="relative">
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="pr-10"
          placeholder="Enter password..."
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {/* Strength Meter Bar */}
      <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-secondary">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-colors duration-300 ${
              i < score
                ? score <= 2
                  ? 'bg-red-500'
                  : score <= 4
                  ? 'bg-amber-500'
                  : 'bg-emerald-500'
                : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* Requirement List */}
      <ul className="space-y-1 text-xs">
        {strength.map((req, index) => (
          <li key={index} className="flex items-center gap-1.5">
            {req.met ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <X className="h-3.5 w-3.5 text-muted-foreground/60" />
            )}
            <span className={req.met ? 'text-foreground' : 'text-muted-foreground'}>
              {req.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

### B. Number Input with Stepper Buttons

```tsx
'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function StepperNumberInput({
  min = 1,
  max = 99,
  defaultValue = 1,
}: {
  min?: number;
  max?: number;
  defaultValue?: number;
}) {
  const [value, setValue] = useState(defaultValue);

  const increment = () => setValue((v) => Math.min(max, v + 1));
  const decrement = () => setValue((v) => Math.max(min, v - 1));

  return (
    <div className="flex items-center space-x-1 border rounded-lg p-1 w-fit bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={decrement}
        disabled={value <= min}
        className="h-8 w-8 rounded-md"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="h-8 w-14 text-center border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-0"
      />
      <Button
        variant="ghost"
        size="icon"
        onClick={increment}
        disabled={value >= max}
        className="h-8 w-8 rounded-md"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

---

### C. Customized Dual-Range Slider

```tsx
'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import { useState } from 'react';

export function DualRangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-4 max-w-sm">
      <div className="flex justify-between text-sm font-medium">
        <span>Min: ${range[0]}</span>
        <span>Max: ${range[1]}</span>
      </div>
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        value={range}
        onValueChange={setRange}
        max={100}
        step={1}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
        <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  );
}
```

---

## 2. Origin UI Component Categories

| Category | Typical Components |
| :--- | :--- |
| **Inputs** | Password strength meter, Stepper numbers, Tag inputs, Input with search clear button, Floating labels |
| **Selects & Comboboxes** | Multi-select with badge removable pills, Custom dropdowns with icons |
| **Switches & Toggles** | Icon switches, Animated theme toggles, Status toggle buttons |
| **Sliders** | Single/Dual range sliders with tick marks, Dynamic tooltip values |
| **Modals & Dialogs** | Confirmation dialogs with double action verification |

---

## Best Practices

- **Copy-Paste Philosophy**: Visit `originui.com`, pick the exact input or switch component variant needed, and paste into `components/ui/` or form features.
- **Accessibility**: Origin UI controls retain native keyboard focus states and standard ARIA attributes (`aria-expanded`, `aria-label`).
