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
