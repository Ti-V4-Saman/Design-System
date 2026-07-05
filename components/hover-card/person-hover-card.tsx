"use client"

import * as React from "react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils"
import { HoverActions, HoverHeader, HoverMetaList, initials } from "./parts"
import type {
  HoverAction,
  HoverBadge,
  HoverCardBaseProps,
  HoverMeta,
  HoverStatus,
} from "./types"

export interface PersonHoverCardProps extends HoverCardBaseProps {
  /** Full name. */
  name: string
  /** Role / job title, shown as the subtitle. */
  role?: string
  avatarSrc?: string
  /** Avatar initials; derived from `name` when omitted. */
  fallback?: string
  /** Trailing badge next to the name (e.g. "Owner", "VIP"). */
  status?: HoverBadge
  /** Presence dot on the avatar (online → `success`, away → `warning`…). */
  presence?: HoverStatus
  /** Contact rows: email, phone, location. */
  meta?: HoverMeta[]
  /** Footer actions (email, call, view profile…). */
  actions?: HoverAction[]
}

/**
 * Rich preview for a person (contact, owner, assignee). Wrap any focusable
 * trigger — a name link, an avatar, a table cell — and the card reveals on hover
 * or keyboard focus.
 */
export function PersonHoverCard({
  children,
  name,
  role,
  avatarSrc,
  fallback,
  status,
  presence,
  meta,
  actions,
  openDelay,
  closeDelay,
  side,
  align = "start",
  className,
}: PersonHoverCardProps) {
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
          subtitle={role}
          badge={status}
          statusDot={presence}
        />
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
