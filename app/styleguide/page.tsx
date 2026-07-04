import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Terminal } from "lucide-react"

/* --- Token maps --- */

const coreColors = [
  { name: "background", varName: "--background" },
  { name: "foreground", varName: "--foreground" },
  { name: "card", varName: "--card" },
  { name: "card-foreground", varName: "--card-foreground" },
  { name: "popover", varName: "--popover" },
  { name: "popover-foreground", varName: "--popover-foreground" },
  { name: "primary", varName: "--primary" },
  { name: "primary-foreground", varName: "--primary-foreground" },
  { name: "secondary", varName: "--secondary" },
  { name: "secondary-foreground", varName: "--secondary-foreground" },
  { name: "muted", varName: "--muted" },
  { name: "muted-foreground", varName: "--muted-foreground" },
  { name: "accent", varName: "--accent" },
  { name: "accent-foreground", varName: "--accent-foreground" },
  { name: "border", varName: "--border" },
  { name: "input", varName: "--input" },
  { name: "ring", varName: "--ring" },
]

const semanticColors = [
  { name: "destructive", varName: "--destructive" },
  { name: "success", varName: "--success" },
  { name: "warning", varName: "--warning" },
  { name: "info", varName: "--info" },
]

const chartColors = [
  { name: "chart-1", varName: "--chart-1" },
  { name: "chart-2", varName: "--chart-2" },
  { name: "chart-3", varName: "--chart-3" },
  { name: "chart-4", varName: "--chart-4" },
  { name: "chart-5", varName: "--chart-5" },
]

const sidebarColors = [
  { name: "sidebar", varName: "--sidebar" },
  { name: "sidebar-foreground", varName: "--sidebar-foreground" },
  { name: "sidebar-primary", varName: "--sidebar-primary" },
  { name: "sidebar-accent", varName: "--sidebar-accent" },
  { name: "sidebar-border", varName: "--sidebar-border" },
]

const radii = [
  { name: "sm", varName: "--radius-sm" },
  { name: "md", varName: "--radius-md" },
  { name: "lg", varName: "--radius-lg" },
  { name: "xl", varName: "--radius-xl" },
  { name: "2xl", varName: "--radius-2xl" },
]

const shadows = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"]

function Swatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-16 w-full rounded-md border"
        style={{ backgroundColor: `var(${varName})` }}
      />
      <div className="text-xs font-medium">{name}</div>
      <code className="text-[10px] text-muted-foreground">{varName}</code>
    </div>
  )
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  )
}

export default function StyleguidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-12 p-8 md:p-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Design Tokens</h1>
        <p className="text-muted-foreground">
          Fundação do design system. Tokens neutros de placeholder — pronto para
          receber tokens reais via Prompt 1. Use o toggle na sidebar para
          alternar entre claro e escuro.
        </p>
      </header>

      <Section title="Cores base" description="Variáveis principais do tema.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {coreColors.map((c) => (
            <Swatch key={c.varName} {...c} />
          ))}
        </div>
      </Section>

      <Section
        title="Cores semânticas"
        description="Estados de feedback: erro, sucesso, aviso e informação."
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {semanticColors.map((c) => (
            <Swatch key={c.varName} {...c} />
          ))}
        </div>
      </Section>

      <Section title="Cores de chart">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {chartColors.map((c) => (
            <Swatch key={c.varName} {...c} />
          ))}
        </div>
      </Section>

      <Section title="Sidebar">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {sidebarColors.map((c) => (
            <Swatch key={c.varName} {...c} />
          ))}
        </div>
      </Section>

      <Section title="Tipografia">
        <div className="space-y-3">
          <div className="text-4xl font-bold">Heading 1 — 4xl bold</div>
          <div className="text-3xl font-semibold">Heading 2 — 3xl semibold</div>
          <div className="text-2xl font-semibold">Heading 3 — 2xl semibold</div>
          <div className="text-xl font-medium">Heading 4 — xl medium</div>
          <p className="text-base">
            Body — base. The quick brown fox jumps over the lazy dog. 0123456789.
          </p>
          <p className="text-sm text-muted-foreground">
            Small muted — sm. The quick brown fox jumps over the lazy dog.
          </p>
          <code className="font-mono text-sm">Mono — font-mono example()</code>
        </div>
      </Section>

      <Section title="Border radius">
        <div className="flex flex-wrap items-end gap-6">
          {radii.map((r) => (
            <div key={r.varName} className="flex flex-col items-center gap-2">
              <div
                className="size-20 border bg-primary"
                style={{ borderRadius: `var(${r.varName})` }}
              />
              <code className="text-xs text-muted-foreground">{r.name}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex flex-wrap gap-6">
          {shadows.map((s) => (
            <div key={s} className="flex flex-col items-center gap-2">
              <div className={`size-20 rounded-lg bg-card ${s}`} />
              <code className="text-xs text-muted-foreground">{s}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Componentes"
        description="Componentes demo usando os tokens acima."
      >
        <div className="space-y-8">
          {/* Buttons */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Button
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Badge
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Card */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Card</h3>
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Card title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Conteúdo do card usando os tokens de superfície e texto.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button size="sm">Action</Button>
                <Button size="sm" variant="outline">
                  Cancel
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Alert */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Alert
            </h3>
            <Alert className="max-w-xl">
              <Terminal className="size-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                Você pode adicionar componentes ao styleguide com o Prompt 2.
              </AlertDescription>
            </Alert>
          </div>

          {/* Radio Group */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">
              Radio Group
            </h3>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="default" id="r1" />
                <Label htmlFor="r1">Default</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">Comfortable</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">Compact</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </Section>
    </div>
  )
}
