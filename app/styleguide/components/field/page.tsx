"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

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
    <StyleguidePage>
      <ComponentHeader
        title="Field"
        description={
          <>
            Sistema de composição de formulários do CRM V4 — padroniza label, controle, descrição,
            erro e agrupamento sobre Input/Select/Textarea/Checkbox/Radio. Itens com borda usam raio{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">rounded-md</code>{" "}
            (menos arredondado).
          </>
        }
      />

      <Section
        title="Orientações"
        description="vertical (padrão), horizontal e responsive (empilha no mobile, alinha no desktop)."
      >
        <Demo className="grid gap-6 lg:grid-cols-2">
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
        </Demo>
      </Section>

      <Section
        title="Estados"
        description="default, disabled, required e error (aria-invalid → borda/label/mensagem em destructive)."
      >
        <Demo>
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
        </Demo>
      </Section>

      <Section
        title="Tipos de controle"
        description="O mesmo primitivo Field compõe qualquer controle do DS."
      >
        <Demo>
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
        </Demo>
      </Section>

      <Section
        title="Choice fields"
        description="Cards de opção selecionáveis (borda menos arredondada, selecionado em accent emerald)."
      >
        <Demo className="grid gap-6 lg:grid-cols-2">
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
        </Demo>
      </Section>

      <Section
        title="Composição — Agrupamento (FieldSet / Legend / Separator)"
        description="FieldSet + FieldLegend agrupam campos relacionados; FieldSeparator divide seções."
      >
        <Demo>
          <FieldGroup className="max-w-md">
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
        </Demo>
      </Section>

      <Section
        title="Composição — Exemplo real: Novo lead"
        description="Form completo com validação — Nome obrigatório dispara FieldError."
      >
        <Demo>
          <form onSubmit={handleSubmit} className="max-w-md">
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
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>Associe sempre <code className="font-mono text-xs">FieldLabel</code> ao controle via <code className="font-mono text-xs">htmlFor</code>/<code className="font-mono text-xs">id</code>.</>,
          <>Erros usam <code className="font-mono text-xs">aria-invalid</code> no controle + <code className="font-mono text-xs">FieldError</code>, sinalizando por cor <strong>e</strong> texto.</>,
          <><code className="font-mono text-xs">FieldSet</code>/<code className="font-mono text-xs">FieldLegend</code> agrupam campos relacionados para leitores de tela.</>,
          <><code className="font-mono text-xs">FieldDescription</code> fornece contexto adicional lido junto ao campo.</>,
          <><code className="font-mono text-xs">ChoiceField</code> torna o card inteiro clicável (label envolve o controle).</>,
        ]}
      />

      <DarkModeSection description="Os mesmos fields nos dois temas — cores e foco vêm dos tokens.">
        <OrientationsDemo />
      </DarkModeSection>

      <ApiSection
        description="Composição declarativa; ChoiceField para cards de opção."
        groups={[
          [
            { prop: "Field.orientation", type: '"vertical" | "horizontal" | "responsive"', default: '"vertical"', description: "Direção do label/controle; responsive empilha no mobile." },
            { prop: "Field data-invalid", type: "boolean attr", description: "Marca o campo como inválido (borda/label em destructive)." },
            { prop: "Field data-disabled", type: "boolean attr", description: "Aparência desabilitada para o grupo do campo." },
            { prop: "FieldLabel", type: "htmlFor", description: "Rótulo associado ao controle pelo id." },
            { prop: "FieldError", type: "children", description: "Mensagem de erro; use com aria-invalid no controle." },
            { prop: "FieldDescription", type: "children", description: "Texto auxiliar abaixo do controle." },
          ],
          [
            { prop: "FieldGroup / FieldSet", type: "children", description: "Empilham e agrupam campos com espaçamento consistente." },
            { prop: "FieldLegend", type: "children", description: "Título do FieldSet." },
            { prop: "FieldSeparator", type: "children?", description: "Divisor com rótulo opcional entre seções." },
            { prop: "ChoiceField.htmlFor", type: "string", description: "id que liga o card ao control interno." },
            { prop: "ChoiceField.control", type: "ReactNode", description: "Checkbox ou RadioGroupItem selecionável." },
            { prop: "ChoiceField.title / description", type: "ReactNode", description: "Título e descrição do card de opção." },
            { prop: "ChoiceField.disabled", type: "boolean", default: "false", description: "Desabilita o card e o controle." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Field, FieldLabel, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field"
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
</RadioGroup>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Sempre associe FieldLabel ao controle via htmlFor/id.",
          "Use FieldError com aria-invalid para erros acessíveis.",
          "Agrupe campos relacionados em FieldSet + FieldLegend.",
          "Use ChoiceField quando a opção precisar de título + descrição.",
        ]}
        donts={[
          "Não use placeholder como substituto do label.",
          "Não sinalize erro só com cor — inclua a mensagem.",
          "Não misture orientações diferentes no mesmo grupo sem motivo.",
          "Não deixe controles sem descrição quando a ação não é óbvia.",
        ]}
      />
    </StyleguidePage>
  )
}
