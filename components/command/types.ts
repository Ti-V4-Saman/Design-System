import type { LucideIcon } from "lucide-react"

/** A single actionable row in a {@link CommandGroupData}. */
export interface CommandItemData {
  /** Stable id (used as React key and cmdk value). */
  id: string
  label: string
  icon?: LucideIcon
  /** Keyboard hint shown on the right, e.g. "⌘K" or "G then C". */
  shortcut?: string
  /** Extra terms to match when filtering. */
  keywords?: string[]
  disabled?: boolean
  /** Secondary line under the label (e.g. an email or client name). */
  description?: string
  onSelect?: () => void
}

/** A titled group of command items. */
export interface CommandGroupData {
  heading: string
  items: CommandItemData[]
}

/** One selectable option in a {@link CommandCombobox}. */
export interface ComboboxOption {
  value: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
  /** Extra terms to match when filtering. */
  keywords?: string[]
}
