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
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  DesignNotes,
  RelatedComponents,
  StyleguidePage,
} from "@/app/styleguide/_components"

/** Non-portaled replica of the menu surface, to show it in both themes. */
function MenuPreview() {
  return (
    <div className="w-52 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-dropdown)]">
      <div className="flex items-center gap-2 rounded-sm bg-accent px-2 py-1.5 text-sm text-accent-foreground">
        <Eye className="size-4" /> Ver detalhes
        <span className="ml-auto text-xs text-muted-foreground">⏎</span>
      </div>
      <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
        <Pencil className="size-4" /> Editar
        <span className="ml-auto text-xs text-muted-foreground">⌘E</span>
      </div>
      <div className="my-1 h-px bg-border" />
      <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive">
        <Trash2 className="size-4" /> Excluir
      </div>
    </div>
  )
}

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
    <StyleguidePage>
      <ComponentHeader
        title="Dropdown Menu"
        description={
          <>
            Menu de ações sobre o primitivo Radix DropdownMenu (navegação por teclado, typeahead,
            submenus, aria). Superfície e itens usam os tokens do CRM V4 — mesma linguagem do
            Popover e do Select.
          </>
        }
      />

      <Section
        title="Básico"
        description="Itens com ícones, atalhos, separador e item destrutivo (token destructive)."
      >
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
          <ActionsMenu actions={rowActions} />
          <span className="text-sm text-muted-foreground">
            ← O padrão de ações de linha, pronto para tabelas.
          </span>
        </Demo>
      </Section>

      <Section
        title="Composição — exemplos reais de CRM"
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

          <Demo center>
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
        <Demo center>
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

      <AccessibilitySection
        items={[
          <><kbd className="font-mono text-xs">↑</kbd> <kbd className="font-mono text-xs">↓</kbd> navegam pelos itens.</>,
          <><kbd className="font-mono text-xs">→</kbd> abre submenu · <kbd className="font-mono text-xs">←</kbd> fecha.</>,
          <><kbd className="font-mono text-xs">⏎</kbd> aciona · <kbd className="font-mono text-xs">Esc</kbd> fecha.</>,
          <>Typeahead: digite para pular ao item. Foco retorna ao gatilho ao fechar.</>,
        ]}
      />

      <DarkModeSection description="A mesma superfície de menu nos dois temas — bg-popover, accent no foco e shadow-dropdown via tokens.">
        <MenuPreview />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "DropdownMenuItem", type: "variant, inset, disabled", default: '"default"', description: "Item de ação; variant default · destructive." },
            { prop: "DropdownMenuCheckboxItem", type: "checked, onCheckedChange", description: "Item alternável (toggle)." },
            { prop: "DropdownMenuRadioGroup", type: "value, onValueChange", description: "Grupo de opções exclusivas." },
            { prop: "DropdownMenuSub", type: "—", description: "Submenu aninhado (Trigger + SubContent)." },
            { prop: "DropdownMenuContent", type: "align, side, sideOffset", description: "Superfície flutuante; posicionamento Radix." },
            { prop: "DropdownMenuShortcut", type: "—", description: "Atalho alinhado à direita do item." },
          ],
          [
            { prop: "ActionsMenu.actions", type: "ActionsMenuEntry[]", description: "Entradas do menu (ação, separador, label)." },
            { prop: "ActionsMenu.trigger", type: "React.ReactNode", default: "kebab (⋯)", description: "Gatilho customizado." },
            { prop: "ActionsMenu.align / side", type: '"start"|"center"|"end" / …', default: 'align="end"', description: "Posicionamento do menu." },
          ],
        ]}
      />

      <Section title="Código" description="Import único; ActionsMenu para o caminho rápido ou os primitivos para controle total.">
        <div className="space-y-4">
          <CodeBlock>{`import { ActionsMenu } from "@/components/crm-actions-menu"
import { Eye, Pencil, Trash2 } from "lucide-react"

// Caminho rápido — ações de linha dirigidas por dados
<ActionsMenu
  align="end"
  actions={[
    { label: "Ver detalhes", icon: Eye, onSelect: view },
    { label: "Editar", icon: Pencil, shortcut: "⌘E", onSelect: edit },
    { type: "separator" },
    { label: "Excluir", icon: Trash2, variant: "destructive", onSelect: remove },
  ]}
/>`}</CodeBlock>
          <CodeBlock>{`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"

// Primitivos — checkbox / radio / submenu
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
      </Section>

      <GuidelinesSection
        dos={[
          "Use ícone kebab (⋯) para ações de linha em tabelas.",
          "Coloque a ação destrutiva por último, após um separador.",
          "Agrupe com labels quando houver muitas ações.",
        ]}
        donts={[
          "Não use dropdown para seleção de formulário — use o Select.",
          "Não aninhe mais de um nível de submenu.",
          "Não misture destrutivo sem separá-lo das ações comuns.",
        ]}
      />

      <DesignNotes
        items={[
          "Radix DropdownMenu fornece foco rotativo, typeahead, submenus e aria; o visual CRM V4 é 100% tokens e igual a Popover/Select (bg-popover · shadow-dropdown · border-border).",
          "A variante destructive por item usa o token semântico e mantém o ícone destrutivo mesmo em foco (! important).",
          "Suporta CheckboxItem e RadioItem com indicadores on-brand (check e ponto em primary), além de submenus (Sub).",
          "ActionsMenu é o wrapper data-driven: recebe actions (ações, separadores, labels) e renderiza o gatilho kebab (⋯) + menu.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Context Menu",
            href: "/styleguide/components/context-menu",
            description: "Mesma linguagem de itens, acionada por clique-direito.",
          },
          {
            name: "Menubar",
            href: "/styleguide/components/menubar",
            description: "Barra de menus de app com o mesmo vocabulário de itens.",
          },
          {
            name: "Command",
            href: "/styleguide/components/command",
            description: "Paleta de busca para ações e navegação globais.",
          },
          {
            name: "Navigation Menu",
            href: "/styleguide/components/navigation-menu",
            description: "Painéis de navegação de topo (não confundir com menu de ações).",
          },
        ]}
      />
    </StyleguidePage>
  )
}
