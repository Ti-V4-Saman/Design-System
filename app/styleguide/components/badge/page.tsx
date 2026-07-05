"use client"

import * as React from "react"
import { ArrowUpRight, Check, Clock, Sparkles, TriangleAlert, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/badge"

// ─── Page helpers ────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}

function Demo({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6", className)}>{children}</div>
}

function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">{children}</pre>
}

function ApiTable({ rows }: { rows: Array<{ prop: string; type: string; def?: string; desc: string }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground">
          <tr><th className="px-4 py-2 font-medium">Prop</th><th className="px-4 py-2 font-medium">Tipo</th><th className="px-4 py-2 font-medium">Default</th><th className="px-4 py-2 font-medium">Descrição</th></tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr key={r.prop}>
              <td className="px-4 py-2 font-mono text-xs text-foreground">{r.prop}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.type}</td>
              <td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.def ?? "—"}</td>
              <td className="px-4 py-2 text-muted-foreground">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GuidelineCard({ tone, title, items }: { tone: "do" | "dont"; title: string; items: string[] }) {
  const isDo = tone === "do"
  return (
    <div className={cn("rounded-lg border p-4", isDo ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5")}>
      <p className={cn("mb-2 text-sm font-semibold", isDo ? "text-success" : "text-destructive")}>{title}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BadgePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Badge</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Rótulos compactos para rotular, categorizar ou sinalizar o estado de uma entidade. Pílulas
          (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">rounded-full</code>) com
          tons semânticos do CRM V4.
        </p>
      </div>

      <Section title="Variantes" description="Tonais (status) e utilitárias. default é sólido (emerald); os demais são tints suaves.">
        <Demo>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="muted">Muted</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="ghost">Ghost</Badge>
        </Demo>
      </Section>

      <Section title="Status badge (com dot)" description="StatusBadge combina um dot de tom + rótulo — ideal para estados de registro. pulse para ativos ao vivo.">
        <Demo>
          <StatusBadge tone="primary">Em discussão</StatusBadge>
          <StatusBadge tone="success">Ganho</StatusBadge>
          <StatusBadge tone="warning">Novo</StatusBadge>
          <StatusBadge tone="destructive">Perdido</StatusBadge>
          <StatusBadge tone="muted">Inativo</StatusBadge>
          <StatusBadge tone="success" pulse>Ao vivo</StatusBadge>
        </Demo>
      </Section>

      <Section title="Com ícone" description="Ícone antes do texto (size 3) para reforçar o significado.">
        <Demo>
          <Badge variant="success"><Check /> Aprovado</Badge>
          <Badge variant="warning"><Clock /> Pendente</Badge>
          <Badge variant="destructive"><X /> Rejeitado</Badge>
          <Badge><Sparkles /> Novo</Badge>
          <Badge variant="outline">42 <ArrowUpRight /></Badge>
        </Demo>
      </Section>

      <Section title="Estados" description="Foco visível (Tab) e aria-invalid para sinalização de erro.">
        <Demo>
          <Badge tabIndex={0}>Focável</Badge>
          <Badge variant="outline" aria-invalid>Inválido</Badge>
          <Badge asChild variant="outline"><a href="#badge">Link (asChild)</a></Badge>
        </Demo>
      </Section>

      <Section title="Exemplos reais no CRM" description="Estados de lead, faturas e prioridade.">
        <Demo className="flex-col items-stretch gap-5">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Status de lead</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge tone="warning">Novo</StatusBadge>
              <StatusBadge tone="primary">Discussão</StatusBadge>
              <StatusBadge tone="muted">Qualificado</StatusBadge>
              <StatusBadge tone="success">Ganho</StatusBadge>
              <StatusBadge tone="destructive">Perdido</StatusBadge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Faturas</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success"><Check /> Paga</Badge>
              <Badge variant="warning"><Clock /> Pendente</Badge>
              <Badge variant="destructive"><TriangleAlert /> Vencida</Badge>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Prioridade</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="destructive">Alta</Badge>
              <Badge variant="warning">Média</Badge>
              <Badge variant="muted">Baixa</Badge>
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Dark Mode" description="Os tints se adaptam via tokens.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-6">
            <p className="w-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Badge variant="success">Ganho</Badge><Badge variant="warning">Novo</Badge><Badge variant="destructive">Perdido</Badge><StatusBadge tone="primary">Ativo</StatusBadge>
          </div>
          <div className="dark flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-6">
            <p className="w-full text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Badge variant="success">Ganho</Badge><Badge variant="warning">Novo</Badge><Badge variant="destructive">Perdido</Badge><StatusBadge tone="primary">Ativo</StatusBadge>
          </div>
        </div>
      </Section>

      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Badge é decorativo por padrão — o significado não deve depender só da cor; use texto/ícone.</li>
          <li>• Para badges interativos (filtros/links) use <code className="font-mono text-xs">asChild</code> com um elemento focável.</li>
          <li>• Sinalização de erro via <code className="font-mono text-xs">aria-invalid</code>.</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/badge"

<Badge variant="success"><Check /> Paga</Badge>
<Badge variant="warning">Média</Badge>

// Status com dot (e pulse para "ao vivo")
<StatusBadge tone="success">Ganho</StatusBadge>
<StatusBadge tone="success" pulse>Ao vivo</StatusBadge>

// Badge como link
<Badge asChild variant="outline"><a href="/leads">Ver leads</a></Badge>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable rows={[
            { prop: "Badge.variant", type: '"default"|"secondary"|"success"|"warning"|"destructive"|"muted"|"outline"|"ghost"|"link"', def: '"default"', desc: "Tom/estilo do badge." },
            { prop: "Badge.asChild", type: "boolean", def: "false", desc: "Renderiza no elemento filho (ex.: <a>)." },
          ]} />
          <ApiTable rows={[
            { prop: "StatusBadge.tone", type: '"primary"|"success"|"warning"|"destructive"|"muted"', def: '"muted"', desc: "Tom do dot + tint." },
            { prop: "StatusBadge.pulse", type: "boolean", def: "false", desc: "Dot pulsante para estados ao vivo." },
          ]} />
        </div>
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Use tons semânticos consistentes (success=ganho, warning=pendente, destructive=erro).",
            "Combine cor + texto (e ícone/dot) para acessibilidade.",
            "Mantenha rótulos curtos (1–2 palavras).",
            "Use StatusBadge para estados de registro em tabelas.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não use badge como botão — use Button.",
            "Não dependa só da cor para transmitir o estado.",
            "Não empilhe muitos badges na mesma linha.",
            "Não use o variant sólido (default) para status tonais.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
