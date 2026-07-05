"use client"

import * as React from "react"
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
      {children}
    </section>
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
    <div className="p-8 space-y-12">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Alert Dialog</h1>
        <p className="text-muted-foreground mt-1">
          Modal dialogs for confirmation prompts. Four semantic variants for different action contexts.
        </p>
      </div>

      <Section title="Variants">
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

      <Section title="Loading State">
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

      <Section title="Controlled">
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

      <Section title="Composition (raw primitives)">
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

      <Section title="Props — CRMAlertDialog">
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30 border-b border-border">
                <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground">Prop</th>
                <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground">Type</th>
                <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground">Default</th>
                <th className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide text-muted-foreground">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                ["variant", '"default" | "destructive" | "warning" | "success"', '"default"', "Visual variant affecting icon and confirm button color"],
                ["title", "string", "—", "Dialog heading (required)"],
                ["description", "string", "—", "Body text explaining the action (required)"],
                ["confirmLabel", "string", '"Confirm"', "Text for the confirm button"],
                ["cancelLabel", "string", '"Cancel"', "Text for the cancel button"],
                ["onConfirm", "() => void", "—", "Called on confirm button click"],
                ["onCancel", "() => void", "—", "Called on cancel button click"],
                ["loading", "boolean", "false", "Shows spinner and disables buttons"],
                ["open", "boolean", "—", "Controlled open state"],
                ["onOpenChange", "(open: boolean) => void", "—", "Controlled open state handler"],
                ["children", "ReactNode", "—", "Trigger element (wrapped in AlertDialogTrigger)"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop} className="hover:bg-muted/20">
                  <td className="px-4 py-2.5 font-mono text-xs text-primary">{prop}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{type}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{def}</td>
                  <td className="px-4 py-2.5 text-xs text-foreground">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
