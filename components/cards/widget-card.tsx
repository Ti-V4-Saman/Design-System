"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { WidgetCardProps } from "./types"

export function WidgetCard({
  title,
  metric,
  metricLabel,
  trend,
  description,
  action,
  children,
  className,
}: WidgetCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold tracking-tight">{metric}</span>
          {metricLabel && (
            <span className="text-sm text-muted-foreground mb-1">{metricLabel}</span>
          )}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-success" />
            ) : (
              <TrendingDown className="h-3 w-3 text-destructive" />
            )}
            <span className={isPositive ? "text-success" : "text-destructive"}>
              {isPositive ? "+" : ""}{trend.value}%
            </span>
            {trend.label && (
              <span className="text-muted-foreground">{trend.label}</span>
            )}
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </CardContent>
    </CRMBaseCard>
  )
}
