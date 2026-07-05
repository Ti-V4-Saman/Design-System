"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { StepIndicator } from "./step-indicator"
import { QuestionHeader } from "./question-header"
import { OptionList } from "./option-list"
import { QuestionTextInput } from "./question-text-input"
import { QuestionDropdown } from "./question-dropdown"
import { QuestionFooter } from "./question-footer"
import type { QuestionCardProps } from "./types"

export function QuestionCard({
  questionNumber,
  totalQuestions,
  questionType,
  question,
  description,
  options = [],
  placeholder,
  value,
  onChange,
  onNext,
  onBack,
  onClose,
  nextLabel = "OK",
  backLabel = "Back",
  showKeyboardHints = true,
  disabled = false,
  className,
}: QuestionCardProps) {
  const hasAnswer = React.useMemo(() => {
    if (!value) return false
    if (Array.isArray(value)) return value.length > 0
    return value.trim().length > 0
  }, [value])

  // Enter key advances when answer is present
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Enter") return
      const tag = (e.target as HTMLElement).tagName
      // Allow Enter in textareas for newlines; only intercept when target is not a textarea
      if (tag === "TEXTAREA") return
      if (disabled) return
      if (!hasAnswer) return
      e.preventDefault()
      onNext?.()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [hasAnswer, onNext, disabled])

  return (
    <div
      className={cn(
        "relative w-full max-w-[560px] rounded-xl border border-border bg-card",
        "shadow-[var(--shadow-modal)] p-8 flex flex-col gap-6",
        className
      )}
    >
      {/* Close button */}
      {onClose && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 h-7 w-7 text-muted-foreground"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Step indicator */}
      {questionNumber !== undefined && totalQuestions !== undefined && (
        <StepIndicator current={questionNumber} total={totalQuestions} />
      )}

      {/* Question header */}
      <QuestionHeader
        questionNumber={questionNumber}
        question={question}
        description={description}
      />

      {/* Answer area */}
      <div>
        {(questionType === "single" || questionType === "multiple") && (
          <OptionList
            options={options}
            value={value}
            multiple={questionType === "multiple"}
            disabled={disabled}
            onChange={onChange}
          />
        )}

        {questionType === "text" && (
          <QuestionTextInput
            value={typeof value === "string" ? value : ""}
            onChange={(v) => onChange?.(v)}
            placeholder={placeholder}
            multiline
            disabled={disabled}
          />
        )}

        {questionType === "dropdown" && (
          <QuestionDropdown
            options={options}
            value={typeof value === "string" ? value : ""}
            onChange={(v) => onChange?.(v)}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
      </div>

      {/* Footer */}
      <QuestionFooter
        onNext={onNext}
        onBack={onBack}
        nextLabel={nextLabel}
        backLabel={backLabel}
        showKeyboardHints={showKeyboardHints}
        nextDisabled={!hasAnswer || disabled}
      />
    </div>
  )
}
