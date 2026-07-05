"use client"

import * as React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import type { CommandGroupData, CommandItemData } from "./types"

export interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Static groups always available (e.g. Navegação, Ações rápidas). */
  groups?: CommandGroupData[]
  /** Items shown under "Recentes" while the query is empty. */
  recent?: CommandItemData[]
  /**
   * Async entity search. Called (debounced) as the user types; return the
   * matching items. While it resolves, a loading skeleton is shown.
   */
  onSearch?: (query: string) => Promise<CommandItemData[]>
  /** Heading for the async results group. */
  searchHeading?: string
  placeholder?: string
  emptyMessage?: string
  title?: string
  description?: string
}

/** Substring match against the label, description and keywords. */
function matches(item: CommandItemData, query: string) {
  if (!query) return true
  const haystack = [item.label, item.description, ...(item.keywords ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
  return haystack.includes(query.toLowerCase())
}

/**
 * CRM V4 global command palette (⌘K). Controlled via `open`/`onOpenChange`
 * (see {@link useCommandMenu}). Combines static navigation/action groups with
 * optional async entity search, plus loading and empty states.
 */
export function CommandMenu({
  open,
  onOpenChange,
  groups = [],
  recent = [],
  onSearch,
  searchHeading = "Resultados",
  placeholder = "Digite um comando ou busque…",
  emptyMessage = "Nenhum resultado encontrado.",
  title = "Paleta de comandos",
  description = "Busque e execute ações do CRM.",
}: CommandMenuProps) {
  const [query, setQuery] = React.useState("")
  const [results, setResults] = React.useState<CommandItemData[]>([])
  const [loading, setLoading] = React.useState(false)

  // Keep the latest onSearch without re-triggering the debounce effect.
  const searchRef = React.useRef(onSearch)
  React.useEffect(() => {
    searchRef.current = onSearch
  })

  // Debounced async search. setState only happens inside the timeout callback.
  React.useEffect(() => {
    const q = query.trim()
    if (!searchRef.current || q.length < 1) return
    const handle = setTimeout(async () => {
      try {
        const found = (await searchRef.current?.(q)) ?? []
        setResults(found)
      } finally {
        setLoading(false)
      }
    }, 250)
    return () => clearTimeout(handle)
  }, [query])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    if (onSearch && value.trim()) {
      setLoading(true)
    } else {
      setResults([])
      setLoading(false)
    }
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setQuery("")
      setResults([])
      setLoading(false)
    }
    onOpenChange(next)
  }

  const runItem = (item: CommandItemData) => {
    item.onSelect?.()
    handleOpenChange(false)
  }

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => matches(item, query)),
    }))
    .filter((group) => group.items.length > 0)

  const showRecent = !query && recent.length > 0
  const staticCount =
    filteredGroups.reduce((sum, g) => sum + g.items.length, 0) +
    (showRecent ? recent.length : 0)
  const total = staticCount + results.length
  const showEmpty = !loading && query.trim().length > 0 && total === 0

  const renderItem = (item: CommandItemData) => {
    const Icon = item.icon
    return (
      <CommandItem
        key={item.id}
        value={item.id}
        disabled={item.disabled}
        onSelect={() => runItem(item)}
      >
        {Icon ? <Icon className="text-muted-foreground" /> : null}
        <div className="flex min-w-0 flex-col">
          <span className="truncate">{item.label}</span>
          {item.description ? (
            <span className="truncate text-xs text-muted-foreground">
              {item.description}
            </span>
          ) : null}
        </div>
        {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
      </CommandItem>
    )
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={handleOpenChange}
      title={title}
      description={description}
    >
      <Command shouldFilter={false} className="rounded-none bg-transparent p-0">
        <CommandInput
          value={query}
          onValueChange={handleQueryChange}
          placeholder={placeholder}
        />
        <CommandList>
          {loading ? (
            <div className="space-y-1 p-2" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-center gap-2 px-1 py-1.5">
                  <Skeleton className="size-4 rounded-sm" />
                  <Skeleton className="h-4 flex-1 rounded-sm" />
                </div>
              ))}
            </div>
          ) : null}

          {showEmpty ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : null}

          {showRecent ? (
            <CommandGroup heading="Recentes">
              {recent.map(renderItem)}
            </CommandGroup>
          ) : null}

          {filteredGroups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map(renderItem)}
            </CommandGroup>
          ))}

          {results.length > 0 ? (
            <CommandGroup heading={searchHeading}>
              {results.map(renderItem)}
            </CommandGroup>
          ) : null}
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
