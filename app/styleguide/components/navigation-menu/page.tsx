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

/* ---------- page ---------- */

export default function NavigationMenuPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Navigation Menu</h1>
        <p className="max-w-2xl text-muted-foreground">
          Navegação de topo com painéis suspensos animados (Radix NavigationMenu). O viewport usa a
          superfície flutuante do CRM V4 (<code>bg-popover</code> + <code>shadow-dropdown</code>);
          gatilhos e links usam os tokens <code>accent</code>. Ideal para cabeçalhos de app e
          mega-menus.
        </p>
      </header>

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

      <Section title="Uso & API" description="Root › List › Item › Trigger + Content (painel) ou Link (item simples).">
        <div className="space-y-4">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>NavigationMenu</code> — <code>viewport</code> (default true)</li>
                <li><code>NavigationMenuTrigger</code> — abre painel (chevron automático)</li>
                <li><code>NavigationMenuContent</code> — conteúdo do painel</li>
                <li><code>NavigationMenuLink</code> — link; <code>asChild</code> p/ Next Link</li>
                <li><code>navigationMenuTriggerStyle()</code> — estilo p/ links de topo</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><kbd className="rounded bg-muted px-1">Tab</kbd> foca os gatilhos; <kbd className="rounded bg-muted px-1">Enter</kbd>/setas abrem</li>
                <li>Setas navegam dentro do painel · <kbd className="rounded bg-muted px-1">Esc</kbd> fecha</li>
                <li>Region com aria do Radix; foco visível com ring</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use para navegação de topo com poucas seções.</li>
                <li>Descreva cada link com um subtítulo curto.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não substitua a navegação lateral principal por ela.</li>
                <li>Não coloque formulários dentro dos painéis.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
