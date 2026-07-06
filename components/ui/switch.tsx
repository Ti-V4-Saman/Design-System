"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Switch — a Radix Switch styled with the CRM V4 tokens, matching the Checkbox/Radio controls.
 *
 * Off track = bg-input; on track = the tone token (primary by default, success for "active"
 * settings). The thumb is bg-background and slides via a group-data-checked translate. Focus,
 * disabled and Field-disabled states mirror the Checkbox exactly.
 * -----------------------------------------------------------------------------------------------*/

const switchTrack = cva(
  cn(
    "group/switch peer inline-flex shrink-0 items-center rounded-full border border-transparent p-0.5 transition-colors outline-none",
    "bg-input dark:bg-input/50",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed disabled:opacity-50 group-has-disabled/field:opacity-50"
  ),
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        default: "h-5 w-9",
        lg: "h-6 w-11",
      },
      tone: {
        primary: "data-checked:bg-primary",
        success: "data-checked:bg-success",
      },
    },
    defaultVariants: { size: "default", tone: "primary" },
  }
)

const switchThumb = cva(
  cn(
    "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform",
    "translate-x-0"
  ),
  {
    variants: {
      size: {
        sm: "size-3 group-data-checked/switch:translate-x-3",
        default: "size-4 group-data-checked/switch:translate-x-4",
        lg: "size-5 group-data-checked/switch:translate-x-5",
      },
    },
    defaultVariants: { size: "default" },
  }
)

export interface SwitchProps
  extends React.ComponentProps<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchTrack> {}

function Switch({ className, size = "default", tone = "primary", ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchTrack({ size, tone }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumb({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch, switchTrack }
