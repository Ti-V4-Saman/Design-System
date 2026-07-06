"use client"

import * as React from "react"

import { Switch, type SwitchProps } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface SettingSwitchProps
  extends Omit<SwitchProps, "id"> {
  /** Setting name. */
  label: React.ReactNode
  /** Supporting text under the label. */
  description?: React.ReactNode
  /** Optional leading icon. */
  icon?: React.ReactNode
  /** Puts the switch before the label (default is trailing on the right). */
  align?: "start" | "end"
  className?: string
}

/**
 * A labelled setting row: optional icon + label/description with a trailing
 * Switch. The ubiquitous "toggle a preference" pattern (notifications,
 * integrations, feature flags). Clicking the label toggles the switch.
 */
export function SettingSwitch({
  label,
  description,
  icon,
  align = "end",
  className,
  disabled,
  size,
  tone,
  ...props
}: SettingSwitchProps) {
  const id = React.useId()
  const control = (
    <Switch id={id} disabled={disabled} size={size} tone={tone} {...props} />
  )
  return (
    <div
      data-slot="setting-switch"
      className={cn(
        "flex items-center gap-3",
        disabled && "opacity-60",
        className
      )}
    >
      {align === "start" && control}
      {icon && (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:size-4">
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <Label htmlFor={id} className="font-medium">
          {label}
        </Label>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {align === "end" && control}
    </div>
  )
}
