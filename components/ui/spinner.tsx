"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------------------------------
 * Spinner — the CRM V4 loading indicator.
 *
 * Three looks, one API: a thin CSS ring (default, enterprise), the Loader2 icon (matches the
 * Button's built-in spinner) and animated dots (subtle inline). Color follows `currentColor` by
 * default, so a spinner inherits the text color of its context; the `tone` prop pins it to a
 * semantic token. Always exposes `role="status"` + an sr-only label for assistive tech.
 * -----------------------------------------------------------------------------------------------*/

const spinnerSize = {
  xs: "size-3",
  sm: "size-4",
  default: "size-5",
  lg: "size-6",
  xl: "size-8",
} as const

const ringBorder = {
  xs: "border-[1.5px]",
  sm: "border-2",
  default: "border-2",
  lg: "border-[3px]",
  xl: "border-[3px]",
} as const

const dotSize = {
  xs: "size-1",
  sm: "size-1",
  default: "size-1.5",
  lg: "size-2",
  xl: "size-2.5",
} as const

const toneClass = {
  current: "text-current",
  muted: "text-muted-foreground",
  primary: "text-primary",
  destructive: "text-destructive",
  success: "text-success",
} as const

const spinnerVariants = cva("inline-flex shrink-0", {
  variants: {
    tone: toneClass,
  },
  defaultVariants: { tone: "current" },
})

export interface SpinnerProps
  extends Omit<React.ComponentProps<"span">, "children">,
    VariantProps<typeof spinnerVariants> {
  /** Visual style. @default "ring" */
  variant?: "ring" | "icon" | "dots"
  /** @default "default" */
  size?: keyof typeof spinnerSize
  /** Accessible label announced by screen readers. @default "Carregando" */
  label?: string
  /** Render the label as visible text beside the spinner. */
  showLabel?: boolean
}

function Spinner({
  className,
  variant = "ring",
  size = "default",
  tone,
  label = "Carregando",
  showLabel = false,
  ...props
}: SpinnerProps) {
  const indicator =
    variant === "icon" ? (
      <Loader2 className={cn("animate-spin", spinnerSize[size])} aria-hidden />
    ) : variant === "dots" ? (
      <span className="inline-flex items-center gap-1" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn("animate-bounce rounded-full bg-current", dotSize[size])}
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </span>
    ) : (
      <span
        className={cn(
          "animate-spin rounded-full border-current border-t-transparent",
          spinnerSize[size],
          ringBorder[size]
        )}
        aria-hidden
      />
    )

  return (
    <span
      data-slot="spinner"
      data-variant={variant}
      role="status"
      className={cn(
        spinnerVariants({ tone }),
        showLabel ? "items-center gap-2" : "",
        className
      )}
      {...props}
    >
      {indicator}
      {showLabel ? (
        <span className="text-sm text-muted-foreground">{label}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </span>
  )
}

export interface SpinnerOverlayProps extends React.ComponentProps<"div"> {
  /** Toggles the overlay. When false, nothing renders. @default true */
  show?: boolean
  /** Optional caption under the spinner. */
  label?: React.ReactNode
  /** Spinner size. @default "lg" */
  size?: SpinnerProps["size"]
  /** Spinner look. @default "ring" */
  variant?: SpinnerProps["variant"]
  /** Blur the covered content behind the scrim. @default false */
  blur?: boolean
  /** Scrim opacity token strength: soft (card/60) or solid (card/80). @default "soft" */
  scrim?: "soft" | "solid" | "none"
}

/**
 * Fills the nearest positioned ancestor with a centered spinner and a scrim,
 * blocking interaction while an area loads. Wrap the target in a
 * `relative` container and drop a `<SpinnerOverlay show={loading} />` inside it.
 */
function SpinnerOverlay({
  className,
  show = true,
  label,
  size = "lg",
  variant = "ring",
  blur = false,
  scrim = "soft",
  tone = "primary",
  ...props
}: SpinnerOverlayProps & Pick<SpinnerProps, "tone">) {
  if (!show) return null
  return (
    <div
      data-slot="spinner-overlay"
      className={cn(
        "absolute inset-0 z-10 flex flex-col items-center justify-center gap-3",
        scrim === "soft" && "bg-card/60",
        scrim === "solid" && "bg-card/80",
        blur && "backdrop-blur-[1px]",
        className
      )}
      {...props}
    >
      <Spinner variant={variant} size={size} tone={tone} label={typeof label === "string" ? label : "Carregando"} />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  )
}

export { Spinner, SpinnerOverlay, spinnerVariants }
