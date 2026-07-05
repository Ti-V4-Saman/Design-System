# CRM V4 — Família Tabs (Design Spec)

**Data:** 2026-07-05
**Status:** Aprovado para implementação
**Fonte da verdade visual:** Design System CRM V4 + [[component-standards]]

## Objetivo

Família **Tabs** completa para o CRM V4 com showcase próprio. O `tabs.tsx` já
existe (variants `default`/`line`, orientação) — enhance enxuto + página de
styleguide seguindo os padrões CRM.

## Base (`components/ui/tabs.tsx`) — enhancements

- **Variante de tamanho** `size`: `sm` (h-7, text-xs) / `md` (h-8, text-sm, default).
- **Underline emerald** no variant `line`: texto e sublinhado ativos usam
  `primary` (antes `foreground`).
- Compatibilidade total: defaults preservados (a página Table usa `default`/`md`).

Densidade enterprise (compacto), radius por intenção (`rounded-lg` list,
`rounded-md` trigger — mantidos), tokens semânticos.

## Showcase (`app/styleguide/components/tabs/page.tsx`)

Segue a estrutura-padrão ([[component-standards]]): container
`mx-auto max-w-5xl space-y-14 p-8 md:p-12`, helpers locais
`Section`/`Demo`/`CodeBlock`/`ApiTable`/`GuidelineCard`, cópia pt-BR. Seções:

- **Overview** — o que é / quando usar.
- **Variants** — `default` (segmentado) e `line` (sublinhado emerald).
- **Sizes** — sm, md.
- **States** — ativo, hover, disabled.
- **Orientação** — horizontal e vertical.
- **Composição** — abas com ícones e badges de contagem.
- **Real CRM examples** — detalhe de cliente (Visão geral / Atividades / Arquivos
  / Faturas) e configurações (tabs verticais).
- **Dark Mode** — light/dark lado a lado.
- **Responsive** — comportamento em telas menores.
- **Accessibility** — Radix (roles tablist/tab/tabpanel, setas, Home/End).
- **Code examples** — básico / composição.
- **API/Props** — Tabs, TabsList (variant/size), TabsTrigger, TabsContent.
- **Best Practices / Do & Don't**.

Registrar "Tabs" em `app/styleguide/navigation.ts`.

## Critérios de aceite

- [ ] size sm/md + underline emerald no line; defaults preservados (Table intacta).
- [ ] Showcase com todas as seções padrão (incl. Accessibility e API/Props).
- [ ] Tokens semânticos, densidade enterprise, sem cor hardcoded.
- [ ] `navigation.ts` atualizado.
- [ ] `npm run build` e lint passam; verificação no browser.
- [ ] Merge na main + push + branch deletada.
