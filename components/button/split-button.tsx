"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, type buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ButtonGroup } from "./button-group"
import type { VariantProps } from "class-variance-authority"

export interface SplitButtonAction {
  label: React.ReactNode
  icon?: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export interface SplitButtonProps
  extends VariantProps<typeof buttonVariants> {
  /** Primary action label. */
  children: React.ReactNode
  /** Primary action handler. */
  onClick?: () => void
  /** Secondary actions shown in the dropdown. */
  actions: SplitButtonAction[]
  disabled?: boolean
  loading?: boolean
  className?: string
  /** Alignment of the dropdown menu. */
  align?: "start" | "center" | "end"
}

/**
 * CRM V4 split button — a primary action joined to a dropdown of secondary
 * actions (e.g. "Salvar" + "Salvar e novo / Salvar como rascunho"). Composed
 * from Button + ButtonGroup + DropdownMenu.
 */
export function SplitButton({
  children,
  onClick,
  actions,
  variant = "default",
  size = "default",
  disabled,
  loading,
  className,
  align = "end",
}: SplitButtonProps) {
  return (
    <ButtonGroup className={className}>
      <Button variant={variant} size={size} onClick={onClick} disabled={disabled} loading={loading}>
        {children}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            disabled={disabled || loading}
            aria-label="Mais ações"
            className={cn("px-2")}
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>
          {actions.map((action, i) => (
            <DropdownMenuItem key={i} onSelect={action.onSelect} disabled={action.disabled}>
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
