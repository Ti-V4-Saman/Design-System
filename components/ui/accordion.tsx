"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Accordion — built on the Radix Accordion primitive.
 *
 * Radix provides the disclosure semantics (single/multiple, keyboard nav, aria, height var for the
 * open/close animation). CRM V4 look comes from tokens: `default` renders a divided list, `card`
 * renders each item as its own bordered surface. Height animates via tw-animate-css
 * (animate-accordion-down/up + --radix-accordion-content-height).
 * -----------------------------------------------------------------------------------------------*/

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item> & {
  variant?: "default" | "card"
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      data-variant={variant}
      className={cn(
        "border-border",
        variant === "default" && "border-b last:border-b-0",
        variant === "card" &&
          "mb-2 rounded-lg border bg-card px-4 shadow-[var(--shadow-card)] last:mb-0",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left text-sm font-medium text-foreground outline-none transition-colors",
          "hover:text-primary focus-visible:text-primary",
          "rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          "[&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
      )}
      {...props}
    >
      <div className={cn("pb-4 pt-0 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
