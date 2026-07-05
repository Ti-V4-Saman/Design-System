"use client"

import * as React from "react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** A single action row. */
export interface ActionEntry {
  type?: "action"
  label: string
  icon?: React.ComponentType<{ className?: string }>
  onSelect?: () => void
  shortcut?: string
  disabled?: boolean
  variant?: "default" | "destructive"
}

/** Non-interactive divider / section label. */
export type ActionsMenuEntry =
  | ActionEntry
  | { type: "separator" }
  | { type: "label"; label: string }

export interface ActionsMenuProps {
  /** Ordered menu entries (actions, separators, section labels). */
  actions: ActionsMenuEntry[]
  /** Custom trigger. Defaults to a ghost kebab (⋯) icon button. */
  trigger?: React.ReactNode
  /** Accessible label for the default kebab trigger. */
  label?: string
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  contentClassName?: string
}

/**
 * CRM V4 actions menu: a data-driven dropdown for row/bulk actions. Pass an
 * array of entries and it renders the kebab trigger + menu for you. Use the
 * primitives from `@/components/ui/dropdown-menu` directly when you need
 * checkboxes, radios or submenus.
 */
export function ActionsMenu({
  actions,
  trigger,
  label = "Abrir ações",
  align = "end",
  side,
  contentClassName,
}: ActionsMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {trigger ?? (
          <Button variant="ghost" size="icon" aria-label={label}>
            <MoreHorizontal />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side} className={contentClassName}>
        {actions.map((entry, i) => {
          if ("type" in entry && entry.type === "separator") {
            return <DropdownMenuSeparator key={`sep-${i}`} />
          }
          if ("type" in entry && entry.type === "label") {
            return <DropdownMenuLabel key={`label-${i}`}>{entry.label}</DropdownMenuLabel>
          }
          const action = entry as ActionEntry
          const Icon = action.icon
          return (
            <DropdownMenuItem
              key={`action-${i}`}
              variant={action.variant}
              disabled={action.disabled}
              onSelect={action.onSelect}
            >
              {Icon && <Icon className="size-4" />}
              {action.label}
              {action.shortcut && (
                <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
