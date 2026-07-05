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
