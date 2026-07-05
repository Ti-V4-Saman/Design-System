import type * as React from "react"

/** Semantic status palette, aligned with the cards family (`CardVariant`). */
export type HoverStatus =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"

/** A labelled metric shown in the hover card's stat grid. */
export interface HoverStat {
  label: string
  value: React.ReactNode
}

/** A key/value row with an optional leading icon (email, phone, location…). */
export interface HoverMeta {
  icon?: React.ComponentType<{ className?: string }>
  label: string
  href?: string
}

/** A footer action button. `href` renders an anchor; otherwise a button. */
export interface HoverAction {
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onClick?: () => void
  href?: string
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive"
}

export interface HoverBadge {
  label: string
  variant?: HoverStatus
}

/** Positioning + trigger props shared by every CRM hover-card preset. */
export interface HoverCardBaseProps {
  /** The trigger — must be a single focusable element (rendered via `asChild`). */
  children: React.ReactNode
  openDelay?: number
  closeDelay?: number
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  /** Extra classes for the floating content surface. */
  className?: string
}
