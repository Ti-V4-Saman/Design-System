"use client"

import * as React from "react"
import {
  Building2,
  CheckCircle2,
  Inbox,
  Mail,
  Phone,
  Plus,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkline } from "@/components/charts"
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
  StatCard,
  StatCardGrid,
  Timeline,
  TimelineItem,
} from "@/components/patterns"
import {
  CodeBlock,
  ComponentHeader,
  Demo,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

export default function PatternsPage() {
  const [errored, setErrored] = React.useState(true)

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Patterns"
        description="Composições reutilizáveis construídas sobre os componentes do Design System — sem novos primitivos. Blocos que se repetem em telas de CRM: cabeçalhos, KPIs, estados e feeds."
      />

      <Section title="PageHeader" description="Cabeçalho de tela: breadcrumb + título + descrição à esquerda, ações à direita.">
        <Demo>
          <PageHeader
            title="Halvorson Inc"
            description="Cliente Gold · Responsável Sara Ann"
            breadcrumb={<span className="text-xs text-muted-foreground">Clientes / Halvorson Inc</span>}
            actions={
              <>
                <Button variant="outline" size="sm"><Mail /> Enviar email</Button>
                <Button size="sm"><Plus /> Nova tarefa</Button>
              </>
            }
          />
        </Demo>
      </Section>

      <Section title="StatCard — grid de KPIs" description="Cards de métrica para dashboards: valor, delta colorido e sparkline. invertDelta trata churn.">
        <Demo>
          <StatCardGrid>
            <StatCard label="MRR" value="R$ 128.400" delta={6.3} deltaCaption="vs. mês anterior" chart={<Sparkline data={[82, 88, 95, 104, 118, 128]} height={32} />} />
            <StatCard label="Novos leads" value="390" delta={9.9} deltaCaption="vs. mês anterior" />
            <StatCard label="Conversão" value="19%" delta={8.6} icon={<CheckCircle2 />} />
            <StatCard label="Churn" value="2,1%" delta={-8.7} invertDelta deltaCaption="vs. mês anterior" />
          </StatCardGrid>
        </Demo>
      </Section>

      <Section title="Estados — Empty" description="Estado vazio reutilizável: ícone + título + descrição + ação.">
        <Demo>
          <EmptyState
            icon={<Inbox />}
            title="Nenhum lead ainda"
            description="Crie seu primeiro lead ou importe uma lista para começar."
            action={<Button size="sm"><UserPlus /> Novo lead</Button>}
          />
        </Demo>
      </Section>

      <Section title="Estados — Error" description="Estado de erro com retry.">
        <Demo>
          {errored ? (
            <ErrorState
              title="Falha ao carregar leads"
              description="Não foi possível conectar ao servidor."
              onRetry={() => setErrored(false)}
            />
          ) : (
            <EmptyState icon={<CheckCircle2 />} title="Recarregado com sucesso" action={<Button size="sm" variant="outline" onClick={() => setErrored(true)}>Simular erro</Button>} />
          )}
        </Demo>
      </Section>

      <Section title="Estados — Loading" description="Placeholders de skeleton nas formas comuns (rows, list, cards).">
        <div className="grid gap-4 lg:grid-cols-2">
          <Demo><LoadingState variant="rows" count={3} /></Demo>
          <Demo><LoadingState variant="cards" count={3} /></Demo>
        </div>
      </Section>

      <Section title="Timeline / Activity Feed" description="Log vertical de eventos — histórico de registro, auditoria e feed de atividades.">
        <Demo>
          <Timeline>
            <TimelineItem tone="success" icon={<CheckCircle2 />} title="Negócio ganho" timestamp="Hoje, 14:20">
              Sara Ann marcou o lead como <Badge variant="success">Ganho</Badge> — R$ 12.400/mês.
            </TimelineItem>
            <TimelineItem tone="primary" icon={<Mail />} title="Email enviado" timestamp="Hoje, 09:41">
              Proposta Pro enviada para sandra@halvorson.com.
            </TimelineItem>
            <TimelineItem tone="default" icon={<Phone />} title="Ligação registrada" timestamp="Ontem, 16:05">
              15 min — cliente pediu proposta com migração de dados.
            </TimelineItem>
            <TimelineItem tone="default" icon={<Building2 />} title="Lead criado" timestamp="03/07, 10:00" last>
              Origem: formulário do site.
            </TimelineItem>
          </Timeline>
        </Demo>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { PageHeader, StatCard, StatCardGrid, EmptyState, ErrorState, LoadingState, Timeline, TimelineItem } from "@/components/patterns"

<PageHeader title="Halvorson Inc" description="…" actions={<Button>Nova tarefa</Button>} />

<StatCardGrid>
  <StatCard label="MRR" value="R$ 128.400" delta={6.3} chart={<Sparkline data={mrr} />} />
</StatCardGrid>

<EmptyState icon={<Inbox />} title="Nenhum lead" action={<Button>Novo lead</Button>} />
<ErrorState onRetry={reload} />
<LoadingState variant="rows" count={4} />

<Timeline>
  <TimelineItem tone="success" title="Negócio ganho" timestamp="Hoje">…</TimelineItem>
</Timeline>`}</CodeBlock>
      </Section>
    </StyleguidePage>
  )
}
