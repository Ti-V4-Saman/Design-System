import * as React from "react"

import { cn } from "@/lib/utils"

/** Small keyboard-shortcut chip for use inside tooltips (e.g. "⌘K", "G then C"). */
export function TooltipShortcut({
  className,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex h-4 items-center rounded border border-border bg-muted px-1 font-mono text-[10px] font-medium text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
