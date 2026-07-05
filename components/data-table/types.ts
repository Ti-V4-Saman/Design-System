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
