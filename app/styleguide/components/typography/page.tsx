"use client"

import * as React from "react"

import { Heading, InlineCode, Prose, Text, TextLink } from "@/components/typography"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

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
    <StyleguidePage>
      <ComponentHeader
        title="Typography"
        description={
          <>
            Sistema tipográfico do CRM V4 — <InlineCode>Heading</InlineCode>, <InlineCode>Text</InlineCode>,{" "}
            <InlineCode>Prose</InlineCode> e inline helpers, ancorados na escala do Design System
            (Inter para texto, Geist Mono para código).
          </>
        }
      />

      <Section title="Headings" description="level define tag semântica + tamanho (1=4xl bold … 6=base semibold). Use as para manter o visual mudando a tag.">
        <Demo className="space-y-3">
          <Row label="level={1}"><Heading level={1}>Pipeline de vendas</Heading></Row>
          <Row label="level={2}"><Heading level={2}>Leads recentes</Heading></Row>
          <Row label="level={3}"><Heading level={3}>Halvorson Inc</Heading></Row>
          <Row label="level={4}"><Heading level={4}>Dados de contato</Heading></Row>
          <Row label="level={5}"><Heading level={5}>Observações</Heading></Row>
          <Row label="level={6}"><Heading level={6}>Metadados</Heading></Row>
        </Demo>
      </Section>

      <Section title="Text — variantes" description="lead, body, small, caption e overline.">
        <Demo className="space-y-3">
          <Row label="lead"><Text variant="lead">Acompanhe seus leads e feche mais negócios com o CRM V4.</Text></Row>
          <Row label="body"><Text variant="body">Texto de corpo padrão para descrições e conteúdo geral das telas.</Text></Row>
          <Row label="small"><Text variant="small">Texto secundário, legendas e metadados.</Text></Row>
          <Row label="caption"><Text variant="caption">Atualizado há 3 minutos</Text></Row>
          <Row label="overline"><Text variant="overline">Seção</Text></Row>
        </Demo>
      </Section>

      <Section title="Tons" description="Cores semânticas via tone (sem hardcode).">
        <Demo className="flex flex-row flex-wrap gap-4">
          <Text tone="default">Default</Text>
          <Text tone="muted">Muted</Text>
          <Text tone="primary">Primary</Text>
          <Text tone="success">Success</Text>
          <Text tone="warning">Warning</Text>
          <Text tone="destructive">Destructive</Text>
        </Demo>
      </Section>

      <Section title="Pesos" description="normal, medium, semibold, bold.">
        <Demo className="flex flex-row flex-wrap gap-6">
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
        <Demo className="space-y-3">
          <Text>
            Use <InlineCode>crmToast.success()</InlineCode> para feedback e veja mais em{" "}
            <TextLink href="#typography">nossa documentação</TextLink>.
          </Text>
        </Demo>
      </Section>

      <Section title="Prose (conteúdo rico)" description="Estiliza HTML/markdown — notas, descrições e e-mails.">
        <Demo className="space-y-3">
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
        <Demo className="space-y-3">
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

      <DarkModeSection description="A mesma escala tipográfica nos dois temas — cores vêm dos tokens.">
        <Heading level={3}>Leads recentes</Heading>
        <Text variant="small">24 novos leads esta semana.</Text>
      </DarkModeSection>

      <AccessibilitySection
        items={[
          <>Mantenha a ordem semântica dos headings (não pule níveis por estética — use <InlineCode>as</InlineCode>).</>,
          <>Contraste vem dos tokens; evite texto muted sobre fundos de baixo contraste.</>,
          <>Não use apenas tamanho/peso para transmitir significado crítico.</>,
          <>Links têm foco visível e sublinhado no hover.</>,
        ]}
      />

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

      <ApiSection
        groups={[
          [
            { prop: "Heading.level", type: "1 | 2 | 3 | 4 | 5 | 6", default: "2", description: "Tag semântica + tamanho." },
            { prop: "Heading.as", type: '"h1".."h6"', description: "Sobrescreve só a tag renderizada." },
          ],
          [
            { prop: "Text.variant", type: '"lead"|"body"|"small"|"caption"|"overline"', default: '"body"', description: "Tamanho/estilo do texto." },
            { prop: "Text.tone", type: '"default"|"muted"|"primary"|"success"|"warning"|"destructive"', default: '"default"', description: "Cor semântica." },
            { prop: "Text.weight", type: '"normal"|"medium"|"semibold"|"bold"', description: "Peso da fonte." },
            { prop: "Text.truncate / clamp", type: "boolean / number", description: "1 linha / N linhas com reticências." },
            { prop: "Text.as", type: '"p"|"span"|"div"|"label"', default: '"p"', description: "Elemento renderizado." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Use Heading para hierarquia; Text para corpo.",
          "Referencie tons por token (tone), nunca cor fixa.",
          "Trunque/clamp textos longos em tabelas e cards.",
          "Use as para preservar a ordem semântica.",
        ]}
        donts={[
          "Não hardcode tamanhos/cores fora da escala.",
          "Não pule níveis de heading por estética.",
          "Não use muitos pesos/tamanhos na mesma tela.",
          "Não transmita significado só por cor.",
        ]}
      />
    </StyleguidePage>
  )
}
