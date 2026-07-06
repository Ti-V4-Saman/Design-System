"use client"

import * as React from "react"
import { CircleCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { crmToast } from "@/components/crm-toast"
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
} from "@/app/styleguide/_components"

/** Non-portaled replica of a crmToast surface, to show it in both themes. */
function ToastPreview() {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-popover p-4 text-sm text-popover-foreground shadow-[var(--shadow-dropdown)]">
      <CircleCheck className="mt-0.5 size-4 shrink-0 text-success" />
      <div className="space-y-1">
        <p className="font-medium text-foreground">Proposta enviada</p>
        <p className="text-xs text-muted-foreground">Ana Souza receberá por e-mail em instantes.</p>
      </div>
    </div>
  )
}

export default function SonnerPage() {
  const fakeSave = () =>
    new Promise<string>((resolve) => window.setTimeout(() => resolve("Acme Inc."), 1600))

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Sonner (Toast)"
        description={
          <>
            Notificações não-bloqueantes via <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">sonner</code>, tematizadas para o CRM V4 (superfície{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-popover</code>, <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">shadow-dropdown</code>, ícones semânticos por token). O host{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">&lt;Toaster /&gt;</code> já está montado no layout raiz. Dispare com o helper{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">crmToast</code>. Alterne o tema para ver em dark mode.
          </>
        }
      />

      <Section
        title="Tipos semânticos"
        description="success, warning, error e info usam os tokens semânticos; default é neutro; loading mostra spinner."
      >
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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
        <Demo center>
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

      <AccessibilitySection
        items={[
          <>Renderizado numa região <code className="font-mono text-xs">aria-live</code> (sonner) — anunciado por leitores de tela.</>,
          <>Não rouba o foco: é não-bloqueante e não interrompe o fluxo do usuário.</>,
          <>Empilha e expande no hover; some sozinho por timer (<code className="font-mono text-xs">duration</code>).</>,
          <>Ícones semânticos reforçam o tipo além da cor (não dependa só da cor).</>,
        ]}
      />

      <DarkModeSection description="A superfície do toast — bg-popover, shadow-dropdown e ícone semântico — vem dos tokens nos dois temas.">
        <ToastPreview />
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "crmToast.message", type: "(msg, opts?) => id", description: "Toast neutro (default), sem ícone semântico." },
            { prop: "crmToast.success / warning / error / info", type: "(msg, opts?) => id", description: "Ícone lucide tingido pelo token semântico correspondente." },
            { prop: "crmToast.loading", type: "(msg, opts?) => id", description: "Toast com spinner; atualize depois via opção id." },
          ],
          [
            { prop: "crmToast.promise", type: "(promise, { loading, success, error })", description: "loading → success/error conforme a promessa resolve." },
            { prop: "crmToast.dismiss", type: "(id?) => void", description: "Fecha um toast por id, ou todos se omitido." },
            { prop: "opts (ExternalToast)", type: "{ description, action, duration, id }", description: "Opções repassadas ao sonner; action = { label, onClick }." },
          ],
        ]}
      />

      <Section title="Código" description="Monte o Toaster uma vez; dispare de qualquer client component.">
        <CodeBlock>{`// 1) Uma vez, no layout raiz:
import { Toaster } from "@/components/ui/sonner"
<Toaster />

// 2) Em qualquer lugar (client):
import { crmToast } from "@/components/crm-toast"

crmToast.success("Deal salvo", { description: "..." })
crmToast.error("Falha", { action: { label: "Tentar de novo", onClick: retry } })
crmToast.promise(save(), { loading: "Salvando…", success: "Salvo", error: "Erro" })`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use para confirmar ações (salvo, enviado, importado).",
          "Ofereça “Desfazer” em ações reversíveis.",
          "Mensagens curtas; detalhe na descrição.",
          "Escolha o tipo semântico que combina com o resultado.",
        ]}
        donts={[
          "Não use para erros que exigem decisão — use Dialog.",
          "Não empilhe muitos toasts simultâneos.",
          "Não coloque conteúdo essencial só no toast (some sozinho).",
          "Não dependa apenas da cor para transmitir o tipo.",
        ]}
      />
    </StyleguidePage>
  )
}
