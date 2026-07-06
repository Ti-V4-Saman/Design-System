"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CRMAlertDialog, type CRMAlertDialogVariant } from "@/components/crm-alert-dialog"
import { Settings } from "lucide-react"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  DesignNotes,
  GuidelinesSection,
  RelatedComponents,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const VARIANTS: {
  variant: CRMAlertDialogVariant
  label: string
  title: string
  description: string
  confirmLabel: string
  triggerLabel: string
  triggerVariant: "default" | "destructive" | "outline" | "secondary"
}[] = [
  {
    variant: "default",
    label: "Padrão (Info)",
    title: "Atualizar configurações?",
    description: "Isso atualizará as configurações da sua conta. Suas alterações terão efeito imediato.",
    confirmLabel: "Atualizar",
    triggerLabel: "Abrir Padrão",
    triggerVariant: "outline",
  },
  {
    variant: "destructive",
    label: "Destrutivo (Excluir)",
    title: "Excluir contato?",
    description: "Esta ação não pode ser desfeita. Isso excluirá permanentemente o contato e todos os dados associados.",
    confirmLabel: "Excluir",
    triggerLabel: "Abrir Destrutivo",
    triggerVariant: "destructive",
  },
  {
    variant: "warning",
    label: "Aviso",
    title: "Arquivar este projeto?",
    description: "Arquivar irá ocultar este projeto da lista de ativos. Você poderá restaurá-lo depois a partir do arquivo.",
    confirmLabel: "Arquivar",
    triggerLabel: "Abrir Aviso",
    triggerVariant: "outline",
  },
  {
    variant: "success",
    label: "Sucesso",
    title: "Publicar contrato?",
    description: "Uma vez publicado, este contrato ficará visível para todos os stakeholders e não poderá ser editado.",
    confirmLabel: "Publicar",
    triggerLabel: "Abrir Sucesso",
    triggerVariant: "outline",
  },
]

/** Non-portaled replica of the alert-dialog surface, to show it in both themes. */
function AlertDialogPreview() {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-card p-6 text-center shadow-[var(--shadow-modal)]">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive [&_svg]:h-6 [&_svg]:w-6">
        <Trash2 />
      </div>
      <div className="space-y-1.5">
        <p className="font-heading text-base font-medium text-foreground">Excluir contato?</p>
        <p className="text-sm text-muted-foreground">
          Esta ação não pode ser desfeita. Isso excluirá permanentemente o contato.
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">Cancelar</Button>
        <Button variant="destructive" size="sm">Excluir</Button>
      </div>
    </div>
  )
}

export default function AlertDialogPage() {
  const [controlledOpen, setControlledOpen] = React.useState(false)
  const [loadingOpen, setLoadingOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  function handleLoadingConfirm() {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setLoadingOpen(false)
    }, 2500)
  }

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Alert Dialog"
        description={
          <>
            Diálogos modais para prompts de confirmação (Radix AlertDialog). Quatro variantes semânticas para
            diferentes contextos de ação. Para formulários e conteúdo em geral, use o{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Dialog</code> em vez deste.
          </>
        }
      />

      <Section title="Variantes" description="Cada variante define seu próprio ícone e cor do botão de confirmação: padrão (Info), destrutivo, aviso e sucesso.">
        <div className="flex flex-wrap gap-3">
          {VARIANTS.map(({ variant, label, title, description, confirmLabel, triggerLabel, triggerVariant }) => (
            <div key={variant} className="flex flex-col items-start gap-1.5">
              <p className="text-xs text-muted-foreground">{label}</p>
              <CRMAlertDialog
                variant={variant}
                title={title}
                description={description}
                confirmLabel={confirmLabel}
                onConfirm={() => console.log(`${variant} confirmed`)}
              >
                <Button variant={triggerVariant} size="sm">{triggerLabel}</Button>
              </CRMAlertDialog>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Estado de Carregamento" description="Durante o carregamento, ambos os botões ficam desabilitados e o botão de confirmação exibe um spinner — a ação assíncrona não pode ser disparada duas vezes.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Destrutivo com confirmação assíncrona</p>
          <Button variant="destructive" size="sm" onClick={() => setLoadingOpen(true)}>
            Abrir Diálogo de Carregamento
          </Button>
          <CRMAlertDialog
            open={loadingOpen}
            onOpenChange={setLoadingOpen}
            variant="destructive"
            title="Excluir todos os registros?"
            description="Isso removerá permanentemente todos os 1.247 registros do sistema. Esta ação não pode ser desfeita."
            confirmLabel="Excluindo…"
            loading={isLoading}
            onConfirm={handleLoadingConfirm}
            onCancel={() => setLoadingOpen(false)}
          />
        </div>
      </Section>

      <Section title="Controlado" description="Controle o estado de abertura externamente via open / onOpenChange — útil quando o diálogo é acionado por um menu ou por uma ação de linha.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Gerenciado por estado de abertura externo</p>
          <Button variant="outline" size="sm" onClick={() => setControlledOpen(true)}>
            Abrir Diálogo Controlado
          </Button>
          <CRMAlertDialog
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            variant="warning"
            title="Redefinir etapa do funil?"
            description="Todos os leads nesta etapa serão movidos de volta para 'Novo'. Isso afeta 23 leads ativos."
            confirmLabel="Redefinir Etapa"
            onConfirm={() => { console.log("confirmed"); setControlledOpen(false) }}
            onCancel={() => setControlledOpen(false)}
          />
        </div>
      </Section>

      <Section title="Composição (primitivos puros)" description="Componha seu próprio layout com os primitivos subjacentes do AlertDialog quando o CRMAlertDialog não for suficiente.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Layout personalizado usando os primitivos do AlertDialog diretamente</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Abrir Diálogo Personalizado</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-primary/10 text-primary">
                  <Settings />
                </AlertDialogMedia>
                <AlertDialogTitle>Aplicar configuração</AlertDialogTitle>
                <AlertDialogDescription>
                  Isso aplicará o modelo de configuração selecionado a todas as novas contas.
                  As contas existentes permanecem inalteradas.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction>Aplicar modelo</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Section>

      <AccessibilitySection
        title="Acessibilidade"
        items={[
          <>Construído sobre o Radix AlertDialog: o foco fica preso dentro e retorna ao gatilho ao fechar.</>,
          <>Ao contrário de um diálogo comum, um AlertDialog <strong>não</strong> fecha ao clicar no overlay nem com <code className="font-mono text-xs">Esc</code> por padrão — uma confirmação exige uma escolha explícita.</>,
          <><code className="font-mono text-xs">AlertDialogTitle</code> e <code className="font-mono text-xs">AlertDialogDescription</code> são conectados como o nome/descrição acessíveis para leitores de tela — sempre forneça ambos.</>,
          <>O ícone da variante é decorativo; o significado vem do título, da descrição e da cor do botão de confirmação destructive/default.</>,
          <>Durante o <code className="font-mono text-xs">loading</code>, ambas as ações ficam desabilitadas para que uma confirmação assíncrona não possa ser acionada duas vezes.</>,
        ]}
      />

      <DarkModeSection description="A mesma superfície de confirmação em ambos os temas — bg-card, tint semântico do ícone e shadow-modal vêm todos de tokens.">
        <AlertDialogPreview />
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMAlertDialog } from "@/components/crm-alert-dialog"

// Acionado por gatilho (não controlado)
<CRMAlertDialog variant="destructive" title="Excluir contato?"
  description="Esta ação não pode ser desfeita."
  confirmLabel="Excluir" onConfirm={remove}>
  <Button variant="destructive">Excluir</Button>
</CRMAlertDialog>

// Controlado + carregamento assíncrono
<CRMAlertDialog open={open} onOpenChange={setOpen} variant="warning"
  title="Redefinir etapa?" description="Afeta 23 leads."
  loading={loading} onConfirm={handleConfirm} onCancel={() => setOpen(false)} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        description="CRMAlertDialog — um wrapper ciente de variantes sobre os primitivos do Radix AlertDialog."
        groups={[
          [
            { prop: "variant", type: '"default" | "destructive" | "warning" | "success"', default: '"default"', description: "Variante visual que afeta o ícone e a cor do botão de confirmação." },
            { prop: "title", type: "string", description: "Título do diálogo (obrigatório)." },
            { prop: "description", type: "string", description: "Texto do corpo que explica a ação (obrigatório)." },
            { prop: "confirmLabel", type: "string", default: '"Confirm"', description: "Texto do botão de confirmação." },
            { prop: "cancelLabel", type: "string", default: '"Cancel"', description: "Texto do botão de cancelamento." },
          ],
          [
            { prop: "onConfirm", type: "() => void", description: "Chamado ao clicar no botão de confirmação." },
            { prop: "onCancel", type: "() => void", description: "Chamado ao clicar no botão de cancelamento." },
            { prop: "loading", type: "boolean", default: "false", description: "Mostra o spinner e desabilita ambos os botões." },
            { prop: "open", type: "boolean", description: "Estado de abertura controlado." },
            { prop: "onOpenChange", type: "(open: boolean) => void", description: "Handler do estado de abertura controlado." },
            { prop: "children", type: "ReactNode", description: "Elemento de gatilho (envolvido em AlertDialogTrigger)." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Boas Práticas"
        dos={[
          "Use o AlertDialog para confirmações destrutivas ou irreversíveis (excluir, redefinir, publicar).",
          "Combine a variante com o tom da ação — destructive para exclusões, warning para risco reversível.",
          "Mantenha a descrição específica: diga o que vai mudar e quantos registros são afetados.",
          "Defina loading durante confirmações assíncronas para evitar envio duplicado.",
        ]}
        donts={[
          "Não use o AlertDialog para formulários ou conteúdo comuns — use o Dialog.",
          "Não escreva rótulos vagos como 'OK'; use um verbo de ação ('Excluir', 'Arquivar').",
          "Não omita a descrição — ela carrega a consequência da ação.",
          "Não permita descartar um prompt destrutivo sem uma escolha explícita.",
        ]}
      />

      <DesignNotes
        items={[
          <>Compartilha a elevação modal do Dialog (<code className="font-mono text-xs">bg-card</code>, <code className="font-mono text-xs">rounded-xl</code>, <code className="font-mono text-xs">border-border</code>, <code className="font-mono text-xs">shadow-modal</code>), mas é mais estreito (<code className="font-mono text-xs">max-w-sm</code>) e com conteúdo centralizado — o ícone vive num círculo <code className="font-mono text-xs">rounded-full</code> com tint semântico.</>,
          <>Ao contrário do Dialog, <strong>não</strong> fecha no <code className="font-mono text-xs">Esc</code> nem no clique do overlay (Radix AlertDialog) — exige uma escolha explícita entre confirmar e cancelar.</>,
          <>A <code className="font-mono text-xs">variant</code> altera apenas o ícone e a cor do botão de confirmação; o significado da ação vem do título e da descrição.</>,
          <>Durante <code className="font-mono text-xs">loading</code>, ambos os botões ficam desabilitados para impedir que um confirm assíncrono dispare duas vezes.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Dialog", href: "/styleguide/components/dialog", description: "Modal geral para formulários e conteúdo — sem a semântica de confirmação." },
          { name: "Drawer", href: "/styleguide/components/drawer", description: "Painel deslizante para fluxos mais longos que não cabem num alerta." },
          { name: "Sheet", href: "/styleguide/components/sheet", description: "Mesmo primitivo do Drawer, para detalhe/edição lateral." },
          { name: "Sonner", href: "/styleguide/components/sonner", description: "Toast não bloqueante para confirmar o resultado após a ação." },
        ]}
      />
    </StyleguidePage>
  )
}
