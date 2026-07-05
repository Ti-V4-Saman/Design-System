"use client"

import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts"

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

export interface LineChartProps extends CartesianChartProps {
  /** Renders smooth (monotone) curves instead of straight segments. */
  curved?: boolean
  /** Renders visible dots on each data point. */
  dots?: boolean
}

/**
 * CRM V4 line chart. Handles single and multi-series, loading and empty states.
 * Colors default to the CRM chart palette (emerald-led, no blue).
 */
export function LineChart({
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
  curved = true,
  dots = false,
}: LineChartProps) {
  const chartConfig = config ?? buildConfig(series)
  const legend = showLegend ?? series.length > 1
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  return (
    <ChartContainer config={chartConfig} className={cn("aspect-auto w-full", className)} style={{ height }}>
      <RechartsLineChart data={data} margin={{ left: 12, right: 12, top: 8 }} accessibilityLayer>
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
          <Line
            key={s.key}
            dataKey={s.key}
            type={curved ? "monotone" : "linear"}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            dot={dots ? { r: 3, strokeWidth: 0, fill: `var(--color-${s.key})` } : false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        ))}
        {legend && <ChartLegend content={<ChartLegendContent />} />}
      </RechartsLineChart>
    </ChartContainer>
  )
}
