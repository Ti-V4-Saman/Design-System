"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { QuickActionCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

export function QuickActionCard({
  icon,
  iconVariant = "primary",
  label,
  description,
  onClick,
  disabled,
  className,
}: QuickActionCardProps) {
  return (
    <CRMBaseCard
      clickable={!!onClick}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      <CardContent className="flex items-center gap-4 py-4">
        <div
          className={cn(
            "h-10 w-10 rounded-full flex items-center justify-center shrink-0 [&_svg]:h-5 [&_svg]:w-5",
            variantIconClass[iconVariant]
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
      </CardContent>
    </CRMBaseCard>
  )
}
