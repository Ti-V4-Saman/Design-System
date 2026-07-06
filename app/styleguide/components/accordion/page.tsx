"use client"

import * as React from "react"
import { Bell, FileText, Lock, Users } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
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
    <StyleguidePage>
      <ComponentHeader
        title="Accordion"
        description={
          <>
            Seções colapsáveis sobre o primitivo Radix Accordion (teclado, aria, animação de altura).
            Duas variantes — lista dividida (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">default</code>) e cartões (<code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">card</code>) —
            todas via tokens do CRM V4.
          </>
        }
      />

      <Section
        title="Variante default"
        description="Lista com divisórias. type=single collapsible permite fechar o item aberto."
      >
        <Demo>
          <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
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
          <Accordion type="single" collapsible className="w-full">
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
        title="Composição — Central de ajuda (FAQ)"
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

      <AccessibilitySection
        items={[
          <><Kbd>Tab</Kbd> navega entre gatilhos; <Kbd>↑</Kbd> <Kbd>↓</Kbd> movem entre itens.</>,
          <><Kbd>Enter</Kbd> / <Kbd>Espaço</Kbd> abrem/fecham o item focado.</>,
          <>Cada gatilho vive num cabeçalho e controla uma região com o aria correto (Radix).</>,
          <>Item <code className="font-mono text-xs">disabled</code> é ignorado pela navegação e não abre.</>,
        ]}
      />

      <DarkModeSection description="A mesma lista de accordion nos dois temas — divisórias, foco e texto via tokens.">
        <Accordion type="single" collapsible defaultValue="dm-0" className="w-full">
          {FAQ.slice(0, 2).map((item, i) => (
            <AccordionItem key={i} value={`dm-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "Accordion.type", type: '"single" | "multiple"', description: "Um item aberto por vez ou vários simultâneos." },
            { prop: "Accordion.collapsible", type: "boolean", default: "false", description: "Em single, permite fechar o item aberto." },
            { prop: "Accordion", type: "value, defaultValue, onValueChange", description: "Estado controlado ou não da abertura." },
          ],
          [
            { prop: "AccordionItem.value", type: "string", description: "Identificador do item (obrigatório)." },
            { prop: "AccordionItem.variant", type: '"default" | "card"', default: '"default"', description: "Lista dividida ou cartão com superfície própria." },
            { prop: "AccordionItem.disabled", type: "boolean", default: "false", description: "Impede abrir e esmaece o item." },
            { prop: "AccordionTrigger / AccordionContent", type: "children", description: "Rótulo clicável (chevron automático) e corpo animado." },
          ],
        ]}
      />

      <Section title="Código" description="Composição declarativa; a variante fica no AccordionItem.">
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
      </Section>

      <GuidelinesSection
        dos={[
          "Use para agrupar conteúdo secundário / progressivo.",
          "Prefira card quando as seções são independentes.",
          "Mantenha os títulos curtos e escaneáveis.",
        ]}
        donts={[
          "Não esconda ações críticas dentro de um item fechado.",
          "Não use para navegação principal (use Tabs/menu).",
          "Não aninhe accordions em muitos níveis.",
        ]}
      />
    </StyleguidePage>
  )
}
