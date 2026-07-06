"use client"

import * as React from "react"
import { SlidersHorizontal } from "lucide-react"

import {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { SheetSize } from "./types"

export interface FilterSheetProps {
  /** Custom trigger; defaults to an outline "Filtros" button with a count badge. */
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  /** Filter controls. */
  children?: React.ReactNode
  /** Number of active filters — shown on the default trigger and footer. */
  activeCount?: number
  /** Apply handler (e.g. run the query). Closes the sheet via controlled state. */
  onApply?: () => void
  /** Clear-all handler. */
  onClear?: () => void
  applyLabel?: string
  clearLabel?: string
  /** Anchored side. Filters conventionally open from the right. @default "right" */
  size?: SheetSize
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  contentClassName?: string
}

/**
 * Filter panel: a right sheet holding filter controls with an Apply / Clear
 * footer. The default trigger is a "Filtros" button that shows the active count.
 */
export function FilterSheet({
  trigger,
  title = "Filtros",
  description,
  children,
  activeCount = 0,
  onApply,
  onClear,
  applyLabel = "Aplicar",
  clearLabel = "Limpar",
  size = "sm",
  open,
  onOpenChange,
  defaultOpen,
  contentClassName,
}: FilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <SheetTrigger asChild>
        {trigger ?? (
          <Button variant="outline" size="sm">
            <SlidersHorizontal data-icon="inline-start" />
            Filtros
            {activeCount > 0 && (
              <Badge variant="secondary" className="ml-1 rounded px-1.5 font-normal">
                {activeCount}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" size={size} className={contentClassName}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <SheetBody className="space-y-6">{children}</SheetBody>
        <SheetFooter className="sm:justify-between">
          <Button
            variant="ghost"
            type="button"
            onClick={onClear}
            disabled={activeCount === 0}
          >
            {clearLabel}
          </Button>
          <SheetClose asChild>
            <Button type="button" onClick={onApply}>
              {applyLabel}
              {activeCount > 0 && ` (${activeCount})`}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
