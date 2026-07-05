"use client"

import * as React from "react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  drawerVariants,
} from "@/components/ui/drawer"

export type DrawerSide = NonNullable<VariantProps<typeof drawerVariants>["side"]>
export type DrawerSize = NonNullable<VariantProps<typeof drawerVariants>["size"]>

export interface CRMDrawerProps {
  /** Element that opens the drawer. Rendered `asChild`, so pass a Button etc. */
  trigger?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Edge the panel is anchored to. Defaults to "right". */
  side?: DrawerSide
  /** Width (left/right) or height (top/bottom). Defaults to "default". */
  size?: DrawerSize
  /** Scrollable body content. */
  children?: React.ReactNode
  /** Footer actions (e.g. Cancel / Save buttons). */
  footer?: React.ReactNode
  /** Replaces the body with a skeleton placeholder while data loads. */
  loading?: boolean
  /** Renders the built-in close (X) button. Defaults to true. */
  showClose?: boolean
  /** Controlled open state. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Uncontrolled initial state. */
  defaultOpen?: boolean
  contentClassName?: string
  bodyClassName?: string
}

/**
 * CRM V4 drawer: a batteries-included side panel that assembles the drawer
 * primitives (header, scrollable body, footer) with sensible defaults and a
 * built-in loading skeleton. Use the primitives directly from
 * `@/components/ui/drawer` when you need full control over the markup.
 */
export function CRMDrawer({
  trigger,
  title,
  description,
  side = "right",
  size = "default",
  children,
  footer,
  loading = false,
  showClose = true,
  open,
  onOpenChange,
  defaultOpen,
  contentClassName,
  bodyClassName,
}: CRMDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        side={side}
        size={size}
        showClose={showClose}
        className={contentClassName}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <DrawerBody className={bodyClassName}>
          {loading ? <DrawerLoading /> : children}
        </DrawerBody>
        {footer && <DrawerFooter>{footer}</DrawerFooter>}
      </DrawerContent>
    </Drawer>
  )
}

/** Skeleton placeholder shown in the body while drawer content loads. */
export function DrawerLoading({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)} aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-3">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-4/6" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-3 w-2/5" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
    </div>
  )
}
