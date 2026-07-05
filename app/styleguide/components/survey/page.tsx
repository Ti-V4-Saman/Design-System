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

// ── Helpers ───────────────────────────────────────────────────────────────────

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}

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
    <div className="p-8 space-y-16">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Survey Question Card</h1>
        <p className="text-muted-foreground mt-1">
          A composable system for focused single-question survey flows with keyboard navigation.
        </p>
      </div>

      {/* Interactive demo */}
      <Section title="Interactive Demo" description="4-step survey — keyboard shortcuts A/B/C… to select, Enter to advance">
        <MultiStepDemo />
      </Section>

      {/* Building blocks */}
      <Section title="Building Blocks">
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
      <Section title="QuestionCard — States">
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

      {/* Props docs */}
      <Section title="Props — QuestionCard">
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Prop</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Default</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["questionType", '"single" | "multiple" | "text" | "dropdown"', "—", "Answer input type (required)"],
                ["question", "string", "—", "Question text (required)"],
                ["description", "string", "—", "Optional subtext below the question"],
                ["options", "SurveyOption[]", "[]", "Answer choices for single/multiple/dropdown types"],
                ["value", "string | string[]", "—", "Controlled answer value"],
                ["onChange", "(v: string | string[]) => void", "—", "Called on answer change"],
                ["questionNumber", "number", "—", "Current step number (shows header + progress)"],
                ["totalQuestions", "number", "—", "Total steps for progress bar"],
                ["onNext", "() => void", "—", "Called on OK/Next button or Enter key"],
                ["onBack", "() => void", "—", "Called on Back button; hides button if omitted"],
                ["onClose", "() => void", "—", "Renders X button if provided"],
                ["nextLabel", "string", '"OK"', "Label for the advance button"],
                ["backLabel", "string", '"Back"', "Label for the back button"],
                ["showKeyboardHints", "boolean", "true", "Show 'press Enter ↵' hint below Next button"],
                ["disabled", "boolean", "false", "Disables all interactive elements"],
                ["placeholder", "string", "—", "Placeholder for text/dropdown inputs"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-muted/20">
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{def}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
