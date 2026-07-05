"use client"

import * as React from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Currency symbol shown as the leading addon. @default "$" */
  currency?: string
  /** ISO-style code shown as a trailing addon (e.g. "USD", "BRL"). */
  code?: string
  containerClassName?: string
}

/**
 * Money field: currency symbol prefix and optional currency-code suffix, with a
 * right-aligned tabular numeric control. For deal values, invoice amounts, etc.
 */
export function CurrencyInput({
  currency = "$",
  code,
  containerClassName,
  className,
  inputMode = "decimal",
  placeholder = "0.00",
  ...props
}: CurrencyInputProps) {
  return (
    <InputGroup className={containerClassName}>
      <InputGroupAddon>
        <InputGroupText>{currency}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        inputMode={inputMode}
        placeholder={placeholder}
        className={cn("text-right tabular-nums", className)}
        {...props}
      />
      {code && (
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-xs font-medium">{code}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
