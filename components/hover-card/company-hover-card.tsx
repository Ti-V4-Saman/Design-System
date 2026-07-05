"use client"

import * as React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import {
  HoverActions,
  HoverHeader,
  HoverMetaList,
  HoverStatGrid,
  HoverStatusBadge,
  initials,
} from "./parts"
import type {
  HoverAction,
  HoverBadge,
  HoverCardBaseProps,
  HoverMeta,
  HoverStat,
} from "./types"

export interface CompanyHoverCardProps extends HoverCardBaseProps {
  /** Company / client name. */
  name: string
  /** Industry or segment, shown as the subtitle. */
  industry?: string
  avatarSrc?: string
  fallback?: string
  /** Trailing badge next to the name (e.g. tier). */
  status?: HoverBadge
  /** Wrapping labels row (groups, tags). */
  labels?: HoverBadge[]
  /** Metric grid (projects, invoiced, due…). Up to 3 shown per row. */
  stats?: HoverStat[]
  /** Website / location rows. */
  meta?: HoverMeta[]
  actions?: HoverAction[]
}

/**
 * Rich preview for a company / client: monogram, tier badge, labels, a compact
 * metric grid and quick actions. Ideal on a client name in tables or headers.
 */
export function CompanyHoverCard({
  children,
  name,
  industry,
  avatarSrc,
  fallback,
  status,
  labels,
  stats,
  meta,
  actions,
  openDelay,
  closeDelay,
  side,
  align = "start",
  className,
}: CompanyHoverCardProps) {
  return (
    <HoverCard openDelay={openDelay} closeDelay={closeDelay}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        side={side}
        align={align}
        className={cn("flex flex-col gap-3", className)}
      >
        <HoverHeader
          avatarSrc={avatarSrc}
          fallback={fallback ?? initials(name)}
          name={name}
          subtitle={industry}
          badge={status}
        />

        {labels?.length ? (
          <div className="flex flex-wrap gap-1">
            {labels.map((l, i) => (
              <HoverStatusBadge key={i} label={l.label} variant={l.variant} />
            ))}
          </div>
        ) : null}

        <HoverStatGrid stats={stats} />
        <HoverMetaList items={meta} />

        {actions?.length ? (
          <div className="border-t border-border pt-3">
            <HoverActions actions={actions} />
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  )
}
