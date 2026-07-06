"use client"

import * as React from "react"
import { CheckCircle2, Download, Plus, Mail, Phone, Building2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AreaChart, PieChart, Sparkline } from "@/components/charts"
import { StatusBadge } from "@/components/badge"
import { ButtonGroup } from "@/components/button"
import {
  PageHeader,
  StatCard,
  StatCardGrid,
  Timeline,
  TimelineItem,
} from "@/components/patterns"
import { StyleguidePage } from "@/app/styleguide/_components"

const mrrData = [
  { month: "Jul", mrr: 98000 }, { month: "Ago", mrr: 104000 }, { month: "Set", mrr: 112000 },
  { month: "Out", mrr: 121000 }, { month: "Nov", mrr: 128000 }, { month: "Dez", mrr: 138400 },
]
const channelData = [
  { name: "Indicação", value: 320 }, { name: "Orgânico", value: 268 },
  { name: "Paid", value: 214 }, { name: "Eventos", value: 142 },
]
const leads = [
  { name: "Sandra Waters", company: "Halvorson Inc", owner: "SA", value: "R$ 12.400", tone: "success" as const, status: "Ganho" },
  { name: "Reid Wisoky", company: "Casper-Altenwerth", owner: "JD", value: "R$ 8.900", tone: "primary" as const, status: "Discussão" },
  { name: "Maci Adams", company: "Thiel & Batz", owner: "RG", value: "R$ 5.200", tone: "warning" as const, status: "Novo" },
  { name: "Zane Schmeler", company: "McLaughlin LLC", owner: "SA", value: "R$ 3.100", tone: "muted" as const, status: "Qualificado" },
]

export default function DashboardTemplate() {
  return (
    <StyleguidePage className="max-w-6xl">
      <PageHeader
        title="Dashboard"
        description="Visão geral do pipeline e das métricas de vendas."
        actions={
          <>
            <ButtonGroup>
              <Button variant="outline" size="sm">Semana</Button>
              <Button variant="outline" size="sm" className="bg-accent text-accent-foreground" data-active="true">Mês</Button>
              <Button variant="outline" size="sm">Ano</Button>
            </ButtonGroup>
            <Button variant="outline" size="sm"><Download /> Exportar</Button>
            <Button size="sm"><Plus /> Novo lead</Button>
          </>
        }
      />

      <StatCardGrid>
        <StatCard label="MRR" value="R$ 138.400" delta={8.1} deltaCaption="vs. mês anterior" chart={<Sparkline data={[98, 104, 112, 121, 128, 138]} height={32} />} />
        <StatCard label="Novos leads" value="390" delta={9.9} chart={<Sparkline data={[210, 240, 260, 300, 355, 390]} height={32} color="secondary" />} />
        <StatCard label="Conversão" value="19%" delta={6.3} icon={<CheckCircle2 />} />
        <StatCard label="Churn" value="2,1%" delta={-8.7} invertDelta deltaCaption="vs. mês anterior" chart={<Sparkline data={[3.2, 3.0, 2.8, 2.5, 2.3, 2.1]} height={32} color="danger" />} />
      </StatCardGrid>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h2 className="mb-1 text-base font-semibold text-foreground">Receita recorrente</h2>
          <p className="mb-4 text-sm text-muted-foreground">MRR nos últimos 6 meses</p>
          <AreaChart data={mrrData} series={[{ key: "mrr", label: "MRR" }]} categoryKey="month" valueFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`} height={220} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-1 text-base font-semibold text-foreground">Leads por canal</h2>
          <p className="mb-4 text-sm text-muted-foreground">Distribuição do mês</p>
          <PieChart data={channelData} donut centerLabel={{ value: "944", caption: "leads" }} height={220} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent leads */}
        <div className="overflow-hidden rounded-xl border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="text-base font-semibold text-foreground">Leads recentes</h2>
            <Button variant="link" size="sm" className="h-auto p-0">Ver todos</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead className="text-right">Valor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((l) => (
                <TableRow key={l.name}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{l.name}</span>
                      <span className="text-xs text-muted-foreground">{l.company}</span>
                    </div>
                  </TableCell>
                  <TableCell><Avatar size="sm"><AvatarFallback>{l.owner}</AvatarFallback></Avatar></TableCell>
                  <TableCell className="text-right tabular-nums text-foreground">{l.value}</TableCell>
                  <TableCell><StatusBadge tone={l.tone}>{l.status}</StatusBadge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Activity */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-base font-semibold text-foreground">Atividade recente</h2>
          <Timeline>
            <TimelineItem tone="success" icon={<CheckCircle2 />} title="Negócio ganho" timestamp="14:20">Halvorson Inc — R$ 12.400/mês</TimelineItem>
            <TimelineItem tone="primary" icon={<Mail />} title="Email enviado" timestamp="09:41">Proposta para Sandra Waters</TimelineItem>
            <TimelineItem tone="default" icon={<Phone />} title="Ligação registrada" timestamp="Ontem">15 min com Reid Wisoky</TimelineItem>
            <TimelineItem tone="default" icon={<Building2 />} title="Novo cliente" timestamp="03/07" last>McLaughlin LLC criado</TimelineItem>
          </Timeline>
        </div>
      </div>
    </StyleguidePage>
  )
}
