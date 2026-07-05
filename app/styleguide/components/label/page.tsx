"use client"

import * as React from "react"
import { AlertCircle, Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

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
            <th className="px-4 py-2 font-medium">Prop</th>
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

/* ---------- docs data ---------- */

const PROPS: Array<[string, string, string, string]> = [
  ["required", "boolean", "false", "Exibe um asterisco (token destructive) indicando campo obrigatório."],
  ["optional", "boolean", "false", "Exibe a etiqueta discreta “(opcional)”. Ignorado se required."],
  ["hint", "ReactNode", "—", "Dica em Tooltip acionada por um ícone de informação focável."],
  ["size", `"sm" | "default"`, `"default"`, "Densidade do texto (text-xs vs text-sm)."],
  ["htmlFor", "string", "—", "Associa ao id do controle (nativo). Clicar foca/ativa o controle."],
  ["...props", "Radix Label.Root", "—", "Todas as props do primitivo Radix Label."],
]

/* ---------- page ---------- */

export default function LabelPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Header */}
      <header className="space-y-3">
        <Badge variant="secondary">Core · Formulários</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Label</h1>
        <p className="max-w-2xl text-muted-foreground">
          Rótulo acessível para qualquer controle de formulário. Sobre o primitivo
          Radix <code className="font-mono text-sm">Label</code>, com marcadores de{" "}
          <strong>obrigatório</strong> e <strong>opcional</strong>, dica em{" "}
          <strong>tooltip</strong> e duas densidades — sempre a partir dos tokens do
          design system. Associa-se ao controle via{" "}
          <code className="font-mono text-sm">htmlFor</code> e integra com o{" "}
          <code className="font-mono text-sm">Field</code>.
        </p>
      </header>

      {/* Variants */}
      <Section
        title="Variantes"
        description="Passe as flags conforme a semântica do campo. Passe o mouse (ou foque) no ícone de informação para ver a dica."
      >
        <Demo className="grid gap-5 sm:grid-cols-2">
          <Row label="Default">
            <Label htmlFor="v-default">Nome da empresa</Label>
          </Row>
          <Row label="required">
            <Label htmlFor="v-required" required>
              E-mail do contato
            </Label>
          </Row>
          <Row label="optional">
            <Label htmlFor="v-optional" optional>
              Telefone
            </Label>
          </Row>
          <Row label="hint (tooltip)">
            <Label htmlFor="v-hint" hint="Valor estimado do negócio em USD, sem impostos.">
              Valor do negócio
            </Label>
          </Row>
          <Row label="required + hint">
            <Label
              htmlFor="v-combo"
              required
              hint="Usado como identificador único do lead."
            >
              CNPJ
            </Label>
          </Row>
        </Demo>
      </Section>

      {/* Sizes */}
      <Section
        title="Tamanhos"
        description="default acompanha os controles padrão; sm para tabelas, filtros e áreas densas."
      >
        <Demo className="flex flex-wrap items-center gap-8">
          <Row label='size="default"'>
            <Label htmlFor="s-default" required>
              Responsável
            </Label>
          </Row>
          <Row label='size="sm"'>
            <Label htmlFor="s-sm" size="sm" required>
              Responsável
            </Label>
          </Row>
        </Demo>
      </Section>

      {/* States */}
      <Section
        title="Estados"
        description="O rótulo reflete o estado do campo: desabilitado (esmaecido) e erro (cor destructive quando o Field está inválido)."
      >
        <Demo className="grid gap-6 sm:grid-cols-3">
          <Row label="Default">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="st-default">Cargo</Label>
              <Input id="st-default" placeholder="Ex.: Gerente" />
            </div>
          </Row>
          <Row label="Disabled">
            <div className="group flex flex-col gap-1.5" data-disabled="true">
              <Label htmlFor="st-disabled">Cargo</Label>
              <Input id="st-disabled" placeholder="Ex.: Gerente" disabled />
            </div>
          </Row>
          <Row label="Error (via Field)">
            <Field data-invalid="true">
              <FieldLabel htmlFor="st-error" required>
                Cargo
              </FieldLabel>
              <Input id="st-error" aria-invalid defaultValue="" placeholder="Ex.: Gerente" />
              <FieldError>Informe o cargo do contato.</FieldError>
            </Field>
          </Row>
        </Demo>
      </Section>

      {/* Association */}
      <Section
        title="Associação (htmlFor)"
        description="Com htmlFor apontando para o id do controle, clicar no rótulo foca (input) ou alterna (checkbox/radio) o controle — alvo de clique maior e acessível. Clique nos rótulos abaixo."
      >
        <Demo className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="assoc-input">Clique aqui para focar o campo</Label>
            <Input id="assoc-input" placeholder="O foco vem ao clicar no rótulo" className="max-w-sm" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="assoc-check" />
            <Label htmlFor="assoc-check" className="font-normal">
              Clique no texto para marcar
            </Label>
          </div>
          <RadioGroup defaultValue="a" className="flex gap-6">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="assoc-r-a" />
              <Label htmlFor="assoc-r-a" className="font-normal">Ativo</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="assoc-r-b" />
              <Label htmlFor="assoc-r-b" className="font-normal">Inativo</Label>
            </div>
          </RadioGroup>
        </Demo>
      </Section>

      {/* Composition */}
      <Section
        title="Composição"
        description="Como o Label aparece com os controles do design system. Em formulários, prefira o Field (FieldLabel repassa required/optional/hint/size)."
      >
        <Demo>
          <FieldGroup className="grid max-w-xl gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="c-name" required>Nome</FieldLabel>
              <Input id="c-name" placeholder="Adrain Ondricka" />
            </Field>
            <Field>
              <FieldLabel htmlFor="c-phone" optional>Telefone</FieldLabel>
              <Input id="c-phone" placeholder="+1 (510) 925-0980" />
            </Field>
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="c-note" hint="Visível só para a equipe interna.">
                Observação
              </FieldLabel>
              <Input id="c-note" placeholder="Contexto do lead…" />
              <FieldDescription>Aparece no topo do registro.</FieldDescription>
            </Field>
          </FieldGroup>
        </Demo>
        <CodeBlock>{`import { Field, FieldLabel } from "@/components/ui/field"

<Field>
  <FieldLabel htmlFor="email" required hint="Usado para follow-ups.">
    E-mail
  </FieldLabel>
  <Input id="email" type="email" />
</Field>`}</CodeBlock>
      </Section>

      {/* Light / Dark */}
      <Section
        title="Light / Dark"
        description="Peso, asterisco (destructive), etiqueta opcional (muted) e ícone de dica usam tokens com pares -foreground. Painel direito forçado em dark."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Light</p>
            <ThemePreview />
          </div>
          <div className="dark rounded-xl border border-border bg-card p-6 text-card-foreground">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Dark</p>
            <ThemePreview />
          </div>
        </div>
      </Section>

      {/* Real examples */}
      <Section title="Exemplos reais" description="Padrões recorrentes nos formulários do CRM.">
        <div className="space-y-4">
          <Demo>
            <p className="mb-4 text-xs font-medium text-muted-foreground">Cabeçalho de seção de formulário</p>
            <div className="space-y-1">
              <Label size="sm" className="uppercase tracking-wide text-muted-foreground">
                Informações de contato
              </Label>
              <p className="text-sm text-muted-foreground">Dados usados para comunicação com o lead.</p>
            </div>
          </Demo>
          <Demo>
            <p className="mb-4 text-xs font-medium text-muted-foreground">Lista de permissões (checkbox + label)</p>
            <div className="flex flex-col gap-3">
              {[
                { id: "perm-view", label: "Visualizar negócios", desc: "Ver todos os negócios do pipeline." },
                { id: "perm-edit", label: "Editar negócios", desc: "Alterar estágio, valor e responsável." },
                { id: "perm-delete", label: "Excluir negócios", desc: "Ação irreversível." },
              ].map((p, i) => (
                <div key={p.id} className="flex items-start gap-3">
                  <Checkbox id={p.id} defaultChecked={i === 0} className="mt-0.5" />
                  <div className="flex flex-col">
                    <Label htmlFor={p.id} className="font-normal">{p.label}</Label>
                    <span className="text-xs text-muted-foreground">{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Demo>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="Rótulos quebram naturalmente; marcadores e dica permanecem alinhados. Em contêineres estreitos, o texto envolve sem empurrar o asterisco/ícone."
      >
        <Demo className="mx-auto max-w-xs">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="r-long" required hint="Segmento principal de atuação da empresa cliente.">
              Segmento de mercado da empresa
            </Label>
            <Input id="r-long" placeholder="Ex.: SaaS B2B" />
          </div>
        </Demo>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do básico à composição.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Básico</p>
            <CodeBlock>{`import { Label } from "@/components/ui/label"

<Label htmlFor="name">Nome</Label>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Marcadores + dica</p>
            <CodeBlock>{`<Label htmlFor="email" required hint="Usado para notificações.">
  E-mail
</Label>

<Label htmlFor="phone" optional>Telefone</Label>

<Label htmlFor="q" size="sm">Buscar</Label>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="API do Label.">
        <ApiTable
          rows={PROPS}
          caption="required tem precedência sobre optional. hint envolve o próprio TooltipProvider — não precisa de provider na página."
        />
      </Section>

      {/* Guidelines */}
      <Section title="Boas práticas" description="Diretrizes de uso.">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Faça"
            items={[
              "Sempre associe com htmlFor (ou envolva o controle) — alvo de clique + leitor de tela.",
              "Use required para campos obrigatórios e optional quando a maioria for obrigatória.",
              "Coloque no hint só informação de apoio; a essencial vai em FieldDescription.",
              "Use size=\"sm\" em filtros/tabelas para manter a densidade.",
              "Mantenha o texto curto e em caixa natural (evite CAPS, exceto rótulos de seção).",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Evite"
            items={[
              "Rótulo sem associação (texto solto) — quebra clique e acessibilidade.",
              "Marcar tudo como required e optional ao mesmo tempo — escolha uma convenção.",
              "Frases longas no rótulo; mova detalhes para descrição ou dica.",
              "Cor hardcoded para o asterisco — use o token destructive (padrão do componente).",
              "Depender só do asterisco para obrigatoriedade sem validação/erro no envio.",
            ]}
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Garantias do componente.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Elemento nativo:</span>{" "}
              renderiza <code className="font-mono text-xs">&lt;label&gt;</code> real; com{" "}
              <code className="font-mono text-xs">htmlFor</code> o clique foca/ativa o controle.
            </li>
            <li>
              <span className="font-medium text-foreground">Obrigatório:</span>{" "}
              o asterisco é <code className="font-mono text-xs">aria-hidden</code>; comunique a
              obrigatoriedade também via <code className="font-mono text-xs">required</code>/<code className="font-mono text-xs">aria-required</code> no controle.
            </li>
            <li>
              <span className="font-medium text-foreground">Dica:</span>{" "}
              o ícone é um <code className="font-mono text-xs">&lt;button&gt;</code> focável com{" "}
              <code className="font-mono text-xs">aria-label</code>; o Tooltip abre no hover e no foco por teclado.
            </li>
            <li>
              <span className="font-medium text-foreground">Desabilitado:</span>{" "}
              esmaece via <code className="font-mono text-xs">peer-disabled</code>/<code className="font-mono text-xs">group-data-[disabled]</code> junto ao controle.
            </li>
            <li>
              <span className="font-medium text-foreground">Erro:</span>{" "}
              dentro de um <code className="font-mono text-xs">Field</code> com{" "}
              <code className="font-mono text-xs">data-invalid</code>, o rótulo assume a cor destructive.
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
    <div className="flex flex-col gap-4">
      <Label htmlFor="tp-1" required>E-mail do contato</Label>
      <Label htmlFor="tp-2" optional>Telefone</Label>
      <Label htmlFor="tp-3" hint="Valor estimado em USD.">Valor do negócio</Label>
      <div className="flex items-center gap-2">
        <Checkbox id="tp-4" defaultChecked />
        <Label htmlFor="tp-4" className="font-normal">Receber notificações</Label>
      </div>
    </div>
  )
}
