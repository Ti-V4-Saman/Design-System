"use client"

import * as React from "react"
import { AlertCircle, Check, Mail, Phone, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

/* ---------- page-local presentation helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Demo({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={"rounded-xl border bg-card p-6 " + (className ?? "")}>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

function ApiTable({
  rows,
  caption,
}: {
  rows: Array<[string, string, string, string]>
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Nome</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Padrão</th>
            <th className="px-4 py-2 font-medium">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(([a, b, c, d]) => (
            <tr key={a} className="align-top">
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-foreground">{a}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{b}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{c}</code>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="px-4 py-2 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}

function GuidelineCard({
  tone,
  title,
  items,
}: {
  tone: "do" | "dont"
  title: string
  items: string[]
}) {
  const isDo = tone === "do"
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={
            "flex size-6 items-center justify-center rounded-full " +
            (isDo ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive")
          }
        >
          {isDo ? <Check className="size-3.5" /> : <AlertCircle className="size-3.5" />}
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={
                "mt-1.5 size-1 shrink-0 rounded-full " +
                (isDo ? "bg-success" : "bg-destructive")
              }
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

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

const PRIMITIVE_PARTS: Array<[string, string, string, string]> = [
  ["Sheet", "Dialog.Root", "—", "Raiz controlada/não-controlada (open, onOpenChange, defaultOpen)."],
  ["SheetTrigger", "Dialog.Trigger", "—", "Abre o painel (use asChild com um Button)."],
  ["SheetContent", "Dialog.Content", `side "right" · size "default"`, "Superfície ancorada. side: top/right/bottom/left; size: sm→full."],
  ["SheetHeader / Body / Footer", "div", "—", "Cabeçalho (borda inferior), corpo rolável, rodapé de ações."],
  ["SheetTitle / SheetDescription", "Dialog.Title/Description", "—", "Título e descrição acessíveis (rotulam o diálogo)."],
  ["SheetClose", "Dialog.Close", "—", "Fecha o painel (use asChild)."],
]

const FAMILY_PROPS: Array<[string, string, string, string]> = [
  ["RecordSheet", "name · subtitle · avatarSrc · loading · footer", `side "right"`, "Painel de detalhe com cabeçalho de avatar + SheetSection/SheetField."],
  ["FormSheet", "title · onSubmit · submitting · submitLabel", `submit "Salvar"`, "Painel de formulário com rodapé Cancelar/Salvar (form nativo)."],
  ["FilterSheet", "activeCount · onApply · onClear", `size "sm"`, "Painel de filtros com gatilho + contagem e rodapé Limpar/Aplicar."],
]

/* ---------- page ---------- */

export default function SheetPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Header */}
      <header className="space-y-3">
        <Badge variant="secondary">Core · Overlay</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Sheet</h1>
        <p className="max-w-2xl text-muted-foreground">
          Painel deslizante ancorado a qualquer borda para detalhes, formulários e
          filtros — sobre o primitivo Radix Dialog (foco preso, scroll lock, Esc). É o
          mesmo primitivo do{" "}
          <code className="font-mono text-sm">Drawer</code>: o Sheet expõe os nomes{" "}
          <code className="font-mono text-sm">Sheet*</code> (mental model shadcn) e inclui
          presets de CRM (registro, formulário, filtros).
        </p>
      </header>

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
        <Demo>
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
        <Demo>
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
          <Demo>
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
        <Demo>
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
        <Demo className="!block">
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
        <Demo>
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
            <ApiTable
              rows={FAMILY_PROPS}
              caption="Todos os presets aceitam trigger, side, size e o par controlado open/onOpenChange (além de defaultOpen)."
            />
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <Section title="Boas práticas" description="Diretrizes de uso.">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Faça"
            items={[
              "Use para fluxos secundários (detalhe, criação rápida, filtros) sem sair da lista.",
              "Prefira os presets (RecordSheet/FormSheet/FilterSheet) para consistência.",
              "Sempre inclua SheetTitle — rotula o diálogo para leitores de tela.",
              "Controle open para fechar após salvar (onSubmit → setOpen(false)).",
              "No mobile, use side=\"bottom\" ou size=\"full\" para melhor toque.",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Evite"
            items={[
              "Usar para confirmação simples — prefira Dialog/AlertDialog.",
              "Empilhar muitos sheets; um fluxo por vez mantém o contexto.",
              "Conteúdo essencial só no sheet sem alternativa — é modal e bloqueia a página.",
              "Criar um sheet.tsx duplicado do Drawer — é o mesmo primitivo, use os aliases.",
              "Omitir o título/descrição acessível do Radix Dialog.",
            ]}
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Herdado do Radix Dialog.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Foco preso:</span>{" "}
              o foco fica dentro do painel enquanto aberto e retorna ao gatilho ao fechar.
            </li>
            <li>
              <span className="font-medium text-foreground">Teclado:</span>{" "}
              <code className="font-mono text-xs">Esc</code> fecha; Tab percorre só o conteúdo do painel.
            </li>
            <li>
              <span className="font-medium text-foreground">Rótulo:</span>{" "}
              <code className="font-mono text-xs">SheetTitle</code>/<code className="font-mono text-xs">SheetDescription</code>{" "}
              conectam <code className="font-mono text-xs">aria-labelledby</code>/<code className="font-mono text-xs">aria-describedby</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Scroll lock:</span>{" "}
              o fundo não rola enquanto o painel está aberto; overlay escurece a página.
            </li>
            <li>
              <span className="font-medium text-foreground">Fechar:</span>{" "}
              botão X com <code className="font-mono text-xs">sr-only</code> “Fechar” e clique no overlay.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}
