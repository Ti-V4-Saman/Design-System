"use client"

import * as React from "react"
import { ChevronDown, ChevronsUpDown, Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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

const CONTACTS = [
  { name: "Ana Souza", role: "Head of Growth", initials: "AS" },
  { name: "Bruno Lima", role: "CFO", initials: "BL" },
  { name: "Carla Dias", role: "IT Manager", initials: "CD" },
  { name: "Diego Reis", role: "Procurement", initials: "DR" },
  { name: "Elisa Nunes", role: "Marketing", initials: "EN" },
]

/* ---------- page ---------- */

export default function CollapsiblePage() {
  const [filtersOpen, setFiltersOpen] = React.useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Collapsible</h1>
        <p className="max-w-2xl text-muted-foreground">
          Alterna a visibilidade de um bloco com animação de altura, sobre o primitivo Radix
          Collapsible. Ideal para &quot;mostrar mais/menos&quot;, painéis de filtro e linhas
          expansíveis. Estilo 100% via tokens do CRM V4.
        </p>
      </header>

      <Section
        title="Básico — mostrar mais/menos"
        description="Gatilho estilizado com Button (asChild); o chevron rotaciona conforme o estado."
      >
        <Demo>
          <Collapsible className="w-full max-w-md space-y-2">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-foreground">Notas do deal</p>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="group">
                  Ver mais
                  <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </CollapsibleTrigger>
            </div>
            <p className="text-sm text-muted-foreground">
              Reunião inicial realizada; cliente demonstrou interesse no plano Enterprise.
            </p>
            <CollapsibleContent className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Próximo passo: enviar proposta revisada até sexta. Decisão prevista para o fim do mês,
                envolvendo as áreas financeira e de TI.
              </p>
              <p className="text-sm text-muted-foreground">
                Orçamento aprovado pela diretoria; concorrente atual em fim de contrato.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </Demo>
      </Section>

      <Section
        title="Painel de filtros (controlado)"
        description="Estado controlado via open/onOpenChange — padrão de 'filtros avançados' em listas de CRM."
      >
        <Demo>
          <Collapsible
            open={filtersOpen}
            onOpenChange={setFiltersOpen}
            className="w-full max-w-lg rounded-lg border border-border"
          >
            <CollapsibleTrigger asChild>
              <button className="group flex w-full items-center justify-between gap-4 rounded-lg px-4 py-3 text-sm font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring">
                <span className="flex items-center gap-2">
                  <Filter className="size-4 text-muted-foreground" />
                  Filtros avançados
                </span>
                <span className="flex items-center gap-2">
                  <Badge variant="secondary">2 ativos</Badge>
                  <ChevronsUpDown className="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
                </span>
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid gap-3 border-t border-border p-4 sm:grid-cols-2">
                {["Estágio", "Responsável", "Valor mínimo", "Origem"].map((f) => (
                  <div key={f} className="space-y-1">
                    <p className="text-xs text-muted-foreground">{f}</p>
                    <div className="h-8 rounded-lg border border-input bg-transparent" />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Demo>
        <p className="text-sm text-muted-foreground">
          Estado atual: <strong className="text-foreground">{filtersOpen ? "aberto" : "fechado"}</strong>
        </p>
      </Section>

      <Section
        title="Mostrar todos (lista)"
        description="Exibe os primeiros itens e colapsa o restante — comum em listas de contatos/atividades."
      >
        <Demo>
          <ShowAllContacts />
        </Demo>
      </Section>

      <Section title="Uso & API" description="Três primitivos; estilize o gatilho no call site.">
        <div className="space-y-4">
          <CodeBlock>{`import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from "@/components/ui/collapsible"

<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" className="group">
      Ver mais <ChevronDown className="group-data-[state=open]:rotate-180" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>{/* conteúdo animado */}</CollapsibleContent>
</Collapsible>

// controlado:
<Collapsible open={open} onOpenChange={setOpen}> … </Collapsible>`}</CodeBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>Collapsible</code> — <code>open</code> / <code>onOpenChange</code>, <code>defaultOpen</code>, <code>disabled</code></li>
                <li><code>CollapsibleTrigger</code> — <code>asChild</code> p/ usar um Button</li>
                <li><code>CollapsibleContent</code> — corpo com animação de altura</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Gatilho com <code>aria-expanded</code> / <code>aria-controls</code> (Radix)</li>
                <li><kbd className="rounded bg-muted px-1">Enter</kbd> / <kbd className="rounded bg-muted px-1">Espaço</kbd> alternam</li>
                <li>Foco visível com ring; respeita <code>disabled</code></li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use para conteúdo opcional/secundário (mostrar mais).</li>
                <li>Deixe claro o que expande (rótulo + chevron).</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não use para grupos de seções — prefira o Accordion.</li>
                <li>Não esconda conteúdo essencial atrás do gatilho.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function ShowAllContacts() {
  const [open, setOpen] = React.useState(false)
  const visible = CONTACTS.slice(0, 2)
  const rest = CONTACTS.slice(2)

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-md">
      <div className="divide-y divide-border overflow-hidden rounded-lg border border-border">
        {visible.map((c) => (
          <ContactRow key={c.name} contact={c} />
        ))}
        <CollapsibleContent>
          {rest.map((c) => (
            <ContactRow key={c.name} contact={c} className="border-t border-border" />
          ))}
        </CollapsibleContent>
      </div>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" size="sm" className="group mt-2 w-full">
          {open ? "Mostrar menos" : `Mostrar todos (${CONTACTS.length})`}
          <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  )
}

function ContactRow({
  contact,
  className,
}: {
  contact: (typeof CONTACTS)[number]
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3 bg-card px-4 py-2.5", className)}>
      <Avatar className="size-8">
        <AvatarFallback>{contact.initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium text-foreground">{contact.name}</p>
        <p className="text-xs text-muted-foreground">{contact.role}</p>
      </div>
    </div>
  )
}
