"use client"

import * as React from "react"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DrawerLoading } from "@/components/crm-drawer"
import { cn } from "@/lib/utils"
import type { SheetSide, SheetSize } from "./types"

export interface RecordSheetProps {
  /** Element that opens the sheet (rendered asChild). */
  trigger?: React.ReactNode
  /** Record name shown in the header. */
  name: string
  /** Subtitle under the name (role, company, stage…). */
  subtitle?: React.ReactNode
  avatarSrc?: string
  /** Avatar initials; derived from `name` when omitted. */
  fallback?: string
  /** Scrollable detail content. */
  children?: React.ReactNode
  /** Footer actions. */
  footer?: React.ReactNode
  /** Show a skeleton in the body while data loads. */
  loading?: boolean
  side?: SheetSide
  size?: SheetSize
  open?: boolean
  onOpenChange?: (open: boolean) => void
  defaultOpen?: boolean
  contentClassName?: string
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
}

/**
 * Record detail panel: an avatar header with name/subtitle over a scrollable
 * body. The canonical "open the record from a table row" pattern in the CRM.
 */
export function RecordSheet({
  trigger,
  name,
  subtitle,
  avatarSrc,
  fallback,
  children,
  footer,
  loading = false,
  side = "right",
  size = "default",
  open,
  onOpenChange,
  defaultOpen,
  contentClassName,
}: RecordSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side={side} size={size} className={contentClassName}>
        <SheetHeader className="flex-row items-center gap-3">
          <Avatar size="lg">
            {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {fallback ?? initials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <SheetTitle className="truncate">{name}</SheetTitle>
            {subtitle && (
              <SheetDescription className="truncate">{subtitle}</SheetDescription>
            )}
          </div>
        </SheetHeader>
        <SheetBody>{loading ? <DrawerLoading /> : children}</SheetBody>
        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

/** A labelled section inside a RecordSheet body. */
export function SheetSection({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("space-y-2", className)}>
      <h4 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {title}
      </h4>
      {children}
    </section>
  )
}

/** A key/value row for record details. */
export function SheetField({
  label,
  value,
}: {
  label: React.ReactNode
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5 text-sm">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="min-w-0 text-right font-medium text-foreground">{value}</span>
    </div>
  )
}
