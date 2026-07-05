"use client"

import { SlidersHorizontal } from "lucide-react"
import type { Table } from "@tanstack/react-table"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import type { CRMColumnDef } from "./types"

interface DataTableColumnToggleProps<TData> {
  table: Table<TData>
}

/** Popover of checkboxes to show/hide columns. Only hideable columns with a text header appear. */
export function DataTableColumnToggle<TData>({
  table,
}: DataTableColumnToggleProps<TData>) {
  const columns = table.getAllColumns().filter((column) => {
    const def = column.columnDef as unknown as CRMColumnDef<TData>
    return (
      column.getCanHide() &&
      typeof def.header === "string" &&
      def.header.trim() !== ""
    )
  })

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <SlidersHorizontal data-icon="inline-start" />
          Colunas
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-52 gap-0 p-1">
        <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Exibir colunas
        </p>
        <div className="max-h-64 overflow-y-auto">
          {columns.map((column) => {
            const def = column.columnDef as unknown as CRMColumnDef<TData>
            return (
              <label
                key={column.id}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted"
              >
                <Checkbox
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                />
                <span className="truncate">{def.header}</span>
              </label>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
