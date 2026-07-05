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
