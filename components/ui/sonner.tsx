"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

/* -------------------------------------------------------------------------------------------------
 * Toaster — the sonner toast host, themed to the CRM V4 tokens.
 *
 * Base surface comes from CSS variables sonner reads (--normal-bg/text/border + radius). Buttons,
 * shadow and the semantic type icons are mapped to design tokens via toastOptions.classNames.
 * Mount once (already wired in the root layout); fire toasts with `crmToast` or sonner's `toast`.
 * -----------------------------------------------------------------------------------------------*/

function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      offset={16}
      gap={10}
      toastOptions={{
        classNames: {
          toast: "group rounded-lg! bg-popover! text-popover-foreground! border-border! shadow-[var(--shadow-dropdown)]!",
          title: "text-sm! font-medium! text-foreground!",
          description: "text-sm! text-muted-foreground!",
          actionButton: "rounded-md! bg-primary! text-primary-foreground! text-xs! font-medium!",
          cancelButton: "rounded-md! bg-muted! text-muted-foreground! text-xs! font-medium!",
          closeButton: "rounded-md! border-border! bg-popover! text-muted-foreground! hover:text-foreground!",
          success: "[&_[data-icon]]:text-success!",
          error: "[&_[data-icon]]:text-destructive!",
          warning: "[&_[data-icon]]:text-warning!",
          info: "[&_[data-icon]]:text-info!",
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius-lg)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
