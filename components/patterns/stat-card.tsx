import * as React from "react"
import { TrendingDown, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export interface StatCardProps {
  label: React.ReactNode
  value: React.ReactNode
  /** Period-over-period change in %, e.g. 6.3 or -8.7. */
  delta?: number
  deltaCaption?: React.ReactNode
  icon?: React.ReactNode
  /** When true, a negative delta is "good" (green) — for churn-like metrics. */
  invertDelta?: boolean
  /** Optional trailing element (e.g. a Sparkline). */
  chart?: React.ReactNode
  className?: string
}

/**
 * Reusable KPI/stat card for dashboards — label, big value, colored delta and
 * optional icon/sparkline. Composes the Card primitive.
 */
export function StatCard({
  label,
  value,
  delta,
  deltaCaption,
  icon,
  invertDelta = false,
  chart,
  className,
}: StatCardProps) {
  const hasDelta = typeof delta === "number"
  const isUp = hasDelta && delta! >= 0
  const isGood = hasDelta ? (invertDelta ? !isUp : isUp) : true
  const TrendIcon = isUp ? TrendingUp : TrendingDown

  return (
    <Card className={className}>
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm text-muted-foreground">{label}</span>
          {icon ? <span className="text-muted-foreground [&_svg]:size-4">{icon}</span> : null}
        </div>
        <div className="flex items-end justify-between gap-3">
          <span className="text-2xl font-semibold tabular-nums text-foreground">{value}</span>
          {chart ? <div className="w-24">{chart}</div> : null}
        </div>
        {hasDelta ? (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium",
                isGood ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
              )}
            >
              <TrendIcon className="size-3" aria-hidden="true" />
              {isUp ? "+" : ""}
              {delta!.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%
            </span>
            {deltaCaption ? <span className="text-muted-foreground">{deltaCaption}</span> : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  )
}

/** Responsive grid wrapper for StatCards. */
export function StatCardGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="stat-card-grid"
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    />
  )
}
