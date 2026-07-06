import type { VariantProps } from "class-variance-authority"
import type { sheetVariants } from "@/components/ui/sheet"

/** Edge the panel is anchored to. */
export type SheetSide = NonNullable<VariantProps<typeof sheetVariants>["side"]>
/** Width (left/right) or height (top/bottom). */
export type SheetSize = NonNullable<VariantProps<typeof sheetVariants>["size"]>
