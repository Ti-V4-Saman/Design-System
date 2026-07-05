"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { CRMBaseCard } from "./base-card"
import type { ContentCardProps } from "./types"

export function ContentCard({
  title,
  description,
  action,
  footer,
  className,
  children,
}: ContentCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </CRMBaseCard>
  )
}
