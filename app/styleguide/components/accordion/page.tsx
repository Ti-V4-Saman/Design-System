"use client"

import * as React from "react"
import { Bell, FileText, Lock, Users } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

const FAQ = [
  {
    q: "Como funciona a cobrança do plano Enterprise?",
    a: "A cobrança é mensal ou anual, por assento ativo. O faturamento consolida todos os workspaces da organização em uma única fatura.",
  },
  {
    q: "Posso migrar dados de outro CRM?",
    a: "Sim. Oferecemos importação via CSV e conectores nativos. A equipe de onboarding acompanha a migração de contatos, deals e atividades.",
  },
  {
    q: "Quais integrações estão disponíveis?",
    a: "E-mail, calendário, WhatsApp Business, e webhooks para qualquer ferramenta via API. Integrações nativas com as principais plataformas de marketing.",
  },
]

/* ---------- page ---------- */

export default function AccordionPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Accordion</h1>
        <p className="max-w-2xl text-muted-foreground">
          Seções colapsáveis sobre o primitivo Radix Accordion (teclado, aria, animação de altura).
          Duas variantes — lista dividida (<code>default</code>) e cartões (<code>card</code>) —
          todas via tokens do CRM V4. Alterne o tema para ver em dark mode.
        </p>
      </header>

      <Section
        title="Variante default"
        description="Lista com divisórias. type=single collapsible permite fechar o item aberto."
      >
        <Demo>
          <Accordion type="single" collapsible defaultValue="faq-0">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      </Section>

      <Section
        title="Variante card"
        description="Cada item é uma superfície própria (bg-card + shadow-card). Ótimo para agrupar seções de um painel."
      >
        <Demo>
          <Accordion type="single" collapsible className="w-full">
            {[
              { icon: FileText, title: "Informações do deal", body: "Renovação Enterprise · R$ 148.000 · Estágio Proposta · Fechamento previsto para 30 dias." },
              { icon: Users, title: "Contatos envolvidos", body: "Ana Souza (decisora), Bruno Lima (financeiro) e Carla Dias (TI)." },
              { icon: Bell, title: "Próximas atividades", body: "Reunião de alinhamento (amanhã), envio da proposta revisada (sex.)." },
            ].map((s, i) => (
              <AccordionItem key={i} value={`card-${i}`} variant="card">
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <s.icon className="size-4 text-muted-foreground" />
                    {s.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>{s.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
      </Section>

      <Section
        title="Single vs. Multiple"
        description="type=single abre um item por vez; type=multiple permite vários abertos simultaneamente."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">single (collapsible)</p>
            <Accordion type="single" collapsible>
              {["Prospecção", "Qualificação", "Proposta"].map((s, i) => (
                <AccordionItem key={i} value={`s-${i}`}>
                  <AccordionTrigger>{s}</AccordionTrigger>
                  <AccordionContent>Detalhes do estágio {s.toLowerCase()}.</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">multiple (defaultValue expandido)</p>
            <Accordion type="multiple" defaultValue={["m-0", "m-1"]}>
              {["Filtros ativos", "Colunas", "Ordenação"].map((s, i) => (
                <AccordionItem key={i} value={`m-${i}`}>
                  <AccordionTrigger>{s}</AccordionTrigger>
                  <AccordionContent>Configuração de {s.toLowerCase()}.</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Demo>
        </div>
      </Section>

      <Section
        title="Estados"
        description="Item desabilitado não abre e fica esmaecido (data-disabled)."
      >
        <Demo>
          <Accordion type="single" collapsible>
            <AccordionItem value="ok">
              <AccordionTrigger>Item habilitado</AccordionTrigger>
              <AccordionContent>Conteúdo acessível normalmente.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="disabled" disabled>
              <AccordionTrigger>Item desabilitado</AccordionTrigger>
              <AccordionContent>Este conteúdo não pode ser aberto.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Demo>
      </Section>

      <Section
        title="Exemplo real — Central de ajuda (FAQ)"
        description="Composição típica de CRM: FAQ com item de segurança destacado por ícone."
      >
        <Demo>
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((item, i) => (
              <AccordionItem key={i} value={`help-${i}`}>
                <AccordionTrigger>{item.q}</AccordionTrigger>
                <AccordionContent>{item.a}</AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="help-sec">
              <AccordionTrigger>
                <span className="flex items-center gap-2">
                  <Lock className="size-4 text-muted-foreground" />
                  Como meus dados são protegidos?
                </span>
              </AccordionTrigger>
              <AccordionContent>
                Criptografia em trânsito e em repouso, backups diários e conformidade com a LGPD.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Demo>
      </Section>

      <Section title="Uso & API" description="Composição declarativa; a variante fica no AccordionItem.">
        <div className="space-y-4">
          <CodeBlock>{`import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"

<Accordion type="single" collapsible defaultValue="a">
  <AccordionItem value="a">                {/* variant="card" p/ cartões */}
    <AccordionTrigger>Título</AccordionTrigger>
    <AccordionContent>Conteúdo rolável e animado.</AccordionContent>
  </AccordionItem>
</Accordion>

// múltiplos abertos:
<Accordion type="multiple" defaultValue={["a", "b"]}> … </Accordion>`}</CodeBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>Accordion</code> — <code>type</code> (single · multiple), <code>collapsible</code>, <code>defaultValue</code> / <code>value</code></li>
                <li><code>AccordionItem</code> — <code>value</code> (obrigatório), <code>variant</code> (default · card), <code>disabled</code></li>
                <li><code>AccordionTrigger</code> — rótulo clicável (chevron automático)</li>
                <li><code>AccordionContent</code> — corpo animado</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><kbd className="rounded bg-muted px-1">Tab</kbd> navega entre gatilhos</li>
                <li><kbd className="rounded bg-muted px-1">↑</kbd> <kbd className="rounded bg-muted px-1">↓</kbd> movem entre itens</li>
                <li><kbd className="rounded bg-muted px-1">Enter</kbd> / <kbd className="rounded bg-muted px-1">Espaço</kbd> abrem/fecham</li>
                <li>Cabeçalho e região com aria do Radix</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use para agrupar conteúdo secundário / progressivo.</li>
                <li>Prefira <code>card</code> quando as seções são independentes.</li>
                <li>Mantenha os títulos curtos e escaneáveis.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não esconda ações críticas dentro de um item fechado.</li>
                <li>Não use para navegação principal (use Tabs/menu).</li>
                <li>Não aninhe accordions em muitos níveis.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
