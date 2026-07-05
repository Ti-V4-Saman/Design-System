"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

// ─── Mock data ───────────────────────────────────────────────────────────────

type Client = {
  id: number
  name: string
  contact: { name: string; src?: string }
  phone: string
  groups: string[]
  labels: { label: string; variant: "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" }[]
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
  { accessorKey: "id", header: "ID", sortable: true, width: "w-16" },
  { accessorKey: "name", header: "Name", sortable: true, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", cell: ({ row }) => <CellAvatar name={row.original.contact.name} src={row.original.contact.src} /> },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "groups", header: "Client groups", cell: ({ row }) => (
    <div className="flex flex-col gap-0.5">
      {row.original.groups.map((g) => <span key={g} className="text-sm text-foreground before:content-['•'] before:mr-1.5 before:text-muted-foreground">{g}</span>)}
    </div>
  )},
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l.label} value={l.label} variant={l.variant} />)}
    </div>
  )},
  { accessorKey: "projects", header: "Projects", align: "center" },
  { accessorKey: "invoiced", header: "Total invoiced", align: "right", cell: ({ row }) => <CellFinancial value={row.original.invoiced} /> },
  { accessorKey: "received", header: "Payment Received", align: "right", cell: ({ row }) => <CellFinancial value={row.original.received} /> },
  { accessorKey: "due", header: "Due", align: "right", cell: ({ row }) => <CellFinancial value={row.original.due} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Projects ────────────────────────────────────────────────────────────────

type Project = { id: number; title: string; client: string; price: number | null; startDate: string; deadline: string; progress: number; status: string }

const projectsData: Project[] = [
  { id: 6, title: "Video Animation and Editing", client: "Kevin Johnston", price: null, startDate: "05-07-2026", deadline: "08-09-2023", progress: 100, status: "Completed" },
  { id: 10, title: "Software Development for CRM", client: "Adrain Ondricka", price: 1000, startDate: "19-06-2026", deadline: "24-07-2026", progress: 100, status: "Completed" },
  { id: 3, title: "Social Media Marketing Campaign", client: "Fritsch, Okuneva and Armstrong", price: null, startDate: "23-05-2026", deadline: "27-06-2026", progress: 100, status: "Completed" },
  { id: 29, title: "Social Media Content Calendar", client: "Adrain Ondricka", price: 4000, startDate: "03-07-2026", deadline: "04-10-2023", progress: 100, status: "Completed" },
  { id: 27, title: "Podcast Production and Editing", client: "Adrain Ondricka", price: null, startDate: "24-06-2026", deadline: "11-09-2023", progress: 100, status: "Completed" },
  { id: 26, title: "Infographic Creation and Visualizations", client: "Alta Cassin", price: null, startDate: "31-05-2026", deadline: "28-06-2026", progress: 100, status: "Completed" },
]

const projectColumns: CRMColumnDef<Project>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-12" },
  { accessorKey: "title", header: "Title", sortable: true, cell: ({ row }) => <CellLink value={row.original.title} /> },
  { accessorKey: "client", header: "Client", cell: ({ row }) => <CellLink value={row.original.client} /> },
  { accessorKey: "price", header: "Price", align: "right", cell: ({ row }) => row.original.price ? <CellFinancial value={row.original.price} /> : <span className="text-muted-foreground text-sm">-</span> },
  { accessorKey: "startDate", header: "Start date", cell: ({ row }) => <CellDate value={row.original.startDate} /> },
  { accessorKey: "deadline", header: "Deadline", cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "progress", header: "Progress", cell: ({ row }) => <CellProgress value={row.original.progress} /> },
  { accessorKey: "status", header: "Status" },
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
  { accessorKey: "name", header: "Name", cell: ({ row }) => <CellAvatar name={row.original.name} onClick={() => {}} /> },
  { accessorKey: "clientName", header: "Client name", cell: ({ row }) => <CellLink value={row.original.clientName} /> },
  { accessorKey: "jobTitle", header: "Job Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Tasks ───────────────────────────────────────────────────────────────────

type Task = { id: number; title: string; labels: string[]; priority?: boolean; startDate: string; deadline: string; milestone: string; relatedTo: string; assignee: string; collaborators: string; status: string; borderColor: string }

const tasksData: Task[] = [
  { id: 3642, title: "Add company logo and contact details", labels: [], priority: false, startDate: "-", deadline: "17-05-2026", milestone: "Beta Release", relatedTo: "Business Card and Stationery Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
  { id: 3623, title: "Use VR for training and simulations", labels: ["Design"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Beta Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3617, title: "Optimize VR performance and frame rate", labels: [], priority: false, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3615, title: "Develop VR navigation and interactions", labels: ["Feedback"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3578, title: "Create data dashboards and reports", labels: ["Enhancement"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3576, title: "Perform data visualization and charts", labels: [], priority: true, startDate: "-", deadline: "16-06-2026", milestone: "Beta Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3571, title: "Implement product barcodes and labels", labels: [], priority: false, startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
  { id: 3570, title: "Test packaging durability and usability", labels: [], priority: false, startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3546, title: "A/B test ad variations", labels: [], priority: false, startDate: "-", deadline: "26-05-2026", milestone: "Beta Release", relatedTo: "Copywriting for Advertisements", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3530, title: "Design game characters and assets", labels: ["Bug"], priority: false, startDate: "-", deadline: "30-07-2026", milestone: "Release", relatedTo: "Mobile Game Development", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
]

function getTaskStatusVariant(status: string): "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" {
  if (status === "Completed") return "success"
  if (status === "In progress") return "primary"
  if (status === "Review") return "purple"
  if (status === "To do") return "warning"
  return "muted"
}

const taskColumns: CRMColumnDef<Task>[] = [
  { accessorKey: "id", header: "ID", width: "w-16" },
  { accessorKey: "title", header: "Title", cell: ({ row }) => (
    <div className="flex items-center gap-2 flex-wrap">
      <CellLink value={row.original.title} />
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="info" />)}
    </div>
  )},
  { accessorKey: "startDate", header: "Start date" },
  { accessorKey: "deadline", header: "Deadline", cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "milestone", header: "Milestone" },
  { accessorKey: "relatedTo", header: "Related to", cell: ({ row }) => <CellLink value={row.original.relatedTo} /> },
  { accessorKey: "assignee", header: "Assigned to", cell: ({ row }) => <CellAvatar name={row.original.assignee} /> },
  { accessorKey: "collaborators", header: "Collaborators" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <CellBadge value={row.original.status} variant={getTaskStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Leads ───────────────────────────────────────────────────────────────────

type Lead = { name: string; contact: string; phones: string[]; owner: string; labels: string[]; createdAt: string; status: string }

function getLeadStatusVariant(status: string): "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" {
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
  { accessorKey: "name", header: "Name", sortable: true, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", cell: ({ row }) => <CellAvatar name={row.original.contact} /> },
  { accessorKey: "phones", header: "Phone", cell: ({ row }) => <CellMulti values={row.original.phones} /> },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <CellAvatar name={row.original.owner} /> },
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="primary" />)}
    </div>
  )},
  { accessorKey: "createdAt", header: "Created at", cell: ({ row }) => <CellDate value={row.original.createdAt} /> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <CellBadge value={row.original.status} variant={getLeadStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TablePage() {
  const [loadingDemo, setLoadingDemo] = React.useState(false)

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">DataTable</h1>
        <p className="text-sm text-muted-foreground">
          Componente base reutilizável. Cada exemplo usa o mesmo{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CRMDataTable</code>{" "}
          com diferentes <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">columns</code> e{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">data</code>.
        </p>
      </div>

      <Tabs defaultValue="clients">
        <TabsList className="mb-6">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Clients Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Avatar, badges, valores financeiros, 3 action icons, seleção por linha.</p>
            <CRMDataTable data={clientsData} columns={clientColumns} pagination selectable />
          </section>
        </TabsContent>

        <TabsContent value="projects">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Projects Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Progress bar, status texto, datas com overdue detection.</p>
            <CRMDataTable data={projectsData} columns={projectColumns} pagination />
          </section>
        </TabsContent>

        <TabsContent value="contacts">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Contacts Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Avatar + nome, email, telefone, delete icon.</p>
            <CRMDataTable data={contactsData} columns={contactColumns} pagination searchable />
          </section>
        </TabsContent>

        <TabsContent value="tasks">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Tasks Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Checkbox por linha, borda lateral colorida por status, labels inline, datas overdue em vermelho.</p>
            <CRMDataTable
              data={tasksData}
              columns={taskColumns}
              pagination
              selectable
              rowBorderColor={(row) => row.borderColor}
            />
          </section>
        </TabsContent>

        <TabsContent value="leads">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Leads Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Múltiplos telefones empilhados, avatar no owner, status badges coloridos.</p>
            <CRMDataTable data={leadsData} columns={leadColumns} pagination />
          </section>
        </TabsContent>
      </Tabs>

      {/* States section */}
      <div className="mt-12 border-t border-border pt-8 space-y-8">
        <h2 className="text-lg font-semibold">Estados</h2>

        <div>
          <h3 className="text-sm font-semibold mb-1 text-muted-foreground uppercase tracking-wide">Loading</h3>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => { setLoadingDemo(true); setTimeout(() => setLoadingDemo(false), 2000) }}
              className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Simular loading (2s)
            </button>
          </div>
          <CRMDataTable data={loadingDemo ? [] : clientsData.slice(0, 3)} columns={clientColumns} loading={loadingDemo} pagination={false} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-1 text-muted-foreground uppercase tracking-wide">Empty State</h3>
          <CRMDataTable data={[]} columns={clientColumns} pagination={false} emptyMessage="Nenhum cliente encontrado. Clique em 'Add client' para começar." />
        </div>
      </div>
    </div>
  )
}
