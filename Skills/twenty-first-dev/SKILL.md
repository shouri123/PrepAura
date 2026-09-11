---
name: twenty-first-dev
description: AI-first component ecosystem and registry platform (21st.dev). Use when searching, requesting, or installing modern React UI components, AI prompts, and shadcn-compatible design blocks using npx 21st or AI-assisted component generation.
---

# 21st.dev AI Component Ecosystem

[21st.dev](https://github.com/21st-dev/21st) is an open-source, AI-first component ecosystem (`21st.dev`). Built specifically for AI-assisted development (Antigravity, Cursor, Claude Code), 21st.dev allows developers to search, copy AI-optimized prompts, and install modular React components using standard `shadcn` registry specs.

---

## 1. CLI Commands & Workflow

```bash
# Search and install components directly using 21st CLI
npx 21st@latest add <component-name>

# Install components via standard shadcn CLI pointing to 21st registry
npx shadcn@latest add https://21st.dev/r/<author>/<component-name>.json
```

---

## 2. Typical 21st.dev Component Integrations

Components published on 21st.dev use TypeScript, Tailwind CSS, Framer Motion (`motion/react`), and Radix UI primitives.

### Example: AI Prompt Card with Interactive Code Copy & Regenerate

```tsx
'use client';

import { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface AIPromptCardProps {
  promptText: string;
  onRegenerate?: () => void;
}

export function AIPromptCard({ promptText, onRegenerate }: AIPromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="relative border-muted-foreground/20 bg-background/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          AI Prompt
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={handleCopy} className="h-8 w-8">
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground font-mono bg-muted/50 p-3 rounded-lg border">
          {promptText}
        </p>
      </CardContent>
      {onRegenerate && (
        <CardFooter className="pt-0">
          <Button variant="outline" size="sm" onClick={onRegenerate} className="w-full text-xs">
            <RefreshCw className="mr-2 h-3.5 w-3.5" /> Regenerate Prompt
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
```

---

## 3. Best Practices for AI-Assisted UI Integration

1. **Registry Standard**: Treat 21st.dev components like `shadcn` components. They belong inside `components/ui/` or `components/blocks/`.
2. **Tailwind Class Safety**: Ensure all required keyframes or plugins specified in 21st.dev component docs are defined in `tailwind.config.js`.
3. **No Unneeded Dependencies**: Avoid introducing extra UI frameworks when a single Radix primitive or standard React hook handles the component state.
