"use client"

import * as React from "react"
import { Bold, Italic, Star, Underline } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"

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
  return <div className="rounded-xl border bg-card p-5"><div className="flex flex-wrap items-center gap-3">{children}</div></div>
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{children}</pre>
}

export default function TogglePage() {
  const [fav, setFav] = React.useState(false)

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Toggle</h1>
        <p className="max-w-2xl text-muted-foreground">
          Botão de dois estados (on/off) — Radix Toggle. O estado pressionado usa os tokens
          <code> accent</code>; variante <code>outline</code> adiciona borda. Tamanhos sm/default/lg.
        </p>
      </header>

      <Section title="Variantes" description="default (fantasma) e outline.">
        <Demo>
          <Toggle aria-label="Negrito"><Bold /></Toggle>
          <Toggle variant="outline" aria-label="Itálico"><Italic /></Toggle>
          <Toggle>Com texto</Toggle>
          <Toggle variant="outline">Outline texto</Toggle>
        </Demo>
      </Section>

      <Section title="Tamanhos">
        <Demo>
          <Toggle size="sm" aria-label="sm"><Bold /></Toggle>
          <Toggle size="default" aria-label="default"><Bold /></Toggle>
          <Toggle size="lg" aria-label="lg"><Bold /></Toggle>
        </Demo>
      </Section>

      <Section title="Ícone + texto, desabilitado, controlado">
        <Demo>
          <Toggle variant="outline"><Underline /> Sublinhado</Toggle>
          <Toggle disabled aria-label="disabled"><Bold /></Toggle>
          <Toggle pressed={fav} onPressedChange={setFav} variant="outline" aria-label="Favoritar">
            <Star className={fav ? "fill-warning text-warning" : ""} />
            {fav ? "Favoritado" : "Favoritar"}
          </Toggle>
        </Demo>
      </Section>

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Negrito"><Bold /></Toggle>
<Toggle variant="outline" size="sm"><Italic /></Toggle>
<Toggle pressed={on} onPressedChange={setOn}>Favoritar</Toggle>`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><code>variant</code> (default · outline), <code>size</code> (sm · default · lg), <code>disabled</code></li>
              <li><code>pressed</code> / <code>onPressedChange</code> — controlado; <code>aria-label</code> obrigatório quando só ícone</li>
              <li>Para escolher entre opções, use o Toggle Group.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
