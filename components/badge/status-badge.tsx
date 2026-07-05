import * as React from "react"

import { cn } from "@/lib/utils"

export type StatusTone =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "muted"

const toneClasses: Record<StatusTone, { badge: string; dot: string }> = {
  primary: { badge: "bg-primary/10 text-primary", dot: "bg-primary" },
  success: { badge: "bg-success/10 text-success", dot: "bg-success" },
  warning: { badge: "bg-warning/15 text-warning-foreground", dot: "bg-warning" },
  destructive: { badge: "bg-destructive/10 text-destructive", dot: "bg-destructive" },
  muted: { badge: "bg-muted text-muted-foreground", dot: "bg-muted-foreground" },
}

export interface StatusBadgeProps extends React.ComponentProps<"span"> {
  tone?: StatusTone
  /** Pulsing dot for "live"/active statuses. */
  pulse?: boolean
}

/**
 * CRM V4 status badge — a pill with a leading tone dot, for entity states like
 * lead stage, invoice status or priority. Tonal (light tint) using semantic
 * tokens; the dot reinforces the state at a glance.
 */
export function StatusBadge({
  tone = "muted",
  pulse = false,
  className,
  children,
  ...props
}: StatusBadgeProps) {
  const t = toneClasses[tone]
  return (
    <span
      data-slot="status-badge"
      className={cn(
        "inline-flex h-5 w-fit items-center gap-1.5 rounded-full px-2 text-xs font-medium whitespace-nowrap",
        t.badge,
        className
      )}
      {...props}
    >
      <span className="relative flex size-1.5">
        {pulse ? (
          <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-75", t.dot)} />
        ) : null}
        <span className={cn("relative inline-flex size-1.5 rounded-full", t.dot)} />
      </span>
      {children}
    </span>
  )
}
