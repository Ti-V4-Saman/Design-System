import type { ColumnDef } from "@tanstack/react-table"
import type * as React from "react"

/** Row density. `comfortable` is the default; `compact` reduces vertical padding for dense CRM lists. */
export type DataTableDensity = "comfortable" | "compact"

export interface FacetedFilterOption {
  label: string
  value: string
}

export interface CRMColumnDef<TData> extends Omit<ColumnDef<TData>, "header"> {
  /** Plain-text header label. Also used as the label in the column-visibility menu. */
  header: string
  accessorKey?: string
  /** Enables the sort affordance + click-to-sort on the header. */
  sortable?: boolean
  align?: "left" | "center" | "right"
  /** Tailwind width utility, e.g. `"w-16"`. */
  width?: string
  /** Exposes a multi-select (faceted) filter for this column in the toolbar. Requires `accessorKey`. */
  filterable?: boolean
  /** Explicit options for the faceted filter. When omitted, options are inferred from the data. */
  filterOptions?: FacetedFilterOption[]
  /** Allow the column to be hidden via the column-visibility menu. Defaults to `true`. */
  enableHiding?: boolean
}

export interface CRMDataTableProps<TData> {
  data: TData[]
  columns: CRMColumnDef<TData>[]
  /** Row density. @default "comfortable" */
  density?: DataTableDensity
  /** Show pagination footer. @default true */
  pagination?: boolean
  /** Initial rows per page. @default 10 */
  pageSize?: number
  /** Render a leading selection checkbox column. @default false */
  selectable?: boolean
  /** Show the global search input in the toolbar. @default false */
  searchable?: boolean
  /** Placeholder for the search input. */
  searchPlaceholder?: string
  /** Enable per-column faceted filters (for columns flagged `filterable`). @default false */
  filterable?: boolean
  /** Enable the column-visibility toggle in the toolbar. @default false */
  columnVisibility?: boolean
  /** Show skeleton rows instead of data. @default false */
  loading?: boolean
  /** Message rendered when there are no rows. */
  emptyMessage?: string
  /** Returns a CSS color for a colored left border per row (e.g. status accent). */
  rowBorderColor?: (row: TData) => string | undefined
  /** Called when a row is clicked. Makes rows interactive (cursor + keyboard). */
  onRowClick?: (row: TData) => void
  /** Extra controls rendered on the right side of the toolbar (e.g. an "Add" button). */
  toolbarActions?: React.ReactNode
}
