"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CRMBaseCard } from "./base-card"
import type { CommentCardProps } from "./types"

export function CommentCard({
  avatarSrc,
  avatarFallback,
  author,
  time,
  content,
  reactions,
  onReply,
  className,
}: CommentCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardContent className="flex gap-3 py-4">
        <Avatar className="h-8 w-8 shrink-0">
          {avatarSrc && <AvatarImage src={avatarSrc} />}
          <AvatarFallback className="text-xs bg-primary/10 text-primary">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{author}</span>
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
          <div className="flex items-center gap-3">
            {reactions && reactions.length > 0 && (
              <div className="flex gap-1.5">
                {reactions.map((r, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground cursor-pointer hover:bg-muted/80"
                  >
                    {r.emoji} {r.count}
                  </span>
                ))}
              </div>
            )}
            {onReply && (
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={onReply}>
                Reply
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </CRMBaseCard>
  )
}
