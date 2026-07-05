"use client"

import { cn } from "@/lib/utils"
import { EventPill } from "./event-pill"
import { getMonthDays, getEventsForDay, isSameMonth, isToday, format } from "./utils"
import type { CalendarEvent } from "./types"

const DAY_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface MonthViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
}

export function MonthView({ currentDate, events, onDateClick, onEventClick }: MonthViewProps) {
  const days = getMonthDays(currentDate)

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-border">
        {DAY_HEADERS.map((d) => (
          <div
            key={d}
            className="py-2 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(events, day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const today = isToday(day)

          return (
            <div
              key={idx}
              onClick={() => onDateClick?.(day)}
              className={cn(
                "relative border-b border-r border-border p-1 min-h-[100px] cursor-pointer",
                "hover:bg-muted/30 transition-colors",
                !isCurrentMonth && "bg-muted/10",
                today && "bg-amber-50/60 dark:bg-amber-900/10"
              )}
            >
              {/* Date number */}
              <span
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ml-auto block w-fit",
                  today
                    ? "bg-primary text-primary-foreground font-bold"
                    : isCurrentMonth
                    ? "text-foreground"
                    : "text-muted-foreground/50"
                )}
              >
                {format(day, "d")}
              </span>

              {/* Events — show up to 3, then "+N more" */}
              <div className="mt-0.5 space-y-0.5">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventPill
                    key={event.id}
                    event={event}
                    compact
                    onClick={onEventClick}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <p className="text-xs text-muted-foreground pl-1">
                    +{dayEvents.length - 3} more
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
