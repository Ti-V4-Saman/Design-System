"use client"

import * as React from "react"
import { Phone } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

/** Formats raw digits as a Brazilian phone: (11) 98765-4321 / (11) 3456-7890. */
export function formatBRPhone(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 11)
  if (d.length <= 2) return d
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}

export interface PhoneInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  /** Country code shown as a leading addon. @default "+55" */
  countryCode?: string
  containerClassName?: string
}

/**
 * Phone field with a leading country code and live Brazilian masking as the user
 * types. For contact/lead phone numbers. The masked value is written back to the
 * input, so controlled usage reads `e.target.value` already formatted.
 */
export function PhoneInput({
  countryCode = "+55",
  containerClassName,
  className,
  placeholder = "(11) 98765-4321",
  onChange,
  ...props
}: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    // Count digits left of the caret so we can restore it after re-masking —
    // otherwise the caret jumps to the end when editing mid-number.
    const caret = input.selectionStart ?? input.value.length
    const digitsBeforeCaret = input.value.slice(0, caret).replace(/\D/g, "").length

    const formatted = formatBRPhone(input.value)
    input.value = formatted

    // Re-place the caret after the same number of digits in the masked value.
    let pos = 0
    for (let seen = 0; pos < formatted.length && seen < digitsBeforeCaret; pos++) {
      if (/\d/.test(formatted[pos])) seen++
    }
    input.setSelectionRange(pos, pos)

    onChange?.(e)
  }
  return (
    <InputGroup className={containerClassName}>
      <InputGroupAddon>
        <Phone className="size-4 text-muted-foreground" />
        <InputGroupText className="text-xs font-medium">{countryCode}</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder={placeholder}
        className={cn("tabular-nums", className)}
        onChange={handleChange}
        {...props}
      />
    </InputGroup>
  )
}
