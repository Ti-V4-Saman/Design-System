"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Info,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react"

export type CRMAlertDialogVariant = "default" | "destructive" | "warning" | "success"

export interface CRMAlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  variant?: CRMAlertDialogVariant
  title: string
  description: string
  cancelLabel?: string
  confirmLabel?: string
  onConfirm?: () => void
  onCancel?: () => void
  loading?: boolean
  children?: React.ReactNode
}

const variantConfig: Record<
  CRMAlertDialogVariant,
  {
    iconClass: string
    Icon: React.ElementType
    confirmVariant: "default" | "destructive"
  }
> = {
  default: {
    iconClass: "bg-primary/10 text-primary",
    Icon: Info,
    confirmVariant: "default",
  },
  destructive: {
    iconClass: "bg-destructive/10 text-destructive",
    Icon: Trash2,
    confirmVariant: "destructive",
  },
  warning: {
    iconClass: "bg-warning/20 text-warning-foreground",
    Icon: AlertTriangle,
    confirmVariant: "default",
  },
  success: {
    iconClass: "bg-success/10 text-success",
    Icon: CheckCircle2,
    confirmVariant: "default",
  },
}

export function CRMAlertDialog({
  open,
  onOpenChange,
  variant = "default",
  title,
  description,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  loading = false,
  children,
}: CRMAlertDialogProps) {
  const { iconClass, Icon, confirmVariant } = variantConfig[variant]

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia className={iconClass}>
            <Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="w-full">
          <AlertDialogCancel
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={loading}
            className="gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
