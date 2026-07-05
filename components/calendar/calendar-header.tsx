"use client"

import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format, addMonths, addWeeks, addDays, startOfWeek, endOfWeek } from "date-fns"
import type { CalendarView } from "./types"

const VIEWS: { key: CalendarView; label: string }[] = [
  { key: "month", label: "month" },
  { key: "week", label: "week" },
  { key: "day", label: "day" },
  { key: "list", label: "list" },
]

function getTitle(date: Date, view: CalendarView): string {
  if (view === "month" || view === "list") return format(date, "MMMM yyyy")
  if (view === "day") return format(date, "MMMM d, yyyy")
  // week
  const ws = startOfWeek(date, { weekStartsOn: 0 })
  const we = endOfWeek(date, { weekStartsOn: 0 })
  if (ws.getMonth() === we.getMonth()) {
    return `${format(ws, "MMM d")} – ${format(we, "d, yyyy")}`
  }
  return `${format(ws, "MMM d")} – ${format(we, "MMM d, yyyy")}`
}

interface CalendarHeaderProps {
  currentDate: Date
  view: CalendarView
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  onViewChange: (view: CalendarView) => void
  onAddEvent?: () => void
}

export function CalendarHeader({
  currentDate,
  view,
  onPrev,
  onNext,
  onToday,
  onViewChange,
  onAddEvent,
}: CalendarHeaderProps) {
  const title = getTitle(currentDate, view)

  return (
    <div className="flex flex-col gap-3 pb-4 border-b border-border">
      {/* Top row: title left, actions right */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Event calendar</h2>
        <div className="flex items-center gap-2">
          {onAddEvent && (
            <Button size="sm" onClick={onAddEvent} className="gap-1.5">
              <Plus className="h-4 w-4" />
              Add event
            </Button>
          )}
        </div>
      </div>

      {/* Bottom row: nav left, month title center, view switcher right */}
      <div className="flex items-center gap-3">
        {/* Navigation */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onPrev} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onNext} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onToday} className="h-8 text-xs">
            today
          </Button>
        </div>

        {/* Centered title */}
        <h3 className="flex-1 text-center text-base font-semibold text-foreground">
          {title}
        </h3>

        {/* View switcher */}
        <div className="flex items-center rounded-md border border-border overflow-hidden">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              onClick={() => onViewChange(v.key)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium border-r border-border last:border-r-0 transition-colors",
                view === v.key
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
