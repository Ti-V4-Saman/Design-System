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
  return <div className="rounded-xl border bg-card p-5">{children}</div>
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      {children}
    </pre>
  )
}

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
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Breadcrumb</h1>
        <p className="max-w-2xl text-muted-foreground">
          Trilha de navegação acessível (HTML semântico <code>nav/ol/li</code>). Ancestrais são
          links; o item atual é uma página não-clicável com <code>aria-current=&quot;page&quot;</code>.
          Cores e foco vêm dos tokens do CRM V4. Alterne o tema para ver em dark mode.
        </p>
      </header>

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
        title="CRMBreadcrumb (data-driven)"
        description="Passe um array de níveis; o último vira página atual automaticamente. Ícones opcionais por item."
      >
        <Demo>
          <CRMBreadcrumb items={clientesTrail} />
        </Demo>
        <CodeBlock>{`import { CRMBreadcrumb } from "@/components/crm-breadcrumb"
import { Home, Users, Building2, User } from "lucide-react"

<CRMBreadcrumb
  items={[
    { label: "Dashboard", href: "/", icon: Home },
    { label: "Clientes", href: "/clientes", icon: Users },
    { label: "Acme Inc.", href: "/clientes/acme", icon: Building2 },
    { label: "Ana Souza", icon: User },   // sem href -> página atual
  ]}
/>`}</CodeBlock>
      </Section>

      <Section
        title="Com dropdown de níveis + elipse (overflow)"
        description="Trilhas longas colapsam o meio numa elipse que abre um dropdown com os níveis ocultos (maxItems). Mantém o 1º e os 2 últimos visíveis."
      >
        <Demo>
          <CRMBreadcrumb items={deepTrail} maxItems={4} />
        </Demo>
        <CodeBlock>{`<CRMBreadcrumb items={trailLongo} maxItems={4} />
// Dashboard › … (dropdown: Clientes, Acme, Contatos) › Ana Souza › Atividades`}</CodeBlock>
      </Section>

      <Section
        title="Elipse estática"
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
        title="Responsivo"
        description="A lista quebra em várias linhas (flex-wrap) em telas estreitas. Para caminhos muito longos, prefira o colapso com maxItems. Reduza a largura da janela para ver a quebra."
      >
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
      </Section>

      <Section
        title="Exemplos reais de CRM"
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

      <Section title="Uso & API" description="Primitivos para controle total; CRMBreadcrumb para o caminho rápido.">
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

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>BreadcrumbLink</code> — <code>href</code>, <code>asChild</code> (p/ Next Link)</li>
                <li><code>BreadcrumbPage</code> — item atual (<code>aria-current</code>)</li>
                <li><code>BreadcrumbSeparator</code> — chevron custom via children</li>
                <li><code>CRMBreadcrumb</code> — <code>items</code>, <code>maxItems</code> (colapso)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>nav aria-label=&quot;breadcrumb&quot;</code> + lista ordenada</li>
                <li>Página atual com <code>aria-current=&quot;page&quot;</code></li>
                <li>Separadores/elipse <code>aria-hidden</code></li>
                <li><kbd className="rounded bg-muted px-1">Tab</kbd> percorre os links; foco com ring visível</li>
                <li>Elipse-dropdown: <kbd className="rounded bg-muted px-1">Enter</kbd> abre, setas navegam</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Reflita a hierarquia real de navegação da página.</li>
                <li>Deixe o item atual como <code>BreadcrumbPage</code> (não-link).</li>
                <li>Colapse trilhas longas com <code>maxItems</code>.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não use como menu de navegação principal.</li>
                <li>Não torne o item atual um link.</li>
                <li>Não exceda ~4–5 níveis sem colapsar.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
