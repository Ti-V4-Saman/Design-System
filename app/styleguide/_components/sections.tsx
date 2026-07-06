import * as React from "react"

import { cn } from "@/lib/utils"
import { Demo, Section } from "./layout"

// ─── Accessibility ───────────────────────────────────────────────────────────

export function AccessibilitySection({
  items,
  title = "Acessibilidade",
}: {
  items: React.ReactNode[]
  title?: string
}) {
  return (
    <Section title={title}>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </Section>
  )
}

// ─── Responsive ──────────────────────────────────────────────────────────────

export function ResponsiveSection({
  children,
  description,
  title = "Responsivo",
}: {
  children: React.ReactNode
  description?: React.ReactNode
  title?: string
}) {
  return (
    <Section title={title} description={description}>
      {children}
    </Section>
  )
}

// ─── Dark Mode ───────────────────────────────────────────────────────────────

/**
 * Renders the given content side-by-side in light and forced-dark surfaces.
 * `children` is rendered twice, so keep it presentational.
 */
export function DarkModeSection({
  children,
  description = "O mesmo componente nos dois temas — cores vêm dos tokens.",
  title = "Dark Mode",
}: {
  children: React.ReactNode
  description?: React.ReactNode
  title?: string
}) {
  return (
    <Section title={title} description={description}>
      <div className="grid gap-4 md:grid-cols-2">
        <ThemePane label="Light">{children}</ThemePane>
        <ThemePane label="Dark" dark>
          {children}
        </ThemePane>
      </div>
    </Section>
  )
}

function ThemePane({ label, dark, children }: { label: string; dark?: boolean; children: React.ReactNode }) {
  return (
    <div className={cn("space-y-3 rounded-lg border border-border bg-background p-6", dark && "dark")}>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

// ─── Guidelines (Do / Don't) ─────────────────────────────────────────────────

export function GuidelineCard({
  tone,
  title,
  items,
}: {
  tone: "do" | "dont"
  title?: string
  items: React.ReactNode[]
}) {
  const isDo = tone === "do"
  return (
    <div
      className={cn(
        "rounded-lg border p-4",
        isDo ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
      )}
    >
      <p className={cn("mb-2 text-sm font-semibold", isDo ? "text-success" : "text-destructive")}>
        {title ?? (isDo ? "Do" : "Don't")}
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </div>
  )
}

/** Best-practices section with paired Do / Don't cards. */
export function GuidelinesSection({
  dos,
  donts,
  title = "Boas práticas",
}: {
  dos: React.ReactNode[]
  donts: React.ReactNode[]
  title?: string
}) {
  return (
    <Section title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        <GuidelineCard tone="do" items={dos} />
        <GuidelineCard tone="dont" items={donts} />
      </div>
    </Section>
  )
}

// ─── Design notes ────────────────────────────────────────────────────────────

/** Design rationale / usage notes for a component. */
export function DesignNotes({
  items,
  title = "Notas de design",
}: {
  items: React.ReactNode[]
  title?: string
}) {
  return (
    <Section title={title}>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
    </Section>
  )
}

// ─── Related components ──────────────────────────────────────────────────────

export interface RelatedComponentLink {
  name: string
  href: string
  description?: React.ReactNode
}

/** Cross-links to related components. */
export function RelatedComponents({
  items,
  title = "Componentes relacionados",
}: {
  items: RelatedComponentLink[]
  title?: string
}) {
  return (
    <Section title={title}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40 hover:bg-accent"
          >
            <span className="text-sm font-medium text-foreground group-hover:text-primary">{item.name}</span>
            {item.description ? (
              <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
            ) : null}
          </a>
        ))}
      </div>
    </Section>
  )
}

// ─── Empty state helper (reused across pages) ────────────────────────────────

export function EmptyStatePreview({
  icon,
  title,
  description,
}: {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}) {
  return (
    <Demo className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      {icon ? <div className="text-muted-foreground/50">{icon}</div> : null}
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {description ? <p className="text-xs text-muted-foreground/70">{description}</p> : null}
    </Demo>
  )
}
