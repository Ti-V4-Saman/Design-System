"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CRMBaseCard } from "./base-card"
import type { EntityCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

const variantBadgeClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground border-foreground/20",
  primary: "bg-primary/10 text-primary border-primary/40",
  success: "bg-success/10 text-success border-success/40",
  warning: "bg-warning/15 text-warning-foreground border-warning/50",
  destructive: "bg-destructive/10 text-destructive border-destructive/40",
  info: "bg-info text-info-foreground border-info-foreground/25",
  muted: "bg-muted text-muted-foreground border-border",
}

export function EntityCard({
  icon,
  iconVariant = "primary",
  title,
  subtitle,
  meta,
  badge,
  action,
  clickable,
  selected,
  onClick,
  className,
}: EntityCardProps) {
  return (
    <CRMBaseCard clickable={clickable} selected={selected} onClick={onClick} className={className}>
      <CardContent className="flex items-center gap-4 py-4">
        {icon && (
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center shrink-0 [&_svg]:h-5 [&_svg]:w-5",
              variantIconClass[iconVariant]
            )}
          >
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate">{title}</p>
            {badge && (
              <span
                className={cn(
                  "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border shrink-0",
                  variantBadgeClass[badge.variant ?? "muted"]
                )}
              >
                {badge.label}
              </span>
            )}
          </div>
          {subtitle && <p className="text-xs text-muted-foreground truncate mt-0.5">{subtitle}</p>}
          {meta && <p className="text-xs text-muted-foreground/70 mt-0.5">{meta}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </CardContent>
    </CRMBaseCard>
  )
}
