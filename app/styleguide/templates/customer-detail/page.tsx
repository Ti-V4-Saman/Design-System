"use client"

import * as React from "react"
import {
  CheckCircle2,
  Mail,
  Phone,
  Plus,
  Building2,
  FileText,
  Download,
  Calendar,
  MessageSquare,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Sparkline } from "@/components/charts"
import { StatusBadge, type StatusTone } from "@/components/badge"
import { SplitButton } from "@/components/button"
import {
  PageHeader,
  StatCard,
  StatCardGrid,
  Timeline,
  TimelineItem,
} from "@/components/patterns"
import { StyleguidePage } from "@/app/styleguide/_components"

const contactInfo = [
  { label: "Contato principal", value: "Sandra Waters" },
  { label: "Email", value: "sandra.waters@halvorson.com.br" },
  { label: "Telefone", value: "+55 11 98765-4321" },
  { label: "Segmento", value: "Tecnologia · SaaS" },
  { label: "Início do contrato", value: "12 mar. 2023" },
  { label: "MRR", value: "R$ 12.400" },
]

const files = [
  { name: "Contrato-Halvorson-2023.pdf", size: "1,8 MB", date: "12 mar. 2023" },
  { name: "Proposta-comercial-v3.pdf", size: "820 KB", date: "04 mar. 2023" },
  { name: "Onboarding-checklist.xlsx", size: "48 KB", date: "20 mar. 2023" },
  { name: "Ata-reuniao-trimestral.docx", size: "132 KB", date: "18 jun. 2026" },
]

const invoices: {
  id: string
  ref: string
  value: string
  due: string
  status: string
  tone: StatusTone
}[] = [
  { id: "FAT-2026-006", ref: "Junho 2026", value: "R$ 12.400", due: "05 jul. 2026", status: "Pendente", tone: "warning" },
  { id: "FAT-2026-005", ref: "Maio 2026", value: "R$ 12.400", due: "05 jun. 2026", status: "Paga", tone: "success" },
  { id: "FAT-2026-004", ref: "Abril 2026", value: "R$ 12.400", due: "05 mai. 2026", status: "Paga", tone: "success" },
  { id: "FAT-2026-003", ref: "Março 2026", value: "R$ 11.800", due: "05 abr. 2026", status: "Vencida", tone: "destructive" },
  { id: "FAT-2026-002", ref: "Fevereiro 2026", value: "R$ 11.800", due: "05 mar. 2026", status: "Paga", tone: "success" },
]

function ActivityTimeline({ full = false }: { full?: boolean }) {
  return (
    <Timeline>
      <TimelineItem tone="success" icon={<CheckCircle2 />} title="Renovação confirmada" timestamp="Hoje, 11:20">
        Contrato anual renovado com reajuste de 5% — MRR agora R$ 12.400
      </TimelineItem>
      <TimelineItem tone="primary" icon={<Mail />} title="Email enviado" timestamp="Ontem, 16:45">
        Sara Ann enviou o resumo da reunião trimestral para Sandra Waters
      </TimelineItem>
      <TimelineItem tone="default" icon={<Calendar />} title="Reunião agendada" timestamp="02 jul.">
        Revisão de sucesso do cliente marcada para 15 jul., 14h
      </TimelineItem>
      <TimelineItem tone="default" icon={<Phone />} title="Ligação registrada" timestamp="28 jun.">
        22 min sobre expansão de licenças com o time de operações
      </TimelineItem>
      {full ? (
        <>
          <TimelineItem tone="warning" icon={<DollarSign />} title="Fatura emitida" timestamp="20 jun.">
            FAT-2026-006 no valor de R$ 12.400 com vencimento em 05 jul.
          </TimelineItem>
          <TimelineItem tone="primary" icon={<MessageSquare />} title="Ticket resolvido" timestamp="14 jun.">
            Integração com API concluída pelo suporte técnico
          </TimelineItem>
          <TimelineItem tone="default" icon={<FileText />} title="Documento anexado" timestamp="10 jun.">
            Ata da reunião trimestral adicionada aos arquivos
          </TimelineItem>
          <TimelineItem tone="default" icon={<Building2 />} title="Conta criada" timestamp="12 mar. 2023" last>
            Halvorson Inc cadastrada por Sara Ann
          </TimelineItem>
        </>
      ) : (
        <TimelineItem tone="default" icon={<MessageSquare />} title="Ticket resolvido" timestamp="14 jun." last>
          Integração com API concluída pelo suporte técnico
        </TimelineItem>
      )}
    </Timeline>
  )
}

export default function CustomerDetailTemplate() {
  return (
    <StyleguidePage className="max-w-6xl">
      <PageHeader
        breadcrumb={
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Clientes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Halvorson Inc</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        }
        leading={
          <Avatar size="lg">
            <AvatarFallback>HI</AvatarFallback>
          </Avatar>
        }
        title={
          <span className="flex items-center gap-2">
            Halvorson Inc
            <Badge variant="secondary">Gold</Badge>
          </span>
        }
        description="Cliente Gold · Responsável Sara Ann · São Paulo, BR"
        actions={
          <>
            <Button variant="outline" size="sm">
              <Mail /> Enviar email
            </Button>
            <SplitButton
              size="sm"
              actions={[
                { label: "Agendar reunião", icon: <Calendar /> },
                { label: "Registrar ligação", icon: <Phone /> },
                { label: "Criar fatura", icon: <DollarSign /> },
              ]}
            >
              <Plus /> Nova tarefa
            </SplitButton>
          </>
        }
      />

      <StatCardGrid>
        <StatCard
          label="MRR"
          value="R$ 12.400"
          delta={5.0}
          deltaCaption="vs. mês anterior"
          chart={<Sparkline data={[10.8, 11.2, 11.8, 11.8, 12.4, 12.4]} height={32} />}
        />
        <StatCard label="Em aberto" value="R$ 24.200" delta={12.4} invertDelta icon={<DollarSign />} />
        <StatCard label="Tickets" value="3" delta={-25.0} invertDelta deltaCaption="abertos no mês" icon={<MessageSquare />} />
        <StatCard
          label="NPS"
          value="72"
          delta={4.3}
          chart={<Sparkline data={[58, 61, 64, 66, 69, 72]} height={32} color="secondary" />}
        />
      </StatCardGrid>

      <Tabs defaultValue="overview">
        <TabsList variant="line">
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="activities">Atividades</TabsTrigger>
          <TabsTrigger value="files">Arquivos</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Info card */}
            <div className="rounded-xl border border-border bg-card p-5 lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">Sandra Waters</p>
                  <p className="truncate text-xs text-muted-foreground">Diretora de Operações</p>
                </div>
              </div>
              <dl className="divide-y divide-border">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-3 py-2.5">
                    <dt className="text-sm text-muted-foreground">{item.label}</dt>
                    <dd className="text-right text-sm font-medium text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Activity timeline */}
            <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
              <h2 className="mb-4 text-base font-semibold text-foreground">Atividade recente</h2>
              <ActivityTimeline />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="mt-6">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-base font-semibold text-foreground">Histórico completo</h2>
            <ActivityTimeline full />
          </div>
        </TabsContent>

        <TabsContent value="files" className="mt-6">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-base font-semibold text-foreground">Arquivos</h2>
              <Button variant="outline" size="sm">
                <Plus /> Adicionar
              </Button>
            </div>
            <ul className="divide-y divide-border">
              {files.map((file) => (
                <li key={file.name} className="flex items-center gap-3 p-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-4">
                    <FileText />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.size} · {file.date}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" aria-label={`Baixar ${file.name}`}>
                    <Download /> Baixar
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="mt-6">
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <h2 className="text-base font-semibold text-foreground">Faturas</h2>
              <Button variant="outline" size="sm">
                <Download /> Exportar
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fatura</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.ref}</TableCell>
                    <TableCell className="text-muted-foreground">{invoice.due}</TableCell>
                    <TableCell className="text-right tabular-nums text-foreground">{invoice.value}</TableCell>
                    <TableCell>
                      <StatusBadge tone={invoice.tone}>{invoice.status}</StatusBadge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </StyleguidePage>
  )
}
