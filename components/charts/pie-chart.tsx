"use client"

import * as React from "react"
import { Cell, Label, Pie, PieChart as RechartsPieChart } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CHART_PALETTE, ChartState, resolveColor } from "./common"
import type { ChartConfig } from "@/components/ui/chart"

export interface PieSlice {
  /** Category name (used for legend/tooltip). */
  name: string
  value: number
  /** Optional explicit color/token/role; defaults to palette by index. */
  color?: string
}

export interface PieChartProps {
  data: PieSlice[]
  /** Renders a donut (hollow center) instead of a full pie. */
  donut?: boolean
  /** Center label for donut charts, e.g. a total. */
  centerLabel?: { value: React.ReactNode; caption?: string }
  loading?: boolean
  className?: string
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
  valueFormatter?: (value: number) => string
  emptyMessage?: string
}

/**
 * CRM V4 pie / donut chart. Slices use the CRM palette by default
 * (emerald-led, no blue). Supports an optional donut center label.
 */
export function PieChart({
  data,
  donut = false,
  centerLabel,
  loading,
  className,
  height = 260,
  showLegend = true,
  showTooltip = true,
  valueFormatter,
  emptyMessage,
}: PieChartProps) {
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  const config: ChartConfig = data.reduce<ChartConfig>((acc, slice, i) => {
    acc[slice.name] = { label: slice.name, color: resolveColor(slice.color, i) }
    return acc
  }, {})

  return (
    <ChartContainer config={config} className={cn("mx-auto aspect-auto w-full", className)} style={{ height }}>
      <RechartsPieChart>
        {showTooltip && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey="name"
                hideLabel
                formatter={
                  valueFormatter
                    ? (value, name) => (
                        <span className="flex w-full items-center justify-between gap-3">
                          <span className="text-muted-foreground">{String(name)}</span>
                          <span className="font-mono font-medium tabular-nums text-foreground">
                            {valueFormatter(Number(value))}
                          </span>
                        </span>
                      )
                    : undefined
                }
              />
            }
          />
        )}
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={donut ? "58%" : 0}
          outerRadius="85%"
          paddingAngle={donut ? 2 : 0}
          strokeWidth={2}
          className="stroke-background"
          isAnimationActive={false}
        >
          {data.map((slice, i) => (
            <Cell key={slice.name} fill={resolveColor(slice.color, i)} />
          ))}
          {donut && centerLabel && (
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null
                const { cx, cy } = viewBox as { cx: number; cy: number }
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={cx} y={cy} className="fill-foreground text-2xl font-semibold tabular-nums">
                      {centerLabel.value}
                    </tspan>
                    {centerLabel.caption && (
                      <tspan x={cx} y={cy + 20} className="fill-muted-foreground text-xs">
                        {centerLabel.caption}
                      </tspan>
                    )}
                  </text>
                )
              }}
            />
          )}
        </Pie>
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="name" />} />}
      </RechartsPieChart>
    </ChartContainer>
  )
}

export { CHART_PALETTE }
