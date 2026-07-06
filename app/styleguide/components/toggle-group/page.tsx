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

export default function ToggleGroupPage() {
  const [view, setView] = React.useState("list")

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Toggle Group"
        description={
          <>
            Conjunto de toggles como controle segmentado (Radix ToggleGroup). Seleção única ou múltipla;
            itens herdam variante/tamanho do grupo. Tokens <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">accent</code> no estado ativo.
          </>
        }
      />

      <Section title="Seleção única — alternador de visão" description="type=single: uma opção ativa por vez (ex.: Lista/Grade/Kanban).">
        <Demo center>
          <ToggleGroup type="single" variant="outline" value={view} onValueChange={(v) => v && setView(v)}>
            <ToggleGroupItem value="list" aria-label="Lista"><List /> Lista</ToggleGroupItem>
            <ToggleGroupItem value="grid" aria-label="Grade"><LayoutGrid /> Grade</ToggleGroupItem>
            <ToggleGroupItem value="kanban" aria-label="Kanban"><Kanban /> Kanban</ToggleGroupItem>
          </ToggleGroup>
          <span className="text-sm text-muted-foreground">Visão: <strong className="text-foreground">{view}</strong></span>
        </Demo>
      </Section>

      <Section title="Seleção múltipla — formatação" description="type=multiple: várias opções simultâneas.">
        <Demo center>
          <ToggleGroup type="multiple" variant="outline" defaultValue={["left"]}>
            <ToggleGroupItem value="left" aria-label="Alinhar à esquerda"><AlignLeft /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Centralizar"><AlignCenter /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Alinhar à direita"><AlignRight /></ToggleGroupItem>
          </ToggleGroup>
        </Demo>
      </Section>

      <Section title="Variante default & tamanhos">
        <Demo center>
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

      <AccessibilitySection
        items={[
          <>As setas navegam entre os itens do grupo (roving tabindex, Radix).</>,
          <>Em <code className="font-mono text-xs">type=&quot;single&quot;</code> o grupo se comporta como radiogroup; em <code className="font-mono text-xs">multiple</code>, cada item tem <code className="font-mono text-xs">aria-pressed</code>.</>,
          <><code className="font-mono text-xs">aria-label</code> é obrigatório em itens que mostram apenas ícone.</>,
          <>Foco visível por item; <code className="font-mono text-xs">Enter</code>/<code className="font-mono text-xs">Espaço</code> alternam a seleção.</>,
        ]}
      />

      <DarkModeSection description="O item ativo (accent) e a borda outline do segmento vêm dos tokens — mesma leitura nos dois temas.">
        <ToggleGroup type="single" variant="outline" defaultValue="grid">
          <ToggleGroupItem value="list" aria-label="Lista"><List /> Lista</ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grade"><LayoutGrid /> Grade</ToggleGroupItem>
          <ToggleGroupItem value="kanban" aria-label="Kanban"><Kanban /> Kanban</ToggleGroupItem>
        </ToggleGroup>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "type", type: '"single" | "multiple"', description: "single = uma opção ativa; multiple = várias simultâneas." },
            { prop: "value / defaultValue", type: "string | string[]", description: "Valor(es) selecionado(s); array em multiple." },
            { prop: "onValueChange", type: "(value) => void", description: "Callback ao mudar a seleção (trate valor vazio em single)." },
          ],
          [
            { prop: "variant", type: '"default" | "outline"', default: '"default"', description: "Herdado pelos itens via contexto." },
            { prop: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Herdado pelos itens via contexto." },
            { prop: "ToggleGroupItem.value", type: "string", description: "Identifica cada item; aria-label quando só ícone." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

<ToggleGroup type="single" variant="outline" value={view} onValueChange={setView}>
  <ToggleGroupItem value="list"><List /> Lista</ToggleGroupItem>
  <ToggleGroupItem value="grid"><LayoutGrid /> Grade</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="multiple" defaultValue={["left"]}> … </ToggleGroup>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use type=single para escolhas mutuamente exclusivas (ex.: visão).",
          "Defina variant/size no grupo — os itens herdam via contexto.",
          "Em single, trate o valor vazio (desmarcar) para não zerar a visão.",
          "Dê aria-label a itens que mostram só ícone.",
        ]}
        donts={[
          "Não use para um único estado on/off — use Toggle.",
          "Não misture variant/size por item quebrando o controle segmentado.",
          "Não deixe o grupo desmarcar sem tratar o estado resultante.",
          "Não use como navegação — não é substituto de Tabs.",
        ]}
      />
      <DesignNotes
        items={[
          "Os itens herdam variant/size do grupo via React Context, formando um controle segmentado coeso.",
          "Cantos arredondados apenas nas pontas (first/last) e bordas colapsadas (border-l-0 no outline) evitam borda dupla entre itens.",
          "Seleção única ou múltipla pelo primitivo Radix; focus:z-10 mantém o anel de foco acima dos itens vizinhos.",
        ]}
      />
      <RelatedComponents
        items={[
          { name: "Toggle", href: "/styleguide/components/toggle", description: "Unidade base do grupo — reutiliza os mesmos toggleVariants." },
          { name: "Tabs", href: "/styleguide/components/tabs", description: "Use para navegar entre painéis; o Toggle Group não é navegação." },
          { name: "Switch", href: "/styleguide/components/switch", description: "Alternativa para um único estado on/off." },
          { name: "Button", href: "/styleguide/components/button", description: "Para ações; aqui a intenção é selecionar um estado." },
        ]}
      />
    </StyleguidePage>
  )
}
