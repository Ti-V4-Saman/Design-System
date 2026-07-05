// Primitives (re-exported for convenience)
export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  HoverCardArrow,
} from "@/components/ui/hover-card"

// CRM presets
export { PersonHoverCard, type PersonHoverCardProps } from "./person-hover-card"
export { CompanyHoverCard, type CompanyHoverCardProps } from "./company-hover-card"
export { LeadHoverCard, type LeadHoverCardProps } from "./lead-hover-card"

// Shared building blocks
export {
  HoverHeader,
  HoverMetaList,
  HoverStatGrid,
  HoverActions,
  HoverStatusBadge,
  initials,
} from "./parts"

export type {
  HoverStatus,
  HoverStat,
  HoverMeta,
  HoverAction,
  HoverBadge,
  HoverCardBaseProps,
} from "./types"
