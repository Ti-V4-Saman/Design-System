> **⚠️ Historical / superseded.** This plan was drafted independently while a
> parallel branch was already building the chart family. The **shipped**
> implementation (commit `f20c7a7`) uses a more refined architecture than the one
> below: a `series: ChartSeries[]` object API with role-based colors, a shared
> `common.tsx` (`buildConfig`, `resolveColor`, `ChartState`) instead of the
> separate `chart-card`/`chart-empty`/`chart-skeleton`/`makeChartConfig` proposed
> here, and page-local `ChartDemo` framing instead of `ChartCard`. Only the
> **Heatmap** (Task 13) was carried forward and implemented on top of the shipped
> conventions (commit `07a0c5c`). Keep this doc as a design reference; do not
> execute it verbatim against the current code.

# CRM V4 Charts System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable family of chart components for CRM V4, styled entirely by the design-system tokens, with a full styleguide showcase.

**Architecture:** shadcn Chart (`components/ui/chart.tsx`, a thin Recharts wrapper) is the technical foundation. On top of it live thin, controlled wrapper components in `components/charts/` — each receives `data` + a shadcn `ChartConfig` and renders one Recharts chart inside `ChartContainer`. Shared framing/empty/loading live alongside. A styleguide page demonstrates every variant, both themes, and all states.

**Tech Stack:** Next.js 16 (App Router, RSC) · React 19 · TypeScript 5 · Tailwind CSS v4 · shadcn/ui (radix-nova) · Recharts 3.8.0 · lucide-react.

## Global Constraints

- Never hardcode colors. Reference tokens only: series colors via `var(--chart-1..5)` / `var(--color-<key>)` (shadcn ChartContainer maps config `color` to `--color-<key>`); framing via Tailwind semantic classes (`bg-card`, `text-muted-foreground`, `border-border`).
- **No blue as a primary chart color.** `--chart-1` (green) is always the primary series.
- Shadows use the arbitrary-value pattern already established in this repo: `shadow-[var(--shadow-card)]`, `shadow-[var(--shadow-dropdown)]`. There is **no** `shadow-card` utility class.
- Every chart wrapper file starts with `"use client"` (Recharts + hooks).
- Reference tokens through the existing `cn()` helper (`@/lib/utils`) for class merging.
- Validation for every task: `npm run build` must pass (typecheck + build), `npm run lint` must pass, and the change must render correctly in the styleguide in **both** light and dark mode. There is no unit-test runner in this repo; pure-logic helpers get a temporary inline node assertion as noted per-task.
- Register any new styleguide page in `app/styleguide/navigation.ts` under the Components section.
- Radix/shadcn primitives, accessibility (`accessibilityLayer` on Recharts charts), and TypeScript prop APIs are preserved; only visuals are owned by the design system.

---

## File Structure

Created:
- `components/ui/chart.tsx` — shadcn base (installed via CLI): `ChartContainer`, `ChartTooltip`, `ChartTooltipContent`, `ChartLegend`, `ChartLegendContent`, `type ChartConfig`, `useChart`.
- `components/charts/palette.ts` — `CHART_SERIES`, `chartColor`, `seriesColor()`, `makeChartConfig()`.
- `components/charts/chart-empty.tsx` — `ChartEmpty`.
- `components/charts/chart-skeleton.tsx` — `ChartSkeleton`.
- `components/charts/chart-card.tsx` — `ChartCard`.
- `components/charts/line-chart.tsx` — `LineChart`.
- `components/charts/area-chart.tsx` — `AreaChart`.
- `components/charts/bar-chart.tsx` — `BarChart`.
- `components/charts/pie-chart.tsx` — `PieChart`.
- `components/charts/sparkline.tsx` — `Sparkline`.
- `components/charts/kpi-trend.tsx` — `KpiTrendChart`, `formatDelta()`.
- `components/charts/funnel-chart.tsx` — `FunnelChart`.
- `components/charts/radar-chart.tsx` — `RadarChart`.
- `components/charts/heatmap.tsx` — `Heatmap`, `intensity()`.
- `components/charts/index.ts` — barrel export.
- `app/styleguide/components/charts/page.tsx` — showcase.
- `app/styleguide/components/charts/data.ts` — demo CRM datasets + configs used by the page.

Modified:
- `app/styleguide/navigation.ts` — add "Charts" nav item.
- `package.json` / `package-lock.json` — Recharts dependency (added by shadcn CLI in Task 1).

---

# PHASE 1 — Foundation + Cartesian charts

## Task 1: Install shadcn Chart + palette foundation

**Files:**
- Create: `components/ui/chart.tsx` (via CLI)
- Create: `components/charts/palette.ts`
- Create: `components/charts/index.ts`
- Modify: `package.json`, `package-lock.json` (CLI adds `recharts@3.8.0`)

**Interfaces:**
- Consumes: `ChartConfig` type from `@/components/ui/chart` (installed this task).
- Produces:
  - `CHART_SERIES: readonly string[]` — ordered default series colors.
  - `chartColor: { primary; secondary; success; warning; danger; neutral }` — each a `var(--chart-N)` string.
  - `seriesColor(index: number): string` — index into `CHART_SERIES`, wrapping.
  - `makeChartConfig(series: { key: string; label: string; color?: string }[]): ChartConfig`.

- [ ] **Step 1: Install the shadcn chart component**

Run: `npx shadcn@latest add chart`
Expected: creates `components/ui/chart.tsx`, adds `recharts@3.8.0` to `package.json`. If the CLI prompts to overwrite, decline overwriting anything other than the new `chart.tsx`.

- [ ] **Step 2: Verify the install**

Run: `test -f components/ui/chart.tsx && grep -q "ChartContainer" components/ui/chart.tsx && grep recharts package.json`
Expected: prints the recharts line; no error. Confirms `chart.tsx` exists and exports `ChartContainer`.

- [ ] **Step 3: Create the palette**

Create `components/charts/palette.ts`:

```ts
import type { ChartConfig } from "@/components/ui/chart"

/**
 * Ordered default series palette. Uses the design-system chart tokens so
 * light/dark switch automatically. chart-1 (green) is always primary; blue is
 * never used.
 */
export const CHART_SERIES = [
  "var(--chart-1)", // primary — green
  "var(--chart-2)", // secondary — light green
  "var(--chart-3)", // warning — yellow
  "var(--chart-4)", // danger — red
  "var(--chart-5)", // neutral — gray
] as const

/** Semantic color aliases for single-purpose series. */
export const chartColor = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  success: "var(--chart-1)",
  warning: "var(--chart-3)",
  danger: "var(--chart-4)",
  neutral: "var(--chart-5)",
} as const

/** Nth series color, wrapping past the palette length. */
export function seriesColor(index: number): string {
  return CHART_SERIES[index % CHART_SERIES.length]
}

/** Build a shadcn ChartConfig, auto-assigning on-brand colors by order. */
export function makeChartConfig(
  series: { key: string; label: string; color?: string }[]
): ChartConfig {
  return series.reduce<ChartConfig>((acc, s, i) => {
    acc[s.key] = { label: s.label, color: s.color ?? seriesColor(i) }
    return acc
  }, {})
}
```

- [ ] **Step 4: Create the barrel export**

Create `components/charts/index.ts`:

```ts
export * from "./palette"
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 6: Commit**

```bash
git add components/ui/chart.tsx components/charts/palette.ts components/charts/index.ts package.json package-lock.json
git commit -m "feat(charts): add shadcn chart base + semantic palette"
```

---

## Task 2: Shared states — ChartEmpty, ChartSkeleton, ChartCard

**Files:**
- Create: `components/charts/chart-empty.tsx`
- Create: `components/charts/chart-skeleton.tsx`
- Create: `components/charts/chart-card.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Skeleton` from `@/components/ui/skeleton`; `Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent` from `@/components/ui/card`; `cn` from `@/lib/utils`.
- Produces:
  - `ChartEmpty({ message?, icon?, className? })`.
  - `ChartSkeleton({ variant?: "line" | "bar" | "pie", className? })`.
  - `ChartCard({ title?, description?, actions?, className?, contentClassName?, children })`.

- [ ] **Step 1: Create ChartEmpty**

Create `components/charts/chart-empty.tsx`:

```tsx
import * as React from "react"
import { ChartColumnBig } from "lucide-react"

import { cn } from "@/lib/utils"

export function ChartEmpty({
  message = "Sem dados para exibir",
  icon,
  className,
}: {
  message?: string
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex h-64 min-h-48 w-full flex-col items-center justify-center gap-2 text-center",
        className
      )}
    >
      <span className="text-muted-foreground/50">
        {icon ?? <ChartColumnBig className="size-8" />}
      </span>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}
```

- [ ] **Step 2: Create ChartSkeleton**

Create `components/charts/chart-skeleton.tsx`:

```tsx
import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ChartSkeleton({
  variant = "bar",
  className,
}: {
  variant?: "line" | "bar" | "pie"
  className?: string
}) {
  if (variant === "pie") {
    return (
      <div
        className={cn(
          "flex h-64 min-h-48 w-full items-center justify-center",
          className
        )}
      >
        <Skeleton className="size-40 rounded-full" />
      </div>
    )
  }

  const bars = [58, 82, 44, 90, 68, 52, 84]
  return (
    <div
      className={cn(
        "flex h-64 min-h-48 w-full items-end gap-3 p-2",
        className
      )}
    >
      {bars.map((h, i) => (
        <Skeleton
          key={i}
          className={cn("flex-1", variant === "line" ? "rounded-md" : "rounded-t-md")}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Create ChartCard**

Create `components/charts/chart-card.tsx`:

```tsx
import * as React from "react"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ChartCard({
  title,
  description,
  actions,
  className,
  contentClassName,
  children,
}: {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  contentClassName?: string
  children: React.ReactNode
}) {
  const hasHeader = title || description || actions
  return (
    <Card className={cn("shadow-[var(--shadow-card)]", className)}>
      {hasHeader && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
          {actions && <CardAction>{actions}</CardAction>}
        </CardHeader>
      )}
      <CardContent className={cn(contentClassName)}>{children}</CardContent>
    </Card>
  )
}
```

- [ ] **Step 4: Export the new components**

Replace `components/charts/index.ts` with:

```ts
export * from "./palette"
export * from "./chart-empty"
export * from "./chart-skeleton"
export * from "./chart-card"
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 6: Commit**

```bash
git add components/charts/chart-empty.tsx components/charts/chart-skeleton.tsx components/charts/chart-card.tsx components/charts/index.ts
git commit -m "feat(charts): add ChartCard, ChartEmpty, ChartSkeleton"
```

---

## Task 3: LineChart

**Files:**
- Create: `components/charts/line-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig` from `@/components/ui/chart`; `ChartEmpty`, `ChartSkeleton`; `cn`.
- Produces: `LineChart(props: LineChartProps)`. `LineChartProps` = `{ data: Record<string, unknown>[]; config: ChartConfig; series: string[]; xKey: string; loading?: boolean; showLegend?: boolean; showGrid?: boolean; showTooltip?: boolean; className?: string; emptyMessage?: string }`. Multi-series is expressed by passing more than one key in `series`.

- [ ] **Step 1: Create the component**

Create `components/charts/line-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart as RLineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"

export interface LineChartProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  series: string[]
  xKey: string
  loading?: boolean
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function LineChart({
  data,
  config,
  series,
  xKey,
  loading = false,
  showLegend = false,
  showGrid = true,
  showTooltip = true,
  className,
  emptyMessage,
}: LineChartProps) {
  if (loading) return <ChartSkeleton variant="line" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-64 w-full", className)}>
      <RLineChart accessibilityLayer data={data} margin={{ left: 12, right: 12, top: 8 }}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((key) => (
          <Line
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RLineChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./line-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean. (Visual verification happens in Task 6 once the showcase page renders it.)

- [ ] **Step 4: Commit**

```bash
git add components/charts/line-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add LineChart"
```

---

## Task 4: AreaChart

**Files:**
- Create: `components/charts/area-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: same chart primitives as Task 3, plus `Area, AreaChart as RAreaChart` from recharts; `React.useId`.
- Produces: `AreaChart(props: AreaChartProps)`. `AreaChartProps` = `LineChartProps` shape **plus** `stacked?: boolean`.

- [ ] **Step 1: Create the component**

Create `components/charts/area-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { Area, AreaChart as RAreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"

export interface AreaChartProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  series: string[]
  xKey: string
  stacked?: boolean
  loading?: boolean
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function AreaChart({
  data,
  config,
  series,
  xKey,
  stacked = false,
  loading = false,
  showLegend = false,
  showGrid = true,
  showTooltip = true,
  className,
  emptyMessage,
}: AreaChartProps) {
  const uid = React.useId().replace(/:/g, "")
  if (loading) return <ChartSkeleton variant="line" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-64 w-full", className)}>
      <RAreaChart accessibilityLayer data={data} margin={{ left: 12, right: 12, top: 8 }}>
        <defs>
          {series.map((key) => (
            <linearGradient key={key} id={`${uid}-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.3} />
              <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis tickLine={false} axisLine={false} width={40} />
        {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((key) => (
          <Area
            key={key}
            dataKey={key}
            type="monotone"
            stroke={`var(--color-${key})`}
            fill={`url(#${uid}-${key})`}
            strokeWidth={2}
            stackId={stacked ? "a" : undefined}
          />
        ))}
      </RAreaChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./area-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/area-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add AreaChart"
```

---

## Task 5: BarChart (vertical / horizontal / stacked / multi-series)

**Files:**
- Create: `components/charts/bar-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Bar, BarChart as RBarChart, CartesianGrid, XAxis, YAxis` from recharts + chart primitives.
- Produces: `BarChart(props: BarChartProps)`. `BarChartProps` = `{ data; config; series: string[]; xKey: string; orientation?: "vertical" | "horizontal"; stacked?: boolean; loading?; showLegend?; showGrid?; showTooltip?; className?; emptyMessage? }`. `orientation="vertical"` (default) = upright bars (category on X). `orientation="horizontal"` = bars extend rightward (category on Y).

- [ ] **Step 1: Create the component**

Create `components/charts/bar-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { Bar, BarChart as RBarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"

export interface BarChartProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  series: string[]
  xKey: string
  orientation?: "vertical" | "horizontal"
  stacked?: boolean
  loading?: boolean
  showLegend?: boolean
  showGrid?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function BarChart({
  data,
  config,
  series,
  xKey,
  orientation = "vertical",
  stacked = false,
  loading = false,
  showLegend = false,
  showGrid = true,
  showTooltip = true,
  className,
  emptyMessage,
}: BarChartProps) {
  if (loading) return <ChartSkeleton variant="bar" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  const horizontal = orientation === "horizontal"

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-64 w-full", className)}>
      <RBarChart
        accessibilityLayer
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ left: 12, right: 12, top: 8 }}
      >
        {showGrid && (
          <CartesianGrid vertical={horizontal} horizontal={!horizontal} />
        )}
        {horizontal ? (
          <>
            <XAxis type="number" tickLine={false} axisLine={false} />
            <YAxis
              type="category"
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              width={90}
            />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={40} />
          </>
        )}
        {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((key) => (
          <Bar
            key={key}
            dataKey={key}
            fill={`var(--color-${key})`}
            radius={stacked ? 0 : 4}
            stackId={stacked ? "a" : undefined}
          />
        ))}
      </RBarChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./bar-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/bar-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add BarChart (vertical/horizontal/stacked)"
```

---

## Task 6: Styleguide — demo data + Phase 1 showcase + navigation

**Files:**
- Create: `app/styleguide/components/charts/data.ts`
- Create: `app/styleguide/components/charts/page.tsx`
- Modify: `app/styleguide/navigation.ts`

**Interfaces:**
- Consumes: `LineChart, AreaChart, BarChart, ChartCard, makeChartConfig` from `@/components/charts`.
- Produces: the `/styleguide/components/charts` route with Phase-1 sections. Later tasks append to `page.tsx` and `data.ts`.

- [ ] **Step 1: Create demo CRM datasets**

Create `app/styleguide/components/charts/data.ts`:

```ts
import { makeChartConfig } from "@/components/charts"

/** MRR + churn over 6 months (Line / Area / Multi-series). */
export const revenueData = [
  { month: "Jan", mrr: 42000, churn: 3200 },
  { month: "Fev", mrr: 45800, churn: 2900 },
  { month: "Mar", mrr: 49100, churn: 3400 },
  { month: "Abr", mrr: 53200, churn: 3100 },
  { month: "Mai", mrr: 58600, churn: 2700 },
  { month: "Jun", mrr: 63400, churn: 2500 },
]
export const revenueConfig = makeChartConfig([
  { key: "mrr", label: "MRR (R$)" },
  { key: "churn", label: "Churn (R$)", color: "var(--chart-4)" },
])

/** Deals won vs lost per month (Bar / Stacked). */
export const dealsData = [
  { month: "Jan", won: 18, lost: 7 },
  { month: "Fev", won: 22, lost: 9 },
  { month: "Mar", won: 26, lost: 6 },
  { month: "Abr", won: 24, lost: 8 },
  { month: "Mai", won: 30, lost: 5 },
  { month: "Jun", won: 34, lost: 7 },
]
export const dealsConfig = makeChartConfig([
  { key: "won", label: "Ganhos", color: "var(--chart-1)" },
  { key: "lost", label: "Perdidos", color: "var(--chart-4)" },
])

/** Leads by acquisition source (Horizontal Bar). */
export const leadsBySourceData = [
  { source: "Indicação", leads: 320 },
  { source: "Orgânico", leads: 280 },
  { source: "Paid Ads", leads: 210 },
  { source: "Eventos", leads: 140 },
  { source: "Outbound", leads: 95 },
]
export const leadsBySourceConfig = makeChartConfig([
  { key: "leads", label: "Leads" },
])
```

- [ ] **Step 2: Create the showcase page with local presentation helpers + Phase 1 sections**

Create `app/styleguide/components/charts/page.tsx`:

```tsx
"use client"

import * as React from "react"

import { AreaChart, BarChart, ChartCard, LineChart } from "@/components/charts"

import {
  dealsConfig,
  dealsData,
  leadsBySourceConfig,
  leadsBySourceData,
  revenueConfig,
  revenueData,
} from "./data"

/* ---------- page-local presentation helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-5 md:grid-cols-2">{children}</div>
}

/* ---------- page ---------- */

export default function ChartsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
        <p className="max-w-2xl text-muted-foreground">
          Família de gráficos do CRM V4. Todas as séries usam a paleta semântica
          (verde primário, warning, danger, neutros) via tokens — troca de tema
          automática. Use o alternador de tema para ver em dark mode.
        </p>
      </header>

      <Section
        title="Line Chart"
        description="Evolução de MRR ao longo do tempo. Multi-série adiciona churn."
      >
        <Grid>
          <ChartCard title="MRR" description="Jan – Jun 2026">
            <LineChart data={revenueData} config={revenueConfig} series={["mrr"]} xKey="month" />
          </ChartCard>
          <ChartCard title="MRR vs Churn" description="Multi-série com legenda">
            <LineChart
              data={revenueData}
              config={revenueConfig}
              series={["mrr", "churn"]}
              xKey="month"
              showLegend
            />
          </ChartCard>
        </Grid>
      </Section>

      <Section
        title="Area Chart"
        description="Mesma série com preenchimento em gradiente; variante empilhada soma as séries."
      >
        <Grid>
          <ChartCard title="MRR (área)" description="Gradiente on-brand">
            <AreaChart data={revenueData} config={revenueConfig} series={["mrr"]} xKey="month" />
          </ChartCard>
          <ChartCard title="MRR + Churn (empilhado)" description="stacked">
            <AreaChart
              data={revenueData}
              config={revenueConfig}
              series={["mrr", "churn"]}
              xKey="month"
              stacked
              showLegend
            />
          </ChartCard>
        </Grid>
      </Section>

      <Section
        title="Bar Chart"
        description="Vertical, horizontal e empilhado — deals e leads."
      >
        <Grid>
          <ChartCard title="Deals ganhos" description="Barras verticais">
            <BarChart data={dealsData} config={dealsConfig} series={["won"]} xKey="month" />
          </ChartCard>
          <ChartCard title="Ganhos vs Perdidos" description="Empilhado">
            <BarChart
              data={dealsData}
              config={dealsConfig}
              series={["won", "lost"]}
              xKey="month"
              stacked
              showLegend
            />
          </ChartCard>
          <ChartCard title="Leads por origem" description="Barras horizontais">
            <BarChart
              data={leadsBySourceData}
              config={leadsBySourceConfig}
              series={["leads"]}
              xKey="source"
              orientation="horizontal"
            />
          </ChartCard>
        </Grid>
      </Section>

      <Section
        title="Estados"
        description="Carregamento e vazio — disponíveis em todos os gráficos via props loading / data vazio."
      >
        <Grid>
          <ChartCard title="Loading" description="loading">
            <BarChart data={dealsData} config={dealsConfig} series={["won"]} xKey="month" loading />
          </ChartCard>
          <ChartCard title="Empty" description="data = []">
            <BarChart data={[]} config={dealsConfig} series={["won"]} xKey="month" />
          </ChartCard>
        </Grid>
      </Section>
    </div>
  )
}
```

- [ ] **Step 3: Register the navigation entry**

In `app/styleguide/navigation.ts`, add a Charts item to the Components `items` array, keeping alphabetical order (after Calendar, before Survey):

```ts
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Charts", href: "/styleguide/components/charts" },
      { name: "Survey", href: "/styleguide/components/survey" },
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 5: Visual verification (both themes)**

Run: `npm run dev` and open `http://localhost:3000/styleguide/components/charts`.
Expected: Line/Area/Bar render with green primary series; tooltips appear on hover; legend toggles show; loading shows skeleton bars; empty shows the empty state. Toggle dark mode — colors and text stay legible, no hardcoded colors. Stop the dev server when done.

- [ ] **Step 6: Commit**

```bash
git add app/styleguide/components/charts/data.ts app/styleguide/components/charts/page.tsx app/styleguide/navigation.ts
git commit -m "feat(charts): add styleguide showcase (Phase 1) + navigation"
```

---

# PHASE 2 — Circular + micro charts

## Task 7: PieChart (+ donut with center label)

**Files:**
- Create: `components/charts/pie-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Cell, Label, Pie, PieChart as RPieChart` from recharts + chart primitives; `ChartEmpty`, `ChartSkeleton`.
- Produces: `PieChart(props: PieChartProps)`. `PieChartProps` = `{ data: Record<string, unknown>[]; config: ChartConfig; dataKey: string; nameKey: string; variant?: "pie" | "donut"; centerLabel?: { value: string; caption?: string }; loading?; showLegend?; showTooltip?; className?; emptyMessage? }`. Slice colors resolve from `var(--color-<nameKeyValue>)` — the passed `config` must be keyed by the `nameKey` values.

- [ ] **Step 1: Create the component**

Create `components/charts/pie-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart as RPieChart } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"

export interface PieChartProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  dataKey: string
  nameKey: string
  variant?: "pie" | "donut"
  centerLabel?: { value: string; caption?: string }
  loading?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function PieChart({
  data,
  config,
  dataKey,
  nameKey,
  variant = "pie",
  centerLabel,
  loading = false,
  showLegend = true,
  showTooltip = true,
  className,
  emptyMessage,
}: PieChartProps) {
  if (loading) return <ChartSkeleton variant="pie" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  const isDonut = variant === "donut"

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto aspect-square h-64 w-full", className)}
    >
      <RPieChart>
        {showTooltip && (
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        )}
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={isDonut ? 60 : 0}
          strokeWidth={2}
        >
          {data.map((entry, i) => (
            <Cell key={i} fill={`var(--color-${String(entry[nameKey])})`} />
          ))}
          {isDonut && centerLabel && (
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null
                const { cx, cy } = viewBox as { cx: number; cy: number }
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={cx}
                      y={cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {centerLabel.value}
                    </tspan>
                    {centerLabel.caption && (
                      <tspan
                        x={cx}
                        y={cy + 20}
                        className="fill-muted-foreground text-xs"
                      >
                        {centerLabel.caption}
                      </tspan>
                    )}
                  </text>
                )
              }}
            />
          )}
        </Pie>
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey={nameKey} />} />}
      </RPieChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./pie-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/pie-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add PieChart with donut variant"
```

---

## Task 8: Sparkline

**Files:**
- Create: `components/charts/sparkline.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Area, AreaChart as RAreaChart, Line, LineChart as RLineChart` from recharts; `ChartContainer`; `chartColor` from `./palette`.
- Produces: `Sparkline(props: SparklineProps)`. `SparklineProps` = `{ data: Record<string, unknown>[]; dataKey: string; color?: string; type?: "line" | "area"; strokeWidth?: number; className?: string }`. No axes, tooltip, or legend — a compact inline trend.

- [ ] **Step 1: Create the component**

Create `components/charts/sparkline.tsx`:

```tsx
"use client"

import * as React from "react"
import { Area, AreaChart as RAreaChart, Line, LineChart as RLineChart } from "recharts"

import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { chartColor } from "./palette"

export interface SparklineProps {
  data: Record<string, unknown>[]
  dataKey: string
  color?: string
  type?: "line" | "area"
  strokeWidth?: number
  className?: string
}

export function Sparkline({
  data,
  dataKey,
  color = chartColor.primary,
  type = "line",
  strokeWidth = 1.75,
  className,
}: SparklineProps) {
  const uid = React.useId().replace(/:/g, "")
  const config: ChartConfig = { [dataKey]: { label: dataKey, color } }
  const margin = { top: 2, bottom: 2, left: 0, right: 0 }

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-10 w-full", className)}>
      {type === "area" ? (
        <RAreaChart data={data} margin={margin}>
          <defs>
            <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${dataKey})`} stopOpacity={0.3} />
              <stop offset="95%" stopColor={`var(--color-${dataKey})`} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <Area
            dataKey={dataKey}
            type="monotone"
            stroke={`var(--color-${dataKey})`}
            fill={`url(#${uid})`}
            strokeWidth={strokeWidth}
            dot={false}
          />
        </RAreaChart>
      ) : (
        <RLineChart data={data} margin={margin}>
          <Line
            dataKey={dataKey}
            type="monotone"
            stroke={`var(--color-${dataKey})`}
            strokeWidth={strokeWidth}
            dot={false}
          />
        </RLineChart>
      )}
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./sparkline"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/sparkline.tsx components/charts/index.ts
git commit -m "feat(charts): add Sparkline"
```

---

## Task 9: KpiTrendChart (+ formatDelta helper)

**Files:**
- Create: `components/charts/kpi-trend.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Sparkline` (Task 8); `chartColor`; `ArrowDownRight, ArrowUpRight` from `lucide-react`; `cn`.
- Produces:
  - `formatDelta(n: number): string` — `12.4 → "+12.4%"`, `-3.2 → "-3.2%"`, `0 → "+0.0%"` (one decimal).
  - `KpiTrendChart(props: KpiTrendChartProps)`. `KpiTrendChartProps` = `{ label: string; value: string; delta?: number; data?: Record<string, unknown>[]; dataKey?: string; className?: string }`. Positive delta uses success token, negative uses danger token; optional sparkline below.

- [ ] **Step 1: Create the component**

Create `components/charts/kpi-trend.tsx`:

```tsx
"use client"

import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { chartColor } from "./palette"
import { Sparkline } from "./sparkline"

export function formatDelta(n: number): string {
  const sign = n >= 0 ? "+" : "-"
  return `${sign}${Math.abs(n).toFixed(1)}%`
}

export interface KpiTrendChartProps {
  label: string
  value: string
  delta?: number
  data?: Record<string, unknown>[]
  dataKey?: string
  className?: string
}

export function KpiTrendChart({
  label,
  value,
  delta,
  data,
  dataKey = "value",
  className,
}: KpiTrendChartProps) {
  const positive = (delta ?? 0) >= 0
  const deltaColor = positive ? chartColor.success : chartColor.danger

  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl bg-card p-5 ring-1 ring-foreground/10 shadow-[var(--shadow-card)]",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
        {delta !== undefined && (
          <span
            className="inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium"
            style={{
              color: deltaColor,
              backgroundColor: `color-mix(in oklab, ${deltaColor} 12%, transparent)`,
            }}
          >
            {positive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {formatDelta(delta)}
          </span>
        )}
      </div>
      {data && data.length > 0 && (
        <Sparkline
          data={data}
          dataKey={dataKey}
          type="area"
          color={deltaColor}
          className="h-12"
        />
      )}
    </div>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./kpi-trend"
```

- [ ] **Step 3: Verify the formatDelta logic (temporary node check)**

Run:
```bash
node -e "const s=(n)=>{const g=n>=0?'+':'-';return g+Math.abs(n).toFixed(1)+'%'}; console.assert(s(12.4)==='+12.4%','pos'); console.assert(s(-3.2)==='-3.2%','neg'); console.assert(s(0)==='+0.0%','zero'); console.log('formatDelta ok')"
```
Expected: prints `formatDelta ok` with no assertion errors. (This mirrors the exported `formatDelta`; the repo has no test runner, so this is a throwaway check — nothing to commit.)

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 5: Commit**

```bash
git add components/charts/kpi-trend.tsx components/charts/index.ts
git commit -m "feat(charts): add KpiTrendChart"
```

---

## Task 10: Styleguide — Phase 2 sections (Pie, Donut, Sparkline, KPI)

**Files:**
- Modify: `app/styleguide/components/charts/data.ts`
- Modify: `app/styleguide/components/charts/page.tsx`

**Interfaces:**
- Consumes: `PieChart, Sparkline, KpiTrendChart, ChartCard, makeChartConfig`.
- Produces: Phase-2 sections appended to the existing showcase.

- [ ] **Step 1: Append demo datasets**

Append to `app/styleguide/components/charts/data.ts`:

```ts
/** Deals by pipeline stage (Pie). Config keyed by stage name for slice colors. */
export const dealsByStageData = [
  { stage: "Prospecção", value: 48 },
  { stage: "Qualificação", value: 32 },
  { stage: "Proposta", value: 21 },
  { stage: "Negociação", value: 14 },
]
export const dealsByStageConfig = makeChartConfig([
  { key: "Prospecção", label: "Prospecção", color: "var(--chart-1)" },
  { key: "Qualificação", label: "Qualificação", color: "var(--chart-2)" },
  { key: "Proposta", label: "Proposta", color: "var(--chart-3)" },
  { key: "Negociação", label: "Negociação", color: "var(--chart-5)" },
])

/** Share by channel (Donut). */
export const channelShareData = [
  { channel: "Inbound", value: 44 },
  { channel: "Outbound", value: 31 },
  { channel: "Parcerias", value: 25 },
]
export const channelShareConfig = makeChartConfig([
  { key: "Inbound", label: "Inbound", color: "var(--chart-1)" },
  { key: "Outbound", label: "Outbound", color: "var(--chart-3)" },
  { key: "Parcerias", label: "Parcerias", color: "var(--chart-5)" },
])

/** Tiny conversion-rate trend (Sparkline / KPI). */
export const conversionTrend = [
  { value: 12 }, { value: 15 }, { value: 13 }, { value: 18 },
  { value: 21 }, { value: 19 }, { value: 24 }, { value: 27 },
]
export const churnTrend = [
  { value: 8 }, { value: 7 }, { value: 9 }, { value: 6 },
  { value: 5 }, { value: 6 }, { value: 4 }, { value: 4 },
]
```

- [ ] **Step 2: Wire the new imports into the page**

In `app/styleguide/components/charts/page.tsx`, update the two import blocks:

Replace the components import:
```tsx
import {
  AreaChart,
  BarChart,
  ChartCard,
  KpiTrendChart,
  LineChart,
  PieChart,
  Sparkline,
} from "@/components/charts"
```

Replace the data import:
```tsx
import {
  channelShareConfig,
  channelShareData,
  churnTrend,
  conversionTrend,
  dealsByStageConfig,
  dealsByStageData,
  dealsConfig,
  dealsData,
  leadsBySourceConfig,
  leadsBySourceData,
  revenueConfig,
  revenueData,
} from "./data"
```

- [ ] **Step 3: Append Phase 2 sections**

In `app/styleguide/components/charts/page.tsx`, add these sections immediately before the existing `"Estados"` section:

```tsx
      <Section
        title="KPI Trend"
        description="Cartões de indicador: valor, variação % (verde/vermelho) e sparkline."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <KpiTrendChart label="MRR" value="R$ 63.400" delta={8.2} data={conversionTrend} />
          <KpiTrendChart label="Novos leads" value="1.045" delta={12.4} data={conversionTrend} />
          <KpiTrendChart label="Churn" value="2.500" delta={-7.4} data={churnTrend} />
        </div>
      </Section>

      <Section
        title="Sparkline"
        description="Micro-tendência sem eixos, para uso inline em tabelas e cards."
      >
        <ChartCard title="Taxa de conversão" description="Últimas 8 semanas">
          <Sparkline data={conversionTrend} dataKey="value" type="area" className="h-16" />
        </ChartCard>
      </Section>

      <Section
        title="Pie & Donut"
        description="Distribuição por estágio (pizza) e share por canal (rosca com label central)."
      >
        <Grid>
          <ChartCard title="Deals por estágio" description="Pizza">
            <PieChart
              data={dealsByStageData}
              config={dealsByStageConfig}
              dataKey="value"
              nameKey="stage"
            />
          </ChartCard>
          <ChartCard title="Share por canal" description="Donut">
            <PieChart
              data={channelShareData}
              config={channelShareConfig}
              dataKey="value"
              nameKey="channel"
              variant="donut"
              centerLabel={{ value: "100%", caption: "canais" }}
            />
          </ChartCard>
        </Grid>
      </Section>
```

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 5: Visual verification (both themes)**

Run: `npm run dev` and open `/styleguide/components/charts`.
Expected: KPI cards show colored deltas + sparkline; pie slices use the on-brand palette; donut shows center label; legend labels resolve. Verify dark mode. Stop dev server.

- [ ] **Step 6: Commit**

```bash
git add app/styleguide/components/charts/data.ts app/styleguide/components/charts/page.tsx
git commit -m "feat(charts): add styleguide showcase (Phase 2)"
```

---

# PHASE 3 — Specialized charts

## Task 11: FunnelChart

**Files:**
- Create: `components/charts/funnel-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `Cell, Funnel, FunnelChart as RFunnelChart, LabelList` from recharts + `ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig`; `seriesColor` from `./palette`; `ChartEmpty`, `ChartSkeleton`.
- Produces: `FunnelChart(props: FunnelChartProps)`. `FunnelChartProps` = `{ data: Record<string, unknown>[]; config?: ChartConfig; dataKey: string; nameKey: string; loading?; showTooltip?; className?; emptyMessage? }`. Stage colors follow `seriesColor(index)` in palette order.

- [ ] **Step 1: Create the component**

Create `components/charts/funnel-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { Cell, Funnel, FunnelChart as RFunnelChart, LabelList } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"
import { seriesColor } from "./palette"

export interface FunnelChartProps {
  data: Record<string, unknown>[]
  config?: ChartConfig
  dataKey: string
  nameKey: string
  loading?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function FunnelChart({
  data,
  config = {},
  dataKey,
  nameKey,
  loading = false,
  showTooltip = true,
  className,
  emptyMessage,
}: FunnelChartProps) {
  if (loading) return <ChartSkeleton variant="bar" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  return (
    <ChartContainer config={config} className={cn("aspect-auto h-72 w-full", className)}>
      <RFunnelChart>
        {showTooltip && (
          <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} hideLabel />} />
        )}
        <Funnel dataKey={dataKey} data={data} isAnimationActive>
          <LabelList
            position="right"
            dataKey={nameKey}
            className="fill-foreground text-xs"
            stroke="none"
          />
          {data.map((_, i) => (
            <Cell key={i} fill={seriesColor(i)} />
          ))}
        </Funnel>
      </RFunnelChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./funnel-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/funnel-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add FunnelChart"
```

---

## Task 12: RadarChart

**Files:**
- Create: `components/charts/radar-chart.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `PolarAngleAxis, PolarGrid, Radar, RadarChart as RRadarChart` from recharts + chart primitives; `ChartEmpty`, `ChartSkeleton`.
- Produces: `RadarChart(props: RadarChartProps)`. `RadarChartProps` = `{ data: Record<string, unknown>[]; config: ChartConfig; series: string[]; angleKey: string; loading?; showLegend?; showTooltip?; className?; emptyMessage? }`.

- [ ] **Step 1: Create the component**

Create `components/charts/radar-chart.tsx`:

```tsx
"use client"

import * as React from "react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RRadarChart } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { ChartSkeleton } from "./chart-skeleton"

export interface RadarChartProps {
  data: Record<string, unknown>[]
  config: ChartConfig
  series: string[]
  angleKey: string
  loading?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  className?: string
  emptyMessage?: string
}

export function RadarChart({
  data,
  config,
  series,
  angleKey,
  loading = false,
  showLegend = false,
  showTooltip = true,
  className,
  emptyMessage,
}: RadarChartProps) {
  if (loading) return <ChartSkeleton variant="pie" className={className} />
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  return (
    <ChartContainer
      config={config}
      className={cn("mx-auto aspect-square h-64 w-full", className)}
    >
      <RRadarChart data={data}>
        {showTooltip && <ChartTooltip cursor={false} content={<ChartTooltipContent />} />}
        <PolarAngleAxis dataKey={angleKey} />
        <PolarGrid />
        {series.map((key) => (
          <Radar
            key={key}
            dataKey={key}
            stroke={`var(--color-${key})`}
            fill={`var(--color-${key})`}
            fillOpacity={0.4}
          />
        ))}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
      </RRadarChart>
    </ChartContainer>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./radar-chart"
```

- [ ] **Step 3: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 4: Commit**

```bash
git add components/charts/radar-chart.tsx components/charts/index.ts
git commit -m "feat(charts): add RadarChart"
```

---

## Task 13: Heatmap (+ intensity helper)

**Files:**
- Create: `components/charts/heatmap.tsx`
- Modify: `components/charts/index.ts`

**Interfaces:**
- Consumes: `chartColor` from `./palette`; `ChartEmpty`; `cn`.
- Produces:
  - `intensity(value: number, max: number): number` — `max <= 0 → 0`; otherwise `clamp(value/max, 0, 1)`.
  - `Heatmap(props: HeatmapProps)`. `HeatmapProps` = `{ data: { x: string | number; y: string | number; value: number }[]; xLabels: (string | number)[]; yLabels: (string | number)[]; max?: number; colorToken?: string; formatValue?: (v: number) => string; loading?: boolean; emptyMessage?: string; className?: string }`. Custom CSS grid — no Recharts. Cell tint = `color-mix` of `colorToken` (default primary) by intensity percent.

- [ ] **Step 1: Create the component**

Create `components/charts/heatmap.tsx`:

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { ChartEmpty } from "./chart-empty"
import { chartColor } from "./palette"

export function intensity(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, value / max))
}

export interface HeatmapProps {
  data: { x: string | number; y: string | number; value: number }[]
  xLabels: (string | number)[]
  yLabels: (string | number)[]
  max?: number
  colorToken?: string
  formatValue?: (v: number) => string
  loading?: boolean
  emptyMessage?: string
  className?: string
}

export function Heatmap({
  data,
  xLabels,
  yLabels,
  max,
  colorToken = chartColor.primary,
  formatValue = (v) => String(v),
  loading = false,
  emptyMessage,
  className,
}: HeatmapProps) {
  if (loading) {
    return (
      <div className={cn("h-64 w-full animate-pulse rounded-md bg-muted", className)} />
    )
  }
  if (!data.length) return <ChartEmpty message={emptyMessage} className={className} />

  const lookup = new Map<string, number>()
  for (const d of data) lookup.set(`${d.x}|${d.y}`, d.value)
  const computedMax = max ?? Math.max(...data.map((d) => d.value), 0)

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `auto repeat(${xLabels.length}, minmax(2rem, 1fr))` }}
      >
        <div />
        {xLabels.map((x) => (
          <div key={`h-${x}`} className="pb-1 text-center text-[11px] text-muted-foreground">
            {x}
          </div>
        ))}

        {yLabels.map((y) => (
          <React.Fragment key={`row-${y}`}>
            <div className="flex items-center pr-2 text-[11px] text-muted-foreground">{y}</div>
            {xLabels.map((x) => {
              const value = lookup.get(`${x}|${y}`) ?? 0
              const t = intensity(value, computedMax)
              const pct = Math.round(t * 100)
              return (
                <div
                  key={`cell-${x}-${y}`}
                  title={`${y} · ${x}: ${formatValue(value)}`}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-[4px] text-[10px] transition-colors",
                    t > 0.55 ? "text-primary-foreground" : "text-muted-foreground"
                  )}
                  style={{
                    backgroundColor: `color-mix(in oklab, ${colorToken} ${pct}%, var(--muted))`,
                  }}
                >
                  {value > 0 ? formatValue(value) : ""}
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Export it**

Append to `components/charts/index.ts`:

```ts
export * from "./heatmap"
```

- [ ] **Step 3: Verify the intensity logic (temporary node check)**

Run:
```bash
node -e "const f=(v,m)=>{if(m<=0)return 0;return Math.min(1,Math.max(0,v/m))}; console.assert(f(5,10)===0.5,'half'); console.assert(f(20,10)===1,'clamp-hi'); console.assert(f(-2,10)===0,'clamp-lo'); console.assert(f(3,0)===0,'zero-max'); console.log('intensity ok')"
```
Expected: prints `intensity ok` with no assertion errors.

- [ ] **Step 4: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 5: Commit**

```bash
git add components/charts/heatmap.tsx components/charts/index.ts
git commit -m "feat(charts): add Heatmap"
```

---

## Task 14: Styleguide — Phase 3 sections (Funnel, Radar, Heatmap) + docs

**Files:**
- Modify: `app/styleguide/components/charts/data.ts`
- Modify: `app/styleguide/components/charts/page.tsx`

**Interfaces:**
- Consumes: `FunnelChart, RadarChart, Heatmap, ChartCard, makeChartConfig`.
- Produces: final Phase-3 sections + a short props/usage doc block completing the showcase.

- [ ] **Step 1: Append demo datasets**

Append to `app/styleguide/components/charts/data.ts`:

```ts
/** Sales pipeline funnel. */
export const pipelineFunnelData = [
  { stage: "Lead", value: 1200 },
  { stage: "MQL", value: 760 },
  { stage: "SQL", value: 430 },
  { stage: "Proposta", value: 210 },
  { stage: "Ganho", value: 95 },
]
export const pipelineFunnelConfig = makeChartConfig([
  { key: "value", label: "Contatos" },
])

/** Lead qualification profile (BANT) — two reps compared (Radar). */
export const leadProfileData = [
  { dimension: "Budget", repA: 8, repB: 6 },
  { dimension: "Authority", repA: 6, repB: 7 },
  { dimension: "Need", repA: 9, repB: 5 },
  { dimension: "Timing", repA: 5, repB: 8 },
  { dimension: "Fit", repA: 7, repB: 6 },
]
export const leadProfileConfig = makeChartConfig([
  { key: "repA", label: "Rep A", color: "var(--chart-1)" },
  { key: "repB", label: "Rep B", color: "var(--chart-3)" },
])

/** Activity by weekday × hour block (Heatmap). */
export const heatmapXLabels = ["8h", "10h", "12h", "14h", "16h", "18h"]
export const heatmapYLabels = ["Seg", "Ter", "Qua", "Qui", "Sex"]
export const activityHeatmapData = (() => {
  const grid = [
    [3, 8, 5, 9, 12, 4],
    [5, 11, 6, 13, 15, 6],
    [4, 9, 7, 12, 14, 5],
    [6, 12, 8, 15, 18, 7],
    [2, 6, 4, 8, 9, 3],
  ]
  const out: { x: string; y: string; value: number }[] = []
  heatmapYLabels.forEach((y, r) =>
    heatmapXLabels.forEach((x, c) => out.push({ x, y, value: grid[r][c] }))
  )
  return out
})()
```

- [ ] **Step 2: Wire the new imports into the page**

In `app/styleguide/components/charts/page.tsx`, update the components import to add the three new charts:

```tsx
import {
  AreaChart,
  BarChart,
  ChartCard,
  FunnelChart,
  Heatmap,
  KpiTrendChart,
  LineChart,
  PieChart,
  RadarChart,
  Sparkline,
} from "@/components/charts"
```

And extend the data import to include the new datasets:

```tsx
import {
  activityHeatmapData,
  channelShareConfig,
  channelShareData,
  churnTrend,
  conversionTrend,
  dealsByStageConfig,
  dealsByStageData,
  dealsConfig,
  dealsData,
  heatmapXLabels,
  heatmapYLabels,
  leadProfileConfig,
  leadProfileData,
  leadsBySourceConfig,
  leadsBySourceData,
  pipelineFunnelConfig,
  pipelineFunnelData,
  revenueConfig,
  revenueData,
} from "./data"
```

- [ ] **Step 3: Append Phase 3 sections + a docs block**

In `app/styleguide/components/charts/page.tsx`, add these sections immediately before the existing `"Estados"` section:

```tsx
      <Section
        title="Funnel"
        description="Funil de conversão do pipeline de vendas: Lead → MQL → SQL → Proposta → Ganho."
      >
        <ChartCard title="Pipeline" description="Contatos por estágio">
          <FunnelChart
            data={pipelineFunnelData}
            config={pipelineFunnelConfig}
            dataKey="value"
            nameKey="stage"
          />
        </ChartCard>
      </Section>

      <Section
        title="Radar"
        description="Perfil de qualificação (BANT) comparando dois representantes."
      >
        <ChartCard title="Qualificação de lead" description="Rep A vs Rep B">
          <RadarChart
            data={leadProfileData}
            config={leadProfileConfig}
            series={["repA", "repB"]}
            angleKey="dimension"
            showLegend
          />
        </ChartCard>
      </Section>

      <Section
        title="Heatmap"
        description="Atividade por dia da semana × faixa de horário — melhores horários de contato."
      >
        <ChartCard title="Atividade" description="Interações registradas">
          <Heatmap
            data={activityHeatmapData}
            xLabels={heatmapXLabels}
            yLabels={heatmapYLabels}
          />
        </ChartCard>
      </Section>
```

- [ ] **Step 4: Append a props/usage documentation block**

In `app/styleguide/components/charts/page.tsx`, add this section as the **last** child of the page container (after the `"Estados"` section):

```tsx
      <Section
        title="Uso & Props"
        description="Todos os gráficos são controlados: recebem data + config e tratam loading/empty automaticamente."
      >
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
{`import { LineChart, makeChartConfig } from "@/components/charts"

const config = makeChartConfig([
  { key: "mrr", label: "MRR (R$)" },        // cor on-brand por ordem
  { key: "churn", label: "Churn", color: "var(--chart-4)" },
])

<LineChart
  data={data}
  config={config}
  series={["mrr", "churn"]}   // multi-série
  xKey="month"
  showLegend                  // legenda clicável
  loading={isLoading}         // -> ChartSkeleton
/>
// data = [] -> ChartEmpty automático`}
        </pre>
        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Props comuns</p>
          <ul className="list-inside list-disc space-y-1">
            <li><code>data</code> — array de objetos.</li>
            <li><code>config</code> — <code>ChartConfig</code> (label + color por série).</li>
            <li><code>series</code> / <code>dataKey</code> / <code>nameKey</code> — chaves plotadas.</li>
            <li><code>loading</code> — mostra o skeleton do tipo.</li>
            <li><code>showLegend</code>, <code>showGrid</code>, <code>showTooltip</code> — toggles.</li>
            <li><code>className</code> — altura/estilo do container.</li>
          </ul>
        </div>
      </Section>
```

- [ ] **Step 5: Verify build + lint**

Run: `npm run build && npm run lint`
Expected: build succeeds, lint clean.

- [ ] **Step 6: Visual verification (both themes)**

Run: `npm run dev` and open `/styleguide/components/charts`.
Expected: Funnel shows stage labels + palette colors; Radar shows two overlaid series with legend; Heatmap grid tints from muted → primary green with legible values; docs block renders. Verify dark mode across all three. Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add app/styleguide/components/charts/data.ts app/styleguide/components/charts/page.tsx
git commit -m "feat(charts): add styleguide showcase (Phase 3) + usage docs"
```

---

## Final validation

- [ ] **Full build + lint**

Run: `npm run build && npm run lint`
Expected: production build passes, lint clean.

- [ ] **Full styleguide walkthrough**

Run: `npm run dev`, open `/styleguide/components/charts`, and confirm all 13 chart types render with tooltips, legends, empty and loading states, in both light and dark mode. Confirm no blue appears as a primary series and no hardcoded colors leaked in. Stop dev server.
