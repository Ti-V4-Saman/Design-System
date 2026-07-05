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
      { name: "Button", href: "/styleguide/components/button" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Command", href: "/styleguide/components/command" },
      { name: "Survey", href: "/styleguide/components/survey" },
      { name: "Table", href: "/styleguide/components/table" },
    ],
  },
]
