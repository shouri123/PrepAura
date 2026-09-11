---
name: charts-data-viz
description: Production data visualization using Recharts, Nivo, VisX, and shadcn chart components. Use when building analytics dashboards, line charts, area charts, bar charts, pie/donut charts, radar charts, and interactive KPI metrics.
---

# Charts & Data Visualization

This skill provides patterns for building accessible, responsive, animated data visualization components in React using **Recharts**, **shadcn/ui Charts**, **Nivo**, and **VisX**.

---

## Technical Stack & Packages

```bash
# Core Recharts & shadcn chart utilities
npm install recharts lucide-react clsx tailwind-merge
```

---

## 1. Responsive Area Chart with Gradients & Tooltips

```tsx
'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DataPoint {
  date: string;
  revenue: number;
  expenses: number;
}

const sampleData: DataPoint[] = [
  { date: 'Jan', revenue: 12400, expenses: 8200 },
  { date: 'Feb', revenue: 15800, expenses: 9400 },
  { date: 'Mar', revenue: 18900, expenses: 10100 },
  { date: 'Apr', revenue: 22400, expenses: 11500 },
  { date: 'May', revenue: 28900, expenses: 13200 },
  { date: 'Jun', revenue: 34500, expenses: 14800 },
];

export function RevenueAreaChart() {
  return (
    <div className="w-full h-80 p-4 border rounded-xl bg-card shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold">Revenue Growth</h3>
          <p className="text-xs text-muted-foreground">Monthly revenue vs expenses (USD)</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span>Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-purple-400" />
            <span>Expenses</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={sampleData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#c084fc" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#c084fc" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
          <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" tickFormatter={(v) => `$${v / 1000}k`} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-popover p-2.5 shadow-md text-xs space-y-1">
                    <p className="font-medium">{payload[0].payload.date}</p>
                    <p className="text-primary">Revenue: ${payload[0].value?.toLocaleString()}</p>
                    <p className="text-purple-400">Expenses: ${payload[1].value?.toLocaleString()}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
          <Area type="monotone" dataKey="expenses" stroke="#c084fc" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
```

---

## 2. Interactive Donut / Pie Chart with Legend

```tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const categoryData = [
  { name: 'SaaS Subscriptions', value: 45, color: '#3b82f6' },
  { name: 'Enterprise License', value: 30, color: '#a855f7' },
  { name: 'Professional Services', value: 15, color: '#ec4899' },
  { name: 'API Usage', value: 10, color: '#10b981' },
];

export function RevenueBreakdownDonut() {
  return (
    <div className="w-full max-w-md p-4 border rounded-xl bg-card shadow-sm">
      <h3 className="text-base font-semibold mb-1">Revenue Share</h3>
      <p className="text-xs text-muted-foreground mb-4">Breakdown by product tier</p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              innerRadius={65}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-popover p-2 shadow-md text-xs">
                      <span className="font-medium" style={{ color: data.color }}>
                        {data.name}: {data.value}%
                      </span>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t text-xs">
        {categoryData.map((cat) => (
          <div key={cat.name} className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: cat.color }} />
            <span className="truncate text-muted-foreground">{cat.name}</span>
            <span className="ml-auto font-medium">{cat.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Best Practices

1. **Responsive Container**: Always wrap Recharts inside `<ResponsiveContainer width="100%" height="100%">` and provide a defined height on parent wrappers.
2. **Color Tokens**: Map chart colors to CSS theme variables (`var(--primary)`, `var(--muted-foreground)`) so charts auto-adapt to dark mode.
3. **Accessibility**: Add screen-reader data summaries or fallback tables for complex charts.
