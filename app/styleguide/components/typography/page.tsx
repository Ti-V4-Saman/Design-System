"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Heading, InlineCode, Prose, Text, TextLink } from "@/components/typography"

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
  return <div className={cn("space-y-3 rounded-lg border border-border bg-card p-6", className)}>{children}</div>
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
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-4">
      <span className="w-40 shrink-0 font-mono text-xs text-muted-foreground">{label}</span>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export default function TypographyPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Typography</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Sistema tipográfico do CRM V4 — <InlineCode>Heading</InlineCode>, <InlineCode>Text</InlineCode>,{" "}
          <InlineCode>Prose</InlineCode> e inline helpers, ancorados na escala do Design System
          (Inter para texto, Geist Mono para código).
        </p>
      </div>

      <Section title="Headings" description="level define tag semântica + tamanho (1=4xl bold … 6=base semibold). Use as para manter o visual mudando a tag.">
        <Demo>
          <Row label="level={1}"><Heading level={1}>Pipeline de vendas</Heading></Row>
          <Row label="level={2}"><Heading level={2}>Leads recentes</Heading></Row>
          <Row label="level={3}"><Heading level={3}>Halvorson Inc</Heading></Row>
          <Row label="level={4}"><Heading level={4}>Dados de contato</Heading></Row>
          <Row label="level={5}"><Heading level={5}>Observações</Heading></Row>
          <Row label="level={6}"><Heading level={6}>Metadados</Heading></Row>
        </Demo>
      </Section>

      <Section title="Text — variantes" description="lead, body, small, caption e overline.">
        <Demo>
          <Row label="lead"><Text variant="lead">Acompanhe seus leads e feche mais negócios com o CRM V4.</Text></Row>
          <Row label="body"><Text variant="body">Texto de corpo padrão para descrições e conteúdo geral das telas.</Text></Row>
          <Row label="small"><Text variant="small">Texto secundário, legendas e metadados.</Text></Row>
          <Row label="caption"><Text variant="caption">Atualizado há 3 minutos</Text></Row>
          <Row label="overline"><Text variant="overline">Seção</Text></Row>
        </Demo>
      </Section>

      <Section title="Tons" description="Cores semânticas via tone (sem hardcode).">
        <Demo className="flex flex-row flex-wrap gap-4 space-y-0">
          <Text tone="default">Default</Text>
          <Text tone="muted">Muted</Text>
          <Text tone="primary">Primary</Text>
          <Text tone="success">Success</Text>
          <Text tone="warning">Warning</Text>
          <Text tone="destructive">Destructive</Text>
        </Demo>
      </Section>

      <Section title="Pesos" description="normal, medium, semibold, bold.">
        <Demo className="flex flex-row flex-wrap gap-6 space-y-0">
          <Text weight="normal">Normal</Text>
          <Text weight="medium">Medium</Text>
          <Text weight="semibold">Semibold</Text>
          <Text weight="bold">Bold</Text>
        </Demo>
      </Section>

      <Section title="Truncar e clamp" description="truncate (1 linha) e clamp={n} (n linhas) — essencial para nomes e descrições longas em tabelas/cards.">
        <Demo className="space-y-4">
          <div className="max-w-xs">
            <Text truncate weight="medium">Koss, Stracke and Bernier — proposta comercial do terceiro trimestre</Text>
          </div>
          <div className="max-w-xs">
            <Text variant="small" clamp={2}>
              Nota do lead: cliente demonstrou interesse no plano Pro, pediu proposta com migração
              de dados e integração com o ERP atual. Retornar até sexta com o orçamento fechado.
            </Text>
          </div>
        </Demo>
      </Section>

      <Section title="Inline" description="InlineCode e TextLink.">
        <Demo>
          <Text>
            Use <InlineCode>crmToast.success()</InlineCode> para feedback e veja mais em{" "}
            <TextLink href="#typography">nossa documentação</TextLink>.
          </Text>
        </Demo>
      </Section>

      <Section title="Prose (conteúdo rico)" description="Estiliza HTML/markdown — notas, descrições e e-mails.">
        <Demo>
          <Prose>
            <h2>Resumo do negócio</h2>
            <p>
              A <strong>Halvorson Inc</strong> busca migrar do sistema legado para uma solução com{" "}
              <em>automação de pipeline</em>. Pontos principais:
            </p>
            <ul>
              <li>Migração de ~12k contatos</li>
              <li>Integração com o ERP</li>
              <li>Treinamento do time de vendas</li>
            </ul>
            <blockquote>&quot;Precisamos fechar até o fim do trimestre.&quot; — Sandra Waters</blockquote>
            <p>
              Próximo passo: enviar <a href="#typography">proposta Pro</a> e agendar a call técnica.
            </p>
          </Prose>
        </Demo>
      </Section>

      <Section title="Famílias de fonte" description="Inter (texto/headings) e Geist Mono (código, valores mono).">
        <Demo>
          <Row label="font-sans"><span className="font-sans text-base">The quick brown fox — 0123456789</span></Row>
          <Row label="font-mono"><span className="font-mono text-base">const mrr = 128_400 // R$</span></Row>
        </Demo>
      </Section>

      <Section title="Exemplo real no CRM" description="Cabeçalho de página, KPI e card de entidade.">
        <Demo className="space-y-6">
          <div className="space-y-1">
            <Text variant="overline">Vendas</Text>
            <Heading level={1} as="h2">Pipeline</Heading>
            <Text variant="small">Acompanhe leads e oportunidades em aberto.</Text>
          </div>
          <div className="flex gap-8">
            <div className="space-y-1">
              <Text variant="caption">MRR</Text>
              <Text as="span" className="block text-2xl font-semibold tabular-nums text-foreground">R$ 128.400</Text>
              <Text tone="success" variant="caption" weight="medium">▲ 6,3%</Text>
            </div>
            <div className="space-y-1">
              <Text variant="caption">Churn</Text>
              <Text as="span" className="block text-2xl font-semibold tabular-nums text-foreground">2,1%</Text>
              <Text tone="success" variant="caption" weight="medium">▼ 8,7%</Text>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <Heading level={4}>Halvorson Inc</Heading>
            <Text variant="small" clamp={2}>Cliente Gold · Responsável Sara Ann · Última atividade há 2 dias · MRR R$ 12.400</Text>
          </div>
        </Demo>
      </Section>

      <Section title="Dark Mode">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Heading level={3}>Leads recentes</Heading>
            <Text variant="small">24 novos leads esta semana.</Text>
          </div>
          <div className="dark space-y-2 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Heading level={3}>Leads recentes</Heading>
            <Text variant="small">24 novos leads esta semana.</Text>
          </div>
        </div>
      </Section>

      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• Mantenha a ordem semântica dos headings (não pule níveis por estética — use <InlineCode>as</InlineCode>).</li>
          <li>• Contraste vem dos tokens; evite texto muted sobre fundos de baixo contraste.</li>
          <li>• Não use apenas tamanho/peso para transmitir significado crítico.</li>
          <li>• Links têm foco visível e sublinhado no hover.</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { Heading, Text, InlineCode, TextLink, Prose } from "@/components/typography"

<Heading level={1}>Pipeline</Heading>
<Text variant="lead">Acompanhe seus leads.</Text>
<Text variant="small" tone="muted" clamp={2}>{note}</Text>

// Mantém visual de h1, mas renderiza <h2> para a ordem do documento
<Heading level={1} as="h2">Título de seção</Heading>

// Prose estiliza conteúdo rico. Prefira compor via children;
// se injetar HTML, sanitize antes (ex.: DOMPurify).
<Prose><h2>Resumo</h2><p>…</p></Prose>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable rows={[
            { prop: "Heading.level", type: "1 | 2 | 3 | 4 | 5 | 6", def: "2", desc: "Tag semântica + tamanho." },
            { prop: "Heading.as", type: '"h1".."h6"', desc: "Sobrescreve só a tag renderizada." },
          ]} />
          <ApiTable rows={[
            { prop: "Text.variant", type: '"lead"|"body"|"small"|"caption"|"overline"', def: '"body"', desc: "Tamanho/estilo do texto." },
            { prop: "Text.tone", type: '"default"|"muted"|"primary"|"success"|"warning"|"destructive"', def: '"default"', desc: "Cor semântica." },
            { prop: "Text.weight", type: '"normal"|"medium"|"semibold"|"bold"', desc: "Peso da fonte." },
            { prop: "Text.truncate / clamp", type: "boolean / number", desc: "1 linha / N linhas com reticências." },
            { prop: "Text.as", type: '"p"|"span"|"div"|"label"', def: '"p"', desc: "Elemento renderizado." },
          ]} />
        </div>
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Use Heading para hierarquia; Text para corpo.",
            "Referencie tons por token (tone), nunca cor fixa.",
            "Trunque/clamp textos longos em tabelas e cards.",
            "Use as para preservar a ordem semântica.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não hardcode tamanhos/cores fora da escala.",
            "Não pule níveis de heading por estética.",
            "Não use muitos pesos/tamanhos na mesma tela.",
            "Não transmita significado só por cor.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
