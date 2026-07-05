"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import type { QuestionTextInputProps } from "./types"

export function QuestionTextInput({
  value = "",
  onChange,
  placeholder = "Type your answer here…",
  multiline = false,
  maxLength,
  disabled = false,
  className,
}: QuestionTextInputProps) {
  if (multiline) {
    return (
      <div className={cn("flex flex-col gap-1", className)}>
        <textarea
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={4}
          className={cn(
            "w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm",
            "placeholder:text-muted-foreground",
            "shadow-sm outline-none transition-shadow",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[120px]"
          )}
        />
        {maxLength !== undefined && (
          <p className="text-right text-xs text-muted-foreground">
            {value.length} / {maxLength}
          </p>
        )}
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className="h-10 text-sm"
      />
      {maxLength !== undefined && (
        <p className="text-right text-xs text-muted-foreground">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  )
}
