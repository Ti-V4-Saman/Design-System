"use client"

import * as React from "react"
import {
  Archive,
  ChevronDown,
  Copy,
  Eye,
  Filter,
  LogOut,
  Mail,
  Monitor,
  Moon,
  Pencil,
  Settings,
  Sun,
  Trash2,
  User,
  UserPlus,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ActionsMenu, type ActionsMenuEntry } from "@/components/crm-actions-menu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* ---------- page-local presentation helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      {children}
    </pre>
  )
}

/* ---------- page ---------- */

export default function DropdownMenuPage() {
  const [columns, setColumns] = React.useState({
    empresa: true,
    valor: true,
    estagio: false,
  })
  const [sort, setSort] = React.useState("recent")

  const rowActions: ActionsMenuEntry[] = [
    { type: "label", label: "Ações" },
    { label: "Ver detalhes", icon: Eye, shortcut: "⏎" },
    { label: "Editar", icon: Pencil, shortcut: "⌘E" },
    { label: "Duplicar", icon: Copy },
    { type: "separator" },
    { label: "Excluir", icon: Trash2, variant: "destructive", shortcut: "⌘⌫" },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dropdown Menu</h1>
        <p className="max-w-2xl text-muted-foreground">
          Menu de ações sobre o primitivo Radix DropdownMenu (navegação por teclado, typeahead,
          submenus, aria). Superfície e itens usam os tokens do CRM V4 — mesma linguagem do
          Popover e do Select. Alterne o tema para ver em dark mode.
        </p>
      </header>

      <Section
        title="Básico"
        description="Itens com ícones, atalhos, separador e item destrutivo (token destructive)."
      >
        <Demo>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Abrir menu <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52">
              <DropdownMenuItem>
                <Eye /> Ver detalhes <DropdownMenuShortcut>⏎</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pencil /> Editar <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy /> Duplicar
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Archive /> Arquivar (indisponível)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 /> Excluir <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>

      <Section
        title="Checkbox & Radio"
        description="Alternar colunas visíveis (checkbox) e ordenação (radio) — estado controlado, padrão comum em tabelas de CRM."
      >
        <Demo>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="size-4" /> Exibir
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Colunas</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={columns.empresa}
                onCheckedChange={(v) => setColumns((c) => ({ ...c, empresa: !!v }))}
              >
                Empresa
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.valor}
                onCheckedChange={(v) => setColumns((c) => ({ ...c, valor: !!v }))}
              >
                Valor do deal
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={columns.estagio}
                onCheckedChange={(v) => setColumns((c) => ({ ...c, estagio: !!v }))}
              >
                Estágio
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Ordenar por</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="recent">Mais recentes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="value">Maior valor</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="alpha">A – Z</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-xs text-muted-foreground">
            Colunas: {Object.entries(columns).filter(([, v]) => v).map(([k]) => k).join(", ") || "nenhuma"} · Ordem: {sort}
          </span>
        </Demo>
      </Section>

      <Section
        title="Submenus & grupos"
        description="Ações aninhadas (mover para estágio, atribuir a) com rótulos de seção."
      >
        <Demo>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Deal <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Deal · Renovação Acme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Eye /> Abrir
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Mover para estágio</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Prospecção</DropdownMenuItem>
                    <DropdownMenuItem>Qualificação</DropdownMenuItem>
                    <DropdownMenuItem>Proposta</DropdownMenuItem>
                    <DropdownMenuItem>Negociação</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <UserPlus /> Atribuir a
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Ana Souza</DropdownMenuItem>
                    <DropdownMenuItem>Bruno Lima</DropdownMenuItem>
                    <DropdownMenuItem>Carla Dias</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2 /> Excluir deal
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Demo>
      </Section>

      <Section
        title="Inset (alinhamento)"
        description="A prop inset (em Item e Label) recua o texto para alinhar itens sem indicador com os itens de checkbox/radio."
      >
        <Demo>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Alinhamento inset</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel inset>Visualização</DropdownMenuLabel>
              <DropdownMenuCheckboxItem checked>Mostrar arquivados</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Densidade compacta</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem inset>Expandir tudo</DropdownMenuItem>
              <DropdownMenuItem inset>Recolher tudo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-muted-foreground">
            Os itens com <code>inset</code> ficam alinhados ao texto dos checkboxes acima.
          </span>
        </Demo>
      </Section>

      <Section
        title="ActionsMenu (wrapper CRM)"
        description="Menu kebab dirigido por dados — passe um array de ações e o gatilho ⋯ + menu são montados para você."
      >
        <Demo>
          <ActionsMenu actions={rowActions} />
          <span className="text-sm text-muted-foreground">
            ← O padrão de ações de linha, pronto para tabelas.
          </span>
        </Demo>
      </Section>

      <Section
        title="Exemplos reais de CRM"
        description="Ações de linha na tabela, menu de conta com submenu de tema, e ações em massa numa seleção."
      >
        <div className="space-y-4">
          {/* Row actions */}
          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            {[
              { name: "Ana Souza", org: "Acme Inc.", initials: "AS" },
              { name: "Bruno Lima", org: "Globex", initials: "BL" },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback>{row.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.org}</p>
                  </div>
                </div>
                <ActionsMenu actions={rowActions} />
              </div>
            ))}
          </div>

          <Demo>
            {/* Account menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="size-6">
                    <AvatarFallback>FS</AvatarFallback>
                  </Avatar>
                  Felipe Saman
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User /> Perfil <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings /> Configurações <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Monitor /> Tema
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Sun /> Claro
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Moon /> Escuro
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Monitor /> Sistema
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Bulk actions */}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-2">
              <span className="text-sm font-medium text-foreground">3 selecionados</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    Ações em massa <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem>
                    <Mail /> Enviar e-mail
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <UserPlus /> Atribuir a…
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive /> Arquivar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <Trash2 /> Excluir selecionados
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Demo>
        </div>
      </Section>

      <Section
        title="Alinhamento & estados"
        description="align start/center/end, gatilho desabilitado e item desabilitado."
      >
        <Demo>
          {(["start", "center", "end"] as const).map((align) => (
            <DropdownMenu key={align}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">align: {align}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={align}>
                <DropdownMenuItem>Opção um</DropdownMenuItem>
                <DropdownMenuItem>Opção dois</DropdownMenuItem>
                <DropdownMenuItem disabled>Opção desabilitada</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Button variant="outline" disabled>
            Trigger desabilitado
          </Button>
        </Demo>
      </Section>

      <Section title="Uso & API" description="Import único; ActionsMenu para o caminho rápido ou os primitivos para controle total.">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">ActionsMenu (caminho rápido)</p>
            <CodeBlock>{`import { ActionsMenu } from "@/components/crm-actions-menu"
import { Eye, Pencil, Trash2 } from "lucide-react"

<ActionsMenu
  align="end"
  actions={[
    { label: "Ver detalhes", icon: Eye, onSelect: view },
    { label: "Editar", icon: Pencil, shortcut: "⌘E", onSelect: edit },
    { type: "separator" },
    { label: "Excluir", icon: Trash2, variant: "destructive", onSelect: remove },
  ]}
/>`}</CodeBlock>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Primitivos (checkbox / radio / submenu)</p>
            <CodeBlock>{`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button>Exibir</Button></DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuCheckboxItem checked={v} onCheckedChange={setV}>Empresa</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
      <DropdownMenuRadioItem value="recent">Mais recentes</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}</CodeBlock>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Itens & props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>DropdownMenuItem</code> — <code>variant</code> (default · destructive), <code>inset</code>, <code>disabled</code></li>
                <li><code>DropdownMenuCheckboxItem</code> — <code>checked</code> / <code>onCheckedChange</code></li>
                <li><code>DropdownMenuRadioGroup</code> — <code>value</code> / <code>onValueChange</code></li>
                <li><code>DropdownMenuSub</code> — menus aninhados</li>
                <li><code>DropdownMenuShortcut</code> — atalho alinhado à direita</li>
                <li><code>DropdownMenuContent</code> — <code>align</code>, <code>side</code>, <code>sideOffset</code></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><kbd className="rounded bg-muted px-1">↑</kbd> <kbd className="rounded bg-muted px-1">↓</kbd> navegam pelos itens</li>
                <li><kbd className="rounded bg-muted px-1">→</kbd> abre submenu · <kbd className="rounded bg-muted px-1">←</kbd> fecha</li>
                <li><kbd className="rounded bg-muted px-1">⏎</kbd> aciona · <kbd className="rounded bg-muted px-1">Esc</kbd> fecha</li>
                <li>Typeahead: digite para pular ao item</li>
                <li>Foco retorna ao gatilho ao fechar</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use ícone kebab (⋯) para ações de linha em tabelas.</li>
                <li>Coloque a ação destrutiva por último, após um separador.</li>
                <li>Agrupe com labels quando houver muitas ações.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não use dropdown para seleção de formulário — use o Select.</li>
                <li>Não aninhe mais de um nível de submenu.</li>
                <li>Não misture destrutivo sem separá-lo das ações comuns.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
