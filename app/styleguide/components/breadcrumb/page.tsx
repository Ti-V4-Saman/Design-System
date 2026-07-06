"use client"

import * as React from "react"
import {
  Building2,
  FolderKanban,
  Home,
  Settings,
  User,
  Users,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CRMBreadcrumb, type BreadcrumbEntry } from "@/components/crm-breadcrumb"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Kbd,
  ResponsiveSection,
  Section,
  DesignNotes,
  RelatedComponents,
  StyleguidePage,
} from "@/app/styleguide/_components"

/* ---------- CRM datasets ---------- */

const clientesTrail: BreadcrumbEntry[] = [
  { label: "Dashboard", href: "#", icon: Home },
  { label: "Clientes", href: "#", icon: Users },
  { label: "Acme Inc.", href: "#", icon: Building2 },
  { label: "Ana Souza", icon: User },
]

const deepTrail: BreadcrumbEntry[] = [
  { label: "Dashboard", href: "#", icon: Home },
  { label: "Clientes", href: "#" },
  { label: "Acme Inc.", href: "#" },
  { label: "Contatos", href: "#" },
  { label: "Ana Souza", href: "#" },
  { label: "Atividades" },
]

/* ---------- page ---------- */

export default function BreadcrumbPage_() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Breadcrumb"
        description={
          <>
            Trilha de navegação acessível (HTML semântico <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">nav/ol/li</code>). Ancestrais são
            links; o item atual é uma página não-clicável com <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">aria-current=&quot;page&quot;</code>.
            Cores e foco vêm dos tokens do CRM V4.
          </>
        }
      />

      <Section title="Padrão" description="Trilha simples; último item é a página atual.">
        <Demo>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Clientes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Acme Inc.</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </Section>

      <Section
        title="Com ícones"
        description="Ícones lucide antes do rótulo — úteis para reforçar o nível (Dashboard, Clientes, Empresa, Contato)."
      >
        <Demo>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Home /> Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Users /> Clientes
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Building2 /> Acme Inc.
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <User /> Ana Souza
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </Section>

      <Section
        title="Composição — CRMBreadcrumb (data-driven)"
        description="Passe um array de níveis; o último vira página atual automaticamente. Ícones opcionais por item."
      >
        <Demo>
          <CRMBreadcrumb items={clientesTrail} />
        </Demo>
      </Section>

      <Section
        title="Composição — dropdown de níveis + elipse (overflow)"
        description="Trilhas longas colapsam o meio numa elipse que abre um dropdown com os níveis ocultos (maxItems). Mantém o 1º e os 2 últimos visíveis."
      >
        <Demo>
          <CRMBreadcrumb items={deepTrail} maxItems={4} />
        </Demo>
      </Section>

      <Section
        title="Composição — elipse estática"
        description="Quando o dropdown não é necessário, use apenas o BreadcrumbEllipsis como indicador de níveis omitidos."
      >
        <Demo>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Atividades</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Demo>
      </Section>

      <Section
        title="Composição — exemplos reais de CRM"
        description="Trilhas típicas do produto — Configurações, Projetos e Pipeline."
      >
        <Demo>
          <div className="space-y-4">
            <CRMBreadcrumb
              items={[
                { label: "Configurações", href: "#", icon: Settings },
                { label: "Equipe", href: "#" },
                { label: "Permissões" },
              ]}
            />
            <CRMBreadcrumb
              items={[
                { label: "Projetos", href: "#", icon: FolderKanban },
                { label: "Onboarding Acme", href: "#" },
                { label: "Tarefas", href: "#" },
                { label: "Configurar integração" },
              ]}
            />
            <CRMBreadcrumb
              items={[
                { label: "Dashboard", href: "#", icon: Home },
                { label: "Pipeline", href: "#" },
                { label: "Q3", href: "#" },
                { label: "Proposta", href: "#" },
                { label: "Renovação Acme" },
              ]}
              maxItems={4}
            />
          </div>
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <><code className="font-mono text-xs">nav aria-label=&quot;breadcrumb&quot;</code> envolve uma lista ordenada semântica.</>,
          <>A página atual recebe <code className="font-mono text-xs">aria-current=&quot;page&quot;</code> e não é um link.</>,
          <>Separadores e elipse são <code className="font-mono text-xs">aria-hidden</code> (decorativos).</>,
          <><Kbd>Tab</Kbd> percorre os links com foco visível (ring); no dropdown da elipse, <Kbd>Enter</Kbd> abre e as setas navegam.</>,
        ]}
      />

      <ResponsiveSection description="A lista quebra em várias linhas (flex-wrap) em telas estreitas. Para caminhos muito longos, prefira o colapso com maxItems. Reduza a largura da janela para ver a quebra.">
        <Demo>
          <div className="max-w-xs">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Clientes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Acme Inc.</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Contatos / Ana Souza</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </Demo>
      </ResponsiveSection>

      <DarkModeSection description="A mesma trilha nos dois temas — links, foreground e a página atual via tokens.">
        <CRMBreadcrumb items={clientesTrail} />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "BreadcrumbLink", type: "href, asChild", description: "Ancestral clicável; asChild para usar o Link do Next." },
            { prop: "BreadcrumbPage", type: "children", description: "Item atual, com aria-current=\"page\" (não-link)." },
            { prop: "BreadcrumbSeparator", type: "children", description: "Chevron entre itens; aceita ícone custom via children." },
            { prop: "BreadcrumbEllipsis", type: "—", description: "Indicador aria-hidden de níveis omitidos." },
          ],
          [
            { prop: "CRMBreadcrumb.items", type: "BreadcrumbEntry[]", description: "Níveis { label, href?, icon? }; o último vira página atual." },
            { prop: "CRMBreadcrumb.maxItems", type: "number", description: "Colapsa o meio da trilha num dropdown quando excede o limite." },
          ],
        ]}
      />

      <Section title="Código" description="Primitivos para controle total; CRMBreadcrumb para o caminho rápido.">
        <div className="space-y-4">
          <CodeBlock>{`import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink asChild><Link href="/">Dashboard</Link></BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Atual</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}</CodeBlock>
          <CodeBlock>{`import { CRMBreadcrumb } from "@/components/crm-breadcrumb"
import { Home, Users, Building2, User } from "lucide-react"

<CRMBreadcrumb
  items={[
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Clientes", href: "/clientes", icon: Users },
    { label: "Acme Inc.", href: "/clientes/acme", icon: Building2 },
    { label: "Ana Souza", icon: User },   // sem href -> página atual
  ]}
  maxItems={4}
/>`}</CodeBlock>
        </div>
      </Section>

      <GuidelinesSection
        dos={[
          "Reflita a hierarquia real de navegação da página.",
          "Deixe o item atual como BreadcrumbPage (não-link).",
          "Colapse trilhas longas com maxItems.",
        ]}
        donts={[
          "Não use como menu de navegação principal.",
          "Não torne o item atual um link.",
          "Não exceda ~4–5 níveis sem colapsar.",
        ]}
      />

      <DesignNotes
        items={[
          "Não é primitivo Radix: markup semântico <nav>/<ol>/<li>. O item atual é um BreadcrumbPage não-link com aria-current=\"page\"; os ancestrais são links.",
          "Separadores e a elipse são aria-hidden (apresentação) — leitores de tela pulam direto entre os níveis navegáveis.",
          "CRMBreadcrumb é data-driven: ao exceder maxItems, colapsa o meio (mantém o 1º crumb e os 2 últimos) num dropdown de elipse acessível.",
          "Cores vêm dos tokens: trilha em text-muted-foreground, hover e item atual em text-foreground, com ring de foco discreto e arredondado.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Dropdown Menu",
            href: "/styleguide/components/dropdown-menu",
            description: "Usado pela elipse do CRMBreadcrumb para revelar os níveis colapsados.",
          },
          {
            name: "Navigation Menu",
            href: "/styleguide/components/navigation-menu",
            description: "Navegação de topo entre seções, complementar à trilha hierárquica.",
          },
          {
            name: "Sidebar",
            href: "/styleguide/components/sidebar",
            description: "Navegação lateral principal; o breadcrumb indica onde você está nela.",
          },
          {
            name: "Pagination",
            href: "/styleguide/components/pagination",
            description: "Outro padrão de navegação semântico (nav/ol) para percorrer conjuntos.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
