"use client"

import * as React from "react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Kanban,
  LayoutGrid,
  List,
} from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

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
function Demo({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl border bg-card p-5"><div className="flex flex-wrap items-center gap-6">{children}</div></div>
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{children}</pre>
}

export default function ToggleGroupPage() {
  const [view, setView] = React.useState("list")

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Toggle Group</h1>
        <p className="max-w-2xl text-muted-foreground">
          Conjunto de toggles como controle segmentado (Radix ToggleGroup). Seleção única ou múltipla;
          itens herdam variante/tamanho do grupo. Tokens <code>accent</code> no estado ativo.
        </p>
      </header>

      <Section title="Seleção única — alternador de visão" description="type=single: uma opção ativa por vez (ex.: Lista/Grade/Kanban).">
        <Demo>
          <ToggleGroup type="single" variant="outline" value={view} onValueChange={(v) => v && setView(v)}>
            <ToggleGroupItem value="list" aria-label="Lista"><List /> Lista</ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grade"><LayoutGrid /> Grade</ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban"><Kanban /> Kanban</ToggleGroupItem>
          </ToggleGroup>
          <span className="text-sm text-muted-foreground">Visão: <strong className="text-foreground">{view}</strong></span>
        </Demo>
      </Section>

      <Section title="Seleção múltipla — formatação" description="type=multiple: várias opções simultâneas.">
        <Demo>
          <ToggleGroup type="multiple" variant="outline" defaultValue={["left"]}>
            <ToggleGroupItem value="left" aria-label="Alinhar à esquerda"><AlignLeft /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenter /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Alinhar à direita"><AlignRight /></ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </Section>

      <Section title="Variante default & tamanhos">
        <Demo>
          <ToggleGroup type="single" defaultValue="a" size="sm">
            <ToggleGroupItem value="a">Dia</ToggleGroupItem>
            <ToggleGroupItem value="b">Semana</ToggleGroupItem>
            <ToggleGroupItem value="c">Mês</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="single" defaultValue="b" variant="outline" size="lg">
            <ToggleGroupItem value="a">Q1</ToggleGroupItem>
            <ToggleGroupItem value="b">Q2</ToggleGroupItem>
            <ToggleGroupItem value="c">Q3</ToggleGroupItem>
            <ToggleGroupItem value="d">Q4</ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </Section>

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" variant="outline" value={view} onValueChange={setView}>
  <ToggleGroupItem value="list"><List /> Lista</ToggleGroupItem>
  <ToggleGroupItem value="grid"><LayoutGrid /> Grade</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="multiple" defaultValue={["left"]}> … </ToggleGroup>`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><code>type</code> single · multiple; <code>variant</code>/<code>size</code> no grupo (herdados pelos itens)</li>
              <li>Em single, trate o valor vazio (desmarcar) para não zerar a visão.</li>
              <li>Setas navegam entre itens; <code>aria-label</code> quando só ícone.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
