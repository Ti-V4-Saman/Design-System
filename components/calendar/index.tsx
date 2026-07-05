"use client"

import * as React from "react"
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns"
import { CalendarHeader } from "./calendar-header"
import { MonthView } from "./month-view"
import { WeekView } from "./week-view"
import { DayView } from "./day-view"
import { ListView } from "./list-view"
import type { CRMCalendarProps, CalendarView } from "./types"

export function CRMCalendar({
  events = [],
  defaultView = "month",
  defaultDate,
  onEventClick,
  onDateClick,
  onAddEvent,
}: CRMCalendarProps) {
  const [view, setView] = React.useState<CalendarView>(defaultView)
  const [currentDate, setCurrentDate] = React.useState<Date>(defaultDate ?? new Date())

  function handlePrev() {
    if (view === "month" || view === "list") setCurrentDate((d) => subMonths(d, 1))
    else if (view === "week") setCurrentDate((d) => subWeeks(d, 1))
    else setCurrentDate((d) => subDays(d, 1))
  }

  function handleNext() {
    if (view === "month" || view === "list") setCurrentDate((d) => addMonths(d, 1))
    else if (view === "week") setCurrentDate((d) => addWeeks(d, 1))
    else setCurrentDate((d) => addDays(d, 1))
  }

  function handleToday() {
    setCurrentDate(new Date())
  }

  return (
    <div className="flex flex-col h-full bg-background border border-border rounded-xl overflow-hidden">
      <div className="px-6 pt-5">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
          onViewChange={setView}
          onAddEvent={onAddEvent}
        />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col px-0">
        {view === "month" && (
          <MonthView
            currentDate={currentDate}
            events={events}
            onDateClick={onDateClick}
            onEventClick={onEventClick}
          />
        )}
        {view === "week" && (
          <WeekView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        )}
        {view === "day" && (
          <DayView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        )}
        {view === "list" && (
          <ListView
            currentDate={currentDate}
            events={events}
            onEventClick={onEventClick}
          />
        )}
      </div>
    </div>
  )
}
