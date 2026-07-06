"use client"

import * as React from "react"
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react"
import { toast as sonnerToast, type ExternalToast } from "sonner"

/* -------------------------------------------------------------------------------------------------
 * crmToast — semantic toast helper on top of sonner.
 *
 * Each variant ships an on-brand lucide icon tinted with the matching semantic token, so success /
 * warning / danger / info read consistently with the rest of the CRM V4 system regardless of
 * sonner's defaults. `promise`, `loading`, `dismiss` pass through to sonner.
 * -----------------------------------------------------------------------------------------------*/

type Message = React.ReactNode

export const crmToast = {
  message: (message: Message, opts?: ExternalToast) => sonnerToast(message, opts),

  success: (message: Message, opts?: ExternalToast) =>
    sonnerToast.success(message, {
      icon: <CircleCheck className="size-4 text-success" />,
      ...opts,
    }),

  error: (message: Message, opts?: ExternalToast) =>
    sonnerToast.error(message, {
      icon: <CircleX className="size-4 text-destructive" />,
      ...opts,
    }),

  warning: (message: Message, opts?: ExternalToast) =>
    sonnerToast.warning(message, {
      icon: <TriangleAlert className="size-4 text-warning" />,
      ...opts,
    }),

  info: (message: Message, opts?: ExternalToast) =>
    sonnerToast.info(message, {
      icon: <Info className="size-4 text-info" />,
      ...opts,
    }),

  loading: (message: Message, opts?: ExternalToast) => sonnerToast.loading(message, opts),

  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
}
