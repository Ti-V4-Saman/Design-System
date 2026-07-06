import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Page shell for every styleguide component page. Provides the canonical
 * container (`mx-auto max-w-5xl space-y-14 p-8 md:p-12`). Use once at the root.
 */
export function StyleguidePage({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="styleguide-page"
      className={cn("mx-auto max-w-5xl space-y-14 p-8 md:p-12", className)}
      {...props}
    />
  )
}

/** Page header — component name + one-line description (the Overview intro). */
export function ComponentHeader({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      {description ? (
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      ) : null}
      {children}
    </header>
  )
}

/** A titled documentation section. */
export function Section({
  title,
  description,
  children,
  id,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
  id?: string
}) {
  return (
    <section id={id} className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

/** Bordered preview surface for a live example. */
export function Demo({
  className,
  center = false,
  ...props
}: React.ComponentProps<"div"> & { center?: boolean }) {
  return (
    <div
      data-slot="demo"
      className={cn(
        "rounded-lg border border-border bg-card p-6",
        center && "flex flex-wrap items-center gap-4",
        className
      )}
      {...props}
    />
  )
}

/** Responsive grid of demos/tiles. */
export function DemoGrid({
  cols = 2,
  className,
  ...props
}: React.ComponentProps<"div"> & { cols?: 2 | 3 | 4 }) {
  return (
    <div
      className={cn(
        "grid gap-4",
        cols === 2 && "md:grid-cols-2",
        cols === 3 && "md:grid-cols-3",
        cols === 4 && "md:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    />
  )
}

export interface LabeledItem {
  label: string
  node: React.ReactNode
  /** Optional caption under the item. */
  hint?: string
}

/**
 * Grid of labeled examples — used for Variants and Sizes. Each cell shows the
 * example centered with its label below.
 */
export function VariantGrid({
  items,
  cols = 3,
  className,
}: {
  items: LabeledItem[]
  cols?: 2 | 3 | 4
  className?: string
}) {
  return (
    <Demo className={cn("grid gap-6", cols === 2 && "sm:grid-cols-2", cols === 3 && "sm:grid-cols-3", cols === 4 && "sm:grid-cols-2 lg:grid-cols-4", className)}>
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2 text-center">
          <div className="flex min-h-10 items-center justify-center">{item.node}</div>
          <div className="space-y-0.5">
            <code className="font-mono text-xs text-muted-foreground">{item.label}</code>
            {item.hint ? <p className="text-xs text-muted-foreground/70">{item.hint}</p> : null}
          </div>
        </div>
      ))}
    </Demo>
  )
}

/**
 * Row-based grid for States — label on the left, example on the right. Better
 * for wide interactive controls than the centered VariantGrid.
 */
export function StateGrid({ items, className }: { items: LabeledItem[]; className?: string }) {
  return (
    <Demo className={cn("divide-y divide-border/60", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
        >
          <div className="w-40 shrink-0">
            <code className="font-mono text-xs text-muted-foreground">{item.label}</code>
            {item.hint ? <p className="text-xs text-muted-foreground/70">{item.hint}</p> : null}
          </div>
          <div className="min-w-0 flex-1">{item.node}</div>
        </div>
      ))}
    </Demo>
  )
}
