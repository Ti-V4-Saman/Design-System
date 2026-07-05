"use client"

import * as React from "react"
import {
  AlertCircle,
  AtSign,
  Building2,
  Check,
  CheckCircle2,
  DollarSign,
  Globe,
  Hash,
  Link2,
  Mail,
  Search,
  Send,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  SearchInput,
  CurrencyInput,
  PasswordInput,
  CopyInput,
} from "@/components/input-group"

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

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
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
            <th className="px-4 py-2 font-medium">Nome</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Padrão</th>
            <th className="px-4 py-2 font-medium">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(([a, b, c, d]) => (
            <tr key={a} className="align-top">
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-foreground">{a}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{b}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{c}</code>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{d}</td>
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
          {isDo ? <Check className="size-3.5" /> : <AlertCircle className="size-3.5" />}
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

/* ---------- interactive demos ---------- */

function LoadingSearchDemo() {
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  const run = (v: string) => {
    if (!v) return
    setLoading(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setLoading(false), 1200)
  }
  return (
    <SearchInput
      loading={loading}
      placeholder="Digite para buscar…"
      onValueChange={run}
      className="max-w-sm"
      containerClassName="max-w-sm"
    />
  )
}

function EmailFieldDemo() {
  const [value, setValue] = React.useState("adrain.ondricka")
  const invalid = value.length > 0 && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
  return (
    <FieldGroup className="max-w-sm">
      <Field data-invalid={invalid || undefined}>
        <FieldLabel htmlFor="ig-email">E-mail do contato</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <AtSign aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            id="ig-email"
            type="email"
            value={value}
            aria-invalid={invalid}
            onChange={(e) => setValue(e.target.value)}
            placeholder="nome@empresa.com"
          />
          {!invalid && value.length > 0 && (
            <InputGroupAddon align="inline-end">
              <CheckCircle2 className="text-success" aria-hidden />
            </InputGroupAddon>
          )}
        </InputGroup>
        {invalid ? (
          <FieldError>Informe um e-mail válido (nome@empresa.com).</FieldError>
        ) : (
          <FieldDescription>Usado para notificações e follow-ups.</FieldDescription>
        )}
      </Field>
    </FieldGroup>
  )
}

/* ---------- docs data ---------- */

const PRIMITIVE_PARTS: Array<[string, string, string, string]> = [
  ["InputGroup", "div[role=group]", "—", "Contêiner; gerencia foco, hover e estado inválido do conjunto."],
  ["InputGroupInput", "input", "—", "Controle de texto sem borda (herda foco do grupo)."],
  ["InputGroupTextarea", "textarea", "—", "Variante multilinha (usa addons block-start/-end)."],
  ["InputGroupAddon", "div", `align "inline-start"`, "Slot de ícone/texto/botão. align: inline-start/-end, block-start/-end."],
  ["InputGroupButton", "button", `size "xs" · variant "ghost"`, "Botão compacto para ações inline (limpar, mostrar, copiar)."],
  ["InputGroupText", "span", "—", "Rótulo textual (prefixo/sufixo, ex.: $, %, USD)."],
]

const FAMILY_PROPS: Array<[string, string, string, string]> = [
  ["SearchInput", "value/onValueChange · loading · clearable · onClear", "clearable=true", "Busca com ícone, spinner e botão limpar."],
  ["CurrencyInput", "currency · code · ...input", `currency="$"`, "Símbolo de moeda + numérico alinhado à direita."],
  ["PasswordInput", "...input", "—", "Senha com alternância mostrar/ocultar."],
  ["CopyInput", "value · mono · onCopy", "mono=true", "Valor somente-leitura + botão copiar com feedback."],
]

/* ---------- page ---------- */

export default function InputGroupPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Header */}
      <header className="space-y-3">
        <Badge variant="secondary">Core · Formulários</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Input Group</h1>
        <p className="max-w-2xl text-muted-foreground">
          Agrupa um controle com ícones, prefixos, sufixos e botões inline dentro de
          uma única superfície — mesma altura, raio e tokens do{" "}
          <code className="font-mono text-sm">Input</code>. Inclui presets de CRM
          (busca, moeda, senha, copiar) e compõe com o{" "}
          <code className="font-mono text-sm">Field</code> para rótulo e validação.
        </p>
      </header>

      {/* Primitive composition */}
      <Section
        title="Anatomia"
        description="Componha InputGroupAddon (ícone/texto/botão) + InputGroupInput livremente. O grupo inteiro compartilha um único anel de foco."
      >
        <Demo className="grid max-w-xl gap-4">
          <Row label="Prefixo com ícone">
            <InputGroup>
              <InputGroupAddon>
                <Search aria-hidden />
              </InputGroupAddon>
              <InputGroupInput placeholder="Buscar clientes…" />
            </InputGroup>
          </Row>
          <Row label="Prefixo de texto (URL)">
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="acme.crm.com" />
            </InputGroup>
          </Row>
          <Row label="Sufixo de unidade">
            <InputGroup>
              <InputGroupInput placeholder="0" inputMode="numeric" className="text-right tabular-nums" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>%</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row label="Botão inline">
            <InputGroup>
              <InputGroupAddon>
                <Mail aria-hidden />
              </InputGroupAddon>
              <InputGroupInput type="email" placeholder="Convidar por e-mail…" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton variant="default" size="sm">
                  <Send />
                  Enviar
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row label="Textarea com addon block-end (contador)">
            <InputGroup>
              <InputGroupTextarea placeholder="Anotação da negociação…" rows={3} />
              <InputGroupAddon align="block-end" className="justify-between border-t">
                <InputGroupText className="text-xs">Markdown suportado</InputGroupText>
                <InputGroupText className="text-xs tabular-nums">0/280</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Row>
        </Demo>
      </Section>

      {/* CRM family */}
      <Section
        title="Família CRM"
        description="Presets prontos para os padrões mais comuns do CRM. Todos aceitam as props nativas de input."
      >
        <Demo className="grid max-w-xl gap-4">
          <Row label="SearchInput — ícone + limpar (digite para ver o ×)">
            <SearchInput defaultValue="Halvorson" placeholder="Buscar…" />
          </Row>
          <Row label="SearchInput — com spinner de carregamento">
            <LoadingSearchDemo />
          </Row>
          <Row label="CurrencyInput — símbolo + código">
            <CurrencyInput defaultValue="12500.00" code="USD" />
          </Row>
          <Row label="PasswordInput — mostrar/ocultar">
            <PasswordInput defaultValue="s3nha-secreta" autoComplete="off" />
          </Row>
          <Row label="CopyInput — valor somente-leitura + copiar">
            <CopyInput value="sk_live_a1b2c3d4e5f6g7h8i9j0" />
          </Row>
        </Demo>
      </Section>

      {/* Addon alignment */}
      <Section
        title="Alinhamento de addons"
        description="align posiciona o addon: inline (esquerda/direita, na mesma linha) ou block (topo/base, em linha própria — ideal para toolbars de textarea)."
      >
        <Demo className="grid max-w-xl gap-4">
          <Row label='inline-start · inline-end'>
            <InputGroup>
              <InputGroupAddon>
                <DollarSign aria-hidden />
              </InputGroupAddon>
              <InputGroupInput placeholder="0.00" className="text-right tabular-nums" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row label="block-start (barra acima)">
            <InputGroup>
              <InputGroupAddon align="block-start" className="border-b">
                <InputGroupText className="text-xs font-medium">Descrição</InputGroupText>
              </InputGroupAddon>
              <InputGroupTextarea placeholder="Detalhe a atividade…" rows={2} />
            </InputGroup>
          </Row>
        </Demo>
      </Section>

      {/* Sizes (button sizes inside) */}
      <Section
        title="Botões inline"
        description="InputGroupButton traz tamanhos compactos (xs, sm, icon-xs, icon-sm) que se encaixam na altura do grupo. Use ghost para ações discretas e default para a ação primária."
      >
        <Demo className="flex flex-col gap-4">
          <InputGroup className="max-w-sm">
            <InputGroupInput placeholder="Buscar e filtrar…" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Filtros">
                <Search />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup className="max-w-sm">
            <InputGroupAddon>
              <Globe aria-hidden />
            </InputGroupAddon>
            <InputGroupInput placeholder="dominio.com" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="sm" variant="outline">
                Verificar
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Demo>
      </Section>

      {/* States */}
      <Section
        title="Estados"
        description="O grupo reflete os estados do controle: foco, desabilitado, somente-leitura, erro (aria-invalid) e sucesso."
      >
        <Demo className="grid max-w-xl gap-4">
          <Row label="Default">
            <InputGroup>
              <InputGroupAddon><User aria-hidden /></InputGroupAddon>
              <InputGroupInput placeholder="Nome do responsável" />
            </InputGroup>
          </Row>
          <Row label="Disabled">
            <InputGroup>
              <InputGroupAddon><Building2 aria-hidden /></InputGroupAddon>
              <InputGroupInput placeholder="Empresa" disabled />
            </InputGroup>
          </Row>
          <Row label="Read-only">
            <InputGroup>
              <InputGroupAddon><Hash aria-hidden /></InputGroupAddon>
              <InputGroupInput readOnly value="LEAD-2048" />
            </InputGroup>
          </Row>
          <Row label="Error (aria-invalid)">
            <InputGroup>
              <InputGroupAddon><Mail aria-hidden /></InputGroupAddon>
              <InputGroupInput defaultValue="email-invalido" aria-invalid />
              <InputGroupAddon align="inline-end">
                <AlertCircle className="text-destructive" aria-hidden />
              </InputGroupAddon>
            </InputGroup>
          </Row>
          <Row label="Success">
            <InputGroup className="border-success has-[input:focus-visible]:border-success has-[input:focus-visible]:ring-success/20">
              <InputGroupAddon><Mail aria-hidden /></InputGroupAddon>
              <InputGroupInput defaultValue="adrain@demo.com" />
              <InputGroupAddon align="inline-end">
                <CheckCircle2 className="text-success" aria-hidden />
              </InputGroupAddon>
            </InputGroup>
          </Row>
        </Demo>
      </Section>

      {/* Validation with Field */}
      <Section
        title="Validação (composição com Field)"
        description="Envolva o InputGroup em um Field para rótulo, descrição e mensagem de erro acessível. Digite um e-mail inválido para ver o estado de erro."
      >
        <Demo>
          <EmailFieldDemo />
        </Demo>
        <CodeBlock>{`<Field data-invalid={invalid || undefined}>
  <FieldLabel htmlFor="email">E-mail do contato</FieldLabel>
  <InputGroup>
    <InputGroupAddon><AtSign /></InputGroupAddon>
    <InputGroupInput id="email" aria-invalid={invalid} … />
  </InputGroup>
  {invalid
    ? <FieldError>Informe um e-mail válido.</FieldError>
    : <FieldDescription>Usado para follow-ups.</FieldDescription>}
</Field>`}</CodeBlock>
      </Section>

      {/* Light / Dark */}
      <Section
        title="Light / Dark"
        description="Bordas, foco e addons usam tokens com pares -foreground; contraste garantido nos dois temas. Painel direito forçado em dark."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border bg-card p-6">
            <p className="text-xs font-medium text-muted-foreground">Light</p>
            <ThemePreview />
          </div>
          <div className="dark space-y-3 rounded-xl border border-border bg-card p-6 text-card-foreground">
            <p className="text-xs font-medium text-muted-foreground">Dark</p>
            <ThemePreview />
          </div>
        </div>
      </Section>

      {/* Real examples */}
      <Section
        title="Exemplos reais"
        description="Padrões recorrentes nos módulos do CRM."
      >
        <div className="space-y-4">
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Toolbar de tabela — busca + ação</p>
            <div className="flex flex-wrap items-center gap-2">
              <SearchInput placeholder="Buscar leads…" containerClassName="w-full sm:w-72" />
              <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline">Filtros</Button>
                <Button size="sm">Novo lead</Button>
              </div>
            </div>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Formulário de negócio</p>
            <FieldGroup className="grid max-w-xl gap-5 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="ex-value">Valor do negócio</FieldLabel>
                <CurrencyInput id="ex-value" defaultValue="4000.00" code="USD" />
              </Field>
              <Field>
                <FieldLabel htmlFor="ex-prob">Probabilidade</FieldLabel>
                <InputGroup>
                  <InputGroupInput id="ex-prob" defaultValue="65" inputMode="numeric" className="text-right tabular-nums" />
                  <InputGroupAddon align="inline-end"><InputGroupText>%</InputGroupText></InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">Integração — chave e webhook</p>
            <FieldGroup className="max-w-xl gap-5">
              <Field>
                <FieldLabel>Chave de API</FieldLabel>
                <CopyInput value="sk_live_a1b2c3d4e5f6g7h8i9j0" />
                <FieldDescription>Mantenha em segredo. Rotacione se vazar.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="ex-hook">URL do webhook</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Link2 aria-hidden /></InputGroupAddon>
                  <InputGroupInput id="ex-hook" placeholder="https://acme.com/webhooks/crm" />
                </InputGroup>
              </Field>
            </FieldGroup>
          </Demo>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="Os grupos ocupam 100% da largura do contêiner por padrão (w-full). Em telas estreitas, empilhe os campos; a toolbar quebra em várias linhas."
      >
        <Demo className="mx-auto max-w-xs">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Contêiner estreito (max-w-xs)</p>
          <div className="flex flex-col gap-3">
            <SearchInput placeholder="Buscar…" />
            <CurrencyInput defaultValue="990.00" />
            <PasswordInput defaultValue="secret" />
          </div>
        </Demo>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do primitivo à composição.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Primitivo</p>
            <CodeBlock>{`import {
  InputGroup, InputGroupAddon, InputGroupInput, InputGroupText,
} from "@/components/ui/input-group"

<InputGroup>
  <InputGroupAddon><Search /></InputGroupAddon>
  <InputGroupInput placeholder="Buscar…" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>⌘K</InputGroupText>
  </InputGroupAddon>
</InputGroup>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Presets de CRM</p>
            <CodeBlock>{`import { SearchInput, CurrencyInput, PasswordInput, CopyInput } from "@/components/input-group"

<SearchInput value={q} onValueChange={setQ} loading={isFetching} />
<CurrencyInput code="USD" defaultValue="4000.00" />
<PasswordInput autoComplete="new-password" />
<CopyInput value={apiKey} />`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="Primitivos e presets.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Primitivos (@/components/ui/input-group)</h3>
            <ApiTable rows={PRIMITIVE_PARTS} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Presets (@/components/input-group)</h3>
            <ApiTable
              rows={FAMILY_PROPS}
              caption="Todos os presets repassam as props nativas de <input> (placeholder, disabled, name, etc.) e aceitam containerClassName para o grupo."
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
              "Use addon de texto para unidades e símbolos fixos ($, %, https://).",
              "Prefira os presets (SearchInput, CurrencyInput…) para consistência.",
              "Envolva em Field quando precisar de rótulo, descrição ou erro acessível.",
              "Sempre forneça aria-label em InputGroupButton apenas-ícone.",
              "Reflita erro com aria-invalid no controle — o grupo estiliza sozinho.",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Evite"
            items={[
              "Empilhar bordas: o controle interno é sem borda de propósito — não readicione.",
              "Colocar mais de 1–2 ações inline; muitos botões poluem o campo.",
              "Usar como barra de ferramentas completa — para isso use Button Group.",
              "Depender só de cor para erro/sucesso; combine ícone + mensagem (Field).",
              "Cores hardcoded — use tokens (text-destructive, text-success, border-input).",
            ]}
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Garantias embutidas.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Foco no conjunto:</span>{" "}
              o grupo é <code className="font-mono text-xs">role=&quot;group&quot;</code> e mostra um único anel
              de foco quando o controle interno recebe <code className="font-mono text-xs">focus-visible</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Clique no addon:</span>{" "}
              clicar num addon (não-botão) foca o input — alvo de clique maior.
            </li>
            <li>
              <span className="font-medium text-foreground">Erro:</span>{" "}
              <code className="font-mono text-xs">aria-invalid</code> pinta borda/anel e, via Field,
              conecta a <code className="font-mono text-xs">FieldError</code> (<code className="font-mono text-xs">role=&quot;alert&quot;</code>).
            </li>
            <li>
              <span className="font-medium text-foreground">Botões inline:</span>{" "}
              são <code className="font-mono text-xs">&lt;button type=&quot;button&quot;&gt;</code> (não submetem) e
              exigem <code className="font-mono text-xs">aria-label</code> quando só têm ícone.
            </li>
            <li>
              <span className="font-medium text-foreground">Senha:</span>{" "}
              o toggle expõe <code className="font-mono text-xs">aria-pressed</code> refletindo a visibilidade.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}

/** Shared preview so light/dark panels are identical. */
function ThemePreview() {
  return (
    <div className="flex flex-col gap-3">
      <SearchInput defaultValue="Adrain" placeholder="Buscar…" />
      <CurrencyInput defaultValue="12500.00" code="USD" />
      <InputGroup className="border-success">
        <InputGroupAddon><Mail aria-hidden /></InputGroupAddon>
        <InputGroupInput defaultValue="adrain@demo.com" />
        <InputGroupAddon align="inline-end">
          <CheckCircle2 className="text-success" aria-hidden />
        </InputGroupAddon>
      </InputGroup>
      <CopyInput value="sk_live_a1b2c3d4e5f6" />
    </div>
  )
}
