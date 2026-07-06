import * as React from "react"

import { cn } from "@/lib/utils"
import { Section } from "./layout"

// ─── Code ────────────────────────────────────────────────────────────────────

/** Monospaced, horizontally-scrollable code block. */
export function CodeBlock({ className, children, ...props }: React.ComponentProps<"pre">) {
  return (
    <pre
      data-slot="code-block"
      className={cn(
        "overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </pre>
  )
}

/** Inline keyboard key. */
export function Kbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-xs text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

// ─── API / Props table ───────────────────────────────────────────────────────

export interface ApiRow {
  prop: string
  type: string
  default?: string
  description: React.ReactNode
}

export function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Prop</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Default</th>
            <th className="px-4 py-2 font-medium">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.prop}>
              <td className="px-4 py-2 font-mono text-xs text-foreground">{r.prop}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.type}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.default ?? "—"}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** "API" section wrapping one or more ApiTables. */
export function ApiSection({
  groups,
  title = "API / Props",
  description,
}: {
  groups: ApiRow[][]
  title?: string
  description?: React.ReactNode
}) {
  return (
    <Section title={title} description={description}>
      <div className="space-y-4">
        {groups.map((rows, i) => (
          <ApiTable key={i} rows={rows} />
        ))}
      </div>
    </Section>
  )
}
