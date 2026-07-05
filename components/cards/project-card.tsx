"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { CalendarDays } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { ProjectCardProps } from "./types"

const statusClass = {
  active: "bg-success/10 text-success border-success/40",
  paused: "bg-warning/15 text-warning-foreground border-warning/50",
  completed: "bg-muted text-muted-foreground border-border",
}

const statusLabel = {
  active: "Active",
  paused: "Paused",
  completed: "Completed",
}

export function ProjectCard({
  title,
  description,
  progress,
  status = "active",
  team,
  dueDate,
  onClick,
  className,
}: ProjectCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress))

  return (
    <CRMBaseCard clickable={!!onClick} onClick={onClick} className={className}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border shrink-0",
              statusClass[status]
            )}
          >
            {statusLabel[status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{clampedProgress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      </CardContent>
      {(team || dueDate) && (
        <CardFooter className="flex items-center justify-between">
          {team && team.length > 0 && (
            <div className="flex -space-x-2">
              {team.slice(0, 5).map((member, i) => (
                <Avatar key={i} className="h-7 w-7 ring-2 ring-card">
                  {member.src && <AvatarImage src={member.src} />}
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {member.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              {team.length > 5 && (
                <div className="h-7 w-7 rounded-full ring-2 ring-card bg-muted flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                  +{team.length - 5}
                </div>
              )}
            </div>
          )}
          {dueDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3 w-3" />
              {dueDate}
            </div>
          )}
        </CardFooter>
      )}
    </CRMBaseCard>
  )
}
