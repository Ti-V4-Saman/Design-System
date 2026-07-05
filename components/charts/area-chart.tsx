"use client"

import { Area, AreaChart as RechartsAreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AXIS_PROPS, ChartState, buildConfig, makeTooltipFormatter } from "./common"
import type { CartesianChartProps } from "./types"

export interface AreaChartProps extends CartesianChartProps {
  /** Stacks series on top of each other instead of overlaying them. */
  stacked?: boolean
  /** Renders smooth (monotone) curves instead of straight segments. */
  curved?: boolean
}

/**
 * CRM V4 area chart with a soft token-based gradient fill. Supports stacked
 * series, loading and empty states.
 */
export function AreaChart({
  data,
  series,
  categoryKey,
  config,
  loading,
  className,
  height = 260,
  showGrid = true,
  showLegend,
  showTooltip = true,
  showXAxis = true,
  showYAxis = false,
  valueFormatter,
  emptyMessage,
  stacked = false,
  curved = true,
}: AreaChartProps) {
  const chartConfig = config ?? buildConfig(series)
  const legend = showLegend ?? series.length > 1
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  return (
    <ChartContainer config={chartConfig} className={cn("aspect-auto w-full", className)} style={{ height }}>
      <RechartsAreaChart data={data} margin={{ left: 12, right: 12, top: 8 }} accessibilityLayer>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.key} id={`fill-${s.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={`var(--color-${s.key})`} stopOpacity={0.35} />
              <stop offset="95%" stopColor={`var(--color-${s.key})`} stopOpacity={0.04} />
            </linearGradient>
          ))}
        </defs>
        {showGrid && <CartesianGrid vertical={false} strokeDasharray="4 4" />}
        {showXAxis && <XAxis dataKey={categoryKey} {...AXIS_PROPS} minTickGap={16} />}
        {showYAxis && <YAxis {...AXIS_PROPS} width={44} tickFormatter={valueFormatter} />}
        {showTooltip && (
          <ChartTooltip
            cursor={{ strokeDasharray: "4 4" }}
            content={<ChartTooltipContent formatter={makeTooltipFormatter(chartConfig, valueFormatter)} />}
          />
        )}
        {series.map((s) => (
          <Area
            key={s.key}
            dataKey={s.key}
            type={curved ? "monotone" : "linear"}
            stackId={stacked ? "stack" : undefined}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            fill={`url(#fill-${s.key})`}
            isAnimationActive={false}
          />
        ))}
        {legend && <ChartLegend content={<ChartLegendContent />} />}
      </RechartsAreaChart>
    </ChartContainer>
  )
}
