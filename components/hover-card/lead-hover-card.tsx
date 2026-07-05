"use client"

import * as React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { HoverActions, HoverHeader, HoverMetaList, initials } from "./parts"
import type {
  HoverAction,
  HoverBadge,
  HoverCardBaseProps,
  HoverMeta,
} from "./types"

export interface LeadHoverCardProps extends HoverCardBaseProps {
  /** Lead / deal name. */
  name: string
  /** Primary contact, shown as the subtitle. */
  contact?: string
  avatarSrc?: string
  fallback?: string
  /** Pipeline stage badge (New, Qualified, Won…). */
  stage?: HoverBadge
  /** Formatted deal value (e.g. "$12,500"). */
  value?: string
  /** Deal owner shown with a small avatar. */
  owner?: { name: string; avatarSrc?: string }
  /** Extra rows: created date, next step… */
  meta?: HoverMeta[]
  actions?: HoverAction[]
}

/**
 * Rich preview for a lead / deal: stage badge, headline value, owner and quick
 * actions. Designed for a lead name in the pipeline table or kanban.
 */
export function LeadHoverCard({
  children,
  name,
  contact,
  avatarSrc,
  fallback,
  stage,
  value,
  owner,
  meta,
  actions,
  openDelay,
  closeDelay,
  side,
  align = "start",
  className,
}: LeadHoverCardProps) {
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
          subtitle={contact}
          badge={stage}
        />

        {(value || owner) && (
          <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
            {value && (
              <div className="flex flex-col">
                <span className="text-[11px] text-muted-foreground">Valor</span>
                <span className="text-sm font-semibold tabular-nums text-foreground">
                  {value}
                </span>
              </div>
            )}
            {owner && (
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-muted-foreground">Responsável</span>
                  <span className="text-xs font-medium text-foreground">
                    {owner.name}
                  </span>
                </div>
                <Avatar size="sm">
                  {owner.avatarSrc && (
                    <AvatarImage src={owner.avatarSrc} alt={owner.name} />
                  )}
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {initials(owner.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        )}

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
