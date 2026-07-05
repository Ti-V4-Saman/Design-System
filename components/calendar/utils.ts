import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isToday,
  format,
  addDays,
  setHours,
  setMinutes,
} from "date-fns"
import type { CalendarEvent, EventColorVariant } from "./types"

/** Returns the 35–42 day cells needed to fill a month calendar grid (Sun–Sat). */
export function getMonthDays(date: Date): Date[] {
  const monthStart = startOfMonth(date)
  const monthEnd = endOfMonth(date)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })
  return eachDayOfInterval({ start: gridStart, end: gridEnd })
}

/** Returns the 7 days of the week containing `date` (Sun–Sat). */
export function getWeekDays(date: Date): Date[] {
  const weekStart = startOfWeek(date, { weekStartsOn: 0 })
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
}

/** Returns 24 Date objects for each hour of `date` (00:00–23:00). */
export function getDayHours(date: Date): Date[] {
  return Array.from({ length: 24 }, (_, i) =>
    setMinutes(setHours(new Date(date), i), 0)
  )
}

/** Returns events that fall on a specific day (by start date). */
export function getEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  return events.filter((e) => isSameDay(e.start, day))
}

/** Returns events that overlap a specific hour slot. */
export function getEventsForHour(events: CalendarEvent[], hour: Date): CalendarEvent[] {
  return events.filter((e) => {
    const h = hour.getHours()
    return isSameDay(e.start, hour) && e.start.getHours() === h
  })
}

const variantClasses: Record<EventColorVariant, string> = {
  primary:     "bg-primary/10 text-primary border-primary/40",
  success:     "bg-success/10 text-success border-success/40",
  warning:     "bg-warning/15 text-warning-foreground border-warning/50",
  destructive: "bg-destructive/10 text-destructive border-destructive/40",
  info:        "bg-info/20 text-info-foreground border-info-foreground/25",
  muted:       "bg-muted text-muted-foreground border-border",
  purple:      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/40",
}

export function getEventColorClasses(variant: EventColorVariant = "muted"): string {
  return variantClasses[variant]
}

export { isSameDay, isSameMonth, isToday, format }
