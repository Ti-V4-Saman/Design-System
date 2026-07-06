"use client"

import * as React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  AccessibilitySection,
  ApiSection,
  CodeBlock,
  ComponentHeader,
  DarkModeSection,
  Demo,
  GuidelinesSection,
  Section,
  DesignNotes,
  RelatedComponents,
  StyleguidePage,
} from "@/app/styleguide/_components"

export default function PaginationPage() {
  const total = 8
  const [page, setPage] = React.useState(3)

  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.min(total, Math.max(1, p)))
  }

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Pagination"
        description={
          <>
            Navegação entre páginas (HTML semântico). A página atual é um botão <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">outline</code> com{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">aria-current=&quot;page&quot;</code>; as demais são <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">ghost</code>.
            Reaproveita os tokens do Button do CRM V4.
          </>
        }
      />

      <Section title="Padrão" description="Anterior/Próxima com números e elipse para faixas omitidas.">
        <Demo>
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationLink href="#">8</PaginationLink></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </Demo>
      </Section>

      <Section title="Composição — funcional (controlado)" description="Estado de página real, com elipses dinâmicas — rodapé típico de tabela de CRM.">
        <Demo>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Mostrando página {page} de {total} · 240 contatos</span>
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={go(page - 1)} aria-disabled={page === 1} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                {page > 2 && (
                  <PaginationItem><PaginationLink href="#" onClick={go(1)}>1</PaginationLink></PaginationItem>
                )}
                {page > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {[page - 1, page, page + 1].filter((p) => p >= 1 && p <= total).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink href="#" isActive={p === page} onClick={go(p)}>{p}</PaginationLink>
                  </PaginationItem>
                ))}
                {page < total - 2 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                {page < total - 1 && (
                  <PaginationItem><PaginationLink href="#" onClick={go(total)}>{total}</PaginationLink></PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext href="#" onClick={go(page + 1)} aria-disabled={page === total} className={page === total ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Demo>
      </Section>

      <AccessibilitySection
        items={[
          <>O <code className="font-mono text-xs">nav</code> raiz tem <code className="font-mono text-xs">aria-label=&quot;paginação&quot;</code> e a página atual recebe <code className="font-mono text-xs">aria-current=&quot;page&quot;</code>.</>,
          <>Anterior/Próxima têm <code className="font-mono text-xs">aria-label</code> próprios; a elipse é <code className="font-mono text-xs">aria-hidden</code> com texto sr-only.</>,
          <>Nos limites, desabilite Anterior/Próxima com <code className="font-mono text-xs">aria-disabled</code> + <code className="font-mono text-xs">pointer-events-none</code>.</>,
        ]}
      />

      <DarkModeSection description="Os mesmos botões de página nos dois temas — variantes outline/ghost do Button por token.">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </DarkModeSection>

      <ApiSection
        groups={[
          [
            { prop: "PaginationLink.isActive", type: "boolean", default: "false", description: "Marca a página atual (variante outline + aria-current)." },
            { prop: "PaginationLink.size", type: 'Button["size"]', default: '"icon"', description: "Tamanho herdado do buttonVariants." },
            { prop: "PaginationLink.asChild", type: "boolean", default: "false", description: "Renderiza como filho — ex.: Next Link." },
            { prop: "PaginationPrevious / PaginationNext", type: "React.ComponentProps<PaginationLink>", description: "Links com chevron e rótulo (Anterior/Próxima)." },
            { prop: "PaginationEllipsis", type: "React.ComponentProps<'span'>", description: "Marca faixas de páginas omitidas." },
          ],
        ]}
      />

      <Section title="Código">
        <CodeBlock>{`import {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem><PaginationPrevious href="?page=1" /></PaginationItem>
    <PaginationItem><PaginationLink href="?page=2" isActive>2</PaginationLink></PaginationItem>
    <PaginationItem><PaginationEllipsis /></PaginationItem>
    <PaginationItem><PaginationNext href="?page=3" /></PaginationItem>
  </PaginationContent>
</Pagination>`}</CodeBlock>
      </Section>

      <GuidelinesSection
        dos={[
          "Use onClick + preventDefault para paginação client-side.",
          "Desabilite Anterior/Próxima nos limites da faixa.",
          "Use elipses para colapsar faixas longas de páginas.",
          "Passe asChild para integrar com o Next Link.",
        ]}
        donts={[
          "Não exiba dezenas de números — colapse com elipses.",
          "Não deixe a página atual sem aria-current=\"page\".",
          "Não esconda Anterior/Próxima; apenas desabilite-os nos limites.",
        ]}
      />

      <DesignNotes
        items={[
          "Não é primitivo Radix: markup semântico <nav aria-label=\"paginação\">/<ul>. A página atual carrega aria-current=\"page\".",
          "Os links reusam os tokens de botão: página atual como outline, demais como ghost; Anterior/Próxima recebem chevrons e escondem o rótulo no mobile (hidden sm:block).",
          "A elipse (PaginationEllipsis) marca faixas omitidas e é aria-hidden, com sr-only \"Mais páginas\".",
          "asChild no PaginationLink permite integrar com o Link do Next mantendo o estilo.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Table",
            href: "/styleguide/components/table",
            description: "A paginação percorre conjuntos de dados normalmente exibidos em tabela.",
          },
          {
            name: "Button",
            href: "/styleguide/components/button",
            description: "Os links reaproveitam as variantes e tokens de botão (outline/ghost).",
          },
          {
            name: "Breadcrumb",
            href: "/styleguide/components/breadcrumb",
            description: "Outro padrão de navegação semântico (nav) baseado em tokens.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
