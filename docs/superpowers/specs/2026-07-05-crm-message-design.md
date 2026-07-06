# CRM V4 — Família Message (Design Spec)

**Data:** 2026-07-05
**Status:** Implementado
**Fonte da verdade visual:** Design System CRM V4 + [[component-standards]]

## Objetivo

Família **Message** (chat/conversa) para a caixa de entrada do CRM — trocas com
leads/clientes. Construída do zero (shadcn não tem "message"), compondo com Avatar.

## Componentes (`components/message/`)

| Componente | O quê |
|---|---|
| `Message` | Linha de mensagem: bolha + avatar + autor + timestamp + status. `variant` incoming (muted, esquerda) / outgoing (emerald, direita), `showAvatar`/`showAuthor` p/ agrupamento. |
| `MessageStatus` | Status de entrega: sending/sent/delivered/read(emerald)/failed. |
| `MessageThread` | Container rolável da conversa. |
| `MessageGroup` | Agrupa mensagens consecutivas do mesmo remetente. |
| `DateSeparator` | Divisor de data centralizado. |
| `SystemMessage` | Evento centralizado muted (atribuição, tags). |
| `TypingIndicator` | Bolha de digitação (3 dots animados). |
| `MessageAttachment` | Anexo dentro da bolha, adaptável à cor via `currentColor`. |

## Tokens/estilo

Outgoing `bg-primary text-primary-foreground` (emerald) com canto `rounded-br-sm`;
incoming `bg-muted` com `rounded-bl-sm`; system/date muted centralizado. Status
"lido" em `text-primary` (emerald, **sem azul**). Timestamps `text-muted-foreground`
text-[11px]. Densidade enterprise.

## Showcase (`app/styleguide/components/message/page.tsx`)

Estrutura-padrão: variantes, avatar/autor/agrupamento, status de entrega, anexos,
digitando, conversa real de CRM (thread completo), empty state, dark mode,
acessibilidade, código, API/Props, Do/Don't. Registrado em `navigation.ts`.

## Acessibilidade

MessageStatus com `aria-label`; SystemMessage/TypingIndicator `role="status"`.
Autoria por nome+horário (não só cor/posição).
