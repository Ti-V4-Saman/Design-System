import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface TagProps extends React.ComponentProps<typeof Badge> {
  /** Renders a remove button; called when it's clicked. */
  onRemove?: () => void
  removeLabel?: string
}

/**
 * CRM V4 tag — a removable label chip built on Badge. For filters, applied
 * facets and free-form labels (segments, interests). Reuses Badge variants;
 * pass `onRemove` to show the dismiss affordance.
 */
export function Tag({
  variant = "secondary",
  onRemove,
  removeLabel = "Remover",
  className,
  children,
  ...props
}: TagProps) {
  return (
    <Badge variant={variant} className={cn(onRemove && "pr-1", className)} {...props}>
      {children}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className="-mr-0.5 inline-flex size-4 items-center justify-center rounded-full text-current/70 transition-colors hover:bg-foreground/10 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/50"
        >
          <X className="size-3" />
        </button>
      ) : null}
    </Badge>
  )
}
