import * as React from "react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageStatus } from "./message-status"
import type { MessageDeliveryStatus, MessageVariant } from "./types"

export interface MessageProps extends Omit<React.ComponentProps<"div">, "children"> {
  variant: MessageVariant
  /** Message body — text or a MessageAttachment. */
  children: React.ReactNode
  /** Sender name; shown above incoming messages when `showAuthor`. */
  author?: string
  /** Avatar node/initials; shown for incoming messages when `showAvatar`. */
  avatar?: React.ReactNode
  timestamp?: string
  /** Delivery status (outgoing only). */
  status?: MessageDeliveryStatus
  /** Show the avatar (incoming). Set false for grouped follow-ups. */
  showAvatar?: boolean
  /** Show the author name (incoming). Set true for the first of a group. */
  showAuthor?: boolean
}

/**
 * CRM V4 chat message row. Outgoing messages sit right-aligned in an emerald
 * bubble; incoming sit left with an avatar and muted bubble. Timestamp and
 * delivery status render in a meta row below the bubble.
 */
export function Message({
  variant,
  children,
  author,
  avatar,
  timestamp,
  status,
  showAvatar = variant === "incoming",
  showAuthor = false,
  className,
  ...props
}: MessageProps) {
  const isOutgoing = variant === "outgoing"

  return (
    <div
      data-slot="message"
      data-variant={variant}
      className={cn("flex w-full gap-2", isOutgoing ? "justify-end" : "justify-start", className)}
      {...props}
    >
      {!isOutgoing ? (
        <div className="w-8 shrink-0">
          {showAvatar ? (
            typeof avatar === "string" || avatar == null ? (
              <Avatar size="sm">
                <AvatarFallback>{(avatar as string) ?? "?"}</AvatarFallback>
              </Avatar>
            ) : (
              avatar
            )
          ) : null}
        </div>
      ) : null}

      <div className={cn("flex max-w-[78%] flex-col gap-1", isOutgoing ? "items-end" : "items-start")}>
        {showAuthor && author && !isOutgoing ? (
          <span className="px-0.5 text-xs font-medium text-muted-foreground">{author}</span>
        ) : null}

        <div
          className={cn(
            "w-fit rounded-lg px-3 py-2 text-sm leading-relaxed break-words",
            isOutgoing
              ? "rounded-br-sm bg-primary text-primary-foreground"
              : "rounded-bl-sm bg-muted text-foreground"
          )}
        >
          {children}
        </div>

        {timestamp || status ? (
          <div className="flex items-center gap-1 px-0.5 text-[11px] text-muted-foreground">
            {timestamp ? <span className="tabular-nums">{timestamp}</span> : null}
            {isOutgoing && status ? <MessageStatus status={status} /> : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
