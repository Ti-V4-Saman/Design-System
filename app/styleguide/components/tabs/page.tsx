"use client"

import * as React from "react"
import {
  Activity,
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  Shield,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// ─── Page helpers (padrão do styleguide CRM V4) ──────────────────────────────

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function Demo({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)}>
      {children}
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
      {children}
    </pre>
  )
}

function ApiTable({
  rows,
}: {
  rows: Array<{ prop: string; type: string; def?: string; desc: string }>
}) {
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
    <div
      className={cn(
        "rounded-lg border p-4",
        isDo ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"
      )}
    >
      <p className={cn("mb-2 text-sm font-semibold", isDo ? "text-success" : "text-destructive")}>
        {title}
      </p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  )
}

function CountBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="ml-1 h-5 min-w-5 justify-center px-1 tabular-nums">
      {children}
    </Badge>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Overview */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Tabs</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Organizam conteúdo relacionado em seções alternáveis dentro do mesmo contexto — detalhe de
          cliente, configurações, relatórios. Base Radix (acessível por teclado); visual 100% CRM V4
          com variante <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">line</code>{" "}
          em <span className="font-medium text-primary">emerald</span>.
        </p>
      </div>

      {/* Variants */}
      <Section
        title="Variantes"
        description="default (segmentado, para troca de visão) e line (sublinhado, para navegação de página)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Demo>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">default</p>
            <Tabs defaultValue="geral">
              <TabsList>
                <TabsTrigger value="geral">Visão geral</TabsTrigger>
                <TabsTrigger value="ativ">Atividades</TabsTrigger>
                <TabsTrigger value="arq">Arquivos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="pt-4 text-muted-foreground">Conteúdo da visão geral.</TabsContent>
              <TabsContent value="ativ" className="pt-4 text-muted-foreground">Timeline de atividades.</TabsContent>
              <TabsContent value="arq" className="pt-4 text-muted-foreground">Arquivos anexados.</TabsContent>
            </Tabs>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">line</p>
            <Tabs defaultValue="geral">
              <TabsList variant="line">
                <TabsTrigger value="geral">Visão geral</TabsTrigger>
                <TabsTrigger value="ativ">Atividades</TabsTrigger>
                <TabsTrigger value="arq">Arquivos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="pt-4 text-muted-foreground">Conteúdo da visão geral.</TabsContent>
              <TabsContent value="ativ" className="pt-4 text-muted-foreground">Timeline de atividades.</TabsContent>
              <TabsContent value="arq" className="pt-4 text-muted-foreground">Arquivos anexados.</TabsContent>
            </Tabs>
          </Demo>
        </div>
      </Section>

      {/* Sizes */}
      <Section title="Tamanhos" description="sm para áreas densas (toolbars, cards); md como padrão.">
        <Demo className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="w-10 text-xs text-muted-foreground">sm</span>
            <Tabs defaultValue="a">
              <TabsList size="sm">
                <TabsTrigger value="a">Dia</TabsTrigger>
                <TabsTrigger value="b">Semana</TabsTrigger>
                <TabsTrigger value="c">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-10 text-xs text-muted-foreground">md</span>
            <Tabs defaultValue="a">
              <TabsList size="md">
                <TabsTrigger value="a">Dia</TabsTrigger>
                <TabsTrigger value="b">Semana</TabsTrigger>
                <TabsTrigger value="c">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </Section>

      {/* States */}
      <Section title="Estados" description="Ativo, hover (passe o mouse) e disabled.">
        <Demo>
          <Tabs defaultValue="ativo">
            <TabsList>
              <TabsTrigger value="ativo">Ativo</TabsTrigger>
              <TabsTrigger value="hover">Hover</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            </TabsList>
          </Tabs>
        </Demo>
      </Section>

      {/* Orientation */}
      <Section
        title="Orientação"
        description="Horizontal (padrão) e vertical — útil para navegação de configurações."
      >
        <Demo>
          <Tabs defaultValue="perfil" orientation="vertical" className="min-h-40">
            <TabsList variant="line">
              <TabsTrigger value="perfil"><User /> Perfil</TabsTrigger>
              <TabsTrigger value="notif"><Bell /> Notificações</TabsTrigger>
              <TabsTrigger value="seg"><Shield /> Segurança</TabsTrigger>
              <TabsTrigger value="cobr"><CreditCard /> Cobrança</TabsTrigger>
            </TabsList>
            <TabsContent value="perfil" className="pl-6 text-muted-foreground">Dados do perfil da conta.</TabsContent>
            <TabsContent value="notif" className="pl-6 text-muted-foreground">Preferências de notificação.</TabsContent>
            <TabsContent value="seg" className="pl-6 text-muted-foreground">Senha e autenticação.</TabsContent>
            <TabsContent value="cobr" className="pl-6 text-muted-foreground">Plano e faturas.</TabsContent>
          </Tabs>
        </Demo>
      </Section>

      {/* Composition */}
      <Section title="Composição" description="Abas com ícones e badges de contagem.">
        <Demo>
          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads"><LayoutDashboard /> Leads <CountBadge>24</CountBadge></TabsTrigger>
              <TabsTrigger value="tasks"><Activity /> Tarefas <CountBadge>7</CountBadge></TabsTrigger>
              <TabsTrigger value="files"><FileText /> Arquivos <CountBadge>3</CountBadge></TabsTrigger>
            </TabsList>
          </Tabs>
        </Demo>
      </Section>

      {/* Real CRM example */}
      <Section
        title="Exemplo real — Detalhe do cliente"
        description="Padrão de navegação de um registro de CRM com conteúdo por aba."
      >
        <Demo>
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview"><LayoutDashboard /> Visão geral</TabsTrigger>
              <TabsTrigger value="activity"><Activity /> Atividades <CountBadge>12</CountBadge></TabsTrigger>
              <TabsTrigger value="files"><FileText /> Arquivos <CountBadge>5</CountBadge></TabsTrigger>
              <TabsTrigger value="invoices"><Receipt /> Faturas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-5">
              <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Cliente</dt><dd className="text-foreground">Halvorson Inc</dd>
                <dt className="text-muted-foreground">Responsável</dt><dd className="text-foreground">Sara Ann</dd>
                <dt className="text-muted-foreground">MRR</dt><dd className="text-foreground tabular-nums">R$ 12.400</dd>
                <dt className="text-muted-foreground">Status</dt><dd><Badge variant="secondary">Ativo</Badge></dd>
              </dl>
            </TabsContent>
            <TabsContent value="activity" className="pt-5 text-sm text-muted-foreground">
              12 atividades recentes — chamadas, emails e reuniões.
            </TabsContent>
            <TabsContent value="files" className="pt-5 text-sm text-muted-foreground">
              5 arquivos: contrato, propostas e anexos.
            </TabsContent>
            <TabsContent value="invoices" className="pt-5 text-sm text-muted-foreground">
              Nenhuma fatura em aberto.
            </TabsContent>
          </Tabs>
        </Demo>
      </Section>

      {/* Dark mode */}
      <Section title="Dark Mode" description="As mesmas abas nos dois temas — cores vêm dos tokens.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-background p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Tabs defaultValue="a">
              <TabsList variant="line">
                <TabsTrigger value="a">Visão geral</TabsTrigger>
                <TabsTrigger value="b">Atividades</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="dark rounded-lg border border-border bg-background p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Tabs defaultValue="a">
              <TabsList variant="line">
                <TabsTrigger value="a">Visão geral</TabsTrigger>
                <TabsTrigger value="b">Atividades</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="Em telas estreitas a lista de abas rola horizontalmente sem quebrar o layout."
      >
        <Demo>
          <div className="max-w-xs overflow-x-auto">
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">Leads</TabsTrigger>
                <TabsTrigger value="b">Clientes</TabsTrigger>
                <TabsTrigger value="c">Projetos</TabsTrigger>
                <TabsTrigger value="d">Faturas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Papéis ARIA <code className="font-mono text-xs">tablist</code> / <code className="font-mono text-xs">tab</code> / <code className="font-mono text-xs">tabpanel</code> via Radix.</li>
          <li>• Navegação por teclado: <kbd className="rounded border border-border bg-muted px-1 text-xs">←</kbd> <kbd className="rounded border border-border bg-muted px-1 text-xs">→</kbd> entre abas, <kbd className="rounded border border-border bg-muted px-1 text-xs">Home</kbd>/<kbd className="rounded border border-border bg-muted px-1 text-xs">End</kbd> para extremos.</li>
          <li>• Foco visível com ring; abas <code className="font-mono text-xs">disabled</code> são puladas.</li>
          <li>• Cada aba é associada ao seu painel por <code className="font-mono text-xs">value</code>.</li>
        </ul>
      </Section>

      {/* Code */}
      <Section title="Código">
        <CodeBlock>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList variant="line">           {/* default | line */}
    <TabsTrigger value="overview">Visão geral</TabsTrigger>
    <TabsTrigger value="activity">Atividades</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity">…</TabsContent>
</Tabs>

// vertical + tamanho
<Tabs defaultValue="a" orientation="vertical">
  <TabsList variant="line" size="sm"> … </TabsList>
</Tabs>`}</CodeBlock>
      </Section>

      {/* API */}
      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable
            rows={[
              { prop: "Tabs", type: "value, defaultValue, onValueChange", desc: "Raiz (Radix). Controlado ou não." },
              { prop: "orientation", type: '"horizontal" | "vertical"', def: '"horizontal"', desc: "Direção das abas." },
            ]}
          />
          <ApiTable
            rows={[
              { prop: "TabsList.variant", type: '"default" | "line"', def: '"default"', desc: "Segmentado ou sublinhado (emerald)." },
              { prop: "TabsList.size", type: '"sm" | "md"', def: '"md"', desc: "Densidade das abas." },
              { prop: "TabsTrigger.value", type: "string", desc: "Liga a aba ao seu TabsContent." },
              { prop: "TabsTrigger.disabled", type: "boolean", def: "false", desc: "Desabilita e pula no teclado." },
              { prop: "TabsContent.value", type: "string", desc: "Painel exibido quando a aba está ativa." },
            ]}
          />
        </div>
      </Section>

      {/* Best practices */}
      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Do"
            items={[
              "Use line para navegação de página; default para trocar visões.",
              "Mantenha rótulos curtos e paralelos.",
              "Mostre contagens com badge quando ajudar a priorizar.",
              "Preserve o estado da aba ao voltar para a tela.",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Don't"
            items={[
              "Não use tabs para etapas sequenciais — use um stepper.",
              "Não coloque muitas abas; considere um select acima de ~6.",
              "Não esconda ações críticas atrás de abas.",
              "Não misture variantes diferentes na mesma tela.",
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
