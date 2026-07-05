"use client"

import * as React from "react"
import { Area, AreaChart, Line, LineChart } from "recharts"

import { cn } from "@/lib/utils"
import { ChartContainer } from "@/components/ui/chart"
import { resolveColor } from "./common"
import type { ChartColorRole } from "./types"

export interface SparklineProps {
  /** Series of numbers, or objects when using a custom `dataKey`. */
  data: number[] | Array<Record<string, number>>
  /** Key to read when `data` holds objects. Defaults to `"value"`. */
  dataKey?: string
  variant?: "line" | "area"
  /** Color token/role/CSS value. Defaults to the primary emerald token. */
  color?: string | ChartColorRole
  width?: number | string
  height?: number
  strokeWidth?: number
  className?: string
  /** Accessible label; falls back to a generic description. */
  "aria-label"?: string
}

/**
 * Compact inline trend line with no axes, grid, tooltip or legend — for use
 * inside table cells, KPI cards and dense CRM layouts. Built on the shared
 * ChartContainer so sizing and theming stay consistent with the chart family.
 */
export function Sparkline({
  data,
  dataKey = "value",
  variant = "line",
  color = "primary",
  width = "100%",
  height = 40,
  strokeWidth = 2,
  className,
  "aria-label": ariaLabel = "Tendência",
}: SparklineProps) {
  const rows = React.useMemo(
    () =>
      typeof data[0] === "number"
        ? (data as number[]).map((v) => ({ [dataKey]: v }))
        : (data as Array<Record<string, number>>),
    [data, dataKey]
  )
  const stroke = resolveColor(color, 0)
  const gradientId = React.useId().replace(/:/g, "")
  const numericWidth = typeof width === "number"
  const margin = { top: 2, bottom: 2, left: 0, right: 0 }

  return (
    <div
      className={cn(numericWidth ? "inline-block" : "block w-full", className)}
      style={{ width, height }}
      role="img"
      aria-label={ariaLabel}
    >
      <ChartContainer config={{ [dataKey]: { color: stroke } }} className="aspect-auto size-full">
        {variant === "area" ? (
          <AreaChart data={rows} margin={margin}>
            <defs>
              <linearGradient id={`spark-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={stroke} stopOpacity={0.3} />
                <stop offset="100%" stopColor={stroke} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              dataKey={dataKey}
              type="monotone"
              stroke={stroke}
              strokeWidth={strokeWidth}
              fill={`url(#spark-${gradientId})`}
              isAnimationActive={false}
              dot={false}
            />
          </AreaChart>
        ) : (
          <LineChart data={rows} margin={margin}>
            <Line
              dataKey={dataKey}
              type="monotone"
              stroke={stroke}
              strokeWidth={strokeWidth}
              isAnimationActive={false}
              dot={false}
            />
          </LineChart>
        )}
      </ChartContainer>
    </div>
  )
}
