export type EventColorVariant =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"
  | "purple"

export type CalendarView = "month" | "week" | "day" | "list"

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  color?: EventColorVariant
  locked?: boolean
}

export interface CRMCalendarProps {
  events?: CalendarEvent[]
  defaultView?: CalendarView
  defaultDate?: Date
  onEventClick?: (event: CalendarEvent) => void
  onDateClick?: (date: Date) => void
  onAddEvent?: (date?: Date) => void
}
