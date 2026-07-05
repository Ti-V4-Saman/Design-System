"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"
import { Info } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export interface LabelProps
  extends React.ComponentProps<typeof LabelPrimitive.Root> {
  /** Marca o campo como obrigatório com um asterisco. */
  required?: boolean
  /** Marca o campo como opcional com uma etiqueta discreta. */
  optional?: boolean
  /** Dica contextual exibida num tooltip ao lado do rótulo. */
  hint?: React.ReactNode
  /** Densidade tipográfica. @default "default" */
  size?: "sm" | "default"
}

function Label({
  className,
  children,
  required = false,
  optional = false,
  hint,
  size = "default",
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      data-size={size}
      className={cn(
        "flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        size === "sm" ? "text-xs" : "text-sm",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span aria-hidden="true" className="-ml-1 text-destructive">
          *
        </span>
      )}
      {optional && !required && (
        <span className="text-xs font-normal text-muted-foreground">
          (opcional)
        </span>
      )}
      {hint && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Mais informações"
                className="inline-flex rounded-sm text-muted-foreground/70 outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <Info className="size-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent>{hint}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </LabelPrimitive.Root>
  )
}

export { Label }
