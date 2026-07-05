"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { CRMBaseCardProps } from "./types"

export function CRMBaseCard({
  clickable,
  selected,
  disabled,
  className,
  onClick,
  children,
}: CRMBaseCardProps) {
  return (
    <Card
      className={cn(
        clickable && "cursor-pointer transition-all duration-150 hover:ring-2 hover:ring-primary/40",
        selected && "ring-2 ring-primary",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </Card>
  )
}
