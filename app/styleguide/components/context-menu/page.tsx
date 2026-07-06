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

/* ---------- page-local helpers ---------- */

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
  return <div className="rounded-xl border bg-card p-5">{children}</div>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      {children}
    </pre>
  )
}

/** Dashed right-click target. */
function Target({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-28 w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 text-center text-sm text-muted-foreground select-none">
      {children}
    </div>
  )
}

/* ---------- page ---------- */

export default function ContextMenuPage() {
  const [showValue, setShowValue] = React.useState(true)
  const [showStage, setShowStage] = React.useState(false)
  const [density, setDensity] = React.useState("comfortable")

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Context Menu</h1>
        <p className="max-w-2xl text-muted-foreground">
          Menu acionado por clique-direito (Radix ContextMenu). Compartilha a mesma linguagem visual
          do Dropdown Menu — superfície <code>bg-popover</code> + <code>shadow-dropdown</code>, itens
          com foco <code>accent</code> e destrutivo semântico. Posiciona no ponteiro; teclado e aria
          pelo Radix.
        </p>
      </header>

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
        title="Checkbox, Radio & Submenu"
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
        title="Exemplo real — card de deal"
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

      <Section title="Uso & API" description="Envolva o alvo com ContextMenuTrigger (asChild).">
        <div className="space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Itens & props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>ContextMenuItem</code> — <code>variant</code> (default · destructive), <code>inset</code>, <code>disabled</code></li>
                <li><code>ContextMenuCheckboxItem</code> / <code>RadioGroup</code> / <code>RadioItem</code></li>
                <li><code>ContextMenuSub</code> — menus aninhados</li>
                <li><code>ContextMenuShortcut</code> — atalho à direita</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Abre com <kbd className="rounded bg-muted px-1">Menu</kbd> / Shift+F10 no alvo focado</li>
                <li><kbd className="rounded bg-muted px-1">↑</kbd> <kbd className="rounded bg-muted px-1">↓</kbd> navegam · <kbd className="rounded bg-muted px-1">→</kbd> abre submenu</li>
                <li><kbd className="rounded bg-muted px-1">Esc</kbd> fecha · typeahead por digitação</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use para ações contextuais de um item específico (card, linha).</li>
                <li>Espelhe as ações também num kebab (nem todos descobrem o clique-direito).</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não coloque ações críticas apenas no clique-direito.</li>
                <li>Não use para navegação principal.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
