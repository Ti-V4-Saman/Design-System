"use client"

import * as React from "react"
import { ImageIcon, MessagesSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  DateSeparator,
  Message,
  MessageAttachment,
  MessageGroup,
  MessageThread,
  SystemMessage,
  TypingIndicator,
} from "@/components/message"

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
  return <div className={cn("rounded-lg border border-border bg-card p-6", className)}>{children}</div>
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

export default function MessagePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Message</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Bolhas de conversa para a caixa de entrada do CRM — trocas com leads e clientes.
          Incoming em <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-muted</code>,
          outgoing em <span className="font-medium text-primary">emerald</span>, com status de entrega,
          anexos e eventos de sistema.
        </p>
      </div>

      <Section title="Variantes" description="incoming (recebida, à esquerda), outgoing (enviada, à direita) e system (evento centralizado).">
        <Demo className="space-y-3">
          <Message variant="incoming" avatar="SW" timestamp="09:41">Oi! Vi a proposta, podemos conversar?</Message>
          <Message variant="outgoing" timestamp="09:42" status="read">Claro, Sandra! Qual o melhor horário pra você?</Message>
          <SystemMessage>Lead atribuído a Sara Ann</SystemMessage>
        </Demo>
      </Section>

      <Section title="Avatar, autor e agrupamento" description="Mensagens consecutivas do mesmo remetente compartilham avatar/autor (MessageGroup).">
        <Demo>
          <MessageGroup>
            <Message variant="incoming" avatar="SW" author="Sandra Waters" showAuthor>Bom dia!</Message>
            <Message variant="incoming" avatar="SW" showAvatar={false}>Conseguiram revisar o contrato?</Message>
            <Message variant="incoming" avatar="SW" showAvatar={false} timestamp="08:12">Preciso fechar até sexta.</Message>
          </MessageGroup>
        </Demo>
      </Section>

      <Section title="Status de entrega" description="Apenas em mensagens enviadas: enviando, enviado, entregue, lido (emerald) e falhou.">
        <Demo className="space-y-2">
          <Message variant="outgoing" timestamp="10:01" status="sending">Enviando…</Message>
          <Message variant="outgoing" timestamp="10:01" status="sent">Enviado</Message>
          <Message variant="outgoing" timestamp="10:01" status="delivered">Entregue</Message>
          <Message variant="outgoing" timestamp="10:02" status="read">Lido</Message>
          <Message variant="outgoing" timestamp="10:03" status="failed">Falhou o envio</Message>
        </Demo>
      </Section>

      <Section title="Anexos" description="MessageAttachment se adapta à cor da bolha (arquivo ou imagem).">
        <Demo className="space-y-3">
          <Message variant="incoming" avatar="SW" timestamp="11:20">
            Segue o documento assinado:
            <MessageAttachment name="contrato-assinado.pdf" size="240 KB" />
          </Message>
          <Message variant="outgoing" timestamp="11:22" status="read">
            Recebido! Encaminhei a arte também:
            <MessageAttachment name="proposta-visual.png" size="1,2 MB" icon={<ImageIcon />} />
          </Message>
        </Demo>
      </Section>

      <Section title="Digitando" description="Indicador de que o contato está escrevendo.">
        <Demo><TypingIndicator avatar="SW" /></Demo>
      </Section>

      <Section title="Exemplo real — Conversa de CRM" description="Thread completo com separador de data, sistema, grupos, anexos e status.">
        <Demo className="p-0">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <div className="flex size-9 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">SW</div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Sandra Waters</span>
              <span className="text-xs text-success">● Online</span>
            </div>
          </div>
          <MessageThread className="h-96 bg-background">
            <DateSeparator>Hoje</DateSeparator>
            <SystemMessage>Conversa iniciada via formulário do site</SystemMessage>
            <MessageGroup>
              <Message variant="incoming" avatar="SW" author="Sandra Waters" showAuthor>Oi! Tenho interesse no plano Pro.</Message>
              <Message variant="incoming" avatar="SW" showAvatar={false} timestamp="09:40">Vocês fazem migração dos dados?</Message>
            </MessageGroup>
            <MessageGroup>
              <Message variant="outgoing">Oi, Sandra! Fazemos sim, sem custo.</Message>
              <Message variant="outgoing" timestamp="09:42" status="read">Posso te enviar a proposta agora mesmo.</Message>
            </MessageGroup>
            <Message variant="outgoing" timestamp="09:43" status="read">
              <MessageAttachment name="proposta-pro.pdf" size="318 KB" />
            </Message>
            <SystemMessage>Sara Ann marcou o lead como &quot;Qualificado&quot;</SystemMessage>
            <MessageGroup>
              <Message variant="incoming" avatar="SW" timestamp="09:47">Perfeito, obrigada! Vou analisar.</Message>
            </MessageGroup>
            <TypingIndicator avatar="SW" />
          </MessageThread>
        </Demo>
      </Section>

      <Section title="Empty state" description="Conversa sem mensagens.">
        <Demo>
          <div className="flex h-48 flex-col items-center justify-center gap-2 text-center">
            <MessagesSquare className="size-8 text-muted-foreground/50" />
            <p className="text-sm font-medium text-muted-foreground">Nenhuma mensagem ainda</p>
            <p className="text-xs text-muted-foreground/70">Envie a primeira mensagem para iniciar a conversa.</p>
          </div>
        </Demo>
      </Section>

      <Section title="Dark Mode">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Message variant="incoming" avatar="SW" timestamp="09:41">Recebido, obrigada!</Message>
            <Message variant="outgoing" timestamp="09:42" status="read">Disponível 😊</Message>
          </div>
          <div className="dark space-y-3 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Message variant="incoming" avatar="SW" timestamp="09:41">Recebido, obrigada!</Message>
            <Message variant="outgoing" timestamp="09:42" status="read">Disponível 😊</Message>
          </div>
        </div>
      </Section>

      <Section title="Acessibilidade">
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>• O status de entrega tem <code className="font-mono text-xs">aria-label</code> (Enviado/Entregue/Lido/Falhou).</li>
          <li>• SystemMessage e TypingIndicator usam <code className="font-mono text-xs">role=&quot;status&quot;</code>.</li>
          <li>• Não transmita autoria só pela posição/cor — inclua nome e horário.</li>
          <li>• A thread deve ser navegável por teclado (container rolável focável).</li>
        </ul>
      </Section>

      <Section title="Código">
        <CodeBlock>{`import { MessageThread, MessageGroup, Message, SystemMessage, MessageAttachment } from "@/components/message"

<MessageThread className="h-96">
  <SystemMessage>Conversa iniciada</SystemMessage>
  <MessageGroup>
    <Message variant="incoming" avatar="SW" author="Sandra" showAuthor>Oi!</Message>
    <Message variant="incoming" avatar="SW" showAvatar={false} timestamp="09:40">Tudo bem?</Message>
  </MessageGroup>
  <Message variant="outgoing" timestamp="09:42" status="read">
    Oi, Sandra! <MessageAttachment name="proposta.pdf" size="318 KB" />
  </Message>
</MessageThread>`}</CodeBlock>
      </Section>

      <Section title="API / Props">
        <div className="space-y-4">
          <ApiTable rows={[
            { prop: "Message.variant", type: '"incoming" | "outgoing"', desc: "Lado e cor da bolha." },
            { prop: "avatar / author", type: "ReactNode / string", desc: "Avatar (iniciais) e nome do remetente." },
            { prop: "showAvatar / showAuthor", type: "boolean", desc: "Controlam repetição no agrupamento." },
            { prop: "timestamp", type: "string", desc: "Horário formatado." },
            { prop: "status", type: '"sending"|"sent"|"delivered"|"read"|"failed"', desc: "Status de entrega (outgoing)." },
          ]} />
          <ApiTable rows={[
            { prop: "MessageThread / MessageGroup", type: "container", desc: "Lista rolável e agrupamento." },
            { prop: "SystemMessage / DateSeparator", type: "container", desc: "Eventos e divisores centrais." },
            { prop: "TypingIndicator", type: "avatar?", desc: "Indicador de digitação." },
            { prop: "MessageAttachment", type: "name, size, icon, downloadable", desc: "Anexo dentro da bolha." },
          ]} />
        </div>
      </Section>

      <Section title="Boas práticas">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard tone="do" title="Do" items={[
            "Agrupe mensagens consecutivas do mesmo remetente.",
            "Mostre status de entrega em mensagens enviadas.",
            "Use SystemMessage para eventos (atribuição, tags).",
            "Inclua horário e nome para contexto.",
          ]} />
          <GuidelineCard tone="dont" title="Don't" items={[
            "Não repita avatar/nome em cada mensagem do grupo.",
            "Não use azul no status de lido — use emerald.",
            "Não coloque ações críticas dentro da bolha.",
            "Não transmita autoria só pela cor.",
          ]} />
        </div>
      </Section>
    </div>
  )
}
