"use client"

import * as React from "react"
import {
  ArrowUpRight,
  Building2,
  Calendar,
  Check,
  Eye,
  Globe,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

/* ---------- page-local presentation helpers (same as other showcases) ---------- */

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

function Demo({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={"rounded-xl border bg-card p-6 " + (className ?? "")}>
      {children}
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

function ApiTable({
  rows,
  caption,
}: {
  rows: Array<[string, string, string, string]>
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Prop</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Padrão</th>
            <th className="px-4 py-2 font-medium">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(([prop, type, def, desc]) => (
            <tr key={prop} className="align-top">
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-foreground">{prop}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{type}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{def}</code>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="px-4 py-2 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}

function GuidelineCard({
  tone,
  title,
  items,
}: {
  tone: "do" | "dont"
  title: string
  items: string[]
}) {
  const isDo = tone === "do"
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={
            "flex size-6 items-center justify-center rounded-full " +
            (isDo ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive")
          }
        >
          {isDo ? <Check className="size-3.5" /> : <X className="size-3.5" />}
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={
                "mt-1.5 size-1 shrink-0 rounded-full " +
                (isDo ? "bg-success" : "bg-destructive")
              }
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

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

const PRIMITIVE_PROPS: Array<[string, string, string, string]> = [
  ["openDelay", "number", "200", "Atraso (ms) para abrir ao passar o mouse."],
  ["closeDelay", "number", "150", "Atraso (ms) para fechar ao sair."],
  ["align", `"start" | "center" | "end"`, `"center"`, "Alinhamento do conteúdo em relação ao trigger."],
  ["sideOffset", "number", "8", "Distância (px) entre trigger e conteúdo."],
  ["...props", "Radix HoverCard.*", "—", "Todas as props dos primitivos Radix HoverCard."],
]

const PRESET_PROPS: Array<[string, string, string, string]> = [
  ["children", "ReactNode", "—", "O trigger — um único elemento focável (renderizado via asChild)."],
  ["name", "string", "—", "Nome exibido no cabeçalho (obrigatório)."],
  ["avatarSrc", "string", "—", "URL do avatar; usa iniciais como fallback."],
  ["fallback", "string", "iniciais", "Iniciais do avatar; derivadas de name se omitido."],
  ["status / stage", "{ label; variant }", "—", "Badge ao lado do nome (papel, tier, estágio)."],
  ["meta", "HoverMeta[]", "—", "Linhas com ícone + texto (e-mail, telefone, local…)."],
  ["stats", "HoverStat[]", "—", "Grade de métricas (Company). Até 3 por linha."],
  ["actions", "HoverAction[]", "—", "Botões de rodapé (href vira âncora)."],
  ["side / align", "posicionamento", `align "start"`, "Lado e alinhamento do conteúdo."],
]

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function HoverCardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Header */}
      <header className="space-y-3">
        <Badge variant="secondary">Core · Overlay</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Hover Card</h1>
        <p className="max-w-2xl text-muted-foreground">
          Prévia rica que aparece ao passar o mouse (ou focar pelo teclado) sobre um
          gatilho — um nome, um avatar, uma célula de tabela. Sobre o primitivo Radix{" "}
          <code className="font-mono text-sm">HoverCard</code>, com presets de CRM para{" "}
          <strong>pessoa</strong>, <strong>empresa</strong> e <strong>lead</strong>,
          todos derivados dos tokens do design system.
        </p>
      </header>

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
      <Section
        title="Light / Dark"
        description="A superfície usa os tokens popover + ring, com pares -foreground, garantindo contraste nos dois temas. Painel direito forçado em dark."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex justify-center rounded-xl border bg-card p-8">
            <StaticPersonCard />
          </div>
          <div className="dark flex justify-center rounded-xl border border-border bg-card p-8 text-card-foreground">
            <StaticPersonCard />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          Renderização estática do conteúdo para comparar os temas lado a lado.
        </p>
      </Section>

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
            <ApiTable
              rows={PRESET_PROPS}
              caption="Os três presets compartilham trigger, posicionamento e o formato de meta/actions; cada um adiciona seus campos (Company: stats/labels; Lead: value/owner/stage)."
            />
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <Section title="Boas práticas" description="Diretrizes de uso.">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Faça"
            items={[
              "Use para prévias complementares — informação útil, mas não essencial.",
              "Prefira gatilhos que já convidam interação (nomes-link, avatares).",
              "Mantenha o conteúdo enxuto: cabeçalho, poucos metadados e 1–2 ações.",
              "Use delays curtos em tabelas densas e mais longos em textos corridos.",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Evite"
            items={[
              "Colocar conteúdo essencial só no hover — não existe em touch/mobile.",
              "Usar como menu de ações de clique; para isso use Dropdown Menu ou Popover.",
              "Gatilhos não focáveis (texto puro): quebram o acesso por teclado.",
              "Excesso de informação — vira um segundo modal e perde a leveza.",
            ]}
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Garantias do primitivo Radix.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Mouse e teclado:</span>{" "}
              abre no hover e também no <code className="font-mono text-xs">focus</code> do
              gatilho (Tab), fechando no blur ou <code className="font-mono text-xs">Esc</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Somente complementar:</span>{" "}
              o conteúdo é ignorado por leitores de tela por padrão — nunca coloque
              informação crítica apenas aqui.
            </li>
            <li>
              <span className="font-medium text-foreground">Gatilho focável:</span>{" "}
              use um <code className="font-mono text-xs">button</code>/<code className="font-mono text-xs">a</code>{" "}
              (via <code className="font-mono text-xs">asChild</code>) para preservar a navegação por teclado.
            </li>
            <li>
              <span className="font-medium text-foreground">Sem foco preso:</span>{" "}
              diferente de um dialog, o hover card não captura o foco — é uma prévia, não um fluxo.
            </li>
          </ul>
        </div>
      </Section>
    </div>
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
