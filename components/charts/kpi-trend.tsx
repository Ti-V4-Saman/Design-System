"use client"

import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Sparkline } from "./sparkline"
import type { ChartColorRole } from "./types"

export interface KpiTrendProps {
  /** Metric label, e.g. "MRR". */
  label: string
  /** Formatted primary value, e.g. "R$ 128.400". */
  value: React.ReactNode
  /** Period-over-period change in percent (e.g. 12.4 or -3.1). */
  delta?: number
  /** Caption under the delta, e.g. "vs. mês anterior". */
  deltaCaption?: string
  /** Historical points feeding the sparkline. */
  data?: number[] | Array<Record<string, number>>
  dataKey?: string
  /**
   * When true, a negative delta is treated as good (green) — for metrics like
   * churn where "down" is positive. Defaults to false.
   */
  invertDelta?: boolean
  /** Sparkline color; defaults to match the delta tone. */
  sparklineColor?: string | ChartColorRole
  className?: string
}

/**
 * CRM V4 KPI card: a large value, a colored trend badge and an inline
 * sparkline. Composed from {@link Sparkline}; layout-agnostic (drop inside any
 * card/grid).
 */
export function KpiTrend({
  label,
  value,
  delta,
  deltaCaption,
  data,
  dataKey,
  invertDelta = false,
  sparklineColor,
  className,
}: KpiTrendProps) {
  const hasDelta = typeof delta === "number"
  const isUp = hasDelta && delta! >= 0
  const isGood = hasDelta ? (invertDelta ? !isUp : isUp) : true
  const tone: ChartColorRole = isGood ? "primary" : "danger"
  const TrendIcon = isUp ? TrendingUp : TrendingDown

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">{label}</span>
          <span className="text-2xl font-semibold tabular-nums text-foreground">{value}</span>
        </div>
        {hasDelta && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium",
              isGood
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            )}
          >
            <TrendIcon className="size-3" aria-hidden="true" />
            {isUp ? "+" : ""}
            {delta!.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
          </span>
        )}
      </div>
      {data && data.length > 0 && (
        <Sparkline
          data={data}
          dataKey={dataKey}
          variant="area"
          color={sparklineColor ?? tone}
          height={44}
          aria-label={`Tendência de ${label}`}
        />
      )}
      {deltaCaption && <span className="text-xs text-muted-foreground">{deltaCaption}</span>}
    </div>
  )
}
