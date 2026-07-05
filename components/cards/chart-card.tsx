"use client"

import * as React from "react"
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { CRMBaseCard } from "./base-card"
import type { ChartCardProps } from "./types"

export function ChartCard({
  title,
  description,
  action,
  footer,
  children,
  className,
}: ChartCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {action && <CardAction>{action}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CRMBaseCard>
  )
}
