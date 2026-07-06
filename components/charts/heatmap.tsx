"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { ChartState, resolveColor } from "./common"
import type { ChartColorRole } from "./types"

export interface HeatmapCell {
  /** Column key (x-axis, e.g. an hour block). */
  x: string | number
  /** Row key (y-axis, e.g. a weekday). */
  y: string | number
  value: number
}

export interface HeatmapProps {
  data: HeatmapCell[]
  /** Ordered column labels (x-axis). */
  xLabels: (string | number)[]
  /** Ordered row labels (y-axis). */
  yLabels: (string | number)[]
  /** Upper bound of the color ramp. Defaults to the largest value in `data`. */
  max?: number
  /** Base color token/role for the ramp. Defaults to the primary emerald token. */
  color?: string | ChartColorRole
  loading?: boolean
  className?: string
  /** Height (px) used by the loading/empty states. Defaults to 260. */
  height?: number
  /** Formats the value shown inside each cell and in its tooltip. */
  valueFormatter?: (value: number) => string
  /** Shows the min→max color scale legend. Defaults to true. */
  showScale?: boolean
  emptyMessage?: string
}

/** Fraction (0–1) of `value` against `max`, clamped. */
function intensity(value: number, max: number): number {
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, value / max))
}

/**
 * CRM V4 heatmap — a custom CSS grid (recharts has no native heatmap). Cells
 * are tinted along a token-based emerald ramp (`color-mix` over `--muted`), so
 * light/dark switch automatically. Useful for activity by weekday × hour,
 * cohort retention, or best-contact-time matrices.
 */
export function Heatmap({
  data,
  xLabels,
  yLabels,
  max,
  color = "primary",
  loading,
  className,
  height = 260,
  valueFormatter = (v) => v.toLocaleString("pt-BR"),
  showScale = true,
  emptyMessage,
}: HeatmapProps) {
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  const base = resolveColor(color, 0)
  const lookup = new Map<string, number>()
  for (const d of data) lookup.set(`${d.x}|${d.y}`, d.value)
  const computedMax = max ?? Math.max(...data.map((d) => d.value), 0)

  const tint = (value: number) =>
    `color-mix(in oklab, ${base} ${Math.round(intensity(value, computedMax) * 100)}%, var(--muted))`

  return (
    <div className={cn("w-full space-y-3", className)}>
      <div className="w-full overflow-x-auto">
        <div
          className="grid gap-1"
          style={{ gridTemplateColumns: `auto repeat(${xLabels.length}, minmax(2rem, 1fr))` }}
        >
          {/* Header row: empty corner + column labels */}
          <div aria-hidden="true" />
          {xLabels.map((x) => (
            <div
              key={`col-${x}`}
              className="pb-1 text-center text-[11px] font-medium text-muted-foreground"
            >
              {x}
            </div>
          ))}

          {/* Data rows */}
          {yLabels.map((y) => (
            <React.Fragment key={`row-${y}`}>
              <div className="flex items-center justify-end pr-2 text-[11px] font-medium text-muted-foreground">
                {y}
              </div>
              {xLabels.map((x) => {
                const value = lookup.get(`${x}|${y}`) ?? 0
                const strong = intensity(value, computedMax) > 0.55
                return (
                  <div
                    key={`cell-${x}-${y}`}
                    title={`${y} · ${x}: ${valueFormatter(value)}`}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-sm text-[10px] tabular-nums transition-[outline] outline-none hover:outline-2 hover:outline-ring",
                      strong ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                    style={{ backgroundColor: tint(value) }}
                  >
                    {value > 0 ? valueFormatter(value) : ""}
                  </div>
                )
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {showScale && (
        <div className="flex items-center justify-end gap-2 text-[11px] text-muted-foreground">
          <span>0</span>
          <div className="flex h-2 w-24 overflow-hidden rounded-full">
            {[0.15, 0.35, 0.55, 0.75, 1].map((t) => (
              <div
                key={t}
                className="flex-1"
                style={{ backgroundColor: `color-mix(in oklab, ${base} ${t * 100}%, var(--muted))` }}
              />
            ))}
          </div>
          <span>{valueFormatter(computedMax)}</span>
        </div>
      )}
    </div>
  )
}
