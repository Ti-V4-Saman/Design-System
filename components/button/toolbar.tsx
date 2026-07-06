import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * CRM V4 toolbar — a bordered container that groups action buttons (usually
 * icon buttons) with optional separators. For table/editor/record action bars.
 */
export function Toolbar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar"
      role="toolbar"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-border bg-card p-1",
        className
      )}
      {...props}
    />
  )
}

/** Vertical divider between toolbar groups. */
export function ToolbarSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toolbar-separator"
      role="separator"
      aria-orientation="vertical"
      className={cn("mx-0.5 h-5 w-px shrink-0 bg-border", className)}
      {...props}
    />
  )
}

/** Groups related toolbar items so separators can sit between groups. */
export function ToolbarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="toolbar-group" className={cn("flex items-center gap-0.5", className)} {...props} />
}
