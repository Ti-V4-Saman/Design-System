"use client"

import * as React from "react"
import { CircleCheck, Info, OctagonAlert, TriangleAlert, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

function Section({ title, description, children }: { title: string; description?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  )
}
function Demo({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-3 rounded-lg border border-border bg-card p-6", className)}>{children}</div>
}
function CodeBlock({ children }: { children: string }) {
  return <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed text-foreground">{children}</pre>
}
function ApiTable({ rows }: { rows: Array<{ prop: string; type: string; def?: string; desc: string }> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/50 text-muted-foreground"><tr><th className="px-4 py-2 font-medium">Prop</th><th className="px-4 py-2 font-medium">Tipo</th><th className="px-4 py-2 font-medium">Default</th><th className="px-4 py-2 font-medium">Descrição</th></tr></thead>
        <tbody className="divide-y divide-border">{rows.map((r) => (<tr key={r.prop}><td className="px-4 py-2 font-mono text-xs text-foreground">{r.prop}</td><td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.type}</td><td className="px-4 py-2 font-mono text-xs text-muted-foreground">{r.def ?? "—"}</td><td className="px-4 py-2 text-muted-foreground">{r.desc}</td></tr>))}</tbody>
      </table>
    </div>
  )
}
function GuidelineCard({ tone, title, items }: { tone: "do" | "dont"; title: string; items: string[] }) {
  const isDo = tone === "do"
  return (
    <div className={cn("rounded-lg border p-4", isDo ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5")}>
      <p className={cn("mb-2 text-sm font-semibold", isDo ? "text-success" : "text-destructive")}>{title}</p>
      <ul className="space-y-1.5 text-sm text-muted-foreground">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
    </div>
  )
}

export default function AlertPage() {
  const [open, setOpen] = React.useState(true)
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Alert</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Mensagens contextuais persistentes (inline) que informam sobre o estado do sistema ou de
          um registro. Tons semânticos do CRM V4; para notificações transitórias, use Toast.
        </p>
      </div>

      <Section title="Variantes" description="default (neutro) e os tons semânticos info, success, warning, destructive.">
        <Demo>
          <Alert><Info /><AlertTitle>Informação</AlertTitle><AlertDescription>Mensagem neutra padrão.</AlertDescription></Alert>
          <Alert variant="info"><Info /><AlertTitle>Dica</AlertTitle><AlertDescription>Você pode importar leads via CSV nas configurações.</AlertDescription></Alert>
          <Alert variant="success"><CircleCheck /><AlertTitle>Tudo certo</AlertTitle><AlertDescription>Integração conectada com sucesso.</AlertDescription></Alert>
          <Alert variant="warning"><TriangleAlert /><AlertTitle>Atenção</AlertTitle><AlertDescription>Você atingiu 80% da cota de e-mails do plano.</AlertDescription></Alert>
          <Alert variant="destructive"><OctagonAlert /><AlertTitle>Falha na sincronização</AlertTitle><AlertDescription>Não foi possível sincronizar com o provedor. Tente novamente.</AlertDescription></Alert>
        </Demo>
      </Section>

      <Section title="Somente título" description="Compacto, sem descrição — para avisos curtos.">
        <Demo>
          <Alert variant="success"><CircleCheck /><AlertTitle>Lead criado com sucesso.</AlertTitle></Alert>
          <Alert variant="warning"><TriangleAlert /><AlertTitle>3 tarefas vencem hoje.</AlertTitle></Alert>
        </Demo>
      </Section>

      <Section title="Sem ícone" description="O layout se ajusta quando não há ícone.">
        <Demo>
          <Alert variant="info"><AlertTitle>Manutenção programada</AlertTitle><AlertDescription>O sistema ficará indisponível no domingo, das 2h às 4h.</AlertDescription></Alert>
        </Demo>
      </Section>

      <Section title="Com ação" description="AlertAction posiciona um botão/link no canto — dispensar ou resolver.">
        <Demo>
          {open ? (
            <Alert variant="warning">
              <TriangleAlert />
              <AlertTitle>Fatura vencida</AlertTitle>
              <AlertDescription>A fatura de junho está em atraso há 5 dias.</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-sm" aria-label="Dispensar" onClick={() => setOpen(false)}><X /></Button>
              </AlertAction>
            </Alert>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Restaurar alerta</Button>
          )}
          <Alert variant="destructive">
            <OctagonAlert />
            <AlertTitle>Pagamento recusado</AlertTitle>
            <AlertDescription>Atualize o método de pagamento para continuar.</AlertDescription>
            <AlertAction><Button variant="outline" size="sm">Atualizar</Button></AlertAction>
          </Alert>
        </Demo>
      </Section>

      <Section title="Exemplos reais no CRM" description="Estados de conta, integrações e limites.">
        <Demo>
          <Alert variant="success"><CircleCheck /><AlertTitle>Google Ads conectado</AlertTitle><AlertDescription>Os leads passarão a ser importados automaticamente a cada hora.</AlertDescription></Alert>
          <Alert variant="info"><Info /><AlertTitle>Novo recurso</AlertTitle><AlertDescription>Agora você pode criar automações no pipeline. <a href="#alert">Saiba mais</a>.</AlertDescription></Alert>
          <Alert variant="destructive"><OctagonAlert /><AlertTitle>Limite de contatos atingido</AlertTitle><AlertDescription>Faça upgrade do plano para adicionar mais contatos.</AlertDescription><AlertAction><Button variant="outline" size="sm">Fazer upgrade</Button></AlertAction></Alert>
        </Demo>
      </Section>

      <Section title="Dark Mode">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Alert variant="success"><CircleCheck /><AlertTitle>Conectado</AlertTitle></Alert>
            <Alert variant="warning"><TriangleAlert /><AlertTitle>Cota em 80%</AlertTitle></Alert>
          </div>
          <div className="dark space-y-3 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Alert variant="success"><CircleCheck /><AlertTitle>Conectado</AlertTitle></Alert>
            <Alert variant="warning"><TriangleAlert /><AlertTitle>Cota em 80%</AlertTitle></Alert>
          </div>
        </div>
      </Section>

      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• O container tem <code className="font-mono text-xs">role=&quot;alert&quot;</code> — leitores de tela anunciam o conteúdo ao aparecer.</li>
          <li>• Não dependa só da cor/ícone; o título deve descrever o estado.</li>
          <li>• Botões de ação/dispensar precisam de <code className="font-mono text-xs">aria-label</code> quando forem só ícone.</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"

<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Fatura vencida</AlertTitle>
  <AlertDescription>A fatura de junho está em atraso.</AlertDescription>
  <AlertAction><Button size="sm" variant="outline">Pagar</Button></AlertAction>
</Alert>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <ApiTable rows={[
          { prop: "Alert.variant", type: '"default"|"info"|"success"|"warning"|"destructive"', def: '"default"', desc: "Tom semântico." },
          { prop: "AlertTitle", type: "ReactNode", desc: "Título curto do alerta." },
          { prop: "AlertDescription", type: "ReactNode", desc: "Texto de apoio (aceita links)." },
          { prop: "AlertAction", type: "ReactNode", desc: "Ação no canto (dispensar/resolver)." },
        ]} />
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Escolha o tom conforme a severidade real.",
            "Use título claro + descrição objetiva.",
            "Inclua uma ação quando houver como resolver.",
            "Use Alert para mensagens persistentes; Toast para transitórias.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não empilhe muitos alertas na mesma tela.",
            "Não use destructive para avisos leves.",
            "Não coloque parágrafos longos — seja conciso.",
            "Não transmita o estado só pela cor.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
