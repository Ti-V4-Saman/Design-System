import { cn } from "@/lib/utils"

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"
  | "purple"

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary/10 text-primary border-primary/40",
  success: "bg-success/10 text-success border-success/40",
  warning: "bg-warning/15 text-warning-foreground border-warning/50",
  destructive: "bg-destructive/10 text-destructive border-destructive/40",
  info: "bg-info text-info-foreground border-info-foreground/25",
  muted: "bg-muted text-muted-foreground border-border",
  purple: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/40",
}

interface CellBadgeProps {
  value: string
  variant?: BadgeVariant
  className?: string
}

export function CellBadge({ value, variant = "muted", className }: CellBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-2.5 py-0.5 text-xs font-semibold border",
        variantClasses[variant],
        className
      )}
    >
      {value}
    </span>
  )
}
