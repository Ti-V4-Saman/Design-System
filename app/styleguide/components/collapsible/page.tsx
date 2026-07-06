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
    <StyleguidePage>
      <ComponentHeader
        title="Collapsible"
        description={
          <>
            Alterna a visibilidade de um bloco com animação de altura, sobre o primitivo Radix
            Collapsible. Ideal para &quot;mostrar mais/menos&quot;, painéis de filtro e linhas
            expansíveis. Estilo 100% via tokens do CRM V4.
          </>
        }
      />

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
        title="Estados — painel de filtros (controlado)"
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
        title="Composição — mostrar todos (lista)"
        description="Exibe os primeiros itens e colapsa o restante — comum em listas de contatos/atividades."
      >
        <Demo>
          <ShowAllContacts />
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>O gatilho expõe <code className="font-mono text-xs">aria-expanded</code> e <code className="font-mono text-xs">aria-controls</code> apontando para o corpo (Radix).</>,
          <><Kbd>Enter</Kbd> / <Kbd>Espaço</Kbd> alternam a abertura no gatilho focado.</>,
          <>Foco visível com ring; respeita a prop <code className="font-mono text-xs">disabled</code>.</>,
        ]}
      />

      <DarkModeSection description="O mesmo bloco colapsável nos dois temas — superfície, borda e foco via tokens.">
        <Collapsible defaultOpen className="w-full max-w-md space-y-2">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">Notas do deal</p>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="group">
                Ver mais
                <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <p className="text-sm text-muted-foreground">
              Próximo passo: enviar proposta revisada até sexta.
            </p>
          </CollapsibleContent>
        </Collapsible>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "Collapsible", type: "open, onOpenChange", description: "Estado controlado da abertura." },
            { prop: "Collapsible.defaultOpen", type: "boolean", default: "false", description: "Estado inicial no modo não-controlado." },
            { prop: "Collapsible.disabled", type: "boolean", default: "false", description: "Desabilita o gatilho." },
            { prop: "CollapsibleTrigger", type: "asChild", description: "Renderiza o filho como gatilho (ex.: um Button)." },
            { prop: "CollapsibleContent", type: "children", description: "Corpo com animação de altura." },
          ],
        ]}
      />

      <Section title="Código" description="Três primitivos; estilize o gatilho no call site.">
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
      </Section>

      <GuidelinesSection
        dos={[
          "Use para conteúdo opcional/secundário (mostrar mais).",
          "Deixe claro o que expande (rótulo + chevron).",
        ]}
        donts={[
          "Não use para grupos de seções — prefira o Accordion.",
          "Não esconda conteúdo essencial atrás do gatilho.",
        ]}
      />
    </StyleguidePage>
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
