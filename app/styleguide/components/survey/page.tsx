"use client"

import * as React from "react"
import {
  QuestionCard,
  StepIndicator,
  QuestionHeader,
  ChoiceCard,
  OptionList,
  QuestionTextInput,
  QuestionDropdown,
  QuestionFooter,
  type SurveyOption,
} from "@/components/survey"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  DesignNotes,
  GuidelinesSection,
  Kbd,
  RelatedComponents,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

// ── Mock data ─────────────────────────────────────────────────────────────────

const ROLE_OPTIONS: SurveyOption[] = [
  { id: "sales", label: "Representante de Vendas", description: "Gerencia leads e fecha negócios" },
  { id: "manager", label: "Gerente de Vendas", description: "Supervisiona o time de vendas" },
  { id: "marketing", label: "Especialista de Marketing" },
  { id: "support", label: "Suporte ao Cliente" },
]

const TOOL_OPTIONS: SurveyOption[] = [
  { id: "email", label: "Campanhas de e-mail" },
  { id: "calls", label: "Ligações a frio" },
  { id: "social", label: "Venda social" },
  { id: "events", label: "Eventos e webinars" },
  { id: "ads", label: "Publicidade paga" },
]

const PLAN_OPTIONS: SurveyOption[] = [
  { id: "starter", label: "Starter" },
  { id: "growth", label: "Growth" },
  { id: "pro", label: "Pro" },
  { id: "enterprise", label: "Enterprise" },
]

interface Step {
  type: "single" | "multiple" | "text" | "dropdown"
  question: string
  description?: string
  options?: SurveyOption[]
  placeholder?: string
}

const STEPS: Step[] = [
  {
    type: "single",
    question: "Qual é a sua função principal?",
    description: "Isso nos ajuda a personalizar sua experiência no CRM.",
    options: ROLE_OPTIONS,
  },
  {
    type: "multiple",
    question: "Quais canais você mais utiliza?",
    description: "Selecione todos que se aplicam.",
    options: TOOL_OPTIONS,
  },
  {
    type: "text",
    question: "Qual é o seu maior desafio em vendas?",
    description: "Seja o mais específico que quiser — isso nos ajuda a melhorar o produto.",
    placeholder: "ex.: Qualificar leads mais rápido...",
  },
  {
    type: "dropdown",
    question: "Em qual plano você tem interesse?",
    options: PLAN_OPTIONS,
    placeholder: "Escolha um plano…",
  },
]

// ── Interactive multi-step demo ───────────────────────────────────────────────

function MultiStepDemo() {
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<number, string | string[]>>({})
  const [done, setDone] = React.useState(false)

  if (done) {
    return (
      <div className="flex max-w-[560px] flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-modal)] text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/10 text-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h2 className="text-xl font-semibold text-foreground">Tudo pronto!</h2>
        <p className="text-sm text-muted-foreground">Suas respostas foram registradas.</p>
        <button
          onClick={() => { setStep(0); setAnswers({}); setDone(false) }}
          className="mt-2 text-xs text-primary underline-offset-4 hover:underline"
        >
          Recomeçar
        </button>
      </div>
    )
  }

  const current = STEPS[step]

  return (
    <QuestionCard
      questionNumber={step + 1}
      totalQuestions={STEPS.length}
      questionType={current.type}
      question={current.question}
      description={current.description}
      options={current.options}
      placeholder={current.placeholder}
      value={answers[step]}
      onChange={(v) => setAnswers((prev) => ({ ...prev, [step]: v }))}
      onBack={step > 0 ? () => setStep((s) => s - 1) : undefined}
      onNext={() => {
        if (step < STEPS.length - 1) setStep((s) => s + 1)
        else setDone(true)
      }}
      nextLabel={step === STEPS.length - 1 ? "Enviar" : "OK"}
      showKeyboardHints
    />
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SurveyPage() {
  const [singleValue, setSingleValue] = React.useState<string>("")
  const [multiValue, setMultiValue] = React.useState<string[]>([])
  const [textValue, setTextValue] = React.useState("")
  const [dropdownValue, setDropdownValue] = React.useState("")

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Survey Question Card"
        description="Um sistema componível para fluxos de pesquisa focados em uma pergunta por vez com navegação por teclado — tipos de resposta de escolha única/múltipla, texto livre e dropdown."
      />

      {/* Demo interativa */}
      <Section title="Demo Interativa" description="Pesquisa de 4 etapas — atalhos de teclado A/B/C… para selecionar, Enter para avançar.">
        <MultiStepDemo />
      </Section>

      {/* Blocos de construção */}
      <Section title="Blocos de Construção" description="Cada peça do QuestionCard é exportada e usável isoladamente.">
        <div className="grid gap-8 md:grid-cols-2">

          {/* StepIndicator */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">StepIndicator</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <StepIndicator current={1} total={5} />
              <StepIndicator current={3} total={5} />
              <StepIndicator current={5} total={5} />
            </div>
          </div>

          {/* QuestionHeader */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">QuestionHeader</p>
            <div className="rounded-lg border border-border bg-card p-4">
              <QuestionHeader
                questionNumber={2}
                question="Qual é a sua função principal?"
                description="Isso nos ajuda a personalizar sua experiência."
              />
            </div>
          </div>

          {/* ChoiceCard states */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">ChoiceCard — estados</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-2">
              <ChoiceCard id="a" label="Opção não selecionada" shortcut="A" />
              <ChoiceCard id="b" label="Opção selecionada" shortcut="B" selected />
              <ChoiceCard id="c" label="Com descrição" shortcut="C" description="Linha de contexto adicional" />
              <ChoiceCard id="d" label="Opção desabilitada" shortcut="D" disabled />
            </div>
          </div>

          {/* OptionList */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">OptionList — seleção única</p>
            <div className="rounded-lg border border-border bg-card p-4">
              <OptionList
                options={ROLE_OPTIONS.slice(0, 3)}
                value={singleValue}
                onChange={(v) => setSingleValue(v as string)}
              />
            </div>
          </div>

          {/* OptionList multi */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">OptionList — seleção múltipla</p>
            <div className="rounded-lg border border-border bg-card p-4">
              <OptionList
                options={TOOL_OPTIONS.slice(0, 3)}
                value={multiValue}
                multiple
                onChange={(v) => setMultiValue(v as string[])}
              />
            </div>
          </div>

          {/* Text input */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">QuestionTextInput</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <QuestionTextInput
                value={textValue}
                onChange={setTextValue}
                placeholder="Resposta curta…"
              />
              <QuestionTextInput
                value={textValue}
                onChange={setTextValue}
                multiline
                maxLength={200}
                placeholder="Resposta longa…"
              />
            </div>
          </div>

          {/* Dropdown */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">QuestionDropdown</p>
            <div className="rounded-lg border border-border bg-card p-4">
              <QuestionDropdown
                options={PLAN_OPTIONS}
                value={dropdownValue}
                onChange={setDropdownValue}
                placeholder="Escolha um plano…"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">QuestionFooter — variantes</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-4">
              <QuestionFooter onNext={() => {}} nextLabel="OK" showKeyboardHints />
              <QuestionFooter onNext={() => {}} onBack={() => {}} nextLabel="Avançar" showKeyboardHints />
              <QuestionFooter onNext={() => {}} nextLabel="Enviar" nextDisabled showKeyboardHints={false} />
            </div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="QuestionCard — Estados" description="O estado desabilitado trava todos os controles e esmaece o card.">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Desabilitado</p>
            <QuestionCard
              questionNumber={1}
              totalQuestions={4}
              questionType="single"
              question="Qual é a sua função principal?"
              options={ROLE_OPTIONS.slice(0, 3)}
              value="sales"
              disabled
            />
          </div>
        </div>
      </Section>

      <AccessibilitySection
        title="Acessibilidade"
        items={[
          <>As opções de escolha expõem atalhos de teclado (<Kbd>A</Kbd> <Kbd>B</Kbd> <Kbd>C</Kbd>…) renderizados como uma dica visível em cada ChoiceCard.</>,
          <>Pressionar <Kbd>Enter</Kbd> avança para a próxima etapa quando há uma resposta presente; dentro de um campo de texto multiline o <Kbd>Enter</Kbd> insere uma quebra de linha em vez de avançar.</>,
          <>Cards desabilitados retornam cedo de todos os handlers de tecla e removem seus controles da interação.</>,
          <>O número do StepIndicator e do QuestionHeader comunicam o progresso para que os usuários sempre saibam onde estão no fluxo.</>,
          <>As escolhas selecionadas usam um estado preenchido mais o badge de atalho — o status não é sinalizado apenas pela cor.</>,
        ]}
      />

      <DarkModeSection description="Blocos de construção da pesquisa em ambos os temas — superfícies de card, estados selecionados e a confirmação de sucesso são todos resolvidos a partir de tokens.">
        <div className="space-y-2">
          <ChoiceCard id="dm-a" label="Opção selecionada" shortcut="A" selected />
          <ChoiceCard id="dm-b" label="Com descrição" shortcut="B" description="Linha de contexto adicional" />
          <ChoiceCard id="dm-c" label="Opção não selecionada" shortcut="C" />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { QuestionCard } from "@/components/survey"

<QuestionCard
  questionNumber={step + 1}
  totalQuestions={steps.length}
  questionType="single"          // "single" | "multiple" | "text" | "dropdown"
  question="Qual é a sua função principal?"
  description="Isso nos ajuda a personalizar sua experiência no CRM."
  options={roleOptions}
  value={answers[step]}
  onChange={(v) => setAnswer(step, v)}
  onBack={step > 0 ? goBack : undefined}
  onNext={goNext}
  nextLabel={isLast ? "Enviar" : "OK"}
  showKeyboardHints
/>`}</CodeBlock>
      </Section>

      {/* Props docs */}
      <ApiSection
        title="API / Props"
        description="QuestionCard — a casca completa de pergunta única que compõe StepIndicator, QuestionHeader, o campo de resposta e QuestionFooter."
        groups={[
          [
            { prop: "questionType", type: '"single" | "multiple" | "text" | "dropdown"', description: "Tipo de campo de resposta (obrigatório)." },
            { prop: "question", type: "string", description: "Texto da pergunta (obrigatório)." },
            { prop: "description", type: "string", description: "Subtexto opcional abaixo da pergunta." },
            { prop: "options", type: "SurveyOption[]", default: "[]", description: "Opções de resposta para os tipos single/multiple/dropdown." },
            { prop: "value", type: "string | string[]", description: "Valor controlado da resposta." },
            { prop: "onChange", type: "(v: string | string[]) => void", description: "Chamado ao alterar a resposta." },
            { prop: "placeholder", type: "string", description: "Placeholder para campos de texto/dropdown." },
          ],
          [
            { prop: "questionNumber", type: "number", description: "Número da etapa atual (mostra cabeçalho + progresso)." },
            { prop: "totalQuestions", type: "number", description: "Total de etapas para a barra de progresso." },
            { prop: "onNext", type: "() => void", description: "Chamado no botão OK/Avançar ou na tecla Enter." },
            { prop: "onBack", type: "() => void", description: "Chamado no botão Voltar; o botão fica oculto se omitido." },
            { prop: "onClose", type: "() => void", description: "Renderiza um botão X quando fornecido." },
            { prop: "nextLabel", type: "string", default: '"OK"', description: "Rótulo do botão de avançar." },
            { prop: "backLabel", type: "string", default: '"Back"', description: "Rótulo do botão de voltar." },
            { prop: "showKeyboardHints", type: "boolean", default: "true", description: "Mostra a dica 'pressione Enter ↵' abaixo de Avançar." },
            { prop: "disabled", type: "boolean", default: "false", description: "Desabilita todos os elementos interativos." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Boas Práticas"
        dos={[
          "Faça uma pergunta por tela para manter o respondente focado.",
          "Mostre o progresso com questionNumber / totalQuestions para que os usuários saibam o quanto falta.",
          "Use 'multiple' para perguntas de selecionar todas e 'single' para escolhas exclusivas.",
          "Mantenha as dicas de teclado ativas para usuários avançados que completam pesquisas longas.",
        ]}
        donts={[
          "Não amontoe várias perguntas em um único QuestionCard — divida-as em etapas.",
          "Não escreva rótulos de opção longos; mantenha as escolhas fáceis de escanear com a tecla de atalho.",
          "Não desabilite o botão Avançar sem um motivo óbvio (ex.: resposta obrigatória).",
          "Não intercepte o Enter dentro de um texto multiline — deixe-o inserir quebras de linha.",
        ]}
      />

      <DesignNotes
        items={[
          <>Uma pergunta por tela mantém o respondente focado; <code className="font-mono text-xs">StepIndicator</code> + <code className="font-mono text-xs">questionNumber</code> comunicam o progresso.</>,
          <>Sistema componível: <code className="font-mono text-xs">StepIndicator</code>, <code className="font-mono text-xs">QuestionHeader</code>, <code className="font-mono text-xs">ChoiceCard</code>, <code className="font-mono text-xs">OptionList</code>, <code className="font-mono text-xs">QuestionTextInput</code>, <code className="font-mono text-xs">QuestionDropdown</code> e <code className="font-mono text-xs">QuestionFooter</code> são exportados e usáveis isoladamente.</>,
          <>Navegação por teclado é first-class: atalhos <Kbd>A</Kbd> <Kbd>B</Kbd> <Kbd>C</Kbd>… selecionam e <Kbd>Enter</Kbd> avança; dentro de um textarea multiline o <Kbd>Enter</Kbd> insere quebra de linha em vez de avançar.</>,
          <>O estado selecionado usa preenchimento + badge de atalho (não só cor); <code className="font-mono text-xs">disabled</code> trava todos os controles.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Field", href: "/styleguide/components/field", description: "Estrutura label + input para formulários tradicionais de várias perguntas." },
          { name: "Progress", href: "/styleguide/components/progress", description: "Barra de progresso — o StepIndicator é a versão por etapas." },
          { name: "Button", href: "/styleguide/components/button", description: "O QuestionFooter compõe os botões OK/Back." },
          { name: "Badge", href: "/styleguide/components/badge", description: "Os atalhos de teclado nos ChoiceCards seguem o mesmo padrão de rótulo." },
        ]}
      />
    </StyleguidePage>
  )
}
