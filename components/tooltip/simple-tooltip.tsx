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

export interface SimpleTooltipProps {
  /** The trigger element (a single focusable node — Button, icon button, etc.). */
  children: React.ReactNode
  /** Tooltip text. */
  label: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Optional keyboard shortcut chip shown after the label. */
  shortcut?: string
  side?: Side
  align?: Align
  sideOffset?: number
  /** Open delay in ms (overrides the provider default of 200). */
  delayDuration?: number
  /** Disables the tooltip (renders the trigger only). */
  disabled?: boolean
  className?: string
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

/**
 * CRM V4 label tooltip — a concise hint on hover/focus. For a single line of
 * text with an optional icon and keyboard shortcut. Use {@link RichTooltip} for
 * title + description, and a Popover/HoverCard for interactive content.
 */
export function SimpleTooltip({
  children,
  label,
  icon,
  shortcut,
  side = "top",
  align = "center",
  sideOffset,
  delayDuration,
  disabled,
  className,
  open,
  defaultOpen,
  onOpenChange,
}: SimpleTooltipProps) {
  if (disabled) return <>{children}</>

  return (
    <Tooltip
      delayDuration={delayDuration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn("inline-flex items-center gap-1.5", className)}
      >
        {icon}
        <span>{label}</span>
        {shortcut ? <TooltipShortcut className="ml-0.5">{shortcut}</TooltipShortcut> : null}
      </TooltipContent>
    </Tooltip>
  )
}
