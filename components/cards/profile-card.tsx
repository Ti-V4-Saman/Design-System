"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CRMBaseCard } from "./base-card"
import type { ProfileCardProps } from "./types"

export function ProfileCard({
  avatarSrc,
  avatarFallback,
  name,
  role,
  email,
  actions,
  className,
}: ProfileCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardContent className="flex flex-col items-center gap-4 py-6 text-center">
        <Avatar className="h-16 w-16">
          {avatarSrc && <AvatarImage src={avatarSrc} alt={name} />}
          <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-semibold">{name}</p>
          {role && <p className="text-sm text-muted-foreground">{role}</p>}
          {email && <p className="text-xs text-muted-foreground/70">{email}</p>}
        </div>
        {actions && <div className="flex gap-2">{actions}</div>}
      </CardContent>
    </CRMBaseCard>
  )
}
