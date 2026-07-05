"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export interface CopyInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "readOnly" | "onCopy"> {
  /** The value to display and copy (API keys, webhook URLs, share links…). */
  value: string
  /** Render the value in a monospace font. @default true */
  mono?: boolean
  /** Called after a successful copy. */
  onCopy?: (value: string) => void
  containerClassName?: string
}

/**
 * Read-only value with a one-click copy button that flips to a check for ~1.5s.
 * For secrets and shareable identifiers surfaced in the CRM.
 */
export function CopyInput({
  value,
  mono = true,
  onCopy,
  containerClassName,
  className,
  ...props
}: CopyInputProps) {
  const [copied, setCopied] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopy?.(value)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unavailable (insecure context) — no-op
    }
  }

  return (
    <InputGroup className={containerClassName}>
      <InputGroupInput
        readOnly
        value={value}
        onFocus={(e) => e.currentTarget.select()}
        className={cn(mono && "font-mono text-xs", className)}
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label={copied ? "Copiado" : "Copiar"}
          onClick={handleCopy}
          className={cn(copied && "text-success")}
        >
          {copied ? <Check /> : <Copy />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
