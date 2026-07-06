# CRM V4 Design System — Architecture & Conventions

Documento normativo de arquitetura. Estabelece as convenções de organização,
export e naming do Design System. Decisões registradas na consolidação (Fase 2).

## 1. Estrutura de pastas

```
components/
├── ui/                      # Primitivos shadcn/Radix (base técnica)
│   ├── button.tsx  dialog.tsx  select.tsx  ...
│
├── <família>/               # Composições/famílias CRM multi-arquivo (+ index.ts)
│   ├── charts/  command/  dialog/  field/  message/  sidebar/
│   ├── tooltip/ typography/ badge/ cards/ data-table/ input-group/ survey/
│
├── crm-<nome>.tsx           # Wrapper CRM de arquivo único sobre um primitivo ui/
│   ├── crm-alert-dialog.tsx  crm-breadcrumb.tsx  crm-drawer.tsx
│   ├── crm-actions-menu.tsx  crm-toast.tsx
│
└── <util>.tsx               # Utilitários soltos (mode-toggle, theme-provider,
                             #   date-picker, date-range-picker, attachment)

app/styleguide/
├── navigation.ts            # Navegação agrupada por família
├── components/<nome>/page.tsx  # 1 página de showcase por componente
└── _components/             # (Fase 3) framework de documentação compartilhado
```

**Fronteira:** `ui/` = infraestrutura (acessibilidade, Radix, primitivos). Nunca
carrega identidade visual "de fábrica" do shadcn — a aparência é sempre CRM V4.
Composições e famílias vivem fora de `ui/`.

## 2. Convenção de wrappers/composições

Duas formas **aceitas e distintas** (não são inconsistência — são níveis):

| Forma | Quando usar | Exemplo |
|---|---|---|
| `crm-<nome>.tsx` (arquivo único) | Wrapper fino sobre **um** primitivo `ui/`, sem subcomponentes | `crm-alert-dialog.tsx` (variantes + ícone sobre `ui/alert-dialog`) |
| `components/<família>/` (pasta + `index.ts`) | Família com **múltiplos** componentes/partes | `components/dialog/` (`FormDialog`), `components/message/` (Message, Thread, Status…) |

Regra: assim que um wrapper precisar de um segundo arquivo, ele **vira pasta** com
`index.ts`.

## 3. Barrel exports

- Toda pasta de família expõe um `index.ts` como ponto de entrada público.
- Exceção documentada: `components/data-table/` usa `index.tsx` porque o arquivo
  de entrada também contém o componente principal (`CRMDataTable`). Tipos em
  `data-table/types.ts`, células em `data-table/cells/`. Funcional e intencional.
- Consumidores importam sempre pelo barrel (`@/components/<família>`), nunca por
  caminho interno (exceto `types`/`cells` quando documentado).

## 4. Escala de tamanhos (`size`)

**Estado atual (documentado):** há duas convenções em uso —
- `default` (base) + modificadores: `button`, `switch`, `toggle`, `drawer`, `avatar`.
- explícita `sm/md/lg/xl(/full)`: `dialog`, `tabs`.

**Decisão:** ambas são válidas conforme a natureza do componente:
- Componentes com **um tamanho base + variações pontuais** (ex.: Button:
  `default/sm/lg/icon`) mantêm `default` — é o idioma cva/shadcn.
- Componentes com **escala real de tamanho** (Dialog, Tabs, Drawer) usam a escala
  explícita `sm/md/lg/xl` — padrão de mercado (MUI/Chakra/Ant), mais legível.

**Divergência residual:** `drawer` usa `sm/default/lg/xl` (mistura). Alinhar
`drawer` para `sm/md/lg/xl` é recomendado, porém é **breaking change** de API
pública — adiado para uma release versionada, com nota de migração. Nenhum rename
foi executado nesta fase para preservar backwards-compat.

## 5. Padrões visuais (resumo — ver `component-standards`)

- **Tokens sempre.** Zero cores hardcoded, zero azul (marca = emerald `primary`).
- **Radius por intenção:** form controls/floating `rounded-lg`; cards/dialogs
  `rounded-xl`; pílulas/badges `rounded-full`; avatares circulares. Sem literais
  arbitrários (`rounded-[4px]`) — usar a escala (`rounded-sm/md/lg`).
- **Sombras semânticas:** `shadow-[var(--shadow-card)]` (cards),
  `--shadow-dropdown` (flutuantes), `--shadow-modal` (dialogs). Micro-sombras de
  controles móveis (thumb) podem usar `shadow-sm`.
- **Foco:** `focus-visible:ring-ring/50` (nunca `focus:ring-primary`).
- Nota: o desvio histórico `shadow-md + ring-foreground/10` foi **eliminado** —
  não existe mais no código (atualizar o `component-standards`).

## 6. Higiene de repositório

- **Arquivos-conflito de sincronização** (`nome 2.tsx`, gerados por iCloud/Dropbox
  na pasta do repo) foram removidos e agora são **ignorados** via `.gitignore`
  (`* 2.tsx`, `* 3.tsx`, etc.). Causa-raiz: o repositório vive numa pasta
  sincronizada — recomenda-se movê-lo para fora do sync ou pausar o sync durante
  o desenvolvimento.

## 7. Log de decisões (Fase 2)

1. Removidos 6 arquivos-conflito de cruft (`crm-drawer 2.tsx`, `ui/drawer 2.tsx`,
   `ui/field 2.tsx`, `ui/separator 2.tsx`, `field/page 2.tsx`,
   `crm-dialog-design 2.md`).
2. `.gitignore` passa a ignorar cópias de conflito `* 2/3.*`.
3. Convenção de wrappers formalizada (arquivo único `crm-*` vs pasta de família).
4. Escala de `size` documentada; renames breaking **adiados** (backwards-compat).
5. `data-table` `index.tsx` mantido (intencional, documentado).
