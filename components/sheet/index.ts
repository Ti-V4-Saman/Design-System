// Primitives (re-exported for convenience)
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
} from "@/components/ui/sheet"

// CRM presets
export {
  RecordSheet,
  SheetSection,
  SheetField,
  type RecordSheetProps,
} from "./record-sheet"
export { FormSheet, type FormSheetProps } from "./form-sheet"
export { FilterSheet, type FilterSheetProps } from "./filter-sheet"

export type { SheetSide, SheetSize } from "./types"
