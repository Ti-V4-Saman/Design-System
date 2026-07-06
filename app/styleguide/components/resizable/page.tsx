import * as React from "react"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
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

function Pane({ label, className }: { label: string; className?: string }) {
  return (
    <div className={"flex h-full items-center justify-center p-6 text-sm text-muted-foreground " + (className ?? "")}>
      {label}
    </div>
  )
}

export default function ResizablePage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Resizable"
        description={
          <>
            Painéis divididos ajustáveis por arraste (react-resizable-panels). A alça usa <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-border</code>{" "}
            e destaca em <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">primary</code> ao arrastar. Ideal para layouts lista/detalhe e editores lado a lado.
          </>
        }
      />

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

      <AccessibilitySection
        items={[
          <>A alça é focável por teclado e navegável via <code className="font-mono text-xs">Tab</code>.</>,
          <>Com a alça focada, as setas (<code className="font-mono text-xs">←/→</code> ou <code className="font-mono text-xs">↑/↓</code>) ajustam a divisão em passos.</>,
          <>A alça expõe <code className="font-mono text-xs">role=&quot;separator&quot;</code> com <code className="font-mono text-xs">aria-valuenow</code> refletindo o tamanho atual (Radix / react-resizable-panels).</>,
          <>O anel de foco (<code className="font-mono text-xs">focus-visible:ring-ring</code>) mantém a alça visível ao navegar por teclado.</>,
        ]}
      />

      <DarkModeSection description="A alça e as superfícies dos painéis vêm dos tokens — bg-border, bg-card e bg-muted nos dois temas.">
        <div className="h-40 overflow-hidden rounded-xl border border-border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40}>
              <Pane label="Lista" className="bg-muted/20" />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <Pane label="Detalhe" />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "ResizablePanelGroup.direction", type: '"horizontal" | "vertical"', description: "Eixo da divisão dos painéis." },
            { prop: "ResizablePanelGroup", type: "onLayout, autoSaveId", description: "Callback de layout e persistência opcional do tamanho." },
          ],
          [
            { prop: "ResizablePanel.defaultSize", type: "number", description: "Tamanho inicial do painel, em porcentagem (0–100)." },
            { prop: "ResizablePanel.minSize / maxSize", type: "number", description: "Limites mínimo/máximo do painel, em porcentagem." },
            { prop: "ResizableHandle.withHandle", type: "boolean", default: "false", description: "Exibe a alça com grip visível para arraste." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import {
  ResizablePanelGroup, ResizablePanel, ResizableHandle,
} from "@/components/ui/resizable"

<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={35} minSize={20}>Lista</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={65}>Detalhe</ResizablePanel>
</ResizablePanelGroup>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Dê ao contêiner uma altura definida — os painéis herdam h-full.",
          "Use minSize para impedir que um painel colapse além do legível.",
          "Aninhe grupos para montar layouts de 3+ áreas (ex.: inbox).",
          "Use withHandle para deixar claro que a divisão é ajustável.",
        ]}
        donts={[
          "Não deixe o contêiner sem altura — os painéis não terão dimensão.",
          "Não use para divisões fixas que o usuário nunca ajusta (use grid/flex).",
          "Não empilhe muitos níveis de aninhamento a ponto de confundir o layout.",
          "Não remova o anel de foco da alça (acessibilidade por teclado).",
        ]}
      />

      <DesignNotes
        items={[
          <>A alça fica discreta em <code className="font-mono text-xs">bg-border</code> e só realça em <code className="font-mono text-xs">primary</code> ao arrastar/focar — sinaliza que a divisão é ajustável sem competir com o conteúdo dos painéis.</>,
          <>Os tamanhos são percentuais (<code className="font-mono text-xs">defaultSize</code>, <code className="font-mono text-xs">minSize</code>, <code className="font-mono text-xs">maxSize</code>), então o layout se mantém proporcional ao redimensionar a janela em vez de fixar pixels.</>,
          <>Use <code className="font-mono text-xs">withHandle</code> quando quiser um grip visível; sem ele a fronteira ainda é arrastável, mas menos descoberta — reserve o grip para divisões que o usuário realmente ajusta.</>,
          "Reserve o Resizable para divisões que o usuário controla (lista/detalhe, editores lado a lado). Para layouts fixos que nunca mudam, grid/flex é mais simples e barato.",
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Scroll Area", href: "/styleguide/components/scroll-area", description: "Rola o conteúdo de cada painel quando excede a altura." },
          { name: "Sidebar", href: "/styleguide/components/sidebar", description: "Painel lateral fixo quando não precisa ser ajustável." },
          { name: "Tabs", href: "/styleguide/components/tabs", description: "Alterna visões num painel em vez de dividir o espaço." },
          { name: "Sheet", href: "/styleguide/components/sheet", description: "Painel deslizante sobreposto para detalhe temporário." },
        ]}
      />
    </StyleguidePage>
  )
}
