"use client"

import * as React from "react"

import {
  Attachment,
  AttachmentActions,
  AttachmentBody,
  AttachmentDropzone,
  AttachmentEmpty,
  AttachmentItem,
  AttachmentList,
  AttachmentListItem,
  AttachmentMeta,
  AttachmentMetaDot,
  AttachmentName,
  AttachmentThumb,
  formatFileSize,
  type AttachmentStatus,
} from "@/components/attachment"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Paperclip, Plus } from "lucide-react"
import {
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
 * Shared demo data
 * -----------------------------------------------------------------------------------------------*/

const ACCEPT = ".pdf,.docx,.xlsx,.png,.jpg,.zip"
const MAX_SIZE = 10 * 1024 * 1024

// Miniatura fake (conteúdo de imagem, não é cor de UI) para demonstrar preview.
const photoThumb =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96'>" +
      "<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>" +
      "<stop offset='0' stop-color='#059669'/><stop offset='1' stop-color='#34d399'/>" +
      "</linearGradient></defs><rect width='96' height='96' fill='url(#g)'/></svg>"
  )

type DemoFile = {
  id: string
  name: string
  size: number
  type?: string
  status: AttachmentStatus
  progress: number
  previewUrl?: string
}

let idSeq = 0
const nextId = () => `f${++idSeq}`

/* -------------------------------------------------------------------------------------------------
 * Interactive: single upload
 * -----------------------------------------------------------------------------------------------*/

function SingleUploadDemo() {
  const [file, setFile] = React.useState<DemoFile | null>(null)
  const timers = React.useRef<Record<string, ReturnType<typeof setInterval>>>({})

  React.useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearInterval)
  }, [])

  const simulate = (item: DemoFile) => {
    clearInterval(timers.current[item.id])
    timers.current[item.id] = setInterval(() => {
      setFile((prev) => {
        if (!prev || prev.id !== item.id) return prev
        const next = Math.min(100, prev.progress + 12)
        if (next >= 100) {
          clearInterval(timers.current[item.id])
          return { ...prev, progress: 100, status: "done" }
        }
        return { ...prev, progress: next }
      })
    }, 350)
  }

  const onFiles = (files: File[]) => {
    const f = files[0]
    const item: DemoFile = {
      id: nextId(),
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading",
      progress: 0,
      previewUrl: f.type.startsWith("image/")
        ? URL.createObjectURL(f)
        : undefined,
    }
    setFile(item)
    simulate(item)
  }

  return (
    <Demo className="space-y-3">
      {!file && (
        <AttachmentDropzone
          onFiles={onFiles}
          accept={ACCEPT}
          maxSize={MAX_SIZE}
        />
      )}
      {file && (
        <AttachmentItem
          name={file.name}
          size={file.size}
          type={file.type}
          status={file.status}
          progress={file.progress}
          previewUrl={file.previewUrl}
          description={file.status === "done" ? "Enviado agora" : undefined}
          onCancel={() => setFile(null)}
          onRemove={() => setFile(null)}
          onDownload={() => {}}
        />
      )}
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Interactive: multiple upload + list
 * -----------------------------------------------------------------------------------------------*/

function MultipleUploadDemo() {
  const [files, setFiles] = React.useState<DemoFile[]>([])
  const timers = React.useRef<Record<string, ReturnType<typeof setInterval>>>({})

  React.useEffect(() => {
    const t = timers.current
    return () => Object.values(t).forEach(clearInterval)
  }, [])

  const simulate = (id: string, step: number) => {
    timers.current[id] = setInterval(() => {
      setFiles((prev) =>
        prev.map((it) => {
          if (it.id !== id) return it
          const next = Math.min(100, it.progress + step)
          if (next >= 100) {
            clearInterval(timers.current[id])
            return { ...it, progress: 100, status: "done" as const }
          }
          return { ...it, progress: next }
        })
      )
    }, 320)
  }

  const onFiles = (incoming: File[]) => {
    const items: DemoFile[] = incoming.map((f) => ({
      id: nextId(),
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading",
      progress: 0,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }))
    setFiles((prev) => [...prev, ...items])
    items.forEach((it, i) => simulate(it.id, 10 + i * 4))
  }

  const remove = (id: string) => {
    clearInterval(timers.current[id])
    setFiles((prev) => prev.filter((it) => it.id !== id))
  }

  return (
    <Demo className="space-y-3">
      <AttachmentDropzone
        multiple
        onFiles={onFiles}
        accept={ACCEPT}
        maxSize={MAX_SIZE}
        title="Arraste vários arquivos ou clique para enviar"
      />
      {files.length > 0 && (
        <AttachmentList>
          {files.map((f) => (
            <AttachmentListItem key={f.id}>
              <AttachmentItem
                name={f.name}
                size={f.size}
                type={f.type}
                status={f.status}
                progress={f.progress}
                previewUrl={f.previewUrl}
                onCancel={() => remove(f.id)}
                onRemove={() => remove(f.id)}
                onDownload={() => {}}
              />
            </AttachmentListItem>
          ))}
        </AttachmentList>
      )}
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Interactive: live states (uploading loop / error / done)
 * -----------------------------------------------------------------------------------------------*/

function LiveUploadingItem() {
  const [progress, setProgress] = React.useState(15)
  React.useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 5))
    }, 400)
    return () => clearInterval(id)
  }, [])
  return (
    <AttachmentItem
      name="relatorio-trimestral.pdf"
      size={2_400_000}
      status="uploading"
      progress={progress}
      onCancel={() => {}}
    />
  )
}

function StatesDemo() {
  const [retried, setRetried] = React.useState(false)
  return (
    <Demo>
      <AttachmentList>
        <AttachmentListItem>
          <AttachmentItem
            name="contrato-assinado.pdf"
            size={840_000}
            status="done"
            description="Enviado por Ana Souza · há 2h"
            onDownload={() => {}}
            onRemove={() => {}}
          />
        </AttachmentListItem>
        <AttachmentListItem>
          <LiveUploadingItem />
        </AttachmentListItem>
        <AttachmentListItem>
          <AttachmentItem
            name="planilha-custos.xlsx"
            size={1_200_000}
            status={retried ? "done" : "error"}
            errorMessage="Falha no envio — conexão perdida."
            description={retried ? "Reenviado agora" : undefined}
            onRetry={() => setRetried(true)}
            onRemove={() => setRetried(false)}
            onDownload={() => {}}
          />
        </AttachmentListItem>
      </AttachmentList>
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * File types grid
 * -----------------------------------------------------------------------------------------------*/

const TYPE_SAMPLES = [
  { name: "proposta-comercial.pdf", size: 1_800_000 },
  { name: "briefing-cliente.docx", size: 320_000 },
  { name: "forecast-2026.xlsx", size: 540_000 },
  { name: "leads-export.csv", size: 96_000 },
  { name: "apresentacao-kickoff.pptx", size: 5_600_000 },
  { name: "logo-cliente.png", size: 210_000 },
  { name: "foto-produto.jpg", size: 1_100_000 },
  { name: "assets-marca.zip", size: 8_900_000 },
  { name: "notas.txt", size: 4_200 },
]

function TypesDemo() {
  return (
    <Demo>
      <div className="grid gap-2 sm:grid-cols-2">
        {TYPE_SAMPLES.map((f) => (
          <AttachmentItem
            key={f.name}
            name={f.name}
            size={f.size}
            status="done"
            onDownload={() => {}}
          />
        ))}
      </div>
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Preview
 * -----------------------------------------------------------------------------------------------*/

function PreviewDemo() {
  const [open, setOpen] = React.useState<string | null>(null)
  return (
    <Demo className="space-y-3">
      <AttachmentList>
        <AttachmentListItem>
          <AttachmentItem
            name="mockup-home.png"
            size={2_100_000}
            type="image/png"
            status="done"
            previewUrl={photoThumb}
            onPreview={() => setOpen("mockup-home.png")}
            onDownload={() => {}}
            onRemove={() => {}}
          />
        </AttachmentListItem>
        <AttachmentListItem>
          <AttachmentItem
            name="banner-campanha.jpg"
            size={3_400_000}
            type="image/jpeg"
            status="done"
            previewUrl={photoThumb}
            onPreview={() => setOpen("banner-campanha.jpg")}
            onDownload={() => {}}
            onRemove={() => {}}
          />
        </AttachmentListItem>
      </AttachmentList>
      {open && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium text-foreground">onPreview</span> disparado
          para <code className="font-mono">{open}</code> — abra um Dialog/Lightbox
          do sistema aqui.
        </p>
      )}
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Empty state
 * -----------------------------------------------------------------------------------------------*/

function EmptyDemo() {
  const [files, setFiles] = React.useState<DemoFile[]>([])
  const add = () =>
    setFiles([
      {
        id: nextId(),
        name: "documento-adicionado.pdf",
        size: 640_000,
        status: "done",
        progress: 100,
      },
    ])
  return (
    <Demo className="space-y-3">
      {files.length === 0 ? (
        <AttachmentEmpty>
          <Button size="sm" onClick={add}>
            <Plus data-icon="inline-start" />
            Adicionar anexo
          </Button>
        </AttachmentEmpty>
      ) : (
        <AttachmentList>
          {files.map((f) => (
            <AttachmentListItem key={f.id}>
              <AttachmentItem
                name={f.name}
                size={f.size}
                status="done"
                onDownload={() => {}}
                onRemove={() => setFiles([])}
              />
            </AttachmentListItem>
          ))}
        </AttachmentList>
      )}
    </Demo>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Props documentation
 * -----------------------------------------------------------------------------------------------*/

const ITEM_PROPS: ApiRow[] = [
  { prop: "name", type: "string", description: "Nome do arquivo (com extensão). Obrigatório." },
  { prop: "size", type: "number", description: "Tamanho em bytes — formatado automaticamente." },
  { prop: "type", type: "string", description: "Mime type; refina o ícone quando o nome não tem extensão." },
  { prop: "status", type: `"idle" | "uploading" | "done" | "error"`, description: "Estado do anexo." },
  { prop: "progress", type: "number", description: "Progresso 0–100 (usado em uploading)." },
  { prop: "errorMessage", type: "string", description: "Mensagem exibida em status error." },
  { prop: "previewUrl", type: "string", description: "Miniatura para imagens; substitui o glyph." },
  { prop: "description", type: "ReactNode", description: "Metadado secundário (autor, data…)." },
  { prop: "variant", type: `"outline" | "muted" | "ghost"`, description: "Superfície do item." },
  { prop: "disabled", type: "boolean", description: "Desabilita o item inteiro." },
  { prop: "readOnly", type: "boolean", description: "Oculta remover/cancelar/reenviar; mantém download." },
  { prop: "onDownload / onRemove / onRetry / onCancel / onPreview", type: "() => void", description: "Callbacks de ação." },
]

const DROPZONE_PROPS: ApiRow[] = [
  { prop: "onFiles", type: "(files: File[]) => void", description: "Recebe os arquivos selecionados ou soltos." },
  { prop: "multiple", type: "boolean", description: "Permite selecionar vários arquivos." },
  { prop: "accept", type: "string", description: 'Filtro do input, ex.: ".pdf,image/*".' },
  { prop: "maxSize", type: "number", description: "Tamanho máx. em bytes (exibido na dica)." },
  { prop: "disabled", type: "boolean", description: "Bloqueia toda a interação." },
  { prop: "readOnly", type: "boolean", description: "Impede o envio, sem aparência de erro." },
  { prop: "title / hint / icon", type: "ReactNode / ElementType", description: "Personalização do conteúdo." },
]

/* -------------------------------------------------------------------------------------------------
 * Page
 * -----------------------------------------------------------------------------------------------*/

export default function AttachmentPage() {
  return (
    <StyleguidePage>
      <ComponentHeader
        title="Attachment"
        description="O padrão oficial de anexos do CRM V4. Envio único ou múltiplo, lista de arquivos, estados de upload, preview de imagens, download e remoção — tudo construído sobre os tokens do design system e pronto para compor com Cards, Forms, Tables e Dialogs."
      >
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            <Paperclip data-icon="inline-start" />
            Data display · Input
          </Badge>
        </div>
      </ComponentHeader>

      {/* Overview / anatomy */}
      <Section
        title="Visão geral"
        description="Cada anexo é um tile de tipo derivado de tokens semânticos, o nome do arquivo, metadados e as ações contextuais ao estado."
      >
        <Demo>
          <AttachmentList>
            <AttachmentListItem>
              <AttachmentItem
                name="proposta-comercial.pdf"
                size={1_800_000}
                status="done"
                description="Enviado por Ana Souza · há 2h"
                onDownload={() => {}}
                onRemove={() => {}}
              />
            </AttachmentListItem>
          </AttachmentList>
        </Demo>
        <CodeBlock>{`import { AttachmentItem } from "@/components/attachment"

<AttachmentItem
  name="proposta-comercial.pdf"
  size={1_800_000}
  status="done"
  description="Enviado por Ana Souza · há 2h"
  onDownload={handleDownload}
  onRemove={handleRemove}
/>`}</CodeBlock>
      </Section>

      {/* Single upload */}
      <Section
        title="Upload de arquivo único"
        description="A Dropzone recebe um arquivo, mostra o progresso e converte-se no item concluído. Solte um arquivo ou clique para selecionar."
      >
        <SingleUploadDemo />
      </Section>

      {/* Multiple upload */}
      <Section
        title="Upload múltiplo"
        description="Vários arquivos entram de uma vez e são enviados em paralelo, cada um com seu próprio progresso."
      >
        <MultipleUploadDemo />
        <CodeBlock>{`<AttachmentDropzone multiple onFiles={handleFiles} accept=".pdf,.png" maxSize={10 * 1024 * 1024} />

<AttachmentList>
  {files.map((f) => (
    <AttachmentListItem key={f.id}>
      <AttachmentItem {...f} onRemove={() => remove(f.id)} />
    </AttachmentListItem>
  ))}
</AttachmentList>`}</CodeBlock>
      </Section>

      {/* Upload states */}
      <Section
        title="Estados de upload"
        description="Concluído (download + remover), enviando (progresso + cancelar) e erro (mensagem + reenviar). Clique em reenviar para ver a transição."
      >
        <StatesDemo />
      </Section>

      {/* File types */}
      <Section
        title="Tipos de arquivo"
        description="O tile e o tom são inferidos do nome ou do mime type: PDF (vermelho), planilhas (verde), documentos e imagens (azul), apresentações e arquivos compactados (âmbar), e um neutro para os demais."
      >
        <TypesDemo />
      </Section>

      {/* Preview */}
      <Section
        title="Preview"
        description="Imagens com previewUrl exibem a miniatura no lugar do glyph; o nome vira um gatilho para abrir um Dialog/Lightbox."
      >
        <PreviewDemo />
      </Section>

      {/* Empty state */}
      <Section
        title="Empty state"
        description="Quando não há anexos, um convite claro para a primeira ação."
      >
        <EmptyDemo />
      </Section>

      {/* Drag & drop */}
      <Section
        title="Drag & Drop"
        description="A Dropzone é o alvo de arraste; ao passar um arquivo por cima, a borda e o ícone reagem. Também é totalmente acionável por teclado (Tab + Enter)."
      >
        <Demo>
          <AttachmentDropzone
            multiple
            accept={ACCEPT}
            maxSize={MAX_SIZE}
            onFiles={() => {}}
          />
        </Demo>
      </Section>

      {/* Variants */}
      <Section
        title="Variantes de superfície"
        description="Adapte o item à superfície onde ele vive: outline (padrão), muted (dentro de Cards) ou ghost (listas densas em Tables)."
      >
        <Demo className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">outline</p>
            <AttachmentItem
              variant="outline"
              name="documento.pdf"
              size={640_000}
              status="done"
              onDownload={() => {}}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">muted</p>
            <AttachmentItem
              variant="muted"
              name="documento.pdf"
              size={640_000}
              status="done"
              onDownload={() => {}}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">ghost</p>
            <AttachmentItem
              variant="ghost"
              name="documento.pdf"
              size={640_000}
              status="done"
              onDownload={() => {}}
            />
          </div>
        </Demo>
      </Section>

      {/* Disabled & readonly */}
      <Section
        title="Disabled e Read-only"
        description="Disabled esmaece e bloqueia o item. Read-only preserva o download e o preview, mas remove as ações de edição (remover, cancelar, reenviar) e desativa o envio."
      >
        <Demo className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">disabled</p>
            <AttachmentItem
              name="arquivo-bloqueado.pdf"
              size={640_000}
              status="done"
              disabled
              onDownload={() => {}}
              onRemove={() => {}}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">read-only</p>
            <AttachmentItem
              name="anexo-do-sistema.xlsx"
              size={1_200_000}
              status="done"
              readOnly
              description="Somente leitura"
              onDownload={() => {}}
              onRemove={() => {}}
            />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              dropzone disabled
            </p>
            <AttachmentDropzone disabled onFiles={() => {}} accept={ACCEPT} />
          </div>
        </Demo>
      </Section>

      {/* Dark mode */}
      <Section
        title="Dark mode"
        description="Todos os tons vêm de tokens com pares -foreground, garantindo contraste nos dois temas. Comparação lado a lado (o painel direito é forçado em dark)."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-5">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Light</p>
            <AttachmentItem
              name="forecast-2026.xlsx"
              size={540_000}
              status="done"
              onDownload={() => {}}
              onRemove={() => {}}
            />
          </div>
          <div className="dark rounded-xl border border-border bg-card p-5 text-card-foreground">
            <p className="mb-3 text-xs font-medium text-muted-foreground">Dark</p>
            <AttachmentItem
              name="forecast-2026.xlsx"
              size={540_000}
              status="done"
              onDownload={() => {}}
              onRemove={() => {}}
            />
          </div>
        </div>
      </Section>

      {/* Composition with compound API */}
      <Section
        title="Composição (API de baixo nível)"
        description="Para casos fora do padrão, monte o anexo peça a peça. Todas as partes expõem data-slot e aceitam className."
      >
        <Demo>
          <Attachment variant="outline" status="done">
            <AttachmentThumb name="contrato.pdf" />
            <AttachmentBody>
              <AttachmentName>contrato-parceria-2026.pdf</AttachmentName>
              <AttachmentMeta>
                <span>PDF</span>
                <AttachmentMetaDot />
                <span>{formatFileSize(920_000)}</span>
                <AttachmentMetaDot />
                <Badge variant="outline" className="h-4 px-1.5 text-[10px]">
                  Assinado
                </Badge>
              </AttachmentMeta>
            </AttachmentBody>
            <AttachmentActions>
              <Button size="icon-sm" variant="ghost" aria-label="Baixar">
                <Download />
              </Button>
            </AttachmentActions>
          </Attachment>
        </Demo>
        <CodeBlock>{`<Attachment variant="outline" status="done">
  <AttachmentThumb name="contrato.pdf" />
  <AttachmentBody>
    <AttachmentName>contrato-parceria-2026.pdf</AttachmentName>
    <AttachmentMeta>
      <span>PDF</span>
      <AttachmentMetaDot />
      <span>{formatFileSize(920_000)}</span>
    </AttachmentMeta>
  </AttachmentBody>
  <AttachmentActions>
    <Button size="icon-sm" variant="ghost" aria-label="Baixar">
      <Download />
    </Button>
  </AttachmentActions>
</Attachment>`}</CodeBlock>
      </Section>

      {/* Props */}
      <Section
        title="Props — AttachmentItem"
        description="A composição de alto nível usada na maioria dos módulos."
      >
        <ApiTable rows={ITEM_PROPS} />
      </Section>

      <Section
        title="Props — AttachmentDropzone"
        description="A área de envio com drag & drop e seleção por clique."
      >
        <ApiTable rows={DROPZONE_PROPS} />
      </Section>

      {/* Accessibility */}
      <Section
        title="Acessibilidade"
        description="Garantias de acessibilidade embutidas no componente."
      >
        <div className="rounded-lg border bg-card p-5">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Teclado:</span> a
              Dropzone é um <code className="font-mono text-xs">button</code>{" "}
              nativo — foco com Tab, abre o seletor com Enter/Espaço.
            </li>
            <li>
              <span className="font-medium text-foreground">Rótulos:</span> cada
              ação por ícone tem <code className="font-mono text-xs">aria-label</code>{" "}
              descritivo (ex.: “Remover contrato.pdf”).
            </li>
            <li>
              <span className="font-medium text-foreground">Progresso:</span> a
              barra expõe <code className="font-mono text-xs">role=&quot;progressbar&quot;</code>{" "}
              com <code className="font-mono text-xs">aria-valuenow</code>.
            </li>
            <li>
              <span className="font-medium text-foreground">Tile:</span> anunciado
              como <code className="font-mono text-xs">role=&quot;img&quot;</code> com o
              tipo do arquivo como rótulo.
            </li>
            <li>
              <span className="font-medium text-foreground">Foco visível:</span>{" "}
              anel de foco em todos os alvos interativos, herdado dos tokens{" "}
              <code className="font-mono text-xs">ring</code>.
            </li>
          </ul>
        </div>
      </Section>

      <DesignNotes
        items={[
          <>
            O tom do tile é derivado do tipo de arquivo por{" "}
            <code className="font-mono text-xs">getFileKind</code> (mapa de
            extensões/mime), sempre a partir de tokens semânticos — contraste
            garantido em light e dark.
          </>,
          "O status (idle · uploading · done · error) governa quais ações aparecem: cancelar durante o envio, reenviar em erro, baixar e remover quando concluído.",
          <>
            <span className="font-medium text-foreground">readOnly</span> oculta
            ações destrutivas (remover/cancelar/reenviar), mas preserva download
            e preview — ideal para timelines e visualizações de leitura.
          </>,
          "Com previewUrl, a miniatura da imagem substitui o glyph do tipo; durante o upload um overlay com spinner cobre o tile.",
        ]}
      />

      <RelatedComponents
        items={[
          {
            name: "Button",
            href: "/styleguide/components/button",
            description: "Base das ações do item (baixar, remover, reenviar).",
          },
          {
            name: "Progress",
            href: "/styleguide/components/progress",
            description: "Mesmo padrão da barra de progresso de upload.",
          },
          {
            name: "Field",
            href: "/styleguide/components/field",
            description: "Envolve o anexo em formulários, com label e erro.",
          },
          {
            name: "Badge",
            href: "/styleguide/components/badge",
            description: "Rótulos e metadados curtos ao lado do arquivo.",
          },
        ]}
      />
    </StyleguidePage>
  )
}
