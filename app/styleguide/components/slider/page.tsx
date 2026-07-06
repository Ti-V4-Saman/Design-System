"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const brl = (v: number) => `R$ ${(v * 1000).toLocaleString("pt-BR")}`

export default function SliderPage() {
  const [single, setSingle] = React.useState([40])
  const [range, setRange] = React.useState([30, 120])

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Slider"
        description={
          <>
            Seleção de valor(es) por arraste (Radix Slider). Trilha <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-muted</code>, faixa selecionada{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-primary</code>, thumbs com anel de foco. Suporta um ou dois thumbs (range) e orientação vertical.
          </>
        }
      />

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

      <AccessibilitySection
        items={[
          <>Cada thumb é focável e ajustável pelas setas; <code className="font-mono text-xs">Home</code>/<code className="font-mono text-xs">End</code> vão aos extremos (Radix).</>,
          <><code className="font-mono text-xs">PageUp</code>/<code className="font-mono text-xs">PageDown</code> movem em passos maiores; o incremento respeita <code className="font-mono text-xs">step</code>.</>,
          <>Os thumbs expõem <code className="font-mono text-xs">role=&quot;slider&quot;</code> com <code className="font-mono text-xs">aria-valuemin/max/now</code>.</>,
          <>Anel de foco visível (<code className="font-mono text-xs">ring-ring</code>); estado desabilitado bloqueia interação e reduz opacidade.</>,
          <>Rotule o controle com um <code className="font-mono text-xs">label</code> ou <code className="font-mono text-xs">aria-label</code> descritivo do valor.</>,
        ]}
      />

      <DarkModeSection description="Trilha (bg-muted), faixa (bg-primary) e thumbs vêm dos tokens — mesma leitura nos dois temas.">
        <div className="max-w-md space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Probabilidade</span><span className="text-foreground">60%</span>
          </div>
          <Slider defaultValue={[60]} max={100} step={1} />
        </div>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "value / defaultValue", type: "number[]", description: "Array de valores; 2 valores viram range (2 thumbs)." },
            { prop: "onValueChange", type: "(value: number[]) => void", description: "Callback a cada mudança de valor." },
            { prop: "min / max / step", type: "number", default: "0 / 100 / 1", description: "Limites e incremento do controle." },
          ],
          [
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Eixo do slider; vertical exige altura no contêiner." },
            { prop: "disabled", type: "boolean", default: "false", description: "Bloqueia interação e reduz opacidade." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Slider } from "@/components/ui/slider"

<Slider defaultValue={[40]} max={100} step={1} />           // simples
<Slider value={range} onValueChange={setRange} max={200} /> // range (array)
<Slider defaultValue={[60]} orientation="vertical" />        // vertical`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Passe um array com 2 valores para criar um filtro de faixa (range).",
          "Mostre o valor atual perto do slider (label/contador).",
          "Escolha um step coerente com a precisão que o usuário precisa.",
          "Rotule o controle para leitores de tela.",
        ]}
        donts={[
          "Não use slider para valores exatos que exigem digitação (use input).",
          "Não omita altura no contêiner ao usar orientação vertical.",
          "Não use steps grandes onde o usuário precisa de precisão fina.",
          "Não deixe o slider sem rótulo ou contexto de unidade.",
        ]}
      />
    </StyleguidePage>
  )
}
