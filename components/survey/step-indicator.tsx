"use client"

import { cn } from "@/lib/utils"
import type { StepIndicatorProps } from "./types"

export function StepIndicator({ current, total, className }: StepIndicatorProps) {
  const pct = Math.round((current / total) * 100)

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Step {current} of {total}
      </span>
      <div className="h-1 w-full rounded-full bg-muted">
        <div
          className="h-1 rounded-full bg-primary transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
