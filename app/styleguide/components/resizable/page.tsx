"use client"

import * as React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

function Section({ title, description, children }: { title: string; description?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  )
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{children}</pre>
}
function Pane({ label, className }: { label: string; className?: string }) {
  return (
    <div className={"flex h-full items-center justify-center p-6 text-sm text-muted-foreground " + (className ?? "")}>
      {label}
    </div>
  )
}

export default function ResizablePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Resizable</h1>
        <p className="max-w-2xl text-muted-foreground">
          Painéis divididos ajustáveis por arraste (react-resizable-panels). A alça usa <code>bg-border</code>
          e destaca em <code>primary</code> ao arrastar. Ideal para layouts lista/detalhe e editores lado a lado.
        </p>
      </header>

      <Section title="Horizontal — lista / detalhe" description="Arraste a alça central para ajustar a divisão.">
        <div className="h-64 overflow-hidden rounded-xl border border-border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={35} minSize={20}>
              <Pane label="Lista de contatos" className="bg-muted/20" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={65}>
              <Pane label="Detalhe do contato" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Section>

      <Section title="Vertical" description="direction=vertical divide em cima/baixo.">
        <div className="h-72 overflow-hidden rounded-xl border border-border">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60}>
              <Pane label="Tabela de deals" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <Pane label="Pré-visualização" className="bg-muted/20" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Section>

      <Section title="Aninhado — layout de inbox" description="Grupos aninhados montam um layout de três áreas.">
        <div className="h-80 overflow-hidden rounded-xl border border-border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25} minSize={15}>
              <Pane label="Pastas" className="bg-muted/20" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel defaultSize={55}>
                  <Pane label="Lista de mensagens" />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={45}>
                  <Pane label="Conteúdo da mensagem" className="bg-muted/20" />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Section>

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import {
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={35} minSize={20}>Lista</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}>Detalhe</ResizablePanel>
</ResizablePanelGroup>`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><code>direction</code> horizontal · vertical; <code>defaultSize</code>/<code>minSize</code>/<code>maxSize</code> em %</li>
              <li><code>withHandle</code> mostra a alça com grip; aninhe grupos para layouts complexos</li>
              <li>Alça focável por teclado; setas ajustam o tamanho</li>
              <li>O contêiner precisa ter altura definida.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
