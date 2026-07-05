# CRM V4 — Família Field (Design Spec)

**Data:** 2026-07-05
**Status:** Aprovado para implementação
**Fonte da verdade visual:** Design System CRM V4 (sem referência externa)

## Objetivo

Sistema de **Field** (layout + validação de formulário) para o CRM V4: primitivos
compostos que padronizam label, controle, descrição, erro e agrupamento — sobre
Input/Select/Textarea/Checkbox/RadioGroup já existentes.

Pedido extra do usuário: **bordas dos itens menos arredondadas** → aplicar raio
menor (`rounded-md`/`rounded-sm`) nos itens com borda (choice fields).

## Fundação técnica

- `npx shadcn@latest add field` → `components/ui/field.tsx`. **Recusar** overwrite
  de button/input/etc. (mantém customizados).
- shadcn/Radix = infra (acessibilidade `aria-invalid`, `role`, htmlFor↔id).
  Aparência 100% CRM V4.

## Base (`components/ui/field.tsx`)

`Field` (orientation `vertical` | `horizontal` | `responsive`), `FieldLabel`,
`FieldDescription`, `FieldError`, `FieldContent`, `FieldTitle`, `FieldGroup`,
`FieldSet`, `FieldLegend`, `FieldSeparator`.

Tokens: label `text-foreground`, descrição `text-muted-foreground`, erro
`text-destructive`, separador `border-border`, foco via `ring`. Estado inválido
(`aria-invalid`) → `border-destructive` + `text-destructive` no controle e mensagem.

**Menos arredondado:** itens com borda (choice fields, containers de opção) usam
`rounded-md`/`rounded-sm` em vez de `rounded-lg`/`rounded-xl`.

## Choice fields (cards de opção)

Padrão `Field` com borda envolvendo Checkbox/RadioGroupItem + `FieldTitle` +
`FieldDescription` → card selecionável. Estados: default, hover, **selected**
(`data-state=checked` → `border-primary`/`bg-accent`), disabled. Borda menos
arredondada (`rounded-md`).

## Showcase (`app/styleguide/components/field/page.tsx`)

- **Orientações**: vertical, horizontal, responsive.
- **Estados**: default, focus, disabled, **error (com FieldError)**, required.
- **Tipos compostos**: Input, Select, Textarea, Checkbox, RadioGroup.
- **Choice fields**: radio/checkbox em cards (borda menos arredondada), selected state.
- **FieldSet + FieldLegend + FieldSeparator**: agrupamento (ex.: "Dados do lead" / "Preferências").
- **Form real de CRM**: "Novo lead" com validação (nome obrigatório → erro).
- **Light/Dark**, responsivo, **Uso & API** (básico/composição) + **Do/Don't**.

Registrar "Field" em `app/styleguide/navigation.ts`.

## Dev config

`next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` já presente na main.

## Critérios de aceite

- [ ] field instalado; componentes customizados preservados.
- [ ] Primitivos reestilizados com tokens; itens com borda menos arredondados.
- [ ] Validação (aria-invalid → erro) + FieldError.
- [ ] Choice fields com selected/disabled.
- [ ] Showcase completo (orientações, estados, tipos, choice, fieldset, form real, light/dark, API, Do/Don't).
- [ ] `navigation.ts` atualizado.
- [ ] `npm run build` e lint dos arquivos novos passam.
- [ ] Verificação no browser (form, validação, choice fields).
- [ ] Merge na main + push + branch deletada.
