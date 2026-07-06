"use client"

import * as React from "react"
import { PanelLeft, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"

export type SidebarCollapsible = "icon" | "offcanvas" | "none"

export interface SidebarProps extends React.ComponentProps<"aside"> {
  collapsible?: SidebarCollapsible
}

/**
 * The CRM V4 sidebar rail. Uses the `--sidebar` tokens. On desktop it collapses
 * to an icon rail (`collapsible="icon"`) or off-canvas; on mobile it becomes an
 * overlay drawer controlled by the provider.
 */
export function Sidebar({
  collapsible = "icon",
  className,
  children,
  ...props
}: SidebarProps) {
  const { state, isMobile, openMobile, setOpenMobile } = useSidebar()

  if (isMobile) {
    if (!openMobile) return null
    return (
      <>
        <div
          className="absolute inset-0 z-40 bg-black/30 duration-100 animate-in fade-in-0"
          onClick={() => setOpenMobile(false)}
        />
        <aside
          data-slot="sidebar"
          data-mobile="true"
          className={cn(
            "group/sidebar absolute inset-y-0 left-0 z-50 flex w-[var(--sidebar-width)] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-[var(--shadow-modal)] duration-200 animate-in slide-in-from-left",
            className
          )}
          {...props}
        >
          <button
            type="button"
            onClick={() => setOpenMobile(false)}
            aria-label="Fechar menu"
            className="absolute top-3 right-3 grid size-7 place-items-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&_svg]:size-4"
          >
            <X />
          </button>
          {children}
        </aside>
      </>
    )
  }

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      data-collapsible={collapsible}
      className={cn(
        "group/sidebar relative flex h-full min-h-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-in-out",
        "w-[var(--sidebar-width)]",
        "data-[state=collapsed]:data-[collapsible=icon]:w-[var(--sidebar-width-icon)]",
        "data-[state=collapsed]:data-[collapsible=offcanvas]:w-0 data-[state=collapsed]:data-[collapsible=offcanvas]:overflow-hidden data-[state=collapsed]:data-[collapsible=offcanvas]:border-r-0",
        className
      )}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-header" className={cn("flex flex-col gap-2 p-2", className)} {...props} />
}

export function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn("no-scrollbar flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-2", className)}
      {...props}
    />
  )
}

export function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("flex flex-col gap-2 border-t border-sidebar-border p-2", className)}
      {...props}
    />
  )
}

/** Main content area next to the sidebar. */
export function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn("flex min-h-0 min-w-0 flex-1 flex-col bg-background", className)}
      {...props}
    />
  )
}

/** Toggle button (⌘B). Place it in a header/topbar. */
export function SidebarTrigger({ className, ...props }: React.ComponentProps<"button">) {
  const { toggle } = useSidebar()
  return (
    <button
      type="button"
      data-slot="sidebar-trigger"
      aria-label="Alternar menu lateral"
      onClick={toggle}
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4.5",
        className
      )}
      {...props}
    >
      <PanelLeft />
    </button>
  )
}

/** Thin clickable strip on the sidebar edge to expand/collapse (desktop). */
export function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggle, state } = useSidebar()
  return (
    <button
      type="button"
      data-slot="sidebar-rail"
      aria-label="Alternar menu lateral"
      tabIndex={-1}
      onClick={toggle}
      title={state === "expanded" ? "Recolher" : "Expandir"}
      className={cn(
        "absolute inset-y-0 right-0 z-20 hidden w-1.5 -translate-x-1/2 cursor-w-resize transition-colors hover:bg-sidebar-border sm:block group-data-[state=collapsed]/sidebar:cursor-e-resize",
        className
      )}
      {...props}
    />
  )
}
