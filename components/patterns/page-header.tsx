import * as React from "react"

import { cn } from "@/lib/utils"

export interface PageHeaderProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  /** Breadcrumb node rendered above the title. */
  breadcrumb?: React.ReactNode
  /** Actions rendered on the right (buttons, split buttons, toolbars). */
  actions?: React.ReactNode
  /** Optional leading element (avatar, icon, back button). */
  leading?: React.ReactNode
}

/**
 * Reusable page header — breadcrumb + title + description on the left, actions
 * on the right. The standard top block for CRM record/list/detail screens.
 */
export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  leading,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <div data-slot="page-header" className={cn("flex flex-col gap-4 border-b border-border pb-5", className)} {...props}>
      {breadcrumb}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          {leading}
          <div className="min-w-0 space-y-1">
            <h1 className="truncate text-xl font-semibold text-foreground md:text-2xl">{title}</h1>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
        {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  )
}
