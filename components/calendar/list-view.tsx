"use client"

import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { getEventColorClasses, format, isSameDay } from "./utils"
import { startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns"
import type { CalendarEvent } from "./types"

interface ListViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function ListView({ currentDate, events, onEventClick }: ListViewProps) {
  // Group events by day, only include days that have events, within the current month
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const daysWithEvents = daysInMonth
    .map((day) => ({
      day,
      events: events.filter((e) => isSameDay(e.start, day)),
    }))
    .filter((d) => d.events.length > 0)

  if (daysWithEvents.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">No events this month.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      {daysWithEvents.map(({ day, events: dayEvents }) => (
        <div key={day.toISOString()}>
          {/* Date section header — matches screenshot: date left, day name right */}
          <div className="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-t border-border sticky top-0 z-10">
            <p className="text-sm font-semibold text-foreground">
              {format(day, "MMMM d, yyyy")}
            </p>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {format(day, "EEEE")}
            </p>
          </div>

          {/* Events for this day */}
          {dayEvents.map((event) => (
            <button
              key={event.id}
              type="button"
              onClick={() => onEventClick?.(event)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 border-b border-border/60",
                "text-left hover:opacity-80 transition-opacity",
                getEventColorClasses(event.color)
              )}
            >
              {/* Time range */}
              <span className="text-xs tabular-nums shrink-0 opacity-80 w-28">
                {format(event.start, "h:mm a")} – {format(event.end, "h:mm a")}
              </span>

              {/* Lock icon + title */}
              <span className="flex items-center gap-1.5 font-medium text-sm truncate">
                {event.locked && <Lock className="h-3.5 w-3.5 shrink-0" />}
                {event.title}
              </span>
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
