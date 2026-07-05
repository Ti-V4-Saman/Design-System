"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"

export interface ChoiceFieldProps {
  /** id that links the label to the control (must match the control's id). */
  htmlFor: string
  /** The selectable control — a `<Checkbox>` or `<RadioGroupItem>`. */
  control: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  className?: string
}

/**
 * CRM V4 choice field: a bordered, selectable option card wrapping a checkbox
 * or radio with a title and description. The border is intentionally less
 * rounded (`rounded-md`) and the selected state uses the emerald `accent` tint.
 * Selection styling is driven by the control's checked state — no extra props.
 */
export function ChoiceField({
  htmlFor,
  control,
  title,
  description,
  disabled,
  className,
}: ChoiceFieldProps) {
  return (
    <FieldLabel htmlFor={htmlFor} className={cn("cursor-pointer", className)}>
      <Field
        orientation="horizontal"
        data-disabled={disabled || undefined}
        className="transition-colors"
      >
        {control}
        <FieldContent>
          <FieldTitle>{title}</FieldTitle>
          {description ? <FieldDescription>{description}</FieldDescription> : null}
        </FieldContent>
      </Field>
    </FieldLabel>
  )
}
