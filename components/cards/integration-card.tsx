"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, X } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { IntegrationCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

export function IntegrationCard({
  icon,
  iconVariant = "primary",
  name,
  description,
  connected = false,
  onToggle,
  className,
}: IntegrationCardProps) {
  return (
    <CRMBaseCard className={className}>
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
          <p className="text-sm font-medium">{name}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        <button
          onClick={() => onToggle?.(!connected)}
          className={cn(
            "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            connected ? "bg-primary" : "bg-muted"
          )}
          role="switch"
          aria-checked={connected}
        >
          <span
            className={cn(
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-md transform ring-0 transition duration-200 ease-in-out",
              connected ? "translate-x-5" : "translate-x-0"
            )}
          />
        </button>
      </CardContent>
    </CRMBaseCard>
  )
}
