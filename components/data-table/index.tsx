"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type RowSelectionState,
} from "@tanstack/react-table"
import {
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Inbox,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { DataTablePagination } from "./pagination"
import { DataTableToolbar } from "./toolbar"
import type { CRMColumnDef, CRMDataTableProps } from "./types"

export function CRMDataTable<TData>({
  data,
  columns,
  pagination = true,
  selectable = false,
  searchable = false,
  loading = false,
  emptyMessage = "Nenhum resultado encontrado",
  rowBorderColor,
  onRowClick,
}: CRMDataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const tableColumns = React.useMemo((): ColumnDef<TData>[] => {
    const cols = columns as unknown as ColumnDef<TData>[]
    if (selectable) {
      const selectCol: ColumnDef<TData> = {
        id: "__select__",
        enableSorting: false,
        size: 40,
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select row"
            className="border-border"
          />
        ),
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
            }
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
            className="border-border"
          />
        ),
      }
      return [selectCol, ...cols]
    }
    return cols
  }, [columns, selectable])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  const alignClass = (align?: string) => {
    if (align === "center") return "text-center"
    if (align === "right") return "text-right"
    return "text-left"
  }

  const skeletonRows = Array.from({ length: table.getState().pagination.pageSize || 10 })

  return (
    <div className="w-full">
      {searchable && <DataTableToolbar table={table} />}

      <div className="border border-border rounded-lg overflow-hidden bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border">
                {headerGroup.headers.map((header) => {
                  const col = header.column.columnDef as unknown as CRMColumnDef<TData>
                  const canSort = col.sortable && header.column.getCanSort()
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        alignClass(col.align),
                        col.width,
                        canSort && "cursor-pointer select-none"
                      )}
                      onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                    >
                      <div className={cn("flex items-center gap-1", col.align === "right" && "justify-end")}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                        {canSort && (
                          <span className="text-muted-foreground">
                            {header.column.getIsSorted() === "asc" ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ChevronDown className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                            )}
                          </span>
                        )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {loading ? (
              skeletonRows.map((_, i) => (
                <TableRow key={i} className="border-b border-border last:border-0">
                  {tableColumns.map((_, j) => (
                    <TableCell key={j} className="px-4 py-3">
                      <Skeleton className="h-4 w-full rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className="py-16">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Inbox className="h-10 w-10 text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => {
                const borderColor = rowBorderColor?.(row.original)
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() ? "selected" : undefined}
                    onClick={() => onRowClick?.(row.original)}
                    className={cn(
                      "group/row border-b border-border last:border-0 transition-colors",
                      "hover:bg-muted/40",
                      row.getIsSelected() && "bg-primary/5",
                      onRowClick && "cursor-pointer"
                    )}
                    style={borderColor ? { borderLeft: `4px solid ${borderColor}` } : undefined}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const col = cell.column.columnDef as unknown as CRMColumnDef<TData>
                      return (
                        <TableCell
                          key={cell.id}
                          className={cn("px-4 py-3", alignClass(col.align), col.width)}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>

        {pagination && !loading && data.length > 0 && (
          <DataTablePagination table={table} />
        )}
      </div>
    </div>
  )
}
