"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
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

export default function ProgressPage() {
  const [value, setValue] = React.useState(13)
  React.useEffect(() => {
    const t = window.setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 11)), 900)
    return () => window.clearInterval(t)
  }, [])

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Progress"
        description={
          <>
            Barra de progresso determinada (Radix Progress). Trilha <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-muted</code>,
            indicador <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">bg-primary</code>; recolorível por token para estados semânticos.
          </>
        }
      />

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

      <Section title="Composição — onboarding" description="Progresso de etapas de configuração da conta.">
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

      <AccessibilitySection
        items={[
          <>Radix expõe <code className="font-mono text-xs">role=&quot;progressbar&quot;</code> + <code className="font-mono text-xs">aria-valuenow/min/max</code>.</>,
          <>Acompanhe com um rótulo textual (%) para clareza.</>,
          <>Para carregamento sem fim conhecido, prefira um Skeleton/Spinner.</>,
        ]}
      />

      <DarkModeSection description="A mesma barra nos dois temas — trilha bg-muted e indicador por token.">
        <div className="max-w-xs space-y-4">
          <Progress value={72} />
          <Progress value={82} indicatorClassName="bg-success" />
          <Progress value={96} indicatorClassName="bg-destructive" />
        </div>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "value", type: "number", default: "—", description: "Preenchimento de 0 a 100 (determinado)." },
            { prop: "indicatorClassName", type: "string", description: "Classe do indicador — recolor por token semântico (bg-success, bg-warning, bg-destructive)." },
            { prop: "className", type: "string", description: "Classe da trilha — altura via h-1 / h-2 / h-3." },
            { prop: "...props", type: "Radix Progress.Root", description: "Demais props do primitivo Radix Progress." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Progress } from "@/components/ui/progress"

<Progress value={72} />
<Progress value={96} indicatorClassName="bg-destructive" />  // estado semântico
<Progress value={60} className="h-1" />                       // altura`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use para progresso determinado com fim conhecido (etapas, cotas, uploads).",
          "Acompanhe a barra com um rótulo textual (%) ou contagem de etapas.",
          "Recolora o indicador por token para refletir o estado semântico.",
        ]}
        donts={[
          "Não use para carregamento indeterminado — prefira Skeleton ou Spinner.",
          "Não confie só na cor; mantenha o rótulo textual.",
          "Não anime o value de forma abrupta sem transição.",
        ]}
      />

      <DesignNotes
        items={[
          <>Progress é <strong>determinado</strong> (0–100, com fim conhecido): etapas, cotas e uploads. Para carregamento indeterminado, use Spinner ou Skeleton.</>,
          <>Trilha <code className="font-mono text-xs">bg-muted</code> + indicador <code className="font-mono text-xs">bg-primary</code>; recolorir o indicador via <code className="font-mono text-xs">indicatorClassName</code> (<code className="font-mono text-xs">bg-success/warning/destructive</code>) reflete o estado semântico.</>,
          <>Radix expõe <code className="font-mono text-xs">role=&quot;progressbar&quot;</code> com <code className="font-mono text-xs">aria-valuenow/min/max</code>; acompanhe sempre com rótulo textual (%), pois cor sozinha não basta.</>,
          <>Altura ajustável por <code className="font-mono text-xs">className</code> (<code className="font-mono text-xs">h-1/h-2/h-3</code>) para caber em barras finas ou de destaque.</>,
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Spinner", href: "/styleguide/components/spinner", description: "Carregamento indeterminado, sem fim conhecido." },
          { name: "Slider", href: "/styleguide/components/slider", description: "Trilha + preenchimento parecidos, mas para entrada interativa de valor." },
          { name: "Survey", href: "/styleguide/components/survey", description: "O StepIndicator mostra progresso por etapas do fluxo." },
          { name: "Badge", href: "/styleguide/components/badge", description: "Exibir a porcentagem ou o estado como rótulo compacto." },
        ]}
      />
    </StyleguidePage>
  )
}
