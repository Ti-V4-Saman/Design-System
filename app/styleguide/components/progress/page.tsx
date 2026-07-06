"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"

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

export default function ProgressPage() {
  const [value, setValue] = React.useState(13)
  React.useEffect(() => {
    const t = window.setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 11)), 900)
    return () => window.clearInterval(t)
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Progress</h1>
        <p className="max-w-2xl text-muted-foreground">
          Barra de progresso determinada (Radix Progress). Trilha <code>bg-muted</code>, indicador
          <code> bg-primary</code>; recolorível por token para estados semânticos. Alterne o tema para dark mode.
        </p>
      </header>

      <Section title="Padrão (animado)" description="value controla o preenchimento; transição suave.">
        <Demo>
          <div className="max-w-md space-y-2">
            <Progress value={value} />
            <p className="text-xs text-muted-foreground">{value}%</p>
          </div>
        </Demo>
      </Section>

      <Section title="Cores semânticas" description="Use indicatorClassName para refletir o estado (meta atingida, atenção, estouro).">
        <Demo>
          <div className="max-w-md space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Meta de vendas</span><span className="text-success">82%</span></div>
              <Progress value={82} indicatorClassName="bg-success" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Cota de e-mails</span><span className="text-warning">88%</span></div>
              <Progress value={88} indicatorClassName="bg-warning" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground"><span>Armazenamento</span><span className="text-destructive">96%</span></div>
              <Progress value={96} indicatorClassName="bg-destructive" />
            </div>
          </div>
        </Demo>
      </Section>

      <Section title="Tamanhos" description="Ajuste a altura via className (h-1 / h-2 / h-3).">
        <Demo>
          <div className="max-w-md space-y-4">
            <Progress value={60} className="h-1" />
            <Progress value={60} />
            <Progress value={60} className="h-3" />
          </div>
        </Demo>
      </Section>

      <Section title="Exemplo real — onboarding" description="Progresso de etapas de configuração da conta.">
        <Demo>
          <div className="max-w-md space-y-2 rounded-lg border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">Configuração da conta</p>
              <span className="text-xs text-muted-foreground">3 de 5 etapas</span>
            </div>
            <Progress value={60} indicatorClassName="bg-success" />
            <p className="text-xs text-muted-foreground">Falta conectar o e-mail e importar contatos.</p>
          </div>
        </Demo>
      </Section>

      <Section title="Uso & API">
        <div className="space-y-4">
          <CodeBlock>{`import { Progress } from "@/components/ui/progress"

<Progress value={72} />
<Progress value={96} indicatorClassName="bg-destructive" />  // estado semântico
<Progress value={60} className="h-1" />                       // altura`}</CodeBlock>
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Acessibilidade</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>Radix expõe <code>role=&quot;progressbar&quot;</code> + <code>aria-valuenow/min/max</code>.</li>
              <li>Acompanhe com um rótulo textual (%) para clareza.</li>
              <li>Para carregamento sem fim conhecido, prefira um Skeleton/Spinner.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
