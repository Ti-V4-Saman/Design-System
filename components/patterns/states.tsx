import * as React from "react"
import { OctagonAlert, RotateCw } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// ─── Empty state ─────────────────────────────────────────────────────────────

export interface EmptyStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  /** Primary action (usually a Button). */
  action?: React.ReactNode
  size?: "sm" | "md"
}

/**
 * Reusable empty state — icon + title + description + optional action. For
 * tables, lists, search results and blank panels across the CRM.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  size = "md",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-slot="empty-state"
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-2 text-center",
        size === "md" ? "py-12" : "py-8",
        className
      )}
      {...props}
    >
      {icon ? (
        <div className={cn("mb-1 text-muted-foreground/50", size === "md" ? "[&_svg]:size-8" : "[&_svg]:size-6")}>
          {icon}
        </div>
      ) : null}
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description ? (
        <p className="max-w-sm text-xs text-muted-foreground">{description}</p>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  )
}

// ─── Error state ─────────────────────────────────────────────────────────────

export interface ErrorStateProps extends Omit<React.ComponentProps<"div">, "title"> {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Retry handler — renders a "Tentar novamente" button when provided. */
  onRetry?: () => void
  retryLabel?: string
}

/** Reusable error state — for failed loads/actions, with an optional retry. */
export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar os dados. Tente novamente.",
  onRetry,
  retryLabel = "Tentar novamente",
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      data-slot="error-state"
      role="alert"
      className={cn("flex flex-col items-center justify-center gap-2 py-12 text-center", className)}
      {...props}
    >
      <OctagonAlert className="mb-1 size-8 text-destructive" />
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description ? <p className="max-w-sm text-xs text-muted-foreground">{description}</p> : null}
      {onRetry ? (
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          <RotateCw /> {retryLabel}
        </Button>
      ) : null}
    </div>
  )
}

// ─── Loading state ───────────────────────────────────────────────────────────

export interface LoadingStateProps extends React.ComponentProps<"div"> {
  /** Skeleton shape to render. */
  variant?: "rows" | "cards" | "list"
  /** Number of skeleton items. */
  count?: number
}

/** Reusable skeleton loading placeholder in common CRM shapes. */
export function LoadingState({
  variant = "rows",
  count = 4,
  className,
  ...props
}: LoadingStateProps) {
  const items = Array.from({ length: count })
  return (
    <div data-slot="loading-state" aria-busy="true" className={cn("w-full", className)} {...props}>
      {variant === "rows" ? (
        <div className="space-y-2">
          {items.map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="size-8 shrink-0 rounded-full" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ) : null}
      {variant === "list" ? (
        <div className="space-y-2">
          {items.map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
        </div>
      ) : null}
      {variant === "cards" ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((_, i) => (
            <div key={i} className="space-y-3 rounded-xl border border-border p-4">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}
