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
  { id: "sales", label: "Sales Representative", description: "Manage leads and close deals" },
  { id: "manager", label: "Sales Manager", description: "Oversee the sales team" },
  { id: "marketing", label: "Marketing Specialist" },
  { id: "support", label: "Customer Support" },
]

const TOOL_OPTIONS: SurveyOption[] = [
  { id: "email", label: "Email campaigns" },
  { id: "calls", label: "Cold calling" },
  { id: "social", label: "Social selling" },
  { id: "events", label: "Events & webinars" },
  { id: "ads", label: "Paid advertising" },
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
    question: "What is your primary role?",
    description: "This helps us tailor your CRM experience.",
    options: ROLE_OPTIONS,
  },
  {
    type: "multiple",
    question: "Which channels do you use most?",
    description: "Select all that apply.",
    options: TOOL_OPTIONS,
  },
  {
    type: "text",
    question: "What is your biggest sales challenge?",
    description: "Be as specific as you like — this helps us improve the product.",
    placeholder: "e.g. Qualifying leads faster...",
  },
  {
    type: "dropdown",
    question: "Which plan are you interested in?",
    options: PLAN_OPTIONS,
    placeholder: "Choose a plan…",
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
        <h2 className="text-xl font-semibold text-foreground">All done!</h2>
        <p className="text-sm text-muted-foreground">Your responses have been recorded.</p>
        <button
          onClick={() => { setStep(0); setAnswers({}); setDone(false) }}
          className="mt-2 text-xs text-primary underline-offset-4 hover:underline"
        >
          Restart
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
      nextLabel={step === STEPS.length - 1 ? "Submit" : "OK"}
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
        description="A composable system for focused single-question survey flows with keyboard navigation — single/multiple choice, free text and dropdown answer types."
      />

      {/* Interactive demo */}
      <Section title="Interactive Demo" description="4-step survey — keyboard shortcuts A/B/C… to select, Enter to advance.">
        <MultiStepDemo />
      </Section>

      {/* Building blocks */}
      <Section title="Building Blocks" description="Each piece of the QuestionCard is exported and usable on its own.">
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
                question="What is your primary role?"
                description="This helps us personalise your experience."
              />
            </div>
          </div>

          {/* ChoiceCard states */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">ChoiceCard — states</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-2">
              <ChoiceCard id="a" label="Unselected option" shortcut="A" />
              <ChoiceCard id="b" label="Selected option" shortcut="B" selected />
              <ChoiceCard id="c" label="With description" shortcut="C" description="Additional context line" />
              <ChoiceCard id="d" label="Disabled option" shortcut="D" disabled />
            </div>
          </div>

          {/* OptionList */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">OptionList — single select</p>
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
            <p className="text-xs text-muted-foreground font-medium">OptionList — multi select</p>
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
                placeholder="Short answer…"
              />
              <QuestionTextInput
                value={textValue}
                onChange={setTextValue}
                multiline
                maxLength={200}
                placeholder="Long answer…"
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
                placeholder="Choose a plan…"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">QuestionFooter — variants</p>
            <div className="rounded-lg border border-border bg-card p-4 space-y-4">
              <QuestionFooter onNext={() => {}} nextLabel="OK" showKeyboardHints />
              <QuestionFooter onNext={() => {}} onBack={() => {}} nextLabel="Next" showKeyboardHints />
              <QuestionFooter onNext={() => {}} nextLabel="Submit" nextDisabled showKeyboardHints={false} />
            </div>
          </div>
        </div>
      </Section>

      {/* States */}
      <Section title="QuestionCard — States" description="Disabled locks every control and dims the card.">
        <div className="flex flex-wrap gap-8">
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Disabled</p>
            <QuestionCard
              questionNumber={1}
              totalQuestions={4}
              questionType="single"
              question="What is your primary role?"
              options={ROLE_OPTIONS.slice(0, 3)}
              value="sales"
              disabled
            />
          </div>
        </div>
      </Section>

      <AccessibilitySection
        title="Accessibility"
        items={[
          <>Choice options expose keyboard shortcuts (<Kbd>A</Kbd> <Kbd>B</Kbd> <Kbd>C</Kbd>…) rendered as a visible hint on each ChoiceCard.</>,
          <>Pressing <Kbd>Enter</Kbd> advances to the next step once an answer is present; inside a multiline text input <Kbd>Enter</Kbd> inserts a newline instead of advancing.</>,
          <>Disabled cards early-return from all key handlers and remove their controls from interaction.</>,
          <>The StepIndicator and QuestionHeader number communicate progress so users always know where they are in the flow.</>,
          <>Selected choices use a filled state plus the shortcut badge — status is not signalled by color alone.</>,
        ]}
      />

      <DarkModeSection description="Survey building blocks in both themes — card surfaces, selected states and the success confirmation all resolve from tokens.">
        <div className="space-y-2">
          <ChoiceCard id="dm-a" label="Selected option" shortcut="A" selected />
          <ChoiceCard id="dm-b" label="With description" shortcut="B" description="Additional context line" />
          <ChoiceCard id="dm-c" label="Unselected option" shortcut="C" />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { QuestionCard } from "@/components/survey"

<QuestionCard
  questionNumber={step + 1}
  totalQuestions={steps.length}
  questionType="single"          // "single" | "multiple" | "text" | "dropdown"
  question="What is your primary role?"
  description="This helps us tailor your CRM experience."
  options={roleOptions}
  value={answers[step]}
  onChange={(v) => setAnswer(step, v)}
  onBack={step > 0 ? goBack : undefined}
  onNext={goNext}
  nextLabel={isLast ? "Submit" : "OK"}
  showKeyboardHints
/>`}</CodeBlock>
      </Section>

      {/* Props docs */}
      <ApiSection
        title="API / Props"
        description="QuestionCard — the full single-question shell composing StepIndicator, QuestionHeader, the answer input and QuestionFooter."
        groups={[
          [
            { prop: "questionType", type: '"single" | "multiple" | "text" | "dropdown"', description: "Answer input type (required)." },
            { prop: "question", type: "string", description: "Question text (required)." },
            { prop: "description", type: "string", description: "Optional subtext below the question." },
            { prop: "options", type: "SurveyOption[]", default: "[]", description: "Answer choices for single/multiple/dropdown types." },
            { prop: "value", type: "string | string[]", description: "Controlled answer value." },
            { prop: "onChange", type: "(v: string | string[]) => void", description: "Called on answer change." },
            { prop: "placeholder", type: "string", description: "Placeholder for text/dropdown inputs." },
          ],
          [
            { prop: "questionNumber", type: "number", description: "Current step number (shows header + progress)." },
            { prop: "totalQuestions", type: "number", description: "Total steps for the progress bar." },
            { prop: "onNext", type: "() => void", description: "Called on OK/Next button or Enter key." },
            { prop: "onBack", type: "() => void", description: "Called on Back button; button hidden if omitted." },
            { prop: "onClose", type: "() => void", description: "Renders an X button when provided." },
            { prop: "nextLabel", type: "string", default: '"OK"', description: "Label for the advance button." },
            { prop: "backLabel", type: "string", default: '"Back"', description: "Label for the back button." },
            { prop: "showKeyboardHints", type: "boolean", default: "true", description: "Show the 'press Enter ↵' hint below Next." },
            { prop: "disabled", type: "boolean", default: "false", description: "Disables all interactive elements." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Best Practices"
        dos={[
          "Ask one question per screen to keep the respondent focused.",
          "Show progress with questionNumber / totalQuestions so users know how far they are.",
          "Use 'multiple' for select-all questions and 'single' for exclusive choices.",
          "Keep keyboard hints on for power users completing long surveys.",
        ]}
        donts={[
          "Don't cram several questions into one QuestionCard — split them into steps.",
          "Don't write long option labels; keep choices scannable with the shortcut key.",
          "Don't disable the Next button without an obvious reason (e.g. required answer).",
          "Don't intercept Enter inside multiline text — let it insert newlines.",
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
