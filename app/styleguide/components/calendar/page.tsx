"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CRMCalendar } from "@/components/calendar"
import { CRMDatePicker } from "@/components/date-picker"
import { CRMDateRangePicker } from "@/components/date-range-picker"
import type { CalendarEvent } from "@/components/calendar/types"
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

// Helper: date at specific hour in current month
function d(day: number, startHour: number, endHour: number): { start: Date; end: Date } {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth()
  return {
    start: new Date(y, m, day, startHour, 0),
    end: new Date(y, m, day, endHour, 0),
  }
}

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "1",  title: "Reunião com João Silva",            ...d(5,  6, 7),   color: "destructive", locked: true },
  { id: "2",  title: "Celebração de Aniversário da Empresa", ...d(6,  1, 2),   color: "success",     locked: true },
  { id: "3",  title: "Simpósio de Sustentabilidade",      ...d(3, 10, 11),  color: "purple",      locked: true },
  { id: "4",  title: "Painel de Discussão do Setor",      ...d(10,19, 21),  color: "info",        locked: true },
  { id: "5",  title: "Cúpula de Liderança",               ...d(19, 5, 6),   color: "success",     locked: true },
  { id: "6",  title: "Simpósio de Diversidade Cultural",  ...d(20, 6, 7),   color: "muted",       locked: true },
  { id: "7",  title: "Workshop de Equilíbrio Trabalho-Vida", ...d(25, 8, 8),   color: "info",        locked: true },
  { id: "8",  title: "Encontro de Networking",            ...d(26,14,14),   color: "primary",     locked: true },
  { id: "9",  title: "Cúpula de Marketing de Influência", ...d(27, 3, 4),   color: "destructive", locked: true },
  { id: "10", title: "Encontro com Fornecedores",         ...d(27,16,17),   color: "destructive", locked: true },
  { id: "11", title: "Feira de Capacitação Profissional", ...d(28, 6, 8),   color: "warning",     locked: true },
  { id: "12", title: "Fórum Mulheres na Liderança",       ...d(28, 0, 0),   color: "primary",     locked: true },
  { id: "13", title: "Workshop de Treinamento de Vendas", ...d(15, 9, 11),  color: "success",     locked: true },
  { id: "14", title: "Dia de Valorização do Cliente",     ...d(22, 9, 10),  color: "muted",       locked: true },
  { id: "15", title: "Feira de Saúde e Bem-estar",        ...d(2,  8, 10),  color: "warning",     locked: true },
]

export default function CalendarPage() {
  const [singleDate, setSingleDate] = React.useState<Date | undefined>()
  const [dateRange, setDateRange] = React.useState<{ from: Date | undefined; to?: Date | undefined } | undefined>()

  return (
    <StyleguidePage>
      <ComponentHeader
        title="Calendar"
        description="Calendário de eventos em página cheia (mês · semana · dia · lista) mais seletores de data e de intervalo de datas em popover para o Design System CRM V4. As cores dos eventos mapeiam para o conjunto de tokens semânticos compartilhado."
      />

      <Section
        title="Visualizações e Seletores"
        description="Alterne entre o calendário completo de eventos, o seletor de data única e o seletor de intervalo de datas."
      >
        <Tabs defaultValue="full-calendar">
          <TabsList className="mb-6">
            <TabsTrigger value="full-calendar">Calendário Completo</TabsTrigger>
            <TabsTrigger value="date-picker">Seletor de Data</TabsTrigger>
            <TabsTrigger value="date-range">Intervalo de Datas</TabsTrigger>
          </TabsList>

          {/* Full Calendar */}
          <TabsContent value="full-calendar">
            <div className="h-[780px]">
              <CRMCalendar
                events={MOCK_EVENTS}
                defaultView="month"
                onEventClick={(e) => console.log("event clicked", e.title)}
                onDateClick={(d) => console.log("date clicked", d)}
                onAddEvent={() => console.log("add event")}
              />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Week view preview */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Visualização de Semana</h3>
                <div className="h-[400px] border border-border rounded-xl overflow-hidden">
                  <CRMCalendar events={MOCK_EVENTS} defaultView="week" />
                </div>
              </div>

              {/* List view preview */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Visualização de Lista</h3>
                <div className="h-[400px] border border-border rounded-xl overflow-hidden">
                  <CRMCalendar events={MOCK_EVENTS} defaultView="list" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Date Picker */}
          <TabsContent value="date-picker">
            <div className="max-w-sm space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Padrão</p>
                <CRMDatePicker value={singleDate} onChange={setSingleDate} />
                {singleDate && (
                  <p className="text-xs text-muted-foreground">
                    Selecionado: {singleDate.toLocaleDateString()}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Com placeholder personalizado</p>
                <CRMDatePicker placeholder="Selecione a data de fechamento" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Desabilitado</p>
                <CRMDatePicker disabled />
              </div>
            </div>
          </TabsContent>

          {/* Date Range */}
          <TabsContent value="date-range">
            <div className="max-w-sm space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Padrão</p>
                <CRMDateRangePicker value={dateRange} onChange={setDateRange} />
                {dateRange?.from && (
                  <p className="text-xs text-muted-foreground">
                    De: {dateRange.from.toLocaleDateString()}
                    {dateRange.to && ` · Até: ${dateRange.to.toLocaleDateString()}`}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Com placeholder</p>
                <CRMDateRangePicker placeholder="Selecione o período do contrato" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Desabilitado</p>
                <CRMDateRangePicker disabled />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      <AccessibilitySection
        title="Acessibilidade"
        items={[
          <>Os seletores são construídos sobre o Radix Popover + a grade do react-day-picker: o botão de gatilho alterna com <code className="font-mono text-xs">Enter</code>/<code className="font-mono text-xs">Espaço</code>, e o foco entra no calendário ao abrir.</>,
          <>Dentro da grade do calendário, as setas navegam entre os dias, <code className="font-mono text-xs">Esc</code> fecha o popover e devolve o foco ao gatilho.</>,
          <>Seletores desabilitados definem o atributo <code className="font-mono text-xs">disabled</code> subjacente, removendo-os da ordem de tabulação.</>,
          <>As cores dos eventos são decorativas — o título do evento sempre carrega o significado, então a informação nunca é transmitida apenas pela cor.</>,
          <>O cabeçalho do calendário expõe botões reais para anterior/próximo/hoje e troca de visualização, todos acessíveis por teclado.</>,
        ]}
      />

      <DarkModeSection description="Seletores e cores de eventos em ambos os temas — superfícies, bordas e cores semânticas de eventos são todas resolvidas a partir de tokens.">
        <div className="space-y-4">
          <CRMDatePicker placeholder="Escolha uma data" />
          <CRMDateRangePicker placeholder="Escolha um intervalo" />
        </div>
      </DarkModeSection>

      <Section title="Code">
        <CodeBlock>{`import { CRMCalendar } from "@/components/calendar"
import { CRMDatePicker } from "@/components/date-picker"
import { CRMDateRangePicker } from "@/components/date-range-picker"
import type { CalendarEvent } from "@/components/calendar/types"

const events: CalendarEvent[] = [
  { id: "1", title: "Kickoff", start, end, color: "primary" },
]

// Calendário completo — visualização padrão + callbacks de evento/data
<CRMCalendar events={events} defaultView="month"
  onEventClick={(e) => open(e)} onAddEvent={() => create()} />

// Seletor de data única (controlado)
<CRMDatePicker value={date} onChange={setDate} placeholder="Escolha uma data" />

// Seletor de intervalo de datas (controlado)
<CRMDateRangePicker value={range} onChange={setRange} />`}</CodeBlock>
      </Section>

      <ApiSection
        title="API / Props"
        groups={[
          [
            { prop: "CRMCalendar.events", type: "CalendarEvent[]", default: "[]", description: "Eventos a renderizar em todas as visualizações." },
            { prop: "CRMCalendar.defaultView", type: '"month" | "week" | "day" | "list"', default: '"month"', description: "Visualização inicial; alternável no cabeçalho." },
            { prop: "CRMCalendar.defaultDate", type: "Date", default: "new Date()", description: "Data em que o calendário se centraliza inicialmente." },
            { prop: "CRMCalendar.onEventClick", type: "(event: CalendarEvent) => void", description: "Disparado ao clicar em uma pílula de evento." },
            { prop: "CRMCalendar.onDateClick", type: "(date: Date) => void", description: "Disparado ao clicar em uma célula de dia (visualização de mês)." },
            { prop: "CRMCalendar.onAddEvent", type: "(date?: Date) => void", description: "Disparado pela ação de adicionar evento do cabeçalho." },
          ],
          [
            { prop: "CalendarEvent", type: "{ id, title, start: Date, end: Date, color?, locked? }", description: "Formato do evento; color é um EventColorVariant." },
            { prop: "EventColorVariant", type: '"primary" | "success" | "warning" | "destructive" | "info" | "muted" | "purple"', default: '"muted"', description: "Cor semântica da pílula do evento." },
          ],
          [
            { prop: "CRMDatePicker", type: "{ value?: Date, onChange?, placeholder?, disabled? }", description: "Seletor de data única em popover (mode=\"single\")." },
            { prop: "CRMDateRangePicker", type: "{ value?: DateRange, onChange?, placeholder?, disabled? }", description: "Seletor de intervalo de dois meses em popover (mode=\"range\")." },
          ],
        ]}
      />

      <GuidelinesSection
        title="Boas Práticas"
        dos={[
          "Dê ao CRMCalendar completo um container de altura fixa — ele preenche o pai (h-full).",
          "Use as variantes de cor de evento de forma semântica (destructive para conflitos, success para confirmados).",
          "Controle os seletores com value/onChange quando a data alimenta um formulário.",
          "Use o seletor de intervalo de datas para períodos de contrato e janelas de relatório.",
        ]}
        donts={[
          "Não renderize o CRMCalendar sem altura — ele vai colapsar.",
          "Não dependa apenas da cor do evento para transmitir o status; mantenha um título descritivo.",
          "Não reimplemente um <input type=\"date\"> puro — use os seletores do CRM para superfícies consistentes com os tokens.",
          "Não codifique cores de evento fora do conjunto EventColorVariant.",
        ]}
      />

      <DesignNotes
        items={[
          "As quatro views (month, week, day, list) compartilham um único cabeçalho; o passo de navegação se adapta à view ativa — mês/lista avançam meses, semana avança semanas, dia avança dias.",
          <>
            <code className="font-mono text-xs">defaultView</code> e{" "}
            <code className="font-mono text-xs">defaultDate</code> apenas semeiam
            o estado interno — a navegação depois é controlada pelo próprio
            componente.
          </>,
          <>
            A cor de cada evento vem do conjunto fixo{" "}
            <code className="font-mono text-xs">EventColorVariant</code>{" "}
            (primary, success, warning, destructive, info, muted, purple),
            sempre atrelado a tokens; <code className="font-mono text-xs">locked</code>{" "}
            sinaliza eventos não editáveis.
          </>,
          "O container precisa de altura explícita (h-full): sem ela o layout flex colapsa e o calendário some.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Field",
            href: "/styleguide/components/field",
            description: "Envolve os date pickers com label, descrição e erro.",
          },
          {
            name: "Tabs",
            href: "/styleguide/components/tabs",
            description: "Mesmo padrão de alternância usado entre as views.",
          },
          {
            name: "Badge",
            href: "/styleguide/components/badge",
            description: "Rótulos de status na mesma paleta dos event pills.",
          },
          {
            name: "Button",
            href: "/styleguide/components/button",
            description: "Base dos controles de navegação e do gatilho dos pickers.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
