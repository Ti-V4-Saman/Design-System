export type QuestionType = "single" | "multiple" | "text" | "dropdown"

export interface SurveyOption {
  id: string
  label: string
  description?: string
}

export interface StepIndicatorProps {
  current: number
  total: number
  className?: string
}

export interface QuestionHeaderProps {
  questionNumber?: number
  question: string
  description?: string
  className?: string
}

export interface ChoiceCardProps {
  id: string
  label: string
  description?: string
  shortcut?: string
  selected?: boolean
  disabled?: boolean
  onSelect?: (id: string) => void
  className?: string
}

export interface OptionListProps {
  options: SurveyOption[]
  value?: string | string[]
  multiple?: boolean
  disabled?: boolean
  onChange?: (value: string | string[]) => void
  className?: string
}

export interface QuestionTextInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  multiline?: boolean
  maxLength?: number
  disabled?: boolean
  className?: string
}

export interface QuestionDropdownProps {
  options: SurveyOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export interface QuestionFooterProps {
  onNext?: () => void
  onBack?: () => void
  nextLabel?: string
  backLabel?: string
  showKeyboardHints?: boolean
  nextDisabled?: boolean
  className?: string
}

export interface QuestionCardProps {
  questionNumber?: number
  totalQuestions?: number
  questionType: QuestionType
  question: string
  description?: string
  options?: SurveyOption[]
  placeholder?: string
  value?: string | string[]
  onChange?: (value: string | string[]) => void
  onNext?: () => void
  onBack?: () => void
  onClose?: () => void
  nextLabel?: string
  backLabel?: string
  showKeyboardHints?: boolean
  disabled?: boolean
  className?: string
}
