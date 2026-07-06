"use client"

import * as React from "react"
import {
  ArrowRight,
  Ban,
  Check,
  ChevronDown,
  Download,
  Info,
  Mail,
  Plus,
  Settings,
  Trash2,
  TriangleAlert,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ButtonGroup,
  SplitButton,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/button"
import {
  AccessibilitySection,
  ApiTable,
  CodeBlock,
  ComponentHeader,
  Demo,
  DesignNotes,
  RelatedComponents,
  Section,
  StyleguidePage,
  type ApiRow,
} from "@/app/styleguide/_components"

/* -------------------------------------------------------------------------------------------------
 * Page-local presentation helper (no shared equivalent)
 * -----------------------------------------------------------------------------------------------*/

function Row({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

const VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const

/* -------------------------------------------------------------------------------------------------
 * Interactive: loading toggle
 * -----------------------------------------------------------------------------------------------*/

function LoadingToggleDemo() {
  const [loading, setLoading] = React.useState(false)
  const timer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  React.useEffect(() => () => clearTimeout(timer.current), [])

  const run = () => {
    setLoading(true)
    timer.current = setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading={loading} onClick={run}>
        {loading ? "Salvando…" : "Salvar alterações"}
      </Button>
      <Button variant="outline" loading={loading} onClick={run}>
        {loading ? "Processando…" : "Sincronizar"}
      </Button>
      <Button size="icon" variant="secondary" loading={loading} onClick={run} aria-label="Atualizar">
        {!loading && <Settings />}
      </Button>
      <span className="text-xs text-muted-foreground">
        Clique para simular 1,8s de carregamento.
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Props documentation
 * -----------------------------------------------------------------------------------------------*/

const PROPS: ApiRow[] = [
  {
    prop: "variant",
    type: `"default" | "secondary" | "outline" | "ghost" | "destructive" | "success" | "warning" | "info" | "link"`,
    default: `"default"`,
    description: "Hierarquia visual e significado semântico da ação.",
  },
  {
    prop: "size",
    type: `"default" | "xs" | "sm" | "lg" | "icon" | "icon-xs" | "icon-sm" | "icon-lg"`,
    default: `"default"`,
    description: "Altura/densidade. As variantes icon-* são quadradas para botões apenas-ícone.",
  },
  { prop: "loading", type: "boolean", default: "false", description: "Mostra spinner, desabilita e marca aria-busy." },
  { prop: "disabled", type: "boolean", default: "false", description: "Desabilita o botão." },
  {
    prop: "asChild",
    type: "boolean",
    default: "false",
    description: "Renderiza o filho como elemento raiz (ex.: <a>, <Link>) preservando os estilos.",
  },
  { prop: "...props", type: "React.ComponentProps<\"button\">", default: "—", description: "Todos os atributos nativos de button." },
]

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function ButtonPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Button"
        description={
          <>
            O gatilho de ação do CRM V4. Seis variantes de hierarquia, uma escala de
            tamanhos densa, suporte a ícones, estado de carregamento e composição via{" "}
            <code className="font-mono text-sm">asChild</code> — tudo derivado dos
            tokens do design system e consistente nos dois temas.
          </>
        }
      >
        <Badge variant="secondary">Core · Ações</Badge>
      </ComponentHeader>

      {/* Variants */}
      <Section
        title="Variantes"
        description="Do mais enfático ao mais discreto. Use default para a ação primária de cada contexto e reserve destructive para ações irreversíveis."
      >
        <Demo>
          <Row>
            {VARIANTS.map((v) => (
              <Button key={v} variant={v}>
                {v[0].toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </Row>
        </Demo>
        <CodeBlock>{`import { Button } from "@/components/ui/button"

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`}</CodeBlock>
      </Section>

      {/* Semantic variants */}
      <Section
        title="Variantes semânticas"
        description="Ações com significado de feedback, derivadas dos tokens semânticos. Superfície suave (tinted) para conviverem lado a lado sem competir com a ação primária."
      >
        <Demo className="space-y-5">
          <Row>
            <Button variant="success">
              <Check data-icon="inline-start" />
              Aprovar
            </Button>
            <Button variant="warning">
              <TriangleAlert data-icon="inline-start" />
              Revisar
            </Button>
            <Button variant="info">
              <Info data-icon="inline-start" />
              Detalhes
            </Button>
            <Button variant="destructive">
              <Ban data-icon="inline-start" />
              Reprovar
            </Button>
          </Row>
          <Row label="Tamanhos sm (uso em tabelas/toolbars)">
            <Button size="sm" variant="success">
              Aprovar
            </Button>
            <Button size="sm" variant="warning">
              Revisar
            </Button>
            <Button size="sm" variant="info">
              Detalhes
            </Button>
            <Button size="icon-sm" variant="success" aria-label="Aprovar">
              <Check />
            </Button>
          </Row>
        </Demo>
        <CodeBlock>{`<Button variant="success">Aprovar</Button>
<Button variant="warning">Revisar</Button>
<Button variant="info">Detalhes</Button>
<Button variant="destructive">Reprovar</Button>`}</CodeBlock>
      </Section>

      {/* Sizes */}
      <Section
        title="Tamanhos"
        description="Escala densa pensada para telas de CRM. xs e sm para tabelas e toolbars; default para formulários; lg para CTAs. As variantes icon-* são quadradas."
      >
        <Demo className="space-y-5">
          <Row label="Texto">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </Row>
          <Row label="Ícone">
            <Button size="icon-xs" variant="outline" aria-label="Adicionar">
              <Plus />
            </Button>
            <Button size="icon-sm" variant="outline" aria-label="Adicionar">
              <Plus />
            </Button>
            <Button size="icon" variant="outline" aria-label="Adicionar">
              <Plus />
            </Button>
            <Button size="icon-lg" variant="outline" aria-label="Adicionar">
              <Plus />
            </Button>
          </Row>
        </Demo>
      </Section>

      {/* With icons */}
      <Section
        title="Com ícones"
        description="Marque o ícone com data-icon para o botão ajustar o padding automaticamente: inline-start (à esquerda) ou inline-end (à direita)."
      >
        <Demo>
          <Row>
            <Button>
              <Plus data-icon="inline-start" />
              Novo lead
            </Button>
            <Button variant="outline">
              <Download data-icon="inline-start" />
              Exportar
            </Button>
            <Button variant="secondary">
              Próximo
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button variant="ghost">
              Opções
              <ChevronDown data-icon="inline-end" />
            </Button>
            <Button size="icon" aria-label="Configurações">
              <Settings />
            </Button>
          </Row>
        </Demo>
        <CodeBlock>{`<Button>
  <Plus data-icon="inline-start" />
  Novo lead
</Button>

<Button variant="secondary">
  Próximo
  <ArrowRight data-icon="inline-end" />
</Button>

<Button size="icon" aria-label="Configurações">
  <Settings />
</Button>`}</CodeBlock>
      </Section>

      {/* Loading */}
      <Section
        title="Carregando"
        description="loading exibe um spinner, desabilita o botão e define aria-busy. Em botões apenas-ícone, o spinner substitui o ícone."
      >
        <Demo className="space-y-5">
          <Row label="Interativo">
            <LoadingToggleDemo />
          </Row>
          <Row label="Por variante">
            <Button loading>Salvando…</Button>
            <Button variant="secondary" loading>
              Enviando…
            </Button>
            <Button variant="outline" loading>
              Aguarde
            </Button>
            <Button size="icon" loading aria-label="Carregando" />
          </Row>
        </Demo>
        <CodeBlock>{`<Button loading>Salvando…</Button>

// apenas-ícone: não passe um ícone filho enquanto loading
<Button size="icon" loading aria-label="Carregando" />`}</CodeBlock>
      </Section>

      {/* States */}
      <Section
        title="Estados"
        description="Hover, focus-visible (anel de foco por teclado), active (leve deslocamento vertical) e disabled. Passe o mouse e navegue por teclado para ver."
      >
        <Demo className="space-y-5">
          <Row label="Default vs. Disabled">
            <Button>Ativo</Button>
            <Button disabled>Desabilitado</Button>
            <Button variant="outline">Ativo</Button>
            <Button variant="outline" disabled>
              Desabilitado
            </Button>
            <Button variant="destructive">Ativo</Button>
            <Button variant="destructive" disabled>
              Desabilitado
            </Button>
          </Row>
          <p className="text-xs text-muted-foreground">
            O anel de foco aparece apenas na navegação por teclado
            (focus-visible), não no clique.
          </p>
        </Demo>
      </Section>

      {/* asChild */}
      <Section
        title="Composição (asChild)"
        description="Com asChild o botão empresta seus estilos ao filho — útil para links de navegação que precisam parecer botões, sem perder a semântica de âncora."
      >
        <Demo>
          <Row>
            <Button asChild>
              <a href="#composicao-aschild">
                <Mail data-icon="inline-start" />
                Abrir e-mail
              </a>
            </Button>
            <Button variant="link" asChild>
              <a href="#composicao-aschild">Ver documentação</a>
            </Button>
          </Row>
        </Demo>
        <CodeBlock>{`import Link from "next/link"

<Button asChild>
  <Link href="/leads/new">
    <Plus data-icon="inline-start" />
    Novo lead
  </Link>
</Button>`}</CodeBlock>
      </Section>

      {/* Real-world */}
      <Section
        title="Exemplos reais"
        description="Padrões recorrentes nos módulos do CRM."
      >
        <div className="space-y-4">
          {/* Form footer */}
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Rodapé de formulário
            </p>
            <div className="flex items-center justify-end gap-2">
              <Button variant="ghost">Cancelar</Button>
              <Button>
                <Check data-icon="inline-start" />
                Salvar
              </Button>
            </div>
          </Demo>

          {/* Toolbar */}
          <Demo>
            <p className="mb-3 text-xs font-medium text-muted-foreground">
              Toolbar de tabela
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm">
                <Plus data-icon="inline-start" />
                Adicionar
              </Button>
              <Button size="sm" variant="outline">
                <Download data-icon="inline-start" />
                Exportar
              </Button>
              <Button size="sm" variant="outline">
                Filtros
                <ChevronDown data-icon="inline-end" />
              </Button>
              <div className="ml-auto">
                <Button size="sm" variant="destructive">
                  <Trash2 data-icon="inline-start" />
                  Excluir selecionados
                </Button>
              </div>
            </div>
          </Demo>
        </div>
      </Section>

      {/* Dark mode */}
      <Section
        title="Dark mode"
        description="Todas as variantes usam tokens com pares -foreground, garantindo contraste nos dois temas. Painel direito forçado em dark."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Light</p>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((v) => (
                <Button key={v} variant={v} size="sm">
                  {v}
                </Button>
              ))}
            </div>
          </div>
          <div className="dark rounded-xl border border-border bg-card p-5 text-card-foreground">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Dark</p>
            <div className="flex flex-wrap gap-3">
              {VARIANTS.map((v) => (
                <Button key={v} variant={v} size="sm">
                  {v}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Family */}
      <Section
        title="Família — Grupo, Split e Toolbar"
        description="Composições do Button: ButtonGroup (segmentado), SplitButton (ação primária + dropdown) e Toolbar (barra de ações)."
      >
        <Demo center className="flex-col items-start gap-6">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">ButtonGroup (segmentado)</p>
            <ButtonGroup>
              <Button variant="outline">Dia</Button>
              <Button variant="outline" data-active="true" className="bg-accent text-accent-foreground">Semana</Button>
              <Button variant="outline">Mês</Button>
            </ButtonGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">ButtonGroup (ícones)</p>
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="Adicionar"><Plus /></Button>
              <Button variant="outline" size="icon" aria-label="Baixar"><Download /></Button>
              <Button variant="outline" size="icon" aria-label="Configurações"><Settings /></Button>
            </ButtonGroup>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">SplitButton (ação primária + dropdown)</p>
            <SplitButton
              onClick={() => {}}
              actions={[
                { label: "Salvar e criar novo", icon: <Plus />, onSelect: () => {} },
                { label: "Salvar como rascunho", icon: <Download />, onSelect: () => {} },
              ]}
            >
              Salvar lead
            </SplitButton>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">Toolbar (barra de ações)</p>
            <Toolbar>
              <ToolbarGroup>
                <Button variant="ghost" size="icon-sm" aria-label="Novo"><Plus /></Button>
                <Button variant="ghost" size="icon-sm" aria-label="Email"><Mail /></Button>
              </ToolbarGroup>
              <ToolbarSeparator />
              <ToolbarGroup>
                <Button variant="ghost" size="icon-sm" aria-label="Configurações"><Settings /></Button>
                <Button variant="ghost" size="icon-sm" aria-label="Excluir" className="text-destructive hover:text-destructive"><Trash2 /></Button>
              </ToolbarGroup>
            </Toolbar>
          </div>
        </Demo>
        <CodeBlock>{`import { ButtonGroup, SplitButton, Toolbar, ToolbarSeparator } from "@/components/button"

<ButtonGroup>
  <Button variant="outline">Dia</Button>
  <Button variant="outline">Semana</Button>
</ButtonGroup>

<SplitButton onClick={save} actions={[{ label: "Salvar e novo", onSelect }]}>Salvar</SplitButton>

<Toolbar>
  <Button variant="ghost" size="icon-sm"><Plus /></Button>
  <ToolbarSeparator />
  <Button variant="ghost" size="icon-sm"><Trash2 /></Button>
</Toolbar>`}</CodeBlock>
      </Section>

      {/* Props */}
      <Section title="Props" description="API do componente Button.">
        <ApiTable rows={PROPS} />
      </Section>

      {/* Accessibility */}
      <AccessibilitySection
        items={[
          <>
            <span className="font-medium text-foreground">Elemento nativo:</span>{" "}
            renderiza um <code className="font-mono text-xs">&lt;button&gt;</code>{" "}
            real — foco, Enter/Espaço e semântica vêm do navegador.
          </>,
          <>
            <span className="font-medium text-foreground">Foco visível:</span>{" "}
            anel de foco via <code className="font-mono text-xs">focus-visible</code>,
            exclusivo da navegação por teclado.
          </>,
          <>
            <span className="font-medium text-foreground">Apenas-ícone:</span>{" "}
            sempre forneça <code className="font-mono text-xs">aria-label</code>,
            pois não há texto visível.
          </>,
          <>
            <span className="font-medium text-foreground">Carregando:</span>{" "}
            <code className="font-mono text-xs">aria-busy</code> e{" "}
            <code className="font-mono text-xs">disabled</code> são aplicados
            automaticamente com <code className="font-mono text-xs">loading</code>.
          </>,
          <>
            <span className="font-medium text-foreground">asChild:</span> ao usar
            como link, o estado desabilitado vira{" "}
            <code className="font-mono text-xs">aria-disabled</code> (âncoras não
            aceitam <code className="font-mono text-xs">disabled</code>).
          </>,
        ]}
      />

      <DesignNotes
        items={[
          "As variantes semânticas (success, warning, info, destructive) usam fundo tingido do token (bg/10–15) em vez de preenchimento sólido — sinalizam intenção sem competir com a ação primária.",
          <>
            <span className="font-medium text-foreground">loading</span> mostra
            o spinner, desabilita e marca{" "}
            <code className="font-mono text-xs">aria-busy</code>. Com{" "}
            <code className="font-mono text-xs">asChild</code> vira{" "}
            <code className="font-mono text-xs">aria-disabled</code>, pois
            âncoras não aceitam <code className="font-mono text-xs">disabled</code>.
          </>,
          <>
            Estilos por atributo ARIA: <code className="font-mono text-xs">aria-expanded</code>{" "}
            reage a gatilhos de menu/dropdown e{" "}
            <code className="font-mono text-xs">aria-invalid</code> a erros de
            formulário — sem props extras.
          </>,
          "O nudge active:translate-y-px é suprimido quando o botão abre um popup (aria-haspopup), evitando deslocar gatilhos de menu.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Dropdown Menu",
            href: "/styleguide/components/dropdown-menu",
            description: "Usa o botão como gatilho; aria-expanded aplica o estilo aberto.",
          },
          {
            name: "Toggle",
            href: "/styleguide/components/toggle",
            description: "Botão de estado on/off com a mesma linguagem visual.",
          },
          {
            name: "Toggle Group",
            href: "/styleguide/components/toggle-group",
            description: "Conjunto segmentado de toggles para escolha exclusiva.",
          },
          {
            name: "Input Group",
            href: "/styleguide/components/input-group",
            description: "Embute InputGroupButton para ações inline no campo.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
