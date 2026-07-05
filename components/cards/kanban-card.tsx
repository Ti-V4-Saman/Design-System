"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CalendarDays, GripVertical } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { KanbanCardProps, CardVariant } from "./types"

const variantBadgeClass: Record<CardVariant, string> = {
  default: "bg-foreground/10 text-foreground border-foreground/20",
  primary: "bg-primary/10 text-primary border-primary/40",
  success: "bg-success/10 text-success border-success/40",
  warning: "bg-warning/15 text-warning-foreground border-warning/50",
  destructive: "bg-destructive/10 text-destructive border-destructive/40",
  info: "bg-info text-info-foreground border-info-foreground/25",
  muted: "bg-muted text-muted-foreground border-border",
}

const priorityDot: Record<"low" | "medium" | "high", string> = {
  low: "bg-muted-foreground",
  medium: "bg-warning",
  high: "bg-destructive",
}

export function KanbanCard({
  id,
  title,
  description,
  labels,
  assigneeAvatarFallback,
  assigneeAvatarSrc,
  priority,
  dueDate,
  onClick,
  className,
}: KanbanCardProps) {
  return (
    <CRMBaseCard clickable={!!onClick} onClick={onClick} className={className}>
      <CardContent className="flex flex-col gap-3 py-3">
        <div className="flex items-start gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground/50 shrink-0 mt-0.5 cursor-grab" />
          <p className="text-sm font-medium leading-snug flex-1">{title}</p>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}
        {labels && labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {labels.map((label, i) => (
              <span
                key={i}
                className={cn(
                  "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border",
                  variantBadgeClass[label.variant ?? "muted"]
                )}
              >
                {label.label}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {priority && (
              <div className="flex items-center gap-1">
                <div className={cn("h-1.5 w-1.5 rounded-full", priorityDot[priority])} />
                <span className="text-xs text-muted-foreground capitalize">{priority}</span>
              </div>
            )}
            {dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                {dueDate}
              </div>
            )}
          </div>
          {(assigneeAvatarFallback || assigneeAvatarSrc) && (
            <Avatar className="h-6 w-6">
              {assigneeAvatarSrc && <AvatarImage src={assigneeAvatarSrc} />}
              <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                {assigneeAvatarFallback}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </CRMBaseCard>
  )
}
