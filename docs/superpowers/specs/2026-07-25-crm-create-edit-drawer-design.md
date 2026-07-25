# CRM V4 — Criar/Editar registro: **Drawer (Sheet lateral)** é o padrão canônico

**Data:** 2026-07-25
**Status:** Aprovado para implementação
**Revisa:** `docs/superpowers/specs/2026-07-05-crm-dialog-design.md` (na parte que definia
`FormDialog` como padrão de criar/editar entidade).

## Objetivo

Fixar o padrão canônico para **criar e editar registro/entidade principal**: um **painel lateral
(Drawer/Sheet)**, não um modal central. O componente-motor já existe no design system —
`FormSheet` (`components/sheet/form-sheet.tsx`), cujo próprio doc-comment o descreve como *"the
workhorse for 'New lead', 'Edit deal', etc."*. Este spec formaliza esse componente como a decisão
oficial e delimita a fronteira Drawer × Dialog × AlertDialog.

## Por que esta revisão

O spec de Dialog (2026-07-05) definia `FormDialog` (modal central) para criar/editar entidade.
Na prática, o produto de referência (CRM V4) convergiu para **painel lateral** nos três núcleos —
Empresas, Contatos e Negócios — e essa se mostrou a melhor experiência para formulários de
entidade (mais espaço vertical, contexto da lista ao fundo, seções + campos personalizados sem
espremer). O spec antigo ficou desatualizado; havia inclusive contradição interna, já que o
`FormSheet` sempre existiu como "workhorse" de criar/editar sem spec. Esta revisão alinha a
documentação à decisão real do time.

## Decisão

| Fluxo | Componente | Quando |
|---|---|---|
| **Criar / editar entidade principal** | **`FormSheet`** (Sheet lateral, `side="right"`) | Nova/editar Empresa, Contato, Negócio, Produto, Tarefa, etc. — o formulário "dono" da entidade. |
| **Ação leve aninhada dentro de outro fluxo** | `FormDialog` (modal central) | Sub-ação rápida que acontece *dentro* de outra tela/painel — ex.: adicionar uma linha de item, quick-add de um registro auxiliar sem sair do contexto atual. |
| **Confirmação / destrutivo** | `CRMAlertDialog` | Excluir/arquivar/avisos críticos. **Não muda.** |

Regra de bolso: **se o formulário é o assunto principal da tela → Drawer.** Se é um passo
secundário dentro de outro fluxo já aberto → Dialog. Confirmar/destruir → AlertDialog.

## Componente-motor — `FormSheet`

`components/sheet/form-sheet.tsx` (sobre `components/ui/sheet.tsx`):

- Painel lateral (`side="right"` default; `size` sm/default/lg/xl).
- Body é um `<form>`; footer fixo com **Cancelar + Salvar** (`submitLabel`/`cancelLabel`),
  `submitting` (spinner + disable no submit), `submitVariant` (ex.: `destructive`).
- Controlado (`open`/`onOpenChange`) ou não (`defaultOpen`); `trigger` opcional (`asChild`).
- Header com `title` + `description`; body rolável.
- Para markup 100% custom, usar as primitivas de `components/ui/sheet.tsx` direto
  (`Sheet`/`SheetContent`/`SheetHeader`/`SheetBody`/`SheetFooter`). `CRMDrawer`
  (`components/crm-drawer.tsx`) é o equivalente genérico (sem `<form>` embutido) para painéis que
  não são formulário.

Showcase: `app/styleguide/components/sheet/page.tsx`.

## O que continua valendo do spec de Dialog (2026-07-05)

- Família `Dialog` / `FormDialog` **permanece** — só muda o *escopo de uso*: de "criar/editar
  entidade" para "ação leve aninhada". Variantes de tamanho, showcase e API do Dialog seguem como
  estão.
- `CRMAlertDialog` para confirmação/destrutivo **não muda**.

## Critérios de aceite (documentais)

- [ ] Este spec criado com status "Aprovado para implementação".
- [ ] Banner de revisão no topo de `2026-07-05-crm-dialog-design.md` apontando pra cá e
      estreitando o escopo do `FormDialog` para ação aninhada.
- [ ] Fronteira Drawer × Dialog × AlertDialog explícita (tabela acima).
- [ ] Referência ao componente real (`FormSheet`) e ao showcase.
