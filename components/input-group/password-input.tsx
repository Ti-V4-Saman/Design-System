"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

export interface PasswordInputProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  containerClassName?: string
}

/**
 * Password field with a show/hide toggle. The toggle button never submits and is
 * excluded from the tab flow of a submit — it only reveals the value locally.
 */
export function PasswordInput({
  containerClassName,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false)

  return (
    <InputGroup className={containerClassName}>
      <InputGroupInput
        type={visible ? "text" : "password"}
        disabled={disabled}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
          disabled={disabled}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
