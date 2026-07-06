import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

/**
 * Incoming "typing…" bubble with three animated dots. Mirrors an incoming
 * message so it reads as the other party composing a reply.
 */
export function TypingIndicator({
  avatar,
  className,
  ...props
}: React.ComponentProps<"div"> & { avatar?: React.ReactNode }) {
  return (
    <div
      data-slot="typing-indicator"
      role="status"
      aria-label="Digitando"
      className={cn("flex w-full items-end gap-2", className)}
      {...props}
    >
      <div className="w-8 shrink-0">
        {typeof avatar === "string" || avatar == null ? (
          <Avatar size="sm">
            <AvatarFallback>{(avatar as string) ?? "?"}</AvatarFallback>
          </Avatar>
        ) : (
          avatar
        )}
      </div>
      <div className="flex items-center gap-1 rounded-lg rounded-bl-sm bg-muted px-3 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
