"use client"

import * as React from "react"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { StatCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

export function StatCard({
  title,
  value,
  description,
  variant = "primary",
  icon,
  trend,
  className,
}: StatCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {icon && (
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center shrink-0 [&_svg]:h-5 [&_svg]:w-5",
                variantIconClass[variant]
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold tracking-tight">{value}</span>
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
            <CardDescription>{description}</CardDescription>
          )}
        </div>
      </CardContent>
    </CRMBaseCard>
  )
}
