"use client"

import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight, CornerDownLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { QuestionFooterProps } from "./types"

export function QuestionFooter({
  onNext,
  onBack,
  nextLabel = "OK",
  backLabel = "Back",
  showKeyboardHints = true,
  nextDisabled = false,
  className,
}: QuestionFooterProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {/* Left: Back */}
      <div>
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </Button>
        )}
      </div>

      {/* Right: Next + keyboard hint */}
      <div className="flex flex-col items-end gap-1">
        <Button
          variant="default"
          size="sm"
          onClick={onNext}
          disabled={nextDisabled}
          className="gap-1.5"
        >
          {nextLabel}
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
        {showKeyboardHints && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            press Enter
            <CornerDownLeft className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  )
}
