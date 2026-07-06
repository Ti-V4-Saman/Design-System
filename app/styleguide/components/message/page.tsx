"use client"

import { ImageIcon, MessagesSquare } from "lucide-react"

import {
  DateSeparator,
  Message,
  MessageAttachment,
  MessageGroup,
  MessageThread,
  SystemMessage,
  TypingIndicator,
} from "@/components/message"
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

export default function MessagePage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Message"
        description={
          <>
            Bolhas de conversa para a caixa de entrada do CRM — trocas com leads e clientes.
            Incoming em <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-muted</code>,
            outgoing em <span className="font-medium text-primary">emerald</span>, com status de entrega,
            anexos e eventos de sistema.
          </>
        }
      />

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

      <DarkModeSection>
        <div className="space-y-3">
          <Message variant="incoming" avatar="SW" timestamp="09:41">Recebido, obrigada!</Message>
          <Message variant="outgoing" timestamp="09:42" status="read">Disponível 😊</Message>
        </div>
      </DarkModeSection>

      <AccessibilitySection
        items={[
          <>O status de entrega tem <code className="font-mono text-xs">aria-label</code> (Enviado/Entregue/Lido/Falhou).</>,
          <>SystemMessage e TypingIndicator usam <code className="font-mono text-xs">role=&quot;status&quot;</code>.</>,
          <>Não transmita autoria só pela posição/cor — inclua nome e horário.</>,
          <>A thread deve ser navegável por teclado (container rolável focável).</>,
        ]}
      />

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

      <ApiSection
        groups={[
          [
            { prop: "Message.variant", type: '"incoming" | "outgoing"', description: "Lado e cor da bolha." },
            { prop: "avatar / author", type: "ReactNode / string", description: "Avatar (iniciais) e nome do remetente." },
            { prop: "showAvatar / showAuthor", type: "boolean", description: "Controlam repetição no agrupamento." },
            { prop: "timestamp", type: "string", description: "Horário formatado." },
            { prop: "status", type: '"sending"|"sent"|"delivered"|"read"|"failed"', description: "Status de entrega (outgoing)." },
          ],
          [
            { prop: "MessageThread / MessageGroup", type: "container", description: "Lista rolável e agrupamento." },
            { prop: "SystemMessage / DateSeparator", type: "container", description: "Eventos e divisores centrais." },
            { prop: "TypingIndicator", type: "avatar?", description: "Indicador de digitação." },
            { prop: "MessageAttachment", type: "name, size, icon, downloadable", description: "Anexo dentro da bolha." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Agrupe mensagens consecutivas do mesmo remetente.",
          "Mostre status de entrega em mensagens enviadas.",
          "Use SystemMessage para eventos (atribuição, tags).",
          "Inclua horário e nome para contexto.",
        ]}
        donts={[
          "Não repita avatar/nome em cada mensagem do grupo.",
          "Não use azul no status de lido — use emerald.",
          "Não coloque ações críticas dentro da bolha.",
          "Não transmita autoria só pela cor.",
        ]}
      />

      <DesignNotes
        items={[
          <>Incoming em <code className="font-mono text-xs">bg-muted</code> (à esquerda) e outgoing em emerald/<code className="font-mono text-xs">primary</code> (à direita): lado + cor comunicam autoria sem depender só da posição.</>,
          <>O status de <strong>lido usa emerald</strong> (não azul), alinhado à identidade do CRM V4; cada status tem <code className="font-mono text-xs">aria-label</code>.</>,
          <><code className="font-mono text-xs">MessageGroup</code> omite avatar/autor repetidos em mensagens consecutivas do mesmo remetente, reduzindo ruído visual.</>,
          <><code className="font-mono text-xs">SystemMessage</code> e <code className="font-mono text-xs">DateSeparator</code> centralizam eventos (atribuição, tags, data) fora do fluxo de bolhas, com <code className="font-mono text-xs">role=&quot;status&quot;</code>.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Avatar", href: "/styleguide/components/avatar", description: "Iniciais ou foto do remetente exibidas na bolha." },
          { name: "Attachment", href: "/styleguide/components/attachment", description: "Anexos de arquivo — MessageAttachment é a versão dentro da bolha." },
          { name: "Badge", href: "/styleguide/components/badge", description: "Status e tags do lead ao lado da conversa." },
          { name: "Sonner (Toast)", href: "/styleguide/components/sonner", description: "Notificar chegada de nova mensagem sem interromper." },
        ]}
      />
    </StyleguidePage>
  )
}
