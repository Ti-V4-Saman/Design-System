"use client"

import * as React from "react"
import { AlertCircle, Mail, Phone, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetBody,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet"
import {
  RecordSheet,
  SheetSection,
  SheetField,
  FormSheet,
  FilterSheet,
} from "@/components/sheet"
import {
  AccessibilitySection,
  ApiTable,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
  type ApiRow,
} from "@/app/styleguide/_components"

/* ---------- interactive demos ---------- */

function LoadingRecordDemo() {
  const [loading, setLoading] = React.useState(true)
  return (
    <RecordSheet
      trigger={
        <Button variant="outline" onClick={() => setLoading(true)}>
          Abrir com loading
        </Button>
      }
      name="Adrain Ondricka"
      subtitle="Bill and Account Collector · Ondricka LLC"
      loading={loading}
      footer={
        <Button size="sm" onClick={() => setLoading((v) => !v)}>
          {loading ? "Carregar dados" : "Recarregar"}
        </Button>
      }
    >
      <SheetSection title="Contato">
        <SheetField label="E-mail" value="adrain@demo.com" />
        <SheetField label="Telefone" value="+1 (510) 925-0980" />
      </SheetSection>
    </RecordSheet>
  )
}

function FormSubmitDemo() {
  const [open, setOpen] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  React.useEffect(() => () => clearTimeout(timer.current), [])
  return (
    <FormSheet
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button>
          <Plus data-icon="inline-start" />
          Novo lead
        </Button>
      }
      title="Novo lead"
      description="Preencha os dados para criar um lead no pipeline."
      submitting={submitting}
      submitLabel="Criar lead"
      onSubmit={() => {
        setSubmitting(true)
        timer.current = setTimeout(() => {
          setSubmitting(false)
          setOpen(false)
        }, 1200)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="s-name" required>Nome</FieldLabel>
          <Input id="s-name" placeholder="Empresa ou pessoa" />
        </Field>
        <Field>
          <FieldLabel htmlFor="s-email" required>E-mail</FieldLabel>
          <Input id="s-email" type="email" placeholder="contato@empresa.com" />
        </Field>
        <Field>
          <FieldLabel htmlFor="s-note" optional>Observação</FieldLabel>
          <Textarea id="s-note" placeholder="Contexto do lead…" rows={3} />
        </Field>
      </FieldGroup>
    </FormSheet>
  )
}

function FilterDemo() {
  const [count, setCount] = React.useState(2)
  return (
    <FilterSheet
      activeCount={count}
      onClear={() => setCount(0)}
      onApply={() => {}}
      description="Refine a lista de leads."
    >
      <div className="space-y-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Estágio</p>
        {["Novo", "Qualificado", "Negociação", "Ganho", "Perdido"].map((s, i) => (
          <label key={s} className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked={i < 2} onCheckedChange={() => setCount((c) => c)} />
            {s}
          </label>
        ))}
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Responsável</p>
        <Input placeholder="Buscar responsável…" />
      </div>
    </FilterSheet>
  )
}

/* ---------- docs data ---------- */

const PRIMITIVE_PARTS: ApiRow[] = [
  { prop: "Sheet", type: "Dialog.Root", default: "—", description: "Raiz controlada/não-controlada (open, onOpenChange, defaultOpen)." },
  { prop: "SheetTrigger", type: "Dialog.Trigger", default: "—", description: "Abre o painel (use asChild com um Button)." },
  { prop: "SheetContent", type: "Dialog.Content", default: `side "right" · size "default"`, description: "Superfície ancorada. side: top/right/bottom/left; size: sm→full." },
  { prop: "SheetHeader / Body / Footer", type: "div", default: "—", description: "Cabeçalho (borda inferior), corpo rolável, rodapé de ações." },
  { prop: "SheetTitle / SheetDescription", type: "Dialog.Title/Description", default: "—", description: "Título e descrição acessíveis (rotulam o diálogo)." },
  { prop: "SheetClose", type: "Dialog.Close", default: "—", description: "Fecha o painel (use asChild)." },
]

const FAMILY_PROPS: ApiRow[] = [
  { prop: "RecordSheet", type: "name · subtitle · avatarSrc · loading · footer", default: `side "right"`, description: "Painel de detalhe com cabeçalho de avatar + SheetSection/SheetField." },
  { prop: "FormSheet", type: "title · onSubmit · submitting · submitLabel", default: `submit "Salvar"`, description: "Painel de formulário com rodapé Cancelar/Salvar (form nativo)." },
  { prop: "FilterSheet", type: "activeCount · onApply · onClear", default: `size "sm"`, description: "Painel de filtros com gatilho + contagem e rodapé Limpar/Aplicar." },
]

/* ---------- page ---------- */

export default function SheetPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Sheet"
        description={
          <>
            Painel deslizante ancorado a qualquer borda para detalhes, formulários e
            filtros — sobre o primitivo Radix Dialog (foco preso, scroll lock, Esc). É o
            mesmo primitivo do{" "}
            <code className="font-mono text-sm">Drawer</code>: o Sheet expõe os nomes{" "}
            <code className="font-mono text-sm">Sheet*</code> (mental model shadcn) e inclui
            presets de CRM (registro, formulário, filtros).
          </>
        }
      />

      {/* Relation note */}
      <div className="rounded-lg border border-info-foreground/20 bg-info/40 p-4 text-sm text-info-foreground">
        <strong>Sheet × Drawer:</strong> mesmo componente, dois nomes. Use{" "}
        <code className="font-mono text-xs">Sheet*</code> quando pensar no painel como
        superfície lateral de detalhe/formulário; <code className="font-mono text-xs">Drawer*</code>{" "}
        para bandejas top/bottom. Ambos compartilham <code className="font-mono text-xs">side</code> e{" "}
        <code className="font-mono text-xs">size</code>.
      </div>

      {/* Sides */}
      <Section
        title="Lados (side)"
        description="O painel ancora em qualquer borda. Direita é o padrão para detalhe/formulário; bottom/top para bandejas."
      >
        <Demo center>
          {(["right", "left", "top", "bottom"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline">side=&quot;{side}&quot;</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>Painel {side}</SheetTitle>
                  <SheetDescription>Ancorado à borda {side}.</SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <p className="text-sm text-muted-foreground">
                    Conteúdo do painel. Pressione Esc ou clique fora para fechar.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
          ))}
        </Demo>
      </Section>

      {/* Sizes */}
      <Section
        title="Tamanhos (size)"
        description="size mapeia para largura (left/right) ou altura (top/bottom): sm, default, lg, xl, full."
      >
        <Demo center>
          {(["sm", "default", "lg", "xl", "full"] as const).map((size) => (
            <Sheet key={size}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">{size}</Button>
              </SheetTrigger>
              <SheetContent side="right" size={size}>
                <SheetHeader>
                  <SheetTitle>size=&quot;{size}&quot;</SheetTitle>
                  <SheetDescription>Largura do painel lateral.</SheetDescription>
                </SheetHeader>
                <SheetBody>
                  <p className="text-sm text-muted-foreground">
                    Ajuste a largura ao conteúdo: sm para filtros, lg/xl para formulários densos.
                  </p>
                </SheetBody>
              </SheetContent>
            </Sheet>
          ))}
        </Demo>
      </Section>

      {/* CRM family */}
      <Section
        title="Família CRM"
        description="Presets prontos para os padrões mais comuns. Clique para abrir cada um."
      >
        <div className="space-y-4">
          <Demo center>
            <RecordSheet
              trigger={<Button variant="outline">RecordSheet — detalhe</Button>}
              name="Halvorson Inc"
              subtitle="Gold · Marketing & Advertising"
              footer={
                <>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm">Fechar</Button>
                  </SheetClose>
                  <Button size="sm">Abrir cliente</Button>
                </>
              }
            >
              <SheetSection title="Contato principal">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="size-4 text-muted-foreground" /> adrain@demo.com
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="size-4 text-muted-foreground" /> +1 (510) 925-0980
                </div>
              </SheetSection>
              <SheetSection title="Financeiro" className="mt-6">
                <SheetField label="Projetos" value="12" />
                <SheetField label="Faturado" value="$48,000.00" />
                <SheetField label="Em aberto" value="$2,100.00" />
              </SheetSection>
            </RecordSheet>

            <FormSubmitDemo />
            <FilterDemo />

            <LoadingRecordDemo />
          </Demo>
        </div>
      </Section>

      {/* States */}
      <Section
        title="Estados"
        description="Loading exibe um esqueleto no corpo (RecordSheet loading); o rodapé pode refletir submitting (spinner no botão). Empty é apenas conteúdo alternativo no corpo."
      >
        <Demo center>
          <LoadingRecordDemo />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Estado vazio</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Atividades</SheetTitle>
              </SheetHeader>
              <SheetBody className="flex flex-col items-center justify-center gap-2 text-center">
                <AlertCircle className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">Nenhuma atividade ainda.</p>
              </SheetBody>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      {/* Composition */}
      <Section
        title="Composição"
        description="O corpo aceita qualquer conteúdo do design system — formulários (Field/Input), listas, tabelas. Padrão comum: abrir o detalhe a partir de uma linha de tabela."
      >
        <Demo>
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/30 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Cliente</th>
                  <th className="px-4 py-3 text-right">Em aberto</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Halvorson Inc", due: "$2,100.00" },
                  { name: "Hauck Ltd", due: "$0.00" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-right tabular-nums">{row.due}</td>
                    <td className="px-4 py-3 text-right">
                      <RecordSheet
                        trigger={<Button variant="ghost" size="sm">Ver detalhe</Button>}
                        name={row.name}
                        subtitle="Cliente"
                      >
                        <SheetField label="Em aberto" value={row.due} />
                      </RecordSheet>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Demo>
        <CodeBlock>{`// abrir o detalhe a partir da linha
<RecordSheet
  trigger={<Button variant="ghost" size="sm">Ver detalhe</Button>}
  name={row.name}
  subtitle="Cliente"
>
  <SheetField label="Em aberto" value={row.due} />
</RecordSheet>`}</CodeBlock>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description={`Painéis laterais usam w-full max-w-* — no mobile ocupam a largura toda; no desktop, a largura do size. Para telas pequenas prefira side="bottom" (bandeja) ou size="full".`}
      >
        <Demo center>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Bottom (mobile-friendly)</Button>
            </SheetTrigger>
            <SheetContent side="bottom" size="default">
              <SheetHeader>
                <SheetTitle>Ações rápidas</SheetTitle>
                <SheetDescription>Bandeja inferior, boa para toque.</SheetDescription>
              </SheetHeader>
              <SheetBody className="grid grid-cols-2 gap-3">
                <Button variant="outline">Ligar</Button>
                <Button variant="outline">E-mail</Button>
                <Button variant="outline">Tarefa</Button>
                <Button variant="outline">Nota</Button>
              </SheetBody>
            </SheetContent>
          </Sheet>
        </Demo>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do primitivo aos presets.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Primitivo</p>
            <CodeBlock>{`import {
  Sheet, SheetTrigger, SheetContent,
  SheetHeader, SheetBody, SheetFooter, SheetTitle,
} from "@/components/ui/sheet"

<Sheet>
  <SheetTrigger asChild><Button>Abrir</Button></SheetTrigger>
  <SheetContent side="right" size="lg">
    <SheetHeader><SheetTitle>Detalhes</SheetTitle></SheetHeader>
    <SheetBody>{/* conteúdo rolável */}</SheetBody>
    <SheetFooter><Button>Salvar</Button></SheetFooter>
  </SheetContent>
</Sheet>`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Presets</p>
            <CodeBlock>{`import { RecordSheet, FormSheet, FilterSheet } from "@/components/sheet"

<RecordSheet trigger={<Button>Ver</Button>} name="Halvorson Inc" subtitle="Gold">
  <SheetField label="Em aberto" value="$2,100" />
</RecordSheet>

<FormSheet trigger={<Button>Novo lead</Button>} title="Novo lead"
  submitting={saving} onSubmit={save}>
  {/* <Field>…</Field> */}
</FormSheet>

<FilterSheet activeCount={2} onApply={run} onClear={reset}>
  {/* controles de filtro */}
</FilterSheet>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="Primitivos e presets.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Primitivos (@/components/ui/sheet)</h3>
            <ApiTable rows={PRIMITIVE_PARTS} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Presets (@/components/sheet)</h3>
            <ApiTable rows={FAMILY_PROPS} />
            <p className="text-xs text-muted-foreground">
              Todos os presets aceitam trigger, side, size e o par controlado open/onOpenChange (além de defaultOpen).
            </p>
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <GuidelinesSection
        dos={[
          "Use para fluxos secundários (detalhe, criação rápida, filtros) sem sair da lista.",
          "Prefira os presets (RecordSheet/FormSheet/FilterSheet) para consistência.",
          "Sempre inclua SheetTitle — rotula o diálogo para leitores de tela.",
          "Controle open para fechar após salvar (onSubmit → setOpen(false)).",
          "No mobile, use side=\"bottom\" ou size=\"full\" para melhor toque.",
        ]}
        donts={[
          "Usar para confirmação simples — prefira Dialog/AlertDialog.",
          "Empilhar muitos sheets; um fluxo por vez mantém o contexto.",
          "Conteúdo essencial só no sheet sem alternativa — é modal e bloqueia a página.",
          "Criar um sheet.tsx duplicado do Drawer — é o mesmo primitivo, use os aliases.",
          "Omitir o título/descrição acessível do Radix Dialog.",
        ]}
      />

      {/* Accessibility */}
      <AccessibilitySection
        items={[
          <>
            <span className="font-medium text-foreground">Foco preso:</span>{" "}
            o foco fica dentro do painel enquanto aberto e retorna ao gatilho ao fechar.
          </>,
          <>
            <span className="font-medium text-foreground">Teclado:</span>{" "}
            <code className="font-mono text-xs">Esc</code> fecha; Tab percorre só o conteúdo do painel.
          </>,
          <>
            <span className="font-medium text-foreground">Rótulo:</span>{" "}
            <code className="font-mono text-xs">SheetTitle</code>/<code className="font-mono text-xs">SheetDescription</code>{" "}
            conectam <code className="font-mono text-xs">aria-labelledby</code>/<code className="font-mono text-xs">aria-describedby</code>.
          </>,
          <>
            <span className="font-medium text-foreground">Scroll lock:</span>{" "}
            o fundo não rola enquanto o painel está aberto; overlay escurece a página.
          </>,
          <>
            <span className="font-medium text-foreground">Fechar:</span>{" "}
            botão X com <code className="font-mono text-xs">sr-only</code> “Fechar” e clique no overlay.
          </>,
        ]}
      />
    </StyleguidePage>
  )
}
