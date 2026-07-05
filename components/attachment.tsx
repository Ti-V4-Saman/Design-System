"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  CloudUpload,
  Download,
  File as FileIcon,
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Loader2,
  Paperclip,
  RefreshCw,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* -------------------------------------------------------------------------------------------------
 * Helpers — file type resolution + byte formatting
 * -----------------------------------------------------------------------------------------------*/

type FileTone = "neutral" | "info" | "success" | "warning" | "destructive"

type FileKind = {
  icon: React.ElementType
  tone: FileTone
  /** Rótulo curto do tipo, ex.: "PDF", "Planilha". */
  label: string
}

/** Chip do tile por tom — sempre derivado de tokens, com contraste garantido em ambos os temas. */
const toneChip: Record<FileTone, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground dark:bg-warning/25 dark:text-warning",
  destructive: "bg-destructive/10 text-destructive",
}

const EXTENSION_MAP: Record<string, FileKind> = {
  pdf: { icon: FileText, tone: "destructive", label: "PDF" },
  doc: { icon: FileText, tone: "info", label: "Documento" },
  docx: { icon: FileText, tone: "info", label: "Documento" },
  txt: { icon: FileText, tone: "info", label: "Texto" },
  rtf: { icon: FileText, tone: "info", label: "Documento" },
  md: { icon: FileText, tone: "info", label: "Markdown" },
  xls: { icon: FileSpreadsheet, tone: "success", label: "Planilha" },
  xlsx: { icon: FileSpreadsheet, tone: "success", label: "Planilha" },
  csv: { icon: FileSpreadsheet, tone: "success", label: "CSV" },
  ppt: { icon: FileText, tone: "warning", label: "Apresentação" },
  pptx: { icon: FileText, tone: "warning", label: "Apresentação" },
  jpg: { icon: FileImage, tone: "info", label: "Imagem" },
  jpeg: { icon: FileImage, tone: "info", label: "Imagem" },
  png: { icon: FileImage, tone: "info", label: "Imagem" },
  gif: { icon: FileImage, tone: "info", label: "Imagem" },
  webp: { icon: FileImage, tone: "info", label: "Imagem" },
  svg: { icon: FileImage, tone: "info", label: "Vetor" },
  heic: { icon: FileImage, tone: "info", label: "Imagem" },
  zip: { icon: FileArchive, tone: "warning", label: "Arquivo" },
  rar: { icon: FileArchive, tone: "warning", label: "Arquivo" },
  "7z": { icon: FileArchive, tone: "warning", label: "Arquivo" },
  tar: { icon: FileArchive, tone: "warning", label: "Arquivo" },
  gz: { icon: FileArchive, tone: "warning", label: "Arquivo" },
}

const FALLBACK_KIND: FileKind = { icon: FileIcon, tone: "neutral", label: "Arquivo" }

/** Extrai a extensão de um nome de arquivo ou de um mime type. */
function extensionOf(nameOrType: string): string {
  const value = nameOrType.toLowerCase().trim()
  if (value.includes("/")) {
    // mime type — mapeia os mais comuns para uma extensão conhecida
    const [group, sub] = value.split("/")
    if (group === "image") return sub === "jpeg" ? "jpg" : sub
    if (sub.includes("spreadsheet") || sub.includes("excel")) return "xlsx"
    if (sub.includes("presentation") || sub.includes("powerpoint")) return "pptx"
    if (sub.includes("word") || sub.includes("document")) return "docx"
    if (sub.includes("zip") || sub.includes("compressed")) return "zip"
    if (sub === "pdf") return "pdf"
    if (sub === "csv") return "csv"
    if (sub === "plain") return "txt"
    return sub
  }
  const dot = value.lastIndexOf(".")
  return dot >= 0 ? value.slice(dot + 1) : value
}

/**
 * Resolve o glyph, o tom e o rótulo de um arquivo a partir do nome (com extensão)
 * ou de um mime type. Reutilizável em qualquer módulo do CRM.
 */
export function getFileKind(nameOrType: string): FileKind {
  return EXTENSION_MAP[extensionOf(nameOrType)] ?? FALLBACK_KIND
}

/** Formata bytes em uma string legível (KB, MB, GB). */
export function formatFileSize(bytes: number, decimals = 1): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 KB"
  const units = ["B", "KB", "MB", "GB", "TB"]
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, i)
  const rounded = i === 0 ? value : Number(value.toFixed(decimals))
  return `${rounded} ${units[i]}`
}

export type AttachmentStatus = "idle" | "uploading" | "done" | "error"

/* -------------------------------------------------------------------------------------------------
 * Attachment — container
 * -----------------------------------------------------------------------------------------------*/

const attachmentVariants = cva(
  "group/attachment relative flex items-center gap-3 rounded-lg p-2.5 text-sm transition-colors focus-within:ring-3 focus-within:ring-ring/40 data-[status=error]:border-destructive/40 data-[status=error]:ring-destructive/10 data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-60",
  {
    variants: {
      variant: {
        outline: "border border-border bg-card hover:bg-muted/40",
        muted: "bg-muted/50 hover:bg-muted",
        ghost: "hover:bg-muted/60",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
)

type AttachmentContextValue = { status: AttachmentStatus; disabled: boolean }
const AttachmentContext = React.createContext<AttachmentContextValue>({
  status: "idle",
  disabled: false,
})

function Attachment({
  className,
  variant,
  status = "idle",
  disabled = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    status?: AttachmentStatus
    disabled?: boolean
  }) {
  return (
    <AttachmentContext.Provider value={{ status, disabled }}>
      <div
        data-slot="attachment"
        data-status={status}
        data-disabled={disabled}
        className={cn(attachmentVariants({ variant }), className)}
        {...props}
      />
    </AttachmentContext.Provider>
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentThumb — tile do tipo de arquivo (ou preview de imagem)
 * -----------------------------------------------------------------------------------------------*/

function AttachmentThumb({
  className,
  name,
  type,
  previewUrl,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  /** Nome do arquivo (com extensão) usado para inferir o tipo. */
  name?: string
  /** Mime type ou extensão, alternativa a `name`. */
  type?: string
  /** URL de miniatura — quando presente, substitui o glyph pela imagem. */
  previewUrl?: string
}) {
  const { status } = React.useContext(AttachmentContext)
  const kind = getFileKind(type ?? name ?? "")
  const Icon = kind.icon

  return (
    <div
      data-slot="attachment-thumb"
      role="img"
      aria-label={kind.label}
      className={cn(
        "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg [&_svg]:size-5",
        previewUrl ? "bg-muted" : toneChip[kind.tone],
        className
      )}
      {...props}
    >
      {previewUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={previewUrl}
          alt=""
          className={cn(
            "size-full object-cover transition-opacity",
            status === "uploading" && "opacity-50"
          )}
        />
      ) : (
        <Icon aria-hidden />
      )}
      {status === "uploading" && (
        <span className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="size-4 animate-spin text-foreground" aria-hidden />
        </span>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * Body / Name / Meta
 * -----------------------------------------------------------------------------------------------*/

function AttachmentBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-body"
      className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
      {...props}
    />
  )
}

function AttachmentName({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-name"
      className={cn("truncate font-medium text-foreground", className)}
      {...props}
    />
  )
}

function AttachmentMeta({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="attachment-meta"
      className={cn(
        "flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground [&>svg]:size-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/** Separador visual (bolinha) para itens de metadados. */
function AttachmentMetaDot() {
  return (
    <span aria-hidden className="size-0.5 rounded-full bg-current opacity-40" />
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentActions — área de ações à direita
 * -----------------------------------------------------------------------------------------------*/

function AttachmentActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn("flex shrink-0 items-center gap-0.5", className)}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentProgress — barra de progresso de upload
 * -----------------------------------------------------------------------------------------------*/

function AttachmentProgress({
  className,
  value,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & { value: number }) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      data-slot="attachment-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(clamped)}
      className={cn(
        "mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted",
        className
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentItem — composição de alto nível (o uso padrão no CRM)
 * -----------------------------------------------------------------------------------------------*/

export type AttachmentItemProps = Omit<
  React.ComponentProps<"div">,
  "onError"
> &
  VariantProps<typeof attachmentVariants> & {
    /** Nome do arquivo, com extensão. */
    name: string
    /** Tamanho em bytes. */
    size?: number
    /** Mime type — melhora a inferência do ícone quando o nome não tem extensão. */
    type?: string
    /** Estado do anexo. */
    status?: AttachmentStatus
    /** Progresso 0–100 (usado quando status = "uploading"). */
    progress?: number
    /** Mensagem exibida quando status = "error". */
    errorMessage?: string
    /** URL de miniatura para preview (imagens). */
    previewUrl?: string
    /** Metadados secundários, ex.: "Enviado por Ana · há 2h". */
    description?: React.ReactNode
    /** Desabilita o item por completo. */
    disabled?: boolean
    /** Modo leitura: mantém download/preview, oculta remover/cancelar/reenviar. */
    readOnly?: boolean
    onDownload?: () => void
    onRemove?: () => void
    onRetry?: () => void
    onCancel?: () => void
    onPreview?: () => void
  }

function AttachmentItem({
  className,
  variant,
  name,
  size,
  type,
  status = "idle",
  progress = 0,
  errorMessage,
  previewUrl,
  description,
  disabled = false,
  readOnly = false,
  onDownload,
  onRemove,
  onRetry,
  onCancel,
  onPreview,
  ...props
}: AttachmentItemProps) {
  const kind = getFileKind(type ?? name)
  const nameClickable = Boolean(onPreview) && !disabled

  return (
    <Attachment
      variant={variant}
      status={status}
      disabled={disabled}
      className={className}
      {...props}
    >
      <AttachmentThumb name={name} type={type} previewUrl={previewUrl} />

      <AttachmentBody>
        {nameClickable ? (
          <button
            type="button"
            onClick={onPreview}
            className="w-fit max-w-full truncate rounded-sm text-left font-medium text-foreground outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/40"
          >
            {name}
          </button>
        ) : (
          <AttachmentName>{name}</AttachmentName>
        )}

        {status === "error" ? (
          <AttachmentMeta className="text-destructive">
            <span className="truncate">
              {errorMessage ?? "Falha no envio. Tente novamente."}
            </span>
          </AttachmentMeta>
        ) : status === "uploading" ? (
          <AttachmentMeta>
            <span>Enviando… {Math.round(Math.max(0, Math.min(100, progress)))}%</span>
            {typeof size === "number" && (
              <>
                <AttachmentMetaDot />
                <span>{formatFileSize(size)}</span>
              </>
            )}
          </AttachmentMeta>
        ) : (
          <AttachmentMeta>
            <span className="uppercase">{kind.label}</span>
            {typeof size === "number" && (
              <>
                <AttachmentMetaDot />
                <span>{formatFileSize(size)}</span>
              </>
            )}
            {description && (
              <>
                <AttachmentMetaDot />
                <span className="truncate">{description}</span>
              </>
            )}
          </AttachmentMeta>
        )}

        {status === "uploading" && <AttachmentProgress value={progress} />}
      </AttachmentBody>

      <AttachmentActions>
        {status === "uploading" && !readOnly && onCancel && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onCancel}
            aria-label={`Cancelar envio de ${name}`}
          >
            <X />
          </Button>
        )}

        {status === "error" && !readOnly && onRetry && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onRetry}
            aria-label={`Reenviar ${name}`}
          >
            <RefreshCw />
          </Button>
        )}

        {status === "done" && onDownload && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onDownload}
            aria-label={`Baixar ${name}`}
          >
            <Download />
          </Button>
        )}

        {(status === "done" || status === "error") && !readOnly && onRemove && (
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            onClick={onRemove}
            aria-label={`Remover ${name}`}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X />
          </Button>
        )}
      </AttachmentActions>
    </Attachment>
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentList — agrupa itens com espaçamento consistente
 * -----------------------------------------------------------------------------------------------*/

function AttachmentList({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="attachment-list"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function AttachmentListItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li data-slot="attachment-list-item" className={cn(className)} {...props} />
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentEmpty — estado vazio
 * -----------------------------------------------------------------------------------------------*/

function AttachmentEmpty({
  className,
  title = "Nenhum anexo ainda",
  description = "Os arquivos enviados aparecerão aqui.",
  icon: Icon = Paperclip,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "title"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ElementType
}) {
  return (
    <div
      data-slot="attachment-empty"
      className={cn(
        "flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border px-6 py-10 text-center",
        className
      )}
      {...props}
    >
      <div className="mb-1 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5">
        <Icon aria-hidden />
      </div>
      <p className="text-sm font-medium text-foreground">{title}</p>
      {description && (
        <p className="max-w-xs text-xs text-muted-foreground">{description}</p>
      )}
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}

/* -------------------------------------------------------------------------------------------------
 * AttachmentDropzone — área de drag & drop + clique para selecionar
 * -----------------------------------------------------------------------------------------------*/

function AttachmentDropzone({
  className,
  onFiles,
  multiple = false,
  accept,
  maxSize,
  disabled = false,
  readOnly = false,
  title = "Arraste arquivos ou clique para enviar",
  hint,
  icon: Icon = CloudUpload,
  ...props
}: Omit<React.ComponentProps<"div">, "onDrop"> & {
  /** Callback com os arquivos selecionados/soltos. */
  onFiles?: (files: File[]) => void
  multiple?: boolean
  /** Atributo `accept` do input (ex.: ".pdf,.docx,image/*"). */
  accept?: string
  /** Tamanho máximo em bytes — usado apenas para exibir a dica. */
  maxSize?: number
  disabled?: boolean
  readOnly?: boolean
  title?: React.ReactNode
  /** Dica secundária. Se omitida, é derivada de `accept`/`maxSize`. */
  hint?: React.ReactNode
  icon?: React.ElementType
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const inert = disabled || readOnly

  const emit = (list: FileList | null) => {
    if (!list || list.length === 0) return
    onFiles?.(Array.from(list))
  }

  const openPicker = () => {
    if (inert) return
    inputRef.current?.click()
  }

  const autoHint =
    [
      accept ? accept.replaceAll(".", "").toUpperCase().replaceAll(",", " · ") : null,
      maxSize ? `até ${formatFileSize(maxSize)}` : null,
    ]
      .filter(Boolean)
      .join(" · ") || null
  const derivedHint = hint ?? autoHint

  return (
    <div
      data-slot="attachment-dropzone"
      data-dragging={dragging}
      data-disabled={inert}
      onDragOver={(e) => {
        if (inert) return
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={(e) => {
        e.preventDefault()
        setDragging(false)
      }}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        if (inert) return
        emit(e.dataTransfer.files)
      }}
      className={cn(
        "group/dropzone rounded-xl border border-dashed border-input bg-muted/30 transition-colors",
        "data-[dragging=true]:border-primary data-[dragging=true]:bg-primary/5 data-[dragging=true]:ring-4 data-[dragging=true]:ring-primary/10",
        "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-60",
        className
      )}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={inert}
        className="sr-only"
        onChange={(e) => {
          emit(e.target.files)
          // permite reenviar o mesmo arquivo em sequência
          e.target.value = ""
        }}
      />
      <button
        type="button"
        onClick={openPicker}
        disabled={inert}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-xl px-6 py-8 text-center outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
      >
        <span
          className={cn(
            "flex size-11 items-center justify-center rounded-full bg-background text-muted-foreground ring-1 ring-border transition-colors [&_svg]:size-5",
            "group-data-[dragging=true]/dropzone:text-primary group-data-[dragging=true]/dropzone:ring-primary/30"
          )}
        >
          <Icon aria-hidden />
        </span>
        <span className="text-sm font-medium text-foreground">{title}</span>
        {derivedHint && (
          <span className="text-xs text-muted-foreground">{derivedHint}</span>
        )}
      </button>
    </div>
  )
}

export {
  Attachment,
  AttachmentThumb,
  AttachmentBody,
  AttachmentName,
  AttachmentMeta,
  AttachmentMetaDot,
  AttachmentActions,
  AttachmentProgress,
  AttachmentItem,
  AttachmentList,
  AttachmentListItem,
  AttachmentEmpty,
  AttachmentDropzone,
  attachmentVariants,
}
