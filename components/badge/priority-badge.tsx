import * as React from "react"

import { StatusBadge, type StatusTone } from "./status-badge"

export type Priority = "low" | "medium" | "high" | "urgent"

const priorityMap: Record<Priority, { tone: StatusTone; label: string }> = {
  low: { tone: "muted", label: "Baixa" },
  medium: { tone: "primary", label: "Média" },
  high: { tone: "warning", label: "Alta" },
  urgent: { tone: "destructive", label: "Urgente" },
}

export interface PriorityBadgeProps
  extends Omit<React.ComponentProps<typeof StatusBadge>, "tone" | "children"> {
  priority: Priority
  /** Override the default pt-BR label. */
  label?: React.ReactNode
}

/**
 * CRM V4 priority badge — maps a priority level to a semantic tone + label,
 * built on StatusBadge. For tasks, tickets and deals. Urgent pulses by default.
 */
export function PriorityBadge({ priority, label, ...props }: PriorityBadgeProps) {
  const p = priorityMap[priority]
  return (
    <StatusBadge tone={p.tone} pulse={priority === "urgent"} {...props}>
      {label ?? p.label}
    </StatusBadge>
  )
}
