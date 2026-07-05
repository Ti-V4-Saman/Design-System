"use client"

import * as React from "react"
import { Check, User } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

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
  return <div className={cn("flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6", className)}>{children}</div>
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">{children}</pre>
}
function ApiTable({ rows }: { rows: Array<{ prop: string; type: string; def?: string; desc: string }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground"><tr><th className="px-4 py-2 font-medium">Prop</th><th className="px-4 py-2 font-medium">Tipo</th><th className="px-4 py-2 font-medium">Default</th><th className="px-4 py-2 font-medium">Descrição</th></tr></thead>
        <tbody className="divide-y divide-border">{rows.map((r) => (<tr key={r.prop}><td className="px-4 py-2 font-mono text-xs text-foreground">{r.prop}</td><td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.type}</td><td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.def ?? "—"}</td><td className="px-4 py-2 text-muted-foreground">{r.desc}</td></tr>))}</tbody>
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

export default function AvatarPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Avatar</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Representa uma pessoa ou entidade por imagem ou iniciais. Sempre circular, com fallback,
          indicador de status e agrupamento — para responsáveis, contatos e times no CRM.
        </p>
      </div>

      <Section title="Tamanhos" description="sm (24px), default (32px), lg (40px).">
        <Demo>
          <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>SA</AvatarFallback></Avatar>
        </Demo>
      </Section>

      <Section title="Fallback (iniciais)" description="Quando não há imagem, exibe iniciais. Tints tokenizados diferenciam pessoas.">
        <Demo>
          <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
          <Avatar><AvatarFallback><User className="size-4" /></AvatarFallback></Avatar>
        </Demo>
      </Section>

      <Section title="Com imagem" description="AvatarImage com fallback automático se a imagem falhar.">
        <Demo>
          <Avatar size="lg">
            <AvatarImage src="/avatar-demo.jpg" alt="Sara Ann" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">↑ imagem ausente → cai no fallback &quot;SA&quot;</span>
        </Demo>
      </Section>

      <Section title="Indicador de status" description="AvatarBadge posiciona um dot/ícone. A cor comunica presença (online/ausente/offline).">
        <Demo>
          <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" aria-label="Online" /></Avatar>
          <Avatar size="lg"><AvatarFallback>JD</AvatarFallback><AvatarBadge className="bg-warning" aria-label="Ausente" /></Avatar>
          <Avatar size="lg"><AvatarFallback>RG</AvatarFallback><AvatarBadge className="bg-muted-foreground" aria-label="Offline" /></Avatar>
          <Avatar size="lg"><AvatarFallback>MW</AvatarFallback><AvatarBadge className="bg-primary"><Check /></AvatarBadge></Avatar>
        </Demo>
      </Section>

      <Section title="Grupo (empilhado)" description="AvatarGroup sobrepõe avatares; AvatarGroupCount mostra o excedente.">
        <Demo className="flex-col items-start gap-5">
          <AvatarGroup>
            <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
            <Avatar><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
            <Avatar><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
          <AvatarGroup className="*:data-[slot=avatar]:ring-2">
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback className="bg-destructive/10 text-destructive">MW</AvatarFallback></Avatar>
          </AvatarGroup>
        </Demo>
      </Section>

      <Section title="Exemplos reais no CRM" description="Responsável em uma linha e time de um projeto.">
        <Demo className="flex-col items-stretch gap-5">
          <div className="flex items-center gap-3">
            <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Sara Ann</span>
              <span className="text-xs text-muted-foreground">Responsável · Halvorson Inc</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Time do projeto:</span>
            <AvatarGroup>
              <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
              <AvatarGroupCount className="size-6 text-xs">+3</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </Demo>
      </Section>

      <Section title="Dark Mode">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" /></Avatar>
            <AvatarGroup><Avatar><AvatarFallback>JD</AvatarFallback></Avatar><Avatar><AvatarFallback className="bg-primary/10 text-primary">RG</AvatarFallback></Avatar></AvatarGroup>
          </div>
          <div className="dark flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" /></Avatar>
            <AvatarGroup><Avatar><AvatarFallback>JD</AvatarFallback></Avatar><Avatar><AvatarFallback className="bg-primary/10 text-primary">RG</AvatarFallback></Avatar></AvatarGroup>
          </div>
        </div>
      </Section>

      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Dê <code className="font-mono text-xs">alt</code> descritivo à imagem; o fallback deve ser as iniciais do nome.</li>
          <li>• Use <code className="font-mono text-xs">aria-label</code> no AvatarBadge para descrever o status.</li>
          <li>• Não transmita informação só pela cor do status — combine com texto/tooltip quando necessário.</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"

<Avatar size="lg">
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback>{initials(user.name)}</AvatarFallback>
  <AvatarBadge className="bg-success" aria-label="Online" />
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <ApiTable rows={[
          { prop: "Avatar.size", type: '"sm" | "default" | "lg"', def: '"default"', desc: "Diâmetro (24/32/40px)." },
          { prop: "AvatarImage.src / alt", type: "string", desc: "Fonte da imagem e texto alternativo." },
          { prop: "AvatarFallback", type: "ReactNode", desc: "Iniciais/ícone exibidos sem imagem." },
          { prop: "AvatarBadge", type: "ReactNode + className", desc: "Indicador de status (cor via className)." },
          { prop: "AvatarGroup / AvatarGroupCount", type: "—", desc: "Empilhamento e contador de excedente." },
        ]} />
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Sempre forneça fallback com iniciais.",
            "Use tamanhos consistentes por contexto (sm em tabelas).",
            "Descreva o status do AvatarBadge com aria-label.",
            "Use AvatarGroupCount para times grandes.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não use avatares quadrados — mantenha circular.",
            "Não empilhe mais de ~5 sem contador.",
            "Não dependa só da cor do status.",
            "Não use imagens sem alt.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
