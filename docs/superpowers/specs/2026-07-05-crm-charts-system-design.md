# CRM V4 — Charts System Design

**Date:** 2026-07-05
**Status:** Approved (brainstorming) — ready for implementation plan
**Owner:** Design System / felipe@v4company.com

## 1. Objective

Build a **reusable family of chart components** for the entire CRM V4, not a single chart.
The Design System (`app/globals.css` tokens + existing component patterns) is the visual
source of truth — there is no external Figma/screenshot reference for this component yet.
If a Figma or screenshot is provided later for a specific chart, it becomes the visual
reference for that variant while staying consistent with the rest of the system.

Non-goal: reproduce default shadcn/Recharts appearance. shadcn Chart is used only as the
technical foundation (Recharts wrapper + accessibility + tooltip/legend primitives).

## 2. Technical foundation

- **shadcn Chart** (`components/ui/chart.tsx`) installed via `npx shadcn@latest add chart`,
  which pulls **Recharts** as a dependency.
- shadcn's `ChartContainer` injects per-series CSS variables (`--color-<key>`) from a
  `ChartConfig`, and reads the design-system `--chart-*` tokens — so light/dark theming is
  automatic. `ChartTooltipContent` / `ChartLegendContent` are the tooltip/legend primitives.
- Recharts covers natively: Line, Area, Bar (vertical/horizontal/stacked), Pie/Donut,
  Radar, Funnel. **Heatmap** and **Sparkline/KPI** are custom compositions over the same
  tokens and container conventions.

## 3. Visual language — tokens are the source of truth

Never hardcode colors. Every visual decision references a token via Tailwind utility or
CSS variable.

### Semantic series palette (`components/charts/palette.ts`)

Existing `--chart-*` tokens already match the requested palette. Formalize the roles:

| Role       | Token        | Meaning                                   |
|------------|--------------|-------------------------------------------|
| Primary    | `--chart-1`  | green — main series / highlighted value   |
| Secondary  | `--chart-2`  | light green — 2nd series                  |
| Warning    | `--chart-3`  | yellow — attention                        |
| Danger     | `--chart-4`  | red — loss / negative                     |
| Neutral    | `--chart-5`  | gray — supporting / "others"              |

- `CHART_SERIES`: ordered default palette `[chart-1, chart-2, chart-3, chart-4, chart-5]`
  so multi-series charts are on-brand by default.
- `chartColor`: named aliases `{ primary, secondary, success, warning, danger, neutral }`
  resolving to `var(--color-chart-N)`.
- Series beyond 5 reuse neutrals / opacity steps. **Blue is never used as a primary chart
  color.** (`--chart-1` green is always the primary.)

### Other tokens

- Framing: `Card` + `shadow-card`, `rounded-xl`.
- Axes / grid / labels: `text-muted-foreground`, `border-border`.
- Tooltip: `bg-popover`, `text-popover-foreground`, `shadow-dropdown`, `rounded-lg`.
- Typography/spacing/radius: existing scale only.

## 4. Architecture & file layout

```
components/
├── ui/
│   └── chart.tsx              # shadcn base (ChartContainer, ChartTooltip/Content, ChartLegend/Content)
├── charts/
│   ├── palette.ts            # semantic palette + default series order
│   ├── chart-card.tsx        # ChartCard — standard frame (Card + shadow-card + header/actions slot)
│   ├── chart-empty.tsx       # ChartEmpty — tokenized empty state
│   ├── chart-skeleton.tsx    # ChartSkeleton — loading state per chart shape
│   ├── line-chart.tsx        # LineChart
│   ├── area-chart.tsx        # AreaChart (+ gradient fill)
│   ├── bar-chart.tsx         # BarChart (vertical/horizontal, stacked, multi-series)
│   ├── pie-chart.tsx         # PieChart (+ donut variant w/ center label)
│   ├── sparkline.tsx         # Sparkline (mini, no axes)
│   ├── kpi-trend.tsx         # KpiTrendChart (value + delta % + sparkline)
│   ├── funnel-chart.tsx      # FunnelChart (pipeline)
│   ├── radar-chart.tsx       # RadarChart
│   ├── heatmap.tsx           # Heatmap (custom CSS grid)
│   └── index.ts              # barrel export
app/
└── styleguide/components/charts/page.tsx   # showcase
```

Each `charts/*` component is a **thin, controlled/presentational wrapper**: it receives
`data` + `config` and renders a Recharts chart inside `ChartContainer`. No data fetching
inside components. Each unit has one clear purpose and a well-defined prop interface so it
can be understood and tested independently.

## 5. Component API (shared pattern)

```tsx
<LineChart
  data={revenue}                 // array of row objects
  config={chartConfig}           // shadcn ChartConfig: { key: { label, color } }
  series={["mrr", "churn"]}      // series keys to plot
  xKey="month"
  loading={false}                // → ChartSkeleton
  showLegend showGrid showTooltip
  className="h-64"
/>
```

Common props across the family: `data`, `config`, `loading`, `showLegend`, `showGrid`,
`showTooltip`, `className`. Behavior:

- `loading` → renders `ChartSkeleton` shaped for that chart type.
- `data.length === 0` (or all-null series) → renders `ChartEmpty`.
- Interactions: hover via Recharts `activeDot`/`activeShape`; optional `activeKey` prop for
  legend-driven series highlight (non-active series dimmed).

Types are exported from each module; `index.ts` re-exports components + shared types.

## 6. Shared states & interactions

- **ChartCard**: title + description + optional trailing actions slot (e.g. period selector),
  `shadow-card`, `rounded-xl`. Consistent frame for every chart in the CRM.
- **Tooltip / Legend**: shadcn `ChartTooltipContent` / `ChartLegendContent`, styled to tokens.
- **Empty**: icon + short message, `text-muted-foreground`, inside the frame.
- **Loading**: `ChartSkeleton` built on existing `skeleton.tsx`.
- **Hover / selection / highlight**: hover active states; clicking a legend item dims the
  other series.
- **Dark mode**: automatic via `--chart-*` and semantic tokens (both themes already defined).

## 7. Chart inventory, phases & real CRM data

### Phase 1 — Foundation + Cartesian
- Foundation: `chart.tsx` (shadcn add), `palette.ts`, `ChartCard`, `ChartEmpty`,
  `ChartSkeleton`, tooltip/legend styling.
- `LineChart` — MRR / revenue over time.
- `AreaChart` — cumulative revenue, gradient fill.
- `BarChart` — deals per month.
- Stacked Bar — deals won vs lost (BarChart `stacked`).
- Horizontal Bar — leads by source (BarChart `orientation="horizontal"`).
- Multi-Series — MRR vs churn (multiple series keys).

### Phase 2 — Circular + micro
- `PieChart` — deals by stage.
- Donut — share by channel (PieChart `variant="donut"`, center label).
- `Sparkline` — conversion rate trend.
- `KpiTrendChart` — KPI cards (MRR, new leads, win rate): big number + delta % badge using
  success/danger tokens + background sparkline.

### Phase 3 — Specialized
- `FunnelChart` — sales pipeline: Lead → MQL → SQL → Proposal → Won.
- `RadarChart` — lead qualification profile (e.g. BANT dimensions).
- `Heatmap` — activity by day × hour (best contact times); intensity via primary token
  opacity steps.

## 8. Styleguide showcase

`app/styleguide/components/charts/page.tsx`, reusing existing `Section` / `Demo` / `Row` /
`CodeBlock` helpers. Per chart type, show: variants, tooltip, legend, empty state, loading
state, interactions, one **real CRM data** example, and a **code snippet**. At least one
Light+Dark side-by-side pair. Add a "Charts" item under the Components section in
`app/styleguide/navigation.ts`.

## 9. Error handling

- Empty data → `ChartEmpty`.
- `loading` → `ChartSkeleton`.
- Missing config keys guarded (fallback label = key, fallback color = neutral).

## 10. Validation

- `npm run build` (production build must pass).
- `npm run lint`.
- Visual verification in the styleguide (light + dark).

## 11. Out of scope

- Data fetching / server integration (components are presentational).
- Chart export (PNG/CSV), zoom/brush, and real-time streaming — future work.
- Replacing the neutral placeholder tokens (owned by the tokens spec).
