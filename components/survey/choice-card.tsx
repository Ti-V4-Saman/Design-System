"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import type { ChoiceCardProps } from "./types"

export function ChoiceCard({
  id,
  label,
  description,
  shortcut,
  selected = false,
  disabled = false,
  onSelect,
  className,
}: ChoiceCardProps) {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled}
      onClick={() => !disabled && onSelect?.(id)}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          onSelect?.(id)
        }
      }}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-150 outline-none",
        "hover:border-primary/40 hover:bg-primary/5",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        selected && "border-primary bg-primary/10",
        disabled && "cursor-not-allowed opacity-50 pointer-events-none",
        className
      )}
    >
      {shortcut && (
        <span
          className={cn(
            "flex h-6 w-6 shrink-0 items-center justify-center rounded text-xs font-bold",
            selected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {shortcut}
        </span>
      )}

      <div className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>

      {selected && <Check className="h-4 w-4 shrink-0 text-primary" />}
    </div>
  )
}
