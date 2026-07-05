"use client"

export type CardVariant =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info"
  | "muted"

export interface CRMBaseCardProps {
  clickable?: boolean
  selected?: boolean
  disabled?: boolean
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}

// StatCard
export interface StatCardProps {
  title: string
  value: string | number
  description?: string
  variant?: CardVariant
  icon?: React.ReactNode
  trend?: { value: number; label?: string }
  className?: string
}

// ContentCard
export interface ContentCardProps {
  title: string
  description?: string
  action?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

// EntityCard
export interface EntityCardProps {
  icon?: React.ReactNode
  iconVariant?: CardVariant
  title: string
  subtitle?: string
  meta?: string
  badge?: { label: string; variant?: CardVariant }
  action?: React.ReactNode
  clickable?: boolean
  selected?: boolean
  onClick?: () => void
  className?: string
}

// ProfileCard
export interface ProfileCardProps {
  avatarSrc?: string
  avatarFallback: string
  name: string
  role?: string
  email?: string
  actions?: React.ReactNode
  className?: string
}

// DashboardWidgetCard
export interface WidgetCardProps {
  title: string
  metric: string | number
  metricLabel?: string
  trend?: { value: number; label?: string }
  description?: string
  action?: React.ReactNode
  children?: React.ReactNode
  className?: string
}

// ChartCard
export interface ChartCardProps {
  title: string
  description?: string
  action?: React.ReactNode
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

// ActivityCard
export interface ActivityItem {
  id: string
  avatarSrc?: string
  avatarFallback: string
  actor: string
  action: string
  target?: string
  time: string
  icon?: React.ReactNode
  iconVariant?: CardVariant
}
export interface ActivityCardProps {
  items: ActivityItem[]
  title?: string
  className?: string
}

// TimelineCard
export interface TimelineEvent {
  id: string
  title: string
  description?: string
  time: string
  icon?: React.ReactNode
  variant?: CardVariant
}
export interface TimelineCardProps {
  events: TimelineEvent[]
  title?: string
  className?: string
}

// TaskCard
export interface TaskCardProps {
  id: string
  title: string
  completed?: boolean
  priority?: "low" | "medium" | "high"
  assigneeAvatarSrc?: string
  assigneeAvatarFallback?: string
  dueDate?: string
  tags?: string[]
  onToggle?: (id: string, completed: boolean) => void
  onClick?: () => void
  className?: string
}

// KanbanCard
export interface KanbanCardProps {
  id: string
  title: string
  description?: string
  labels?: Array<{ label: string; variant?: CardVariant }>
  assigneeAvatarFallback?: string
  assigneeAvatarSrc?: string
  priority?: "low" | "medium" | "high"
  dueDate?: string
  onClick?: () => void
  className?: string
}

// ProjectCard
export interface ProjectCardProps {
  title: string
  description?: string
  progress: number
  status?: "active" | "paused" | "completed"
  team?: Array<{ fallback: string; src?: string }>
  dueDate?: string
  onClick?: () => void
  className?: string
}

// AttachmentCard
export interface AttachmentCardProps {
  fileName: string
  fileSize?: string
  fileType?: string
  uploadedBy?: string
  uploadedAt?: string
  onDownload?: () => void
  onDelete?: () => void
  className?: string
}

// CommentCard
export interface CommentCardProps {
  avatarSrc?: string
  avatarFallback: string
  author: string
  time: string
  content: string
  reactions?: Array<{ emoji: string; count: number }>
  onReply?: () => void
  className?: string
}

// EmptyStateCard
export interface EmptyStateCardProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

// IntegrationCard
export interface IntegrationCardProps {
  icon?: React.ReactNode
  iconVariant?: CardVariant
  name: string
  description?: string
  connected?: boolean
  onToggle?: (connected: boolean) => void
  className?: string
}

// QuickActionCard
export interface QuickActionCardProps {
  icon: React.ReactNode
  iconVariant?: CardVariant
  label: string
  description?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
}
