"use client"

import * as React from "react"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

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

/** The reusable CRM workspace menu bar. */
function WorkspaceMenubar() {
  const [sidebar, setSidebar] = React.useState(true)
  const [details, setDetails] = React.useState(false)
  const [density, setDensity] = React.useState("comfortable")
  const [owner, setOwner] = React.useState("ana")

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Novo</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Deal <MenubarShortcut>⌘D</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Contato <MenubarShortcut>⌘K</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>Empresa</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Importar…</MenubarItem>
          <MenubarItem>Exportar…</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Editar</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Desfazer <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Refazer <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Recortar</MenubarItem>
          <MenubarItem>Copiar</MenubarItem>
          <MenubarItem disabled>Colar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Exibir</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem checked={sidebar} onCheckedChange={setSidebar}>
            Barra lateral
          </MenubarCheckboxItem>
          <MenubarCheckboxItem checked={details} onCheckedChange={setDetails}>
            Painel de detalhes
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={density} onValueChange={setDensity}>
            <MenubarRadioItem value="comfortable">Densidade confortável</MenubarRadioItem>
            <MenubarRadioItem value="compact">Densidade compacta</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Colunas</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem checked>Empresa</MenubarCheckboxItem>
              <MenubarCheckboxItem checked>Valor</MenubarCheckboxItem>
              <MenubarCheckboxItem>Estágio</MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Equipe</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value={owner} onValueChange={setOwner}>
            <MenubarRadioItem value="ana">Ana Souza</MenubarRadioItem>
            <MenubarRadioItem value="bruno">Bruno Lima</MenubarRadioItem>
            <MenubarRadioItem value="carla">Carla Dias</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem variant="destructive">Remover responsável</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Ajuda</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentação</MenubarItem>
          <MenubarItem>
            Atalhos <MenubarShortcut>?</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Falar com o suporte</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

/* ---------- page ---------- */

export default function MenubarPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Menubar</h1>
        <p className="max-w-2xl text-muted-foreground">
          Barra de menus estilo aplicativo (Radix Menubar). Compartilha a linguagem dos menus do CRM
          V4 (superfície <code>bg-popover</code> + <code>shadow-dropdown</code>, itens com foco
          <code> accent</code>, checkbox/radio/submenu, destrutivo semântico). A barra é uma faixa em
          <code> bg-card</code>. Navegação entre menus por setas.
        </p>
      </header>

      <Section
        title="Padrão"
        description="Uma barra de trabalho do CRM: Novo, Editar, Exibir (checkbox/radio/submenu), Equipe e Ajuda."
      >
        <Demo>
          <WorkspaceMenubar />
        </Demo>
      </Section>

      <Section
        title="Composição — cabeçalho de módulo"
        description="A menubar no topo de um painel, integrada com o restante da UI."
      >
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-between gap-4 border-b border-border bg-card px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Pipeline · Q3</p>
              <p className="text-xs text-muted-foreground">32 deals · R$ 1,2M</p>
            </div>
            <WorkspaceMenubar />
          </div>
          <div className="flex h-40 items-center justify-center bg-muted/20 text-sm text-muted-foreground">
            Área de conteúdo do módulo
          </div>
        </div>
      </Section>

      <Section title="Uso & API" description="Root Menubar › MenubarMenu › Trigger + Content.">
        <div className="space-y-4">
          <CodeBlock>{`import {
  Menubar, MenubarMenu, MenubarTrigger, MenubarContent,
  MenubarItem, MenubarSeparator, MenubarShortcut,
  MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem,
  MenubarSub, MenubarSubTrigger, MenubarSubContent,
} from "@/components/ui/menubar"

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>Novo</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>Deal <MenubarShortcut>⌘D</MenubarShortcut></MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Importar…</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`}</CodeBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Itens & props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>MenubarItem</code> — <code>variant</code> (default · destructive), <code>inset</code>, <code>disabled</code></li>
                <li><code>MenubarCheckboxItem</code> / <code>RadioGroup</code> / <code>RadioItem</code></li>
                <li><code>MenubarSub</code> — submenus · <code>MenubarShortcut</code> — atalho</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><kbd className="rounded bg-muted px-1">←</kbd> <kbd className="rounded bg-muted px-1">→</kbd> alternam entre menus</li>
                <li><kbd className="rounded bg-muted px-1">↑</kbd> <kbd className="rounded bg-muted px-1">↓</kbd> navegam itens · <kbd className="rounded bg-muted px-1">Enter</kbd> aciona</li>
                <li><kbd className="rounded bg-muted px-1">Esc</kbd> fecha · typeahead por digitação</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use em telas densas de trabalho (workspace, editor).</li>
                <li>Agrupe ações por menu de forma previsível.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não use como navegação principal do app (use a sidebar).</li>
                <li>Não sobrecarregue com dezenas de itens por menu.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
