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
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Calendar", href: "/styleguide/components/calendar" },
      { name: "Alert Dialog", href: "/styleguide/components/alert-dialog" },
      { name: "Survey", href: "/styleguide/components/survey" },
      { name: "Cards", href: "/styleguide/components/cards" },
    ],
  },
]
