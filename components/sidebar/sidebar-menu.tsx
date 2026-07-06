"use client"

import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "./sidebar-context"

// Hide these when the rail is collapsed to icons.
const HIDE_ON_ICON =
  "group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:hidden"

export function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="sidebar-group" className={cn("flex flex-col gap-1 py-1", className)} {...props} />
}

export function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-2 py-1 text-xs font-medium text-sidebar-foreground/60",
        HIDE_ON_ICON,
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return <ul data-slot="sidebar-menu" className={cn("flex flex-col gap-0.5", className)} {...props} />
}

export function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-item" className={cn("group/menu-item relative", className)} {...props} />
}

export interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean
  isActive?: boolean
  /** Label shown in a tooltip when the rail is collapsed to icons. */
  tooltip?: string
}

/**
 * Navigation item. Put an icon and a `<span>` label as children — the label is
 * hidden when the rail collapses to icons, and a tooltip takes over.
 */
export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  className,
  children,
  ...props
}: SidebarMenuButtonProps) {
  const { state, isMobile } = useSidebar()
  const Comp = asChild ? Slot.Root : "button"

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm text-sidebar-foreground/80 outline-none transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "data-[active=true]:bg-sidebar-primary data-[active=true]:font-medium data-[active=true]:text-sidebar-primary-foreground",
        "[&>svg]:size-4.5 [&>svg]:shrink-0 [&>span]:truncate",
        "group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:justify-center group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:px-0",
        `group-data-[state=collapsed]/sidebar:group-data-[collapsible=icon]/sidebar:[&>span]:hidden`,
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  )

  if (tooltip && state === "collapsed" && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right">{tooltip}</TooltipContent>
      </Tooltip>
    )
  }
  return button
}

/** Trailing count/label badge; hidden when collapsed to icons. */
export function SidebarMenuBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs font-medium tabular-nums text-sidebar-foreground/60",
        "group-has-data-[active=true]/menu-item:text-sidebar-primary-foreground",
        HIDE_ON_ICON,
        className
      )}
      {...props}
    />
  )
}

/** Nested submenu list; hidden when collapsed to icons. */
export function SidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        "ml-4 flex flex-col gap-0.5 border-l border-sidebar-border pl-2",
        HIDE_ON_ICON,
        className
      )}
      {...props}
    />
  )
}

export function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<"li">) {
  return <li data-slot="sidebar-menu-sub-item" className={cn("relative", className)} {...props} />
}

export interface SidebarMenuSubButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean
  isActive?: boolean
}

export function SidebarMenuSubButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: SidebarMenuSubButtonProps) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-2 py-1 text-left text-sm text-sidebar-foreground/70 outline-none transition-colors",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        "data-[active=true]:font-medium data-[active=true]:text-sidebar-primary",
        "[&>svg]:size-4 [&>svg]:shrink-0 [&>span]:truncate",
        className
      )}
      {...props}
    />
  )
}
