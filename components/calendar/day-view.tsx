"use client"

import { cn } from "@/lib/utils"
import { getDayHours, getEventsForHour, getEventColorClasses, isToday, format } from "./utils"
import type { CalendarEvent } from "./types"

interface DayViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function DayView({ currentDate, events, onEventClick }: DayViewProps) {
  const hours = getDayHours(currentDate)
  const today = isToday(currentDate)

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-auto">
      {/* Day header */}
      <div className={cn(
        "py-3 text-center border-b border-border sticky top-0 bg-background z-10",
        today && "bg-amber-50/60 dark:bg-amber-900/10"
      )}>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {format(currentDate, "EEEE")}
        </p>
        <p className={cn("text-2xl font-bold mt-0.5", today && "text-primary")}>
          {format(currentDate, "d")}
        </p>
      </div>

      {/* Hours */}
      <div className="flex-1">
        {hours.map((hour) => {
          const slotEvents = getEventsForHour(events, hour)

          return (
            <div
              key={hour.toISOString()}
              className="flex border-b border-border/50 min-h-[64px]"
            >
              {/* Time label */}
              <div className="w-16 shrink-0 border-r border-border pr-3 pt-1 text-right">
                <span className="text-[11px] text-muted-foreground">{format(hour, "h a")}</span>
              </div>

              {/* Event slot */}
              <div className="flex-1 p-1 space-y-1">
                {slotEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => onEventClick?.(event)}
                    className={cn(
                      "w-full text-left rounded-md px-3 py-2 text-sm font-medium border",
                      "hover:opacity-80 transition-opacity",
                      getEventColorClasses(event.color)
                    )}
                  >
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs opacity-75 mt-0.5">
                      {format(event.start, "h:mm a")} – {format(event.end, "h:mm a")}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
