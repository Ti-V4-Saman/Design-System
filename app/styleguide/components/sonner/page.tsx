"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { crmToast } from "@/components/crm-toast"

/* ---------- page-local helpers ---------- */

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="scroll-mt-8 space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

function Demo({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      {children}
    </pre>
  )
}

/* ---------- page ---------- */

export default function SonnerPage() {
  const fakeSave = () =>
    new Promise<string>((resolve) => window.setTimeout(() => resolve("Acme Inc."), 1600))

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Sonner (Toast)</h1>
        <p className="max-w-2xl text-muted-foreground">
          Notificações não-bloqueantes via <code>sonner</code>, tematizadas para o CRM V4 (superfície
          <code> bg-popover</code>, <code>shadow-dropdown</code>, ícones semânticos por token). O host
          <code> &lt;Toaster /&gt;</code> já está montado no layout raiz. Dispare com o helper{" "}
          <code>crmToast</code>. Alterne o tema para ver em dark mode.
        </p>
      </header>

      <Section
        title="Tipos semânticos"
        description="success, warning, error e info usam os tokens semânticos; default é neutro; loading mostra spinner."
      >
        <Demo>
          <Button variant="outline" onClick={() => crmToast.message("Notificação simples")}>
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() => crmToast.success("Deal salvo com sucesso")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => crmToast.warning("Cota de e-mails quase no limite")}
          >
            Warning
          </Button>
          <Button
            variant="outline"
            onClick={() => crmToast.error("Falha ao sincronizar contatos")}
          >
            Error
          </Button>
          <Button variant="outline" onClick={() => crmToast.info("3 novos leads atribuídos")}>
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => crmToast.loading("Importando planilha…")}
          >
            Loading
          </Button>
        </Demo>
      </Section>

      <Section
        title="Com descrição"
        description="Título + descrição secundária (text-muted-foreground)."
      >
        <Demo>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.success("Proposta enviada", {
                description: "Ana Souza receberá por e-mail em instantes.",
              })
            }
          >
            Toast com descrição
          </Button>
        </Demo>
      </Section>

      <Section
        title="Com ação"
        description="Botão de ação (primary) e cancelar — ex.: desfazer uma exclusão."
      >
        <Demo>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.message("Deal movido para Arquivados", {
                action: { label: "Desfazer", onClick: () => crmToast.success("Ação desfeita") },
              })
            }
          >
            Toast com ação
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.error("Contato excluído", {
                description: "Esta ação pode ser revertida por 10s.",
                action: { label: "Restaurar", onClick: () => crmToast.success("Contato restaurado") },
              })
            }
          >
            Excluir + restaurar
          </Button>
        </Demo>
      </Section>

      <Section
        title="Promise (async)"
        description="loading → success/error automaticamente conforme a promessa resolve."
      >
        <Demo>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.promise(fakeSave(), {
                loading: "Salvando empresa…",
                success: (name) => `${name} salva com sucesso`,
                error: "Não foi possível salvar",
              })
            }
          >
            Salvar (promise)
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const id = crmToast.loading("Enviando e-mail em massa…")
              window.setTimeout(
                () => crmToast.success("128 e-mails enviados", { id }),
                1600
              )
            }}
          >
            Loading → atualizar
          </Button>
        </Demo>
      </Section>

      <Section
        title="Exemplos reais de CRM"
        description="Feedbacks típicos do produto."
      >
        <Demo>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.success("Importação concluída", {
                description: "342 contatos importados · 4 ignorados.",
              })
            }
          >
            Importação concluída
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              crmToast.warning("Integração desconectada", {
                description: "Reconecte o WhatsApp Business para continuar recebendo mensagens.",
                action: { label: "Reconectar", onClick: () => crmToast.info("Abrindo integração…") },
              })
            }
          >
            Integração caiu
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss()}>
            Fechar todos
          </Button>
        </Demo>
      </Section>

      <Section title="Uso & API" description="Monte o Toaster uma vez; dispare de qualquer client component.">
        <div className="space-y-4">
          <CodeBlock>{`// 1) Uma vez, no layout raiz:
import { Toaster } from "@/components/ui/sonner"
<Toaster />

// 2) Em qualquer lugar (client):
import { crmToast } from "@/components/crm-toast"

crmToast.success("Deal salvo", { description: "..." })
crmToast.error("Falha", { action: { label: "Tentar de novo", onClick: retry } })
crmToast.promise(save(), { loading: "Salvando…", success: "Salvo", error: "Erro" })`}</CodeBlock>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">API (crmToast)</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>message / success / warning / error / info</code> — ícone semântico por token</li>
                <li><code>loading</code>, <code>promise</code>, <code>dismiss</code> — passam ao sonner</li>
                <li>Opções: <code>description</code>, <code>action</code>, <code>duration</code>, <code>id</code></li>
                <li>Posição/tema definidos no <code>Toaster</code> (bottom-right)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-medium text-foreground">Acessibilidade</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Região <code>aria-live</code> (sonner) — anunciado por leitores de tela</li>
                <li>Foco não é roubado (não-bloqueante)</li>
                <li>Empilha e expande no hover; auto-dismiss com timer</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-success/40 bg-success/5 p-5 text-sm">
              <p className="mb-2 font-medium text-success">Do</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Use para confirmar ações (salvo, enviado, importado).</li>
                <li>Ofereça &quot;Desfazer&quot; em ações reversíveis.</li>
                <li>Mensagens curtas; detalhe na descrição.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-5 text-sm">
              <p className="mb-2 font-medium text-destructive">Don&apos;t</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>Não use para erros que exigem decisão — use Dialog.</li>
                <li>Não empilhe muitos toasts simultâneos.</li>
                <li>Não coloque conteúdo essencial só no toast (some sozinho).</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
