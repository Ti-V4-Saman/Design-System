"use client"

import { cn } from "@/lib/utils"
import { getWeekDays, getDayHours, getEventsForHour, getEventColorClasses, isToday, format } from "./utils"
import type { CalendarEvent } from "./types"

interface WeekViewProps {
  currentDate: Date
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
}

export function WeekView({ currentDate, events, onEventClick }: WeekViewProps) {
  const days = getWeekDays(currentDate)
  const hours = getDayHours(currentDate)

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-auto">
      {/* Day header row */}
      <div className="grid border-b border-border sticky top-0 bg-background z-10"
        style={{ gridTemplateColumns: "4rem repeat(7, 1fr)" }}>
        <div className="border-r border-border" /> {/* time gutter */}
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "py-2 text-center border-r border-border last:border-r-0",
              isToday(day) && "bg-amber-50/60 dark:bg-amber-900/10"
            )}
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {format(day, "EEE")}
            </p>
            <p className={cn(
              "text-sm font-semibold mt-0.5",
              isToday(day) && "text-primary"
            )}>
              {format(day, "d")}
            </p>
          </div>
        ))}
      </div>

      {/* Time rows */}
      <div className="flex-1">
        {hours.map((hour) => (
          <div
            key={hour.toISOString()}
            className="grid border-b border-border/50 min-h-[56px]"
            style={{ gridTemplateColumns: "4rem repeat(7, 1fr)" }}
          >
            {/* Time label */}
            <div className="border-r border-border pr-2 pt-1 text-right">
              <span className="text-[11px] text-muted-foreground leading-none">
                {format(hour, "h a")}
              </span>
            </div>

            {/* Day columns */}
            {days.map((day) => {
              const hourDate = new Date(day)
              hourDate.setHours(hour.getHours(), 0, 0, 0)
              const slotEvents = getEventsForHour(events, hourDate)

              return (
                <div
                  key={day.toISOString()}
                  className={cn(
                    "border-r border-border/50 last:border-r-0 p-0.5 space-y-0.5",
                    isToday(day) && "bg-amber-50/30 dark:bg-amber-900/5"
                  )}
                >
                  {slotEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => onEventClick?.(event)}
                      className={cn(
                        "w-full text-left rounded px-1.5 py-1 text-xs font-medium border",
                        "truncate hover:opacity-80 transition-opacity",
                        getEventColorClasses(event.color)
                      )}
                    >
                      <p className="font-semibold truncate">{event.title}</p>
                      <p className="opacity-75 text-[10px]">
                        {format(event.start, "h:mm")}–{format(event.end, "h:mm a")}
                      </p>
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
