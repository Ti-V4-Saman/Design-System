"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { CRMBaseCard } from "./base-card"
import type { EmptyStateCardProps } from "./types"

export function EmptyStateCard({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
        {icon && (
          <div className="h-14 w-14 rounded-full flex items-center justify-center bg-muted text-muted-foreground [&_svg]:h-7 [&_svg]:w-7">
            {icon}
          </div>
        )}
        <div className="flex flex-col gap-1.5 max-w-xs">
          <p className="text-base font-semibold">{title}</p>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </CardContent>
    </CRMBaseCard>
  )
}
