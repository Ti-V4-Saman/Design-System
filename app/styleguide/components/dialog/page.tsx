"use client"

import * as React from "react"
import { UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

const SIZES = [
  { key: "sm", label: "Small", hint: "Confirmações curtas, avisos." },
  { key: "md", label: "Medium", hint: "Padrão — formulários simples." },
  { key: "lg", label: "Large", hint: "Formulários com mais campos." },
  { key: "xl", label: "Extra large", hint: "Tabelas, conteúdo denso." },
  { key: "full", label: "Full", hint: "Fluxos imersivos / mobile." },
] as const

function SectionTitle({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-4 mt-12 border-t border-border pt-8 first:mt-0 first:border-0 first:pt-0">
      <h2 className="text-lg font-semibold text-foreground">{children}</h2>
      {hint ? <p className="text-sm text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

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

  // FormDialog demo
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
    <div className="max-w-7xl p-8">
      <div className="mb-2">
        <h1 className="mb-1 text-2xl font-bold text-foreground">Dialog</h1>
        <p className="text-sm text-muted-foreground">
          Modais gerais do CRM V4 (Radix Dialog) — superfície{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-card</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-modal</code> e{" "}
          variantes de tamanho. Para confirmações/ações destrutivas use o{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">AlertDialog</code>.
        </p>
      </div>

      {/* ── Sizes ── */}
      <SectionTitle hint="sm · md (default) · lg · xl · full. max-w adapta ao viewport; full ocupa quase a tela toda.">
        Tamanhos
      </SectionTitle>
      <div className="flex flex-wrap gap-3">
        {SIZES.map((s) => (
          <Dialog
            key={s.key}
            open={openSize === s.key}
            onOpenChange={(o) => setOpenSize(o ? s.key : null)}
          >
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
                {s.key === "full"
                  ? " O corpo rola quando o conteúdo excede a altura disponível."
                  : ""}
              </p>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DialogClose>
                <Button>Confirmar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      {/* ── Base composition ── */}
      <SectionTitle hint="DialogTrigger + header, corpo e footer com barra em bg-muted. Botão de fechar no canto.">
        Composição base
      </SectionTitle>
      <Dialog open={baseOpen} onOpenChange={setBaseOpen}>
        <DialogTrigger asChild>
          <Button>Abrir dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do projeto</DialogTitle>
            <DialogDescription>
              Informações resumidas do projeto selecionado.
            </DialogDescription>
          </DialogHeader>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Cliente</dt>
            <dd className="text-foreground">Halvorson Inc</dd>
            <dt className="text-muted-foreground">Responsável</dt>
            <dd className="text-foreground">Sara Ann</dd>
            <dt className="text-muted-foreground">Status</dt>
            <dd className="text-foreground">Em andamento</dd>
            <dt className="text-muted-foreground">Prazo</dt>
            <dd className="text-foreground">24/07/2026</dd>
          </dl>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
            <Button>Abrir projeto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── FormDialog ── */}
      <SectionTitle hint="Modal de criar/editar: body rolável, Enter submete, loading bloqueia o fechamento, submit desabilitado enquanto inválido.">
        FormDialog — Novo lead
      </SectionTitle>
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setFormOpen(true)}>
          <UserPlus /> Novo lead
        </Button>
        {created ? (
          <span className="rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
            {created}
          </span>
        ) : null}
      </div>
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
          <Input
            id="lead-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Sandra Waters"
            autoFocus
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lead-email">Email</Label>
          <Input
            id="lead-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sandra@empresa.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lead-source">Origem</Label>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger id="lead-source">
              <SelectValue placeholder="Selecionar origem" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="referral">Indicação</SelectItem>
              <SelectItem value="organic">Orgânico</SelectItem>
              <SelectItem value="ads">Google Ads</SelectItem>
              <SelectItem value="event">Eventos</SelectItem>
              <SelectItem value="outbound">Outbound</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </FormDialog>

      {/* ── Scrollable ── */}
      <SectionTitle hint="Conteúdo longo: header e footer fixos, corpo rolável (max-h).">
        Conteúdo rolável
      </SectionTitle>
      <Dialog open={scrollOpen} onOpenChange={setScrollOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Ver termos</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Termos de contrato</DialogTitle>
            <DialogDescription>Revise antes de aprovar a proposta.</DialogDescription>
          </DialogHeader>
          <div className="-mx-1 max-h-[50vh] space-y-3 overflow-y-auto px-1 text-sm text-muted-foreground">
            {Array.from({ length: 12 }).map((_, i) => (
              <p key={i}>
                {i + 1}. Cláusula de exemplo do contrato descrevendo escopo, prazos, condições de
                pagamento e responsabilidades das partes envolvidas neste acordo comercial do CRM V4.
              </p>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Recusar</Button>
            </DialogClose>
            <Button>Aceitar termos</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Light / Dark ── */}
      <SectionTitle hint="A mesma superfície de dialog nos dois temas — bg-card, border e shadow-modal via tokens.">
        Light &amp; Dark
      </SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-background p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
          <DialogPreview />
        </div>
        <div className="dark rounded-xl border border-border bg-background p-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
          <DialogPreview />
        </div>
      </div>

      {/* ── Uso & API ── */}
      <SectionTitle hint="Base composta ou FormDialog controlado.">Uso &amp; API</SectionTitle>
      <Card>
        <CardContent className="pt-6">
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">
{`import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { FormDialog } from "@/components/dialog"

// Base — tamanho via prop size (sm | md | lg | xl | full)
<Dialog>
  <DialogTrigger asChild><Button>Abrir</Button></DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader><DialogTitle>Título</DialogTitle></DialogHeader>
    {/* conteúdo */}
    <DialogFooter><Button>Confirmar</Button></DialogFooter>
  </DialogContent>
</Dialog>

// FormDialog — create/edit com loading e guarda de fechamento
<FormDialog
  open={open} onOpenChange={setOpen}
  title="Novo lead" description="…"
  loading={loading} submitDisabled={!name}
  submitLabel="Criar lead" onSubmit={handleSubmit}
>
  <Label>Nome</Label><Input value={name} onChange={…} />
</FormDialog>`}
          </pre>
        </CardContent>
      </Card>

      {/* ── Do / Don't ── */}
      <SectionTitle>Boas práticas</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-success/30 bg-success/5 p-4">
          <p className="mb-2 text-sm font-semibold text-success">Do</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Use Dialog para formulários, detalhes e conteúdo geral.</li>
            <li>• Escolha o tamanho conforme a densidade do conteúdo.</li>
            <li>• Bloqueie o fechamento enquanto um submit está em andamento.</li>
            <li>• Dê foco ao primeiro campo e permita Enter para submeter.</li>
          </ul>
        </div>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <p className="mb-2 text-sm font-semibold text-destructive">Don&apos;t</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Não use Dialog para confirmar exclusões — use AlertDialog.</li>
            <li>• Não empilhe múltiplos dialogs; prefira um fluxo por vez.</li>
            <li>• Não coloque formulários longos sem corpo rolável.</li>
            <li>• Não remova o título/descrição (acessibilidade).</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
