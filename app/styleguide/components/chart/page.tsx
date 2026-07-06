"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  BarChart,
  FunnelChart,
  Heatmap,
  KpiTrend,
  LineChart,
  PieChart,
  RadarChart,
  Sparkline,
} from "@/components/charts"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  GuidelinesSection,
  Section,
  StyleguidePage,
  DesignNotes,
  RelatedComponents,
} from "@/app/styleguide/_components"

// ─── Formatters ────────────────────────────────────────────────────────────
const brl = (v: number) =>
  v >= 1000 ? `R$ ${(v / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })}k` : `R$ ${v}`
const int = (v: number) => v.toLocaleString("pt-BR")
const pct = (v: number) => `${v}%`

// ─── CRM datasets ────────────────────────────────────────────────────────────

/** MRR vs. meta ao longo de 12 meses. */
const mrrData = [
  { month: "Jan", mrr: 82000, goal: 80000 },
  { month: "Fev", mrr: 88000, goal: 86000 },
  { month: "Mar", mrr: 91000, goal: 92000 },
  { month: "Abr", mrr: 99000, goal: 98000 },
  { month: "Mai", mrr: 104000, goal: 104000 },
  { month: "Jun", mrr: 112000, goal: 110000 },
  { month: "Jul", mrr: 118000, goal: 116000 },
  { month: "Ago", mrr: 121000, goal: 122000 },
  { month: "Set", mrr: 128000, goal: 128000 },
  { month: "Out", mrr: 136000, goal: 134000 },
  { month: "Nov", mrr: 142000, goal: 140000 },
  { month: "Dez", mrr: 151000, goal: 146000 },
]

/** Receita por produto (stacked area). */
const revenueData = [
  { month: "Jul", core: 42000, addons: 14000, services: 9000 },
  { month: "Ago", core: 45000, addons: 15500, services: 8500 },
  { month: "Set", core: 48000, addons: 17000, services: 11000 },
  { month: "Out", core: 51000, addons: 18500, services: 12500 },
  { month: "Nov", core: 54000, addons: 20000, services: 13000 },
  { month: "Dez", core: 58000, addons: 22000, services: 15000 },
]

/** Deals por estágio × trimestre (stacked bar). */
const dealsData = [
  { quarter: "Q1", won: 42, open: 68, lost: 18 },
  { quarter: "Q2", won: 51, open: 74, lost: 21 },
  { quarter: "Q3", won: 63, open: 81, lost: 17 },
  { quarter: "Q4", won: 72, open: 66, lost: 14 },
]

/** Leads por origem (horizontal bar). */
const sourceData = [
  { source: "Indicação", leads: 320 },
  { source: "Orgânico", leads: 268 },
  { source: "Google Ads", leads: 214 },
  { source: "Eventos", leads: 142 },
  { source: "Outbound", leads: 98 },
]

/** Distribuição de leads por canal (pie/donut). */
const channelData = [
  { name: "Indicação", value: 320 },
  { name: "Orgânico", value: 268 },
  { name: "Paid", value: 214 },
  { name: "Eventos", value: 142 },
  { name: "Outbound", value: 98 },
]

/** Performance de reps por dimensão (radar). */
const repData = [
  { dimension: "Prospecção", ana: 82, bruno: 68 },
  { dimension: "Qualificação", ana: 90, bruno: 74 },
  { dimension: "Proposta", ana: 78, bruno: 85 },
  { dimension: "Negociação", ana: 85, bruno: 79 },
  { dimension: "Fechamento", ana: 92, bruno: 70 },
  { dimension: "Follow-up", ana: 75, bruno: 88 },
]

/** Conversão do pipeline (funnel). */
const funnelData = [
  { name: "Visitantes", value: 12400 },
  { name: "Leads", value: 4200 },
  { name: "MQL", value: 1850 },
  { name: "SQL", value: 720 },
  { name: "Deals", value: 264 },
]

const mrrTrend = [82, 88, 91, 99, 104, 112, 118, 121, 128, 136, 142, 151]
const churnTrend = [3.2, 3.4, 3.1, 2.9, 3.0, 2.7, 2.6, 2.8, 2.5, 2.4, 2.3, 2.1]
const leadsTrend = [180, 210, 240, 220, 260, 300, 285, 310, 340, 360, 355, 390]
const convTrend = [12, 13, 12.5, 14, 15, 14.5, 16, 15.5, 17, 18, 17.5, 19]

/** Atividade comercial por dia da semana × faixa de horário (heatmap). */
const heatmapXLabels = ["8h", "10h", "12h", "14h", "16h", "18h"]
const heatmapYLabels = ["Seg", "Ter", "Qua", "Qui", "Sex"]
const activityData = (() => {
  const grid = [
    [3, 8, 5, 9, 12, 4],
    [5, 11, 6, 13, 15, 6],
    [4, 9, 7, 12, 14, 5],
    [6, 12, 8, 15, 18, 7],
    [2, 6, 4, 8, 9, 3],
  ]
  const cells: { x: string; y: string; value: number }[] = []
  heatmapYLabels.forEach((y, r) =>
    heatmapXLabels.forEach((x, c) => cells.push({ x, y, value: grid[r][c] }))
  )
  return cells
})()

// ─── Layout helpers ──────────────────────────────────────────────────────────

function ChartDemo({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

const mrrSeries = [
  { key: "mrr", label: "MRR" },
  { key: "goal", label: "Meta", color: "neutral" as const },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ChartPage() {
  const [loading, setLoading] = React.useState(false)
  const [highlight, setHighlight] = React.useState<"all" | "mrr" | "goal">("all")

  const simulateLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  // Interactive highlight: dim the non-focused series.
  const highlightedSeries = mrrSeries.map((s) => {
    if (highlight === "all") return s
    return highlight === s.key ? s : { ...s, color: "neutral" as const }
  })

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Charts"
        description={
          <>
            Família de gráficos do CRM V4 sobre{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">recharts</code> +{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">ChartContainer</code>{" "}
            do shadcn. Cores dos tokens{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">--chart-1…5</code>{" "}
            (emerald-led, sem azul). Todos respondem a light/dark via tokens.
          </>
        }
      />

      {/* ── KPI cards + Sparklines ── */}
      <Section
        title="KPI Trend & Sparkline"
        description="Número grande, delta colorido e sparkline inline. invertDelta trata churn (menor = melhor)."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <KpiTrend label="MRR" value={brl(151000)} delta={6.3} deltaCaption="vs. mês anterior" data={mrrTrend} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <KpiTrend label="Novos Leads" value={int(390)} delta={9.9} deltaCaption="vs. mês anterior" data={leadsTrend} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <KpiTrend label="Conversão" value={pct(19)} delta={8.6} deltaCaption="vs. mês anterior" data={convTrend} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <KpiTrend label="Churn" value={pct(2.1)} delta={-8.7} deltaCaption="vs. mês anterior" data={churnTrend} invertDelta />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-wrap items-center gap-6 rounded-lg border border-border bg-card p-4">
          <span className="text-sm text-muted-foreground">Sparklines isolados:</span>
          <Sparkline data={mrrTrend} width={120} />
          <Sparkline data={leadsTrend} variant="area" width={120} color="secondary" />
          <Sparkline data={churnTrend} width={120} color="danger" />
        </div>
      </Section>

      {/* ── Line / Multi-series + interactive highlight ── */}
      <Section
        title="Line & Multi-Series"
        description="MRR vs. meta em 12 meses. Passe o mouse para o tooltip; use os botões para destacar uma série."
      >
        <div className="flex flex-wrap gap-2">
          {(["all", "mrr", "goal"] as const).map((k) => (
            <Button
              key={k}
              size="sm"
              variant={highlight === k ? "default" : "outline"}
              onClick={() => setHighlight(k)}
            >
              {k === "all" ? "Todas" : k === "mrr" ? "Destacar MRR" : "Destacar Meta"}
            </Button>
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo title="MRR vs. Meta" description="Multi-série com destaque interativo e eixo Y formatado.">
            <LineChart
              data={mrrData}
              series={highlightedSeries}
              categoryKey="month"
              valueFormatter={brl}
              showYAxis
            />
          </ChartDemo>
          <ChartDemo title="MRR — série única" description="Linha reta, com pontos visíveis (dots).">
            <LineChart
              data={mrrData}
              series={[{ key: "mrr", label: "MRR" }]}
              categoryKey="month"
              valueFormatter={brl}
              curved={false}
              dots
            />
          </ChartDemo>
        </div>
      </Section>

      {/* ── Area ── */}
      <Section
        title="Area & Stacked Area"
        description="Fill em gradiente derivado dos tokens. stacked empilha as séries."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo title="MRR (área)" description="Área simples com gradiente emerald.">
            <AreaChart data={mrrData} series={[{ key: "mrr", label: "MRR" }]} categoryKey="month" valueFormatter={brl} />
          </ChartDemo>
          <ChartDemo title="Receita por produto" description="Stacked area — Core, Add-ons e Serviços.">
            <AreaChart
              data={revenueData}
              series={[
                { key: "core", label: "Core" },
                { key: "addons", label: "Add-ons" },
                { key: "services", label: "Serviços", color: "warning" },
              ]}
              categoryKey="month"
              valueFormatter={brl}
              stacked
            />
          </ChartDemo>
        </div>
      </Section>

      {/* ── Bar ── */}
      <Section
        title="Bar · Stacked · Horizontal"
        description="Agrupado, empilhado e horizontal a partir do mesmo componente."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <ChartDemo title="Deals por estágio" description="Stacked bar por trimestre.">
            <BarChart
              data={dealsData}
              series={[
                { key: "won", label: "Ganhos" },
                { key: "open", label: "Abertos", color: "secondary" },
                { key: "lost", label: "Perdidos", color: "danger" },
              ]}
              categoryKey="quarter"
              stacked
            />
          </ChartDemo>
          <ChartDemo title="Deals (agrupado)" description="Barras lado a lado.">
            <BarChart
              data={dealsData}
              series={[
                { key: "won", label: "Ganhos" },
                { key: "lost", label: "Perdidos", color: "danger" },
              ]}
              categoryKey="quarter"
            />
          </ChartDemo>
          <ChartDemo title="Leads por origem" description="Barras horizontais, ranqueadas.">
            <BarChart
              data={sourceData}
              series={[{ key: "leads", label: "Leads" }]}
              categoryKey="source"
              horizontal
              valueFormatter={int}
            />
          </ChartDemo>
        </div>
      </Section>

      {/* ── Pie / Donut ── */}
      <Section title="Pie & Donut" description="Fatias na paleta CRM. Donut aceita rótulo central (total).">
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo title="Leads por canal (pie)" description="Distribuição proporcional.">
            <PieChart data={channelData} valueFormatter={int} height={280} />
          </ChartDemo>
          <ChartDemo title="Leads por canal (donut)" description="Com total no centro.">
            <PieChart
              data={channelData}
              donut
              centerLabel={{ value: int(1042), caption: "leads" }}
              valueFormatter={int}
              height={280}
            />
          </ChartDemo>
        </div>
      </Section>

      {/* ── Radar + Funnel ── */}
      <Section
        title="Radar & Funnel"
        description="Radar compara reps por dimensão; funnel mostra a conversão do pipeline."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo title="Performance por rep" description="Ana vs. Bruno em 6 dimensões.">
            <RadarChart
              data={repData}
              series={[
                { key: "ana", label: "Ana" },
                { key: "bruno", label: "Bruno", color: "warning" },
              ]}
              categoryKey="dimension"
            />
          </ChartDemo>
          <ChartDemo title="Conversão do pipeline" description="Visitantes → Leads → MQL → SQL → Deals.">
            <FunnelChart data={funnelData} />
          </ChartDemo>
        </div>
      </Section>

      {/* ── States ── */}
      <Section
        title="Estados — Loading & Empty"
        description="Todo wrapper trata data vazia (empty) e prop loading (skeleton)."
      >
        <div>
          <Button size="sm" onClick={simulateLoading}>Simular loading (2s)</Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo title="Loading (skeleton)" description="prop loading enquanto os dados chegam.">
            <LineChart data={mrrData} series={mrrSeries} categoryKey="month" loading={loading} valueFormatter={brl} />
          </ChartDemo>
          <ChartDemo title="Empty state" description="data vazio → mensagem e ícone.">
            <BarChart
              data={[]}
              series={[{ key: "leads", label: "Leads" }]}
              categoryKey="source"
              emptyMessage="Nenhum lead no período selecionado."
            />
          </ChartDemo>
        </div>
      </Section>

      {/* ── Heatmap ── */}
      <Section
        title="Heatmap"
        description="Componente custom (grid CSS com rampa emerald sobre --muted) — recharts não tem heatmap nativo."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartDemo
            title="Atividade por horário"
            description="Interações registradas por dia da semana × faixa de horário — melhores janelas de contato."
          >
            <Heatmap
              data={activityData}
              xLabels={heatmapXLabels}
              yLabels={heatmapYLabels}
              valueFormatter={int}
            />
          </ChartDemo>
          <ChartDemo title="Estados" description="Loading (skeleton) e empty compartilhados com a família.">
            <div className="space-y-4">
              <Heatmap
                data={activityData}
                xLabels={heatmapXLabels}
                yLabels={heatmapYLabels}
                loading={loading}
                height={140}
              />
              <Heatmap data={[]} xLabels={heatmapXLabels} yLabels={heatmapYLabels} height={120} />
            </div>
          </ChartDemo>
        </div>
      </Section>

      <AccessibilitySection
        items={[
          <><code className="font-mono text-xs">accessibilityLayer</code> do recharts habilita navegação por teclado nos cartesianos.</>,
          <>Estados de loading/empty expõem <code className="font-mono text-xs">role=&quot;status&quot;</code> / <code className="font-mono text-xs">aria-busy</code>.</>,
          <>Sparkline é decorativo com <code className="font-mono text-xs">role=&quot;img&quot;</code> e <code className="font-mono text-xs">aria-label</code> descritivo.</>,
          <>Cores não são o único canal: legendas e tooltips rotulam cada série.</>,
        ]}
      />

      <DarkModeSection description="O mesmo gráfico nos dois temas — cores e superfícies vêm dos tokens.">
        <AreaChart data={mrrData} series={[{ key: "mrr", label: "MRR" }]} categoryKey="month" valueFormatter={brl} height={220} />
      </DarkModeSection>

      <ApiSection
        description="Import único via barrel. Props comuns compartilhadas entre os cartesianos."
        groups={[
          [
            { prop: "data", type: "ChartDatum[]", description: "Linhas de dados, ex.: { month, mrr, goal }." },
            { prop: "series", type: "ChartSeries[]", description: "{ key, label?, color? } por série plotada." },
            { prop: "categoryKey", type: "string", description: "Chave do eixo de categoria (x, ou y no horizontal)." },
            { prop: "valueFormatter", type: "(v: number) => string", description: "Formata ticks e tooltip (R$, %, milhares)." },
            { prop: "loading", type: "boolean", default: "false", description: "Renderiza o skeleton no lugar do gráfico." },
            { prop: "height", type: "number", default: "260", description: "Altura em px." },
            { prop: "showGrid / Legend / Tooltip / XAxis / YAxis", type: "boolean", description: "Alterna elementos auxiliares do gráfico." },
            { prop: "emptyMessage", type: "string", description: "Mensagem quando data está vazio." },
          ],
          [
            { prop: "series[].color", type: '"primary" | "secondary" | "warning" | "danger" | "neutral" | CSS', description: "Role semântico ou cor/token explícito." },
            { prop: "BarChart.stacked / horizontal", type: "boolean", default: "false", description: "Empilha séries ou inverte a orientação." },
            { prop: "PieChart.donut / centerLabel", type: "boolean / { value, caption }", description: "Donut com rótulo central opcional." },
            { prop: "KpiTrend", type: "label, value, delta?, invertDelta?, data", description: "Card de KPI; invertDelta trata churn (menor = melhor)." },
            { prop: "Sparkline", type: "data, variant?, color?, width?", description: 'Mini-gráfico inline; variant "line" | "area".' },
            { prop: "Heatmap", type: "data, xLabels, yLabels, valueFormatter?", description: "Grid custom (rampa emerald) — loading/empty compartilhados." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { LineChart, BarChart, PieChart, KpiTrend } from "@/components/charts"

// Multi-série, eixo Y formatado, tooltip e legenda automáticos
<LineChart
  data={mrrData}
  series={[{ key: "mrr", label: "MRR" }, { key: "goal", label: "Meta", color: "neutral" }]}
  categoryKey="month"
  valueFormatter={(v) => \`R$ \${(v / 1000).toFixed(1)}k\`}
  showYAxis
/>

// Cor por role semântico: primary | secondary | warning | danger | neutral
<BarChart data={deals} series={[{ key: "lost", color: "danger" }]} categoryKey="quarter" stacked />

// KPI: valor + delta + sparkline (invertDelta p/ churn)
<KpiTrend label="Churn" value="2,1%" delta={-8.7} data={churnTrend} invertDelta />`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use valueFormatter para formatar eixos e tooltips (R$, %, milhares).",
          "Escolha cores por role semântico (danger para perdas, warning para atenção).",
          "Trate loading e empty — todos os wrappers já suportam.",
          "Prefira KpiTrend + Sparkline para destacar métricas isoladas.",
        ]}
        donts={[
          "Não use azul — a paleta CRM é emerald-led (--chart-1…5).",
          "Não empilhe séries demais a ponto de poluir a leitura.",
          "Não hardcode cores — use os tokens/roles semânticos.",
          "Não esconda o eixo Y quando a escala importa para a decisão.",
        ]}
      />
      <DesignNotes
        items={[
          "Paleta emerald-led sem azul (--chart-1…5) com papéis semânticos (primary/secondary/warning/danger/neutral) resolvidos por resolveColor.",
          "Família tipada sobre Recharts — Line/Area/Bar/Pie/Radar/Funnel/Heatmap — mais KpiTrend e Sparkline para métricas isoladas.",
          "resolveColor aceita token explícito, papel semântico ou índice da paleta, evitando qualquer cor hardcode nas séries.",
        ]}
      />
      <RelatedComponents
        items={[
          { name: "Table", href: "/styleguide/components/table", description: "Complementa o gráfico com os números exatos por linha." },
          { name: "Cards", href: "/styleguide/components/cards", description: "Contêiner padrão para envolver um gráfico com título e descrição." },
          { name: "Progress", href: "/styleguide/components/progress", description: "Visualização de proporção única quando um gráfico é demais." },
        ]}
      />
    </StyleguidePage>
  )
}
