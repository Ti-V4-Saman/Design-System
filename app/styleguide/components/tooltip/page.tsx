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

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { RichTooltip, SimpleTooltip, TooltipShortcut } from "@/components/tooltip"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <Button variant="ghost" size="icon-sm" aria-label={label}>
      {children}
    </Button>
  )
}

export default function TooltipPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Tooltip"
        description={
          <>
            Dicas contextuais transitórias exibidas ao passar o mouse ou focar um elemento. Base Radix
            (acessível); superfície clara consistente com Popover/Dropdown (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code>,
            borda discreta, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>),
            delay padrão de 200&nbsp;ms.
          </>
        }
      />

      {/* Padrão */}
      <Section title="Tooltip padrão" description="Um rótulo curto no hover/focus. Use SimpleTooltip ou compor Tooltip diretamente.">
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center className="justify-center gap-3">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <SimpleTooltip key={side} label={`side="${side}"`} side={side}>
              <Button variant="outline" className="capitalize">{side}</Button>
            </SimpleTooltip>
          ))}
        </Demo>
      </Section>

      {/* Alinhamentos */}
      <Section title="Alinhamentos" description="align: start, center, end (relativo ao gatilho).">
        <Demo center className="gap-3">
          {(["start", "center", "end"] as const).map((align) => (
            <SimpleTooltip key={align} label={`align="${align}"`} side="bottom" align={align}>
              <Button variant="outline" className="w-40 capitalize">{align}</Button>
            </SimpleTooltip>
          ))}
        </Demo>
      </Section>

      {/* Delay */}
      <Section title="Delay" description="delayDuration controla o tempo até abrir (ms). Passe o mouse para sentir a diferença.">
        <Demo center className="gap-3">
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
        <Demo center className="gap-3">
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
        <Demo center className="flex-col items-stretch gap-5">
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
      <AccessibilitySection
        title="Acessibilidade & teclado"
        items={[
          <>Abre no <strong className="text-foreground">hover</strong> e no <strong className="text-foreground">foco por teclado</strong> (Tab até o gatilho).</>,
          <>Fecha com <kbd className="rounded border border-border bg-muted px-1 text-xs">Esc</kbd>, ao sair o foco ou o ponteiro.</>,
          <>O gatilho deve ter rótulo acessível (texto ou <code className="font-mono text-xs">aria-label</code> em icon buttons).</>,
          <>Tooltips não devem conter conteúdo essencial nem controles críticos — não são alcançáveis por teclado. Use <strong className="text-foreground">Popover/HoverCard</strong> para ações.</>,
          <>Gatilhos desabilitados não emitem hover — envolva em <code className="font-mono text-xs">&lt;span&gt;</code> para exibir o tooltip.</>,
        ]}
      />

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
      <ApiSection
        groups={[
          [
            { prop: "SimpleTooltip.label", type: "ReactNode", description: "Texto do tooltip." },
            { prop: "icon / shortcut", type: "ReactNode / string", description: "Ícone e atalho opcionais." },
            { prop: "side", type: '"top"|"right"|"bottom"|"left"', default: '"top"', description: "Posição relativa ao gatilho." },
            { prop: "align", type: '"start"|"center"|"end"', default: '"center"', description: "Alinhamento no eixo." },
            { prop: "delayDuration", type: "number", default: "200", description: "Atraso até abrir (ms)." },
            { prop: "disabled", type: "boolean", default: "false", description: "Renderiza só o gatilho." },
          ],
          [
            { prop: "RichTooltip.title", type: "ReactNode", description: "Título em destaque." },
            { prop: "description", type: "ReactNode", description: "Texto de apoio (multi-linha)." },
            { prop: "actions", type: "ReactNode", description: "Ações (apenas mouse — ver acessibilidade)." },
            { prop: "TooltipContent.sideOffset", type: "number", default: "6", description: "Distância do gatilho." },
          ],
        ]}
      />

      {/* Do / Don't */}
      <GuidelinesSection
        dos={[
          "Use para rótulos de icon buttons e dicas curtas.",
          "Inclua o atalho de teclado quando existir.",
          "Dê rótulo acessível ao gatilho (aria-label).",
          "Use RichTooltip para explicar métricas/conceitos.",
        ]}
        donts={[
          "Não coloque informação essencial só no tooltip.",
          "Não use ações críticas por teclado — prefira Popover.",
          "Não escreva textos longos; seja conciso.",
          "Não dispare tooltip em elementos não interativos sem foco.",
        ]}
      />
    </StyleguidePage>
  )
}
