"use client"

import * as React from "react"
import { Check, ListFilter } from "lucide-react"
import type { Column } from "@tanstack/react-table"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { FacetedFilterOption } from "./types"

interface DataTableFacetedFilterProps<TData> {
  column?: Column<TData, unknown>
  title: string
  /** Explicit options; when omitted they are inferred from the column's faceted values. */
  options?: FacetedFilterOption[]
}

/**
 * Multi-select column filter shown as a dashed pill in the toolbar. Selecting values
 * sets an array filter value; the column's `filterFn` keeps rows whose value is in the set.
 */
export function DataTableFacetedFilter<TData>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData>) {
  const facets = column?.getFacetedUniqueValues()

  const resolvedOptions = React.useMemo<FacetedFilterOption[]>(() => {
    if (options?.length) return options
    if (!facets) return []
    return Array.from(facets.keys())
      .filter((k) => k != null && String(k).trim() !== "")
      .map((k) => ({ label: String(k), value: String(k) }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [options, facets])

  const selected = new Set((column?.getFilterValue() as string[]) ?? [])

  const toggle = (value: string) => {
    const next = new Set(selected)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    const arr = Array.from(next)
    column?.setFilterValue(arr.length ? arr : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <ListFilter data-icon="inline-start" />
          {title}
          {selected.size > 0 && (
            <>
              <span className="mx-1 h-4 w-px bg-border" aria-hidden />
              <Badge variant="secondary" className="rounded px-1.5 font-normal">
                {selected.size}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 gap-0 p-0">
        <div className="max-h-64 overflow-y-auto p-1" role="listbox" aria-multiselectable>
          {resolvedOptions.length === 0 ? (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">
              Sem opções
            </p>
          ) : (
            resolvedOptions.map((opt) => {
              const isSelected = selected.has(opt.value)
              const count = facets?.get(opt.value)
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggle(opt.value)}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input"
                    )}
                  >
                    {isSelected && <Check className="size-3" />}
                  </span>
                  <span className="flex-1 truncate">{opt.label}</span>
                  {count != null && (
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {count}
                    </span>
                  )}
                </button>
              )
            })
          )}
        </div>
        {selected.size > 0 && (
          <div className="border-t border-border p-1">
            <button
              type="button"
              onClick={() => column?.setFilterValue(undefined)}
              className="w-full rounded-md px-2 py-1.5 text-center text-sm text-muted-foreground transition-colors hover:bg-muted"
            >
              Limpar filtro
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
