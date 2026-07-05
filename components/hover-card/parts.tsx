"use client"

import * as React from "react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { HoverAction, HoverBadge, HoverMeta, HoverStat, HoverStatus } from "./types"

/** Derive up to two uppercase initials from a display name. */
export function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
}

const statusBadgeClass: Record<HoverStatus, string> = {
  default: "bg-foreground/10 text-foreground border-foreground/20",
  primary: "bg-primary/10 text-primary border-primary/40",
  success: "bg-success/10 text-success border-success/40",
  warning: "bg-warning/15 text-warning-foreground border-warning/50",
  destructive: "bg-destructive/10 text-destructive border-destructive/40",
  info: "bg-info text-info-foreground border-info-foreground/25",
  muted: "bg-muted text-muted-foreground border-border",
}

const statusDotClass: Record<HoverStatus, string> = {
  default: "bg-muted-foreground",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
  info: "bg-info-foreground",
  muted: "bg-muted-foreground",
}

/** Small semantic status chip, matching the cards family. */
export function HoverStatusBadge({ label, variant = "muted" }: HoverBadge) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded border px-1.5 py-0.5 text-[11px] font-semibold",
        statusBadgeClass[variant]
      )}
    >
      {label}
    </span>
  )
}

/** Avatar + name + subtitle, with an optional trailing badge and a status dot. */
export function HoverHeader({
  avatarSrc,
  fallback,
  name,
  subtitle,
  badge,
  statusDot,
}: {
  avatarSrc?: string
  fallback: string
  name: string
  subtitle?: string
  badge?: HoverBadge
  statusDot?: HoverStatus
}) {
  return (
    <div className="flex items-start gap-3">
      <Avatar size="lg">
        {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
        <AvatarFallback className="bg-primary/10 font-semibold text-primary">
          {fallback}
        </AvatarFallback>
        {statusDot && (
          <AvatarBadge className={cn("size-3", statusDotClass[statusDot])} />
        )}
      </Avatar>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-center gap-2">
          <p className="truncate font-semibold text-foreground">{name}</p>
          {badge && <HoverStatusBadge label={badge.label} variant={badge.variant} />}
        </div>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

/** Vertical list of icon + text rows; rows with `href` become links. */
export function HoverMetaList({ items }: { items?: HoverMeta[] }) {
  if (!items?.length) return null
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((m, i) => {
        const Icon = m.icon
        const body = (
          <>
            {Icon && (
              <Icon className="size-3.5 shrink-0 text-muted-foreground/70" />
            )}
            <span className="truncate">{m.label}</span>
          </>
        )
        return m.href ? (
          <a
            key={i}
            href={m.href}
            className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {body}
          </a>
        ) : (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            {body}
          </div>
        )
      })}
    </div>
  )
}

/** Compact metric grid (up to 3 columns) with hairline dividers. */
export function HoverStatGrid({ stats }: { stats?: HoverStat[] }) {
  if (!stats?.length) return null
  const cols = Math.min(stats.length, 3)
  return (
    <div
      className="grid gap-px overflow-hidden rounded-md bg-border"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col gap-0.5 bg-popover px-3 py-2">
          <span className="text-sm font-semibold tabular-nums text-foreground">
            {s.value}
          </span>
          <span className="text-[11px] text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

/** Row of footer actions. `href` renders an anchor button; otherwise a button. */
export function HoverActions({ actions }: { actions?: HoverAction[] }) {
  if (!actions?.length) return null
  return (
    <div className="flex items-center gap-2">
      {actions.map((a, i) => {
        const Icon = a.icon
        const inner = (
          <>
            {Icon && <Icon data-icon="inline-start" />}
            {a.label}
          </>
        )
        return a.href ? (
          <Button
            key={i}
            asChild
            size="sm"
            variant={a.variant ?? "outline"}
            className="flex-1"
          >
            <a href={a.href}>{inner}</a>
          </Button>
        ) : (
          <Button
            key={i}
            size="sm"
            variant={a.variant ?? "outline"}
            className="flex-1"
            onClick={a.onClick}
          >
            {inner}
          </Button>
        )
      })}
    </div>
  )
}
