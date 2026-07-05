"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface FormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: React.ReactNode
  description?: React.ReactNode
  /** Form fields. */
  children: React.ReactNode
  /** Called on submit (Enter or the confirm button). May be async. */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  submitLabel?: string
  cancelLabel?: string
  /** Shows a spinner, disables actions and blocks closing. */
  loading?: boolean
  /** Disables the submit button (e.g. invalid form). */
  submitDisabled?: boolean
  /** Renders the confirm button with the destructive tone. */
  destructive?: boolean
  size?: "sm" | "md" | "lg" | "xl" | "full"
  /** Optional element that opens the dialog (wrapped in DialogTrigger). */
  trigger?: React.ReactNode
}

/**
 * CRM V4 form modal for creating/editing entities. Wraps the content in a
 * `<form>` (Enter submits), keeps a scrollable body between a fixed header and
 * footer, and blocks closing while `loading` so a submit can't be interrupted.
 * For confirmations/destructive prompts use CRMAlertDialog instead.
 */
export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Salvar",
  cancelLabel = "Cancelar",
  loading = false,
  submitDisabled = false,
  destructive = false,
  size = "md",
  trigger,
}: FormDialogProps) {
  const isFull = size === "full"

  const handleOpenChange = (next: boolean) => {
    // Block closing (ESC, overlay, X, Cancel) while a submit is in flight.
    if (loading && !next) return
    onOpenChange(next)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit?.(event)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      <DialogContent size={size} className={cn(isFull && "p-0")}>
        <form onSubmit={handleSubmit} className={cn("flex flex-col gap-4", isFull && "h-full p-4")}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>

          <div
            className={cn(
              "-mx-1 space-y-4 overflow-y-auto px-1",
              isFull ? "min-h-0 flex-1" : "max-h-[60vh]"
            )}
          >
            {children}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={loading}>
                {cancelLabel}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              variant={destructive ? "destructive" : "default"}
              disabled={loading || submitDisabled}
            >
              {loading ? <Loader2 className="animate-spin" /> : null}
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
