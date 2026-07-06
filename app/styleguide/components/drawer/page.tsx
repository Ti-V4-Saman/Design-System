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
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  DesignNotes,
  GuidelinesSection,
  Kbd,
  RelatedComponents,
  ResponsiveSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

/* -------------------------------------------------------------------------------------------------
 * Demo helpers
 * -----------------------------------------------------------------------------------------------*/

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

/** Non-portaled replica of the drawer surface, to show it in both themes. */
function DrawerPreview() {
  return (
    <div className="flex max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground shadow-[var(--shadow-modal)]">
      <div className="border-b border-border p-4">
        <p className="font-heading text-base font-medium text-foreground">Editar contato</p>
        <p className="text-sm text-muted-foreground">Atualize os dados e salve.</p>
      </div>
      <div className="space-y-2 p-4 text-sm text-muted-foreground">
        <div className="h-9 rounded-md border border-input bg-transparent" />
        <div className="h-9 rounded-md border border-input bg-transparent" />
      </div>
      <div className="flex justify-end gap-2 border-t border-border bg-muted/50 p-4">
        <Button variant="outline" size="sm">Cancelar</Button>
        <Button size="sm">Salvar</Button>
      </div>
    </div>
  )
}

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
    <StyleguidePage>
      <ComponentHeader
        title="Drawer"
        description={
          <>
            Painel deslizante ancorado a qualquer borda, construído sobre o Radix Dialog (foco preso,
            scroll lock, ESC, aria). Toda a aparência vem dos tokens do CRM V4.
          </>
        }
      />

      <Section
        title="Sides"
        description="A prop side ancora o painel em qualquer borda. Right é o padrão para detalhes e formulários."
      >
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        title="Composição — exemplos reais de CRM"
        description="Padrões recorrentes: painel de detalhes, formulário de edição e filtros — compostos com os primitivos."
      >
        <Demo center>
          <ContactDetailDrawer />
          <EditContactDrawer />
          <FiltersDrawer />
        </Demo>
      </Section>

      <Section
        title="Composição — controlado"
        description="Controle open / onOpenChange para abrir o drawer a partir de qualquer lógica da aplicação."
      >
        <Demo center>
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

      <AccessibilitySection
        items={[
          <><Kbd>Esc</Kbd> fecha o drawer e o clique no overlay também (modal).</>,
          <><Kbd>Tab</Kbd> mantém o foco preso dentro do painel; ao fechar, o foco retorna ao trigger.</>,
          <><code className="font-mono text-xs">DrawerTitle</code> é obrigatório para rotular o painel a leitores de tela.</>,
          <>Scroll lock impede a rolagem do fundo enquanto o drawer está aberto.</>,
        ]}
      />

      <ResponsiveSection description="Em telas estreitas os painéis laterais ocupam a largura total (w-full) até o max-width do tamanho escolhido. Reduza a largura da janela para comparar.">
        <Demo center>
          <CRMDrawer
            title="Painel responsivo"
            description="Ocupa w-full em telas pequenas."
            trigger={<Button variant="outline">Abrir drawer</Button>}
            footer={
              <DrawerClose asChild>
                <Button>Ok</Button>
              </DrawerClose>
            }
          >
            <p className="text-sm text-muted-foreground">
              A largura acompanha o tamanho; em mobile o painel cobre a tela até o max-width.
            </p>
          </CRMDrawer>
        </Demo>
      </ResponsiveSection>

      <DarkModeSection description="A mesma superfície de drawer nos dois temas — bg-card, border-border e shadow-modal via tokens.">
        <DrawerPreview />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "side", type: '"right" | "left" | "top" | "bottom"', default: '"right"', description: "Borda em que o painel é ancorado." },
            { prop: "size", type: '"sm" | "default" | "lg" | "xl" | "full"', default: '"default"', description: "Largura (left/right) ou altura (top/bottom)." },
            { prop: "title / description", type: "ReactNode", description: "Conteúdo do cabeçalho." },
            { prop: "trigger / footer", type: "ReactNode", description: "Elemento que abre o drawer e ações do rodapé." },
          ],
          [
            { prop: "loading", type: "boolean", default: "false", description: "Troca o corpo por um skeleton enquanto carrega." },
            { prop: "open / onOpenChange", type: "boolean / fn", description: "Estado controlado do drawer." },
            { prop: "defaultOpen", type: "boolean", description: "Estado inicial no modo não-controlado." },
            { prop: "showClose", type: "boolean", default: "true", description: "Renderiza o botão X de fechar." },
          ],
        ]}
      />

      <Section title="Código" description="Import único; primitivos para controle total ou CRMDrawer para o caminho rápido.">
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
        </div>
      </Section>

      <GuidelinesSection
        dos={[
          "Use right/left para detalhes e formulários no CRM.",
          "Coloque ações primárias no DrawerFooter.",
          "Deixe o corpo rolar; mantenha header/footer fixos.",
        ]}
        donts={[
          "Não empilhe múltiplos drawers modais.",
          "Não use full em desktop para conteúdo curto.",
          "Não omita o DrawerTitle (quebra a11y).",
        ]}
      />

      <DesignNotes
        items={[
          <>É o mesmo primitivo do <strong>Sheet</strong> (Radix Dialog + <code className="font-mono text-xs">bg-card</code>, <code className="font-mono text-xs">shadow-modal</code>, <code className="font-mono text-xs">border-border</code>); os nomes <code className="font-mono text-xs">Drawer*</code> favorecem bandejas top/bottom, os <code className="font-mono text-xs">Sheet*</code> favorecem painéis laterais. A animação de slide muda conforme o <code className="font-mono text-xs">side</code>.</>,
          <>A prop <code className="font-mono text-xs">size</code> vira <code className="font-mono text-xs">width</code> em left/right e <code className="font-mono text-xs">height</code> em top/bottom; painéis laterais são sempre <code className="font-mono text-xs">w-full</code> até o <code className="font-mono text-xs">max-w-*</code> do tamanho (cobrem a tela no mobile) e <code className="font-mono text-xs">full</code> vira <code className="font-mono text-xs">w-screen</code>.</>,
          <>É modal: <code className="font-mono text-xs">Esc</code> e clique no overlay fecham, com foco preso e scroll lock (herdados do Radix Dialog).</>,
          <>O <code className="font-mono text-xs">CRMDrawer</code> troca o corpo por um skeleton quando <code className="font-mono text-xs">loading</code>, mantendo header e footer fixos e só o corpo rolando.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Sheet", href: "/styleguide/components/sheet", description: "Mesmo primitivo, com nomes Sheet* e presets de CRM (registro/form/filtro)." },
          { name: "Dialog", href: "/styleguide/components/dialog", description: "Modal centralizado — prefira para conteúdo curto e focado." },
          { name: "Alert Dialog", href: "/styleguide/components/alert-dialog", description: "Confirmações destrutivas que não devem virar um painel." },
          { name: "Sidebar", href: "/styleguide/components/sidebar", description: "Painel lateral persistente de navegação (não modal)." },
        ]}
      />
    </StyleguidePage>
  )
}
