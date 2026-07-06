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
      { name: "Resizable", href: "/styleguide/components/resizable" },
      { name: "Scroll Area", href: "/styleguide/components/scroll-area" },
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
      { name: "Navigation Menu", href: "/styleguide/components/navigation-menu" },
      { name: "Pagination", href: "/styleguide/components/pagination" },
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
      { name: "Sheet", href: "/styleguide/components/sheet" },
      { name: "Tooltip", href: "/styleguide/components/tooltip" },
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
      { name: "Slider", href: "/styleguide/components/slider" },
      { name: "Switch", href: "/styleguide/components/switch" },
      { name: "Toggle", href: "/styleguide/components/toggle" },
      { name: "Toggle Group", href: "/styleguide/components/toggle-group" },
    ],
  },
  {
    title: "Data Display",
    items: [
      { name: "Avatar", href: "/styleguide/components/avatar" },
      { name: "Badge", href: "/styleguide/components/badge" },
      { name: "Chart", href: "/styleguide/components/chart" },
      { name: "Table", href: "/styleguide/components/table" },
      { name: "Typography", href: "/styleguide/components/typography" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { name: "Alert", href: "/styleguide/components/alert" },
      { name: "Message", href: "/styleguide/components/message" },
      { name: "Progress", href: "/styleguide/components/progress" },
      { name: "Sonner (Toast)", href: "/styleguide/components/sonner" },
      { name: "Spinner", href: "/styleguide/components/spinner" },
      { name: "Survey", href: "/styleguide/components/survey" },
    ],
  },
  {
    title: "Patterns & Templates",
    items: [
      { name: "Patterns", href: "/styleguide/patterns" },
    ],
  },
]
