import * as React from "react"
import { Download, FileText } from "lucide-react"

import { cn } from "@/lib/utils"

export interface MessageAttachmentProps extends React.ComponentProps<"div"> {
  name: string
  /** Human size, e.g. "240 KB". */
  size?: string
  /** Leading icon; defaults to a file icon. */
  icon?: React.ReactNode
  /** Shows a download affordance on the right. */
  downloadable?: boolean
}

/**
 * File attachment rendered inside a Message bubble. Uses `currentColor` tints so
 * it adapts to both the emerald outgoing bubble and the muted incoming bubble.
 */
export function MessageAttachment({
  name,
  size,
  icon,
  downloadable = true,
  className,
  ...props
}: MessageAttachmentProps) {
  return (
    <div
      data-slot="message-attachment"
      className={cn(
        "mt-1 flex items-center gap-2 rounded-md border border-current/15 bg-current/5 px-2 py-1.5",
        className
      )}
      {...props}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded bg-current/10 [&_svg]:size-4">
        {icon ?? <FileText />}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">{name}</span>
        {size ? <span className="text-xs opacity-70">{size}</span> : null}
      </span>
      {downloadable ? <Download className="ml-2 size-4 shrink-0 opacity-70" aria-hidden="true" /> : null}
    </div>
  )
}
