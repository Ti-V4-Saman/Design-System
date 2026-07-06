import * as React from "react"
import { Check, CheckCheck, CircleAlert, Clock } from "lucide-react"

import { cn } from "@/lib/utils"
import type { MessageDeliveryStatus } from "./types"

const config: Record<
  MessageDeliveryStatus,
  { Icon: React.ElementType; className: string; label: string }
> = {
  sending: { Icon: Clock, className: "text-current/60", label: "Enviando" },
  sent: { Icon: Check, className: "text-current/70", label: "Enviado" },
  delivered: { Icon: CheckCheck, className: "text-current/70", label: "Entregue" },
  read: { Icon: CheckCheck, className: "text-primary", label: "Lido" },
  failed: { Icon: CircleAlert, className: "text-destructive", label: "Falhou" },
}

/**
 * Delivery status indicator for outgoing messages — clock (sending), single
 * check (sent), double check (delivered) and colored double check (read).
 */
export function MessageStatus({
  status,
  className,
}: {
  status: MessageDeliveryStatus
  className?: string
}) {
  const { Icon, className: toneClass, label } = config[status]
  return (
    <span
      role="img"
      aria-label={label}
      className={cn("inline-flex items-center [&_svg]:size-3.5", toneClass, className)}
    >
      <Icon />
    </span>
  )
}
