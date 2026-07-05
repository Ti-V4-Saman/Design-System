"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TooltipShortcut } from "./tooltip-shortcut"

type Side = "top" | "right" | "bottom" | "left"
type Align = "start" | "center" | "end"

export interface RichTooltipProps {
  /** The trigger element (a single focusable node). */
  children: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Optional leading icon next to the title. */
  icon?: React.ReactNode
  /** Optional keyboard shortcut chip aligned to the title row. */
  shortcut?: string
  /**
   * Optional action row. Note: tooltip actions are reachable by mouse only —
   * for keyboard-critical actions use a Popover or HoverCard instead.
   */
  actions?: React.ReactNode
  side?: Side
  align?: Align
  sideOffset?: number
  delayDuration?: number
  className?: string
}

/**
 * CRM V4 rich tooltip — a titled hint with an optional description, shortcut and
 * mouse-only actions. Uses the light popover surface for readable multi-line
 * content. For interactive content that must be keyboard-accessible, prefer a
 * Popover or HoverCard.
 */
export function RichTooltip({
  children,
  title,
  description,
  icon,
  shortcut,
  actions,
  side = "top",
  align = "center",
  sideOffset,
  delayDuration,
  className,
}: RichTooltipProps) {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("flex max-w-xs flex-col gap-1.5 p-3", className)}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            {icon}
            {title}
          </span>
          {shortcut ? <TooltipShortcut>{shortcut}</TooltipShortcut> : null}
        </div>
        {description ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
        {actions ? <div className="mt-1 flex items-center gap-2">{actions}</div> : null}
      </TooltipContent>
    </Tooltip>
  )
}
