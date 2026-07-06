"use client"

import { Check, User } from "lucide-react"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  Demo,
  GuidelinesSection,
  Section,
  StyleguidePage,
  DesignNotes,
  RelatedComponents,
} from "@/app/styleguide/_components"

export default function AvatarPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Avatar"
        description="Representa uma pessoa ou entidade por imagem ou iniciais. Sempre circular, com fallback, indicador de status e agrupamento — para responsáveis, contatos e times no CRM."
      />

      <Section title="Tamanhos" description="sm (24px), default (32px), lg (40px).">
        <Demo center>
          <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>SA</AvatarFallback></Avatar>
        </Demo>
      </Section>

      <Section title="Fallback (iniciais)" description="Quando não há imagem, exibe iniciais. Tints tokenizados diferenciam pessoas.">
        <Demo center>
          <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
          <Avatar><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
          <Avatar><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
          <Avatar><AvatarFallback><User className="size-4" /></AvatarFallback></Avatar>
        </Demo>
      </Section>

      <Section title="Com imagem" description="AvatarImage com fallback automático se a imagem falhar.">
        <Demo center>
          <Avatar size="lg">
            <AvatarImage src="/avatar-demo.jpg" alt="Sara Ann" />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">↑ imagem ausente → cai no fallback &quot;SA&quot;</span>
        </Demo>
      </Section>

      <Section title="Indicador de status" description="AvatarBadge posiciona um dot/ícone. A cor comunica presença (online/ausente/offline).">
        <Demo center>
          <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" aria-label="Online" /></Avatar>
          <Avatar size="lg"><AvatarFallback>JD</AvatarFallback><AvatarBadge className="bg-warning" aria-label="Ausente" /></Avatar>
          <Avatar size="lg"><AvatarFallback>RG</AvatarFallback><AvatarBadge className="bg-muted-foreground" aria-label="Offline" /></Avatar>
          <Avatar size="lg"><AvatarFallback>MW</AvatarFallback><AvatarBadge className="bg-primary"><Check /></AvatarBadge></Avatar>
        </Demo>
      </Section>

      <Section title="Grupo (empilhado)" description="AvatarGroup sobrepõe avatares; AvatarGroupCount mostra o excedente.">
        <Demo center className="flex-col items-start gap-5">
          <AvatarGroup>
            <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
            <Avatar><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
            <Avatar><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
            <AvatarGroupCount>+5</AvatarGroupCount>
          </AvatarGroup>
          <AvatarGroup className="*:data-[slot=avatar]:ring-2">
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
            <Avatar size="lg"><AvatarFallback className="bg-destructive/10 text-destructive">MW</AvatarFallback></Avatar>
          </AvatarGroup>
        </Demo>
      </Section>

      <Section title="Exemplos reais no CRM" description="Responsável em uma linha e time de um projeto.">
        <Demo center className="flex-col items-stretch gap-5">
          <div className="flex items-center gap-3">
            <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">Sara Ann</span>
              <span className="text-xs text-muted-foreground">Responsável · Halvorson Inc</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Time do projeto:</span>
            <AvatarGroup>
              <Avatar size="sm"><AvatarFallback>SA</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback className="bg-primary/10 text-primary">JD</AvatarFallback></Avatar>
              <Avatar size="sm"><AvatarFallback className="bg-warning/15 text-warning-foreground">RG</AvatarFallback></Avatar>
              <AvatarGroupCount className="size-6 text-xs">+3</AvatarGroupCount>
            </AvatarGroup>
          </div>
        </Demo>
      </Section>

      <Section title="Dark Mode">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Light</p>
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" /></Avatar>
            <AvatarGroup><Avatar><AvatarFallback>JD</AvatarFallback></Avatar><Avatar><AvatarFallback className="bg-primary/10 text-primary">RG</AvatarFallback></Avatar></AvatarGroup>
          </div>
          <div className="dark flex items-center gap-4 rounded-lg border border-border bg-background p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dark</p>
            <Avatar size="lg"><AvatarFallback>SA</AvatarFallback><AvatarBadge className="bg-success" /></Avatar>
            <AvatarGroup><Avatar><AvatarFallback>JD</AvatarFallback></Avatar><Avatar><AvatarFallback className="bg-primary/10 text-primary">RG</AvatarFallback></Avatar></AvatarGroup>
          </div>
        </div>
      </Section>

      <AccessibilitySection
        items={[
          <>Dê <code className="font-mono text-xs">alt</code> descritivo à imagem; o fallback deve ser as iniciais do nome.</>,
          <>Use <code className="font-mono text-xs">aria-label</code> no AvatarBadge para descrever o status.</>,
          <>Não transmita informação só pela cor do status — combine com texto/tooltip quando necessário.</>,
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import { Avatar, AvatarImage, AvatarFallback, AvatarBadge, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"

<Avatar size="lg">
  <AvatarImage src={user.avatar} alt={user.name} />
  <AvatarFallback>{initials(user.name)}</AvatarFallback>
  <AvatarBadge className="bg-success" aria-label="Online" />
</Avatar>

<AvatarGroup>
  <Avatar><AvatarFallback>SA</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
  <AvatarGroupCount>+5</AvatarGroupCount>
</AvatarGroup>`}</CodeBlock>
      </Section>

      <ApiSection
        groups={[
          [
            { prop: "Avatar.size", type: '"sm" | "default" | "lg"', default: '"default"', description: "Diâmetro (24/32/40px)." },
            { prop: "AvatarImage.src / alt", type: "string", description: "Fonte da imagem e texto alternativo." },
            { prop: "AvatarFallback", type: "ReactNode", description: "Iniciais/ícone exibidos sem imagem." },
            { prop: "AvatarBadge", type: "ReactNode + className", description: "Indicador de status (cor via className)." },
            { prop: "AvatarGroup / AvatarGroupCount", type: "—", description: "Empilhamento e contador de excedente." },
          ],
        ]}
      />

      <GuidelinesSection
        dos={[
          "Sempre forneça fallback com iniciais.",
          "Use tamanhos consistentes por contexto (sm em tabelas).",
          "Descreva o status do AvatarBadge com aria-label.",
          "Use AvatarGroupCount para times grandes.",
        ]}
        donts={[
          "Não use avatares quadrados — mantenha circular.",
          "Não empilhe mais de ~5 sem contador.",
          "Não dependa só da cor do status.",
          "Não use imagens sem alt.",
        ]}
      />
      <DesignNotes
        items={[
          "Avatar do Radix com AvatarImage + AvatarFallback (iniciais quando a imagem falha); o anel after com mix-blend garante contraste da borda em qualquer fundo.",
          "Três tamanhos (sm 6 / default 8 / lg 10) propagados via data-size aos subcomponentes, inclusive fallback e badge.",
          "AvatarGroup empilha com -space-x-2 e ring-background; AvatarGroupCount resume o excedente e AvatarBadge posiciona um indicador de status.",
        ]}
      />
      <RelatedComponents
        items={[
          { name: "Badge", href: "/styleguide/components/badge", description: "Indicador de status/contagem sobreposto ou ao lado do avatar." },
          { name: "Cards", href: "/styleguide/components/cards", description: "Avatares como cabeçalho de cartões de contato e perfil." },
          { name: "Table", href: "/styleguide/components/table", description: "CellAvatar exibe avatar + nome na coluna de identidade." },
        ]}
      />
    </StyleguidePage>
  )
}
