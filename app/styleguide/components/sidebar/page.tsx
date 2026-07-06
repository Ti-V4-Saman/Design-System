"use client"

import * as React from "react"
import {
  BarChart3,
  Building2,
  ChevronRight,
  FolderKanban,
  LayoutDashboard,
  LifeBuoy,
  Users,
  Zap,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/sidebar"

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

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "leads", label: "Leads", icon: Users, badge: "24" },
  { id: "clients", label: "Clientes", icon: Building2 },
  { id: "projects", label: "Projetos", icon: FolderKanban, badge: "7" },
]

/** Scoped CRM shell demo. */
function SidebarDemo({ defaultOpen = true, collapsible = "icon" as const }: { defaultOpen?: boolean; collapsible?: "icon" | "offcanvas" | "none" }) {
  const [active, setActive] = React.useState("leads")
  const [projectsOpen, setProjectsOpen] = React.useState(true)

  return (
    <div className="h-[30rem] overflow-hidden rounded-lg border border-border">
      <SidebarProvider defaultOpen={defaultOpen} className="h-full">
        <Sidebar collapsible={collapsible}>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-1 py-1.5">
              <div className="grid size-7 shrink-0 place-items-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                <Zap className="size-4" />
              </div>
              <span className="text-sm font-semibold group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:hidden">CRM V4</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarMenu>
                {NAV.map((item) => {
                  const Icon = item.icon
                  if (item.id === "projects") {
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={active === item.id}
                          tooltip={item.label}
                          onClick={() => { setActive(item.id); setProjectsOpen((v) => !v) }}
                        >
                          <Icon />
                          <span>{item.label}</span>
                          <ChevronRight className={cn("ml-auto size-4 shrink-0 transition-transform group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:hidden", projectsOpen && "rotate-90")} />
                        </SidebarMenuButton>
                        {projectsOpen ? (
                          <SidebarMenuSub>
                            <SidebarMenuSubItem><SidebarMenuSubButton isActive><span>Ativos</span></SidebarMenuSubButton></SidebarMenuSubItem>
                            <SidebarMenuSubItem><SidebarMenuSubButton><span>Arquivados</span></SidebarMenuSubButton></SidebarMenuSubItem>
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuItem>
                    )
                  }
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton isActive={active === item.id} tooltip={item.label} onClick={() => setActive(item.id)}>
                        <Icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                      {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Ferramentas</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem><SidebarMenuButton tooltip="Relatórios" onClick={() => setActive("reports")} isActive={active === "reports"}><BarChart3 /><span>Relatórios</span></SidebarMenuButton></SidebarMenuItem>
                <SidebarMenuItem><SidebarMenuButton tooltip="Automações" onClick={() => setActive("auto")} isActive={active === "auto"}><Zap /><span>Automações</span></SidebarMenuButton></SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem><SidebarMenuButton tooltip="Suporte"><LifeBuoy /><span>Suporte</span></SidebarMenuButton></SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Sara Ann">
                  <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
                  <span className="flex min-w-0 flex-col text-left leading-tight">
                    <span className="truncate text-sm font-medium">Sara Ann</span>
                    <span className="truncate text-xs text-sidebar-foreground/60">sara@v4.com</span>
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-3">
            <SidebarTrigger />
            <span className="text-sm font-medium capitalize text-foreground">{active}</span>
            <span className="ml-auto text-xs text-muted-foreground">⌘B para alternar</span>
          </header>
          <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
            Conteúdo de <span className="mx-1 font-medium text-foreground">{active}</span>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}

export default function SidebarPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Sidebar</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Navegação lateral do app CRM — colapsável para rail de ícones, com grupos, submenus,
          badges e overlay no mobile. Usa os tokens <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">--sidebar</code>.
        </p>
      </div>

      <Section title="App shell interativo" description="Clique no gatilho (ou ⌘B) para colapsar/expandir. Itens ativos, badges e submenu.">
        <SidebarDemo />
      </Section>

      <Section title="Colapsado (icon rail)" description='collapsible="icon" — só ícones, rótulos viram tooltip ao passar o mouse.'>
        <SidebarDemo defaultOpen={false} />
      </Section>

      <Section title="Variantes de colapso" description='"icon" (rail), "offcanvas" (some por completo) e "none" (sempre visível).'>
        <div className="space-y-4">
          <SidebarDemo collapsible="offcanvas" defaultOpen={false} />
        </div>
      </Section>

      <Section title="Responsivo & mobile" description="Abaixo de 768px o Sidebar vira um overlay com backdrop (redimensione a janela para ver). O SidebarTrigger abre/fecha o drawer.">
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          No mobile, o gatilho controla um drawer sobreposto (mesmo componente, comportamento adaptado pelo <code className="font-mono text-xs">SidebarProvider</code>).
        </div>
      </Section>

      <Section title="Dark Mode">
        <div className="dark">
          <SidebarDemo />
        </div>
      </Section>

      <Section title="Acessibilidade & teclado">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• <kbd className="rounded border border-border bg-muted px-1 text-xs">⌘B</kbd> / <kbd className="rounded border border-border bg-muted px-1 text-xs">Ctrl B</kbd> alterna o sidebar.</li>
          <li>• Itens são focáveis por teclado com anel de foco (<code className="font-mono text-xs">ring-sidebar-ring</code>).</li>
          <li>• Quando colapsado, os rótulos viram tooltip — o texto acessível é preservado.</li>
          <li>• O item ativo usa <code className="font-mono text-xs">data-active</code> (cor + peso), não só cor.</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { SidebarProvider, Sidebar, SidebarInset, SidebarContent, SidebarMenu,
  SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/sidebar"

<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive tooltip="Leads">
            <Users /><span>Leads</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <header><SidebarTrigger /></header>
    {/* conteúdo */}
  </SidebarInset>
</SidebarProvider>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable rows={[
            { prop: "SidebarProvider", type: "defaultOpen, open, onOpenChange", def: "defaultOpen=true", desc: "Estado + atalho ⌘B + detecção mobile." },
            { prop: "Sidebar.collapsible", type: '"icon" | "offcanvas" | "none"', def: '"icon"', desc: "Modo de colapso." },
            { prop: "SidebarInset", type: "container", desc: "Área de conteúdo ao lado do rail." },
            { prop: "SidebarTrigger / SidebarRail", type: "—", desc: "Alternam o estado (botão / trilho na borda)." },
          ]} />
          <ApiTable rows={[
            { prop: "SidebarMenuButton", type: "isActive, tooltip, asChild", desc: "Item de navegação; tooltip aparece quando colapsado." },
            { prop: "SidebarMenuBadge", type: "ReactNode", desc: "Contador/rótulo à direita (some no icon rail)." },
            { prop: "SidebarMenuSub / SubButton", type: "isActive", desc: "Submenu aninhado." },
            { prop: "SidebarGroup / GroupLabel", type: "container", desc: "Seções rotuladas." },
          ]} />
        </div>
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Agrupe itens por contexto com GroupLabel.",
            "Use ícones consistentes + rótulo em cada item.",
            "Forneça tooltip para o modo colapsado.",
            "Destaque o item ativo com data-active.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não aninhe mais de 2 níveis de submenu.",
            "Não use ícones sem rótulo/tooltip.",
            "Não coloque ações destrutivas soltas no topo.",
            "Não transmita o item ativo só pela cor.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
