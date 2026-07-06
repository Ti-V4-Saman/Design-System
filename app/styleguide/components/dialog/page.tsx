"use client"

import * as React from "react"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormDialog } from "@/components/dialog"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const SIZES = [
  { key: "sm", label: "Small", hint: "Confirmações curtas, avisos." },
  { key: "md", label: "Medium", hint: "Padrão — formulários simples." },
  { key: "lg", label: "Large", hint: "Formulários com mais campos." },
  { key: "xl", label: "Extra large", hint: "Tabelas, conteúdo denso." },
  { key: "full", label: "Full", hint: "Fluxos imersivos / mobile." },
] as const

/** Non-portaled replica of DialogContent, to show the surface in both themes. */
function DialogPreview() {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-card p-4 text-sm text-card-foreground shadow-[var(--shadow-modal)]">
      <div className="flex flex-col gap-2">
        <span className="font-heading text-base font-medium leading-none text-foreground">
          Editar cliente
        </span>
        <span className="text-sm text-muted-foreground">
          Atualize as informações do cliente e salve as alterações.
        </span>
      </div>
      <div className="space-y-2">
        <div className="h-9 rounded-md border border-input bg-transparent" />
        <div className="h-9 rounded-md border border-input bg-transparent" />
      </div>
      <div className="-mx-4 -mb-4 flex justify-end gap-2 rounded-b-xl border-t bg-muted/50 p-4">
        <Button variant="outline" size="sm">Cancelar</Button>
        <Button size="sm">Salvar</Button>
      </div>
    </div>
  )
}

export default function DialogPage() {
  const [openSize, setOpenSize] = React.useState<string | null>(null)
  const [baseOpen, setBaseOpen] = React.useState(false)
  const [scrollOpen, setScrollOpen] = React.useState(false)

  const [formOpen, setFormOpen] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [source, setSource] = React.useState("")
  const [created, setCreated] = React.useState<string>("")

  const submitLead = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setCreated(`Lead criado: ${name}`)
    setFormOpen(false)
    setName("")
    setEmail("")
    setSource("")
  }

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Dialog"
        description={
          <>
            Modais gerais do CRM V4 (Radix Dialog) — superfície <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-card</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-modal</code> e variantes de tamanho. Para
            confirmações/ações destrutivas use o <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">AlertDialog</code>.
          </>
        }
      />

      <Section title="Tamanhos" description="sm · md (default) · lg · xl · full. max-w adapta ao viewport; full ocupa quase a tela toda.">
        <Demo center>
          {SIZES.map((s) => (
            <Dialog key={s.key} open={openSize === s.key} onOpenChange={(o) => setOpenSize(o ? s.key : null)}>
              <DialogTrigger asChild>
                <Button variant="outline">{s.label}</Button>
              </DialogTrigger>
              <DialogContent size={s.key}>
                <DialogHeader>
                  <DialogTitle>Dialog {s.label}</DialogTitle>
                  <DialogDescription>{s.hint}</DialogDescription>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                  Conteúdo do dialog de tamanho <strong className="text-foreground">{s.key}</strong>.
                  {s.key === "full" ? " O corpo rola quando o conteúdo excede a altura disponível." : ""}
                </p>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Fechar</Button></DialogClose>
                  <Button>Confirmar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </Demo>
      </Section>

      <Section title="Composição" description="Base (header/corpo/footer), conteúdo rolável e o FormDialog para criar/editar.">
        <Demo center>
          {/* Base composition */}
          <Dialog open={baseOpen} onOpenChange={setBaseOpen}>
            <DialogTrigger asChild><Button>Detalhes do projeto</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Detalhes do projeto</DialogTitle>
                <DialogDescription>Informações resumidas do projeto selecionado.</DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Cliente</dt><dd className="text-foreground">Halvorson Inc</dd>
                <dt className="text-muted-foreground">Responsável</dt><dd className="text-foreground">Sara Ann</dd>
                <dt className="text-muted-foreground">Status</dt><dd className="text-foreground">Em andamento</dd>
                <dt className="text-muted-foreground">Prazo</dt><dd className="text-foreground">24/07/2026</dd>
              </dl>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Fechar</Button></DialogClose>
                <Button>Abrir projeto</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Scrollable */}
          <Dialog open={scrollOpen} onOpenChange={setScrollOpen}>
            <DialogTrigger asChild><Button variant="outline">Conteúdo rolável</Button></DialogTrigger>
            <DialogContent size="lg">
              <DialogHeader>
                <DialogTitle>Termos de contrato</DialogTitle>
                <DialogDescription>Revise antes de aprovar a proposta.</DialogDescription>
              </DialogHeader>
              <div className="-mx-1 max-h-[50vh] space-y-3 overflow-y-auto px-1 text-sm text-muted-foreground">
                {Array.from({ length: 12 }).map((_, i) => (
                  <p key={i}>{i + 1}. Cláusula de exemplo descrevendo escopo, prazos, condições de pagamento e responsabilidades das partes neste acordo comercial do CRM V4.</p>
                ))}
              </div>
              <DialogFooter>
                <DialogClose asChild><Button variant="outline">Recusar</Button></DialogClose>
                <Button>Aceitar termos</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* FormDialog */}
          <Button onClick={() => setFormOpen(true)}><UserPlus /> Novo lead (FormDialog)</Button>
          {created ? (
            <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">{created}</span>
          ) : null}
          <FormDialog
            open={formOpen}
            onOpenChange={setFormOpen}
            title="Novo lead"
            description="Preencha os dados para criar um novo lead no pipeline."
            loading={loading}
            submitDisabled={!name.trim()}
            submitLabel="Criar lead"
            onSubmit={submitLead}
          >
            <div className="grid gap-2">
              <Label htmlFor="lead-name">Nome *</Label>
              <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: Sandra Waters" autoFocus />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-email">Email</Label>
              <Input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sandra@empresa.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lead-source">Origem</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger id="lead-source"><SelectValue placeholder="Selecionar origem" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="referral">Indicação</SelectItem>
                  <SelectItem value="organic">Orgânico</SelectItem>
                  <SelectItem value="ads">Google Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </FormDialog>
        </Demo>
      </Section>

      <DarkModeSection description="A mesma superfície de dialog nos dois temas — bg-card, border e shadow-modal via tokens.">
        <DialogPreview />
      </DarkModeSection>

      <AccessibilitySection
        items={[
          <>Foco preso no dialog (focus trap) e retornado ao gatilho ao fechar (Radix).</>,
          <>Fecha com <code className="font-mono text-xs">Esc</code> e clique no overlay.</>,
          <>Sempre inclua <code className="font-mono text-xs">DialogTitle</code>/<code className="font-mono text-xs">DialogDescription</code> (rotulagem por leitores de tela).</>,
          <>FormDialog bloqueia o fechamento durante <code className="font-mono text-xs">loading</code> para não interromper um submit.</>,
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { FormDialog } from "@/components/dialog"

// Base — tamanho via prop size (sm | md | lg | xl | full)
<Dialog>
  <DialogTrigger asChild><Button>Abrir</Button></DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader><DialogTitle>Título</DialogTitle></DialogHeader>
    <DialogFooter><Button>Confirmar</Button></DialogFooter>
  </DialogContent>
</Dialog>

// FormDialog — create/edit com loading e guarda de fechamento
<FormDialog open={open} onOpenChange={setOpen} title="Novo lead"
  loading={loading} submitDisabled={!name} onSubmit={handleSubmit}>
  <Label>Nome</Label><Input value={name} onChange={…} />
</FormDialog>`}</CodeBlock>
      </Section>

      <ApiSection
        groups={[
          [
            { prop: "DialogContent.size", type: '"sm"|"md"|"lg"|"xl"|"full"', default: '"md"', description: "Largura do modal; full quase full-screen." },
            { prop: "Dialog", type: "open, onOpenChange, defaultOpen", description: "Raiz Radix — controlado ou não." },
            { prop: "DialogTrigger / DialogClose", type: "asChild", description: "Abrir/fechar via elemento filho." },
          ],
          [
            { prop: "FormDialog", type: "open, onOpenChange, onSubmit", description: "Modal de formulário controlado." },
            { prop: "FormDialog.loading", type: "boolean", default: "false", description: "Spinner + bloqueia fechamento." },
            { prop: "FormDialog.submitDisabled", type: "boolean", default: "false", description: "Desabilita o botão de envio." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Use Dialog para formulários, detalhes e conteúdo geral.",
          "Escolha o tamanho conforme a densidade do conteúdo.",
          "Bloqueie o fechamento enquanto um submit está em andamento.",
          "Dê foco ao primeiro campo e permita Enter para submeter.",
        ]}
        donts={[
          "Não use Dialog para confirmar exclusões — use AlertDialog.",
          "Não empilhe múltiplos dialogs; prefira um fluxo por vez.",
          "Não coloque formulários longos sem corpo rolável.",
          "Não remova o título/descrição (acessibilidade).",
        ]}
      />
    </StyleguidePage>
  )
}
