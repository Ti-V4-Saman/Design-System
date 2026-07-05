"use client"

import * as React from "react"
import { Loader2, Search, X } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

export interface SearchInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "type"> {
  /** Controlled value. Omit for uncontrolled usage (with `defaultValue`). */
  value?: string
  /** Fires with the new string on every change. */
  onValueChange?: (value: string) => void
  /** Native change handler (still called). */
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  /** Show a spinner instead of the search icon while a query runs. */
  loading?: boolean
  /** Show the clear (×) button when there is text. @default true */
  clearable?: boolean
  /** Called when the clear button is pressed. */
  onClear?: () => void
  /** Class for the InputGroup container. */
  containerClassName?: string
}

/**
 * Search field: leading search icon (or spinner while `loading`), with a clear
 * button that appears once there's text. The workhorse for table/global search.
 */
export function SearchInput({
  value,
  defaultValue,
  onValueChange,
  onChange,
  loading = false,
  clearable = true,
  onClear,
  placeholder = "Buscar...",
  containerClassName,
  className,
  disabled,
  ...props
}: SearchInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const isControlled = value !== undefined
  const [internal, setInternal] = React.useState(
    typeof defaultValue === "string" ? defaultValue : ""
  )
  const current = isControlled ? value : internal

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setInternal(e.target.value)
    onValueChange?.(e.target.value)
    onChange?.(e)
  }

  const handleClear = () => {
    if (!isControlled) setInternal("")
    onValueChange?.("")
    onClear?.()
    inputRef.current?.focus()
  }

  const showClear = clearable && !loading && !disabled && current.length > 0

  return (
    <InputGroup className={containerClassName}>
      <InputGroupAddon>
        {loading ? (
          <Loader2 className="animate-spin text-muted-foreground" aria-hidden />
        ) : (
          <Search aria-hidden />
        )}
      </InputGroupAddon>
      <InputGroupInput
        ref={inputRef}
        type="search"
        value={current}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("[&::-webkit-search-cancel-button]:appearance-none", className)}
        {...props}
      />
      {showClear && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Limpar busca"
            onClick={handleClear}
          >
            <X />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  )
}
