"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { Table } from "@tanstack/react-table"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()
  const from = pageIndex * pageSize + 1
  const to = Math.min((pageIndex + 1) * pageSize, totalRows)

  const pages = Array.from({ length: pageCount }, (_, i) => i)

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      {/* Left: rows per page + counter */}
      <div className="flex items-center gap-3">
        <Select
          value={String(pageSize)}
          onValueChange={(v) => table.setPageSize(Number(v))}
        >
          <SelectTrigger className="h-8 w-16 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[10, 25, 50].map((size) => (
              <SelectItem key={size} value={String(size)} className="text-xs">
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">
          {from}–{to} / {totalRows}
        </span>
      </div>

      {/* Right: page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page) => {
          const isActive = page === pageIndex
          const show =
            page === 0 ||
            page === pageCount - 1 ||
            Math.abs(page - pageIndex) <= 1
          if (!show) {
            if (page === 1 && pageIndex > 3) return <span key={page} className="text-muted-foreground px-1">…</span>
            if (page === pageCount - 2 && pageIndex < pageCount - 4) return <span key={page} className="text-muted-foreground px-1">…</span>
            return null
          }
          return (
            <button
              key={page}
              onClick={() => table.setPageIndex(page)}
              className={cn(
                "h-8 w-8 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {page + 1}
            </button>
          )
        })}

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
