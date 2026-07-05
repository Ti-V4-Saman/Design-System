"use client"

import { Bar, BarChart as RechartsBarChart, CartesianGrid, XAxis, YAxis } from "recharts"

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

export interface BarChartProps extends CartesianChartProps {
  /** Stacks series into a single bar per category. */
  stacked?: boolean
  /** Lays bars horizontally (category on the y-axis). */
  horizontal?: boolean
  /** Corner radius of the bars. Defaults to 4. */
  radius?: number
}

/**
 * CRM V4 bar chart. Supports grouped, stacked and horizontal layouts plus
 * loading and empty states.
 */
export function BarChart({
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
  horizontal = false,
  radius = 4,
}: BarChartProps) {
  const chartConfig = config ?? buildConfig(series)
  const legend = showLegend ?? series.length > 1
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  const category = (
    <XAxis
      type={horizontal ? "number" : "category"}
      dataKey={horizontal ? undefined : categoryKey}
      {...AXIS_PROPS}
      tickFormatter={horizontal ? valueFormatter : undefined}
      hide={horizontal ? !showYAxis : !showXAxis}
    />
  )
  const value = (
    <YAxis
      type={horizontal ? "category" : "number"}
      dataKey={horizontal ? categoryKey : undefined}
      {...AXIS_PROPS}
      width={horizontal ? 96 : 44}
      tickFormatter={horizontal ? undefined : valueFormatter}
      hide={horizontal ? !showXAxis : !showYAxis}
    />
  )

  return (
    <ChartContainer config={chartConfig} className={cn("aspect-auto w-full", className)} style={{ height }}>
      <RechartsBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ left: 12, right: 12, top: 8 }}
        accessibilityLayer
      >
        {showGrid && <CartesianGrid vertical={horizontal} horizontal={!horizontal} strokeDasharray="4 4" />}
        {category}
        {value}
        {showTooltip && (
          <ChartTooltip
            cursor={{ fillOpacity: 0.08 }}
            content={<ChartTooltipContent formatter={makeTooltipFormatter(chartConfig, valueFormatter)} />}
          />
        )}
        {series.map((s, i) => {
          const isLast = i === series.length - 1
          return (
            <Bar
              key={s.key}
              dataKey={s.key}
              stackId={stacked ? "stack" : undefined}
              fill={`var(--color-${s.key})`}
              radius={
                stacked
                  ? isLast
                    ? ([radius, radius, 0, 0] as [number, number, number, number])
                    : ([0, 0, 0, 0] as [number, number, number, number])
                  : radius
              }
              isAnimationActive={false}
            />
          )
        })}
        {legend && <ChartLegend content={<ChartLegendContent />} />}
      </RechartsBarChart>
    </ChartContainer>
  )
}
