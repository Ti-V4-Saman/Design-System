import * as React from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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

const CONTACTS = Array.from({ length: 20 }, (_, i) => ({
  name: ["Ana Souza", "Bruno Lima", "Carla Dias", "Diego Reis", "Elisa Nunes"][i % 5] + ` ${i + 1}`,
  org: ["Acme", "Globex", "Initech", "Umbrella", "Stark"][i % 5],
}))

const TAGS = ["Prioritário", "Follow-up", "Enterprise", "Inbound", "Outbound", "Renovação", "Upsell", "Churn risk", "Novo", "VIP"]

export default function ScrollAreaPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Scroll Area</h1>
        <p className="max-w-2xl text-muted-foreground">
          Área de rolagem com barras customizadas (Radix ScrollArea). O thumb usa <code>bg-border</code>
          para se integrar às superfícies do CRM V4. Ideal para listas densas, feeds e faixas horizontais.
        </p>
      </header>

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

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

<ScrollArea className="h-72 w-full rounded-lg border">
  {/* conteúdo vertical */}
</ScrollArea>

<ScrollArea className="w-full whitespace-nowrap rounded-lg border">
  <div className="flex w-max gap-3 p-4">{/* cards */}</div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>Defina altura/largura no <code>ScrollArea</code>; o conteúdo determina a rolagem.</li>
              <li>Para rolagem horizontal, use <code>whitespace-nowrap</code> + <code>ScrollBar orientation=&quot;horizontal&quot;</code>.</li>
              <li>Rolagem por teclado e roda do mouse funcionam normalmente.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
