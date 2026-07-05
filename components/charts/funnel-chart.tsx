"use client"

import { Cell, Funnel, FunnelChart as RechartsFunnelChart, LabelList } from "recharts"

import { cn } from "@/lib/utils"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CHART_PALETTE, ChartState, resolveColor } from "./common"
import type { ChartConfig } from "@/components/ui/chart"

export interface FunnelStage {
  /** Stage name, e.g. "Leads". */
  name: string
  value: number
  /** Optional explicit color/token/role; defaults to palette by index. */
  color?: string
}

export interface FunnelChartProps {
  data: FunnelStage[]
  loading?: boolean
  className?: string
  height?: number
  showTooltip?: boolean
  /** Shows the conversion % vs. the first stage next to each label. */
  showConversion?: boolean
  valueFormatter?: (value: number) => string
  emptyMessage?: string
}

/**
 * CRM V4 funnel chart for pipeline conversion (Visitantes → Leads → MQL → SQL
 * → Deal). Stages use the CRM palette, deepest emerald at the top.
 */
export function FunnelChart({
  data,
  loading,
  className,
  height = 300,
  showTooltip = true,
  showConversion = true,
  valueFormatter = (v) => v.toLocaleString("pt-BR"),
  emptyMessage,
}: FunnelChartProps) {
  const state = ChartState({ loading, empty: !data.length, height, emptyMessage })
  if (state) return state

  const top = data[0]?.value ?? 0
  const config: ChartConfig = data.reduce<ChartConfig>((acc, stage, i) => {
    acc[stage.name] = { label: stage.name, color: resolveColor(stage.color, i) }
    return acc
  }, {})

  const rows = data.map((stage) => ({
    ...stage,
    label: showConversion && top > 0
      ? `${stage.name} · ${Math.round((stage.value / top) * 100)}%`
      : stage.name,
  }))

  return (
    <ChartContainer config={config} className={cn("mx-auto aspect-auto w-full", className)} style={{ height }}>
      <RechartsFunnelChart margin={{ left: 8, right: 8 }}>
        {showTooltip && (
          <ChartTooltip
            content={
              <ChartTooltipContent
                nameKey="name"
                hideLabel
                formatter={(value, name) => (
                  <span className="flex w-full items-center justify-between gap-3">
                    <span className="text-muted-foreground">{String(name)}</span>
                    <span className="font-mono font-medium tabular-nums text-foreground">
                      {valueFormatter(Number(value))}
                    </span>
                  </span>
                )}
              />
            }
          />
        )}
        <Funnel dataKey="value" data={rows} isAnimationActive={false} stroke="var(--color-background)" strokeWidth={2}>
          {rows.map((stage, i) => (
            <Cell key={stage.name} fill={resolveColor(stage.color, i)} />
          ))}
          <LabelList
            position="right"
            dataKey="label"
            className="fill-foreground text-xs font-medium"
            stroke="none"
          />
        </Funnel>
      </RechartsFunnelChart>
    </ChartContainer>
  )
}

// Re-exported so consumers can reference the palette when building custom stages.
export { CHART_PALETTE }
