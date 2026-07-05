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
  primary: "bg-primary text-primary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
  destructive: "bg-destructive/15 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
  purple: "bg-purple-100 text-purple-700",
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
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {value}
    </span>
  )
}
