# Design System — Fundação (esqueleto base)

Data: 2026-07-04

## Objetivo

Montar a base de um design system reutilizável para um sistema, pronto para
receber tokens reais extraídos de um design de referência (Prompt 1) e para
desenvolver componentes (Prompt 2) e páginas (Prompt 3).

Neste momento: **apenas o esqueleto base**, com tokens neutros de placeholder.

## Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- shadcn/ui (style Default, base color Neutral, CSS variables)
- lucide-react (ícones)
- next-themes (dark mode)
- Gerenciador de pacotes: **npm**

## Estrutura de scaffold

1. `create-next-app` no diretório atual — TypeScript, Tailwind, App Router,
   ESLint, alias `@/*`, sem `src/`. A pasta `Prompts/` já existente não conflita.
2. `shadcn init` — Default / Neutral / CSS variables.
3. Componentes demo: `button card badge alert radio-group`.
4. Tokens placeholder neutros em `app/globals.css` — estrutura completa de
   variáveis (base, card, popover, primary, secondary, muted, accent,
   destructive, borders, radius, charts, sidebar, semânticas success/warning/info)
   + bloco `.dark`.
5. Esqueleto do styleguide:
   - `app/styleguide/navigation.ts` — config de navegação
   - `app/styleguide/layout.tsx` — sidebar fixa lendo da navigation
   - `app/styleguide/page.tsx` — todos os tokens + componentes demo + toggle dark
6. Theme provider (`next-themes`).
7. `git init` + commit inicial.

## Entregável

- `npm run dev` sobe o app
- `/styleguide` mostra tokens e componentes funcionando
- Pronto para os Prompts 2 e 3

## Fora de escopo agora

- Extração de tokens de design real (Prompt 1, quando houver screenshot)
- Componentes além dos 5 demo
- Páginas de produto
