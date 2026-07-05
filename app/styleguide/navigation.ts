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
    title: "Components",
    items: [
      { name: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { name: "Attachment", href: "/styleguide/components/attachment" },
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Cards", href: "/styleguide/components/cards" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Command", href: "/styleguide/components/command" },
      { name: "Dialog", href: "/styleguide/components/dialog" },
      { name: "Drawer", href: "/styleguide/components/drawer" },
      { name: "Dropdown Menu", href: "/styleguide/components/dropdown-menu" },
      { name: "Field", href: "/styleguide/components/field" },
      { name: "Hover Card", href: "/styleguide/components/hover-card" },
      { name: "Input Group", href: "/styleguide/components/input-group" },
      { name: "Label", href: "/styleguide/components/label" },
      { name: "Survey", href: "/styleguide/components/survey" },
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Tabs", href: "/styleguide/components/tabs" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
    ],
  },
]
