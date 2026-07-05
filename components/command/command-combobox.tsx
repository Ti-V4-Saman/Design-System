"use client"

import * as React from "react"
import { ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import type { ComboboxOption } from "./types"

export interface CommandComboboxProps {
  options: ComboboxOption[]
  value?: string
  onChange?: (value: string) => void
  /** Trigger text when nothing is selected. */
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  /** Optional group heading inside the list. */
  heading?: string
  className?: string
  /** Width of the popover panel. Defaults to matching the trigger. */
  contentClassName?: string
}

/**
 * CRM V4 searchable select built on Command + Popover. Single-select with a
 * check on the active option, keyboard navigation and an empty state — for
 * pickers like owner, status or entity selection in forms.
 */
export function CommandCombobox({
  options,
  value,
  onChange,
  placeholder = "Selecionar…",
  searchPlaceholder = "Buscar…",
  emptyMessage = "Nenhuma opção encontrada.",
  disabled = false,
  heading,
  className,
  contentClassName,
}: CommandComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((option) => option.value === value)
  const SelectedIcon = selected?.icon

  const items = (
    <CommandGroup heading={heading}>
      {options.map((option) => {
        const Icon = option.icon
        const isSelected = option.value === value
        return (
          <CommandItem
            key={option.value}
            value={`${option.label} ${option.keywords?.join(" ") ?? ""}`}
            disabled={option.disabled}
            data-checked={isSelected}
            onSelect={() => {
              onChange?.(option.value === value ? "" : option.value)
              setOpen(false)
            }}
          >
            {Icon ? <Icon className="text-muted-foreground" /> : null}
            <span className="truncate">{option.label}</span>
          </CommandItem>
        )
      })}
    </CommandGroup>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-56 justify-between font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {SelectedIcon ? (
              <SelectedIcon className="size-4 shrink-0 text-muted-foreground" />
            ) : null}
            <span className="truncate">{selected?.label ?? placeholder}</span>
          </span>
          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", contentClassName)}
        align="start"
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {items}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
