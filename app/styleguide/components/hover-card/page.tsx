"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Building2,
  Calendar,
  Eye,
  Globe,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  PersonHoverCard,
  CompanyHoverCard,
  LeadHoverCard,
} from "@/components/hover-card"
import {
  AccessibilitySection,
  ApiTable,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
  type ApiRow,
} from "@/app/styleguide/_components"

/* ---------- page-local presentation helpers ---------- */

/** Inline link-style trigger, matching the DataTable's CellLink. */
function TriggerLink({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="rounded-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      {children}
    </button>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Reusable example instances
 * -----------------------------------------------------------------------------------------------*/

function PersonExample({ children }: { children: React.ReactNode }) {
  return (
    <PersonHoverCard
      name="Adrain Ondricka"
      role="Bill and Account Collector · Ondricka LLC"
      presence="success"
      status={{ label: "Owner", variant: "primary" }}
      meta={[
        { icon: Mail, label: "adrain.ondricka@demo.com", href: "mailto:adrain.ondricka@demo.com" },
        { icon: Phone, label: "+1 (510) 925-0980" },
        { icon: MapPin, label: "Austin, TX" },
      ]}
      actions={[
        { label: "E-mail", icon: Mail, variant: "outline" },
        { label: "Perfil", icon: Eye, variant: "default" },
      ]}
    >
      {children}
    </PersonHoverCard>
  )
}

function CompanyExample({ children }: { children: React.ReactNode }) {
  return (
    <CompanyHoverCard
      name="Halvorson Inc"
      industry="Marketing & Advertising"
      status={{ label: "Gold", variant: "warning" }}
      labels={[
        { label: "Corporate", variant: "info" },
        { label: "VIP", variant: "primary" },
      ]}
      stats={[
        { label: "Projetos", value: 12 },
        { label: "Faturado", value: "$48k" },
        { label: "Em aberto", value: "$2.1k" },
      ]}
      meta={[
        { icon: Globe, label: "halvorson.com", href: "https://halvorson.com" },
        { icon: MapPin, label: "Chicago, IL" },
      ]}
      actions={[
        { label: "Abrir cliente", icon: ArrowUpRight, variant: "default" },
      ]}
    >
      {children}
    </CompanyHoverCard>
  )
}

function LeadExample({ children }: { children: React.ReactNode }) {
  return (
    <LeadHoverCard
      name="Schaefer, Bayer and Balistreri"
      contact="Shaylee Lockman"
      stage={{ label: "Negotiation", variant: "info" }}
      value="$12,500"
      owner={{ name: "Richard Gray" }}
      meta={[
        { icon: Calendar, label: "Criado em 03-07-2026" },
        { icon: TrendingUp, label: "Próximo passo: enviar proposta" },
      ]}
      actions={[
        { label: "Ligar", icon: Phone, variant: "outline" },
        { label: "Abrir", icon: ArrowUpRight, variant: "default" },
      ]}
    >
      {children}
    </LeadHoverCard>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Docs data
 * -----------------------------------------------------------------------------------------------*/

const PRIMITIVE_PROPS: ApiRow[] = [
  { prop: "openDelay", type: "number", default: "200", description: "Atraso (ms) para abrir ao passar o mouse." },
  { prop: "closeDelay", type: "number", default: "150", description: "Atraso (ms) para fechar ao sair." },
  { prop: "align", type: `"start" | "center" | "end"`, default: `"center"`, description: "Alinhamento do conteúdo em relação ao trigger." },
  { prop: "sideOffset", type: "number", default: "8", description: "Distância (px) entre trigger e conteúdo." },
  { prop: "...props", type: "Radix HoverCard.*", default: "—", description: "Todas as props dos primitivos Radix HoverCard." },
]

const PRESET_PROPS: ApiRow[] = [
  { prop: "children", type: "ReactNode", default: "—", description: "O trigger — um único elemento focável (renderizado via asChild)." },
  { prop: "name", type: "string", default: "—", description: "Nome exibido no cabeçalho (obrigatório)." },
  { prop: "avatarSrc", type: "string", default: "—", description: "URL do avatar; usa iniciais como fallback." },
  { prop: "fallback", type: "string", default: "iniciais", description: "Iniciais do avatar; derivadas de name se omitido." },
  { prop: "status / stage", type: "{ label; variant }", default: "—", description: "Badge ao lado do nome (papel, tier, estágio)." },
  { prop: "meta", type: "HoverMeta[]", default: "—", description: "Linhas com ícone + texto (e-mail, telefone, local…)." },
  { prop: "stats", type: "HoverStat[]", default: "—", description: "Grade de métricas (Company). Até 3 por linha." },
  { prop: "actions", type: "HoverAction[]", default: "—", description: "Botões de rodapé (href vira âncora)." },
  { prop: "side / align", type: "posicionamento", default: `align "start"`, description: "Lado e alinhamento do conteúdo." },
]

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function HoverCardPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Hover Card"
        description={
          <>
            Prévia rica que aparece ao passar o mouse (ou focar pelo teclado) sobre um
            gatilho — um nome, um avatar, uma célula de tabela. Sobre o primitivo Radix{" "}
            <code className="font-mono text-sm">HoverCard</code>, com presets de CRM para{" "}
            <strong>pessoa</strong>, <strong>empresa</strong> e <strong>lead</strong>,
            todos derivados dos tokens do design system.
          </>
        }
      />

      {/* Presets */}
      <Section
        title="Presets de CRM"
        description="Três composições prontas e orientadas a dados. Passe o mouse sobre cada nome para ver a prévia."
      >
        <Demo className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <span className="text-sm text-muted-foreground">
            Contato:{" "}
            <PersonExample>
              <TriggerLink>Adrain Ondricka</TriggerLink>
            </PersonExample>
          </span>
          <span className="text-sm text-muted-foreground">
            Cliente:{" "}
            <CompanyExample>
              <TriggerLink>Halvorson Inc</TriggerLink>
            </CompanyExample>
          </span>
          <span className="text-sm text-muted-foreground">
            Lead:{" "}
            <LeadExample>
              <TriggerLink>Schaefer, Bayer and Balistreri</TriggerLink>
            </LeadExample>
          </span>
        </Demo>
      </Section>

      {/* Base primitive */}
      <Section
        title="Primitivo base"
        description="Para conteúdo livre, use os primitivos diretamente. A superfície flutuante (sombra, ring, animação) já vem pronta; você controla o interior."
      >
        <Demo>
          <p className="text-sm text-muted-foreground">
            O CRM sincroniza com{" "}
            <HoverCard>
              <HoverCardTrigger asChild>
                <TriggerLink>HubSpot</TriggerLink>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Building2 className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">HubSpot</p>
                    <p className="text-xs text-muted-foreground">
                      Integração ativa · sincroniza contatos e negócios
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>{" "}
            e importa negócios automaticamente.
          </p>
        </Demo>
        <CodeBlock>{`import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

<HoverCard>
  <HoverCardTrigger asChild>
    <button className="text-primary hover:underline">HubSpot</button>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    {/* qualquer conteúdo */}
  </HoverCardContent>
</HoverCard>`}</CodeBlock>
      </Section>

      {/* Positioning */}
      <Section
        title="Posicionamento"
        description="side define o lado (top / right / bottom / left) e align o alinhamento. O conteúdo reposiciona automaticamente para caber na viewport (collision-aware)."
      >
        <Demo className="flex flex-wrap items-center justify-center gap-4">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <PersonHoverCard
              key={side}
              name="Emily Smith"
              role="Account Manager"
              side={side}
              align="center"
              presence="success"
              meta={[{ icon: Mail, label: "emily.smith@demo.com" }]}
            >
              <button
                type="button"
                className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                side=&quot;{side}&quot;
              </button>
            </PersonHoverCard>
          ))}
        </Demo>
      </Section>

      {/* Delays */}
      <Section
        title="Tempo de abertura"
        description="openDelay e closeDelay ajustam a sensação. Use valores curtos para prévias frequentes (tabelas) e mais longos para não abrir sem intenção."
      >
        <Demo className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <PersonHoverCard
            name="Adrain Ondricka"
            role="Bill and Account Collector"
            openDelay={0}
            closeDelay={100}
            meta={[{ icon: Mail, label: "adrain.ondricka@demo.com" }]}
          >
            <TriggerLink>rápido (0ms)</TriggerLink>
          </PersonHoverCard>
          <PersonHoverCard
            name="Adrain Ondricka"
            role="Bill and Account Collector"
            meta={[{ icon: Mail, label: "adrain.ondricka@demo.com" }]}
          >
            <TriggerLink>padrão (200ms)</TriggerLink>
          </PersonHoverCard>
          <PersonHoverCard
            name="Adrain Ondricka"
            role="Bill and Account Collector"
            openDelay={600}
            meta={[{ icon: Mail, label: "adrain.ondricka@demo.com" }]}
          >
            <TriggerLink>deliberado (600ms)</TriggerLink>
          </PersonHoverCard>
        </Demo>
      </Section>

      {/* Real example: table */}
      <Section
        title="Exemplo real — nomes em tabela"
        description="O uso mais comum: enriquecer nomes de uma tabela. Passe o mouse sobre qualquer cliente ou contato para uma prévia sem sair da lista."
      >
        <Demo className="p-0">
          <div className="overflow-hidden rounded-xl">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Cliente</th>
                  <th className="px-4 py-3 text-left">Contato</th>
                  <th className="px-4 py-3 text-right">Em aberto</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { company: "Halvorson Inc", contact: "Adrain Ondricka", due: "$2,100.00" },
                  { company: "Hauck Ltd", contact: "Emily Smith", due: "$0.00" },
                  { company: "Koss, Stracke and Bernier", contact: "Amira Connelly", due: "$166.00" },
                ].map((row) => (
                  <tr key={row.company} className="border-b border-border last:border-0">
                    <td className="px-4 py-3">
                      <CompanyExample>
                        <TriggerLink>{row.company}</TriggerLink>
                      </CompanyExample>
                    </td>
                    <td className="px-4 py-3">
                      <PersonHoverCard
                        name={row.contact}
                        role="Primary contact"
                        presence="success"
                        meta={[
                          { icon: Mail, label: `${row.contact.split(" ")[0].toLowerCase()}@demo.com` },
                          { icon: Phone, label: "+1 (510) 925-0980" },
                        ]}
                        actions={[{ label: "Perfil", icon: Eye, variant: "outline" }]}
                      >
                        <span className="inline-flex items-center gap-2">
                          <Avatar size="sm">
                            <AvatarFallback className="bg-muted text-[10px] text-muted-foreground">
                              {row.contact.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <TriggerLink>{row.contact}</TriggerLink>
                        </span>
                      </PersonHoverCard>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-foreground">{row.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Demo>
      </Section>

      {/* Composition: avatar trigger */}
      <Section
        title="Composição"
        description="Qualquer elemento focável serve de gatilho: um avatar, um badge, um trecho de texto. Passe o mouse sobre o avatar abaixo."
      >
        <Demo className="flex items-center gap-4">
          <PersonExample>
            <button type="button" className="rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
              <Avatar size="lg">
                <AvatarFallback className="bg-primary/10 font-semibold text-primary">AO</AvatarFallback>
              </Avatar>
            </button>
          </PersonExample>
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Adrain Ondricka</p>
            <p>Passe o mouse sobre o avatar</p>
          </div>
        </Demo>
      </Section>

      {/* Light / Dark */}
      <DarkModeSection description="A superfície usa os tokens popover + ring, com pares -foreground, garantindo contraste nos dois temas.">
        <StaticPersonCard />
      </DarkModeSection>

      {/* Code */}
      <Section title="Código" description="Do primitivo ao preset completo.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">PersonHoverCard</p>
            <CodeBlock>{`import { PersonHoverCard } from "@/components/hover-card"
import { Mail, Phone, Eye } from "lucide-react"

<PersonHoverCard
  name="Adrain Ondricka"
  role="Bill and Account Collector"
  presence="success"
  status={{ label: "Owner", variant: "primary" }}
  meta={[
    { icon: Mail, label: "adrain@demo.com", href: "mailto:adrain@demo.com" },
    { icon: Phone, label: "+1 (510) 925-0980" },
  ]}
  actions={[{ label: "Perfil", icon: Eye, variant: "default" }]}
>
  <button className="text-primary hover:underline">Adrain Ondricka</button>
</PersonHoverCard>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">CompanyHoverCard</p>
            <CodeBlock>{`import { CompanyHoverCard } from "@/components/hover-card"

<CompanyHoverCard
  name="Halvorson Inc"
  industry="Marketing & Advertising"
  status={{ label: "Gold", variant: "warning" }}
  labels={[{ label: "Corporate", variant: "info" }]}
  stats={[
    { label: "Projetos", value: 12 },
    { label: "Faturado", value: "$48k" },
    { label: "Em aberto", value: "$2.1k" },
  ]}
  actions={[{ label: "Abrir cliente", variant: "default" }]}
>
  <CellLink value="Halvorson Inc" />
</CompanyHoverCard>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="Primitivos e presets de CRM.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">HoverCard / HoverCardContent</h3>
            <ApiTable rows={PRIMITIVE_PROPS} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">
              PersonHoverCard · CompanyHoverCard · LeadHoverCard
            </h3>
            <ApiTable rows={PRESET_PROPS} />
            <p className="text-xs text-muted-foreground">
              Os três presets compartilham trigger, posicionamento e o formato de meta/actions; cada um adiciona seus campos (Company: stats/labels; Lead: value/owner/stage).
            </p>
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <GuidelinesSection
        dos={[
          "Use para prévias complementares — informação útil, mas não essencial.",
          "Prefira gatilhos que já convidam interação (nomes-link, avatares).",
          "Mantenha o conteúdo enxuto: cabeçalho, poucos metadados e 1–2 ações.",
          "Use delays curtos em tabelas densas e mais longos em textos corridos.",
        ]}
        donts={[
          "Colocar conteúdo essencial só no hover — não existe em touch/mobile.",
          "Usar como menu de ações de clique; para isso use Dropdown Menu ou Popover.",
          "Gatilhos não focáveis (texto puro): quebram o acesso por teclado.",
          "Excesso de informação — vira um segundo modal e perde a leveza.",
        ]}
      />

      {/* Accessibility */}
      <AccessibilitySection
        items={[
          <>
            <span className="font-medium text-foreground">Mouse e teclado:</span>{" "}
            abre no hover e também no <code className="font-mono text-xs">focus</code> do
            gatilho (Tab), fechando no blur ou <code className="font-mono text-xs">Esc</code>.
          </>,
          <>
            <span className="font-medium text-foreground">Somente complementar:</span>{" "}
            o conteúdo é ignorado por leitores de tela por padrão — nunca coloque
            informação crítica apenas aqui.
          </>,
          <>
            <span className="font-medium text-foreground">Gatilho focável:</span>{" "}
            use um <code className="font-mono text-xs">button</code>/<code className="font-mono text-xs">a</code>{" "}
            (via <code className="font-mono text-xs">asChild</code>) para preservar a navegação por teclado.
          </>,
          <>
            <span className="font-medium text-foreground">Sem foco preso:</span>{" "}
            diferente de um dialog, o hover card não captura o foco — é uma prévia, não um fluxo.
          </>,
        ]}
      />
    </StyleguidePage>
  )
}

/** Static rendering of the person card content, for the light/dark comparison. */
function StaticPersonCard() {
  return (
    <div className="w-80 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[var(--shadow-dropdown)]">
      <div className="flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <Avatar size="lg">
            <AvatarFallback className="bg-primary/10 font-semibold text-primary">AO</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-2">
              <p className="truncate font-semibold text-foreground">Adrain Ondricka</p>
              <span className="inline-flex shrink-0 items-center rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                Owner
              </span>
            </div>
            <p className="truncate text-xs text-muted-foreground">Bill and Account Collector</p>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Mail className="size-3.5 text-muted-foreground/70" />
            adrain.ondricka@demo.com
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Phone className="size-3.5 text-muted-foreground/70" />
            +1 (510) 925-0980
          </div>
        </div>
      </div>
    </div>
  )
}
