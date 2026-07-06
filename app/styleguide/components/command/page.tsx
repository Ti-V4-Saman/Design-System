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
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Kbd,
  Section,
  DesignNotes,
  RelatedComponents,
  StyleguidePage,
} from "@/app/styleguide/_components"

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
    <StyleguidePage>
      <ComponentHeader
        title="Command"
        description={
          <>
            Paleta de comandos do CRM V4 sobre{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">cmdk</code> +{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Dialog</code>. Busca,
            navegação por teclado e acessibilidade do cmdk; visual 100% com tokens CRM V4 (seleção
            em <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code> emerald).
          </>
        }
      />

      <Section
        title="Command Menu (⌘K)"
        description="Paleta global controlada por useCommandMenu. Atalho ⌘K / Ctrl+K, grupos estáticos, recentes e busca async com skeleton."
      >
        <Demo className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => menu.setOpen(true)}>
              Abrir paleta
              <CommandShortcut className="ml-2 rounded bg-primary-foreground/15 px-1.5 py-0.5 text-primary-foreground">
                ⌘K
              </CommandShortcut>
            </Button>
            <span className="text-sm text-muted-foreground">
              ou pressione <Kbd>⌘K</Kbd>
            </span>
            {lastAction ? (
              <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                {lastAction}
              </span>
            ) : null}
          </div>
          <p className="text-xs text-muted-foreground">
            Digite para buscar entidades (ex.: &quot;hauck&quot;, &quot;sandra&quot;) — a busca é
            assíncrona e mostra o estado de loading.
          </p>
        </Demo>

        <CommandMenu
          open={menu.open}
          onOpenChange={menu.setOpen}
          groups={groups}
          recent={RECENT}
          onSearch={handleSearch}
          searchHeading="Clientes & Leads"
        />
      </Section>

      <Section
        title="Composição — Inline Command"
        description="Command embutido (não-modal), para painéis e menus contextuais."
      >
        <Demo>
          <div className="max-w-md">
            <InlineCommand />
          </div>
        </Demo>
      </Section>

      <Section
        title="Composição — Command Combobox"
        description="Select buscável (Command + Popover). Check no item selecionado, empty state e opções desabilitadas."
      >
        <Demo center className="items-end gap-6">
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
        </Demo>
      </Section>

      <Section title="Estados" description="Estados de item e de lista.">
        <div className="grid gap-4 lg:grid-cols-2">
          <Demo className="space-y-3">
            <p className="text-sm font-medium text-foreground">Itens — normal, selecionado, desabilitado</p>
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
          </Demo>
          <Demo className="space-y-3">
            <p className="text-sm font-medium text-foreground">Empty state (busque por &quot;xyz&quot;)</p>
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
          </Demo>
        </div>
      </Section>

      <AccessibilitySection
        items={[
          <>Navegação total por teclado (setas, <code className="font-mono text-xs">Enter</code>, <code className="font-mono text-xs">Esc</code>) via cmdk.</>,
          <>Atalho global <Kbd>⌘K</Kbd> / <Kbd>Ctrl+K</Kbd> para abrir a paleta.</>,
          <>Itens desabilitados não são focáveis nem selecionáveis.</>,
          <>Estado vazio sempre visível (<code className="font-mono text-xs">CommandEmpty</code>) para orientar o usuário.</>,
          <>Busca assíncrona sinaliza carregamento enquanto os resultados chegam.</>,
        ]}
      />

      <DarkModeSection description="O mesmo Command nos dois temas — superfície e seleção vêm dos tokens.">
        <InlineCommand />
      </DarkModeSection>

      <ApiSection
        description="Import via barrel. CommandMenu controlado; combobox single-select."
        groups={[
          [
            { prop: "CommandMenu.open / onOpenChange", type: "boolean / (o) => void", description: "Estado controlado da paleta (use useCommandMenu)." },
            { prop: "CommandMenu.groups", type: "CommandGroupData[]", default: "[]", description: "Grupos estáticos (Navegação, Ações rápidas)." },
            { prop: "CommandMenu.recent", type: "CommandItemData[]", default: "[]", description: "Itens recentes exibidos sem query." },
            { prop: "CommandMenu.onSearch", type: "(q) => Promise<CommandItemData[]>", description: "Busca assíncrona → skeleton de loading." },
            { prop: "CommandMenu.searchHeading", type: "string", default: '"Resultados"', description: "Título do grupo de resultados da busca." },
            { prop: "useCommandMenu()", type: "{ open, setOpen, toggle }", description: "Hook com estado + atalho ⌘K registrado." },
          ],
          [
            { prop: "CommandCombobox.options", type: "ComboboxOption[]", description: "Opções { value, label, icon?, disabled? }." },
            { prop: "CommandCombobox.value / onChange", type: "string / (v) => void", description: "Valor selecionado (single-select controlado)." },
            { prop: "CommandCombobox.placeholder", type: "string", description: "Texto do gatilho quando nada selecionado." },
            { prop: "CommandCombobox.searchPlaceholder", type: "string", description: "Placeholder do input de busca." },
            { prop: "CommandCombobox.heading", type: "string", description: "Título opcional do grupo na lista." },
            { prop: "CommandCombobox.disabled", type: "boolean", default: "false", description: "Desabilita o combobox." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { CommandMenu, CommandCombobox, useCommandMenu } from "@/components/command"

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
<CommandCombobox options={owners} value={owner} onChange={setOwner} placeholder="Responsável" />`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Agrupe comandos por intenção (Navegação, Ações, Resultados).",
          "Exponha atalhos consistentes (⌘K para abrir, letras para navegar).",
          "Use busca async com loading para entidades do CRM.",
          "Prefira CommandCombobox a Select quando houver muitas opções.",
        ]}
        donts={[
          "Não coloque dezenas de itens sem grupos ou busca.",
          "Não use a paleta para fluxos longos com formulários.",
          "Não esconda o estado vazio — sempre oriente o usuário.",
          "Não sobrescreva o atalho ⌘K de outros contextos de input.",
        ]}
      />

      <DesignNotes
        items={[
          "Construído sobre cmdk: filtragem, navegação por teclado e seleção são nativas; o CommandItem destaca com o token data-selected:bg-accent.",
          "CommandDialog reaproveita o Dialog (surface, portal, foco preso) e reposiciona a paleta no topo (top-1/3), com título e descrição em sr-only.",
          "O CommandMenu (⌘K) combina grupos estáticos (Navegação, Ações) com busca async debounced de entidades, exibindo skeleton de loading e estado vazio.",
          "O input reusa o InputGroup com addon de lupa; o match padrão busca em label, descrição e keywords.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Dialog",
            href: "/styleguide/components/dialog",
            description: "Base do CommandDialog: overlay, portal e foco preso.",
          },
          {
            name: "Dropdown Menu",
            href: "/styleguide/components/dropdown-menu",
            description: "Mesmo vocabulário de itens e atalhos para ações pontuais ancoradas.",
          },
          {
            name: "Input Group",
            href: "/styleguide/components/input-group",
            description: "Compõe o campo de busca da paleta com o addon de ícone.",
          },
          {
            name: "Sidebar",
            href: "/styleguide/components/sidebar",
            description: "A paleta é o atalho de navegação global que complementa o rail lateral.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
