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
    <div className="flex items-center gap-1 justify-end">
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
