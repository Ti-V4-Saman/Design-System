"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchPlaceholder?: string
}

export function DataTableToolbar<TData>({
  table,
  searchPlaceholder = "Search...",
}: DataTableToolbarProps<TData>) {
  const value = (table.getState().globalFilter as string) ?? ""

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9 h-9 text-sm"
        />
      </div>
    </div>
  )
}
