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
    label: "Default (Info)",
    title: "Update settings?",
    description: "This will update your account settings. Your changes will take effect immediately.",
    confirmLabel: "Update",
    triggerLabel: "Open Default",
    triggerVariant: "outline",
  },
  {
    variant: "destructive",
    label: "Destructive (Delete)",
    title: "Delete contact?",
    description: "This action cannot be undone. This will permanently delete the contact and all associated data.",
    confirmLabel: "Delete",
    triggerLabel: "Open Destructive",
    triggerVariant: "destructive",
  },
  {
    variant: "warning",
    label: "Warning",
    title: "Archive this project?",
    description: "Archiving will hide this project from the active list. You can restore it later from the archives.",
    confirmLabel: "Archive",
    triggerLabel: "Open Warning",
    triggerVariant: "outline",
  },
  {
    variant: "success",
    label: "Success",
    title: "Publish contract?",
    description: "Once published, this contract will be visible to all stakeholders and cannot be edited.",
    confirmLabel: "Publish",
    triggerLabel: "Open Success",
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
        <p className="font-heading text-base font-medium text-foreground">Delete contact?</p>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. This will permanently delete the contact.
        </p>
      </div>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="destructive" size="sm">Delete</Button>
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
            Modal dialogs for confirmation prompts (Radix AlertDialog). Four semantic variants for different action
            contexts. For general forms and content use the{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">Dialog</code> instead.
          </>
        }
      />

      <Section title="Variants" description="Each variant sets its own icon and confirm-button color: default (Info), destructive, warning and success.">
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

      <Section title="Loading State" description="While loading, both buttons are disabled and the confirm button shows a spinner — the async action can't be double-fired.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Destructive with async confirm</p>
          <Button variant="destructive" size="sm" onClick={() => setLoadingOpen(true)}>
            Open Loading Dialog
          </Button>
          <CRMAlertDialog
            open={loadingOpen}
            onOpenChange={setLoadingOpen}
            variant="destructive"
            title="Delete all records?"
            description="This will permanently remove all 1,247 records from the system. This action cannot be undone."
            confirmLabel="Deleting…"
            loading={isLoading}
            onConfirm={handleLoadingConfirm}
            onCancel={() => setLoadingOpen(false)}
          />
        </div>
      </Section>

      <Section title="Controlled" description="Drive open state externally via open / onOpenChange — useful when the dialog is triggered from a menu or a row action.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Managed via external open state</p>
          <Button variant="outline" size="sm" onClick={() => setControlledOpen(true)}>
            Open Controlled Dialog
          </Button>
          <CRMAlertDialog
            open={controlledOpen}
            onOpenChange={setControlledOpen}
            variant="warning"
            title="Reset pipeline stage?"
            description="All leads in this stage will be moved back to 'New'. This affects 23 active leads."
            confirmLabel="Reset Stage"
            onConfirm={() => { console.log("confirmed"); setControlledOpen(false) }}
            onCancel={() => setControlledOpen(false)}
          />
        </div>
      </Section>

      <Section title="Composition (raw primitives)" description="Compose your own layout with the underlying AlertDialog primitives when CRMAlertDialog isn't enough.">
        <div className="flex flex-col items-start gap-1.5">
          <p className="text-xs text-muted-foreground">Custom layout using AlertDialog primitives directly</p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">Open Custom Dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-primary/10 text-primary">
                  <Settings />
                </AlertDialogMedia>
                <AlertDialogTitle>Apply configuration</AlertDialogTitle>
                <AlertDialogDescription>
                  This will apply the selected configuration template to all new accounts.
                  Existing accounts remain unchanged.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="w-full">
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Apply template</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Section>

      <AccessibilitySection
        title="Accessibility"
        items={[
          <>Built on Radix AlertDialog: focus is trapped inside and returned to the trigger on close.</>,
          <>Unlike a regular dialog, an AlertDialog does <strong>not</strong> close on overlay click or <code className="font-mono text-xs">Esc</code> by default — a confirmation demands an explicit choice.</>,
          <><code className="font-mono text-xs">AlertDialogTitle</code> and <code className="font-mono text-xs">AlertDialogDescription</code> are wired as the accessible name/description for screen readers — always provide both.</>,
          <>The variant icon is decorative; meaning comes from the title, description and the destructive/default confirm button color.</>,
          <>While <code className="font-mono text-xs">loading</code>, both actions are disabled so an async confirm cannot be triggered twice.</>,
        ]}
      />

      <DarkModeSection description="The same confirmation surface in both themes — bg-card, semantic icon tint and shadow-modal all come from tokens.">
        <AlertDialogPreview />
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMAlertDialog } from "@/components/crm-alert-dialog"

// Trigger-driven (uncontrolled)
<CRMAlertDialog variant="destructive" title="Delete contact?"
  description="This action cannot be undone."
  confirmLabel="Delete" onConfirm={remove}>
  <Button variant="destructive">Delete</Button>
</CRMAlertDialog>

// Controlled + async loading
<CRMAlertDialog open={open} onOpenChange={setOpen} variant="warning"
  title="Reset stage?" description="Affects 23 leads."
  loading={loading} onConfirm={handleConfirm} onCancel={() => setOpen(false)} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        description="CRMAlertDialog — a variant-aware wrapper over the Radix AlertDialog primitives."
        groups={[
          [
            { prop: "variant", type: '"default" | "destructive" | "warning" | "success"', default: '"default"', description: "Visual variant affecting icon and confirm button color." },
            { prop: "title", type: "string", description: "Dialog heading (required)." },
            { prop: "description", type: "string", description: "Body text explaining the action (required)." },
            { prop: "confirmLabel", type: "string", default: '"Confirm"', description: "Text for the confirm button." },
            { prop: "cancelLabel", type: "string", default: '"Cancel"', description: "Text for the cancel button." },
          ],
          [
            { prop: "onConfirm", type: "() => void", description: "Called on confirm button click." },
            { prop: "onCancel", type: "() => void", description: "Called on cancel button click." },
            { prop: "loading", type: "boolean", default: "false", description: "Shows spinner and disables both buttons." },
            { prop: "open", type: "boolean", description: "Controlled open state." },
            { prop: "onOpenChange", type: "(open: boolean) => void", description: "Controlled open state handler." },
            { prop: "children", type: "ReactNode", description: "Trigger element (wrapped in AlertDialogTrigger)." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Best Practices"
        dos={[
          "Use AlertDialog for destructive or irreversible confirmations (delete, reset, publish).",
          "Match the variant to the action's tone — destructive for deletes, warning for reversible risk.",
          "Keep the description specific: name what will change and how many records are affected.",
          "Set loading during async confirms to prevent double submission.",
        ]}
        donts={[
          "Don't use AlertDialog for regular forms or content — use Dialog.",
          "Don't write vague labels like 'OK'; use an action verb ('Delete', 'Archive').",
          "Don't omit the description — it carries the consequence of the action.",
          "Don't allow dismissal of a destructive prompt without an explicit choice.",
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
