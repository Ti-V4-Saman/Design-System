"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Drawer — a side/edge panel built on the Radix Dialog primitive.
 *
 * Radix provides the modal behavior (focus trap, scroll lock, ESC to close, aria wiring). The CRM
 * V4 visual language is applied entirely via design tokens (bg-card, shadow-modal, border-border).
 * The `side` prop anchors the panel to any edge; `size` controls width (left/right) or height
 * (top/bottom).
 * -----------------------------------------------------------------------------------------------*/

const drawerVariants = cva(
  cn(
    "fixed z-50 flex flex-col bg-card text-card-foreground shadow-[var(--shadow-modal)]",
    "transition ease-in-out",
    "data-[state=open]:animate-in data-[state=open]:duration-300",
    "data-[state=closed]:animate-out data-[state=closed]:duration-200"
  ),
  {
    variants: {
      side: {
        right:
          "inset-y-0 right-0 h-full border-l border-border data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        left: "inset-y-0 left-0 h-full border-r border-border data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left",
        top: "inset-x-0 top-0 w-full rounded-b-xl border-b border-border data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top",
        bottom:
          "inset-x-0 bottom-0 w-full rounded-t-xl border-t border-border data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
      },
      size: { sm: "", default: "", lg: "", xl: "", full: "" },
    },
    compoundVariants: [
      // Left/right drawers: `size` maps to width.
      { side: ["left", "right"], size: "sm", class: "w-full max-w-sm" },
      { side: ["left", "right"], size: "default", class: "w-full max-w-md" },
      { side: ["left", "right"], size: "lg", class: "w-full max-w-lg" },
      { side: ["left", "right"], size: "xl", class: "w-full max-w-2xl" },
      { side: ["left", "right"], size: "full", class: "w-screen max-w-none" },
      // Top/bottom drawers: `size` maps to height.
      { side: ["top", "bottom"], size: "sm", class: "h-[30vh]" },
      { side: ["top", "bottom"], size: "default", class: "h-[40vh]" },
      { side: ["top", "bottom"], size: "lg", class: "h-[55vh]" },
      { side: ["top", "bottom"], size: "xl", class: "h-[75vh]" },
      { side: ["top", "bottom"], size: "full", class: "h-screen" },
    ],
    defaultVariants: { side: "right", size: "default" },
  }
)

function Drawer({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/60",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

interface DrawerContentProps
  extends React.ComponentProps<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  /** Renders the built-in close (X) button. Defaults to true. */
  showClose?: boolean
}

function DrawerContent({
  className,
  children,
  side = "right",
  size = "default",
  showClose = true,
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        className={cn(drawerVariants({ side, size }), className)}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            data-slot="drawer-close-button"
            className={cn(
              "absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-md",
              "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
              "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              "disabled:pointer-events-none"
            )}
          >
            <X className="size-4" />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex flex-col gap-1.5 border-b border-border p-6 pr-14",
        className
      )}
      {...props}
    />
  )
}

function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("flex-1 overflow-y-auto p-6", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border p-6 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold leading-snug text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerVariants,
}
