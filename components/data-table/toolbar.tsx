"use client"

import type * as React from "react"
import { Search, X } from "lucide-react"
import type { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "./faceted-filter"
import { DataTableColumnToggle } from "./column-toggle"
import type { CRMColumnDef } from "./types"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  columns: CRMColumnDef<TData>[]
  searchable?: boolean
  searchPlaceholder?: string
  filterable?: boolean
  columnVisibility?: boolean
  toolbarActions?: React.ReactNode
}

export function DataTableToolbar<TData>({
  table,
  columns,
  searchable = false,
  searchPlaceholder = "Buscar...",
  filterable = false,
  columnVisibility = false,
  toolbarActions,
}: DataTableToolbarProps<TData>) {
  const value = (table.getState().globalFilter as string) ?? ""
  const filterColumns = filterable
    ? columns.filter((c) => c.filterable && c.accessorKey)
    : []
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      {searchable && (
        <div className="relative w-full sm:w-auto sm:max-w-xs sm:flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            placeholder={searchPlaceholder}
            className="h-8 pl-9 text-sm"
            aria-label={searchPlaceholder}
          />
        </div>
      )}

      {filterColumns.map((c) => (
        <DataTableFacetedFilter
          key={c.accessorKey}
          column={table.getColumn(c.accessorKey!)}
          title={c.header}
          options={c.filterOptions}
        />
      ))}

      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
          onClick={() => table.resetColumnFilters()}
        >
          Limpar
          <X data-icon="inline-end" />
        </Button>
      )}

      {(toolbarActions || columnVisibility) && (
        <div className="ml-auto flex items-center gap-2">
          {toolbarActions}
          {columnVisibility && <DataTableColumnToggle table={table} />}
        </div>
      )}
    </div>
  )
}
