import type { ChartConfig } from "@/components/ui/chart"

/** A single row of chart data, e.g. `{ month: "Jan", mrr: 1200, goal: 1500 }`. */
export type ChartDatum = Record<string, string | number>

/** Semantic color roles mapped to CRM V4 design tokens. */
export type ChartColorRole =
  | "primary"
  | "secondary"
  | "warning"
  | "danger"
  | "neutral"

/** Description of one plotted series (line, area, bar set...). */
export interface ChartSeries {
  /** Key of the value in each {@link ChartDatum}. */
  key: string
  /** Human label shown in legend/tooltip. Defaults to `key`. */
  label?: string
  /**
   * Color for the series. Accepts any CSS color or a token var
   * (`var(--chart-1)`). When omitted, a token from the CRM palette is
   * assigned by index. A {@link ChartColorRole} is also accepted.
   */
  color?: string | ChartColorRole
}

/** Props shared by cartesian charts (line, area, bar). */
export interface CartesianChartProps {
  data: ChartDatum[]
  series: ChartSeries[]
  /** Key used for the category axis (x-axis, or y-axis when horizontal). */
  categoryKey: string
  /** Optional explicit ChartConfig; derived from `series` when omitted. */
  config?: ChartConfig
  /** Renders the loading skeleton instead of the chart. */
  loading?: boolean
  className?: string
  /** Height in px. Defaults to 260. */
  height?: number
  showGrid?: boolean
  showLegend?: boolean
  showTooltip?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  /** Formats numeric values in axis ticks and tooltip. */
  valueFormatter?: (value: number) => string
  /** Message shown when `data` is empty. */
  emptyMessage?: string
}

export type { ChartConfig }
