# CRM V4 DataTable — Component Design Spec

**Date:** 2026-07-04
**Status:** Approved

---

## Goal

Build a single generic `CRMDataTable` component that powers all tabular data views in the CRM V4 product (Clients, Projects, Contacts, Tasks, Leads, and future screens), and document it in the styleguide with 5 real working examples.

---

## Approach

**shadcn data-table block + CRM V4 extension (Approach C)**

- Engine: TanStack Table v8 (headless, via shadcn's data-table block)
- shadcn: infrastructure only — `<Table>`, `<TableHeader>`, `<TableRow>`, etc.
- CRM V4 layer: visual design, tokens, cell renderers, density, states
- No visual shadcn defaults preserved where they conflict with design references

---

## File Structure

```
components/
└── data-table/
    ├── index.tsx               — CRMDataTable: main component
    ├── types.ts                — CRMColumnDef<TData>, shared types
    ├── pagination.tsx          — CRM-styled pagination bar
    ├── toolbar.tsx             — search input + filter chips
    └── cells/
        ├── cell-link.tsx       — clickable name/title (text-primary)
        ├── cell-avatar.tsx     — 32px avatar + name
        ├── cell-badge.tsx      — pill badge with color variant prop
        ├── cell-progress.tsx   — linear progress bar (bg-success fill)
        ├── cell-actions.tsx    — icon row: view / edit / delete
        ├── cell-date.tsx       — date string; overdue renders text-destructive
        ├── cell-financial.tsx  — currency value, tabular-nums, right-aligned
        └── cell-multi.tsx      — stacked list (multiple phones / emails)

app/styleguide/components/table/
└── page.tsx                    — showcase with 5 tabbed examples + states
```

---

## Component API

### CRMDataTable

```tsx
interface CRMDataTableProps<TData> {
  data: TData[]
  columns: CRMColumnDef<TData>[]
  pagination?: boolean          // default: true
  selectable?: boolean          // default: false — adds checkbox column
  searchable?: boolean          // default: false — adds search toolbar
  loading?: boolean             // default: false
  emptyMessage?: string         // default: "Nenhum resultado encontrado"
  rowBorderColor?: (row: TData) => string | undefined  // for Tasks left border
  onRowClick?: (row: TData) => void
}
```

### CRMColumnDef

Extends TanStack's `ColumnDef<TData>` with:

```tsx
interface CRMColumnDef<TData> extends ColumnDef<TData> {
  header: string
  sortable?: boolean            // default: false
  align?: 'left' | 'center' | 'right'  // default: 'left'
  width?: string                // e.g. 'w-32', 'w-48'
}
```

---

## Visual Specification

### Table shell

- Background: `bg-background`
- Border: `border border-border rounded-lg overflow-hidden`
- No outer shadow (shadow lives on the page card wrapper, not the table)

### Column header

- Text: `text-muted-foreground text-xs font-semibold uppercase tracking-wide`
- Padding: `px-4 py-3`
- No header background
- Bottom border: `border-b border-border`
- Sort icon: `ChevronUp` / `ChevronDown` / `ChevronsUpDown` from lucide-react, 14px, `text-muted-foreground`

### Rows

- Height: ~56px (`py-3 px-4` on cells)
- Separator: `border-b border-border` between rows, no border on last row
- Hover: `hover:bg-muted/40 transition-colors`
- Selected (when `selectable`): `bg-primary/5`
- Left border accent (Tasks): `border-l-4` with color from `rowBorderColor(row)` prop

### Cell defaults

- Font: `text-sm text-foreground`
- Padding: `px-4 py-3`

---

## Cell Renderers

### CellLink

```
text-primary text-sm font-medium hover:underline cursor-pointer
```
Used for: client names, project titles, contact names, task titles, lead names.

### CellAvatar

```
flex items-center gap-2
  <Avatar 32px circular />
  <span text-sm>Name</span>
```
Avatar fallback: grey icon placeholder (as in screenshots).
Used for: Primary contact column, Owner column.

### CellBadge

```
rounded-full px-3 py-0.5 text-xs font-semibold
```

Color variants (prop `variant`):

| Variant | bg | text |
|---------|-----|------|
| `primary` | `bg-primary text-primary-foreground` | — |
| `success` | `bg-success/15 text-success` | — |
| `warning` | `bg-warning/15 text-warning-foreground` | — |
| `destructive` | `bg-destructive/15 text-destructive` | — |
| `info` | `bg-info text-info-foreground` | — |
| `muted` | `bg-muted text-muted-foreground` | — |
| `purple` | `bg-purple-100 text-purple-700` | only for Review status |
| `custom` | accepts `className` override | for label colors |

Used for: Labels (Clients), Status (Tasks, Leads, Projects).

### CellProgress

```
<div class="flex items-center gap-3">
  <div class="flex-1 h-2 rounded-full bg-muted">
    <div class="h-2 rounded-full bg-success" style={{ width: `${value}%` }} />
  </div>
  <span class="text-xs text-muted-foreground w-8 text-right">{value}%</span>
</div>
```
Used for: Projects progress column.

### CellActions

Three icon buttons, right-aligned, appear with `opacity-0 group-hover:opacity-100 transition-opacity`:
- `LayoutGrid` — view/detail (16px)
- `Pencil` — edit (16px)
- `X` — delete (16px, `hover:text-destructive`)

All: `text-muted-foreground hover:text-foreground p-1 rounded hover:bg-muted`

### CellDate

```tsx
// If date < today: text-destructive
// Else: text-foreground
```
Format: `DD-MM-YYYY` (matching screenshots).

### CellFinancial

```
text-sm tabular-nums text-right
// Zero values: text-muted-foreground
// Positive: text-foreground
```

### CellMulti

```
<div class="flex flex-col gap-0.5">
  {values.map(v => <span class="text-sm">{v}</span>)}
</div>
```
Used for: multiple phones, multiple emails.

---

## Pagination

Left side:
- Rows-per-page select: `10 | 25 | 50` (shadcn `<Select>`)
- Counter: `"1-10 / 50"` — `text-sm text-muted-foreground`

Right side:
- Prev `<ChevronLeft>` button
- Page number buttons (max 5 visible, with `…` for ellipsis)
- Next `<ChevronRight>` button
- Active page: `bg-primary text-primary-foreground rounded-md w-8 h-8`
- Inactive page: `hover:bg-muted rounded-md w-8 h-8`
- Disabled prev/next: `opacity-50 cursor-not-allowed`

---

## Toolbar (when `searchable`)

```
<div class="flex items-center gap-2 mb-4">
  <Input placeholder="Search..." icon={Search} />
  [filter chips if provided]
</div>
```

---

## States

### Loading

Replace table body with N skeleton rows (N = page size):

```
<Skeleton class="h-4 w-full rounded" /> per cell
animate-pulse
```

### Empty

```
<div class="flex flex-col items-center justify-center py-16 gap-2">
  <InboxIcon class="w-10 h-10 text-muted-foreground/40" />
  <p class="text-sm text-muted-foreground">{emptyMessage}</p>
</div>
```

### Selection (when `selectable`)

- First column: `<Checkbox>` per row + `<Checkbox>` in header (select all)
- Selected rows get `bg-primary/5` background
- Row checkbox: `border-border`, checked state uses `bg-primary border-primary`

---

## Styleguide Page

Path: `app/styleguide/components/table/page.tsx`

Layout: page header + tabs with 5 examples:

### Tab 1: Clients

Columns: ID · Name (CellLink) · Primary contact (CellAvatar) · Phone · Client groups (bullet list) · Labels (CellBadge × N) · Projects · Total invoiced (CellFinancial) · Payment received (CellFinancial) · Due (CellFinancial) · Actions (CellActions)

Props: `pagination selectable`

Mock data: 10 rows similar to screenshot (Demo Client, Zoila Hauck, etc.)

### Tab 2: Projects

Columns: ID · Title (CellLink) · Client (CellLink) · Price (CellFinancial) · Start date (CellDate) · Deadline (CellDate) · Progress (CellProgress) · Status (text) · Actions (CellActions)

Props: `pagination`

Mock data: 6 rows (Video Animation, Software Development CRM, etc.)

### Tab 3: Contacts

Columns: Name (CellAvatar + CellLink) · Client name (CellLink) · Job Title · Email · Phone · Delete icon

Props: `pagination`

Mock data: 10 rows.

### Tab 4: Tasks

Columns: Checkbox (selectable) · ID · Title (CellLink + inline CellBadge labels) · Start date · Deadline (CellDate, overdue detection) · Milestone · Related to (CellLink) · Assigned to (CellAvatar) · Collaborators · Status (CellBadge) · Actions

Props: `pagination selectable rowBorderColor`

Row left border: color per category (orange for overdue, green for in-progress, etc.)

Mock data: 10 rows.

### Tab 5: Leads

Columns: Name (CellLink) · Primary contact (CellAvatar) · Phone (CellMulti) · Owner (CellAvatar) · Labels (CellBadge) · Created at · Status (CellBadge) · Actions

Props: `pagination`

Mock data: 10 rows.

### Below the tabs (all examples share):

- **States section:** Loading skeleton (toggle button) · Empty state · Selected rows demo
- **Dark mode note:** "Toggle dark mode via the sun/moon icon in the sidebar to preview"

---

## Navigation Registration

Add to `app/styleguide/navigation.ts` Components section:

```ts
{ name: "Table", href: "/styleguide/components/table" }
```

---

## Dependencies to Install

```bash
npx shadcn@latest add table checkbox avatar select input
```

TanStack Table is already a peer dep of shadcn's data-table; install explicitly:

```bash
npm install @tanstack/react-table
```

---

## Constraints

- All colors via design tokens — no hardcoded hex values
- No blue anywhere
- Purple only for "Review" badge variant
- Font: Inter (already applied)
- Radius: inherits from `--radius` token (0.35rem base)
- Action icons from `lucide-react` only
- Accessibility: keyboard navigation inherited from TanStack + shadcn primitives
- Dark mode: all tokens already support it via `.dark` class
