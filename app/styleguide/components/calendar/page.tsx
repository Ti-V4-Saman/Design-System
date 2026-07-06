"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CRMCalendar } from "@/components/calendar"
import { CRMDatePicker } from "@/components/date-picker"
import { CRMDateRangePicker } from "@/components/date-range-picker"
import type { CalendarEvent } from "@/components/calendar/types"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

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
    <StyleguidePage>
      <ComponentHeader
        title="Calendar"
        description="Full-page event calendar (month · week · day · list) plus popover date and date-range pickers for the CRM V4 Design System. Event colors map to the shared semantic token set."
      />

      <Section
        title="Views & Pickers"
        description="Switch between the full event calendar, the single date picker and the date-range picker."
      >
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
      </Section>

      <AccessibilitySection
        title="Accessibility"
        items={[
          <>The pickers build on the Radix Popover + react-day-picker grid: the trigger button toggles with <code className="font-mono text-xs">Enter</code>/<code className="font-mono text-xs">Space</code>, and focus moves into the calendar on open.</>,
          <>Inside the calendar grid, arrow keys move between days, <code className="font-mono text-xs">Esc</code> closes the popover and returns focus to the trigger.</>,
          <>Disabled pickers set the underlying <code className="font-mono text-xs">disabled</code> attribute, removing them from the tab order.</>,
          <>Event colors are decorative — the event title always carries the meaning, so information is never conveyed by color alone.</>,
          <>The calendar header exposes real buttons for prev/next/today and view switching, all reachable by keyboard.</>,
        ]}
      />

      <DarkModeSection description="Pickers and event colors in both themes — surfaces, borders and semantic event colors all resolve from tokens.">
        <div className="space-y-4">
          <CRMDatePicker placeholder="Pick a date" />
          <CRMDateRangePicker placeholder="Pick a range" />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMCalendar } from "@/components/calendar"
import { CRMDatePicker } from "@/components/date-picker"
import { CRMDateRangePicker } from "@/components/date-range-picker"
import type { CalendarEvent } from "@/components/calendar/types"

const events: CalendarEvent[] = [
  { id: "1", title: "Kickoff", start, end, color: "primary" },
]

// Full calendar — default view + event/date callbacks
<CRMCalendar events={events} defaultView="month"
  onEventClick={(e) => open(e)} onAddEvent={() => create()} />

// Single date picker (controlled)
<CRMDatePicker value={date} onChange={setDate} placeholder="Pick a date" />

// Date range picker (controlled)
<CRMDateRangePicker value={range} onChange={setRange} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        groups={[
          [
            { prop: "CRMCalendar.events", type: "CalendarEvent[]", default: "[]", description: "Events to render across all views." },
            { prop: "CRMCalendar.defaultView", type: '"month" | "week" | "day" | "list"', default: '"month"', description: "Initial view; switchable in the header." },
            { prop: "CRMCalendar.defaultDate", type: "Date", default: "new Date()", description: "Date the calendar first centers on." },
            { prop: "CRMCalendar.onEventClick", type: "(event: CalendarEvent) => void", description: "Fired when an event pill is clicked." },
            { prop: "CRMCalendar.onDateClick", type: "(date: Date) => void", description: "Fired when a day cell is clicked (month view)." },
            { prop: "CRMCalendar.onAddEvent", type: "(date?: Date) => void", description: "Fired by the header add-event action." },
          ],
          [
            { prop: "CalendarEvent", type: "{ id, title, start: Date, end: Date, color?, locked? }", description: "Event shape; color is an EventColorVariant." },
            { prop: "EventColorVariant", type: '"primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple"', default: '"muted"', description: "Semantic color of the event pill." },
          ],
          [
            { prop: "CRMDatePicker", type: "{ value?: Date, onChange?, placeholder?, disabled? }", description: "Single-date popover picker (mode=\"single\")." },
            { prop: "CRMDateRangePicker", type: "{ value?: DateRange, onChange?, placeholder?, disabled? }", description: "Two-month range popover picker (mode=\"range\")." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Best Practices"
        dos={[
          "Give the full CRMCalendar a fixed-height container — it fills its parent (h-full).",
          "Use event color variants semantically (destructive for conflicts, success for confirmed).",
          "Control the pickers with value/onChange when the date feeds a form.",
          "Use the date-range picker for contract periods and reporting windows.",
        ]}
        donts={[
          "Don't render CRMCalendar without a height — it will collapse.",
          "Don't rely on event color alone to convey status; keep a descriptive title.",
          "Don't reimplement a raw <input type=\"date\"> — use the CRM pickers for token-consistent surfaces.",
          "Don't hardcode event colors outside the EventColorVariant set.",
        ]}
      />
    </StyleguidePage>
  )
}
