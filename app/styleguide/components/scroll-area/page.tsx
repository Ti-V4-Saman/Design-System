import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  DesignNotes,
  GuidelinesSection,
  RelatedComponents,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const CONTACTS = Array.from({ length: 20 }, (_, i) => ({
  name: ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Reis", "Elisa Nunes"][i % 5] + ` ${i + 1}`,
  org: ["Acme", "Globex", "Initech", "Umbrella", "Stark"][i % 5],
}))

const TAGS = ["Prioritário", "Follow-up", "Enterprise", "Inbound", "Outbound", "Renovação", "Upsell", "Churn risk", "Novo", "VIP"]

export default function ScrollAreaPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Scroll Area"
        description={
          <>
            Área de rolagem com barras customizadas (Radix ScrollArea). O thumb usa <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-border</code>{" "}
            para se integrar às superfícies do CRM V4. Ideal para listas densas, feeds e faixas horizontais.
          </>
        }
      />

      <Section title="Vertical" description="Lista longa de contatos num contêiner de altura fixa.">
        <Demo>
          <ScrollArea className="h-72 w-full max-w-sm rounded-lg border border-border">
            <div className="p-2">
              <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Contatos</p>
              {CONTACTS.map((c, i) => (
                <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted">
                  <Avatar className="size-8"><AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Demo>
      </Section>

      <Section title="Horizontal" description="Faixa rolável de etiquetas/cards — use a ScrollBar horizontal.">
        <Demo>
          <ScrollArea className="w-full max-w-xl whitespace-nowrap rounded-lg border border-border">
            <div className="flex w-max gap-3 p-4">
              {TAGS.map((t, i) => (
                <div key={t} className="flex h-24 w-40 shrink-0 flex-col justify-between rounded-lg border border-border bg-muted/30 p-3">
                  <Badge variant="secondary">{t}</Badge>
                  <p className="text-xs text-muted-foreground">{(i + 1) * 7 + 4} deals</p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>O viewport é rolável por teclado (setas, <code className="font-mono text-xs">PageUp/PageDown</code>, <code className="font-mono text-xs">Home/End</code>) e recebe anel de foco visível.</>,
          <>Rolagem por roda do mouse e trackpad funcionam normalmente sobre o conteúdo.</>,
          <>As barras customizadas complementam — não substituem — a rolagem nativa; conteúdo permanece acessível sem mouse.</>,
          <>Prefira conteúdo semântico dentro do viewport (listas, headings) para leitores de tela.</>,
        ]}
      />

      <DarkModeSection description="O thumb (bg-border) e as superfícies internas vêm dos tokens — mesma leitura nos dois temas.">
        <ScrollArea className="h-40 w-full rounded-lg border border-border">
          <div className="p-2">
            {CONTACTS.slice(0, 8).map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md px-2 py-2 hover:bg-muted">
                <Avatar className="size-8"><AvatarFallback>{c.name.slice(0, 2)}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.org}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "ScrollArea.className", type: "string", description: "Defina altura/largura aqui; o conteúdo determina se há rolagem." },
            { prop: "ScrollArea", type: "type, scrollHideDelay", description: "Comportamento de exibição das barras (Radix Root)." },
            { prop: "ScrollBar.orientation", type: '"vertical" | "horizontal"', default: '"vertical"', description: "Eixo da barra; use horizontal para faixas roláveis." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-full rounded-lg border">
  {/* conteúdo vertical */}
</ScrollArea>

<ScrollArea className="w-full whitespace-nowrap rounded-lg border">
  <div className="flex w-max gap-3 p-4">{/* cards */}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Defina altura/largura no ScrollArea para delimitar a rolagem.",
          "Use whitespace-nowrap + ScrollBar horizontal para faixas de cards.",
          "Aplique em listas densas onde a barra nativa quebraria a superfície.",
          "Mantenha conteúdo semântico (listas, headings) dentro do viewport.",
        ]}
        donts={[
          "Não aninhe várias ScrollAreas roláveis no mesmo eixo.",
          "Não use para a rolagem principal da página (deixe o body rolar).",
          "Não esqueça a ScrollBar horizontal ao rolar no eixo X.",
          "Não coloque conteúdo interativo fora do viewport rolável.",
        ]}
      />

      <DesignNotes
        items={[
          <>O thumb usa <code className="font-mono text-xs">bg-border</code> para se fundir às superfícies do CRM V4 — a barra fica discreta e não rouba atenção do conteúdo denso que ela delimita.</>,
          "As barras customizadas apenas complementam a rolagem nativa: roda, trackpad e teclado continuam funcionando, então nenhum caminho de acesso é substituído pela estilização.",
          <>A altura/largura vive na <code className="font-mono text-xs">className</code> do ScrollArea; é o contêiner limitado que cria a rolagem — sem dimensão definida, não há overflow para rolar.</>,
          <>Para faixas horizontais é preciso <code className="font-mono text-xs">whitespace-nowrap</code> no wrapper mais uma <code className="font-mono text-xs">ScrollBar orientation=&quot;horizontal&quot;</code> explícita; o eixo X não aparece sozinho.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Resizable", href: "/styleguide/components/resizable", description: "Delimita painéis cujo conteúdo a ScrollArea rola." },
          { name: "Table", href: "/styleguide/components/table", description: "Tabelas largas que rolam no eixo horizontal." },
          { name: "Sidebar", href: "/styleguide/components/sidebar", description: "Navegação longa que rola dentro de altura fixa." },
          { name: "Command", href: "/styleguide/components/command", description: "Lista de resultados rolável em paletas de comando." },
        ]}
      />
    </StyleguidePage>
  )
}
