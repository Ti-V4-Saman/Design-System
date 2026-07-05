# CRM V4 DataTable Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single reusable `CRMDataTable` component powered by TanStack Table and document it in the styleguide with 5 real tabbed examples (Clients, Projects, Contacts, Tasks, Leads).

**Architecture:** shadcn's `<Table>` primitive provides the HTML shell; TanStack Table v8 provides the headless engine (sorting, pagination, selection); a CRM V4 layer of cell renderers and tokens applies the visual design on top. The styleguide page consumes the same `CRMDataTable` with different `columns` and `data` per tab.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, TanStack Table v8, lucide-react

## Global Constraints

- All colors via design tokens — no hardcoded hex values
- No blue anywhere in the system
- Purple only for "Review" badge variant (`bg-purple-100 text-purple-700`)
- Font: Inter (already applied via `--font-sans`)
- Icons: lucide-react only
- Radius inherits from `--radius` token (0.35rem base)
- Every interactive file needs `"use client"` directive (hooks, state, event handlers)
- Working directory: `/Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75`

---

### Task 1: Install dependencies

**Files:**
- Modify: `components/ui/` (shadcn installs here automatically)
- Modify: `package.json` + `node_modules/` (npm install)

**Interfaces:**
- Produces: `components/ui/table.tsx`, `components/ui/checkbox.tsx`, `components/ui/avatar.tsx`, `components/ui/select.tsx`, `components/ui/input.tsx` — consumed by Tasks 3–7
- Produces: `@tanstack/react-table` package — consumed by Tasks 6–7

- [ ] **Step 1: Install shadcn components**

```bash
npx shadcn@latest add table checkbox avatar select input --cwd /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75
```

Expected: creates/updates `components/ui/table.tsx`, `checkbox.tsx`, `avatar.tsx`, `select.tsx`, `input.tsx`. Prompts answered with defaults (press Enter for each).

- [ ] **Step 2: Install TanStack Table**

```bash
npm --prefix /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 install @tanstack/react-table
```

Expected: `@tanstack/react-table` appears in `node_modules/`.

- [ ] **Step 3: Verify installations**

```bash
ls /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75/components/ui/ && node -e "require('/Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75/node_modules/@tanstack/react-table')" && echo "OK"
```

Expected: lists `table.tsx`, `checkbox.tsx`, `avatar.tsx`, `select.tsx`, `input.tsx` plus `OK`.

- [ ] **Step 4: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/ui/ package.json package-lock.json
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: install table, checkbox, avatar, select, input + @tanstack/react-table"
```

---

### Task 2: Shared types

**Files:**
- Create: `components/data-table/types.ts`

**Interfaces:**
- Produces: `CRMColumnDef<TData>`, `CRMDataTableProps<TData>` — consumed by Tasks 3, 6, 7

- [ ] **Step 1: Create `components/data-table/types.ts`**

```typescript
import type { ColumnDef } from "@tanstack/react-table"

export interface CRMColumnDef<TData> extends Omit<ColumnDef<TData>, "header"> {
  header: string
  sortable?: boolean
  align?: "left" | "center" | "right"
  width?: string
}

export interface CRMDataTableProps<TData> {
  data: TData[]
  columns: CRMColumnDef<TData>[]
  pagination?: boolean
  selectable?: boolean
  searchable?: boolean
  loading?: boolean
  emptyMessage?: string
  rowBorderColor?: (row: TData) => string | undefined
  onRowClick?: (row: TData) => void
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit --project /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75/tsconfig.json 2>&1 | head -20
```

Expected: no errors related to `types.ts` (other pre-existing errors are acceptable).

- [ ] **Step 3: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/data-table/types.ts
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add CRMDataTable shared types"
```

---

### Task 3: Cell renderers

**Files:**
- Create: `components/data-table/cells/cell-link.tsx`
- Create: `components/data-table/cells/cell-avatar.tsx`
- Create: `components/data-table/cells/cell-badge.tsx`
- Create: `components/data-table/cells/cell-progress.tsx`
- Create: `components/data-table/cells/cell-actions.tsx`
- Create: `components/data-table/cells/cell-date.tsx`
- Create: `components/data-table/cells/cell-financial.tsx`
- Create: `components/data-table/cells/cell-multi.tsx`

**Interfaces:**
- Consumes: `components/ui/avatar.tsx` (Task 1)
- Produces: 8 named React components — consumed by Task 7 (styleguide column definitions)

- [ ] **Step 1: Create `components/data-table/cells/cell-link.tsx`**

```tsx
interface CellLinkProps {
  value: string
  onClick?: () => void
}

export function CellLink({ value, onClick }: CellLinkProps) {
  return (
    <button
      onClick={onClick}
      className="text-sm font-medium text-primary hover:underline text-left"
    >
      {value}
    </button>
  )
}
```

- [ ] **Step 2: Create `components/data-table/cells/cell-avatar.tsx`**

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CellAvatarProps {
  name: string
  src?: string
  onClick?: () => void
}

export function CellAvatar({ name, src, onClick }: CellAvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="text-xs bg-muted text-muted-foreground">
          {initials}
        </AvatarFallback>
      </Avatar>
      {onClick ? (
        <button
          onClick={onClick}
          className="text-sm font-medium text-primary hover:underline text-left"
        >
          {name}
        </button>
      ) : (
        <span className="text-sm text-foreground">{name}</span>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Create `components/data-table/cells/cell-badge.tsx`**

```tsx
import { cn } from "@/lib/utils"

type BadgeVariant =
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"
  | "purple"

const variantClasses: Record<BadgeVariant, string> = {
  primary: "bg-primary text-primary-foreground",
  success: "bg-success/15 text-success",
  warning: "bg-warning/20 text-warning-foreground",
  destructive: "bg-destructive/15 text-destructive",
  info: "bg-info text-info-foreground",
  muted: "bg-muted text-muted-foreground",
  purple: "bg-purple-100 text-purple-700",
}

interface CellBadgeProps {
  value: string
  variant?: BadgeVariant
  className?: string
}

export function CellBadge({ value, variant = "muted", className }: CellBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold",
        variantClasses[variant],
        className
      )}
    >
      {value}
    </span>
  )
}
```

- [ ] **Step 4: Create `components/data-table/cells/cell-progress.tsx`**

```tsx
interface CellProgressProps {
  value: number // 0-100
}

export function CellProgress({ value }: CellProgressProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="flex items-center gap-3 min-w-[100px]">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-2 rounded-full bg-success transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">
        {clamped}%
      </span>
    </div>
  )
}
```

- [ ] **Step 5: Create `components/data-table/cells/cell-actions.tsx`**

```tsx
"use client"

import { LayoutGrid, Pencil, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CellActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showView?: boolean
}

export function CellActions({
  onView,
  onEdit,
  onDelete,
  showView = true,
}: CellActionsProps) {
  return (
    <div className="flex items-center gap-1 justify-end opacity-0 group-hover/row:opacity-100 transition-opacity">
      {showView && (
        <button
          onClick={(e) => { e.stopPropagation(); onView?.() }}
          className={cn(
            "p-1.5 rounded text-muted-foreground",
            "hover:text-foreground hover:bg-muted transition-colors"
          )}
          aria-label="View"
        >
          <LayoutGrid className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onEdit?.() }}
        className={cn(
          "p-1.5 rounded text-muted-foreground",
          "hover:text-foreground hover:bg-muted transition-colors"
        )}
        aria-label="Edit"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete?.() }}
        className={cn(
          "p-1.5 rounded text-muted-foreground",
          "hover:text-destructive hover:bg-destructive/10 transition-colors"
        )}
        aria-label="Delete"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
```

- [ ] **Step 6: Create `components/data-table/cells/cell-date.tsx`**

```tsx
interface CellDateProps {
  value: string // ISO date string "YYYY-MM-DD" or display string
  checkOverdue?: boolean
}

function isOverdue(dateStr: string): boolean {
  const parts = dateStr.match(/(\d{2})-(\d{2})-(\d{4})/)
  if (!parts) return false
  const [, day, month, year] = parts
  const date = new Date(`${year}-${month}-${day}`)
  return date < new Date(new Date().setHours(0, 0, 0, 0))
}

export function CellDate({ value, checkOverdue = false }: CellDateProps) {
  const overdue = checkOverdue && isOverdue(value)
  return (
    <span className={overdue ? "text-sm text-destructive" : "text-sm text-foreground"}>
      {value}
    </span>
  )
}
```

- [ ] **Step 7: Create `components/data-table/cells/cell-financial.tsx`**

```tsx
interface CellFinancialProps {
  value: number
  currency?: string
}

export function CellFinancial({ value, currency = "$" }: CellFinancialProps) {
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return (
    <span
      className={
        value === 0
          ? "text-sm tabular-nums text-muted-foreground"
          : "text-sm tabular-nums text-foreground"
      }
    >
      {currency}{formatted}
    </span>
  )
}
```

- [ ] **Step 8: Create `components/data-table/cells/cell-multi.tsx`**

```tsx
interface CellMultiProps {
  values: string[]
}

export function CellMulti({ values }: CellMultiProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {values.map((v, i) => (
        <span key={i} className="text-sm text-foreground">
          {v}
        </span>
      ))}
    </div>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/data-table/cells/
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add CRM V4 cell renderers (link, avatar, badge, progress, actions, date, financial, multi)"
```

---

### Task 4: Pagination component

**Files:**
- Create: `components/data-table/pagination.tsx`

**Interfaces:**
- Consumes: `components/ui/select.tsx` (Task 1)
- Produces: `DataTablePagination` component — consumed by Task 6

- [ ] **Step 1: Create `components/data-table/pagination.tsx`**

```tsx
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
          className="p-1.5 rounded text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                "h-8 w-8 rounded text-sm transition-colors",
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
          className="p-1.5 rounded text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/data-table/pagination.tsx
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add CRM V4 DataTable pagination component"
```

---

### Task 5: Toolbar component

**Files:**
- Create: `components/data-table/toolbar.tsx`

**Interfaces:**
- Consumes: `components/ui/input.tsx` (Task 1)
- Produces: `DataTableToolbar` component — consumed by Task 6

- [ ] **Step 1: Create `components/data-table/toolbar.tsx`**

```tsx
"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import type { Table } from "@tanstack/react-table"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  searchColumn?: string
  searchPlaceholder?: string
}

export function DataTableToolbar<TData>({
  table,
  searchColumn = "name",
  searchPlaceholder = "Search...",
}: DataTableToolbarProps<TData>) {
  const column = table.getColumn(searchColumn)
  const value = (column?.getFilterValue() as string) ?? ""

  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => column?.setFilterValue(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9 h-9 text-sm"
        />
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/data-table/toolbar.tsx
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add CRM V4 DataTable toolbar (search)"
```

---

### Task 6: CRMDataTable main component

**Files:**
- Create: `components/data-table/index.tsx`

**Interfaces:**
- Consumes: `CRMColumnDef`, `CRMDataTableProps` from `types.ts` (Task 2)
- Consumes: `DataTablePagination` from `pagination.tsx` (Task 4)
- Consumes: `DataTableToolbar` from `toolbar.tsx` (Task 5)
- Consumes: `components/ui/table.tsx`, `components/ui/checkbox.tsx` (Task 1)
- Produces: `CRMDataTable<TData>` — the main export consumed by Task 7

- [ ] **Step 1: Create `components/data-table/index.tsx`**

```tsx
"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
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
import type { CRMDataTableProps } from "./types"

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

  const tableColumns = React.useMemo(() => {
    const cols = [...columns]
    if (selectable) {
      cols.unshift({
        id: "__select__",
        header: "",
        enableSorting: false,
        size: 40,
        cell: ({ row }: { row: { getIsSelected: () => boolean; toggleSelected: (v: boolean) => void } }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            onClick={(e) => e.stopPropagation()}
            aria-label="Select row"
            className="border-border"
          />
        ),
        header: ({ table }: { table: { getIsAllPageRowsSelected: () => boolean; getIsSomePageRowsSelected: () => boolean; toggleAllPageRowsSelected: (v: boolean) => void } }) => (
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
      } as CRMDataTableProps<TData>["columns"][number])
    }
    return cols
  }, [columns, selectable])

  const table = useReactTable({
    data,
    columns: tableColumns as Parameters<typeof useReactTable<TData>>[0]["columns"],
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
                  const col = header.column.columnDef as CRMDataTableProps<TData>["columns"][number]
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
                      const col = cell.column.columnDef as CRMDataTableProps<TData>["columns"][number]
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

        {pagination && !loading && table.getRowModel().rows.length > 0 && (
          <DataTablePagination table={table} />
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Install Skeleton if not present**

```bash
npx shadcn@latest add skeleton --cwd /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit --project /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75/tsconfig.json 2>&1 | grep "data-table" | head -20
```

Expected: no errors mentioning files in `components/data-table/`.

- [ ] **Step 4: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add components/data-table/index.tsx components/ui/skeleton.tsx
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add CRMDataTable main component"
```

---

### Task 7: Styleguide page with 5 tabbed examples

**Files:**
- Create: `app/styleguide/components/table/page.tsx`

**Interfaces:**
- Consumes: `CRMDataTable` from `components/data-table/index.tsx` (Task 6)
- Consumes: all 8 cell renderers from `components/data-table/cells/` (Task 3)
- Consumes: `CRMColumnDef` from `components/data-table/types.ts` (Task 2)
- Consumes: `components/ui/tabs.tsx` (install in Step 1)

- [ ] **Step 1: Install Tabs component**

```bash
npx shadcn@latest add tabs --cwd /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75
```

- [ ] **Step 2: Create the styleguide page**

Create `app/styleguide/components/table/page.tsx` with the full content below.

```tsx
"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CRMDataTable } from "@/components/data-table"
import { CellLink } from "@/components/data-table/cells/cell-link"
import { CellAvatar } from "@/components/data-table/cells/cell-avatar"
import { CellBadge } from "@/components/data-table/cells/cell-badge"
import { CellProgress } from "@/components/data-table/cells/cell-progress"
import { CellActions } from "@/components/data-table/cells/cell-actions"
import { CellDate } from "@/components/data-table/cells/cell-date"
import { CellFinancial } from "@/components/data-table/cells/cell-financial"
import { CellMulti } from "@/components/data-table/cells/cell-multi"
import type { CRMColumnDef } from "@/components/data-table/types"

// ─── Mock data ───────────────────────────────────────────────────────────────

type Client = {
  id: number
  name: string
  contact: { name: string; src?: string }
  phone: string
  groups: string[]
  labels: { label: string; variant: "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" }[]
  projects: number
  invoiced: number
  received: number
  due: number
}

const clientsData: Client[] = [
  { id: 101, name: "Demo Client", contact: { name: "Emily Smith" }, phone: "662-709-5341", groups: ["VIP"], labels: [{ label: "Corporate", variant: "info" }], projects: 4, invoiced: 9166, received: 9000, due: 166 },
  { id: 102, name: "Zoila Hauck", contact: { name: "Zoila Hauck" }, phone: "541-993-4595", groups: ["Silver"], labels: [{ label: "Unsatisfied", variant: "destructive" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 103, name: "Halvorson Inc", contact: { name: "Rylee Haley" }, phone: "+1 (586) 467-5376", groups: ["Gold"], labels: [{ label: "Unsatisfied", variant: "destructive" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 104, name: "Hauck Ltd", contact: { name: "Ransom Kuvalis" }, phone: "831-668-9369", groups: ["Gold"], labels: [{ label: "Corporate", variant: "info" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 105, name: "Adrain Ondricka", contact: { name: "Adrain Ondricka" }, phone: "+13807893966", groups: ["VIP"], labels: [{ label: "Referral", variant: "success" }], projects: 3, invoiced: 4913, received: 2913, due: 2000 },
  { id: 106, name: "Blaze Rohan", contact: { name: "Blaze Rohan" }, phone: "1-267-468-6486", groups: ["Gold"], labels: [{ label: "Inactive", variant: "muted" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 107, name: "Birdie Erdman", contact: { name: "Birdie Erdman" }, phone: "+12074609873", groups: ["Gold"], labels: [{ label: "Potential", variant: "primary" }], projects: 1, invoiced: 0, received: 0, due: 0 },
  { id: 108, name: "Sammy Steuber", contact: { name: "Sammy Steuber" }, phone: "1-570-767-9327", groups: ["Gold"], labels: [{ label: "Referral", variant: "success" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 109, name: "Koss, Stracke and Bernier", contact: { name: "Amira Connelly" }, phone: "641-440-8269", groups: ["Gold"], labels: [{ label: "Potential", variant: "primary" }], projects: 0, invoiced: 0, received: 0, due: 0 },
  { id: 110, name: "Abe Bogisich", contact: { name: "Abe Bogisich" }, phone: "+1-434-437-6630", groups: ["VIP"], labels: [{ label: "Inactive", variant: "muted" }], projects: 2, invoiced: 0, received: 0, due: 0 },
]

const clientColumns: CRMColumnDef<Client>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-16" },
  { accessorKey: "name", header: "Name", sortable: true, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", cell: ({ row }) => <CellAvatar name={row.original.contact.name} src={row.original.contact.src} /> },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "groups", header: "Client groups", cell: ({ row }) => (
    <div className="flex flex-col gap-0.5">
      {row.original.groups.map((g) => <span key={g} className="text-sm text-foreground before:content-['•'] before:mr-1.5 before:text-muted-foreground">{g}</span>)}
    </div>
  )},
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l.label} value={l.label} variant={l.variant} />)}
    </div>
  )},
  { accessorKey: "projects", header: "Projects", align: "center" },
  { accessorKey: "invoiced", header: "Total invoiced", align: "right", cell: ({ row }) => <CellFinancial value={row.original.invoiced} /> },
  { accessorKey: "received", header: "Payment Received", align: "right", cell: ({ row }) => <CellFinancial value={row.original.received} /> },
  { accessorKey: "due", header: "Due", align: "right", cell: ({ row }) => <CellFinancial value={row.original.due} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Projects ────────────────────────────────────────────────────────────────

type Project = { id: number; title: string; client: string; price: number | null; startDate: string; deadline: string; progress: number; status: string }

const projectsData: Project[] = [
  { id: 6, title: "Video Animation and Editing", client: "Kevin Johnston", price: null, startDate: "05-07-2026", deadline: "08-09-2023", progress: 100, status: "Completed" },
  { id: 10, title: "Software Development for CRM", client: "Adrain Ondricka", price: 1000, startDate: "19-06-2026", deadline: "24-07-2026", progress: 100, status: "Completed" },
  { id: 3, title: "Social Media Marketing Campaign", client: "Fritsch, Okuneva and Armstrong", price: null, startDate: "23-05-2026", deadline: "27-06-2026", progress: 100, status: "Completed" },
  { id: 29, title: "Social Media Content Calendar", client: "Adrain Ondricka", price: 4000, startDate: "03-07-2026", deadline: "04-10-2023", progress: 100, status: "Completed" },
  { id: 27, title: "Podcast Production and Editing", client: "Adrain Ondricka", price: null, startDate: "24-06-2026", deadline: "11-09-2023", progress: 100, status: "Completed" },
  { id: 26, title: "Infographic Creation and Visualizations", client: "Alta Cassin", price: null, startDate: "31-05-2026", deadline: "28-06-2026", progress: 100, status: "Completed" },
]

const projectColumns: CRMColumnDef<Project>[] = [
  { accessorKey: "id", header: "ID", sortable: true, width: "w-12" },
  { accessorKey: "title", header: "Title", sortable: true, cell: ({ row }) => <CellLink value={row.original.title} /> },
  { accessorKey: "client", header: "Client", cell: ({ row }) => <CellLink value={row.original.client} /> },
  { accessorKey: "price", header: "Price", align: "right", cell: ({ row }) => row.original.price ? <CellFinancial value={row.original.price} /> : <span className="text-muted-foreground text-sm">-</span> },
  { accessorKey: "startDate", header: "Start date", cell: ({ row }) => <CellDate value={row.original.startDate} /> },
  { accessorKey: "deadline", header: "Deadline", cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "progress", header: "Progress", cell: ({ row }) => <CellProgress value={row.original.progress} /> },
  { accessorKey: "status", header: "Status" },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Contacts ────────────────────────────────────────────────────────────────

type Contact = { name: string; clientName: string; jobTitle: string; email: string; phone: string }

const contactsData: Contact[] = [
  { name: "Abe Bogisich", clientName: "Abe Bogisich", jobTitle: "Deburring Machine Operator", email: "abe.bogisich@demo.com", phone: "+1.534.905.5732" },
  { name: "Adrain Ondricka", clientName: "Adrain Ondricka", jobTitle: "Bill and Account Collector", email: "adrain.ondricka@demo.com", phone: "+1-510-925-0980" },
  { name: "Alta Cassin", clientName: "Alta Cassin", jobTitle: "Claims Adjuster", email: "alta.cassin@demo.com", phone: "(386) 854-3326" },
  { name: "Amira Connelly", clientName: "Koss, Stracke and Bernier", jobTitle: "Garment", email: "amira.connelly@demo.com", phone: "629-413-6954" },
  { name: "Ardella Gottlieb", clientName: "Bernier, Collins and Ritchie", jobTitle: "Boilermaker", email: "ardella.gottlieb@demo.com", phone: "573-970-3634" },
  { name: "Birdie Erdman", clientName: "Birdie Erdman", jobTitle: "Interviewer", email: "birdie.erdman@demo.com", phone: "+12169973281" },
  { name: "Blaze Rohan", clientName: "Blaze Rohan", jobTitle: "Captain", email: "blaze.rohan@demo.com", phone: "+1-323-201-9335" },
  { name: "Breanna Keeling", clientName: "Koch PLC", jobTitle: "Receptionist and Information Clerk", email: "breanna.keeling@demo.com", phone: "1-513-468-8764" },
  { name: "Camren Turcotte", clientName: "Weissnat, Stark and Ondricka", jobTitle: "Extruding Machine Operator", email: "camren.turcotte@demo.com", phone: "(402) 965-8252" },
  { name: "Cary Lesch", clientName: "Cary Lesch", jobTitle: "Forensic Investigator", email: "cary.lesch@demo.com", phone: "440.910.5418" },
]

const contactColumns: CRMColumnDef<Contact>[] = [
  { accessorKey: "name", header: "Name", cell: ({ row }) => <CellAvatar name={row.original.name} onClick={() => {}} /> },
  { accessorKey: "clientName", header: "Client name", cell: ({ row }) => <CellLink value={row.original.clientName} /> },
  { accessorKey: "jobTitle", header: "Job Title" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Tasks ───────────────────────────────────────────────────────────────────

type Task = { id: number; title: string; labels: string[]; priority?: boolean; startDate: string; deadline: string; milestone: string; relatedTo: string; assignee: string; collaborators: string; status: string; borderColor: string }

const tasksData: Task[] = [
  { id: 3642, title: "Add company logo and contact details", labels: [], priority: false, startDate: "-", deadline: "17-05-2026", milestone: "Beta Release", relatedTo: "Business Card and Stationery Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
  { id: 3623, title: "Use VR for training and simulations", labels: ["Design"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Beta Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3617, title: "Optimize VR performance and frame rate", labels: [], priority: false, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3615, title: "Develop VR navigation and interactions", labels: ["Feedback"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Virtual Reality Experience Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3578, title: "Create data dashboards and reports", labels: ["Enhancement"], priority: true, startDate: "-", deadline: "07-07-2026", milestone: "Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3576, title: "Perform data visualization and charts", labels: [], priority: true, startDate: "-", deadline: "16-06-2026", milestone: "Beta Release", relatedTo: "Data Analysis and Insights", assignee: "John Doe", collaborators: "-", status: "Review", borderColor: "#AD159E" },
  { id: 3571, title: "Implement product barcodes and labels", labels: [], priority: false, startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
  { id: 3570, title: "Test packaging durability and usability", labels: [], priority: false, startDate: "-", deadline: "24-05-2026", milestone: "Beta Release", relatedTo: "Product Packaging Design", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3546, title: "A/B test ad variations", labels: [], priority: false, startDate: "-", deadline: "26-05-2026", milestone: "Beta Release", relatedTo: "Copywriting for Advertisements", assignee: "John Doe", collaborators: "-", status: "In progress", borderColor: "#00B393" },
  { id: 3530, title: "Design game characters and assets", labels: ["Bug"], priority: false, startDate: "-", deadline: "30-07-2026", milestone: "Release", relatedTo: "Mobile Game Development", assignee: "John Doe", collaborators: "-", status: "To do", borderColor: "#FFB822" },
]

function getTaskStatusVariant(status: string): "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" {
  if (status === "Completed") return "success"
  if (status === "In progress") return "primary"
  if (status === "Review") return "purple"
  if (status === "To do") return "warning"
  return "muted"
}

const taskColumns: CRMColumnDef<Task>[] = [
  { accessorKey: "id", header: "ID", width: "w-16" },
  { accessorKey: "title", header: "Title", cell: ({ row }) => (
    <div className="flex items-center gap-2 flex-wrap">
      <CellLink value={row.original.title} />
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="info" />)}
    </div>
  )},
  { accessorKey: "startDate", header: "Start date" },
  { accessorKey: "deadline", header: "Deadline", cell: ({ row }) => <CellDate value={row.original.deadline} checkOverdue /> },
  { accessorKey: "milestone", header: "Milestone" },
  { accessorKey: "relatedTo", header: "Related to", cell: ({ row }) => <CellLink value={row.original.relatedTo} /> },
  { accessorKey: "assignee", header: "Assigned to", cell: ({ row }) => <CellAvatar name={row.original.assignee} /> },
  { accessorKey: "collaborators", header: "Collaborators" },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <CellBadge value={row.original.status} variant={getTaskStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions showView={false} /> },
]

// ─── Leads ───────────────────────────────────────────────────────────────────

type Lead = { name: string; contact: string; phones: string[]; owner: string; labels: string[]; createdAt: string; status: string }

function getLeadStatusVariant(status: string): "primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple" {
  if (status === "Won") return "success"
  if (status === "Lost") return "destructive"
  if (status === "New") return "warning"
  if (status === "Discussion") return "primary"
  if (status === "Qualified") return "info"
  if (status === "Negotiation") return "purple"
  return "muted"
}

const leadsData: Lead[] = [
  { name: "Rice-Wolf", contact: "Luciano Schaefer", phones: ["+1 (978) 734-9460", "(520) 897-7509"], owner: "Sara Ann", labels: [], createdAt: "04-07-2026", status: "Lost" },
  { name: "Casper-Altenwerth", contact: "Reid Wisoky", phones: ["(657) 269-5760", "(928) 697-8440"], owner: "John Doe", labels: [], createdAt: "03-07-2026", status: "New" },
  { name: "Schaefer, Bayer and Balistreri", contact: "Shaylee Lockman", phones: ["+1-713-354-9763", "+1-270-361-1611"], owner: "Richard Gray", labels: [], createdAt: "03-07-2026", status: "Negotiation" },
  { name: "Sandra Waters", contact: "Sandra Waters", phones: ["(580) 287-2884", "+17796269247"], owner: "Richard Gray", labels: [], createdAt: "03-07-2026", status: "Negotiation" },
  { name: "Abshire-Armstrong", contact: "Sterling Kertzmann", phones: ["1-559-274-0851", "+1.720.644.3711"], owner: "Sara Ann", labels: ["Call this week"], createdAt: "02-07-2026", status: "Discussion" },
  { name: "Thiel, Batz and Homenick", contact: "Maci Adams", phones: ["1-219-687-1393", "1-641-756-4100"], owner: "John Doe", labels: [], createdAt: "02-07-2026", status: "Qualified" },
  { name: "Catalina Kozey", contact: "Catalina Kozey", phones: ["1-724-255-9814", "(956) 835-0809"], owner: "Michael Wood", labels: [], createdAt: "02-07-2026", status: "New" },
  { name: "Rosemary Muller", contact: "Rosemary Muller", phones: ["+1-689-520-5081", "+1-458-615-9110"], owner: "Mark Thomas", labels: [], createdAt: "30-06-2026", status: "Discussion" },
  { name: "McLaughlin LLC", contact: "Zane Schmeler", phones: ["+1 (714) 757-4255", "352-265-1100"], owner: "Sara Ann", labels: [], createdAt: "30-06-2026", status: "New" },
  { name: "Lynch-Quigley", contact: "Grayce Skiles", phones: ["+18609858853", "(423) 472-0784"], owner: "John Doe", labels: [], createdAt: "30-06-2026", status: "Won" },
]

const leadColumns: CRMColumnDef<Lead>[] = [
  { accessorKey: "name", header: "Name", sortable: true, cell: ({ row }) => <CellLink value={row.original.name} /> },
  { accessorKey: "contact", header: "Primary contact", cell: ({ row }) => <CellAvatar name={row.original.contact} /> },
  { accessorKey: "phones", header: "Phone", cell: ({ row }) => <CellMulti values={row.original.phones} /> },
  { accessorKey: "owner", header: "Owner", cell: ({ row }) => <CellAvatar name={row.original.owner} /> },
  { accessorKey: "labels", header: "Labels", cell: ({ row }) => (
    <div className="flex flex-wrap gap-1">
      {row.original.labels.map((l) => <CellBadge key={l} value={l} variant="primary" />)}
    </div>
  )},
  { accessorKey: "createdAt", header: "Created at", cell: ({ row }) => <CellDate value={row.original.createdAt} /> },
  { accessorKey: "status", header: "Status", cell: ({ row }) => <CellBadge value={row.original.status} variant={getLeadStatusVariant(row.original.status)} /> },
  { id: "actions", header: "", align: "right", cell: () => <CellActions /> },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TablePage() {
  const [loadingDemo, setLoadingDemo] = React.useState(false)

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">DataTable</h1>
        <p className="text-sm text-muted-foreground">
          Componente base reutilizável. Cada exemplo usa o mesmo{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CRMDataTable</code>{" "}
          com diferentes <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">columns</code> e{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">data</code>.
        </p>
      </div>

      <Tabs defaultValue="clients">
        <TabsList className="mb-6">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Clients Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Avatar, badges, valores financeiros, 3 action icons, seleção por linha.</p>
            <CRMDataTable data={clientsData} columns={clientColumns} pagination selectable />
          </section>
        </TabsContent>

        <TabsContent value="projects">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Projects Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Progress bar, status texto, datas com overdue detection.</p>
            <CRMDataTable data={projectsData} columns={projectColumns} pagination />
          </section>
        </TabsContent>

        <TabsContent value="contacts">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Contacts Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Avatar + nome, email, telefone, delete icon.</p>
            <CRMDataTable data={contactsData} columns={contactColumns} pagination searchable />
          </section>
        </TabsContent>

        <TabsContent value="tasks">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Tasks Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Checkbox por linha, borda lateral colorida por status, labels inline, datas overdue em vermelho.</p>
            <CRMDataTable
              data={tasksData}
              columns={taskColumns}
              pagination
              selectable
              rowBorderColor={(row) => row.borderColor}
            />
          </section>
        </TabsContent>

        <TabsContent value="leads">
          <section className="mb-4">
            <h2 className="text-base font-semibold mb-1">Leads Table</h2>
            <p className="text-xs text-muted-foreground mb-4">Múltiplos telefones empilhados, avatar no owner, status badges coloridos.</p>
            <CRMDataTable data={leadsData} columns={leadColumns} pagination />
          </section>
        </TabsContent>
      </Tabs>

      {/* States section */}
      <div className="mt-12 border-t border-border pt-8 space-y-8">
        <h2 className="text-lg font-semibold">Estados</h2>

        <div>
          <h3 className="text-sm font-semibold mb-1 text-muted-foreground uppercase tracking-wide">Loading</h3>
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => { setLoadingDemo(true); setTimeout(() => setLoadingDemo(false), 2000) }}
              className="text-xs px-3 py-1.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Simular loading (2s)
            </button>
          </div>
          <CRMDataTable data={loadingDemo ? [] : clientsData.slice(0, 3)} columns={clientColumns} loading={loadingDemo} pagination={false} />
        </div>

        <div>
          <h3 className="text-sm font-semibold mb-1 text-muted-foreground uppercase tracking-wide">Empty State</h3>
          <CRMDataTable data={[]} columns={clientColumns} pagination={false} emptyMessage="Nenhum cliente encontrado. Clique em 'Add client' para começar." />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify the page loads**

Start dev server and navigate to `http://localhost:3001/styleguide/components/table`. Check all 5 tabs render without errors and states section shows loading/empty correctly.

```bash
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/styleguide/components/table
```

Expected: `200`

- [ ] **Step 4: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/styleguide/components/table/ components/ui/tabs.tsx
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: add DataTable styleguide page with 5 tabbed examples"
```

---

### Task 8: Register in navigation

**Files:**
- Modify: `app/styleguide/navigation.ts`

**Interfaces:**
- Consumes: `app/styleguide/components/table/page.tsx` (Task 7) — must exist first
- Produces: "Table" link visible in styleguide sidebar

- [ ] **Step 1: Add Table to navigation**

In `app/styleguide/navigation.ts`, replace the empty Components items array:

```typescript
// Find:
{
  title: "Components",
  items: [
    // Componentes serão adicionados aqui pelo Prompt 2
  ],
}

// Replace with:
{
  title: "Components",
  items: [
    { name: "Table", href: "/styleguide/components/table" },
  ],
}
```

- [ ] **Step 2: Verify sidebar shows "Table" link**

Navigate to `http://localhost:3001/styleguide` and confirm "Table" appears under Components in the sidebar.

- [ ] **Step 3: Commit**

```bash
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 add app/styleguide/navigation.ts
git -C /Users/felipesaman/Documents/GitHub/Design-Sytem/.claude/worktrees/hopeful-kapitsa-581f75 commit -m "feat: register Table in styleguide navigation"
```
