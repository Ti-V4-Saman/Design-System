import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// ─── Heading ─────────────────────────────────────────────────────────────────

const headingVariants = cva("font-heading text-foreground text-balance", {
  variants: {
    level: {
      1: "text-4xl font-bold tracking-tight",
      2: "text-3xl font-semibold tracking-tight",
      3: "text-2xl font-semibold tracking-tight",
      4: "text-xl font-medium",
      5: "text-lg font-medium",
      6: "text-base font-semibold",
    },
  },
  defaultVariants: { level: 2 },
})

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps
  extends Omit<React.ComponentProps<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  /** Overrides the rendered tag independently of the visual `level`. */
  as?: `h${HeadingLevel}`
}

/**
 * CRM V4 heading. `level` sets both the semantic tag and the visual size
 * (1=4xl bold … 6=base semibold), matching the Design Tokens scale. Use `as`
 * to keep the visual size but render a different tag for correct document order.
 */
export function Heading({ level = 2, as, className, ...props }: HeadingProps) {
  const Tag = (as ?? `h${level}`) as React.ElementType
  return <Tag className={cn(headingVariants({ level }), className)} {...props} />
}

// ─── Text ────────────────────────────────────────────────────────────────────

const textVariants = cva("", {
  variants: {
    variant: {
      lead: "text-lg leading-relaxed text-muted-foreground",
      body: "text-base leading-relaxed text-foreground",
      small: "text-sm text-muted-foreground",
      caption: "text-xs text-muted-foreground",
      overline: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
    },
    tone: {
      default: "",
      muted: "text-muted-foreground",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning-foreground",
      destructive: "text-destructive",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    truncate: { true: "truncate" },
  },
  defaultVariants: { variant: "body" },
})

export interface TextProps
  extends Omit<React.ComponentProps<"p">, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label"
  /** Clamp to N lines with an ellipsis. */
  clamp?: number
}

/**
 * CRM V4 body text with size variants (lead/body/small/caption/overline),
 * semantic tone, weight, truncation and multi-line clamping. Renders `<p>` by
 * default; use `as="span"` for inline.
 */
export function Text({
  as = "p",
  variant,
  tone,
  weight,
  truncate,
  clamp,
  className,
  style,
  ...props
}: TextProps) {
  const Tag = as as React.ElementType
  return (
    <Tag
      className={cn(
        textVariants({ variant, tone, weight, truncate }),
        clamp ? "overflow-hidden" : undefined,
        className
      )}
      style={
        clamp
          ? { display: "-webkit-box", WebkitLineClamp: clamp, WebkitBoxOrient: "vertical", ...style }
          : style
      }
      {...props}
    />
  )
}

// ─── Inline helpers ──────────────────────────────────────────────────────────

/** Inline code snippet. */
export function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className={cn(
        "rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground",
        className
      )}
      {...props}
    />
  )
}

/** Styled inline/text link. */
export function TextLink({ className, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-sm",
        className
      )}
      {...props}
    />
  )
}

export { headingVariants, textVariants }
