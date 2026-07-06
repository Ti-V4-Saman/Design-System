"use client"

import * as React from "react"
import { RefreshCw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Spinner, SpinnerOverlay } from "@/components/ui/spinner"
import {
  ApiTable,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
  type ApiRow,
} from "@/app/styleguide/_components"

/* ---------- page-local presentation helpers ---------- */

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  )
}

/* ---------- interactive demos ---------- */

function OverlayDemo() {
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  const run = () => {
    setLoading(true)
    timer.current = setTimeout(() => setLoading(false), 1800)
  }
  return (
    <div className="space-y-3">
      <Button size="sm" variant="outline" onClick={run}>
        <RefreshCw data-icon="inline-start" />
        Recarregar tabela
      </Button>
      <div className="relative overflow-hidden rounded-lg border border-border">
        <SpinnerOverlay show={loading} label="Carregando leads…" />
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Estágio</th>
              <th className="px-4 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Halvorson Inc", "Negociação", "$12,500"],
              ["Hauck Ltd", "Qualificado", "$4,000"],
              ["Koss e Bernier", "Novo", "$980"],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{r[0]}</td>
                <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                <td className="px-4 py-3 text-right tabular-nums">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ButtonLoadingDemo() {
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  const run = () => {
    setLoading(true)
    timer.current = setTimeout(() => setLoading(false), 1500)
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading={loading} onClick={run}>
        {loading ? "Salvando…" : "Salvar"}
      </Button>
      <Button variant="outline" onClick={run} disabled={loading}>
        {loading ? (
          <>
            <Spinner size="sm" className="mr-2" />
            Sincronizando…
          </>
        ) : (
          "Sincronizar"
        )}
      </Button>
    </div>
  )
}

/* ---------- docs data ---------- */

const SPINNER_PROPS: ApiRow[] = [
  { prop: "variant", type: `"ring" | "icon" | "dots"`, default: `"ring"`, description: "Aparência: anel CSS (padrão), ícone Loader2 (igual ao Button) ou pontos." },
  { prop: "size", type: `"xs" | "sm" | "default" | "lg" | "xl"`, default: `"default"`, description: "Tamanho do indicador." },
  { prop: "tone", type: `"current" | "muted" | "primary" | "destructive" | "success"`, default: `"current"`, description: "Cor semântica. current herda a cor do texto do contexto." },
  { prop: "label", type: "string", default: `"Carregando"`, description: "Rótulo para leitores de tela (sr-only por padrão)." },
  { prop: "showLabel", type: "boolean", default: "false", description: "Exibe o label como texto visível ao lado." },
]

const OVERLAY_PROPS: ApiRow[] = [
  { prop: "show", type: "boolean", default: "true", description: "Liga/desliga o overlay (não renderiza quando false)." },
  { prop: "label", type: "ReactNode", default: "—", description: "Legenda abaixo do spinner." },
  { prop: "size / variant", type: "SpinnerProps", default: `"lg" · "ring"`, description: "Tamanho e estilo do spinner central." },
  { prop: "scrim", type: `"soft" | "solid" | "none"`, default: `"soft"`, description: "Opacidade do véu (bg-card/60 ou /80)." },
  { prop: "blur", type: "boolean", default: "false", description: "Aplica um leve backdrop-blur no conteúdo coberto." },
  { prop: "tone", type: "SpinnerProps['tone']", default: `"primary"`, description: "Cor do spinner central." },
]

/* ---------- page ---------- */

export default function SpinnerPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Spinner"
        description={
          <>
            Indicador de carregamento para ações e áreas do CRM. Três aparências (anel,
            ícone, pontos), cinco tamanhos e cores semânticas — sempre a partir dos tokens.
            Acompanha o <code className="font-mono text-sm">SpinnerOverlay</code> para cobrir
            uma área enquanto ela carrega. Para blocos de conteúdo, prefira o{" "}
            <code className="font-mono text-sm">Skeleton</code>.
          </>
        }
      >
        <Badge variant="secondary">Core · Feedback</Badge>
      </ComponentHeader>

      {/* Variants */}
      <Section
        title="Variantes"
        description="ring é o padrão enterprise (anel fino). icon usa o mesmo Loader2 do Button. dots é discreto para uso inline."
      >
        <Demo>
          <Row>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="ring" size="lg" />
              <span className="text-xs text-muted-foreground">ring</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="icon" size="lg" />
              <span className="text-xs text-muted-foreground">icon</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner variant="dots" size="lg" />
              <span className="text-xs text-muted-foreground">dots</span>
            </div>
          </Row>
        </Demo>
      </Section>

      {/* Sizes */}
      <Section title="Tamanhos" description="xs e sm para contextos inline (botões, células); lg/xl para áreas e overlays.">
        <Demo>
          <Row>
            {(["xs", "sm", "default", "lg", "xl"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Spinner size={s} tone="primary" />
                <span className="text-xs text-muted-foreground">{s}</span>
              </div>
            ))}
          </Row>
        </Demo>
      </Section>

      {/* Tones */}
      <Section
        title="Cores (tone)"
        description="current herda a cor do texto do contexto; os demais fixam um token semântico. Nunca use cor hardcoded."
      >
        <Demo className="space-y-5">
          <Row label="Tokens semânticos">
            {(["current", "muted", "primary", "destructive", "success"] as const).map((t) => (
              <div key={t} className="flex flex-col items-center gap-2">
                <Spinner tone={t} size="lg" />
                <span className="text-xs text-muted-foreground">{t}</span>
              </div>
            ))}
          </Row>
          <Row label="tone=current herda a cor do texto">
            <span className="flex items-center gap-2 text-primary">
              <Spinner tone="current" size="sm" /> texto primary
            </span>
            <span className="flex items-center gap-2 text-destructive">
              <Spinner tone="current" size="sm" /> texto destructive
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <Spinner tone="current" size="sm" /> texto muted
            </span>
          </Row>
        </Demo>
      </Section>

      {/* With label */}
      <Section title="Com rótulo" description="showLabel exibe o texto ao lado; sem ele, o label vira sr-only para acessibilidade.">
        <Demo>
          <Row>
            <Spinner showLabel label="Carregando…" tone="primary" />
            <Spinner showLabel label="Sincronizando contatos…" size="sm" />
          </Row>
        </Demo>
      </Section>

      {/* States / usage in button */}
      <Section
        title="Em botões"
        description="O Button já tem loading embutido (variant icon = Loader2). Use o Spinner diretamente quando compor o conteúdo do botão manualmente."
      >
        <Demo>
          <ButtonLoadingDemo />
        </Demo>
        <CodeBlock>{`// Button com loading embutido (recomendado)
<Button loading={saving}>Salvar</Button>

// composição manual
<Button variant="outline" disabled={syncing}>
  <Spinner size="sm" className="mr-2" />
  Sincronizando…
</Button>`}</CodeBlock>
      </Section>

      {/* Overlay */}
      <Section
        title="SpinnerOverlay — área carregando"
        description="Cobre o ancestral posicionado (relative) com um véu + spinner central, bloqueando a interação. Ideal para recarregar uma tabela, um card ou um painel."
      >
        <Demo>
          <OverlayDemo />
        </Demo>
        <CodeBlock>{`<div className="relative">
  <SpinnerOverlay show={loading} label="Carregando leads…" />
  <table>{/* … */}</table>
</div>`}</CodeBlock>
      </Section>

      {/* Full-area / empty loading */}
      <Section
        title="Bloco centralizado"
        description="Para o primeiro carregamento de uma área vazia (sem conteúdo por baixo), centralize um spinner com legenda."
      >
        <Demo>
          <div className="flex min-h-40 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border">
            <Spinner size="xl" tone="primary" />
            <p className="text-sm text-muted-foreground">Carregando dashboard…</p>
          </div>
        </Demo>
      </Section>

      {/* Light / Dark */}
      <Section
        title="Light / Dark"
        description="Cores via tokens com pares -foreground; contraste garantido nos dois temas. Painel direito forçado em dark."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <p className="mb-4 text-xs font-medium text-muted-foreground">Light</p>
            <ThemePreview />
          </div>
          <div className="dark rounded-xl border border-border bg-card p-6 text-card-foreground">
            <p className="mb-4 text-xs font-medium text-muted-foreground">Dark</p>
            <ThemePreview />
          </div>
        </div>
      </Section>

      {/* Real examples */}
      <Section title="Exemplos reais" description="Padrões recorrentes de carregamento no CRM.">
        <div className="grid gap-4 md:grid-cols-2">
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Linha salvando (inline)</p>
            <div className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm">
              <span className="font-medium">Adrain Ondricka</span>
              <span className="flex items-center gap-2 text-muted-foreground">
                <Spinner size="xs" /> salvando
              </span>
            </div>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Botão de importação</p>
            <Button variant="outline" disabled>
              <Spinner size="sm" className="mr-2" />
              Importando 240 contatos…
            </Button>
          </Demo>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="O spinner é intrínseco (tamanho fixo por size) e não depende de largura. O SpinnerOverlay preenche o contêiner em qualquer viewport."
      >
        <Demo className="mx-auto max-w-xs">
          <div className="relative min-h-32 rounded-lg border border-border">
            <SpinnerOverlay label="Carregando…" />
          </div>
        </Demo>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do básico à composição.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Básico</p>
            <CodeBlock>{`import { Spinner } from "@/components/ui/spinner"

<Spinner />                          // ring, default, currentColor
<Spinner variant="icon" size="sm" /> // Loader2
<Spinner tone="primary" size="lg" showLabel label="Carregando…" />`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Overlay</p>
            <CodeBlock>{`import { SpinnerOverlay } from "@/components/ui/spinner"

<div className="relative">
  <SpinnerOverlay show={loading} label="Carregando…" blur />
  {/* conteúdo coberto */}
</div>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="Spinner e SpinnerOverlay.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Spinner</h3>
            <ApiTable rows={SPINNER_PROPS} />
            <p className="text-xs text-muted-foreground">Estende span; role=&apos;status&apos; e um label sr-only são sempre aplicados.</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">SpinnerOverlay</h3>
            <ApiTable rows={OVERLAY_PROPS} />
            <p className="text-xs text-muted-foreground">Requer um ancestral com position: relative.</p>
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <GuidelinesSection
        dos={[
          "Use spinner para ações rápidas e indeterminadas (salvar, sincronizar, recarregar).",
          "Prefira o loading embutido do Button; use Spinner solto só em composição manual.",
          "Use SpinnerOverlay para recarregar uma área que já tem conteúdo.",
          "Deixe tone=current quando o spinner acompanha um texto colorido.",
          "Mantenha um label (mesmo sr-only) para leitores de tela.",
        ]}
        donts={[
          "Spinner para o primeiro carregamento de listas/cards — prefira Skeleton.",
          "Vários spinners na mesma tela ao mesmo tempo; centralize em um overlay.",
          "Spinner sem bloquear a ação que o disparou (evite duplo clique).",
          "Cor hardcoded — use tone (tokens semânticos).",
          "Overlay sem ancestral relative (vai cobrir a página toda).",
        ]}
      />

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Garantias do componente.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">role=&quot;status&quot;:</span>{" "}
              o spinner é anunciado como uma região de status por leitores de tela.
            </li>
            <li>
              <span className="font-medium text-foreground">Rótulo:</span>{" "}
              <code className="font-mono text-xs">label</code> vira texto{" "}
              <code className="font-mono text-xs">sr-only</code> (ou visível com{" "}
              <code className="font-mono text-xs">showLabel</code>).
            </li>
            <li>
              <span className="font-medium text-foreground">Ícones ocultos:</span>{" "}
              os elementos gráficos são <code className="font-mono text-xs">aria-hidden</code> — só o label é lido.
            </li>
            <li>
              <span className="font-medium text-foreground">Movimento:</span>{" "}
              a animação respeita as preferências do sistema via utilitários do Tailwind
              (<code className="font-mono text-xs">motion-reduce</code> pode ser aplicado quando necessário).
            </li>
          </ul>
        </div>
      </Section>
    </StyleguidePage>
  )
}

/** Shared preview so light/dark panels are identical. */
function ThemePreview() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-6">
        <Spinner variant="ring" size="lg" tone="primary" />
        <Spinner variant="icon" size="lg" tone="primary" />
        <Spinner variant="dots" size="lg" tone="primary" />
      </div>
      <Spinner showLabel label="Carregando…" tone="primary" />
      <div className="relative h-20 rounded-lg border border-border">
        <SpinnerOverlay label="Carregando…" size="default" />
      </div>
    </div>
  )
}
