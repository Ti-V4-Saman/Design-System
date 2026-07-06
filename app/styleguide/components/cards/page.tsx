"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CRMBaseCard,
  StatCard, ContentCard,
  EntityCard, ProfileCard,
  WidgetCard, ChartCard,
  ActivityCard, TimelineCard,
  TaskCard, KanbanCard, ProjectCard,
  AttachmentCard, CommentCard, EmptyStateCard,
  IntegrationCard, QuickActionCard,
} from "@/components/cards"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Users, TrendingUp, DollarSign, ShoppingCart, BarChart2,
  Mail, MessageSquare, GitBranch, Zap, Plus, FileText,
  UserPlus, Send, Calendar,
} from "lucide-react"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  DesignNotes,
  GuidelinesSection,
  RelatedComponents,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const TABS = [
  "Foundation",
  "People",
  "Dashboard",
  "Work",
  "Feed",
  "Utility",
]

export default function CardsStyleguidePage() {
  const [activeTab, setActiveTab] = React.useState("Foundation")

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Card Family"
        description="17 reusable card components sharing the same CRM V4 visual language — all built on the CRMBaseCard shell and the shared CardVariant token set (default · primary · success · warning · destructive · info · muted)."
      />

      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Foundation */}
        {activeTab === "Foundation" && (
          <div className="flex flex-col gap-8">
            <Section title="Base Card">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CRMBaseCard>
                  <CardContent className="py-4 text-sm text-muted-foreground">Default card shell</CardContent>
                </CRMBaseCard>
                <CRMBaseCard clickable onClick={() => {}}>
                  <CardContent className="py-4 text-sm text-muted-foreground">Clickable card</CardContent>
                </CRMBaseCard>
                <CRMBaseCard selected>
                  <CardContent className="py-4 text-sm text-muted-foreground">Selected card</CardContent>
                </CRMBaseCard>
              </div>
            </Section>

            <Section title="Stat / KPI Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Revenue"
                  value="$48,295"
                  variant="success"
                  icon={<DollarSign />}
                  trend={{ value: 12.5, label: "vs last month" }}
                />
                <StatCard
                  title="New Users"
                  value="1,284"
                  variant="primary"
                  icon={<Users />}
                  trend={{ value: 8.2, label: "vs last week" }}
                />
                <StatCard
                  title="Orders"
                  value="342"
                  variant="warning"
                  icon={<ShoppingCart />}
                  trend={{ value: -3.1, label: "vs yesterday" }}
                />
                <StatCard
                  title="Conversion"
                  value="3.6%"
                  variant="destructive"
                  icon={<TrendingUp />}
                  description="Based on last 30 days"
                />
              </div>
            </Section>

            <Section title="Content Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContentCard
                  title="Q3 Performance Report"
                  description="Summary of key metrics and initiatives for the third quarter."
                  action={<Button size="sm" variant="outline">View</Button>}
                  footer={<span className="text-xs text-muted-foreground">Updated 2 days ago</span>}
                >
                  <p className="text-sm text-muted-foreground">
                    Revenue targets exceeded by 12%. Customer satisfaction scores improved across all segments.
                  </p>
                </ContentCard>
                <ContentCard
                  title="Team Standup Notes"
                  description="Daily sync — July 5"
                  action={<Button size="sm" variant="ghost">Edit</Button>}
                >
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Sprint planning completed</li>
                    <li>Design review scheduled for Friday</li>
                    <li>3 blockers resolved</li>
                  </ul>
                </ContentCard>
              </div>
            </Section>
          </div>
        )}

        {/* People */}
        {activeTab === "People" && (
          <div className="flex flex-col gap-8">
            <Section title="Entity Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EntityCard
                  icon={<Users />}
                  iconVariant="primary"
                  title="Acme Corporation"
                  subtitle="Enterprise customer · 240 seats"
                  meta="Last activity 2 days ago"
                  badge={{ label: "Active", variant: "success" }}
                  clickable
                  onClick={() => {}}
                />
                <EntityCard
                  icon={<Mail />}
                  iconVariant="info"
                  title="Invoice #1024"
                  subtitle="$12,400 · Due Jul 20"
                  badge={{ label: "Pending", variant: "warning" }}
                  action={<Button size="sm" variant="outline">Pay</Button>}
                />
                <EntityCard
                  icon={<ShoppingCart />}
                  iconVariant="destructive"
                  title="Order #8821"
                  subtitle="Cancelled · Jul 3"
                  badge={{ label: "Cancelled", variant: "destructive" }}
                />
                <EntityCard
                  icon={<BarChart2 />}
                  iconVariant="success"
                  title="Deal: Series B"
                  subtitle="$2.4M · Closing Jul 30"
                  badge={{ label: "Won", variant: "success" }}
                />
              </div>
            </Section>

            <Section title="Profile Card">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ProfileCard
                  avatarFallback="JS"
                  name="Jane Smith"
                  role="Product Designer"
                  email="jane@v4company.com"
                  actions={
                    <>
                      <Button size="sm" variant="outline">Message</Button>
                      <Button size="sm">Follow</Button>
                    </>
                  }
                />
                <ProfileCard
                  avatarFallback="MR"
                  name="Marcus Rivera"
                  role="Senior Engineer"
                  email="marcus@v4company.com"
                  actions={<Button size="sm" variant="outline">View Profile</Button>}
                />
                <ProfileCard
                  avatarFallback="AT"
                  name="Ana Torres"
                  role="Account Executive"
                  email="ana@v4company.com"
                />
              </div>
            </Section>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "Dashboard" && (
          <div className="flex flex-col gap-8">
            <Section title="Widget Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <WidgetCard
                  title="Monthly Active Users"
                  metric="24,531"
                  trend={{ value: 5.2, label: "vs last month" }}
                  description="Based on unique sessions"
                  action={<Button size="sm" variant="ghost">Details</Button>}
                />
                <WidgetCard
                  title="Pipeline Value"
                  metric="$1.2M"
                  metricLabel="projected"
                  trend={{ value: -2.4, label: "vs Q2" }}
                />
                <WidgetCard
                  title="Support Tickets"
                  metric="47"
                  trend={{ value: 18, label: "open" }}
                  description="12 critical, 35 normal"
                />
              </div>
            </Section>

            <Section title="Chart Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ChartCard
                  title="Revenue Over Time"
                  description="Monthly revenue for the last 6 months"
                  action={<Button size="sm" variant="ghost">Export</Button>}
                  footer={<span className="text-xs text-muted-foreground">Last updated: today</span>}
                >
                  {/* Placeholder chart area */}
                  <div className="h-40 rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Chart area</span>
                  </div>
                </ChartCard>
                <ChartCard
                  title="User Acquisition"
                  description="By channel — last 30 days"
                >
                  <div className="h-40 rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Chart area</span>
                  </div>
                </ChartCard>
              </div>
            </Section>
          </div>
        )}

        {/* Work */}
        {activeTab === "Work" && (
          <div className="flex flex-col gap-8">
            <Section title="Task Card">
              <div className="flex flex-col gap-2 max-w-lg">
                <TaskCard
                  id="t1"
                  title="Finalize onboarding flow wireframes"
                  priority="high"
                  assigneeAvatarFallback="JS"
                  dueDate="Jul 8"
                  tags={["Design"]}
                />
                <TaskCard
                  id="t2"
                  title="Review API documentation PR"
                  completed
                  priority="medium"
                  assigneeAvatarFallback="MR"
                  dueDate="Jul 5"
                />
                <TaskCard
                  id="t3"
                  title="Set up staging environment"
                  priority="low"
                  dueDate="Jul 12"
                  tags={["Infra", "DevOps"]}
                />
              </div>
            </Section>

            <Section title="Kanban Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
                <KanbanCard
                  id="k1"
                  title="Implement OAuth2 login"
                  description="Support Google and GitHub providers"
                  labels={[
                    { label: "Auth", variant: "primary" },
                    { label: "Backend", variant: "muted" },
                  ]}
                  assigneeAvatarFallback="MR"
                  priority="high"
                  dueDate="Jul 10"
                />
                <KanbanCard
                  id="k2"
                  title="Design system tokens audit"
                  labels={[{ label: "Design", variant: "info" }]}
                  assigneeAvatarFallback="JS"
                  priority="medium"
                />
                <KanbanCard
                  id="k3"
                  title="Fix pagination bug on mobile"
                  labels={[{ label: "Bug", variant: "destructive" }]}
                  priority="high"
                  dueDate="Jul 7"
                />
              </div>
            </Section>

            <Section title="Project Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProjectCard
                  title="CRM V4 Design System"
                  description="Component library and token system"
                  progress={68}
                  status="active"
                  team={[
                    { fallback: "JS" },
                    { fallback: "MR" },
                    { fallback: "AT" },
                  ]}
                  dueDate="Aug 1"
                />
                <ProjectCard
                  title="Mobile App Redesign"
                  description="iOS and Android refresh"
                  progress={100}
                  status="completed"
                  team={[{ fallback: "AT" }, { fallback: "JS" }]}
                />
                <ProjectCard
                  title="Data Pipeline Migration"
                  description="Moving to new infra"
                  progress={25}
                  status="paused"
                  dueDate="Sep 15"
                />
              </div>
            </Section>
          </div>
        )}

        {/* Feed */}
        {activeTab === "Feed" && (
          <div className="flex flex-col gap-8">
            <Section title="Activity Card">
              <div className="max-w-lg">
                <ActivityCard
                  items={[
                    {
                      id: "a1",
                      avatarFallback: "JS",
                      actor: "Jane Smith",
                      action: "closed deal",
                      target: "Acme Corp — $48k",
                      time: "2 minutes ago",
                    },
                    {
                      id: "a2",
                      avatarFallback: "MR",
                      actor: "Marcus Rivera",
                      action: "merged PR",
                      target: "#142 — Auth refactor",
                      time: "15 minutes ago",
                    },
                    {
                      id: "a3",
                      avatarFallback: "AT",
                      actor: "Ana Torres",
                      action: "added comment on",
                      target: "Invoice #1024",
                      time: "1 hour ago",
                    },
                  ]}
                />
              </div>
            </Section>

            <Section title="Timeline Card">
              <div className="max-w-sm">
                <TimelineCard
                  title="Deal History"
                  events={[
                    {
                      id: "e1",
                      title: "Deal created",
                      description: "Initiated by Jane Smith",
                      time: "Jul 1, 09:00",
                      variant: "primary",
                    },
                    {
                      id: "e2",
                      title: "Proposal sent",
                      description: "PDF attached · $48,000",
                      time: "Jul 3, 14:30",
                      variant: "info",
                    },
                    {
                      id: "e3",
                      title: "Contract signed",
                      description: "e-signature via DocuSign",
                      time: "Jul 5, 11:15",
                      variant: "success",
                    },
                  ]}
                />
              </div>
            </Section>

            <Section title="Comment Card">
              <div className="flex flex-col gap-3 max-w-lg">
                <CommentCard
                  avatarFallback="JS"
                  author="Jane Smith"
                  time="2h ago"
                  content="The revised proposal looks great. I've bumped the timeline slightly to account for the legal review — should be back within 3 business days."
                  reactions={[{ emoji: "👍", count: 3 }, { emoji: "🎉", count: 1 }]}
                  onReply={() => {}}
                />
                <CommentCard
                  avatarFallback="MR"
                  author="Marcus Rivera"
                  time="45min ago"
                  content="Sounds good. I'll coordinate with legal on our end."
                />
              </div>
            </Section>
          </div>
        )}

        {/* Utility */}
        {activeTab === "Utility" && (
          <div className="flex flex-col gap-8">
            <Section title="Attachment Card">
              <div className="flex flex-col gap-2 max-w-lg">
                <AttachmentCard
                  fileName="Q3 Revenue Report.pdf"
                  fileSize="2.4 MB"
                  fileType="pdf"
                  uploadedBy="Jane Smith"
                  uploadedAt="Jul 4"
                  onDownload={() => {}}
                  onDelete={() => {}}
                />
                <AttachmentCard
                  fileName="product-mockup-v3.png"
                  fileSize="890 KB"
                  fileType="image"
                  uploadedBy="Marcus Rivera"
                  uploadedAt="Jul 2"
                  onDownload={() => {}}
                />
                <AttachmentCard
                  fileName="design-assets.zip"
                  fileSize="14.2 MB"
                  fileType="zip"
                  uploadedAt="Jun 28"
                  onDownload={() => {}}
                  onDelete={() => {}}
                />
              </div>
            </Section>

            <Section title="Empty State Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <EmptyStateCard
                  icon={<FileText />}
                  title="No documents yet"
                  description="Upload files or create a new document to get started."
                  action={<Button size="sm"><Plus className="h-4 w-4 mr-1" />Add Document</Button>}
                />
                <EmptyStateCard
                  icon={<Users />}
                  title="No team members"
                  description="Invite your team to start collaborating on this project."
                  action={<Button size="sm" variant="outline"><UserPlus className="h-4 w-4 mr-1" />Invite</Button>}
                />
              </div>
            </Section>

            <Section title="Integration Card">
              <div className="flex flex-col gap-2 max-w-lg">
                <IntegrationCard
                  icon={<MessageSquare />}
                  iconVariant="primary"
                  name="Slack"
                  description="Send notifications and updates to your Slack workspace."
                  connected
                  onToggle={() => {}}
                />
                <IntegrationCard
                  icon={<GitBranch />}
                  iconVariant="muted"
                  name="GitHub"
                  description="Sync pull requests and issues with your CRM pipeline."
                  connected={false}
                  onToggle={() => {}}
                />
                <IntegrationCard
                  icon={<Mail />}
                  iconVariant="info"
                  name="Gmail"
                  description="Track email conversations linked to contacts and deals."
                  connected
                  onToggle={() => {}}
                />
              </div>
            </Section>

            <Section title="Quick Action Card">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                <QuickActionCard
                  icon={<Send />}
                  iconVariant="primary"
                  label="Send Proposal"
                  description="Generate and email a deal proposal"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Calendar />}
                  iconVariant="success"
                  label="Schedule Meeting"
                  description="Book a call with your contact"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Zap />}
                  iconVariant="warning"
                  label="Run Automation"
                  description="Trigger a workflow sequence"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Plus />}
                  iconVariant="muted"
                  label="New Task"
                  description="Add to your pipeline"
                  disabled
                />
              </div>
            </Section>
          </div>
        )}
      </div>

      <AccessibilitySection
        title="Accessibility"
        items={[
          <>Clickable cards (<code className="font-mono text-xs">CRMBaseCard clickable</code>, QuickActionCard, EntityCard) expose an <code className="font-mono text-xs">onClick</code> — wire them to a real button/link so they are keyboard-focusable and announced as actionable.</>,
          <>The <code className="font-mono text-xs">disabled</code> state applies <code className="font-mono text-xs">opacity-50</code> and <code className="font-mono text-xs">pointer-events-none</code>, blocking pointer interaction; do not rely on color alone to signal it.</>,
          <>Icons inside StatCard/EntityCard/IntegrationCard are decorative — always pair them with the visible title/label so meaning does not depend on the glyph.</>,
          <>Selected cards use a 2px <code className="font-mono text-xs">ring-primary</code>, a non-color cue readable next to the surrounding cards.</>,
        ]}
      />

      <DarkModeSection description="The same cards in both themes — every surface, ring, trend and variant color resolves from tokens (bg-card, ring-primary, text-success/destructive).">
        <div className="space-y-3">
          <StatCard
            title="Total Revenue"
            value="$48,295"
            variant="success"
            icon={<DollarSign />}
            trend={{ value: 12.5, label: "vs last month" }}
          />
          <EntityCard
            icon={<Users />}
            iconVariant="primary"
            title="Acme Corporation"
            subtitle="Enterprise customer · 240 seats"
            badge={{ label: "Active", variant: "success" }}
          />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMBaseCard, StatCard, EntityCard } from "@/components/cards"

// Base shell — clickable / selected / disabled
<CRMBaseCard clickable selected={isSelected} onClick={select}>
  <CardContent>…</CardContent>
</CRMBaseCard>

// KPI card with a semantic variant + trend
<StatCard title="Total Revenue" value="$48,295" variant="success"
  icon={<DollarSign />} trend={{ value: 12.5, label: "vs last month" }} />

// Entity row with icon, badge and inline action
<EntityCard icon={<Mail />} iconVariant="info" title="Invoice #1024"
  subtitle="$12,400 · Due Jul 20" badge={{ label: "Pending", variant: "warning" }} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        description="All cards share the CardVariant union: default · primary · success · warning · destructive · info · muted."
        groups={[
          [
            { prop: "CRMBaseCard.clickable", type: "boolean", default: "false", description: "Adds hover ring + pointer cursor for interactive cards." },
            { prop: "CRMBaseCard.selected", type: "boolean", default: "false", description: "Applies a 2px ring-primary highlight." },
            { prop: "CRMBaseCard.disabled", type: "boolean", default: "false", description: "Dims to opacity-50 and disables pointer events." },
            { prop: "CRMBaseCard.onClick", type: "() => void", description: "Click handler (ignored while disabled)." },
          ],
          [
            { prop: "StatCard", type: "{ title, value, variant?, icon?, trend?, description? }", description: "KPI tile; trend renders up/down arrow + colored delta." },
            { prop: "EntityCard", type: "{ icon?, iconVariant?, title, subtitle?, meta?, badge?, action?, clickable? }", description: "Compact entity row with icon, badge and optional action." },
            { prop: "ProjectCard", type: "{ title, progress, status?, team?, dueDate? }", description: "Project summary with progress bar and status." },
            { prop: "QuickActionCard", type: "{ icon, label, iconVariant?, description?, onClick?, disabled? }", description: "Tappable action tile for shortcuts." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Best Practices"
        dos={[
          "Reuse the CardVariant tokens so status colors stay consistent across every card.",
          "Pick the card that matches the data: StatCard for KPIs, EntityCard for list rows, ProjectCard for progress.",
          "Give clickable/quick-action cards a real onClick and a clear affordance.",
          "Use EmptyStateCard with an actionable CTA when a collection has no items.",
        ]}
        donts={[
          "Don't hardcode colors — always drive tone through the variant prop.",
          "Don't nest cards inside cards; use CardContent sections instead.",
          "Don't mark a card clickable without wiring an action.",
          "Don't overload a single card with unrelated metrics — split into multiple tiles.",
        ]}
      />

      <DesignNotes
        items={[
          "As 17 variações compartilham o CRMBaseCard: uma única casca (bg-card, borda e radius por token) garante que qualquer card novo herde superfície, sombra e espaçamento consistentes.",
          "A cor de status nunca é codificada no card — passa sempre pela CardVariant (default, primary, success, warning, destructive, info, muted), então o mesmo token pinta ícone, trend e badge de forma coerente.",
          "Seleção usa um ring-primary de 2px em vez de mudar o fundo: é uma pista não-cromática que sobrevive ao dark mode e não compete com as cores de variante do conteúdo.",
          "Escolha o card pela forma do dado: StatCard para KPIs, EntityCard para linhas de lista, ProjectCard para progresso, EmptyStateCard quando a coleção está vazia — evitando remontar layouts ad hoc.",
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Table", href: "/styleguide/components/table", description: "Alternativa densa a listas de EntityCard para muitos registros." },
          { name: "Badge", href: "/styleguide/components/badge", description: "Rótulos de status usados dentro de Entity/Kanban cards." },
          { name: "Avatar", href: "/styleguide/components/avatar", description: "Identidade em Profile, Comment e Activity cards." },
          { name: "Progress", href: "/styleguide/components/progress", description: "Barra de avanço exibida pelo ProjectCard." },
          { name: "Chart", href: "/styleguide/components/chart", description: "Preenche a área de visualização do ChartCard." },
        ]}
      />
    </StyleguidePage>
  )
}
