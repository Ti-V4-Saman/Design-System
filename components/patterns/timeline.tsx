import * as React from "react"

import { cn } from "@/lib/utils"

type TimelineTone = "default" | "primary" | "success" | "warning" | "destructive"

const dotTone: Record<TimelineTone, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
}

export interface TimelineItemProps extends Omit<React.ComponentProps<"li">, "title"> {
  /** Icon rendered inside the node; falls back to a tone dot. */
  icon?: React.ReactNode
  tone?: TimelineTone
  title: React.ReactNode
  timestamp?: React.ReactNode
  /** Whether this is the last item (hides the connector). */
  last?: boolean
}

/**
 * Reusable timeline / activity feed — a vertical log of events with a connector
 * line and per-event node. For record history, audit logs and activity feeds.
 */
export function Timeline({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="timeline" className={cn("flex flex-col", className)} {...props} />
}

export function TimelineItem({
  icon,
  tone = "default",
  title,
  timestamp,
  last = false,
  className,
  children,
  ...props
}: TimelineItemProps) {
  return (
    <li data-slot="timeline-item" className={cn("relative flex gap-3 pb-5 last:pb-0", className)} {...props}>
      {/* node + connector */}
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "z-10 flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] ring-4 ring-background",
            icon ? "bg-muted text-foreground [&_svg]:size-3" : cn("size-2.5", dotTone[tone])
          )}
        >
          {icon}
        </span>
        {!last ? <span className="absolute top-6 h-full w-px bg-border" /> : null}
      </div>
      {/* content */}
      <div className="-mt-0.5 min-w-0 flex-1 pb-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <span className="text-sm font-medium text-foreground">{title}</span>
          {timestamp ? <span className="text-xs text-muted-foreground">{timestamp}</span> : null}
        </div>
        {children ? <div className="mt-0.5 text-sm text-muted-foreground">{children}</div> : null}
      </div>
    </li>
  )
}
