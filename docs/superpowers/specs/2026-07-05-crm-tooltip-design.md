# CRM V4 — Família Tooltip (Design Spec)

**Data:** 2026-07-05
**Status:** Implementado
**Fonte da verdade visual:** Design System CRM V4 + [[component-standards]]

## Objetivo

Família completa de **Tooltip** para o CRM V4 — dicas contextuais transitórias
consistentes com os demais flutuantes (Popover/Dropdown/Hover Card).

## Base (`components/ui/tooltip.tsx`, shadcn reestilizado)

- Superfície **clara** (`bg-popover` / `text-popover-foreground`), borda discreta
  `border-border`, `rounded-lg`, **sombra semântica** `shadow-[var(--shadow-dropdown)]`
  — igual a popover/dropdown (em vez do tooltip escuro padrão do shadcn).
- **Sem seta** (consistente com os outros flutuantes); `sideOffset` = 6.
- `TooltipProvider` com `delayDuration` = 200 ms, adicionado ao `app/layout.tsx`
  (habilita tooltips app-wide).

## Família (`components/tooltip/`)

| Componente | O quê |
|---|---|
| `SimpleTooltip` | Rótulo curto + `icon`/`shortcut` opcionais; props `side`/`align`/`delayDuration`/`disabled`. |
| `RichTooltip` | Título + descrição + `icon`/`shortcut`/`actions`. Ações são mouse-only (documentado). |
| `TooltipShortcut` | Chip de atalho (kbd) em `bg-muted`/`border`. |

## Showcase (`app/styleguide/components/tooltip/page.tsx`)

Estrutura-padrão ([[component-standards]]): `max-w-5xl space-y-14`, helpers
`Section`/`Demo`/`CodeBlock`/`ApiTable`/`GuidelineCard`, pt-BR. Seções: Overview,
padrão, com ícone, com atalho, rico, com ações, posicionamentos (top/right/
bottom/left), alinhamentos (start/center/end), delay, estados (default/disabled),
Dark Mode, exemplos reais de CRM, Acessibilidade & teclado, Código, API/Props,
Do/Don't. Registrado em `navigation.ts`.

## Acessibilidade

Abre em hover e foco; fecha em Esc/blur; gatilho precisa de rótulo acessível.
Conteúdo do tooltip **não** é alcançável por teclado → para ações críticas usar
Popover/HoverCard (documentado). Gatilho desabilitado: envolver em `<span>`.

## Notas

- `button.tsx` preservado (overwrite recusado no `shadcn add`).
- Superfície clara escolhida para consistência e para suportar tooltips ricos.
