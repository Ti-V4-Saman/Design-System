"use client"

import * as React from "react"
import {
  Activity,
  Bell,
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  Shield,
  User,
} from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  DemoGrid,
  GuidelinesSection,
  Kbd,
  ResponsiveSection,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

// ─── Demo-specific helper ────────────────────────────────────────────────────

function CountBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="secondary" className="ml-1 h-5 min-w-5 justify-center px-1 tabular-nums">
      {children}
    </Badge>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TabsPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Tabs"
        description={
          <>
            Organizam conteúdo relacionado em seções alternáveis dentro do mesmo contexto — detalhe de
            cliente, configurações, relatórios. Base Radix (acessível por teclado); visual 100% CRM V4
            com variante <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">line</code>{" "}
            em <span className="font-medium text-primary">emerald</span>.
          </>
        }
      />

      {/* Variants */}
      <Section
        title="Variantes"
        description="default (segmentado, para troca de visão) e line (sublinhado, para navegação de página)."
      >
        <DemoGrid cols={2}>
          <Demo>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">default</p>
            <Tabs defaultValue="geral">
              <TabsList>
                <TabsTrigger value="geral">Visão geral</TabsTrigger>
                <TabsTrigger value="ativ">Atividades</TabsTrigger>
                <TabsTrigger value="arq">Arquivos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="pt-4 text-muted-foreground">Conteúdo da visão geral.</TabsContent>
              <TabsContent value="ativ" className="pt-4 text-muted-foreground">Timeline de atividades.</TabsContent>
              <TabsContent value="arq" className="pt-4 text-muted-foreground">Arquivos anexados.</TabsContent>
            </Tabs>
          </Demo>
          <Demo>
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">line</p>
            <Tabs defaultValue="geral">
              <TabsList variant="line">
                <TabsTrigger value="geral">Visão geral</TabsTrigger>
                <TabsTrigger value="ativ">Atividades</TabsTrigger>
                <TabsTrigger value="arq">Arquivos</TabsTrigger>
              </TabsList>
              <TabsContent value="geral" className="pt-4 text-muted-foreground">Conteúdo da visão geral.</TabsContent>
              <TabsContent value="ativ" className="pt-4 text-muted-foreground">Timeline de atividades.</TabsContent>
              <TabsContent value="arq" className="pt-4 text-muted-foreground">Arquivos anexados.</TabsContent>
            </Tabs>
          </Demo>
        </DemoGrid>
      </Section>

      {/* Sizes */}
      <Section title="Tamanhos" description="sm para áreas densas (toolbars, cards); md como padrão.">
        <Demo className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="w-10 text-xs text-muted-foreground">sm</span>
            <Tabs defaultValue="a">
              <TabsList size="sm">
                <TabsTrigger value="a">Dia</TabsTrigger>
                <TabsTrigger value="b">Semana</TabsTrigger>
                <TabsTrigger value="c">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-4">
            <span className="w-10 text-xs text-muted-foreground">md</span>
            <Tabs defaultValue="a">
              <TabsList size="md">
                <TabsTrigger value="a">Dia</TabsTrigger>
                <TabsTrigger value="b">Semana</TabsTrigger>
                <TabsTrigger value="c">Mês</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </Section>

      {/* States */}
      <Section title="Estados" description="Ativo, hover (passe o mouse) e disabled.">
        <Demo>
          <Tabs defaultValue="ativo">
            <TabsList>
              <TabsTrigger value="ativo">Ativo</TabsTrigger>
              <TabsTrigger value="hover">Hover</TabsTrigger>
              <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            </TabsList>
          </Tabs>
        </Demo>
      </Section>

      {/* Orientation */}
      <Section
        title="Orientação"
        description="Horizontal (padrão) e vertical — útil para navegação de configurações."
      >
        <Demo>
          <Tabs defaultValue="perfil" orientation="vertical" className="min-h-40">
            <TabsList variant="line">
              <TabsTrigger value="perfil"><User /> Perfil</TabsTrigger>
              <TabsTrigger value="notif"><Bell /> Notificações</TabsTrigger>
              <TabsTrigger value="seg"><Shield /> Segurança</TabsTrigger>
              <TabsTrigger value="cobr"><CreditCard /> Cobrança</TabsTrigger>
            </TabsList>
            <TabsContent value="perfil" className="pl-6 text-muted-foreground">Dados do perfil da conta.</TabsContent>
            <TabsContent value="notif" className="pl-6 text-muted-foreground">Preferências de notificação.</TabsContent>
            <TabsContent value="seg" className="pl-6 text-muted-foreground">Senha e autenticação.</TabsContent>
            <TabsContent value="cobr" className="pl-6 text-muted-foreground">Plano e faturas.</TabsContent>
          </Tabs>
        </Demo>
      </Section>

      {/* Composition */}
      <Section title="Composição" description="Abas com ícones e badges de contagem.">
        <Demo>
          <Tabs defaultValue="leads">
            <TabsList>
              <TabsTrigger value="leads"><LayoutDashboard /> Leads <CountBadge>24</CountBadge></TabsTrigger>
              <TabsTrigger value="tasks"><Activity /> Tarefas <CountBadge>7</CountBadge></TabsTrigger>
              <TabsTrigger value="files"><FileText /> Arquivos <CountBadge>3</CountBadge></TabsTrigger>
            </TabsList>
          </Tabs>
        </Demo>
      </Section>

      {/* Real CRM example */}
      <Section
        title="Exemplo real — Detalhe do cliente"
        description="Padrão de navegação de um registro de CRM com conteúdo por aba."
      >
        <Demo>
          <Tabs defaultValue="overview">
            <TabsList variant="line">
              <TabsTrigger value="overview"><LayoutDashboard /> Visão geral</TabsTrigger>
              <TabsTrigger value="activity"><Activity /> Atividades <CountBadge>12</CountBadge></TabsTrigger>
              <TabsTrigger value="files"><FileText /> Arquivos <CountBadge>5</CountBadge></TabsTrigger>
              <TabsTrigger value="invoices"><Receipt /> Faturas</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-5">
              <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-2 text-sm">
                <dt className="text-muted-foreground">Cliente</dt><dd className="text-foreground">Halvorson Inc</dd>
                <dt className="text-muted-foreground">Responsável</dt><dd className="text-foreground">Sara Ann</dd>
                <dt className="text-muted-foreground">MRR</dt><dd className="text-foreground tabular-nums">R$ 12.400</dd>
                <dt className="text-muted-foreground">Status</dt><dd><Badge variant="secondary">Ativo</Badge></dd>
              </dl>
            </TabsContent>
            <TabsContent value="activity" className="pt-5 text-sm text-muted-foreground">
              12 atividades recentes — chamadas, emails e reuniões.
            </TabsContent>
            <TabsContent value="files" className="pt-5 text-sm text-muted-foreground">
              5 arquivos: contrato, propostas e anexos.
            </TabsContent>
            <TabsContent value="invoices" className="pt-5 text-sm text-muted-foreground">
              Nenhuma fatura em aberto.
            </TabsContent>
          </Tabs>
        </Demo>
      </Section>

      {/* Dark mode */}
      <DarkModeSection description="As mesmas abas nos dois temas — cores vêm dos tokens.">
        <Tabs defaultValue="a">
          <TabsList variant="line">
            <TabsTrigger value="a">Visão geral</TabsTrigger>
            <TabsTrigger value="b">Atividades</TabsTrigger>
          </TabsList>
        </Tabs>
      </DarkModeSection>

      {/* Responsive */}
      <ResponsiveSection description="Em telas estreitas a lista de abas rola horizontalmente sem quebrar o layout.">
        <Demo>
          <div className="max-w-xs overflow-x-auto">
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">Leads</TabsTrigger>
                <TabsTrigger value="b">Clientes</TabsTrigger>
                <TabsTrigger value="c">Projetos</TabsTrigger>
                <TabsTrigger value="d">Faturas</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Demo>
      </ResponsiveSection>

      {/* Accessibility */}
      <AccessibilitySection
        items={[
          <>Papéis ARIA <code className="font-mono text-xs">tablist</code> / <code className="font-mono text-xs">tab</code> / <code className="font-mono text-xs">tabpanel</code> via Radix.</>,
          <>Navegação por teclado: <Kbd>←</Kbd> <Kbd>→</Kbd> entre abas, <Kbd>Home</Kbd>/<Kbd>End</Kbd> para extremos.</>,
          <>Foco visível com ring; abas <code className="font-mono text-xs">disabled</code> são puladas.</>,
          <>Cada aba é associada ao seu painel por <code className="font-mono text-xs">value</code>.</>,
        ]}
      />

      {/* Code */}
      <Section title="Código">
        <CodeBlock>{`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList variant="line">           {/* default | line */}
    <TabsTrigger value="overview">Visão geral</TabsTrigger>
    <TabsTrigger value="activity">Atividades</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="activity">…</TabsContent>
</Tabs>

// vertical + tamanho
<Tabs defaultValue="a" orientation="vertical">
  <TabsList variant="line" size="sm"> … </TabsList>
</Tabs>`}</CodeBlock>
      </Section>

      {/* API */}
      <ApiSection
        groups={[
          [
            { prop: "Tabs", type: "value, defaultValue, onValueChange", description: "Raiz (Radix). Controlado ou não." },
            { prop: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "Direção das abas." },
          ],
          [
            { prop: "TabsList.variant", type: '"default" | "line"', default: '"default"', description: "Segmentado ou sublinhado (emerald)." },
            { prop: "TabsList.size", type: '"sm" | "md"', default: '"md"', description: "Densidade das abas." },
            { prop: "TabsTrigger.value", type: "string", description: "Liga a aba ao seu TabsContent." },
            { prop: "TabsTrigger.disabled", type: "boolean", default: "false", description: "Desabilita e pula no teclado." },
            { prop: "TabsContent.value", type: "string", description: "Painel exibido quando a aba está ativa." },
          ],
        ]}
      />

      {/* Best practices */}
      <GuidelinesSection
        dos={[
          "Use line para navegação de página; default para trocar visões.",
          "Mantenha rótulos curtos e paralelos.",
          "Mostre contagens com badge quando ajudar a priorizar.",
          "Preserve o estado da aba ao voltar para a tela.",
        ]}
        donts={[
          "Não use tabs para etapas sequenciais — use um stepper.",
          "Não coloque muitas abas; considere um select acima de ~6.",
          "Não esconda ações críticas atrás de abas.",
          "Não misture variantes diferentes na mesma tela.",
        ]}
      />
    </StyleguidePage>
  )
}
