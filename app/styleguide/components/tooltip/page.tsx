"use client"

import * as React from "react"
import {
  Bell,
  Copy,
  HelpCircle,
  Info,
  Pencil,
  Settings,
  Star,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RichTooltip, SimpleTooltip, TooltipShortcut } from "@/components/tooltip"

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
    <div className={cn("flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-6", className)}>
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
    <div className={cn("rounded-lg border p-4", isDo ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5")}>
      <p className={cn("mb-2 text-sm font-semibold", isDo ? "text-success" : "text-destructive")}>{title}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">
        {items.map((i) => <li key={i}>• {i}</li>)}
      </ul>
    </div>
  )
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Button variant="ghost" size="icon-sm" aria-label={label}>
      {children}
    </Button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TooltipPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Overview */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Tooltip</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Dicas contextuais transitórias exibidas ao passar o mouse ou focar um elemento. Base Radix
          (acessível); superfície clara consistente com Popover/Dropdown (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code>,
          borda discreta, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>),
          delay padrão de 200&nbsp;ms.
        </p>
      </div>

      {/* Padrão */}
      <Section title="Tooltip padrão" description="Um rótulo curto no hover/focus. Use SimpleTooltip ou compor Tooltip diretamente.">
        <Demo>
          <SimpleTooltip label="Editar cliente">
            <Button variant="outline">Passe o mouse</Button>
          </SimpleTooltip>
          <SimpleTooltip label="Configurações da conta">
            <Button variant="outline" size="icon-sm" aria-label="Configurações"><Settings /></Button>
          </SimpleTooltip>
        </Demo>
      </Section>

      {/* Com ícone */}
      <Section title="Tooltip com ícone" description="Ícone antes do texto para reforçar a intenção.">
        <Demo>
          <SimpleTooltip label="Informação verificada" icon={<Info className="size-3.5 text-primary" />}>
            <Button variant="outline" size="icon-sm" aria-label="Info"><Info /></Button>
          </SimpleTooltip>
          <SimpleTooltip label="Favoritar" icon={<Star className="size-3.5 text-warning" />}>
            <Button variant="outline" size="icon-sm" aria-label="Favoritar"><Star /></Button>
          </SimpleTooltip>
        </Demo>
      </Section>

      {/* Com atalho */}
      <Section title="Tooltip com atalho" description="Exibe o atalho de teclado ao lado do rótulo.">
        <Demo>
          <SimpleTooltip label="Novo lead" shortcut="N L">
            <Button variant="outline" size="icon-sm" aria-label="Novo lead"><Pencil /></Button>
          </SimpleTooltip>
          <SimpleTooltip label="Copiar" shortcut="⌘C">
            <Button variant="outline" size="icon-sm" aria-label="Copiar"><Copy /></Button>
          </SimpleTooltip>
          <SimpleTooltip label="Abrir busca" shortcut="⌘K">
            <Button variant="outline">Busca</Button>
          </SimpleTooltip>
        </Demo>
      </Section>

      {/* Rico */}
      <Section title="Tooltip rico" description="Título + descrição para explicar métricas ou conceitos.">
        <Demo>
          <RichTooltip
            title="MRR"
            description="Receita recorrente mensal — soma das assinaturas ativas normalizada por mês."
            icon={<Info className="size-3.5 text-primary" />}
          >
            <Button variant="outline" size="icon-sm" aria-label="Sobre MRR"><HelpCircle /></Button>
          </RichTooltip>
          <RichTooltip
            title="Taxa de conversão"
            description="Leads que viraram clientes no período selecionado."
            shortcut="?"
          >
            <Button variant="outline">Conversão</Button>
          </RichTooltip>
        </Demo>
      </Section>

      {/* Com ações */}
      <Section
        title="Tooltip com ações"
        description="Título, descrição e ações. Atenção: ações no tooltip são alcançáveis apenas pelo mouse — para ações críticas por teclado, use Popover/HoverCard."
      >
        <Demo>
          <RichTooltip
            title="Halvorson Inc"
            description="Cliente Gold · Sara Ann · MRR R$ 12.400"
            icon={<Star className="size-3.5 text-warning" />}
            actions={
              <>
                <Button size="sm" variant="outline">Abrir</Button>
                <Button size="sm" variant="ghost">Editar</Button>
              </>
            }
          >
            <Button variant="outline">Card do cliente</Button>
          </RichTooltip>
        </Demo>
      </Section>

      {/* Posicionamentos */}
      <Section title="Posicionamentos" description="side: top, right, bottom, left.">
        <Demo className="justify-center gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <SimpleTooltip key={side} label={`side="${side}"`} side={side}>
              <Button variant="outline" className="capitalize">{side}</Button>
            </SimpleTooltip>
          ))}
        </Demo>
      </Section>

      {/* Alinhamentos */}
      <Section title="Alinhamentos" description="align: start, center, end (relativo ao gatilho).">
        <Demo className="gap-3">
          {(["start", "center", "end"] as const).map((align) => (
            <SimpleTooltip key={align} label={`align="${align}"`} side="bottom" align={align}>
              <Button variant="outline" className="w-40 capitalize">{align}</Button>
            </SimpleTooltip>
          ))}
        </Demo>
      </Section>

      {/* Delay */}
      <Section title="Delay" description="delayDuration controla o tempo até abrir (ms). Passe o mouse para sentir a diferença.">
        <Demo className="gap-3">
          <SimpleTooltip label="Abre imediatamente" delayDuration={0}>
            <Button variant="outline">0 ms</Button>
          </SimpleTooltip>
          <SimpleTooltip label="Padrão do sistema" delayDuration={200}>
            <Button variant="outline">200 ms</Button>
          </SimpleTooltip>
          <SimpleTooltip label="Mais paciente" delayDuration={700}>
            <Button variant="outline">700 ms</Button>
          </SimpleTooltip>
        </Demo>
      </Section>

      {/* Estados */}
      <Section title="Estados" description="default (ativo) e disabled (sem tooltip). Para gatilhos desabilitados, envolva-os em um <span> para preservar os eventos de hover.">
        <Demo className="gap-3">
          <SimpleTooltip label="Tooltip ativo">
            <Button variant="outline">Default</Button>
          </SimpleTooltip>
          <SimpleTooltip label="Nunca aparece" disabled>
            <Button variant="outline">Disabled</Button>
          </SimpleTooltip>
          <SimpleTooltip label="Ação indisponível no seu plano">
            <span tabIndex={0} className="inline-flex">
              <Button variant="outline" disabled className="pointer-events-none">Botão desabilitado</Button>
            </span>
          </SimpleTooltip>
        </Demo>
      </Section>

      {/* Dark mode */}
      <Section title="Dark Mode" description="A superfície do tooltip vem dos tokens — consistente nos dois temas.">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Tooltip open>
              <TooltipTrigger asChild><Button variant="outline">Ancora</Button></TooltipTrigger>
              <TooltipContent side="bottom" className="inline-flex items-center gap-1.5">
                Editar cliente <TooltipShortcut>E</TooltipShortcut>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="dark flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Tooltip open>
              <TooltipTrigger asChild><Button variant="outline">Ancora</Button></TooltipTrigger>
              <TooltipContent side="bottom" className="inline-flex items-center gap-1.5">
                Editar cliente <TooltipShortcut>E</TooltipShortcut>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </Section>

      {/* Real CRM */}
      <Section title="Exemplos reais no CRM" description="Barra de ações da tabela, métricas e conteúdo truncado.">
        <Demo className="flex-col items-stretch gap-5">
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Ações da linha (ícones + atalho)</p>
            <div className="flex items-center gap-1 rounded-md border border-border p-1 w-fit">
              <SimpleTooltip label="Editar" shortcut="E"><IconButton label="Editar"><Pencil /></IconButton></SimpleTooltip>
              <SimpleTooltip label="Duplicar" shortcut="⌘D"><IconButton label="Duplicar"><Copy /></IconButton></SimpleTooltip>
              <SimpleTooltip label="Notificações"><IconButton label="Notificações"><Bell /></IconButton></SimpleTooltip>
              <SimpleTooltip label="Excluir" icon={<Trash2 className="size-3.5 text-destructive" />}><IconButton label="Excluir"><Trash2 /></IconButton></SimpleTooltip>
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Métrica com explicação</p>
            <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
              Churn <span className="font-semibold tabular-nums">2,1%</span>
              <RichTooltip title="Churn" description="% de clientes que cancelaram no mês. Quanto menor, melhor.">
                <Button variant="ghost" size="icon-sm" aria-label="Sobre churn"><Info className="text-muted-foreground" /></Button>
              </RichTooltip>
            </span>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Texto truncado</p>
            <SimpleTooltip label="Koss, Stracke and Bernier — proposta comercial Q3">
              <span className="block max-w-40 truncate text-sm text-foreground">Koss, Stracke and Bernier — proposta comercial Q3</span>
            </SimpleTooltip>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Badge de status</p>
            <SimpleTooltip label="Fatura vencida há 5 dias">
              <Badge variant="secondary" className="cursor-default">Em atraso</Badge>
            </SimpleTooltip>
          </div>
        </Demo>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade & teclado">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Abre no <strong className="text-foreground">hover</strong> e no <strong className="text-foreground">foco por teclado</strong> (Tab até o gatilho).</li>
          <li>• Fecha com <kbd className="rounded border border-border bg-muted px-1 text-xs">Esc</kbd>, ao sair o foco ou o ponteiro.</li>
          <li>• O gatilho deve ter rótulo acessível (texto ou <code className="font-mono text-xs">aria-label</code> em icon buttons).</li>
          <li>• Tooltips não devem conter conteúdo essencial nem controles críticos — não são alcançáveis por teclado. Use <strong className="text-foreground">Popover/HoverCard</strong> para ações.</li>
          <li>• Gatilhos desabilitados não emitem hover — envolva em <code className="font-mono text-xs">&lt;span&gt;</code> para exibir o tooltip.</li>
        </ul>
      </Section>

      {/* Code */}
      <Section title="Código">
        <CodeBlock>{`import { SimpleTooltip, RichTooltip } from "@/components/tooltip"
// (TooltipProvider já está no layout raiz)

// Simples, com atalho
<SimpleTooltip label="Novo lead" shortcut="N L">
  <Button size="icon-sm"><Pencil /></Button>
</SimpleTooltip>

// Rico (título + descrição), posicionado
<RichTooltip side="right" title="MRR" description="Receita recorrente mensal.">
  <Button size="icon-sm"><HelpCircle /></Button>
</RichTooltip>

// Composição direta (controle total)
<Tooltip>
  <TooltipTrigger asChild><Button>Ancora</Button></TooltipTrigger>
  <TooltipContent side="bottom" align="start">Dica</TooltipContent>
</Tooltip>`}</CodeBlock>
      </Section>

      {/* API */}
      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable
            rows={[
              { prop: "SimpleTooltip.label", type: "ReactNode", desc: "Texto do tooltip." },
              { prop: "icon / shortcut", type: "ReactNode / string", desc: "Ícone e atalho opcionais." },
              { prop: "side", type: '"top"|"right"|"bottom"|"left"', def: '"top"', desc: "Posição relativa ao gatilho." },
              { prop: "align", type: '"start"|"center"|"end"', def: '"center"', desc: "Alinhamento no eixo." },
              { prop: "delayDuration", type: "number", def: "200", desc: "Atraso até abrir (ms)." },
              { prop: "disabled", type: "boolean", def: "false", desc: "Renderiza só o gatilho." },
            ]}
          />
          <ApiTable
            rows={[
              { prop: "RichTooltip.title", type: "ReactNode", desc: "Título em destaque." },
              { prop: "description", type: "ReactNode", desc: "Texto de apoio (multi-linha)." },
              { prop: "actions", type: "ReactNode", desc: "Ações (apenas mouse — ver acessibilidade)." },
              { prop: "TooltipContent.sideOffset", type: "number", def: "6", desc: "Distância do gatilho." },
            ]}
          />
        </div>
      </Section>

      {/* Do / Don't */}
      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Do"
            items={[
              "Use para rótulos de icon buttons e dicas curtas.",
              "Inclua o atalho de teclado quando existir.",
              "Dê rótulo acessível ao gatilho (aria-label).",
              "Use RichTooltip para explicar métricas/conceitos.",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Don't"
            items={[
              "Não coloque informação essencial só no tooltip.",
              "Não use ações críticas por teclado — prefira Popover.",
              "Não escreva textos longos; seja conciso.",
              "Não dispare tooltip em elementos não interativos sem foco.",
            ]}
          />
        </div>
      </Section>
    </div>
  )
}
