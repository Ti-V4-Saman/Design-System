"use client"

import { ArrowUpRight, Check, Clock, Sparkles, TriangleAlert, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PriorityBadge, StatusBadge, Tag } from "@/components/badge"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
  DesignNotes,
  RelatedComponents,
} from "@/app/styleguide/_components"

export default function BadgePage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Badge"
        description={
          <>
            Rótulos compactos para rotular, categorizar ou sinalizar o estado de uma entidade. Pílulas
            (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">rounded-full</code>) com
            tons semânticos do CRM V4.
          </>
        }
      />

      <Section title="Variantes" description="Tonais (status) e utilitárias. default é sólido (emerald); os demais são tints suaves.">
        <Demo center className="gap-3">
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
        <Demo center className="gap-3">
          <StatusBadge tone="primary">Em discussão</StatusBadge>
          <StatusBadge tone="success">Ganho</StatusBadge>
          <StatusBadge tone="warning">Novo</StatusBadge>
          <StatusBadge tone="destructive">Perdido</StatusBadge>
          <StatusBadge tone="muted">Inativo</StatusBadge>
          <StatusBadge tone="success" pulse>Ao vivo</StatusBadge>
        </Demo>
      </Section>

      <Section title="Tag (removível)" description="Chip de rótulo/filtro sobre o Badge. Passe onRemove para exibir o X de dispensar — para facetas aplicadas e rótulos livres.">
        <Demo center className="gap-2">
          <Tag>Marketing</Tag>
          <Tag variant="success" onRemove={() => {}}>Cliente ativo</Tag>
          <Tag variant="warning" onRemove={() => {}}>Fatura pendente</Tag>
          <Tag variant="outline" onRemove={() => {}}>São Paulo</Tag>
          <Tag variant="muted" onRemove={() => {}}>Indicação</Tag>
        </Demo>
      </Section>

      <Section title="PriorityBadge" description="Nível de prioridade → tom semântico + rótulo (Baixa · Média · Alta · Urgente). Urgente pulsa para chamar atenção.">
        <Demo center className="gap-3">
          <PriorityBadge priority="low" />
          <PriorityBadge priority="medium" />
          <PriorityBadge priority="high" />
          <PriorityBadge priority="urgent" />
        </Demo>
      </Section>

      <Section title="Com ícone" description="Ícone antes do texto (size 3) para reforçar o significado.">
        <Demo center className="gap-3">
          <Badge variant="success"><Check /> Aprovado</Badge>
          <Badge variant="warning"><Clock /> Pendente</Badge>
          <Badge variant="destructive"><X /> Rejeitado</Badge>
          <Badge><Sparkles /> Novo</Badge>
          <Badge variant="outline">42 <ArrowUpRight /></Badge>
        </Demo>
      </Section>

      <Section title="Estados" description="Foco visível (Tab) e aria-invalid para sinalização de erro.">
        <Demo center className="gap-3">
          <Badge tabIndex={0}>Focável</Badge>
          <Badge variant="outline" aria-invalid>Inválido</Badge>
          <Badge asChild variant="outline"><a href="#badge">Link (asChild)</a></Badge>
        </Demo>
      </Section>

      <Section title="Exemplos reais no CRM" description="Estados de lead, faturas e prioridade.">
        <Demo center className="flex-col items-stretch gap-5">
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
            <p className="mb-2 text-xs font-medium text-muted-foreground">Prioridade (PriorityBadge)</p>
            <div className="flex flex-wrap gap-2">
              <PriorityBadge priority="urgent" />
              <PriorityBadge priority="high" />
              <PriorityBadge priority="medium" />
              <PriorityBadge priority="low" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">Filtros aplicados (Tag)</p>
            <div className="flex flex-wrap gap-2">
              <Tag variant="outline" onRemove={() => {}}>Estágio: Discussão</Tag>
              <Tag variant="outline" onRemove={() => {}}>Dono: Ana</Tag>
              <Tag variant="outline" onRemove={() => {}}>Valor &gt; R$ 10k</Tag>
              <Tag variant="muted" onRemove={() => {}}>São Paulo</Tag>
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

      <AccessibilitySection
        items={[
          <>Badge é decorativo por padrão — o significado não deve depender só da cor; use texto/ícone.</>,
          <>Para badges interativos (filtros/links) use <code className="font-mono text-xs">asChild</code> com um elemento focável.</>,
          <>Sinalização de erro via <code className="font-mono text-xs">aria-invalid</code>.</>,
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Badge } from "@/components/ui/badge"
import { StatusBadge, Tag, PriorityBadge } from "@/components/badge"

<Badge variant="success"><Check /> Paga</Badge>
<Badge variant="warning">Média</Badge>

// Status com dot (e pulse para "ao vivo")
<StatusBadge tone="success">Ganho</StatusBadge>
<StatusBadge tone="success" pulse>Ao vivo</StatusBadge>

// Tag removível (chip de filtro/rótulo) — onRemove exibe o ×
<Tag variant="outline" onRemove={() => remove(id)}>São Paulo</Tag>

// PriorityBadge — nível → tom + rótulo (urgent pulsa)
<PriorityBadge priority="high" />
<PriorityBadge priority="urgent" label="SLA estourado" />

// Badge como link
<Badge asChild variant="outline"><a href="/leads">Ver leads</a></Badge>`}</CodeBlock>
      </Section>

      <ApiSection
        groups={[
          [
            { prop: "Badge.variant", type: '"default"|"secondary"|"success"|"warning"|"destructive"|"muted"|"outline"|"ghost"|"link"', default: '"default"', description: "Tom/estilo do badge." },
            { prop: "Badge.asChild", type: "boolean", default: "false", description: "Renderiza no elemento filho (ex.: <a>)." },
          ],
          [
            { prop: "StatusBadge.tone", type: '"primary"|"success"|"warning"|"destructive"|"muted"', default: '"muted"', description: "Tom do dot + tint." },
            { prop: "StatusBadge.pulse", type: "boolean", default: "false", description: "Dot pulsante para estados ao vivo." },
          ],
          [
            { prop: "Tag.variant", type: "= Badge.variant", default: '"secondary"', description: "Herda os variants do Badge." },
            { prop: "Tag.onRemove", type: "() => void", default: "—", description: "Exibe o botão × de dispensar e chama no clique." },
            { prop: "Tag.removeLabel", type: "string", default: '"Remover"', description: "aria-label do botão de remover." },
          ],
          [
            { prop: "PriorityBadge.priority", type: '"low"|"medium"|"high"|"urgent"', default: "—", description: "Nível → tom + rótulo pt-BR (urgent pulsa)." },
            { prop: "PriorityBadge.label", type: "ReactNode", default: "auto", description: "Sobrescreve o rótulo padrão (Baixa/Média/Alta/Urgente)." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Use tons semânticos consistentes (success=ganho, warning=pendente, destructive=erro).",
          "Combine cor + texto (e ícone/dot) para acessibilidade.",
          "Mantenha rótulos curtos (1–2 palavras).",
          "Use StatusBadge para estados de registro em tabelas.",
          "Use Tag para facetas de filtro aplicadas e rótulos dispensáveis (onRemove).",
          "Use PriorityBadge para prioridade — nível → tom + rótulo padronizados.",
        ]}
        donts={[
          "Não use badge como botão — use Button.",
          "Não dependa só da cor para transmitir o estado.",
          "Não empilhe muitos badges na mesma linha.",
          "Não use o variant sólido (default) para status tonais.",
          "Não recrie chips removíveis à mão — use Tag (foco/aria já resolvidos).",
        ]}
      />
      <DesignNotes
        items={[
          "cva com variantes tonais (success/warning/destructive) em tint claro sobre tokens semânticos, além de default sólido, outline, ghost e link.",
          "Altura fixa h-5 em pílula rounded-full; aceita ícone inline-start/inline-end com padding ajustado via has-data.",
          "asChild (Slot do Radix) permite renderizar como link ou botão preservando o estilo do badge.",
          "StatusBadge (components/badge) acrescenta um dot de tom, com pulse opcional, para estados de registro.",
        ]}
      />
      <RelatedComponents
        items={[
          { name: "Avatar", href: "/styleguide/components/avatar", description: "Combina com badge de status/contagem em perfis." },
          { name: "Table", href: "/styleguide/components/table", description: "CellBadge usa o StatusBadge para o estado de cada linha." },
          { name: "Button", href: "/styleguide/components/button", description: "Use quando o elemento precisa ser acionável — badge é rótulo." },
        ]}
      />
    </StyleguidePage>
  )
}
