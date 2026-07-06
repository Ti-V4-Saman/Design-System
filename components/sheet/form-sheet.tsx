"use client"

import * as React from "react"

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
import type { SheetSide, SheetSize } from "./types"

export interface FormSheetProps {
  /** Element that opens the sheet (rendered asChild). */
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Form fields / body content. */
  children?: React.ReactNode
  /** Submit handler; receives the native form event. */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
  /** Primary action label. @default "Salvar" */
  submitLabel?: string
  /** Cancel action label. @default "Cancelar" */
  cancelLabel?: string
  /** Disables/►spinner on the submit button. */
  submitting?: boolean
  /** Variant of the submit button. @default "default" */
  submitVariant?: React.ComponentProps<typeof Button>["variant"]
  side?: SheetSide
  size?: SheetSize
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  contentClassName?: string
}

/**
 * Quick-create / edit panel: a sheet whose body is a `<form>` with a sticky
 * footer of Cancel + Submit. Wire `onSubmit` and control `open` to close on
 * success. The workhorse for "New lead", "Edit deal", etc.
 */
export function FormSheet({
  trigger,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  submitting = false,
  submitVariant = "default",
  side = "right",
  size = "default",
  open,
  onOpenChange,
  defaultOpen,
  contentClassName,
}: FormSheetProps) {
  const formId = React.useId()
  return (
    <Sheet open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} size={size} className={contentClassName}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <SheetBody>
          <form
            id={formId}
            onSubmit={(e) => {
              e.preventDefault()
              onSubmit?.(e)
            }}
            className="space-y-5"
          >
            {children}
          </form>
        </SheetBody>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost" type="button">
              {cancelLabel}
            </Button>
          </SheetClose>
          <Button
            type="submit"
            form={formId}
            variant={submitVariant}
            loading={submitting}
          >
            {submitLabel}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
