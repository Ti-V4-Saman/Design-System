"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CRMBaseCard } from "./base-card"
import type { ActivityCardProps, CardVariant } from "./types"

const variantIconClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
}

export function ActivityCard({ items, title = "Recent Activity", className }: ActivityCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            {item.icon ? (
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center shrink-0 [&_svg]:h-4 [&_svg]:w-4",
                  variantIconClass[item.iconVariant ?? "primary"]
                )}
              >
                {item.icon}
              </div>
            ) : (
              <Avatar className="h-8 w-8 shrink-0">
                {item.avatarSrc && <AvatarImage src={item.avatarSrc} />}
                <AvatarFallback className="text-xs bg-primary/10 text-primary">
                  {item.avatarFallback}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>
                {item.target && (
                  <span className="font-medium"> {item.target}</span>
                )}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </CRMBaseCard>
  )
}
