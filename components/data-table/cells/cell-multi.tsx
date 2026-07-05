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
