"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CRMCalendar } from "@/components/calendar"
import { CRMDatePicker } from "@/components/date-picker"
import { CRMDateRangePicker } from "@/components/date-range-picker"
import type { CalendarEvent } from "@/components/calendar/types"

// Helper: date at specific hour in current month
function d(day: number, startHour: number, endHour: number): { start: Date; end: Date } {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  return {
    start: new Date(y, m, day, startHour, 0),
    end: new Date(y, m, day, endHour, 0),
  }
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1",  title: "Meeting with John Smith",         ...d(5,  6, 7),   color: "destructive", locked: true },
  { id: "2",  title: "Company Anniversary Celebration", ...d(6,  1, 2),   color: "success",     locked: true },
  { id: "3",  title: "Sustainability Symposium",         ...d(3, 10, 11),  color: "purple",      locked: true },
  { id: "4",  title: "Industry Panel Discussion",        ...d(10,19, 21),  color: "info",        locked: true },
  { id: "5",  title: "Leadership Summit",                ...d(19, 5, 6),   color: "success",     locked: true },
  { id: "6",  title: "Cultural Diversity Symposium",     ...d(20, 6, 7),   color: "muted",       locked: true },
  { id: "7",  title: "Work-Life Balance Workshop",       ...d(25, 8, 8),   color: "info",        locked: true },
  { id: "8",  title: "Networking Mixer",                 ...d(26,14,14),   color: "primary",     locked: true },
  { id: "9",  title: "Influencer Marketing Summit",      ...d(27, 3, 4),   color: "destructive", locked: true },
  { id: "10", title: "Vendor Meet and Greet",            ...d(27,16,17),   color: "destructive", locked: true },
  { id: "11", title: "Job Training Fair",                ...d(28, 6, 8),   color: "warning",     locked: true },
  { id: "12", title: "Women in Leadership Forum",        ...d(28, 0, 0),   color: "primary",     locked: true },
  { id: "13", title: "Sales Training Workshop",          ...d(15, 9, 11),  color: "success",     locked: true },
  { id: "14", title: "Customer Appreciation Day",        ...d(22, 9, 10),  color: "muted",       locked: true },
  { id: "15", title: "Health and Wellness Fair",         ...d(2,  8, 10),  color: "warning",     locked: true },
]

export default function CalendarPage() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>()
  const [dateRange, setDateRange] = React.useState<{ from: Date | undefined; to?: Date | undefined } | undefined>()

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Full-page event calendar and date picker components for the CRM V4 Design System.
        </p>
      </div>

      <Tabs defaultValue="full-calendar">
        <TabsList className="mb-6">
          <TabsTrigger value="full-calendar">Full Calendar</TabsTrigger>
          <TabsTrigger value="date-picker">Date Picker</TabsTrigger>
          <TabsTrigger value="date-range">Date Range</TabsTrigger>
        </TabsList>

        {/* Full Calendar */}
        <TabsContent value="full-calendar">
          <div className="h-[780px]">
            <CRMCalendar
              events={MOCK_EVENTS}
              defaultView="month"
              onEventClick={(e) => console.log("event clicked", e.title)}
              onDateClick={(d) => console.log("date clicked", d)}
              onAddEvent={() => console.log("add event")}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Week view preview */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Week View</h3>
              <div className="h-[400px] border border-border rounded-xl overflow-hidden">
                <CRMCalendar events={MOCK_EVENTS} defaultView="week" />
              </div>
            </div>

            {/* List view preview */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">List View</h3>
              <div className="h-[400px] border border-border rounded-xl overflow-hidden">
                <CRMCalendar events={MOCK_EVENTS} defaultView="list" />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Date Picker */}
        <TabsContent value="date-picker">
          <div className="max-w-sm space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Default</p>
              <CRMDatePicker value={singleDate} onChange={setSingleDate} />
              {singleDate && (
                <p className="text-xs text-muted-foreground">
                  Selected: {singleDate.toLocaleDateString()}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">With custom placeholder</p>
              <CRMDatePicker placeholder="Select closing date" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Disabled</p>
              <CRMDatePicker disabled />
            </div>
          </div>
        </TabsContent>

        {/* Date Range */}
        <TabsContent value="date-range">
          <div className="max-w-sm space-y-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Default</p>
              <CRMDateRangePicker value={dateRange} onChange={setDateRange} />
              {dateRange?.from && (
                <p className="text-xs text-muted-foreground">
                  From: {dateRange.from.toLocaleDateString()}
                  {dateRange.to && ` · To: ${dateRange.to.toLocaleDateString()}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">With placeholder</p>
              <CRMDateRangePicker placeholder="Select contract period" />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Disabled</p>
              <CRMDateRangePicker disabled />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
