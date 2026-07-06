import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Scrollable conversation container. Holds Messages, MessageGroups,
 * DateSeparators and SystemMessages with consistent spacing.
 */
export function MessageThread({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="message-thread"
      className={cn("flex flex-col gap-3 overflow-y-auto p-4", className)}
      {...props}
    />
  )
}

/** Groups consecutive messages from the same sender (tighter spacing). */
export function MessageGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="message-group" className={cn("flex flex-col gap-1", className)} {...props} />
  )
}

/** Centered date/label divider inside a thread. */
export function DateSeparator({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="date-separator"
      className={cn("flex items-center justify-center py-1", className)}
      {...props}
    >
      <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
        {children}
      </span>
    </div>
  )
}

/** Centered muted system event (e.g. "Lead atribuído a Sara Ann"). */
export function SystemMessage({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="system-message"
      role="status"
      className={cn("flex items-center justify-center py-0.5 text-center", className)}
      {...props}
    >
      <span className="max-w-[80%] text-xs text-muted-foreground">{children}</span>
    </div>
  )
}
