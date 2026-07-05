"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChoiceCard } from "./choice-card"
import type { OptionListProps } from "./types"

const SHORTCUTS = ["A", "B", "C", "D", "E", "F", "G", "H"]

export function OptionList({
  options,
  value,
  multiple = false,
  disabled = false,
  onChange,
  className,
}: OptionListProps) {
  const selectedIds: string[] = React.useMemo(() => {
    if (!value) return []
    return Array.isArray(value) ? value : [value]
  }, [value])

  function handleSelect(id: string) {
    if (disabled) return
    if (multiple) {
      const next = selectedIds.includes(id)
        ? selectedIds.filter((v) => v !== id)
        : [...selectedIds, id]
      onChange?.(next)
    } else {
      onChange?.(id)
    }
  }

  // Keyboard shortcut: pressing A/B/C/... selects the corresponding option
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (disabled) return
      // Ignore when user is typing in an input/textarea
      const tag = (e.target as HTMLElement).tagName
      if (tag === "INPUT" || tag === "TEXTAREA") return

      const key = e.key.toUpperCase()
      const idx = SHORTCUTS.indexOf(key)
      if (idx === -1 || idx >= options.length) return
      e.preventDefault()
      handleSelect(options[idx].id)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled, options, selectedIds, multiple, onChange])

  return (
    <div className={cn("flex flex-col gap-2", className)} role={multiple ? "group" : "radiogroup"}>
      {options.map((opt, i) => (
        <ChoiceCard
          key={opt.id}
          id={opt.id}
          label={opt.label}
          description={opt.description}
          shortcut={SHORTCUTS[i]}
          selected={selectedIds.includes(opt.id)}
          disabled={disabled}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}
