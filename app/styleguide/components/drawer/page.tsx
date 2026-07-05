"use client"

import * as React from "react"
import {
  Building2,
  Calendar,
  Filter,
  Mail,
  PanelBottom,
  PanelLeft,
  PanelRight,
  PanelTop,
  Pencil,
  Phone,
  Plus,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CRMDrawer } from "@/components/crm-drawer"
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

/* -------------------------------------------------------------------------------------------------
 * Page-local presentation helpers
 * -----------------------------------------------------------------------------------------------*/

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

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      {children}
    </pre>
  )
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
      <div className="space-y-0.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
    </div>
  )
}

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * Sub-demos
 * -----------------------------------------------------------------------------------------------*/

const SIDES = [
  { side: "right", label: "Right (padrão)", icon: PanelRight },
  { side: "left", label: "Left", icon: PanelLeft },
  { side: "top", label: "Top", icon: PanelTop },
  { side: "bottom", label: "Bottom", icon: PanelBottom },
] as const

const SIZES = ["sm", "default", "lg", "xl", "full"] as const

/** Rich CRM example: a contact detail panel built from the primitives. */
function ContactDetailDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <User className="size-4" /> Ver contato
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="default">
        <DrawerHeader>
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div>
              <DrawerTitle>Ana Souza</DrawerTitle>
              <DrawerDescription>Head of Growth · Acme Inc.</DrawerDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge>Cliente</Badge>
            <Badge variant="secondary">Enterprise</Badge>
            <Badge variant="outline">SP</Badge>
          </div>
        </DrawerHeader>
        <DrawerBody className="space-y-5">
          <Field icon={Mail} label="E-mail" value="ana.souza@acme.com" />
          <Field icon={Phone} label="Telefone" value="+55 11 98765-4321" />
          <Field icon={Building2} label="Empresa" value="Acme Inc. · 210 colaboradores" />
          <Field icon={Calendar} label="Último contato" value="3 dias atrás · Reunião de renovação" />
          <div className="rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-xs font-medium text-muted-foreground">Deal em aberto</p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              Renovação Enterprise — R$ 148.000
            </p>
            <p className="text-xs text-muted-foreground">Estágio: Proposta · 70% de probabilidade</p>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
          <Button>
            <Pencil className="size-4" /> Editar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/** Rich CRM example: an edit form drawer. */
function EditContactDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Pencil className="size-4" /> Editar contato
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="lg">
        <DrawerHeader>
          <DrawerTitle>Editar contato</DrawerTitle>
          <DrawerDescription>Atualize os dados do contato e salve as alterações.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="drawer-name">Nome</Label>
              <Input id="drawer-name" defaultValue="Ana Souza" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drawer-role">Cargo</Label>
              <Input id="drawer-role" defaultValue="Head of Growth" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drawer-email">E-mail</Label>
              <Input id="drawer-email" type="email" defaultValue="ana.souza@acme.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="drawer-phone">Telefone</Label>
              <Input id="drawer-phone" defaultValue="+55 11 98765-4321" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="drawer-notes">Notas</Label>
            <Textarea id="drawer-notes" rows={4} placeholder="Contexto, próximos passos…" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Salvar alterações</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/** Rich CRM example: a filters drawer. */
function FiltersDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter className="size-4" /> Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right" size="sm">
        <DrawerHeader>
          <DrawerTitle>Filtrar deals</DrawerTitle>
          <DrawerDescription>Refine a lista do pipeline.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody className="space-y-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">Estágio</legend>
            {["Prospecção", "Qualificação", "Proposta", "Negociação"].map((stage) => (
              <div key={stage} className="flex items-center gap-2">
                <Checkbox id={`stage-${stage}`} defaultChecked={stage === "Proposta"} />
                <Label htmlFor={`stage-${stage}`} className="font-normal">
                  {stage}
                </Label>
              </div>
            ))}
          </fieldset>
          <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-foreground">Período</legend>
            <RadioGroup defaultValue="30d">
              {[
                { value: "7d", label: "Últimos 7 dias" },
                { value: "30d", label: "Últimos 30 dias" },
                { value: "quarter", label: "Trimestre atual" },
              ].map((opt) => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem id={`period-${opt.value}`} value={opt.value} />
                  <Label htmlFor={`period-${opt.value}`} className="font-normal">
                    {opt.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </fieldset>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Limpar</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Aplicar filtros</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function DrawerPage() {
  const [loading, setLoading] = React.useState(false)
  const [controlledOpen, setControlledOpen] = React.useState(false)

  const openLoading = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 2200)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Drawer</h1>
        <p className="max-w-2xl text-muted-foreground">
          Painel deslizante ancorado a qualquer borda, construído sobre o Radix Dialog (foco preso,
          scroll lock, ESC, aria). Toda a aparência vem dos tokens do CRM V4 — troque o tema para
          ver em dark mode.
        </p>
      </header>

      <Section
        title="Sides"
        description="A prop side ancora o painel em qualquer borda. Right é o padrão para detalhes e formulários."
      >
        <Demo>
          {SIDES.map(({ side, label, icon: Icon }) => (
            <CRMDrawer
              key={side}
              side={side}
              title={`Drawer ${label}`}
              description={`Painel ancorado à borda ${side}.`}
              trigger={
                <Button variant="outline">
                  <Icon className="size-4" /> {label}
                </Button>
              }
              footer={
                <DrawerClose asChild>
                  <Button>Ok</Button>
                </DrawerClose>
              }
            >
              <p className="text-sm text-muted-foreground">
                Conteúdo do drawer <strong className="text-foreground">{side}</strong>. Use right/left
                para painéis laterais e top/bottom para sheets.
              </p>
            </CRMDrawer>
          ))}
        </Demo>
      </Section>

      <Section
        title="Sizes"
        description="size controla a largura (left/right) ou a altura (top/bottom): sm · default · lg · xl · full."
      >
        <Demo>
          {SIZES.map((size) => (
            <CRMDrawer
              key={size}
              size={size}
              title={`Size: ${size}`}
              description="Right drawer — a prop size vira largura."
              trigger={<Button variant="outline">{size}</Button>}
              footer={
                <DrawerClose asChild>
                  <Button>Fechar</Button>
                </DrawerClose>
              }
            >
              <p className="text-sm text-muted-foreground">
                Largura correspondente ao tamanho <strong className="text-foreground">{size}</strong>.
              </p>
            </CRMDrawer>
          ))}
        </Demo>
      </Section>

      <Section
        title="Estados — Loading & Empty"
        description="O CRMDrawer troca o corpo por um skeleton com a prop loading. O estado vazio é uma composição no corpo."
      >
        <Demo>
          <CRMDrawer
            loading={loading}
            title="Carregando contato"
            description="Buscando os dados mais recentes…"
            trigger={
              <Button variant="outline" onClick={openLoading}>
                Abrir com loading (2s)
              </Button>
            }
            footer={
              <DrawerClose asChild>
                <Button variant="outline">Fechar</Button>
              </DrawerClose>
            }
          >
            <p className="text-sm text-muted-foreground">Dados carregados com sucesso.</p>
          </CRMDrawer>

          <CRMDrawer
            title="Sem atividades"
            description="Nenhum registro para este contato."
            trigger={<Button variant="outline">Estado vazio</Button>}
          >
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Calendar className="size-6" />
              </span>
              <p className="text-sm font-medium text-foreground">Nenhuma atividade ainda</p>
              <p className="max-w-xs text-sm text-muted-foreground">
                As interações com este contato aparecerão aqui.
              </p>
              <Button size="sm" className="mt-2">
                <Plus className="size-4" /> Registrar atividade
              </Button>
            </div>
          </CRMDrawer>
        </Demo>
      </Section>

      <Section
        title="Exemplos reais de CRM"
        description="Padrões recorrentes: painel de detalhes, formulário de edição e filtros — compostos com os primitivos."
      >
        <Demo>
          <ContactDetailDrawer />
          <EditContactDrawer />
          <FiltersDrawer />
        </Demo>
      </Section>

      <Section
        title="Controlado"
        description="Controle open / onOpenChange para abrir o drawer a partir de qualquer lógica da aplicação."
      >
        <Demo>
          <Button onClick={() => setControlledOpen(true)}>Abrir programaticamente</Button>
          <span className="text-sm text-muted-foreground">
            Estado: {controlledOpen ? "aberto" : "fechado"}
          </span>
          <CRMDrawer
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            title="Drawer controlado"
            description="Aberto via estado do React."
            footer={
              <Button onClick={() => setControlledOpen(false)}>Fechar</Button>
            }
          >
            <p className="text-sm text-muted-foreground">
              Sem trigger — a visibilidade é 100% controlada pelo componente pai.
            </p>
          </CRMDrawer>
        </Demo>
      </Section>

      <Section
        title="Light / Dark & Responsivo"
        description="As superfícies vêm dos tokens, então o drawer acompanha o tema. Em telas estreitas os painéis laterais ocupam a largura total (w-full) até o max-width."
      >
        <Demo>
          <CRMDrawer
            title="Tema atual"
            description="Alterne o tema no topo para comparar."
            trigger={<Button variant="outline">Abrir drawer</Button>}
            footer={
              <DrawerClose asChild>
                <Button>Ok</Button>
              </DrawerClose>
            }
          >
            <p className="text-sm text-muted-foreground">
              bg-card, border-border e shadow-modal se adaptam automaticamente a light/dark.
            </p>
          </CRMDrawer>
        </Demo>
      </Section>

      <Section title="Uso & API" description="Import único; primitivos para controle total ou CRMDrawer para o caminho rápido.">
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium">CRMDrawer (caminho rápido)</p>
            <CodeBlock>{`import { CRMDrawer } from "@/components/crm-drawer"
import { Button } from "@/components/ui/button"
import { DrawerClose } from "@/components/ui/drawer"

<CRMDrawer
  side="right"            // right | left | top | bottom
  size="default"         // sm | default | lg | xl | full
  title="Editar contato"
  description="Atualize os dados e salve."
  loading={isLoading}    // troca o corpo por skeleton
  trigger={<Button>Editar</Button>}
  footer={<DrawerClose asChild><Button>Salvar</Button></DrawerClose>}
>
  {/* corpo rolável */}
</CRMDrawer>`}</CodeBlock>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium">Primitivos (controle total)</p>
            <CodeBlock>{`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, DrawerClose,
} from "@/components/ui/drawer"

<Drawer>
  <DrawerTrigger asChild><Button>Abrir</Button></DrawerTrigger>
  <DrawerContent side="right" size="lg">
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Descrição opcional.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* conteúdo */}</DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
      <Button>Confirmar</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}</CodeBlock>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Props</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>side</code> — right · left · top · bottom (padrão right)</li>
                <li><code>size</code> — sm · default · lg · xl · full</li>
                <li><code>title</code>, <code>description</code> — cabeçalho</li>
                <li><code>trigger</code>, <code>footer</code> — nós React</li>
                <li><code>loading</code> — skeleton no corpo</li>
                <li><code>open</code> / <code>onOpenChange</code> — controlado</li>
                <li><code>showClose</code> — botão X (padrão true)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade & teclado</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><kbd className="rounded bg-muted px-1">Esc</kbd> fecha o drawer</li>
                <li><kbd className="rounded bg-muted px-1">Tab</kbd> mantém o foco preso dentro</li>
                <li>Foco retorna ao trigger ao fechar</li>
                <li><code>DrawerTitle</code> obrigatório para leitores de tela</li>
                <li>Overlay clicável fecha (modal)</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use right/left para detalhes e formulários no CRM.</li>
                <li>Coloque ações primárias no <code>DrawerFooter</code>.</li>
                <li>Deixe o corpo rolar; mantenha header/footer fixos.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não empilhe múltiplos drawers modais.</li>
                <li>Não use full em desktop para conteúdo curto.</li>
                <li>Não omita o <code>DrawerTitle</code> (quebra a11y).</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
