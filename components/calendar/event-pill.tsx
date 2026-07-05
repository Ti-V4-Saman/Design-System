"use client"

import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { getEventColorClasses } from "./utils"
import type { CalendarEvent } from "./types"

interface EventPillProps {
  event: CalendarEvent
  /** compact=true renders only the title (no time), used in month grid cells */
  compact?: boolean
  onClick?: (event: CalendarEvent) => void
  className?: string
}

export function EventPill({ event, compact = false, onClick, className }: EventPillProps) {
  const colorClasses = getEventColorClasses(event.color)

  return (
    <button
      type="button"
      onClick={() => onClick?.(event)}
      className={cn(
        "w-full flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium border truncate",
        "text-left transition-opacity hover:opacity-80",
        colorClasses,
        className
      )}
    >
      {event.locked && <Lock className="h-3 w-3 shrink-0 opacity-70" />}
      <span className="truncate">{event.title}</span>
    </button>
  )
}
