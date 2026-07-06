"use client"

import * as React from "react"
import { Bold, Italic, Star, Underline } from "lucide-react"

import { Toggle } from "@/components/ui/toggle"
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
  DesignNotes,
  RelatedComponents,
} from "@/app/styleguide/_components"

export default function TogglePage() {
  const [fav, setFav] = React.useState(false)

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Toggle"
        description={
          <>
            Botão de dois estados (on/off) — Radix Toggle. O estado pressionado usa os tokens{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code>; variante <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">outline</code> adiciona borda. Tamanhos sm/default/lg.
          </>
        }
      />

      <Section title="Variantes" description="default (fantasma) e outline.">
        <Demo center>
          <Toggle aria-label="Negrito"><Bold /></Toggle>
          <Toggle variant="outline" aria-label="Itálico"><Italic /></Toggle>
          <Toggle>Com texto</Toggle>
          <Toggle variant="outline">Outline texto</Toggle>
        </Demo>
      </Section>

      <Section title="Tamanhos">
        <Demo center>
          <Toggle size="sm" aria-label="sm"><Bold /></Toggle>
          <Toggle size="default" aria-label="default"><Bold /></Toggle>
          <Toggle size="lg" aria-label="lg"><Bold /></Toggle>
        </Demo>
      </Section>

      <Section title="Estados" description="Ícone + texto, desabilitado e controlado (pressed).">
        <Demo center>
          <Toggle variant="outline"><Underline /> Sublinhado</Toggle>
          <Toggle disabled aria-label="disabled"><Bold /></Toggle>
          <Toggle pressed={fav} onPressedChange={setFav} variant="outline" aria-label="Favoritar">
            <Star className={fav ? "fill-warning text-warning" : ""} />
            {fav ? "Favoritado" : "Favoritar"}
          </Toggle>
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>Expõe <code className="font-mono text-xs">aria-pressed</code> refletindo o estado on/off (Radix).</>,
          <>Acionável por <code className="font-mono text-xs">Enter</code> e <code className="font-mono text-xs">Espaço</code>; focável por teclado com anel visível.</>,
          <><code className="font-mono text-xs">aria-label</code> é obrigatório quando o toggle mostra apenas um ícone.</>,
          <>Estado <code className="font-mono text-xs">disabled</code> remove o foco e reduz a opacidade.</>,
        ]}
      />

      <DarkModeSection description="Estado pressionado (accent) e a borda outline vêm dos tokens — mesma leitura nos dois temas.">
        <div className="flex flex-wrap items-center gap-3">
          <Toggle aria-label="Negrito"><Bold /></Toggle>
          <Toggle variant="outline" aria-label="Itálico"><Italic /></Toggle>
          <Toggle variant="outline" defaultPressed><Underline /> Sublinhado</Toggle>
        </div>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "variant", type: '"default" | "outline"', default: '"default"', description: "default é fantasma; outline adiciona borda de input." },
            { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Altura do controle (h-7 / h-8 / h-9)." },
          ],
          [
            { prop: "pressed / defaultPressed", type: "boolean", description: "Estado on/off — controlado ou não." },
            { prop: "onPressedChange", type: "(pressed: boolean) => void", description: "Callback ao alternar o estado." },
            { prop: "disabled", type: "boolean", default: "false", description: "Bloqueia interação e reduz opacidade." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Toggle } from "@/components/ui/toggle"

<Toggle aria-label="Negrito"><Bold /></Toggle>
<Toggle variant="outline" size="sm"><Italic /></Toggle>
<Toggle pressed={on} onPressedChange={setOn}>Favoritar</Toggle>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use para um estado binário independente (ligar/desligar um recurso).",
          "Dê aria-label quando o toggle for só ícone.",
          "Reflita o estado no rótulo/ícone (ex.: Favoritar → Favoritado).",
          "Use outline quando o toggle precisa de mais presença visual.",
        ]}
        donts={[
          "Não use para escolher entre opções mutuamente exclusivas — use Toggle Group.",
          "Não use no lugar de um Switch para preferências de formulário.",
          "Não omita o rótulo acessível em toggles só de ícone.",
          "Não empilhe muitos toggles soltos sem agrupá-los visualmente.",
        ]}
      />
      <DesignNotes
        items={[
          "Toggle de dois estados sobre o primitivo Radix: o estado pressionado usa os tokens accent (data-[state=on]:bg-accent).",
          "variant outline adiciona borda de input para mais presença; sizes sm/default/lg com min-w garantem alvo quadrado em toggles só de ícone.",
          "Compartilha toggleVariants (cva) com o Toggle Group, mantendo consistência visual entre um toggle solto e o controle segmentado.",
        ]}
      />
      <RelatedComponents
        items={[
          { name: "Toggle Group", href: "/styleguide/components/toggle-group", description: "Reúne toggles num controle segmentado com seleção única ou múltipla." },
          { name: "Switch", href: "/styleguide/components/switch", description: "Preferência booleana de formulário em vez de ação imediata." },
          { name: "Button", href: "/styleguide/components/button", description: "Ação sem estado persistente de pressionado." },
        ]}
      />
    </StyleguidePage>
  )
}
