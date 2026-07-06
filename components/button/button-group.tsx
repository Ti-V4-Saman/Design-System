import * as React from "react"

import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical"
}

/**
 * CRM V4 button group — connects a set of `<Button>`s into a single segmented
 * control (shared borders, squared inner corners). Works with any Button
 * variant/size; the buttons pick up the group via `data-slot="button-group"`.
 */
export function ButtonGroup({
  orientation = "horizontal",
  className,
  ...props
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical"
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "flex-row",
        // squared inner corners + overlapping borders
        isVertical
          ? "[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none"
          : "[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none",
        // keep the hovered/focused segment above its neighbors so its border shows
        "[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10 [&>*[data-active=true]]:z-10",
        className
      )}
      {...props}
    />
  )
}
