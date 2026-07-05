# CRM V4 — Família Dialog (Design Spec)

**Data:** 2026-07-05
**Status:** Aprovado para implementação
**Fonte da verdade visual:** Design System CRM V4 (sem referência externa)

## Objetivo

Família **Dialog** (modais gerais) para o CRM V4: base com variantes de tamanho
+ `FormDialog` para criar/editar entidades. Confirmações/destrutivos **não**
entram aqui — já são cobertos por `CRMAlertDialog` (AlertDialog). Documentar a
fronteira Dialog × AlertDialog.

## Fundação técnica

- `npx shadcn@latest add dialog` (Radix Dialog). Ao instalar, **recusar**
  overwrite de `button.tsx`/`input.tsx` (mantém os customizados do CRM).
- Radix fornece foco/scroll-lock/ESC/acessibilidade (`role=dialog`, aria).
  Aparência 100% CRM V4.

## Base (`components/ui/dialog.tsx`)

Estender o dialog.tsx (já tokenizado — `bg-popover`, `ring-foreground/10`,
footer `bg-muted/50`, `font-heading`, `rounded-xl`) com:

- **`dialogContentVariants` (cva)** → prop `size`: `sm` (max-w-sm) · `md`
  (max-w-lg, default) · `lg` (max-w-2xl) · `xl` (max-w-4xl) · `full`
  (quase full-screen, altura alta com body rolável).
- `shadow-modal` no content (token CRM).
- Manter TODOS os exports e comportamento (o Command já consome Dialog).

## Família (`components/dialog/`)

| Arquivo | Componente | O quê |
|---|---|---|
| `form-dialog.tsx` | `FormDialog` | Modal controlado create/edit. Props: `open`, `onOpenChange`, `title`, `description`, `children` (campos), `onSubmit`, `submitLabel`, `cancelLabel`, `loading`, `submitDisabled`, `size`, `destructive`. `<form>` (Enter submete), body rolável, footer (Cancelar + Salvar c/ spinner), **bloqueia fechar durante loading**. |
| `index.ts` | barrel | re-exports. |

## Showcase (`app/styleguide/components/dialog/page.tsx`)

- **Tamanhos** sm→full (um botão por tamanho).
- **Composição base** (DialogHeader/body/DialogFooter, close, trigger).
- **FormDialog** — cenário real "Novo lead" (Input/Label/Select), com **loading**
  no submit e submit desabilitado enquanto inválido.
- **Conteúdo rolável** longo (header/footer fixos, body com scroll).
- **Estados**: default, loading, disabled.
- **Light/Dark** lado a lado.
- **Responsivo** (max-w adapta; full vira quase full-screen no mobile).
- **Uso & API** (básico/avançado/composição) + **Do/Don't** (quando usar Dialog
  vs AlertDialog).

Registrar "Dialog" em `app/styleguide/navigation.ts` (após Command/alfabético).

## Dev config

`next.config.ts`: `allowedDevOrigins: ['127.0.0.1']` (dev-only, ver memória
`dev-server-browser-origin`).

## Nota de arquitetura (cross-branch)

Este `dialog.tsx` é a versão **canônica** CRM. A branch `feat/crm-command` puxou
um `dialog.tsx` raw como dependência; no merge, resolver a favor desta versão
(mantém os mesmos exports, então o Command continua funcionando).

## Critérios de aceite

- [ ] dialog instalado; button/input customizados preservados.
- [ ] `size` sm→full + `shadow-modal`; exports/comportamento mantidos.
- [ ] `FormDialog` com loading, submit guard e body rolável.
- [ ] Nenhuma cor hardcoded; consistente com Card/AlertDialog/Popover.
- [ ] Showcase completo (tamanhos, form, scroll, estados, light/dark, API, Do/Don't).
- [ ] `navigation.ts` atualizado.
- [ ] `npm run build` e lint dos arquivos novos passam.
- [ ] Verificação no browser (abre, tamanhos, form submit com loading, scroll).
