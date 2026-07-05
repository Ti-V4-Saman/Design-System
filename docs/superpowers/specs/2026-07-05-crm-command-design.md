# CRM V4 — Família Command (Design Spec)

**Data:** 2026-07-05
**Status:** Aprovado para implementação
**Fonte da verdade visual:** Design System CRM V4 (sem referência externa)

## Objetivo

Família **Command** reutilizável para o CRM V4: paleta de comandos ⌘K global,
combobox buscável e os subcomponentes base — tudo com tokens CRM V4 (emerald,
sem azul), consistente com Dialog/Popover/Input/Select já existentes.

## Fundação técnica

- `npx shadcn@latest add command` → instala `cmdk` + cria
  `components/ui/command.tsx` (e `dialog.tsx` como registry dependency).
- cmdk/Radix fornecem **apenas** infra: navegação por teclado, filtro/busca,
  acessibilidade (`role=listbox/option`, aria-selected). Aparência 100% CRM V4.

## Base reestilizada (`components/ui/command.tsx`)

`Command`, `CommandInput` (ícone de busca lucide), `CommandList`,
`CommandEmpty`, `CommandGroup` (heading em `text-muted-foreground`),
`CommandItem` (estados hover/selected via `aria-selected` → `bg-accent`,
disabled), `CommandShortcut` (kbd em `bg-muted`), `CommandSeparator`,
`CommandDialog` (modal ⌘K com `shadow-modal`).

Tokens: superfície `bg-popover`/`text-popover-foreground`, borda `border-border`,
raio `--radius`, item ativo `bg-accent text-accent-foreground`, ícones
`text-muted-foreground`, sombra dropdown/modal.

## Família CRM (`components/command/`)

| Arquivo | Componente | O quê |
|---|---|---|
| `command-menu.tsx` | `CommandMenu` | Paleta ⌘K pronta para CRM. Props: `groups` (itens estáticos), `onSearch` (busca async → loading skeleton + resultados), `recent`, `open`/`onOpenChange`. Grupos padrão: Navegação, Ações rápidas, Resultados. Empty e loading states. |
| `use-command-menu.ts` | `useCommandMenu` | hook: estado `open`/`setOpen` + listener `⌘K`/`Ctrl+K` (e `/` opcional). |
| `command-combobox.tsx` | `CommandCombobox` | Select buscável (Command dentro de Popover). Props: `options`, `value`, `onChange`, `placeholder`, `searchPlaceholder`, `emptyMessage`, `disabled`. Check no item selecionado. |
| `types.ts` | tipos | `CommandGroupData`, `CommandItemData`, `ComboboxOption`. |
| `index.ts` | barrel | re-exports. |

**Arquitetura:** componentes agnósticos de layout; `CommandMenu` controlado
(open externo) para plugar em qualquer app shell. Busca async injetada via
callback `onSearch(query) => Promise<items>` (sem acoplar a fonte de dados).

## Showcase (`app/styleguide/components/command/page.tsx`)

- **Inline Command** — grupos (Navegação, Ações), shortcuts, ícones.
- **CommandDialog ⌘K** — botão trigger + atalho; cenário CRM: ir para
  Clientes/Leads/Projetos, ações "Novo lead/projeto/tarefa", buscar entidades
  com **loading async** (skeleton) e resultados.
- **CommandCombobox** — ex.: selecionar responsável (owner) e status.
- **Estados**: default, hover, selected, disabled, **empty**, **loading**.
- **Light/Dark** lado a lado (container `.dark` forçado).
- **Responsivo** (dialog adapta em mobile).
- **Uso & API** (código básico/avançado/composição) + **Do / Don't**.

Registrar "Command" em `app/styleguide/navigation.ts` (após Calendar,
alfabético).

## Dev config

`next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` (dev-only) para permitir
verificação no browser via 127.0.0.1 (ver memória `dev-server-browser-origin`).

## Critérios de aceite

- [ ] cmdk + command.tsx + dialog.tsx instalados; command.tsx reestilizado com tokens.
- [ ] `components/command/`: CommandMenu, useCommandMenu, CommandCombobox (+types, index).
- [ ] Nenhuma cor hardcoded; sem azul; consistente com Dialog/Popover/Input.
- [ ] Empty + loading (async) no CommandMenu; empty no Combobox.
- [ ] Showcase com todos os itens acima, light/dark, exemplos reais de CRM.
- [ ] `navigation.ts` atualizado.
- [ ] `npm run build` e lint dos arquivos novos passam.
- [ ] Verificação visual no browser (⌘K abre, busca, combobox seleciona).
