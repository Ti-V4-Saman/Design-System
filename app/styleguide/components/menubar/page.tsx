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

export default function MenubarPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Menubar"
        description={
          <>
            Barra de menus estilo aplicativo (Radix Menubar). Compartilha a linguagem dos menus do CRM
            V4 (superfície <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code> + <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>, itens com foco{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code>, checkbox/radio/submenu, destrutivo semântico). A barra é uma faixa em{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-card</code>; navegação entre menus por setas.
          </>
        }
      />

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

      <AccessibilitySection
        items={[
          <><kbd className="font-mono text-xs">←</kbd> <kbd className="font-mono text-xs">→</kbd> alternam entre menus.</>,
          <><kbd className="font-mono text-xs">↑</kbd> <kbd className="font-mono text-xs">↓</kbd> navegam itens · <kbd className="font-mono text-xs">Enter</kbd> aciona.</>,
          <><kbd className="font-mono text-xs">Esc</kbd> fecha · typeahead por digitação.</>,
          <>Foco retorna ao gatilho ao fechar; itens têm roles de menu do Radix.</>,
        ]}
      />

      <DarkModeSection description="A mesma faixa de menus nos dois temas — bg-card na barra, bg-popover nos painéis, tudo por token.">
        <WorkspaceMenubar />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "Menubar", type: "—", description: "Raiz da barra; contém vários MenubarMenu." },
            { prop: "MenubarMenu", type: "—", description: "Um menu (Trigger + Content)." },
            { prop: "MenubarItem", type: "variant, inset, disabled", default: '"default"', description: "Item de ação; variant default · destructive." },
            { prop: "MenubarCheckboxItem", type: "checked, onCheckedChange", description: "Item alternável." },
            { prop: "MenubarRadioGroup / RadioItem", type: "value, onValueChange", description: "Opções exclusivas." },
            { prop: "MenubarSub", type: "—", description: "Submenu aninhado (SubTrigger + SubContent)." },
            { prop: "MenubarShortcut", type: "—", description: "Atalho alinhado à direita." },
          ],
        ]}
      />

      <Section title="Código" description="Root Menubar › MenubarMenu › Trigger + Content.">
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
      </Section>

      <GuidelinesSection
        dos={[
          "Use em telas densas de trabalho (workspace, editor).",
          "Agrupe ações por menu de forma previsível.",
          "Separe a ação destrutiva das ações comuns.",
        ]}
        donts={[
          "Não use como navegação principal do app (use a sidebar).",
          "Não sobrecarregue com dezenas de itens por menu.",
          "Não aninhe muitos níveis de submenu.",
        ]}
      />

      <DesignNotes
        items={[
          "Barra de menus estilo app no primitivo Radix Menubar; a própria barra é uma faixa em superfície de card com os gatilhos.",
          "Os painéis compartilham a linguagem de Dropdown/Context Menu (surface bg-popover · shadow-dropdown; foco accent; check on-brand; destrutivo semântico).",
          "Painéis com min-w-[12rem] (mais largos que dropdown/context) — pensados para menus com atalhos alinhados à direita.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Dropdown Menu",
            href: "/styleguide/components/dropdown-menu",
            description: "Mesmo sistema de itens, para ações pontuais ancoradas num gatilho.",
          },
          {
            name: "Context Menu",
            href: "/styleguide/components/context-menu",
            description: "Mesma linguagem de itens acionada por clique-direito.",
          },
          {
            name: "Navigation Menu",
            href: "/styleguide/components/navigation-menu",
            description: "Navegação de topo com painéis; a menubar é para comandos, não navegação.",
          },
          {
            name: "Command",
            href: "/styleguide/components/command",
            description: "Acesso rápido às mesmas ações por busca (⌘K).",
          },
        ]}
      />
    </StyleguidePage>
  )
}
