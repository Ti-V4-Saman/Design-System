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
