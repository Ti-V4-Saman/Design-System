# CRM V4 — Família de Charts (Design Spec)

**Data:** 2026-07-05
**Status:** Aprovado para implementação
**Fonte da verdade visual:** Design System CRM V4 (sem referência externa nesta iteração)

## Objetivo

Criar uma **família de componentes de gráfico reutilizáveis** para todo o CRM V4,
não apenas um gráfico isolado. Tudo alinhado aos tokens do Design System
(`app/globals.css`), com verde/emerald como base e **sem azul** como cor principal.

## Fundação técnica

- Instalar `chart` do shadcn (`npx shadcn@latest add chart`) → traz `ChartContainer`,
  `ChartConfig`, `ChartTooltipContent`, `ChartLegendContent` sobre **recharts**.
- shadcn/recharts fornecem **apenas** infraestrutura (composição, acessibilidade,
  responsividade via `ResponsiveContainer`). A aparência é 100% CRM V4.

## Arquitetura — thin wrappers tipados

Pasta `components/charts/`:

| Arquivo | Componente | Cobre | Props-chave |
|---|---|---|---|
| `chart-container.tsx` | re-export do shadcn `ChartContainer` + helpers | base | — |
| `line-chart.tsx` | `LineChart` | Line, Multi-Series | `series`, `curved` |
| `area-chart.tsx` | `AreaChart` | Area, Stacked Area | `stacked` |
| `bar-chart.tsx` | `BarChart` | Bar, Stacked, Horizontal | `stacked`, `horizontal` |
| `pie-chart.tsx` | `PieChart` | Pie, Donut | `donut` |
| `radar-chart.tsx` | `RadarChart` | Radar | `series` |
| `funnel-chart.tsx` | `FunnelChart` | Funnel (recharts nativo) | — |
| `sparkline.tsx` | `Sparkline` | mini line/area sem eixos | `variant` (line/area) |
| `kpi-trend.tsx` | `KpiTrend` | número + delta badge + sparkline | `value`, `delta`, `data` |
| `types.ts` | tipos compartilhados | — | `ChartSeries`, `ChartDataPoint` |
| `index.ts` | barrel export | — | — |

**Princípios de arquitetura:**
- Cada wrapper recebe `data` + `config` (ChartConfig) e aplica defaults CRM
  (grid, eixos, tooltip, legenda, cores).
- Escape hatch: aceitam `children`/props extras do recharts para casos avançados.
- Componentes são **agnósticos de layout** — `ChartCard` (wrapper de card) fica
  separado; no showcase os charts aparecem dentro de cards.
- Cada wrapper trata `data` vazio → renderiza **empty state** interno; prop
  `loading` → **skeleton**.

## Estratégia de cor (tokens)

Série usa `var(--chart-1..5)` por padrão. Os tokens já codificam a semântica CRM:

| Token | Cor | Papel semântico |
|---|---|---|
| `--chart-1` | emerald | primary / success |
| `--chart-2` | emerald claro | série secundária |
| `--chart-3` | amber | warning |
| `--chart-4` | magenta | danger |
| `--chart-5` | cinza | neutro |

- Série única → `--chart-1` (primary emerald).
- Override semântico opcional por série (`success`/`warning`/`danger`/`neutral`).
- **Sem azul** em nenhum default.
- Cores estruturais: grid = `--border`, eixos/labels = `--muted-foreground`,
  fundo tooltip = `--popover`, texto = `--popover-foreground`, radius via
  `--radius`, sombra tooltip = `--shadow-dropdown`.

## Showcase — `app/styleguide/components/chart/page.tsx`

Uma seção por tipo, cada uma com dados reais de CRM:
- **Line / Multi-Series:** MRR ao longo de 12 meses (2 séries: MRR vs meta).
- **Area / Stacked Area:** receita por produto empilhada.
- **Bar / Stacked / Horizontal:** leads por origem; deals por estágio.
- **Pie / Donut:** distribuição de leads por canal.
- **Radar:** performance do time por dimensão.
- **Funnel:** conversão do pipeline (Visitantes → Leads → MQL → SQL → Deal).
- **Sparkline:** micro-tendências em linha.
- **KpiTrend:** cards de KPI (MRR, Novos Leads, Taxa de Conversão, Churn).

Demonstrar em cada seção quando aplicável: **tooltips**, **legendas**,
**hover/seleção/destaque**, **empty state**, **loading (skeleton)**, e um
comparativo **light + dark lado a lado** (container `.dark` forçado no exemplo hero).

Registrar "Chart" em `app/styleguide/navigation.ts` (seção Components).

## Follow-up (fora desta iteração)

- **Heatmap** — recharts não tem nativo; exigiria componente custom (grid CSS com
  rampa de alpha emerald). Registrado como **componente futuro** — adicionar item
  desabilitado/"em breve" no showcase para deixar rastro.

## Documentação (no showcase)

Props, tipos, defaults, variantes, acessibilidade (recharts + `role`/`aria` do
ChartContainer), e exemplos de código (import, uso comum, uso avançado).

## Critérios de aceite

- [ ] recharts + shadcn chart instalados.
- [ ] 9 componentes em `components/charts/` (+ types + index).
- [ ] Todos usam tokens; nenhuma cor hardcoded; sem azul como principal.
- [ ] Empty + loading states em todos os wrappers aplicáveis.
- [ ] Showcase com todos os tipos, light/dark, dados reais de CRM.
- [ ] Heatmap registrado como follow-up.
- [ ] `navigation.ts` atualizado.
- [ ] `npm run build` e `npm run lint` passam.
