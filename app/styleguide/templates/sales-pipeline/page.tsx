"use client"

import * as React from "react"
import {
  Plus,
  LayoutGrid,
  List,
  Target,
  Trophy,
  Receipt,
  Percent,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatusBadge, type StatusTone } from "@/components/badge"
import { ButtonGroup } from "@/components/button"
import { PageHeader, StatCard, StatCardGrid } from "@/components/patterns"
import { StyleguidePage } from "@/app/styleguide/_components"

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

type Deal = {
  id: string
  company: string
  value: number
  owner: string
  tag: string
  tone: StatusTone
}

type Stage = {
  id: string
  name: string
  tone: StatusTone
  deals: Deal[]
}

const stages: Stage[] = [
  {
    id: "novo",
    name: "Novo",
    tone: "muted",
    deals: [
      { id: "d1", company: "Padaria Pão Nosso", value: 4200, owner: "CA", tag: "Inbound", tone: "muted" },
      { id: "d2", company: "Clínica Vida Plena", value: 7800, owner: "RM", tag: "Indicação", tone: "primary" },
      { id: "d3", company: "AutoPeças Veloz", value: 3100, owner: "LS", tag: "Frio", tone: "muted" },
    ],
  },
  {
    id: "qualificado",
    name: "Qualificado",
    tone: "primary",
    deals: [
      { id: "d4", company: "Studio Fotografia Luz", value: 9600, owner: "CA", tag: "Reunião", tone: "primary" },
      { id: "d5", company: "Mercado Bom Preço", value: 14200, owner: "JP", tag: "Quente", tone: "warning" },
      { id: "d6", company: "Escola Aprender+", value: 6400, owner: "RM", tag: "Indicação", tone: "primary" },
    ],
  },
  {
    id: "proposta",
    name: "Proposta",
    tone: "warning",
    deals: [
      { id: "d7", company: "Construtora Alicerce", value: 28500, owner: "JP", tag: "Enviada", tone: "warning" },
      { id: "d8", company: "Restaurante Sabor & Cia", value: 11900, owner: "LS", tag: "Follow-up", tone: "primary" },
    ],
  },
  {
    id: "negociacao",
    name: "Negociação",
    tone: "warning",
    deals: [
      { id: "d9", company: "Óptica Visão Clara", value: 18300, owner: "CA", tag: "Desconto", tone: "warning" },
      { id: "d10", company: "Academia Corpo Ativo", value: 22400, owner: "JP", tag: "Fechando", tone: "warning" },
      { id: "d11", company: "Pet Shop Amigo Fiel", value: 8700, owner: "RM", tag: "Contrato", tone: "primary" },
    ],
  },
  {
    id: "ganho",
    name: "Ganho",
    tone: "success",
    deals: [
      { id: "d12", company: "Imobiliária Lar Ideal", value: 31200, owner: "JP", tag: "Assinado", tone: "success" },
      { id: "d13", company: "Farmácia Saúde Total", value: 16800, owner: "LS", tag: "Onboarding", tone: "success" },
    ],
  },
]

const stageTotal = (stage: Stage) => stage.deals.reduce((sum, d) => sum + d.value, 0)

export default function SalesPipelineTemplate() {
  const [view, setView] = React.useState<"board" | "list">("board")

  return (
    <StyleguidePage className="max-w-6xl">
      <PageHeader
        title="Pipeline de vendas"
        description="Acompanhe seus negócios por estágio e priorize o que está prestes a fechar."
        actions={
          <>
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                className={view === "board" ? "bg-accent text-accent-foreground" : undefined}
                data-active={view === "board"}
                onClick={() => setView("board")}
              >
                <LayoutGrid /> Quadro
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={view === "list" ? "bg-accent text-accent-foreground" : undefined}
                data-active={view === "list"}
                onClick={() => setView("list")}
              >
                <List /> Lista
              </Button>
            </ButtonGroup>
            <Button size="sm">
              <Plus /> Novo negócio
            </Button>
          </>
        }
      />

      <StatCardGrid>
        <StatCard label="Total em aberto" value={brl(191800)} icon={<Target />} delta={12.4} deltaCaption="vs. mês anterior" />
        <StatCard label="Ganhos no mês" value={brl(48000)} icon={<Trophy />} delta={18.9} />
        <StatCard label="Ticket médio" value={brl(14750)} icon={<Receipt />} delta={4.2} />
        <StatCard label="Taxa de conversão" value="24%" icon={<Percent />} delta={-2.1} deltaCaption="vs. mês anterior" />
      </StatCardGrid>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {stages.map((stage) => (
          <div key={stage.id} className="flex w-72 shrink-0 flex-col gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
              <div className="flex items-center gap-2">
                <StatusBadge tone={stage.tone}>{stage.name}</StatusBadge>
                <span className="text-xs font-medium text-muted-foreground">{stage.deals.length}</span>
              </div>
              <span className="text-xs font-medium tabular-nums text-muted-foreground">
                {brl(stageTotal(stage))}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {stage.deals.map((deal) => (
                <div
                  key={deal.id}
                  className="rounded-lg border bg-card p-3 shadow-[var(--shadow-card)] transition-colors hover:border-primary/40"
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className="text-sm font-medium leading-snug text-foreground">
                      {deal.company}
                    </span>
                    <Avatar size="sm">
                      <AvatarFallback>{deal.owner}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="mb-3 text-lg font-semibold tabular-nums text-foreground">
                    {brl(deal.value)}
                  </div>
                  <StatusBadge tone={deal.tone}>{deal.tag}</StatusBadge>
                </div>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-muted-foreground"
              >
                <Plus /> Adicionar negócio
              </Button>
            </div>
          </div>
        ))}
      </div>
    </StyleguidePage>
  )
}
