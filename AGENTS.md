<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Design System

Fundação de um design system. Stack: Next.js 16 (App Router) · React 19 ·
TypeScript · Tailwind CSS v4 · shadcn/ui (base radix, preset Nova) ·
lucide-react · next-themes.

## Fonte da verdade
- **Tokens** vivem em `app/globals.css` como CSS variables (`:root` + `.dark`),
  expostos ao Tailwind via `@theme inline`. Sempre referencie tokens por classe
  utilitária (`bg-primary`, `text-muted-foreground`, `border-border`,
  `bg-success`), nunca cores hardcoded.
- Além dos tokens padrão do shadcn, há semânticos custom:
  `success`, `warning`, `info` (cada um com `-foreground`).
- Os tokens atuais são **placeholders neutros** — serão substituídos por tokens
  reais extraídos de um design de referência (ver `Prompts/1-...`).

## Componentes
- Base shadcn em `components/ui/` (auto-gerados via `npx shadcn@latest add`).
- Wrappers/custom em `components/`.
- Prefira estender componentes shadcn a recriar do zero.

## Styleguide
- Vive em `app/styleguide/`. A navegação da sidebar é dirigida por
  `app/styleguide/navigation.ts` — ao adicionar um componente, registre-o lá.
- Cada componente ganha uma página em `app/styleguide/components/<nome>/page.tsx`.
- `/` redireciona para `/styleguide`.

## Workflow (pasta `Prompts/`)
1. `1-design-system-foundation.md` — extrair tokens de um screenshot.
2. `2-new-component.md` — adicionar/mostrar componentes.
3. `3-new-page.md` — construir páginas a partir de designs.

## Comandos
- `npm run dev` — dev server
- `npm run build` — build de produção (usar para validar)
- `npm run lint` — ESLint
