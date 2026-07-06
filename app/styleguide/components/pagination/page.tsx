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

export default function PaginationPage() {
  const total = 8
  const [page, setPage] = React.useState(3)

  const go = (p: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    setPage(Math.min(total, Math.max(1, p)))
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Pagination</h1>
        <p className="max-w-2xl text-muted-foreground">
          Navegação entre páginas (HTML semântico). A página atual é um botão <code>outline</code> com
          <code> aria-current=&quot;page&quot;</code>; as demais são <code>ghost</code>. Reaproveita os tokens do
          Button do CRM V4.
        </p>
      </header>

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

      <Section title="Funcional (controlado)" description="Estado de página real, com elipses dinâmicas — rodapé típico de tabela de CRM.">
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

      <Section title="Uso & API">
        <div className="space-y-4">
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
          <div className="rounded-xl border border-border bg-card p-5 text-sm">
            <p className="mb-2 font-medium text-foreground">Notas</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><code>PaginationLink</code> — <code>isActive</code>, <code>size</code>, <code>asChild</code> (p/ Next Link)</li>
              <li>Use <code>onClick + preventDefault</code> para paginação client-side.</li>
              <li>Desabilite Anterior/Próxima nos limites (<code>aria-disabled</code> + pointer-events-none).</li>
              <li><code>nav aria-label</code> e <code>aria-current=&quot;page&quot;</code> para leitores de tela.</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  )
}
