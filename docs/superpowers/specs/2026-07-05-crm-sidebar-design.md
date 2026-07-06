# CRM V4 — Família Sidebar (Design Spec)

**Data:** 2026-07-05
**Status:** Implementado
**Fonte da verdade visual:** Design System CRM V4 (padrão de sidebar existente + tokens `--sidebar`)

## Decisão

Construído **do zero** (não o `sidebar` do shadcn) para: (1) evitar a dependência
do Sheet que a frota estava construindo em paralelo (colisão), (2) alinhar ao
padrão de sidebar já usado no styleguide, (3) manter o componente coeso e enxuto.

## Componentes (`components/sidebar/`)

- `SidebarProvider` + `useSidebar` — estado aberto/colapsado, atalho **⌘B/Ctrl+B**,
  detecção mobile (`useSyncExternalStore`, sem set-state-in-effect). Renderiza um
  wrapper flex `relative` → funciona como app shell (h-screen) e em demos contidas.
- `Sidebar` — rail `bg-sidebar`, modos `collapsible`: **icon** (rail de ícones),
  **offcanvas** (some), **none**. Mobile → overlay com backdrop.
- `SidebarHeader` · `SidebarContent` · `SidebarFooter` · `SidebarInset`.
- `SidebarTrigger` (botão ⌘B) · `SidebarRail` (trilho na borda).
- `SidebarGroup` · `SidebarGroupLabel`.
- `SidebarMenu` · `SidebarMenuItem` · `SidebarMenuButton` (ativo via `data-active`
  → `bg-sidebar-primary`; `tooltip` aparece quando colapsado; `asChild`) ·
  `SidebarMenuBadge` · `SidebarMenuSub`/`SubItem`/`SubButton`.

## Tokens/estilo

`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`,
`--sidebar-border`, `--sidebar-ring`. Larguras via `--sidebar-width` (16rem) e
`--sidebar-width-icon` (3.25rem). Item ativo = emerald (`sidebar-primary`), hover
= `sidebar-accent`. Rótulos/badges/submenus escondidos no icon rail; tooltip
assume. Densidade enterprise.

## Showcase (`app/styleguide/components/sidebar/page.tsx`)

App shell interativo (colapso via gatilho/⌘B), estado colapsado (icon rail),
variantes de colapso, responsivo/mobile, dark mode, acessibilidade & teclado,
código, API/Props, Do/Don't. Registrado em `navigation.ts`.
