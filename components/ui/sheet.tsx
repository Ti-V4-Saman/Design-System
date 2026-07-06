"use client"

/* -------------------------------------------------------------------------------------------------
 * Sheet — the shadcn-compatible name for the CRM V4 edge-anchored panel.
 *
 * The Sheet and the Drawer are the SAME primitive: a Radix Dialog anchored to any edge
 * (top/right/bottom/left) with size variants, focus trap, scroll lock and the CRM V4 tokens
 * (bg-card · shadow-modal · border-border). Rather than duplicate ~200 lines of identical logic,
 * this module re-exports the Drawer primitive under the familiar Sheet* names.
 *
 * Use `Sheet*` when you think of the panel as a right/left detail-or-form surface (the common
 * "sheet" mental model); use `Drawer*` when you think of it as a bottom/top tray. Both share the
 * same `side` and `size` props, so either name works for any edge.
 * -----------------------------------------------------------------------------------------------*/

import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerVariants,
} from "@/components/ui/drawer"

const Sheet = Drawer
const SheetTrigger = DrawerTrigger
const SheetClose = DrawerClose
const SheetPortal = DrawerPortal
const SheetOverlay = DrawerOverlay
const SheetContent = DrawerContent
const SheetHeader = DrawerHeader
const SheetBody = DrawerBody
const SheetFooter = DrawerFooter
const SheetTitle = DrawerTitle
const SheetDescription = DrawerDescription
const sheetVariants = drawerVariants

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
}
