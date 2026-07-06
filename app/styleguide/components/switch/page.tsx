"use client"

import * as React from "react"
import { AlertCircle, Bell, Check, Globe, Moon, ShieldCheck, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SettingSwitch } from "@/components/switch"

/* ---------- page-local presentation helpers ---------- */

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

function Demo({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={"rounded-xl border bg-card p-6 " + (className ?? "")}>{children}</div>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-xs font-medium text-muted-foreground">{label}</p>}
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-relaxed">
      <code className="font-mono text-foreground">{children}</code>
    </pre>
  )
}

function ApiTable({
  rows,
  caption,
}: {
  rows: Array<[string, string, string, string]>
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50 text-xs text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Prop</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Padrão</th>
            <th className="px-4 py-2 font-medium">Descrição</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(([a, b, c, d]) => (
            <tr key={a} className="align-top">
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-foreground">{a}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{b}</code>
              </td>
              <td className="px-4 py-2">
                <code className="font-mono text-xs text-muted-foreground">{c}</code>
              </td>
              <td className="px-4 py-2 text-muted-foreground">{d}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption && <p className="px-4 py-2 text-xs text-muted-foreground">{caption}</p>}
    </div>
  )
}

function GuidelineCard({
  tone,
  title,
  items,
}: {
  tone: "do" | "dont"
  title: string
  items: string[]
}) {
  const isDo = tone === "do"
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-3 flex items-center gap-2">
        <span
          className={
            "flex size-6 items-center justify-center rounded-full " +
            (isDo ? "bg-success/15 text-success" : "bg-destructive/10 text-destructive")
          }
        >
          {isDo ? <Check className="size-3.5" /> : <AlertCircle className="size-3.5" />}
        </span>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span
              className={
                "mt-1.5 size-1 shrink-0 rounded-full " +
                (isDo ? "bg-success" : "bg-destructive")
              }
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- interactive demo ---------- */

function ControlledDemo() {
  const [on, setOn] = React.useState(true)
  return (
    <div className="flex items-center gap-3">
      <Switch checked={on} onCheckedChange={setOn} id="controlled" />
      <Label htmlFor="controlled" className="font-normal">
        {on ? "Notificações ativas" : "Notificações desativadas"}
      </Label>
    </div>
  )
}

/* ---------- docs data ---------- */

const SWITCH_PROPS: Array<[string, string, string, string]> = [
  ["checked", "boolean", "—", "Estado controlado (use com onCheckedChange)."],
  ["defaultChecked", "boolean", "false", "Estado inicial não-controlado."],
  ["onCheckedChange", "(checked: boolean) => void", "—", "Disparado ao alternar."],
  ["size", `"sm" | "default" | "lg"`, `"default"`, "Tamanho do trilho e do botão."],
  ["tone", `"primary" | "success"`, `"primary"`, "Cor do estado ligado (semântica)."],
  ["disabled", "boolean", "false", "Desabilita o controle."],
  ["...props", "Radix Switch.Root", "—", "id, name, value, required, aria-*, etc."],
]

const SETTING_PROPS: Array<[string, string, string, string]> = [
  ["label", "ReactNode", "—", "Nome do ajuste (rótulo clicável)."],
  ["description", "ReactNode", "—", "Texto de apoio abaixo do rótulo."],
  ["icon", "ReactNode", "—", "Ícone à esquerda (num quadro muted)."],
  ["align", `"start" | "end"`, `"end"`, "Lado do switch (fim = direita)."],
  ["...props", "SwitchProps", "—", "checked, onCheckedChange, size, tone, disabled…"],
]

/* ---------- page ---------- */

export default function SwitchPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-14 p-8 md:p-12">
      {/* Header */}
      <header className="space-y-3">
        <Badge variant="secondary">Core · Formulários</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Switch</h1>
        <p className="max-w-2xl text-muted-foreground">
          Alterna um estado binário que tem efeito imediato — ativar/desativar
          notificações, integrações, feature flags. Sobre o primitivo Radix Switch,
          com os mesmos tokens do Checkbox. Acompanha o{" "}
          <code className="font-mono text-sm">SettingSwitch</code> para o padrão de
          linha de ajuste. Para seleção que só vale ao enviar um formulário, use{" "}
          <code className="font-mono text-sm">Checkbox</code>.
        </p>
      </header>

      {/* Basic / states */}
      <Section
        title="Estados"
        description="Ligado/desligado, desabilitado (em ambos os estados) e foco por teclado (Tab → anel de foco)."
      >
        <Demo>
          <Row>
            <div className="flex flex-col items-center gap-2">
              <Switch defaultChecked={false} aria-label="Desligado" />
              <span className="text-xs text-muted-foreground">off</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch defaultChecked aria-label="Ligado" />
              <span className="text-xs text-muted-foreground">on</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch disabled aria-label="Desabilitado off" />
              <span className="text-xs text-muted-foreground">disabled</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch disabled defaultChecked aria-label="Desabilitado on" />
              <span className="text-xs text-muted-foreground">disabled on</span>
            </div>
          </Row>
        </Demo>
      </Section>

      {/* Sizes */}
      <Section title="Tamanhos" description="sm para linhas densas e tabelas; default para formulários; lg para destaque.">
        <Demo>
          <Row>
            {(["sm", "default", "lg"] as const).map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <Switch size={s} defaultChecked aria-label={s} />
                <span className="text-xs text-muted-foreground">{s}</span>
              </div>
            ))}
          </Row>
        </Demo>
      </Section>

      {/* Tones */}
      <Section
        title="Cores (tone)"
        description="primary é o padrão. success para ajustes com sentido de “ativo/ok” (ex.: conta conectada, recurso habilitado)."
      >
        <Demo>
          <Row>
            <div className="flex flex-col items-center gap-2">
              <Switch tone="primary" defaultChecked aria-label="primary" />
              <span className="text-xs text-muted-foreground">primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Switch tone="success" defaultChecked aria-label="success" />
              <span className="text-xs text-muted-foreground">success</span>
            </div>
          </Row>
        </Demo>
      </Section>

      {/* With label / controlled */}
      <Section
        title="Com rótulo"
        description="Associe um Label via htmlFor — clicar no texto alterna o switch. O SettingSwitch já faz isso por você."
      >
        <Demo className="space-y-4">
          <ControlledDemo />
          <div className="flex items-center gap-3">
            <Switch id="s-marketing" />
            <Label htmlFor="s-marketing" className="font-normal">E-mails de marketing</Label>
          </div>
        </Demo>
      </Section>

      {/* SettingSwitch */}
      <Section
        title="SettingSwitch — linha de ajuste"
        description="O padrão pronto: ícone opcional + rótulo/descrição + switch à direita. Clique no rótulo para alternar."
      >
        <Demo className="max-w-lg divide-y divide-border">
          <div className="pb-4">
            <SettingSwitch
              icon={<Bell />}
              label="Notificações por e-mail"
              description="Receba um resumo diário das suas negociações."
              defaultChecked
            />
          </div>
          <div className="py-4">
            <SettingSwitch
              icon={<Moon />}
              label="Modo escuro automático"
              description="Segue o tema do sistema operacional."
            />
          </div>
          <div className="pt-4">
            <SettingSwitch
              icon={<ShieldCheck />}
              label="Autenticação em dois fatores"
              description="Obrigatória para a sua organização."
              tone="success"
              defaultChecked
              disabled
            />
          </div>
        </Demo>
        <CodeBlock>{`import { SettingSwitch } from "@/components/switch"
import { Bell } from "lucide-react"

<SettingSwitch
  icon={<Bell />}
  label="Notificações por e-mail"
  description="Receba um resumo diário."
  defaultChecked
/>`}</CodeBlock>
      </Section>

      {/* Composition / real examples */}
      <Section title="Exemplos reais" description="Padrões de configuração no CRM.">
        <div className="grid gap-4 md:grid-cols-2">
          <Demo>
            <p className="mb-4 text-xs font-medium text-muted-foreground">Painel de preferências</p>
            <div className="space-y-4">
              <SettingSwitch label="Novos leads" description="Avisar quando um lead entrar." defaultChecked size="sm" />
              <SettingSwitch label="Menções" description="Quando te marcarem num comentário." defaultChecked size="sm" />
              <SettingSwitch label="Relatório semanal" description="Toda segunda, às 9h." size="sm" />
            </div>
          </Demo>
          <Demo>
            <p className="mb-4 text-xs font-medium text-muted-foreground">Integração (linha de card)</p>
            <div className="flex items-center gap-4 rounded-lg border border-border p-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Globe className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">HubSpot</p>
                <p className="text-xs text-muted-foreground">Sincroniza contatos e negócios.</p>
              </div>
              <Switch tone="success" defaultChecked aria-label="Conectar HubSpot" />
            </div>
          </Demo>
        </div>
      </Section>

      {/* Light / Dark */}
      <Section
        title="Light / Dark"
        description="Trilho (bg-input), estado ligado (primary/success) e botão (bg-background) usam tokens; contraste garantido nos dois temas."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6">
            <p className="mb-4 text-xs font-medium text-muted-foreground">Light</p>
            <ThemePreview />
          </div>
          <div className="dark rounded-xl border border-border bg-card p-6 text-card-foreground">
            <p className="mb-4 text-xs font-medium text-muted-foreground">Dark</p>
            <ThemePreview />
          </div>
        </div>
      </Section>

      {/* Responsive */}
      <Section
        title="Responsivo"
        description="O SettingSwitch usa flex com o texto flexível e o switch fixo à direita — em contêineres estreitos o texto quebra e o switch permanece alinhado."
      >
        <Demo className="mx-auto max-w-xs">
          <SettingSwitch
            icon={<Zap />}
            label="Automação de follow-up para leads sem resposta"
            description="Envia um e-mail após 3 dias sem retorno."
            defaultChecked
          />
        </Demo>
      </Section>

      {/* Code */}
      <Section title="Código" description="Do básico ao controlado.">
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Básico</p>
            <CodeBlock>{`import { Switch } from "@/components/ui/switch"

<Switch defaultChecked />
<Switch size="sm" />
<Switch tone="success" />`}</CodeBlock>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Controlado + rótulo</p>
            <CodeBlock>{`const [on, setOn] = React.useState(true)

<div className="flex items-center gap-3">
  <Switch id="notif" checked={on} onCheckedChange={setOn} />
  <Label htmlFor="notif">Notificações</Label>
</div>`}</CodeBlock>
          </div>
        </div>
      </Section>

      {/* Props */}
      <Section title="Props" description="Switch e SettingSwitch.">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Switch</h3>
            <ApiTable rows={SWITCH_PROPS} />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">SettingSwitch</h3>
            <ApiTable rows={SETTING_PROPS} />
          </div>
        </div>
      </Section>

      {/* Guidelines */}
      <Section title="Boas práticas" description="Switch vs Checkbox.">
        <div className="grid gap-4 md:grid-cols-2">
          <GuidelineCard
            tone="do"
            title="Faça"
            items={[
              "Use switch para ações de efeito imediato (liga/desliga agora).",
              "Sempre dê um rótulo — Label htmlFor ou SettingSwitch.",
              "Use tone=success para “ativo/conectado”; primary para o resto.",
              "Reflita estados irreversíveis/obrigatórios com disabled + descrição.",
              "Mantenha o texto do rótulo curto e afirmativo (o que ligar faz).",
            ]}
          />
          <GuidelineCard
            tone="dont"
            title="Evite"
            items={[
              "Switch para escolhas que só valem ao enviar um formulário — use Checkbox.",
              "Switch sem rótulo/aria-label — quebra acessibilidade.",
              "Pedir “Salvar” depois de um switch: ele deve aplicar na hora.",
              "Cores hardcoded — use tone (tokens semânticos).",
              "Textos como “Ativar/Desativar” no rótulo — o estado é o próprio switch.",
            ]}
          />
        </div>
      </Section>

      {/* Accessibility */}
      <Section title="Acessibilidade" description="Herdado do Radix Switch.">
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">role=&quot;switch&quot;:</span>{" "}
              expõe <code className="font-mono text-xs">aria-checked</code> refletindo o estado.
            </li>
            <li>
              <span className="font-medium text-foreground">Teclado:</span>{" "}
              focável por Tab; alterna com <code className="font-mono text-xs">Espaço</code> e <code className="font-mono text-xs">Enter</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Rótulo:</span>{" "}
              associe via <code className="font-mono text-xs">Label htmlFor</code> (o SettingSwitch já faz) ou{" "}
              <code className="font-mono text-xs">aria-label</code> quando não houver texto visível.
            </li>
            <li>
              <span className="font-medium text-foreground">Foco visível:</span>{" "}
              anel <code className="font-mono text-xs">ring-3 ring-ring/50</code> só na navegação por teclado.
            </li>
            <li>
              <span className="font-medium text-foreground">Desabilitado:</span>{" "}
              <code className="font-mono text-xs">disabled</code> remove do fluxo e esmaece; dentro de um Field desabilitado, herda o estado.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  )
}

/** Shared preview so light/dark panels are identical. */
function ThemePreview() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <Switch defaultChecked aria-label="on" />
        <Switch aria-label="off" />
        <Switch tone="success" defaultChecked aria-label="success on" />
        <Switch disabled defaultChecked aria-label="disabled" />
      </div>
      <SettingSwitch icon={<Bell />} label="Notificações" description="Resumo diário." defaultChecked />
    </div>
  )
}
