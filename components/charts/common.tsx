import * as React from "react"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import type { ChartConfig } from "@/components/ui/chart"
import type { ChartColorRole, ChartSeries } from "./types"

/**
 * Default series palette — CRM V4 tokens, emerald-led, no blue.
 * chart-1 emerald · chart-2 emerald light · chart-3 amber · chart-4 magenta · chart-5 neutral.
 */
export const CHART_PALETTE = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
] as const

/** Semantic color roles → design tokens. */
const ROLE_TOKENS: Record<ChartColorRole, string> = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  warning: "var(--chart-3)",
  danger: "var(--chart-4)",
  neutral: "var(--chart-5)",
}

/** Resolves a series color: explicit token, semantic role, or palette by index. */
export function resolveColor(
  color: ChartSeries["color"],
  index: number
): string {
  if (color && color in ROLE_TOKENS) {
    return ROLE_TOKENS[color as ChartColorRole]
  }
  if (color) return color
  return CHART_PALETTE[index % CHART_PALETTE.length]
}

/** Builds a shadcn {@link ChartConfig} from a list of series. */
export function buildConfig(series: ChartSeries[]): ChartConfig {
  return series.reduce<ChartConfig>((config, s, index) => {
    config[s.key] = {
      label: s.label ?? s.key,
      color: resolveColor(s.color, index),
    }
    return config
  }, {})
}

/** Shared numeric axis/tick styling props for cartesian charts. */
export const AXIS_PROPS = {
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
} as const

/**
 * Builds a tooltip `formatter` that applies a custom value formatter while
 * keeping the CRM row layout (swatch · label · monospaced value). Returns
 * `undefined` when no formatter is supplied so the default rendering is used.
 */
export function makeTooltipFormatter(
  config: ChartConfig,
  valueFormatter?: (value: number) => string
) {
  if (!valueFormatter) return undefined
  return function tooltipFormatter(value: unknown, name: unknown) {
    const key = String(name)
    return (
      <div className="flex w-full items-center justify-between gap-3">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <span
            className="size-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: `var(--color-${key})` }}
          />
          {config[key]?.label ?? key}
        </span>
        <span className="font-mono font-medium tabular-nums text-foreground">
          {valueFormatter(Number(value))}
        </span>
      </div>
    )
  }
}

/**
 * Renders loading (skeleton) and empty states so every chart wrapper behaves
 * identically. Returns `null` when there is data to render.
 */
export function ChartState({
  loading,
  empty,
  height,
  emptyMessage = "Sem dados para exibir",
  className,
}: {
  loading?: boolean
  empty?: boolean
  height: number
  emptyMessage?: string
  className?: string
}) {
  if (loading) {
    return (
      <div
        className={cn("flex w-full flex-col gap-3 p-2", className)}
        style={{ height }}
        aria-busy="true"
        aria-live="polite"
      >
        <div className="flex flex-1 items-end gap-2">
          {[60, 85, 45, 95, 70, 55, 80].map((h, i) => (
            <Skeleton
              key={i}
              className="flex-1 rounded-md"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <Skeleton className="h-3 w-1/3" />
      </div>
    )
  }

  if (empty) {
    return (
      <div
        className={cn(
          "flex w-full flex-col items-center justify-center gap-1 text-center",
          className
        )}
        style={{ height }}
        role="status"
      >
        <ChartEmptyIcon className="mb-1 size-8 text-muted-foreground/50" />
        <p className="text-sm font-medium text-muted-foreground">
          {emptyMessage}
        </p>
        <p className="text-xs text-muted-foreground/70">
          Os dados aparecerão aqui assim que estiverem disponíveis.
        </p>
      </div>
    )
  }

  return null
}

function ChartEmptyIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <rect x="7" y="13" width="3" height="5" rx="0.5" />
      <rect x="12" y="9" width="3" height="9" rx="0.5" />
      <rect x="17" y="11" width="3" height="7" rx="0.5" />
    </svg>
  )
}
