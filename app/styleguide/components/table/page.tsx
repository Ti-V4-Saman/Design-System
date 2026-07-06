"use client"

import * as React from "react"
import { Plus, Download } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CRMDataTable } from "@/components/data-table"
import { CellLink } from "@/components/data-table/cells/cell-link"
import { CellAvatar } from "@/components/data-table/cells/cell-avatar"
import { CellBadge } from "@/components/data-table/cells/cell-badge"
import { CellProgress } from "@/components/data-table/cells/cell-progress"
import { CellActions } from "@/components/data-table/cells/cell-actions"
import { CellDate } from "@/components/data-table/cells/cell-date"
import { CellFinancial } from "@/components/data-table/cells/cell-financial"
import { CellMulti } from "@/components/data-table/cells/cell-multi"
import type { CRMColumnDef } from "@/components/data-table/types"
import {
  AccessibilitySection,
  ApiTable,
  CodeBlock,
  ComponentHeader,
  GuidelinesSection,
  Section,
  StyleguidePage,
  type ApiRow,
} from "@/app/styleguide/_components"

type StatusVariant =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"
  | "purple"

// ─── Clients ─────────────────────────────────────────────────────────────────

type Client = {
  id: number
  name: string
  contact: { name: string; src?: string }
  phone: string
  groups: string[]
  labels: { label: string; variant: StatusVariant }[]
  projects: number
  invoiced: number
  received: number
  due: number
}

const clientsData: Client[] = [
  { id: 101, name: "Demo Client", contact: { name: "Emily Smith" }, phone: "662-709-5341", groups: ["VIP"], labels: [{ label: "Corporate", variant: "info" }], projects: 4, invoiced: 9166, received: 9000, due: 166 },
  { id: 102, name: "Zoila Hauck", contact: { name: "Zoila Hauck" }, phone: "541-993-4595", groups: ["Silver"], labels: [{ label: "Unsatisfied", variant: "destructive" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 103, name: "Halvorson Inc", contact: { name: "Rylee Haley" }, phone: "+1 (586) 467-5376", groups: ["Gold"], labels: [{ label: "Unsatisfied", variant: "destructive" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 104, name: "Hauck Ltd", contact: { name: "Ransom Kuvalis" }, phone: "831-668-9369", groups: ["Gold"], labels: [{ label: "Corporate", variant: "info" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 105, name: "Adrain Ondricka", contact: { name: "Adrain Ondricka" }, phone: "+13807893966", groups: ["VIP"], labels: [{ label: "Referral", variant: "success" }], projects: 3, invoiced: 4913, received: 2913, due: 2000 },
  { id: 106, name: "Blaze Rohan", contact: { name: "Blaze Rohan" }, phone: "1-267-468-6486", groups: ["Gold"], labels: [{ label: "Inactive", variant: "muted" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 107, name: "Birdie Erdman", contact: { name: "Birdie Erdman" }, phone: "+12074609873", groups: ["Gold"], labels: [{ label: "Potential", variant: "primary" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 108, name: "Sammy Steuber", contact: { name: "Sammy Steuber" }, phone: "1-570-767-9327", groups: ["Gold"], labels: [{ label: "Referral", variant: "success" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 109, name: "Koss, Stracke and Bernier", contact: { name: "Amira Connelly" }, phone: "641-440-8269", groups: ["Gold"], labels: [{ label: "Potential", variant: "primary" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 110, name: "Abe Bogisich", contact: { name: "Abe Bogisich" }, phone: "+1-434-437-6630", groups: ["VIP"], labels: [{ label: "Inactive", variant: "muted" }], projects: 2, invoiced: 0, received: 0, due: 0 },
]

const clientColumns: CRMColumnDef<Client>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-16", enableHiding: false },
  { accessorKey: "name", header: "Name", sortable: true, enableHiding: false, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", cell: ({ row }) => <CellAvatar name={row.original.contact.name} src={row.original.contact.src} /> },
  { accessorKey: "phone", header: "Phone", sortable: true },
  { accessorKey: "groups", header: "Client groups", cell: ({ row }) => (
    <div className="flex flex-col gap-0.5">
      {row.original.groups.map((g) => <span key={g} className="text-sm text-foreground before:mr-1.5 before:text-muted-foreground before:content-['•']">{g}</span>)}
    </div>
  )},
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l.label} value={l.label} variant={l.variant} />)}
    </div>
  )},
  { accessorKey: "projects", header: "Projects", align: "center", sortable: true },
  { accessorKey: "invoiced", header: "Total invoiced", align: "right", sortable: true, cell: ({ row }) => <CellFinancial value={row.original.invoiced} /> },
  { accessorKey: "received", header: "Payment Received", align: "right", sortable: true, cell: ({ row }) => <CellFinancial value={row.original.received} /> },
  { accessorKey: "due", header: "Due", align: "right", sortable: true, cell: ({ row }) => <CellFinancial value={row.original.due} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Projects ────────────────────────────────────────────────────────────────

type Project = { id: number; title: string; client: string; price: number | null; startDate: string; deadline: string; progress: number; status: string }

const projectsData: Project[] = [
  { id: 6, title: "Video Animation and Editing", client: "Kevin Johnston", price: null, startDate: "05-07-2026", deadline: "08-09-2023", progress: 100, status: "Completed" },
  { id: 10, title: "Software Development for CRM", client: "Adrain Ondricka", price: 1000, startDate: "19-06-2026", deadline: "24-07-2026", progress: 60, status: "In progress" },
  { id: 3, title: "Social Media Marketing Campaign", client: "Fritsch, Okuneva and Armstrong", price: null, startDate: "23-05-2026", deadline: "27-06-2026", progress: 100, status: "Completed" },
  { id: 29, title: "Social Media Content Calendar", client: "Adrain Ondricka", price: 4000, startDate: "03-07-2026", deadline: "04-10-2023", progress: 35, status: "In progress" },
  { id: 27, title: "Podcast Production and Editing", client: "Adrain Ondricka", price: null, startDate: "24-06-2026", deadline: "11-09-2023", progress: 80, status: "Review" },
  { id: 26, title: "Infographic Creation and Visualizations", client: "Alta Cassin", price: null, startDate: "31-05-2026", deadline: "28-06-2026", progress: 10, status: "To do" },
]

function getProjectStatusVariant(status: string): StatusVariant {
  if (status === "Completed") return "success"
  if (status === "In progress") return "primary"
  if (status === "Review") return "purple"
  if (status === "To do") return "warning"
  return "muted"
}

const projectColumns: CRMColumnDef<Project>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-12", enableHiding: false },
  { accessorKey: "title", header: "Title", sortable: true, enableHiding: false, cell: ({ row }) => <CellLink value={row.original.title} /> },
  { accessorKey: "client", header: "Client", sortable: true, cell: ({ row }) => <CellLink value={row.original.client} /> },
  { accessorKey: "price", header: "Price", align: "right", sortable: true, cell: ({ row }) => row.original.price ? <CellFinancial value={row.original.price} /> : <span className="text-sm text-muted-foreground">-</span> },
  { accessorKey: "startDate", header: "Start date", sortable: true, cell: ({ row }) => <CellDate value={row.original.startDate} /> },
  { accessorKey: "deadline", header: "Deadline", sortable: true, cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "progress", header: "Progress", sortable: true, cell: ({ row }) => <CellProgress value={row.original.progress} /> },
  { accessorKey: "status", header: "Status", sortable: true, filterable: true, cell: ({ row }) => <CellBadge value={row.original.status} variant={getProjectStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Contacts ────────────────────────────────────────────────────────────────

type Contact = { name: string; clientName: string; jobTitle: string; email: string; phone: string }

const contactsData: Contact[] = [
  { name: "Abe Bogisich", clientName: "Abe Bogisich", jobTitle: "Deburring Machine Operator", email: "abe.bogisich@demo.com", phone: "+1.534.905.5732" },
  { name: "Adrain Ondricka", clientName: "Adrain Ondricka", jobTitle: "Bill and Account Collector", email: "adrain.ondricka@demo.com", phone: "+1-510-925-0980" },
  { name: "Alta Cassin", clientName: "Alta Cassin", jobTitle: "Claims Adjuster", email: "alta.cassin@demo.com", phone: "(386) 854-3326" },
  { name: "Amira Connelly", clientName: "Koss, Stracke and Bernier", jobTitle: "Garment", email: "amira.connelly@demo.com", phone: "629-413-6954" },
  { name: "Ardella Gottlieb", clientName: "Bernier, Collins and Ritchie", jobTitle: "Boilermaker", email: "ardella.gottlieb@demo.com", phone: "573-970-3634" },
  { name: "Birdie Erdman", clientName: "Birdie Erdman", jobTitle: "Interviewer", email: "birdie.erdman@demo.com", phone: "+12169973281" },
  { name: "Blaze Rohan", clientName: "Blaze Rohan", jobTitle: "Captain", email: "blaze.rohan@demo.com", phone: "+1-323-201-9335" },
  { name: "Breanna Keeling", clientName: "Koch PLC", jobTitle: "Receptionist and Information Clerk", email: "breanna.keeling@demo.com", phone: "1-513-468-8764" },
  { name: "Camren Turcotte", clientName: "Weissnat, Stark and Ondricka", jobTitle: "Extruding Machine Operator", email: "camren.turcotte@demo.com", phone: "(402) 965-8252" },
  { name: "Cary Lesch", clientName: "Cary Lesch", jobTitle: "Forensic Investigator", email: "cary.lesch@demo.com", phone: "440.910.5418" },
]

const contactColumns: CRMColumnDef<Contact>[] = [
  { accessorKey: "name", header: "Name", sortable: true, enableHiding: false, cell: ({ row }) => <CellAvatar name={row.original.name} onClick={() => {}} /> },
  { accessorKey: "clientName", header: "Client name", sortable: true, cell: ({ row }) => <CellLink value={row.original.clientName} /> },
  { accessorKey: "jobTitle", header: "Job Title", sortable: true },
  { accessorKey: "email", header: "Email", sortable: true },
  { accessorKey: "phone", header: "Phone", sortable: true },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Tasks ───────────────────────────────────────────────────────────────────

type Task = { id: number; title: string; labels: string[]; startDate: string; deadline: string; milestone: string; relatedTo: string; assignee: string; collaborators: string; status: string; borderColor: string }

const tasksData: Task[] = [
  { id: 3642, title: "Add company logo and contact details", labels: [], startDate: "-", deadline: "17-05-2026", milestone: "Beta Release", relatedTo: "Business Card and Stationery Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "var(--warning)" },
  { id: 3623, title: "Use VR for training and simulations", labels: ["Design"], startDate: "-", deadline: "07-07-2026", milestone: "Beta Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "var(--success)" },
  { id: 3617, title: "Optimize VR performance and frame rate", labels: [], startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "oklch(0.55 0.22 310)" },
  { id: 3615, title: "Develop VR navigation and interactions", labels: ["Feedback"], startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "var(--success)" },
  { id: 3578, title: "Create data dashboards and reports", labels: ["Enhancement"], startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "oklch(0.55 0.22 310)" },
  { id: 3576, title: "Perform data visualization and charts", labels: [], startDate: "-", deadline: "16-06-2026", milestone: "Beta Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "oklch(0.55 0.22 310)" },
  { id: 3571, title: "Implement product barcodes and labels", labels: [], startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "var(--warning)" },
  { id: 3570, title: "Test packaging durability and usability", labels: [], startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "var(--success)" },
  { id: 3546, title: "A/B test ad variations", labels: [], startDate: "-", deadline: "26-05-2026", milestone: "Beta Release", relatedTo: "Copywriting for Advertisements", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "var(--success)" },
  { id: 3530, title: "Design game characters and assets", labels: ["Bug"], startDate: "-", deadline: "30-07-2026", milestone: "Release", relatedTo: "Mobile Game Development", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "var(--warning)" },
]

function getTaskStatusVariant(status: string): StatusVariant {
  if (status === "Completed") return "success"
  if (status === "In progress") return "primary"
  if (status === "Review") return "purple"
  if (status === "To do") return "warning"
  return "muted"
}

const taskColumns: CRMColumnDef<Task>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-16", enableHiding: false },
  { accessorKey: "title", header: "Title", sortable: true, enableHiding: false, cell: ({ row }) => (
    <div className="flex flex-wrap items-center gap-2">
      <CellLink value={row.original.title} />
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="info" />)}
    </div>
  )},
  { accessorKey: "startDate", header: "Start date", sortable: true },
  { accessorKey: "deadline", header: "Deadline", sortable: true, cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "milestone", header: "Milestone", sortable: true },
  { accessorKey: "relatedTo", header: "Related to", sortable: true, cell: ({ row }) => <CellLink value={row.original.relatedTo} /> },
  { accessorKey: "assignee", header: "Assigned to", sortable: true, cell: ({ row }) => <CellAvatar name={row.original.assignee} /> },
  { accessorKey: "collaborators", header: "Collaborators" },
  { accessorKey: "status", header: "Status", sortable: true, filterable: true, cell: ({ row }) => <CellBadge value={row.original.status} variant={getTaskStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Leads ───────────────────────────────────────────────────────────────────

type Lead = { name: string; contact: string; phones: string[]; owner: string; labels: string[]; createdAt: string; status: string }

function getLeadStatusVariant(status: string): StatusVariant {
  if (status === "Won") return "success"
  if (status === "Lost") return "destructive"
  if (status === "New") return "warning"
  if (status === "Discussion") return "primary"
  if (status === "Qualified") return "info"
  if (status === "Negotiation") return "purple"
  return "muted"
}

const leadsData: Lead[] = [
  { name: "Rice-Wolf", contact: "Luciano Schaefer", phones: ["+1 (978) 734-9460", "(520) 897-7509"], owner: "Sara Ann", labels: [], createdAt: "04-07-2026", status: "Lost" },
  { name: "Casper-Altenwerth", contact: "Reid Wisoky", phones: ["(657) 269-5760", "(928) 697-8440"], owner: "John Doe", labels: [], createdAt: "03-07-2026", status: "New" },
  { name: "Schaefer, Bayer and Balistreri", contact: "Shaylee Lockman", phones: ["+1-713-354-9763", "+1-270-361-1611"], owner: "Richard Gray", labels: [], createdAt: "03-07-2026", status: "Negotiation" },
  { name: "Sandra Waters", contact: "Sandra Waters", phones: ["(580) 287-2884", "+17796269247"], owner: "Richard Gray", labels: [], createdAt: "03-07-2026", status: "Negotiation" },
  { name: "Abshire-Armstrong", contact: "Sterling Kertzmann", phones: ["1-559-274-0851", "+1.720.644.3711"], owner: "Sara Ann", labels: ["Call this week"], createdAt: "02-07-2026", status: "Discussion" },
  { name: "Thiel, Batz and Homenick", contact: "Maci Adams", phones: ["1-219-687-1393", "1-641-756-4100"], owner: "John Doe", labels: [], createdAt: "02-07-2026", status: "Qualified" },
  { name: "Catalina Kozey", contact: "Catalina Kozey", phones: ["1-724-255-9814", "(956) 835-0809"], owner: "Michael Wood", labels: [], createdAt: "02-07-2026", status: "New" },
  { name: "Rosemary Muller", contact: "Rosemary Muller", phones: ["+1-689-520-5081", "+1-458-615-9110"], owner: "Mark Thomas", labels: [], createdAt: "30-06-2026", status: "Discussion" },
  { name: "McLaughlin LLC", contact: "Zane Schmeler", phones: ["+1 (714) 757-4255", "352-265-1100"], owner: "Sara Ann", labels: [], createdAt: "30-06-2026", status: "New" },
  { name: "Lynch-Quigley", contact: "Grayce Skiles", phones: ["+18609858853", "(423) 472-0784"], owner: "John Doe", labels: [], createdAt: "30-06-2026", status: "Won" },
]

const leadColumns: CRMColumnDef<Lead>[] = [
  { accessorKey: "name", header: "Name", sortable: true, enableHiding: false, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", sortable: true, cell: ({ row }) => <CellAvatar name={row.original.contact} /> },
  { accessorKey: "phones", header: "Phone", cell: ({ row }) => <CellMulti values={row.original.phones} /> },
  { accessorKey: "owner", header: "Owner", sortable: true, cell: ({ row }) => <CellAvatar name={row.original.owner} /> },
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="primary" />)}
    </div>
  )},
  { accessorKey: "createdAt", header: "Created at", sortable: true, cell: ({ row }) => <CellDate value={row.original.createdAt} /> },
  { accessorKey: "status", header: "Status", sortable: true, filterable: true, cell: ({ row }) => <CellBadge value={row.original.status} variant={getLeadStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

/* -------------------------------------------------------------------------------------------------
 * Interactive: loading toggle
 * -----------------------------------------------------------------------------------------------*/

function LoadingDemo() {
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const run = () => {
    setLoading(true)
    timer.current = setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-3">
      <Button size="sm" variant="outline" onClick={run} loading={loading}>
        {loading ? "Carregando…" : "Simular carregamento (2s)"}
      </Button>
      <CRMDataTable data={loading ? [] : clientsData.slice(0, 4)} columns={clientColumns} loading={loading} pagination={false} />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Props documentation
 * -----------------------------------------------------------------------------------------------*/

const TABLE_PROPS: ApiRow[] = [
  { prop: "data", type: "TData[]", description: "Linhas a renderizar." },
  { prop: "columns", type: "CRMColumnDef<TData>[]", description: "Definição das colunas (ver tabela abaixo)." },
  { prop: "density", type: `"comfortable" | "compact"`, default: `"comfortable"`, description: "Altura das linhas. compact para listas densas." },
  { prop: "pagination", type: "boolean", default: "true", description: "Exibe o rodapé de paginação." },
  { prop: "pageSize", type: "number", default: "10", description: "Linhas por página inicial." },
  { prop: "selectable", type: "boolean", default: "false", description: "Coluna de checkbox para seleção por linha." },
  { prop: "searchable", type: "boolean", default: "false", description: "Campo de busca global na toolbar." },
  { prop: "searchPlaceholder", type: "string", default: `"Buscar..."`, description: "Placeholder do campo de busca." },
  { prop: "filterable", type: "boolean", default: "false", description: "Ativa filtros por coluna (colunas com filterable)." },
  { prop: "columnVisibility", type: "boolean", default: "false", description: "Botão de visibilidade de colunas na toolbar." },
  { prop: "loading", type: "boolean", default: "false", description: "Renderiza linhas de esqueleto." },
  { prop: "emptyMessage", type: "string", default: `"Nenhum resultado…"`, description: "Mensagem do estado vazio." },
  { prop: "rowBorderColor", type: "(row) => string | undefined", description: "Borda esquerda colorida por linha (ex.: status)." },
  { prop: "onRowClick", type: "(row) => void", description: "Torna a linha clicável (cursor + hover)." },
  { prop: "toolbarActions", type: "React.ReactNode", description: "Controles extras à direita da toolbar (ex.: botão Adicionar)." },
]

const COLUMN_PROPS: ApiRow[] = [
  { prop: "header", type: "string", description: "Rótulo de texto. Também usado no menu de colunas." },
  { prop: "accessorKey", type: "string", description: "Chave do dado. Necessária para ordenar/filtrar." },
  { prop: "sortable", type: "boolean", default: "false", description: "Habilita ordenação clicando no cabeçalho." },
  { prop: "align", type: `"left" | "center" | "right"`, default: `"left"`, description: "Alinhamento horizontal da coluna." },
  { prop: "width", type: "string", description: "Utilitário Tailwind de largura, ex.: w-16." },
  { prop: "filterable", type: "boolean", default: "false", description: "Expõe um filtro multi-seleção na toolbar." },
  { prop: "filterOptions", type: "{ label; value }[]", default: "inferido", description: "Opções do filtro; inferidas do dado se omitido." },
  { prop: "enableHiding", type: "boolean", default: "true", description: "Permite ocultar a coluna pelo menu de colunas." },
  { prop: "cell", type: "(ctx) => ReactNode", default: "valor bruto", description: "Renderer customizado (use os componentes Cell*)." },
]

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function TablePage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="DataTable"
        description={
          <>
            Tabela de dados do CRM V4, construída sobre{" "}
            <code className="font-mono text-sm">@tanstack/react-table</code>. Um único{" "}
            <code className="font-mono text-sm">CRMDataTable</code> cobre ordenação, busca,
            filtros por coluna, seleção, paginação, densidade, visibilidade de colunas e os
            estados de carregamento e vazio — sempre a partir dos tokens do design system.
          </>
        }
      >
        <Badge variant="secondary">Core · Dados</Badge>
      </ComponentHeader>

      {/* Real examples */}
      <Section
        title="Exemplos reais"
        description="A mesma API com columns e data diferentes cobre os principais módulos do CRM. Ordene pelos cabeçalhos, busque, filtre por status e alterne colunas."
      >
        <Tabs defaultValue="clients">
          <TabsList className="mb-4">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>

          <TabsContent value="clients">
            <p className="mb-3 text-xs text-muted-foreground">Avatar, badges, valores financeiros, ações por linha, seleção e visibilidade de colunas.</p>
            <CRMDataTable
              data={clientsData}
              columns={clientColumns}
              selectable
              searchable
              columnVisibility
              toolbarActions={
                <Button size="sm">
                  <Plus data-icon="inline-start" />
                  Add client
                </Button>
              }
            />
          </TabsContent>

          <TabsContent value="projects">
            <p className="mb-3 text-xs text-muted-foreground">Barra de progresso, filtro por status, datas com detecção de atraso.</p>
            <CRMDataTable data={projectsData} columns={projectColumns} searchable filterable columnVisibility />
          </TabsContent>

          <TabsContent value="contacts">
            <p className="mb-3 text-xs text-muted-foreground">Avatar + nome clicável, e-mail, telefone, ação de excluir.</p>
            <CRMDataTable data={contactsData} columns={contactColumns} searchable columnVisibility />
          </TabsContent>

          <TabsContent value="tasks">
            <p className="mb-3 text-xs text-muted-foreground">Seleção por linha, borda lateral colorida por status, filtro por status, datas em atraso em vermelho.</p>
            <CRMDataTable data={tasksData} columns={taskColumns} selectable searchable filterable rowBorderColor={(row) => row.borderColor} />
          </TabsContent>

          <TabsContent value="leads">
            <p className="mb-3 text-xs text-muted-foreground">Múltiplos telefones empilhados, avatar no owner, filtro e badges de status coloridos.</p>
            <CRMDataTable data={leadsData} columns={leadColumns} searchable filterable columnVisibility />
          </TabsContent>
        </Tabs>
      </Section>

      {/* Density */}
      <Section
        title="Densidade"
        description="comfortable (padrão) prioriza legibilidade; compact reduz o padding vertical para exibir mais linhas em telas densas, mantendo a mesma tipografia e alinhamento."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">comfortable</p>
            <CRMDataTable data={projectsData.slice(0, 5)} columns={projectColumns} pagination={false} density="comfortable" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">compact</p>
            <CRMDataTable data={projectsData.slice(0, 5)} columns={projectColumns} pagination={false} density="compact" />
          </div>
        </div>
        <CodeBlock>{`<CRMDataTable data={data} columns={columns} density="compact" />`}</CodeBlock>
      </Section>

      {/* Toolbar: search, filters, column visibility */}
      <Section
        title="Busca, filtros e colunas"
        description="A toolbar reúne busca global, filtros multi-seleção por coluna (marque a coluna com filterable) e o menu de visibilidade. Um botão Limpar aparece enquanto houver filtros ativos."
      >
        <CRMDataTable
          data={leadsData}
          columns={leadColumns}
          searchable
          searchPlaceholder="Buscar leads…"
          filterable
          columnVisibility
          toolbarActions={
            <Button size="sm" variant="outline">
              <Download data-icon="inline-start" />
              Exportar
            </Button>
          }
        />
        <CodeBlock>{`// marque a coluna de status como filtrável
const columns: CRMColumnDef<Lead>[] = [
  // ...
  { accessorKey: "status", header: "Status", sortable: true, filterable: true,
    cell: ({ row }) => <CellBadge value={row.original.status} variant={variant} /> },
]

<CRMDataTable
  data={leads}
  columns={columns}
  searchable
  filterable
  columnVisibility
  toolbarActions={<Button size="sm" variant="outline">Exportar</Button>}
/>`}</CodeBlock>
      </Section>

      {/* Selection */}
      <Section
        title="Seleção"
        description="selectable injeta uma coluna de checkbox com estado indeterminado no cabeçalho. Linhas selecionadas recebem um leve realce em primary/5."
      >
        <CRMDataTable data={clientsData.slice(0, 5)} columns={clientColumns} selectable pagination={false} />
      </Section>

      {/* States */}
      <Section
        title="Estados"
        description="Carregamento com linhas de esqueleto e estado vazio com ícone e mensagem customizável."
      >
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Loading</p>
            <LoadingDemo />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Empty</p>
            <CRMDataTable data={[]} columns={clientColumns} pagination={false} emptyMessage="Nenhum cliente encontrado. Clique em 'Add client' para começar." />
          </div>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="O contêiner da tabela rola horizontalmente quando as colunas excedem a largura disponível — os dados nunca são truncados. A toolbar quebra em várias linhas e a busca ocupa a largura total no mobile. Redimensione a janela para ver."
      >
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Contêiner estreito (max-w-md) — role a tabela na horizontal</p>
          <CRMDataTable data={leadsData.slice(0, 4)} columns={leadColumns} pagination={false} />
        </div>
      </Section>

      {/* Dark mode */}
      <Section
        title="Dark mode"
        description="Todos os tokens têm par -foreground e overrides no tema escuro. Painel direito forçado em dark."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border bg-card p-4">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Light</p>
            <CRMDataTable data={projectsData.slice(0, 4)} columns={projectColumns} pagination={false} density="compact" />
          </div>
          <div className="dark rounded-xl border border-border bg-card p-4 text-card-foreground">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Dark</p>
            <CRMDataTable data={projectsData.slice(0, 4)} columns={projectColumns} pagination={false} density="compact" />
          </div>
        </div>
      </Section>

      {/* Cells */}
      <Section
        title="Células"
        description="Componentes de célula reutilizáveis em components/data-table/cells. Componha-os no cell de cada coluna para manter a consistência visual entre tabelas."
      >
        <div className="overflow-x-auto rounded-xl border bg-card p-5">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="pb-3 font-medium">Componente</th>
                <th className="pb-3 font-medium">Uso</th>
                <th className="pb-3 font-medium">Exemplo</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellLink</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Nome/título navegável</td>
                <td className="py-3"><CellLink value="Adrain Ondricka" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellAvatar</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Pessoa com iniciais</td>
                <td className="py-3"><CellAvatar name="Emily Smith" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellBadge</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Status semântico</td>
                <td className="py-3">
                  <div className="flex flex-wrap gap-1">
                    <CellBadge value="Won" variant="success" />
                    <CellBadge value="New" variant="warning" />
                    <CellBadge value="Lost" variant="destructive" />
                    <CellBadge value="Negotiation" variant="purple" />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellFinancial</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Moeda (tabular)</td>
                <td className="py-3"><CellFinancial value={9166} /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellDate</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Data + atraso</td>
                <td className="py-3"><CellDate value="08-09-2023" checkOverdue /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellProgress</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Percentual</td>
                <td className="py-3"><div className="max-w-[160px]"><CellProgress value={60} /></div></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellMulti</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Valores empilhados</td>
                <td className="py-3"><CellMulti values={["+1 (978) 734-9460", "(520) 897-7509"]} /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4"><code className="font-mono text-xs">CellActions</code></td>
                <td className="py-3 pr-4 text-muted-foreground">Ações por linha</td>
                <td className="py-3"><CellActions /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do uso básico à composição completa.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Básico</p>
            <CodeBlock>{`import { CRMDataTable } from "@/components/data-table"
import type { CRMColumnDef } from "@/components/data-table/types"

type Client = { id: number; name: string; due: number }

const columns: CRMColumnDef<Client>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-16" },
  { accessorKey: "name", header: "Name", sortable: true },
  { accessorKey: "due", header: "Due", align: "right", sortable: true },
]

<CRMDataTable data={clients} columns={columns} />`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Avançado — células, filtros, seleção e ações</p>
            <CodeBlock>{`import { CRMDataTable } from "@/components/data-table"
import { CellLink } from "@/components/data-table/cells/cell-link"
import { CellBadge } from "@/components/data-table/cells/cell-badge"
import { CellActions } from "@/components/data-table/cells/cell-actions"

const columns: CRMColumnDef<Lead>[] = [
  { accessorKey: "name", header: "Name", sortable: true, enableHiding: false,
    cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "status", header: "Status", sortable: true, filterable: true,
    cell: ({ row }) => <CellBadge value={row.original.status} variant={variant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

<CRMDataTable
  data={leads}
  columns={columns}
  density="compact"
  selectable
  searchable
  filterable
  columnVisibility
  pageSize={25}
  onRowClick={(lead) => router.push(\`/leads/\${lead.id}\`)}
  toolbarActions={<Button size="sm"><Plus data-icon="inline-start" />Novo lead</Button>}
/>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="API do CRMDataTable e da definição de coluna CRMColumnDef.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">CRMDataTable</h3>
            <ApiTable rows={TABLE_PROPS} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">CRMColumnDef</h3>
            <ApiTable rows={COLUMN_PROPS} />
            <p className="text-xs text-muted-foreground">
              Estende ColumnDef do @tanstack/react-table — todas as opções nativas (id, size, meta, etc.) continuam disponíveis.
            </p>
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <GuidelinesSection
        dos={[
          "Use os componentes Cell* para manter tipografia e cores consistentes entre tabelas.",
          "Marque como filterable colunas categóricas de baixa cardinalidade (status, tipo, estágio).",
          "Reserve enableHiding: false para colunas de identidade (ID, nome).",
          "Use density=\"compact\" em listas longas e em painéis laterais estreitos.",
          "Forneça um emptyMessage acionável que diga o próximo passo.",
        ]}
        donts={[
          "Cores hardcoded nas células — use sempre tokens (text-foreground, text-muted-foreground).",
          "Filtro faceted em colunas de alta cardinalidade (nomes, e-mails); prefira a busca global.",
          "Habilitar onRowClick e ações na linha que disparem a mesma navegação sem stopPropagation.",
          "Mais de ~7 colunas visíveis sem oferecer columnVisibility.",
          "Colocar textos longos em células sem permitir a rolagem horizontal do contêiner.",
        ]}
      />

      {/* Accessibility */}
      <AccessibilitySection
        items={[
          <><span className="font-medium text-foreground">Tabela semântica:</span>{" "}
            renderiza <code className="font-mono text-xs">&lt;table&gt;</code>/<code className="font-mono text-xs">&lt;th&gt;</code>/<code className="font-mono text-xs">&lt;td&gt;</code> reais, navegáveis por leitores de tela.</>,
          <><span className="font-medium text-foreground">Ordenação:</span>{" "}
            cabeçalhos ordenáveis expõem <code className="font-mono text-xs">aria-sort</code> (ascending/descending/none).</>,
          <><span className="font-medium text-foreground">Seleção:</span>{" "}
            checkboxes Radix com estado <code className="font-mono text-xs">indeterminate</code> no cabeçalho e{" "}
            <code className="font-mono text-xs">aria-label</code> em cada linha.</>,
          <><span className="font-medium text-foreground">Filtros e colunas:</span>{" "}
            acionados por botões reais dentro de <code className="font-mono text-xs">Popover</code> (foco preso, fecha no Esc).</>,
          <><span className="font-medium text-foreground">Foco por teclado:</span>{" "}
            todos os controles (busca, filtros, paginação, ações) são focáveis via Tab, com anel de foco visível.</>,
        ]}
      />
    </StyleguidePage>
  )
}
