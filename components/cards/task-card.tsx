"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { CalendarDays } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { TaskCardProps, CardVariant } from "./types"

const priorityClass: Record<"low" | "medium" | "high", string> = {
  low: "text-muted-foreground",
  medium: "text-warning-foreground",
  high: "text-destructive",
}

const priorityDot: Record<"low" | "medium" | "high", string> = {
  low: "bg-muted-foreground",
  medium: "bg-warning",
  high: "bg-destructive",
}

export function TaskCard({
  id,
  title,
  completed = false,
  priority,
  assigneeAvatarSrc,
  assigneeAvatarFallback,
  dueDate,
  tags,
  onToggle,
  onClick,
  className,
}: TaskCardProps) {
  return (
    <CRMBaseCard
      clickable={!!onClick}
      onClick={onClick}
      className={className}
    >
      <CardContent className="flex items-start gap-3 py-3">
        <Checkbox
          id={`task-${id}`}
          checked={completed}
          onCheckedChange={(checked) => onToggle?.(id, !!checked)}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5"
        />
        <div className="flex-1 min-w-0 flex flex-col gap-1.5">
          <p className={cn("text-sm font-medium leading-snug", completed && "line-through text-muted-foreground")}>
            {title}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {priority && (
              <div className="flex items-center gap-1">
                <div className={cn("h-1.5 w-1.5 rounded-full", priorityDot[priority])} />
                <span className={cn("text-xs capitalize", priorityClass[priority])}>{priority}</span>
              </div>
            )}
            {tags?.map((tag) => (
              <span key={tag} className="text-xs bg-muted text-muted-foreground rounded px-1.5 py-0.5">
                {tag}
              </span>
            ))}
            {dueDate && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="h-3 w-3" />
                {dueDate}
              </div>
            )}
          </div>
        </div>
        {(assigneeAvatarFallback || assigneeAvatarSrc) && (
          <Avatar className="h-6 w-6 shrink-0">
            {assigneeAvatarSrc && <AvatarImage src={assigneeAvatarSrc} />}
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
              {assigneeAvatarFallback}
            </AvatarFallback>
          </Avatar>
        )}
      </CardContent>
    </CRMBaseCard>
  )
}
