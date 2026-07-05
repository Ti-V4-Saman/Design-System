"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { ChoiceField } from "@/components/field"

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 mt-12 border-t border-border pt-8 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-lg font-semibold text-foreground">{children}</h2>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

/** Reused so the panel appears identical in both themes. */
function OrientationsDemo() {
  return (
    <FieldGroup className="max-w-md">
      <Field>
        <FieldLabel htmlFor="o-vertical">Vertical (padrão)</FieldLabel>
        <Input id="o-vertical" placeholder="Label acima do controle" />
        <FieldDescription>Label, controle e descrição empilhados.</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="o-horizontal" defaultChecked />
        <FieldLabel htmlFor="o-horizontal" className="font-normal">
          Horizontal — controle ao lado do label
        </FieldLabel>
      </Field>
    </FieldGroup>
  )
}

export default function FieldPage() {
  const [name, setName] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)
  const [ok, setOk] = React.useState(false)
  const nameError = submitted && !name.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    if (name.trim()) {
      setOk(true)
      setTimeout(() => setOk(false), 2500)
    }
  }

  return (
    <div className="max-w-7xl p-8">
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Field</h1>
        <p className="text-sm text-muted-foreground">
          Sistema de composição de formulários do CRM V4 — padroniza label, controle, descrição,
          erro e agrupamento sobre Input/Select/Textarea/Checkbox/Radio. Itens com borda usam raio{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">rounded-md</code>{" "}
          (menos arredondado).
        </p>
      </div>

      {/* ── Orientations ── */}
      <SectionTitle hint="vertical (padrão), horizontal e responsive (empilha no mobile, alinha no desktop).">
        Orientações
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <OrientationsDemo />
        <FieldGroup className="max-w-md">
          <Field orientation="responsive">
            <FieldContent>
              <FieldLabel htmlFor="o-resp">Responsive</FieldLabel>
              <FieldDescription>Vira linha única a partir de md.</FieldDescription>
            </FieldContent>
            <Select defaultValue="">
              <SelectTrigger id="o-resp" className="md:w-40">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opção A</SelectItem>
                <SelectItem value="b">Opção B</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
      </div>

      {/* ── States ── */}
      <SectionTitle hint="default, disabled, required e error (aria-invalid → borda/label/mensagem em destructive).">
        Estados
      </SectionTitle>
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="s-default">Default</FieldLabel>
          <Input id="s-default" placeholder="Digite algo" />
        </Field>
        <Field data-disabled>
          <FieldLabel htmlFor="s-disabled">Disabled</FieldLabel>
          <Input id="s-disabled" placeholder="Indisponível" disabled />
          <FieldDescription>Campo desabilitado.</FieldDescription>
        </Field>
        <Field data-invalid>
          <FieldLabel htmlFor="s-error">Email *</FieldLabel>
          <Input id="s-error" defaultValue="email-invalido" aria-invalid />
          <FieldError>Informe um email válido.</FieldError>
        </Field>
      </FieldGroup>

      {/* ── Field types ── */}
      <SectionTitle hint="O mesmo primitivo Field compõe qualquer controle do DS.">
        Tipos de controle
      </SectionTitle>
      <FieldGroup className="max-w-md">
        <Field>
          <FieldLabel htmlFor="t-input">Input</FieldLabel>
          <Input id="t-input" placeholder="Texto" />
        </Field>
        <Field>
          <FieldLabel htmlFor="t-select">Select</FieldLabel>
          <Select defaultValue="">
            <SelectTrigger id="t-select">
              <SelectValue placeholder="Selecionar origem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="referral">Indicação</SelectItem>
              <SelectItem value="organic">Orgânico</SelectItem>
              <SelectItem value="ads">Google Ads</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="t-textarea">Textarea</FieldLabel>
          <Textarea id="t-textarea" placeholder="Observações" className="resize-none" />
        </Field>
        <Field orientation="horizontal">
          <Checkbox id="t-checkbox" />
          <FieldLabel htmlFor="t-checkbox" className="font-normal">
            Aceito receber comunicações
          </FieldLabel>
        </Field>
      </FieldGroup>

      {/* ── Choice fields ── */}
      <SectionTitle hint="Cards de opção selecionáveis (borda menos arredondada, selecionado em accent emerald).">
        Choice fields
      </SectionTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Radio (seleção única)</p>
          <RadioGroup defaultValue="pro" className="flex flex-col gap-3">
            <ChoiceField
              htmlFor="plan-free"
              control={<RadioGroupItem id="plan-free" value="free" />}
              title="Free"
              description="Até 3 usuários e 1 pipeline."
            />
            <ChoiceField
              htmlFor="plan-pro"
              control={<RadioGroupItem id="plan-pro" value="pro" />}
              title="Pro"
              description="Usuários ilimitados, automações e relatórios."
            />
            <ChoiceField
              htmlFor="plan-ent"
              control={<RadioGroupItem id="plan-ent" value="ent" disabled />}
              title="Enterprise"
              description="Sob consulta — indisponível no seu plano."
              disabled
            />
          </RadioGroup>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Checkbox (múltipla)</p>
          <FieldGroup className="gap-3">
            <ChoiceField
              htmlFor="notif-email"
              control={<Checkbox id="notif-email" defaultChecked />}
              title="Email"
              description="Resumo diário de leads e tarefas."
            />
            <ChoiceField
              htmlFor="notif-push"
              control={<Checkbox id="notif-push" />}
              title="Push"
              description="Alertas em tempo real no navegador."
            />
          </FieldGroup>
        </div>
      </div>

      {/* ── Fieldset grouping ── */}
      <SectionTitle hint="FieldSet + FieldLegend agrupam campos relacionados; FieldSeparator divide seções.">
        Agrupamento (FieldSet / Legend / Separator)
      </SectionTitle>
      <div className="max-w-md rounded-lg border border-border bg-card p-5">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Dados do lead</FieldLegend>
            <FieldDescription>Informações básicas de contato.</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="g-name">Nome</FieldLabel>
                <Input id="g-name" placeholder="Sandra Waters" />
              </Field>
              <Field>
                <FieldLabel htmlFor="g-company">Empresa</FieldLabel>
                <Input id="g-company" placeholder="Acme Inc" />
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator>Preferências</FieldSeparator>
          <FieldSet>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="g-vip" />
                <FieldLabel htmlFor="g-vip" className="font-normal">
                  Marcar como lead VIP
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </div>

      {/* ── Real CRM form ── */}
      <SectionTitle hint="Form completo com validação — Nome obrigatório dispara FieldError.">
        Exemplo real — Novo lead
      </SectionTitle>
      <form onSubmit={handleSubmit} className="max-w-md rounded-lg border border-border bg-card p-5">
        <FieldGroup>
          <Field data-invalid={nameError || undefined}>
            <FieldLabel htmlFor="f-name">Nome *</FieldLabel>
            <Input
              id="f-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Sandra Waters"
              aria-invalid={nameError || undefined}
            />
            {nameError ? <FieldError>O nome é obrigatório.</FieldError> : null}
          </Field>
          <Field>
            <FieldLabel htmlFor="f-source">Origem</FieldLabel>
            <Select defaultValue="">
              <SelectTrigger id="f-source">
                <SelectValue placeholder="Selecionar origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="referral">Indicação</SelectItem>
                <SelectItem value="organic">Orgânico</SelectItem>
                <SelectItem value="ads">Google Ads</SelectItem>
              </SelectContent>
            </Select>
            <FieldDescription>Como o lead chegou até você.</FieldDescription>
          </Field>
          <Field orientation="horizontal">
            <Button type="submit">Criar lead</Button>
            <Button variant="outline" type="button" onClick={() => { setName(""); setSubmitted(false) }}>
              Limpar
            </Button>
            {ok ? (
              <span className="flex items-center gap-1 text-sm font-medium text-success">
                <CheckCircle2 className="size-4" /> Criado!
              </span>
            ) : null}
          </Field>
        </FieldGroup>
      </form>

      {/* ── Light / Dark ── */}
      <SectionTitle hint="Os mesmos fields nos dois temas — cores e foco vêm dos tokens.">
        Light &amp; Dark
      </SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
          <OrientationsDemo />
        </div>
        <div className="dark rounded-xl border border-border bg-background p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
          <OrientationsDemo />
        </div>
      </div>

      {/* ── Uso & API ── */}
      <SectionTitle hint="Composição declarativa; ChoiceField para cards de opção.">Uso &amp; API</SectionTitle>
      <Card>
        <CardContent className="pt-6">
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
{`import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field"
import { ChoiceField } from "@/components/field"

// Campo com validação
<Field data-invalid={hasError || undefined}>
  <FieldLabel htmlFor="name">Nome *</FieldLabel>
  <Input id="name" aria-invalid={hasError || undefined} />
  {hasError && <FieldError>O nome é obrigatório.</FieldError>}
</Field>

// Choice field (card de opção, borda menos arredondada)
<RadioGroup defaultValue="pro">
  <ChoiceField htmlFor="pro" control={<RadioGroupItem id="pro" value="pro" />}
    title="Pro" description="Usuários ilimitados." />
</RadioGroup>`}
          </pre>
        </CardContent>
      </Card>

      {/* ── Do / Don't ── */}
      <SectionTitle>Boas práticas</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <p className="mb-2 text-sm font-semibold text-success">Do</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Sempre associe FieldLabel ao controle via htmlFor/id.</li>
            <li>• Use FieldError com aria-invalid para erros acessíveis.</li>
            <li>• Agrupe campos relacionados em FieldSet + FieldLegend.</li>
            <li>• Use ChoiceField quando a opção precisar de título + descrição.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="mb-2 text-sm font-semibold text-destructive">Don&apos;t</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Não use placeholder como substituto do label.</li>
            <li>• Não sinalize erro só com cor — inclua a mensagem.</li>
            <li>• Não misture orientações diferentes no mesmo grupo sem motivo.</li>
            <li>• Não deixe controles sem descrição quando a ação não é óbvia.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
