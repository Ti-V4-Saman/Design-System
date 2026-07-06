"use client"

import * as React from "react"
import { CircleCheck, Info, OctagonAlert, TriangleAlert, X } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

export default function AlertPage() {
  const [open, setOpen] = React.useState(true)
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Alert"
        description="Mensagens contextuais persistentes (inline) que informam sobre o estado do sistema ou de um registro. Tons semânticos do CRM V4; para notificações transitórias, use Toast."
      />

      <Section title="Variantes" description="default (neutro) e os tons semânticos info, success, warning, destructive.">
        <Demo className="flex flex-col gap-3">
          <Alert><Info /><AlertTitle>Informação</AlertTitle><AlertDescription>Mensagem neutra padrão.</AlertDescription></Alert>
          <Alert variant="info"><Info /><AlertTitle>Dica</AlertTitle><AlertDescription>Você pode importar leads via CSV nas configurações.</AlertDescription></Alert>
          <Alert variant="success"><CircleCheck /><AlertTitle>Tudo certo</AlertTitle><AlertDescription>Integração conectada com sucesso.</AlertDescription></Alert>
          <Alert variant="warning"><TriangleAlert /><AlertTitle>Atenção</AlertTitle><AlertDescription>Você atingiu 80% da cota de e-mails do plano.</AlertDescription></Alert>
          <Alert variant="destructive"><OctagonAlert /><AlertTitle>Falha na sincronização</AlertTitle><AlertDescription>Não foi possível sincronizar com o provedor. Tente novamente.</AlertDescription></Alert>
        </Demo>
      </Section>

      <Section title="Somente título" description="Compacto, sem descrição — para avisos curtos.">
        <Demo className="flex flex-col gap-3">
          <Alert variant="success"><CircleCheck /><AlertTitle>Lead criado com sucesso.</AlertTitle></Alert>
          <Alert variant="warning"><TriangleAlert /><AlertTitle>3 tarefas vencem hoje.</AlertTitle></Alert>
        </Demo>
      </Section>

      <Section title="Sem ícone" description="O layout se ajusta quando não há ícone.">
        <Demo className="flex flex-col gap-3">
          <Alert variant="info"><AlertTitle>Manutenção programada</AlertTitle><AlertDescription>O sistema ficará indisponível no domingo, das 2h às 4h.</AlertDescription></Alert>
        </Demo>
      </Section>

      <Section title="Com ação" description="AlertAction posiciona um botão/link no canto — dispensar ou resolver.">
        <Demo className="flex flex-col gap-3">
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
        <Demo className="flex flex-col gap-3">
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

      <AccessibilitySection
        items={[
          <>O container tem <code className="font-mono text-xs">role=&quot;alert&quot;</code> — leitores de tela anunciam o conteúdo ao aparecer.</>,
          <>Não dependa só da cor/ícone; o título deve descrever o estado.</>,
          <>Botões de ação/dispensar precisam de <code className="font-mono text-xs">aria-label</code> quando forem só ícone.</>,
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"

<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Fatura vencida</AlertTitle>
  <AlertDescription>A fatura de junho está em atraso.</AlertDescription>
  <AlertAction><Button size="sm" variant="outline">Pagar</Button></AlertAction>
</Alert>`}</CodeBlock>
      </Section>

      <ApiSection
        groups={[
          [
            { prop: "Alert.variant", type: '"default"|"info"|"success"|"warning"|"destructive"', default: '"default"', description: "Tom semântico." },
            { prop: "AlertTitle", type: "ReactNode", description: "Título curto do alerta." },
            { prop: "AlertDescription", type: "ReactNode", description: "Texto de apoio (aceita links)." },
            { prop: "AlertAction", type: "ReactNode", description: "Ação no canto (dispensar/resolver)." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Escolha o tom conforme a severidade real.",
          "Use título claro + descrição objetiva.",
          "Inclua uma ação quando houver como resolver.",
          "Use Alert para mensagens persistentes; Toast para transitórias.",
        ]}
        donts={[
          "Não empilhe muitos alertas na mesma tela.",
          "Não use destructive para avisos leves.",
          "Não coloque parágrafos longos — seja conciso.",
          "Não transmita o estado só pela cor.",
        ]}
      />
    </StyleguidePage>
  )
}
