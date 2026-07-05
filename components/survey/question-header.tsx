"use client"

import { cn } from "@/lib/utils"
import type { QuestionHeaderProps } from "./types"

export function QuestionHeader({
  questionNumber,
  question,
  description,
  className,
}: QuestionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {questionNumber !== undefined && (
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">
          Question {questionNumber}
        </span>
      )}
      <h2 className="text-xl font-semibold leading-snug text-foreground">{question}</h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
