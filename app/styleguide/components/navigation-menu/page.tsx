"use client"

import * as React from "react"
import { BarChart3, Building2, Kanban, LifeBuoy, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
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

function ListItem({
  icon: Icon,
  title,
  children,
  href = "#",
}: {
  icon?: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  href?: string
}) {
  return (
    <li>
      <NavigationMenuLink href={href}>
        <div className="flex items-center gap-2 text-sm font-medium leading-none text-foreground">
          {Icon && <Icon className="size-4 text-muted-foreground" />}
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
      </NavigationMenuLink>
    </li>
  )
}

/** Non-portaled replica of an open panel, to show the surface in both themes. */
function NavPanelPreview() {
  return (
    <div className="w-[280px] rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-[var(--shadow-dropdown)]">
      <div className="rounded-sm bg-accent px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <BarChart3 className="size-4 text-muted-foreground" /> Dashboard
        </div>
        <p className="text-sm leading-snug text-muted-foreground">Visão geral de KPIs, metas e pipeline.</p>
      </div>
      <div className="rounded-sm px-3 py-2">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Users className="size-4 text-muted-foreground" /> Clientes
        </div>
        <p className="text-sm leading-snug text-muted-foreground">Contatos, empresas e histórico.</p>
      </div>
    </div>
  )
}

export default function NavigationMenuPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Navigation Menu"
        description={
          <>
            Navegação de topo com painéis suspensos animados (Radix NavigationMenu). O viewport usa a
            superfície flutuante do CRM V4 (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code> + <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>);
            gatilhos e links usam os tokens <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code>. Ideal para cabeçalhos de app e mega-menus.
          </>
        }
      />

      <Section
        title="Padrão (com viewport)"
        description="Passe o mouse/foco nos gatilhos. O painel abre num viewport animado que redimensiona conforme o conteúdo."
      >
        <Demo>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Módulos</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-2 md:grid-cols-2">
                    <ListItem icon={BarChart3} title="Dashboard">
                      Visão geral de KPIs, metas e pipeline.
                    </ListItem>
                    <ListItem icon={Users} title="Clientes">
                      Contatos, empresas e histórico de relacionamento.
                    </ListItem>
                    <ListItem icon={Kanban} title="Pipeline">
                      Deals por estágio, previsão e conversão.
                    </ListItem>
                    <ListItem icon={Building2} title="Projetos">
                      Onboarding e entregas por conta.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Relatórios</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[320px] gap-1 p-2">
                    <ListItem title="Vendas">Receita, win rate e ciclo de venda.</ListItem>
                    <ListItem title="Atividades">Ligações, e-mails e reuniões por rep.</ListItem>
                    <ListItem title="Cohorts">Retenção e expansão ao longo do tempo.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "flex-row")}>
                  Integrações
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </Section>

      <Section
        title="Sem viewport"
        description="Com viewport={false}, cada painel ancora diretamente sob o seu item — bom para menus pequenos."
      >
        <Demo>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Conta</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[240px] gap-1 p-2">
                    <ListItem title="Perfil">Dados e preferências do usuário.</ListItem>
                    <ListItem title="Equipe">Membros, papéis e permissões.</ListItem>
                    <ListItem title="Faturamento">Plano, assentos e faturas.</ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "flex-row gap-1.5")}>
                  <LifeBuoy className="size-4 text-muted-foreground" /> Ajuda
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Demo>
      </Section>

      <Section
        title="Composição — header do app"
        description="A navegação integrada num cabeçalho, com marca à esquerda e ações à direita."
      >
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-2.5">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground">CRM V4</span>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "flex-row")}>
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Clientes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[280px] gap-1 p-2">
                      <ListItem title="Todos os contatos">Base completa de pessoas.</ListItem>
                      <ListItem title="Empresas">Contas e organizações.</ListItem>
                      <ListItem title="Segmentos">Listas dinâmicas e filtros salvos.</ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#" className={cn(navigationMenuTriggerStyle(), "flex-row")}>
                    Pipeline
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <span className="text-xs text-muted-foreground">felipe@v4company.com</span>
        </div>
      </Section>

      <AccessibilitySection
        items={[
          <><kbd className="font-mono text-xs">Tab</kbd> foca os gatilhos; <kbd className="font-mono text-xs">Enter</kbd>/setas abrem o painel.</>,
          <>Setas navegam dentro do painel · <kbd className="font-mono text-xs">Esc</kbd> fecha.</>,
          <>Region com aria do Radix; foco visível com ring.</>,
        ]}
      />

      <DarkModeSection description="A superfície flutuante do painel nos dois temas — bg-popover, accent no item ativo e shadow-dropdown.">
        <NavPanelPreview />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "NavigationMenu.viewport", type: "boolean", default: "true", description: "Usa o viewport animado compartilhado; false ancora cada painel sob o item." },
            { prop: "NavigationMenuTrigger", type: "—", description: "Abre o painel; adiciona chevron automático." },
            { prop: "NavigationMenuContent", type: "—", description: "Conteúdo do painel suspenso." },
            { prop: "NavigationMenuLink", type: "asChild", description: "Link de navegação; asChild para o Next Link." },
            { prop: "navigationMenuTriggerStyle()", type: "() => string", description: "Classe utilitária para estilizar links de topo como gatilhos." },
          ],
        ]}
      />

      <Section title="Código" description="Root › List › Item › Trigger + Content (painel) ou Link (item simples).">
        <CodeBlock>{`import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem,
  NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Módulos</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[420px] gap-1 p-2 md:grid-cols-2">
          <li><NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink></li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/pipeline" className={navigationMenuTriggerStyle()}>
        Pipeline
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use para navegação de topo com poucas seções.",
          "Descreva cada link com um subtítulo curto.",
          "Use viewport={false} para menus pequenos ancorados.",
        ]}
        donts={[
          "Não substitua a navegação lateral principal por ela.",
          "Não coloque formulários dentro dos painéis.",
          "Não empilhe dezenas de links num único painel.",
        ]}
      />

      <DesignNotes
        items={[
          "Navegação de topo com painéis dropdown animados no primitivo Radix NavigationMenu (posicionamento, teclado e aria nativos).",
          "O viewport usa a superfície flutuante CRM V4 (border-border · bg-popover · shadow-dropdown · rounded-lg); gatilhos e links usam tokens de hover/foco accent.",
          "viewport={false} ancora cada painel ao próprio item (menus pequenos) em vez de um viewport compartilhado — bom para diferenciar mega-menus de menus curtos.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Sidebar",
            href: "/styleguide/components/sidebar",
            description: "Navegação lateral principal; a navigation menu cobre o topo.",
          },
          {
            name: "Breadcrumb",
            href: "/styleguide/components/breadcrumb",
            description: "Mostra a posição atual dentro da hierarquia navegada.",
          },
          {
            name: "Menubar",
            href: "/styleguide/components/menubar",
            description: "Barra de comandos de app (não navegação) com painéis semelhantes.",
          },
          {
            name: "Dropdown Menu",
            href: "/styleguide/components/dropdown-menu",
            description: "Mesma superfície flutuante, usada para ações ancoradas.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
