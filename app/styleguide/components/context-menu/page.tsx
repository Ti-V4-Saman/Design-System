"use client"

import * as React from "react"
import {
  Archive,
  Copy,
  Eye,
  Pencil,
  Star,
  Tag,
  Trash2,
  UserPlus,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
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
  StyleguidePage,
} from "@/app/styleguide/_components"

/** Dashed right-click target. */
function Target({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-center text-sm text-muted-foreground select-none">
      {children}
    </div>
  )
}

/** Non-portaled replica of the menu surface, to show it in both themes. */
function MenuPreview() {
  return (
    <div className="w-52 rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-[var(--shadow-dropdown)]">
      <div className="flex items-center gap-2 rounded-sm bg-accent px-2 py-1.5 text-sm text-accent-foreground">
        <Eye className="size-4" /> Ver detalhes
        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⏎</span>
      </div>
      <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
        <Pencil className="size-4" /> Editar
        <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘E</span>
      </div>
      <div className="my-1 h-px bg-border" />
      <div className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive">
        <Trash2 className="size-4" /> Excluir
      </div>
    </div>
  )
}

/* ---------- page ---------- */

export default function ContextMenuPage() {
  const [showValue, setShowValue] = React.useState(true)
  const [showStage, setShowStage] = React.useState(false)
  const [density, setDensity] = React.useState("comfortable")

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Context Menu"
        description={
          <>
            Menu acionado por clique-direito (Radix ContextMenu). Compartilha a mesma linguagem visual
            do Dropdown Menu — superfície <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code> + <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>, itens
            com foco <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code> e destrutivo semântico. Posiciona no ponteiro; teclado e aria
            pelo Radix.
          </>
        }
      />

      <Section
        title="Básico"
        description="Clique com o botão direito na área abaixo. Itens com ícones, atalhos, separador e ação destrutiva."
      >
        <Demo>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Target>Clique com o botão direito aqui</Target>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem>
                <Eye /> Ver detalhes <ContextMenuShortcut>⏎</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Pencil /> Editar <ContextMenuShortcut>⌘E</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy /> Duplicar <ContextMenuShortcut>⌘D</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem disabled>
                <Archive /> Arquivar (indisponível)
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <Trash2 /> Excluir <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </Section>

      <Section
        title="Variantes de item — Checkbox, Radio & Submenu"
        description="Alternar colunas (checkbox), densidade (radio) e ações aninhadas (submenu)."
      >
        <Demo>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <Target>Clique-direito para opções de exibição</Target>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuLabel>Colunas</ContextMenuLabel>
              <ContextMenuCheckboxItem checked={showValue} onCheckedChange={setShowValue}>
                Valor do deal
              </ContextMenuCheckboxItem>
              <ContextMenuCheckboxItem checked={showStage} onCheckedChange={setShowStage}>
                Estágio
              </ContextMenuCheckboxItem>
              <ContextMenuSeparator />
              <ContextMenuLabel>Densidade</ContextMenuLabel>
              <ContextMenuRadioGroup value={density} onValueChange={setDensity}>
                <ContextMenuRadioItem value="comfortable">Confortável</ContextMenuRadioItem>
                <ContextMenuRadioItem value="compact">Compacta</ContextMenuRadioItem>
              </ContextMenuRadioGroup>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Tag /> Etiquetar
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Prioritário</ContextMenuItem>
                  <ContextMenuItem>Follow-up</ContextMenuItem>
                  <ContextMenuItem>Sem contato</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuContent>
          </ContextMenu>
        </Demo>
      </Section>

      <Section
        title="Composição — card de deal"
        description="Clique-direito no card para as ações contextuais, incluindo submenu 'Atribuir a'."
      >
        <Demo>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="flex max-w-sm cursor-default items-center gap-3 rounded-lg border border-border bg-card p-4 select-none">
                <Avatar className="size-10">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Renovação Acme</p>
                  <p className="text-xs text-muted-foreground">R$ 148.000 · Ana Souza</p>
                </div>
                <Badge variant="secondary">Proposta</Badge>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-52">
              <ContextMenuItem>
                <Eye /> Abrir deal
              </ContextMenuItem>
              <ContextMenuItem>
                <Star /> Favoritar
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <UserPlus /> Atribuir a
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Ana Souza</ContextMenuItem>
                  <ContextMenuItem>Bruno Lima</ContextMenuItem>
                  <ContextMenuItem>Carla Dias</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem variant="destructive">
                <Trash2 /> Excluir deal
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
          <p className="mt-3 text-xs text-muted-foreground">
            Dica: em trackpad, use clique com dois dedos.
          </p>
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>Abre com a tecla <Kbd>Menu</Kbd> / <Kbd>Shift</Kbd>+<Kbd>F10</Kbd> no alvo focado.</>,
          <><Kbd>↑</Kbd> <Kbd>↓</Kbd> navegam entre itens; <Kbd>→</Kbd> abre o submenu, <Kbd>←</Kbd> volta.</>,
          <><Kbd>Esc</Kbd> fecha o menu; typeahead por digitação seleciona itens pelo rótulo.</>,
          <>Item destrutivo usa <code className="font-mono text-xs">variant=&quot;destructive&quot;</code>; itens desabilitados são pulados.</>,
        ]}
      />

      <DarkModeSection description="A mesma superfície de menu nos dois temas — bg-popover, foco accent e shadow-dropdown via tokens.">
        <MenuPreview />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "ContextMenuItem.variant", type: '"default" | "destructive"', default: '"default"', description: "Item comum ou de ação destrutiva." },
            { prop: "ContextMenuItem", type: "inset, disabled", description: "Recuo para alinhar com itens de ícone; desabilita o item." },
            { prop: "ContextMenuCheckboxItem", type: "checked, onCheckedChange", description: "Item alternável (colunas, toggles)." },
            { prop: "ContextMenuRadioGroup / RadioItem", type: "value, onValueChange", description: "Seleção exclusiva dentro do grupo." },
          ],
          [
            { prop: "ContextMenuSub", type: "ContextMenuSubTrigger + SubContent", description: "Menus aninhados." },
            { prop: "ContextMenuShortcut", type: "children", description: "Exibe o atalho alinhado à direita." },
            { prop: "ContextMenuLabel / Separator", type: "—", description: "Rótulo de grupo e divisória." },
          ],
        ]}
      />

      <Section title="Código" description="Envolva o alvo com ContextMenuTrigger (asChild).">
        <CodeBlock>{`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
  ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent,
} from "@/components/ui/context-menu"

<ContextMenu>
  <ContextMenuTrigger asChild>
    <div>Área clicável</div>
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem><Eye /> Ver</ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive"><Trash2 /> Excluir</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use para ações contextuais de um item específico (card, linha).",
          "Espelhe as ações também num kebab (nem todos descobrem o clique-direito).",
        ]}
        donts={[
          "Não coloque ações críticas apenas no clique-direito.",
          "Não use para navegação principal.",
        ]}
      />
    </StyleguidePage>
  )
}
