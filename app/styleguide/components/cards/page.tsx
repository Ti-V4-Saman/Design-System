"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CRMBaseCard,
  StatCard, ContentCard,
  EntityCard, ProfileCard,
  WidgetCard, ChartCard,
  ActivityCard, TimelineCard,
  TaskCard, KanbanCard, ProjectCard,
  AttachmentCard, CommentCard, EmptyStateCard,
  IntegrationCard, QuickActionCard,
} from "@/components/cards"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import {
  Users, TrendingUp, DollarSign, ShoppingCart, BarChart2,
  Mail, MessageSquare, GitBranch, Zap, Plus, FileText,
  UserPlus, Send, Calendar,
} from "lucide-react"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  DesignNotes,
  GuidelinesSection,
  RelatedComponents,
  Section,
  StyleguidePage,
} from "@/app/styleguide/_components"

const TABS = [
  "Fundação",
  "Pessoas",
  "Painel",
  "Trabalho",
  "Feed",
  "Utilitários",
]

export default function CardsStyleguidePage() {
  const [activeTab, setActiveTab] = React.useState("Fundação")

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Card Family"
        description="17 componentes de card reutilizáveis compartilhando a mesma linguagem visual do CRM V4 — todos construídos sobre a casca CRMBaseCard e o conjunto de tokens CardVariant compartilhado (default · primary · success · warning · destructive · info · muted)."
      />

      <div className="space-y-8">
        {/* Tabs */}
        <div className="flex gap-1 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
                activeTab === tab
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Fundação */}
        {activeTab === "Fundação" && (
          <div className="flex flex-col gap-8">
            <Section title="Card Base">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <CRMBaseCard>
                  <CardContent className="py-4 text-sm text-muted-foreground">Casca de card padrão</CardContent>
                </CRMBaseCard>
                <CRMBaseCard clickable onClick={() => {}}>
                  <CardContent className="py-4 text-sm text-muted-foreground">Card clicável</CardContent>
                </CRMBaseCard>
                <CRMBaseCard selected>
                  <CardContent className="py-4 text-sm text-muted-foreground">Card selecionado</CardContent>
                </CRMBaseCard>
              </div>
            </Section>

            <Section title="Card de Estatística / KPI">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Receita Total"
                  value="R$ 48.295"
                  variant="success"
                  icon={<DollarSign />}
                  trend={{ value: 12.5, label: "vs. mês anterior" }}
                />
                <StatCard
                  title="Novos Usuários"
                  value="1.284"
                  variant="primary"
                  icon={<Users />}
                  trend={{ value: 8.2, label: "vs. semana anterior" }}
                />
                <StatCard
                  title="Pedidos"
                  value="342"
                  variant="warning"
                  icon={<ShoppingCart />}
                  trend={{ value: -3.1, label: "vs. ontem" }}
                />
                <StatCard
                  title="Conversão"
                  value="3,6%"
                  variant="destructive"
                  icon={<TrendingUp />}
                  description="Com base nos últimos 30 dias"
                />
              </div>
            </Section>

            <Section title="Card de Conteúdo">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContentCard
                  title="Relatório de Desempenho do 3º Trimestre"
                  description="Resumo das principais métricas e iniciativas do terceiro trimestre."
                  action={<Button size="sm" variant="outline">Ver</Button>}
                  footer={<span className="text-xs text-muted-foreground">Atualizado há 2 dias</span>}
                >
                  <p className="text-sm text-muted-foreground">
                    Metas de receita superadas em 12%. As notas de satisfação do cliente melhoraram em todos os segmentos.
                  </p>
                </ContentCard>
                <ContentCard
                  title="Notas da Daily do Time"
                  description="Sincronização diária — 5 de julho"
                  action={<Button size="sm" variant="ghost">Editar</Button>}
                >
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Planejamento da sprint concluído</li>
                    <li>Revisão de design agendada para sexta-feira</li>
                    <li>3 impedimentos resolvidos</li>
                  </ul>
                </ContentCard>
              </div>
            </Section>
          </div>
        )}

        {/* Pessoas */}
        {activeTab === "Pessoas" && (
          <div className="flex flex-col gap-8">
            <Section title="Card de Entidade">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <EntityCard
                  icon={<Users />}
                  iconVariant="primary"
                  title="Acme Corporation"
                  subtitle="Cliente enterprise · 240 licenças"
                  meta="Última atividade há 2 dias"
                  badge={{ label: "Ativo", variant: "success" }}
                  clickable
                  onClick={() => {}}
                />
                <EntityCard
                  icon={<Mail />}
                  iconVariant="info"
                  title="Fatura #1024"
                  subtitle="R$ 12.400 · Vence em 20/jul"
                  badge={{ label: "Pendente", variant: "warning" }}
                  action={<Button size="sm" variant="outline">Pagar</Button>}
                />
                <EntityCard
                  icon={<ShoppingCart />}
                  iconVariant="destructive"
                  title="Pedido #8821"
                  subtitle="Cancelado · 3/jul"
                  badge={{ label: "Cancelado", variant: "destructive" }}
                />
                <EntityCard
                  icon={<BarChart2 />}
                  iconVariant="success"
                  title="Negócio: Série B"
                  subtitle="R$ 2,4M · Fecha em 30/jul"
                  badge={{ label: "Ganho", variant: "success" }}
                />
              </div>
            </Section>

            <Section title="Card de Perfil">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ProfileCard
                  avatarFallback="JS"
                  name="Joana Silva"
                  role="Designer de Produto"
                  email="joana@v4company.com"
                  actions={
                    <>
                      <Button size="sm" variant="outline">Mensagem</Button>
                      <Button size="sm">Seguir</Button>
                    </>
                  }
                />
                <ProfileCard
                  avatarFallback="MR"
                  name="Marcos Ribeiro"
                  role="Engenheiro Sênior"
                  email="marcos@v4company.com"
                  actions={<Button size="sm" variant="outline">Ver Perfil</Button>}
                />
                <ProfileCard
                  avatarFallback="AT"
                  name="Ana Torres"
                  role="Executiva de Contas"
                  email="ana@v4company.com"
                />
              </div>
            </Section>
          </div>
        )}

        {/* Painel */}
        {activeTab === "Painel" && (
          <div className="flex flex-col gap-8">
            <Section title="Card de Widget">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <WidgetCard
                  title="Usuários Ativos Mensais"
                  metric="24.531"
                  trend={{ value: 5.2, label: "vs. mês anterior" }}
                  description="Com base em sessões únicas"
                  action={<Button size="sm" variant="ghost">Detalhes</Button>}
                />
                <WidgetCard
                  title="Valor do Funil"
                  metric="R$ 1,2M"
                  metricLabel="projetado"
                  trend={{ value: -2.4, label: "vs. 2º tri" }}
                />
                <WidgetCard
                  title="Chamados de Suporte"
                  metric="47"
                  trend={{ value: 18, label: "abertos" }}
                  description="12 críticos, 35 normais"
                />
              </div>
            </Section>

            <Section title="Card de Gráfico">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ChartCard
                  title="Receita ao Longo do Tempo"
                  description="Receita mensal dos últimos 6 meses"
                  action={<Button size="sm" variant="ghost">Exportar</Button>}
                  footer={<span className="text-xs text-muted-foreground">Última atualização: hoje</span>}
                >
                  {/* Área de gráfico placeholder */}
                  <div className="h-40 rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Área do gráfico</span>
                  </div>
                </ChartCard>
                <ChartCard
                  title="Aquisição de Usuários"
                  description="Por canal — últimos 30 dias"
                >
                  <div className="h-40 rounded-lg bg-muted/50 flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Área do gráfico</span>
                  </div>
                </ChartCard>
              </div>
            </Section>
          </div>
        )}

        {/* Trabalho */}
        {activeTab === "Trabalho" && (
          <div className="flex flex-col gap-8">
            <Section title="Card de Tarefa">
              <div className="flex flex-col gap-2 max-w-lg">
                <TaskCard
                  id="t1"
                  title="Finalizar wireframes do fluxo de onboarding"
                  priority="high"
                  assigneeAvatarFallback="JS"
                  dueDate="8/jul"
                  tags={["Design"]}
                />
                <TaskCard
                  id="t2"
                  title="Revisar PR da documentação da API"
                  completed
                  priority="medium"
                  assigneeAvatarFallback="MR"
                  dueDate="5/jul"
                />
                <TaskCard
                  id="t3"
                  title="Configurar ambiente de homologação"
                  priority="low"
                  dueDate="12/jul"
                  tags={["Infra", "DevOps"]}
                />
              </div>
            </Section>

            <Section title="Card de Kanban">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
                <KanbanCard
                  id="k1"
                  title="Implementar login OAuth2"
                  description="Dar suporte aos provedores Google e GitHub"
                  labels={[
                    { label: "Auth", variant: "primary" },
                    { label: "Backend", variant: "muted" },
                  ]}
                  assigneeAvatarFallback="MR"
                  priority="high"
                  dueDate="10/jul"
                />
                <KanbanCard
                  id="k2"
                  title="Auditoria de tokens do design system"
                  labels={[{ label: "Design", variant: "info" }]}
                  assigneeAvatarFallback="JS"
                  priority="medium"
                />
                <KanbanCard
                  id="k3"
                  title="Corrigir bug de paginação no mobile"
                  labels={[{ label: "Bug", variant: "destructive" }]}
                  priority="high"
                  dueDate="7/jul"
                />
              </div>
            </Section>

            <Section title="Card de Projeto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProjectCard
                  title="Design System CRM V4"
                  description="Biblioteca de componentes e sistema de tokens"
                  progress={68}
                  status="active"
                  team={[
                    { fallback: "JS" },
                    { fallback: "MR" },
                    { fallback: "AT" },
                  ]}
                  dueDate="1/ago"
                />
                <ProjectCard
                  title="Redesign do App Mobile"
                  description="Renovação para iOS e Android"
                  progress={100}
                  status="completed"
                  team={[{ fallback: "AT" }, { fallback: "JS" }]}
                />
                <ProjectCard
                  title="Migração do Pipeline de Dados"
                  description="Migração para nova infraestrutura"
                  progress={25}
                  status="paused"
                  dueDate="15/set"
                />
              </div>
            </Section>
          </div>
        )}

        {/* Feed */}
        {activeTab === "Feed" && (
          <div className="flex flex-col gap-8">
            <Section title="Card de Atividade">
              <div className="max-w-lg">
                <ActivityCard
                  items={[
                    {
                      id: "a1",
                      avatarFallback: "JS",
                      actor: "Joana Silva",
                      action: "fechou o negócio",
                      target: "Acme Corp — R$ 48 mil",
                      time: "há 2 minutos",
                    },
                    {
                      id: "a2",
                      avatarFallback: "MR",
                      actor: "Marcos Ribeiro",
                      action: "fez merge do PR",
                      target: "#142 — Refatoração de auth",
                      time: "há 15 minutos",
                    },
                    {
                      id: "a3",
                      avatarFallback: "AT",
                      actor: "Ana Torres",
                      action: "comentou em",
                      target: "Fatura #1024",
                      time: "há 1 hora",
                    },
                  ]}
                />
              </div>
            </Section>

            <Section title="Card de Linha do Tempo">
              <div className="max-w-sm">
                <TimelineCard
                  title="Histórico do Negócio"
                  events={[
                    {
                      id: "e1",
                      title: "Negócio criado",
                      description: "Iniciado por Joana Silva",
                      time: "1/jul, 09:00",
                      variant: "primary",
                    },
                    {
                      id: "e2",
                      title: "Proposta enviada",
                      description: "PDF anexado · R$ 48.000",
                      time: "3/jul, 14:30",
                      variant: "info",
                    },
                    {
                      id: "e3",
                      title: "Contrato assinado",
                      description: "Assinatura eletrônica via DocuSign",
                      time: "5/jul, 11:15",
                      variant: "success",
                    },
                  ]}
                />
              </div>
            </Section>

            <Section title="Card de Comentário">
              <div className="flex flex-col gap-3 max-w-lg">
                <CommentCard
                  avatarFallback="JS"
                  author="Joana Silva"
                  time="há 2h"
                  content="A proposta revisada ficou ótima. Estendi um pouco o cronograma para acomodar a revisão jurídica — deve voltar em até 3 dias úteis."
                  reactions={[{ emoji: "👍", count: 3 }, { emoji: "🎉", count: 1 }]}
                  onReply={() => {}}
                />
                <CommentCard
                  avatarFallback="MR"
                  author="Marcos Ribeiro"
                  time="há 45min"
                  content="Combinado. Vou alinhar com o jurídico do nosso lado."
                />
              </div>
            </Section>
          </div>
        )}

        {/* Utilitários */}
        {activeTab === "Utilitários" && (
          <div className="flex flex-col gap-8">
            <Section title="Card de Anexo">
              <div className="flex flex-col gap-2 max-w-lg">
                <AttachmentCard
                  fileName="Relatorio-Receita-3-Tri.pdf"
                  fileSize="2,4 MB"
                  fileType="pdf"
                  uploadedBy="Joana Silva"
                  uploadedAt="4/jul"
                  onDownload={() => {}}
                  onDelete={() => {}}
                />
                <AttachmentCard
                  fileName="mockup-produto-v3.png"
                  fileSize="890 KB"
                  fileType="image"
                  uploadedBy="Marcos Ribeiro"
                  uploadedAt="2/jul"
                  onDownload={() => {}}
                />
                <AttachmentCard
                  fileName="assets-design.zip"
                  fileSize="14,2 MB"
                  fileType="zip"
                  uploadedAt="28/jun"
                  onDownload={() => {}}
                  onDelete={() => {}}
                />
              </div>
            </Section>

            <Section title="Card de Estado Vazio">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                <EmptyStateCard
                  icon={<FileText />}
                  title="Nenhum documento ainda"
                  description="Envie arquivos ou crie um novo documento para começar."
                  action={<Button size="sm"><Plus className="h-4 w-4 mr-1" />Adicionar Documento</Button>}
                />
                <EmptyStateCard
                  icon={<Users />}
                  title="Nenhum membro na equipe"
                  description="Convide seu time para começar a colaborar neste projeto."
                  action={<Button size="sm" variant="outline"><UserPlus className="h-4 w-4 mr-1" />Convidar</Button>}
                />
              </div>
            </Section>

            <Section title="Card de Integração">
              <div className="flex flex-col gap-2 max-w-lg">
                <IntegrationCard
                  icon={<MessageSquare />}
                  iconVariant="primary"
                  name="Slack"
                  description="Envie notificações e atualizações para o seu workspace do Slack."
                  connected
                  onToggle={() => {}}
                />
                <IntegrationCard
                  icon={<GitBranch />}
                  iconVariant="muted"
                  name="GitHub"
                  description="Sincronize pull requests e issues com o funil do seu CRM."
                  connected={false}
                  onToggle={() => {}}
                />
                <IntegrationCard
                  icon={<Mail />}
                  iconVariant="info"
                  name="Gmail"
                  description="Acompanhe conversas de e-mail vinculadas a contatos e negócios."
                  connected
                  onToggle={() => {}}
                />
              </div>
            </Section>

            <Section title="Card de Ação Rápida">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
                <QuickActionCard
                  icon={<Send />}
                  iconVariant="primary"
                  label="Enviar Proposta"
                  description="Gere e envie por e-mail uma proposta de negócio"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Calendar />}
                  iconVariant="success"
                  label="Agendar Reunião"
                  description="Marque uma ligação com o seu contato"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Zap />}
                  iconVariant="warning"
                  label="Executar Automação"
                  description="Dispare uma sequência de fluxo de trabalho"
                  onClick={() => {}}
                />
                <QuickActionCard
                  icon={<Plus />}
                  iconVariant="muted"
                  label="Nova Tarefa"
                  description="Adicione ao seu funil"
                  disabled
                />
              </div>
            </Section>
          </div>
        )}
      </div>

      <AccessibilitySection
        title="Acessibilidade"
        items={[
          <>Cards clicáveis (<code className="font-mono text-xs">CRMBaseCard clickable</code>, QuickActionCard, EntityCard) expõem um <code className="font-mono text-xs">onClick</code> — conecte-os a um botão/link real para que sejam focáveis por teclado e anunciados como acionáveis.</>,
          <>O estado <code className="font-mono text-xs">disabled</code> aplica <code className="font-mono text-xs">opacity-50</code> e <code className="font-mono text-xs">pointer-events-none</code>, bloqueando a interação por ponteiro; não dependa apenas da cor para sinalizá-lo.</>,
          <>Ícones dentro de StatCard/EntityCard/IntegrationCard são decorativos — sempre os acompanhe do título/rótulo visível para que o significado não dependa do glifo.</>,
          <>Cards selecionados usam um <code className="font-mono text-xs">ring-primary</code> de 2px, uma pista não-cromática legível ao lado dos cards vizinhos.</>,
        ]}
      />

      <DarkModeSection description="Os mesmos cards em ambos os temas — toda superfície, ring, trend e cor de variante é resolvida a partir de tokens (bg-card, ring-primary, text-success/destructive).">
        <div className="space-y-3">
          <StatCard
            title="Receita Total"
            value="R$ 48.295"
            variant="success"
            icon={<DollarSign />}
            trend={{ value: 12.5, label: "vs. mês anterior" }}
          />
          <EntityCard
            icon={<Users />}
            iconVariant="primary"
            title="Acme Corporation"
            subtitle="Cliente enterprise · 240 licenças"
            badge={{ label: "Ativo", variant: "success" }}
          />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMBaseCard, StatCard, EntityCard } from "@/components/cards"

// Casca base — clickable / selected / disabled
<CRMBaseCard clickable selected={isSelected} onClick={select}>
  <CardContent>…</CardContent>
</CRMBaseCard>

// Card de KPI com uma variante semântica + trend
<StatCard title="Receita Total" value="R$ 48.295" variant="success"
  icon={<DollarSign />} trend={{ value: 12.5, label: "vs. mês anterior" }} />

// Linha de entidade com ícone, badge e ação inline
<EntityCard icon={<Mail />} iconVariant="info" title="Fatura #1024"
  subtitle="R$ 12.400 · Vence em 20/jul" badge={{ label: "Pendente", variant: "warning" }} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        description="Todos os cards compartilham a união CardVariant: default · primary · success · warning · destructive · info · muted."
        groups={[
          [
            { prop: "CRMBaseCard.clickable", type: "boolean", default: "false", description: "Adiciona ring no hover + cursor de ponteiro para cards interativos." },
            { prop: "CRMBaseCard.selected", type: "boolean", default: "false", description: "Aplica um destaque ring-primary de 2px." },
            { prop: "CRMBaseCard.disabled", type: "boolean", default: "false", description: "Esmaece para opacity-50 e desabilita eventos de ponteiro." },
            { prop: "CRMBaseCard.onClick", type: "() => void", description: "Handler de clique (ignorado quando desabilitado)." },
          ],
          [
            { prop: "StatCard", type: "{ title, value, variant?, icon?, trend?, description? }", description: "Tile de KPI; o trend renderiza seta para cima/baixo + delta colorido." },
            { prop: "EntityCard", type: "{ icon?, iconVariant?, title, subtitle?, meta?, badge?, action?, clickable? }", description: "Linha de entidade compacta com ícone, badge e ação opcional." },
            { prop: "ProjectCard", type: "{ title, progress, status?, team?, dueDate? }", description: "Resumo de projeto com barra de progresso e status." },
            { prop: "QuickActionCard", type: "{ icon, label, iconVariant?, description?, onClick?, disabled? }", description: "Tile de ação tocável para atalhos." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Boas Práticas"
        dos={[
          "Reutilize os tokens CardVariant para que as cores de status fiquem consistentes em todos os cards.",
          "Escolha o card que combina com o dado: StatCard para KPIs, EntityCard para linhas de lista, ProjectCard para progresso.",
          "Dê aos cards clicáveis/de ação rápida um onClick real e uma affordance clara.",
          "Use o EmptyStateCard com um CTA acionável quando uma coleção não tem itens.",
        ]}
        donts={[
          "Não codifique cores — sempre conduza o tom pela prop variant.",
          "Não aninhe cards dentro de cards; use seções de CardContent no lugar.",
          "Não marque um card como clicável sem conectar uma ação.",
          "Não sobrecarregue um único card com métricas não relacionadas — divida em vários tiles.",
        ]}
      />

      <DesignNotes
        items={[
          "As 17 variações compartilham o CRMBaseCard: uma única casca (bg-card, borda e radius por token) garante que qualquer card novo herde superfície, sombra e espaçamento consistentes.",
          "A cor de status nunca é codificada no card — passa sempre pela CardVariant (default, primary, success, warning, destructive, info, muted), então o mesmo token pinta ícone, trend e badge de forma coerente.",
          "Seleção usa um ring-primary de 2px em vez de mudar o fundo: é uma pista não-cromática que sobrevive ao dark mode e não compete com as cores de variante do conteúdo.",
          "Escolha o card pela forma do dado: StatCard para KPIs, EntityCard para linhas de lista, ProjectCard para progresso, EmptyStateCard quando a coleção está vazia — evitando remontar layouts ad hoc.",
        ]}
      />

      <RelatedComponents
        items={[
          { name: "Table", href: "/styleguide/components/table", description: "Alternativa densa a listas de EntityCard para muitos registros." },
          { name: "Badge", href: "/styleguide/components/badge", description: "Rótulos de status usados dentro de Entity/Kanban cards." },
          { name: "Avatar", href: "/styleguide/components/avatar", description: "Identidade em Profile, Comment e Activity cards." },
          { name: "Progress", href: "/styleguide/components/progress", description: "Barra de avanço exibida pelo ProjectCard." },
          { name: "Chart", href: "/styleguide/components/chart", description: "Preenche a área de visualização do ChartCard." },
        ]}
      />
    </StyleguidePage>
  )
}
