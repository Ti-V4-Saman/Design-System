"use client"

import * as React from "react"
import {
  Building2,
  CalendarPlus,
  CheckSquare,
  CircleDashed,
  CircleDot,
  FileText,
  FolderKanban,
  LayoutDashboard,
  Settings,
  UserPlus,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  CommandCombobox,
  CommandMenu,
  useCommandMenu,
  type CommandGroupData,
  type CommandItemData,
  type ComboboxOption,
} from "@/components/command"

// ─── Mock CRM data ───────────────────────────────────────────────────────────

const NAV: CommandGroupData = {
  heading: "Navegação",
  items: [
    { id: "nav-dashboard", label: "Dashboard", icon: LayoutDashboard, shortcut: "G D" },
    { id: "nav-clients", label: "Clientes", icon: Building2, shortcut: "G C" },
    { id: "nav-leads", label: "Leads", icon: Users, shortcut: "G L" },
    { id: "nav-projects", label: "Projetos", icon: FolderKanban, shortcut: "G P" },
    { id: "nav-settings", label: "Configurações", icon: Settings },
  ],
}

const ACTIONS: CommandGroupData = {
  heading: "Ações rápidas",
  items: [
    { id: "new-lead", label: "Novo lead", icon: UserPlus, shortcut: "N L" },
    { id: "new-project", label: "Novo projeto", icon: FolderKanban, shortcut: "N P" },
    { id: "new-task", label: "Nova tarefa", icon: CheckSquare, shortcut: "N T" },
    { id: "new-meeting", label: "Agendar reunião", icon: CalendarPlus },
    { id: "new-note", label: "Nova nota", icon: FileText, disabled: true },
  ],
}

const RECENT: CommandItemData[] = [
  { id: "recent-1", label: "Halvorson Inc", description: "Cliente · Gold", icon: Building2 },
  { id: "recent-2", label: "Adrain Ondricka", description: "Lead · Negociação", icon: Users },
]

// Simulated async entity search.
const ENTITIES: CommandItemData[] = [
  { id: "e-1", label: "Halvorson Inc", description: "Cliente · Gold", icon: Building2 },
  { id: "e-2", label: "Hauck Ltd", description: "Cliente · Gold", icon: Building2 },
  { id: "e-3", label: "Adrain Ondricka", description: "Lead · Negociação", icon: Users },
  { id: "e-4", label: "Zoila Hauck", description: "Lead · Novo", icon: Users },
  { id: "e-5", label: "Koss, Stracke and Bernier", description: "Cliente · Silver", icon: Building2 },
  { id: "e-6", label: "Sandra Waters", description: "Lead · Qualificado", icon: Users },
]

const OWNERS: ComboboxOption[] = [
  { value: "sara", label: "Sara Ann" },
  { value: "john", label: "John Doe" },
  { value: "richard", label: "Richard Gray" },
  { value: "michael", label: "Michael Wood" },
  { value: "mark", label: "Mark Thomas" },
]

const STATUSES: ComboboxOption[] = [
  { value: "new", label: "Novo", icon: CircleDashed },
  { value: "discussion", label: "Discussão", icon: CircleDot },
  { value: "qualified", label: "Qualificado", icon: CircleDot },
  { value: "won", label: "Ganho", icon: CircleDot },
  { value: "lost", label: "Perdido", icon: CircleDot, disabled: true },
]

// ─── Layout helpers ──────────────────────────────────────────────────────────

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 mt-12 border-t border-border pt-8 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-lg font-semibold text-foreground">{children}</h2>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

/** Inline Command example reused for light/dark. */
function InlineCommand() {
  return (
    <Command className="border border-border shadow-card">
      <CommandInput placeholder="Digite um comando ou busque…" />
      <CommandList>
        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
        <CommandGroup heading="Navegação">
          {NAV.items.map((item) => {
            const Icon = item.icon!
            return (
              <CommandItem key={item.id} value={item.label} disabled={item.disabled}>
                <Icon className="text-muted-foreground" />
                <span>{item.label}</span>
                {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
              </CommandItem>
            )
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Ações rápidas">
          {ACTIONS.items.map((item) => {
            const Icon = item.icon!
            return (
              <CommandItem key={item.id} value={item.label} disabled={item.disabled}>
                <Icon className="text-muted-foreground" />
                <span>{item.label}</span>
                {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CommandPage() {
  const menu = useCommandMenu()
  const [owner, setOwner] = React.useState<string>("")
  const [status, setStatus] = React.useState<string>("new")
  const [lastAction, setLastAction] = React.useState<string>("")

  const handleSearch = React.useCallback(async (query: string) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const q = query.toLowerCase()
    return ENTITIES.filter((e) => e.label.toLowerCase().includes(q)).map((e) => ({
      ...e,
      onSelect: () => setLastAction(`Abriu: ${e.label}`),
    }))
  }, [])

  const groups: CommandGroupData[] = React.useMemo(
    () => [
      { ...NAV, items: NAV.items.map((i) => ({ ...i, onSelect: () => setLastAction(`Navegou: ${i.label}`) })) },
      { ...ACTIONS, items: ACTIONS.items.map((i) => ({ ...i, onSelect: () => setLastAction(`Ação: ${i.label}`) })) },
    ],
    []
  )

  return (
    <div className="max-w-7xl p-8">
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Command</h1>
        <p className="text-sm text-muted-foreground">
          Paleta de comandos do CRM V4 sobre{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cmdk</code> +{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Dialog</code>. Busca,
          navegação por teclado e acessibilidade do cmdk; visual 100% com tokens CRM V4 (seleção
          em <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code> emerald).
        </p>
      </div>

      {/* ── Command Menu ⌘K ── */}
      <SectionTitle hint="Paleta global controlada por useCommandMenu. Atalho ⌘K / Ctrl+K, grupos estáticos, recentes e busca async com skeleton.">
        Command Menu (⌘K)
      </SectionTitle>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => menu.setOpen(true)}>
          Abrir paleta
          <CommandShortcut className="ml-2 rounded bg-primary-foreground/15 px-1.5 py-0.5 text-primary-foreground">
            ⌘K
          </CommandShortcut>
        </Button>
        <span className="text-sm text-muted-foreground">
          ou pressione{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs">⌘K</kbd>
        </span>
        {lastAction ? (
          <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
            {lastAction}
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Digite para buscar entidades (ex.: &quot;hauck&quot;, &quot;sandra&quot;) — a busca é
        assíncrona e mostra o estado de loading.
      </p>

      <CommandMenu
        open={menu.open}
        onOpenChange={menu.setOpen}
        groups={groups}
        recent={RECENT}
        onSearch={handleSearch}
        searchHeading="Clientes & Leads"
      />

      {/* ── Inline ── */}
      <SectionTitle hint="Command embutido (não-modal), para painéis e menus contextuais.">
        Inline Command
      </SectionTitle>
      <div className="max-w-md">
        <InlineCommand />
      </div>

      {/* ── Combobox ── */}
      <SectionTitle hint="Select buscável (Command + Popover). Check no item selecionado, empty state e opções desabilitadas.">
        Command Combobox
      </SectionTitle>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Responsável</label>
          <CommandCombobox
            options={OWNERS}
            value={owner}
            onChange={setOwner}
            placeholder="Selecionar responsável"
            searchPlaceholder="Buscar pessoa…"
            heading="Time"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">Status</label>
          <CommandCombobox
            options={STATUSES}
            value={status}
            onChange={setStatus}
            placeholder="Selecionar status"
            searchPlaceholder="Buscar status…"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-muted-foreground">Desabilitado</label>
          <CommandCombobox options={OWNERS} placeholder="Indisponível" disabled />
        </div>
      </div>

      {/* ── States ── */}
      <SectionTitle hint="Estados de item e de lista.">Estados</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <p className="mb-3 text-sm font-medium text-foreground">Itens — normal, selecionado, desabilitado</p>
            <Command className="border border-border">
              <CommandList>
                <CommandGroup heading="Exemplos">
                  <CommandItem value="normal">
                    <Users className="text-muted-foreground" />
                    <span>Item normal</span>
                  </CommandItem>
                  <CommandItem value="checked" data-checked>
                    <CheckSquare className="text-muted-foreground" />
                    <span>Item selecionado (check)</span>
                  </CommandItem>
                  <CommandItem value="disabled" disabled>
                    <FileText className="text-muted-foreground" />
                    <span>Item desabilitado</span>
                  </CommandItem>
                  <CommandItem value="shortcut">
                    <Settings className="text-muted-foreground" />
                    <span>Com atalho</span>
                    <CommandShortcut>⌘,</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="mb-3 text-sm font-medium text-foreground">Empty state (busque por &quot;xyz&quot;)</p>
            <Command className="border border-border">
              <CommandInput placeholder="Buscar…" />
              <CommandList>
                <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                <CommandGroup heading="Clientes">
                  <CommandItem value="Halvorson Inc">
                    <Building2 className="text-muted-foreground" />
                    <span>Halvorson Inc</span>
                  </CommandItem>
                  <CommandItem value="Hauck Ltd">
                    <Building2 className="text-muted-foreground" />
                    <span>Hauck Ltd</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </div>

      {/* ── Light / Dark ── */}
      <SectionTitle hint="O mesmo Command nos dois temas — superfície e seleção vêm dos tokens.">
        Light &amp; Dark
      </SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
          <InlineCommand />
        </div>
        <div className="dark rounded-xl border border-border bg-background p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
          <InlineCommand />
        </div>
      </div>

      {/* ── Uso & API ── */}
      <SectionTitle hint="Import via barrel. CommandMenu controlado; combobox single-select.">
        Uso &amp; API
      </SectionTitle>
      <Card>
        <CardContent className="pt-6">
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
{`import { CommandMenu, CommandCombobox, useCommandMenu } from "@/components/command"

// Paleta global ⌘K
const menu = useCommandMenu()               // { open, setOpen, toggle } + atalho ⌘K
<Button onClick={() => menu.setOpen(true)}>Abrir</Button>
<CommandMenu
  open={menu.open}
  onOpenChange={menu.setOpen}
  groups={[{ heading: "Navegação", items: [{ id: "clients", label: "Clientes", onSelect }] }]}
  recent={recentItems}
  onSearch={async (q) => await api.search(q)}   // async → loading skeleton
/>

// Select buscável
<CommandCombobox options={owners} value={owner} onChange={setOwner} placeholder="Responsável" />`}
          </pre>
        </CardContent>
      </Card>

      {/* ── Do / Don't ── */}
      <SectionTitle>Boas práticas</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <p className="mb-2 text-sm font-semibold text-success">Do</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Agrupe comandos por intenção (Navegação, Ações, Resultados).</li>
            <li>• Exponha atalhos consistentes (⌘K para abrir, letras para navegar).</li>
            <li>• Use busca async com loading para entidades do CRM.</li>
            <li>• Prefira CommandCombobox a Select quando houver muitas opções.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="mb-2 text-sm font-semibold text-destructive">Don&apos;t</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Não coloque dezenas de itens sem grupos ou busca.</li>
            <li>• Não use a paleta para fluxos longos com formulários.</li>
            <li>• Não esconda o estado vazio — sempre oriente o usuário.</li>
            <li>• Não sobrescreva o atalho ⌘K de outros contextos de input.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
