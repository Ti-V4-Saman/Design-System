export interface NavItem {
  name: string
  href: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Foundation",
    items: [{ name: "Design Tokens", href: "/styleguide" }],
  },
  {
    title: "Layout & Disclosure",
    items: [
      { name: "Accordion", href: "/styleguide/components/accordion" },
      { name: "Cards", href: "/styleguide/components/cards" },
      { name: "Collapsible", href: "/styleguide/components/collapsible" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
    ],
  },
  {
    title: "Navigation & Menus",
    items: [
      { name: "Breadcrumb", href: "/styleguide/components/breadcrumb" },
      { name: "Command", href: "/styleguide/components/command" },
      { name: "Context Menu", href: "/styleguide/components/context-menu" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Menubar", href: "/styleguide/components/menubar" },
      { name: "Sidebar", href: "/styleguide/components/sidebar" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { name: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Drawer", href: "/styleguide/components/drawer" },
      { name: "Hover Card", href: "/styleguide/components/hover-card" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
      { name: "Typography", href: "/styleguide/components/typography" },
    ],
  },
  {
    title: "Forms & Inputs",
    items: [
      { name: "Attachment", href: "/styleguide/components/attachment" },
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Field", href: "/styleguide/components/field" },
      { name: "Input Group", href: "/styleguide/components/input-group" },
      { name: "Label", href: "/styleguide/components/label" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Table", href: "/styleguide/components/table" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Message", href: "/styleguide/components/message" },
      { name: "Sonner (Toast)", href: "/styleguide/components/sonner" },
      { name: "Survey", href: "/styleguide/components/survey" },
    ],
  },
]
