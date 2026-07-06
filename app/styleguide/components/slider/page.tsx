"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"

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
  return <div className="rounded-xl border bg-card p-5">{children}</div>
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">{children}</pre>
}

const brl = (v: number) => `R$ ${(v * 1000).toLocaleString("pt-BR")}`

export default function SliderPage() {
  const [single, setSingle] = React.useState([40])
  const [range, setRange] = React.useState([30, 120])

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Slider</h1>
        <p className="max-w-2xl text-muted-foreground">
          Seleção de valor(es) por arraste (Radix Slider). Trilha <code>bg-muted</code>, faixa selecionada
          <code> bg-primary</code>, thumbs com anel de foco. Suporta um ou dois thumbs (range) e orientação vertical.
        </p>
      </header>

      <Section title="Simples" description="Um thumb; valor controlado.">
        <Demo>
          <div className="max-w-md space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Probabilidade de fechamento</span><span className="text-foreground">{single[0]}%</span>
            </div>
            <Slider value={single} onValueChange={setSingle} max={100} step={1} />
          </div>
        </Demo>
      </Section>

      <Section title="Range (dois thumbs)" description="Filtro de faixa — ex.: valor do deal.">
        <Demo>
          <div className="max-w-md space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Valor do deal</span><span className="text-foreground">{brl(range[0])} – {brl(range[1])}</span>
            </div>
            <Slider value={range} onValueChange={setRange} min={0} max={200} step={5} />
          </div>
        </Demo>
      </Section>

      <Section title="Steps & desabilitado" description="step define os incrementos; disabled bloqueia interação.">
        <Demo>
          <div className="max-w-md space-y-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">step = 25</p>
              <Slider defaultValue={[50]} max={100} step={25} />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">disabled</p>
              <Slider defaultValue={[40]} max={100} disabled />
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Vertical" description="orientation=vertical para painéis compactos.">
        <Demo>
          <div className="flex h-48 items-center gap-8">
            <Slider defaultValue={[60]} max={100} orientation="vertical" />
            <Slider defaultValue={[25, 75]} max={100} orientation="vertical" />
          </div>
        </Demo>
      </Section>

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[40]} max={100} step={1} />           // simples
<Slider value={range} onValueChange={setRange} max={200} /> // range (array)
<Slider defaultValue={[60]} orientation="vertical" />        // vertical`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>Passe um array com 2 valores para virar range (2 thumbs).</li>
              <li><code>min</code>, <code>max</code>, <code>step</code>, <code>orientation</code>, <code>disabled</code>.</li>
              <li>Teclado: setas ajustam; Home/End vão aos extremos (Radix).</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
