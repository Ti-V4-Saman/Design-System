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
