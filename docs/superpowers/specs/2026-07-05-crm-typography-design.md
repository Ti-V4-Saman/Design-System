# CRM V4 — Família Typography (Design Spec)

**Data:** 2026-07-05 · **Status:** Implementado
**Fonte:** Design System CRM V4 (escala existente + tokens de fonte).

Sistema tipográfico construído do zero (shadcn não tem componente instalável),
ancorado na escala já usada (H1 4xl bold … H4 xl medium, Body base, Small sm
muted, Mono). Inter (texto/headings), Geist Mono (código).

## Componentes (`components/typography/`)
- `Heading` — `level` 1–6 (tag semântica + tamanho); `as` para preservar ordem.
- `Text` — `variant` (lead/body/small/caption/overline), `tone` (semântico),
  `weight`, `truncate`, `clamp={n}`, `as`.
- `InlineCode`, `TextLink` — helpers inline.
- `Prose` — estiliza HTML/markdown rico (notas, descrições); sanitizar se injetar HTML.

## Showcase
Headings, variantes de Text, tons, pesos, truncar/clamp, inline, prose, famílias
de fonte, exemplo real de CRM, dark mode, acessibilidade (ordem semântica),
código, API/Props, Do/Don't. Registrado em `navigation.ts`.
