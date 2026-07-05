"use client"

import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AreaChart,
  BarChart,
  FunnelChart,
  KpiTrend,
  LineChart,
  PieChart,
  RadarChart,
  Sparkline,
} from "@/components/charts"

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

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 mt-12 border-t border-border pt-8 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-lg font-semibold text-foreground">{children}</h2>
      {hint && <p className="text-sm text-muted-foreground">{hint}</p>}
    </div>
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
    <div className="max-w-7xl p-8">
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Charts</h1>
        <p className="text-sm text-muted-foreground">
          Família de gráficos do CRM V4 sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">recharts</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">ChartContainer</code>{" "}
          do shadcn. Cores dos tokens{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">--chart-1…5</code>{" "}
          (emerald-led, sem azul). Todos respondem a light/dark via tokens.
        </p>
      </div>

      {/* ── KPI cards + Sparklines ── */}
      <SectionTitle hint="Número grande, delta colorido e sparkline inline. invertDelta trata churn (menor = melhor).">
        KPI Trend &amp; Sparkline
      </SectionTitle>
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
      <div className="mt-4 flex flex-wrap items-center gap-6 rounded-lg border border-border bg-card p-4">
        <span className="text-sm text-muted-foreground">Sparklines isolados:</span>
        <Sparkline data={mrrTrend} width={120} />
        <Sparkline data={leadsTrend} variant="area" width={120} color="secondary" />
        <Sparkline data={churnTrend} width={120} color="danger" />
      </div>

      {/* ── Line / Multi-series + interactive highlight ── */}
      <SectionTitle hint="MRR vs. meta em 12 meses. Passe o mouse para o tooltip; use os botões para destacar uma série.">
        Line &amp; Multi-Series
      </SectionTitle>
      <div className="mb-3 flex flex-wrap gap-2">
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

      {/* ── Area ── */}
      <SectionTitle hint="Fill em gradiente derivado dos tokens. stacked empilha as séries.">Area &amp; Stacked Area</SectionTitle>
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

      {/* ── Bar ── */}
      <SectionTitle hint="Agrupado, empilhado e horizontal a partir do mesmo componente.">Bar · Stacked · Horizontal</SectionTitle>
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

      {/* ── Pie / Donut ── */}
      <SectionTitle hint="Fatias na paleta CRM. Donut aceita rótulo central (total).">Pie &amp; Donut</SectionTitle>
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

      {/* ── Radar + Funnel ── */}
      <SectionTitle hint="Radar compara reps por dimensão; funnel mostra a conversão do pipeline.">Radar &amp; Funnel</SectionTitle>
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

      {/* ── States ── */}
      <SectionTitle hint="Todo wrapper trata data vazia (empty) e prop loading (skeleton).">Estados — Loading &amp; Empty</SectionTitle>
      <div className="mb-3">
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

      {/* ── Light / Dark side by side ── */}
      <SectionTitle hint="O mesmo gráfico nos dois temas — cores e superfícies vêm dos tokens.">Light &amp; Dark</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
          <AreaChart data={mrrData} series={[{ key: "mrr", label: "MRR" }]} categoryKey="month" valueFormatter={brl} height={220} />
        </div>
        <div className="dark rounded-xl border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
          <AreaChart data={mrrData} series={[{ key: "mrr", label: "MRR" }]} categoryKey="month" valueFormatter={brl} height={220} />
        </div>
      </div>

      {/* ── Follow-up: Heatmap ── */}
      <SectionTitle hint="Registrado como componente futuro — recharts não tem heatmap nativo.">Heatmap</SectionTitle>
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">Em breve</span>
          <p className="max-w-md text-sm text-muted-foreground">
            O <strong className="text-foreground">Heatmap</strong> será um componente custom (grid CSS com rampa de
            alpha emerald), já que o recharts não oferece um heatmap nativo. Planejado como próximo item da família.
          </p>
        </CardContent>
      </Card>

      {/* ── API / docs ── */}
      <SectionTitle hint="Import único via barrel. Props comuns compartilhadas entre os cartesianos.">Uso &amp; API</SectionTitle>
      <Card>
        <CardContent className="pt-6">
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
{`import { LineChart, BarChart, PieChart, KpiTrend } from "@/components/charts"

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
<KpiTrend label="Churn" value="2,1%" delta={-8.7} data={churnTrend} invertDelta />`}
          </pre>
          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <p className="font-medium text-foreground">Props cartesianas comuns</p>
              <p className="text-muted-foreground">
                <code className="font-mono text-xs">data</code>,{" "}
                <code className="font-mono text-xs">series</code>,{" "}
                <code className="font-mono text-xs">categoryKey</code>,{" "}
                <code className="font-mono text-xs">valueFormatter</code>,{" "}
                <code className="font-mono text-xs">loading</code>,{" "}
                <code className="font-mono text-xs">height</code>,{" "}
                <code className="font-mono text-xs">showGrid/Legend/Tooltip/XAxis/YAxis</code>,{" "}
                <code className="font-mono text-xs">emptyMessage</code>.
              </p>
            </div>
            <div>
              <p className="font-medium text-foreground">Acessibilidade</p>
              <p className="text-muted-foreground">
                <code className="font-mono text-xs">accessibilityLayer</code> do recharts (navegação por teclado),
                estados <code className="font-mono text-xs">role=&quot;status&quot;</code> /{" "}
                <code className="font-mono text-xs">aria-busy</code>, sparkline com{" "}
                <code className="font-mono text-xs">role=&quot;img&quot;</code> e{" "}
                <code className="font-mono text-xs">aria-label</code>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
