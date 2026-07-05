"use client"

import * as React from "react"

export interface UseCommandMenuOptions {
  /** Keyboard key that toggles the menu together with ⌘/Ctrl. Default "k". */
  hotkey?: string
  /** Disables the global keyboard shortcut. */
  disableHotkey?: boolean
}

export interface UseCommandMenuReturn {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

/**
 * Controls a {@link CommandMenu}: exposes `open`/`setOpen` and registers the
 * global ⌘K / Ctrl+K shortcut to toggle it. Ignores the shortcut while typing
 * in another input so it never hijacks form fields.
 */
export function useCommandMenu(
  options: UseCommandMenuOptions = {}
): UseCommandMenuReturn {
  const { hotkey = "k", disableHotkey = false } = options
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (disableHotkey) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === hotkey.toLowerCase() &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [hotkey, disableHotkey])

  const toggle = React.useCallback(() => setOpen((current) => !current), [])

  return { open, setOpen, toggle }
}
