"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CRMBaseCard } from "./base-card"
import type { TimelineCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

export function TimelineCard({ events, title = "Timeline", className }: TimelineCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex flex-col gap-0">
          {events.map((event, index) => (
            <div key={event.id} className="flex gap-3 pb-4 last:pb-0">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center shrink-0 z-10 [&_svg]:h-4 [&_svg]:w-4",
                    variantIconClass[event.variant ?? "primary"]
                  )}
                >
                  {event.icon ?? <div className="h-2 w-2 rounded-full bg-current" />}
                </div>
                {index < events.length - 1 && (
                  <div className="w-px flex-1 bg-border mt-1" />
                )}
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <p className="text-sm font-medium">{event.title}</p>
                {event.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                )}
                <p className="text-xs text-muted-foreground/70 mt-1">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </CRMBaseCard>
  )
}
