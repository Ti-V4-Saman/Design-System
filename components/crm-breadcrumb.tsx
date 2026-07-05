"use client"

import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface BreadcrumbEntry {
  label: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface CRMBreadcrumbProps {
  items: BreadcrumbEntry[]
  /**
   * When set and the trail is longer than this, the middle is collapsed into an
   * ellipsis dropdown (keeps the first crumb and the last two visible).
   */
  maxItems?: number
  className?: string
}

function Crumb({ item }: { item: BreadcrumbEntry }) {
  const Icon = item.icon
  return (
    <>
      {Icon && <Icon className="size-4 text-muted-foreground" />}
      {item.label}
    </>
  )
}

/**
 * CRM V4 breadcrumb: data-driven trail. Renders links for ancestors and a
 * non-link current page for the last item. When `maxItems` is exceeded, the
 * middle collapses into an accessible ellipsis dropdown. Use the primitives from
 * `@/components/ui/breadcrumb` directly for fully custom markup.
 */
export function CRMBreadcrumb({ items, maxItems, className }: CRMBreadcrumbProps) {
  const collapse = typeof maxItems === "number" && items.length > maxItems
  const before = collapse ? items.slice(0, 1) : items
  const collapsed = collapse ? items.slice(1, items.length - 2) : []
  const after = collapse ? items.slice(items.length - 2) : []
  const visible = collapse ? [...before, ...after] : items

  // Index (within `visible`) after which the ellipsis is inserted.
  const ellipsisAfter = before.length - 1

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {visible.map((item, i) => {
          const isLast = i === visible.length - 1
          return (
            <React.Fragment key={`${item.label}-${i}`}>
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>
                    <Crumb item={item} />
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href}>
                    <Crumb item={item} />
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {/* Ellipsis dropdown for the collapsed middle. */}
              {collapse && i === ellipsisAfter && collapsed.length > 0 && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        aria-label="Mostrar níveis ocultos"
                        className="flex items-center rounded-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <BreadcrumbEllipsis />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {collapsed.map((c, j) => {
                          const Icon = c.icon
                          return (
                            <DropdownMenuItem key={`${c.label}-${j}`} asChild>
                              <a href={c.href ?? "#"}>
                                {Icon && <Icon className="size-4" />}
                                {c.label}
                              </a>
                            </DropdownMenuItem>
                          )
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                </>
              )}

              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
