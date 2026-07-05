"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart as RechartsRadarChart } from "recharts"

import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ChartState, buildConfig } from "./common"
import type { ChartDatum, ChartSeries } from "./types"

export interface RadarChartProps {
  data: ChartDatum[]
  series: ChartSeries[]
  /** Key holding the axis/dimension label in each datum. */
  categoryKey: string
  loading?: boolean
  className?: string
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
  /** Fill opacity of each radar area. Defaults to 0.15. */
  fillOpacity?: number
  emptyMessage?: string
}

/**
 * CRM V4 radar chart for comparing entities across multiple dimensions
 * (e.g. sales-rep performance). Colors follow the CRM palette.
 */
export function RadarChart({
  data,
  series,
  categoryKey,
  loading,
  className,
  height = 300,
  showLegend,
  showTooltip = true,
  fillOpacity = 0.15,
  emptyMessage,
}: RadarChartProps) {
  const chartConfig = buildConfig(series)
  const legend = showLegend ?? series.length > 1
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  return (
    <ChartContainer config={chartConfig} className={cn("mx-auto aspect-auto w-full", className)} style={{ height }}>
      <RechartsRadarChart data={data} accessibilityLayer>
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} cursor={false} />}
        <PolarGrid className="stroke-border" />
        <PolarAngleAxis dataKey={categoryKey} className="fill-muted-foreground text-xs" />
        {series.map((s) => (
          <Radar
            key={s.key}
            dataKey={s.key}
            stroke={`var(--color-${s.key})`}
            fill={`var(--color-${s.key})`}
            fillOpacity={fillOpacity}
            strokeWidth={2}
            isAnimationActive={false}
          />
        ))}
        {legend && <ChartLegend content={<ChartLegendContent />} />}
      </RechartsRadarChart>
    </ChartContainer>
  )
}
