"use client"

import * as React from "react"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, Trash2, FileText, FileImage, FileVideo, FileArchive, File } from "lucide-react"
import { CRMBaseCard } from "./base-card"
import type { AttachmentCardProps } from "./types"

function getFileIcon(fileType?: string) {
  if (!fileType) return <File className="h-5 w-5" />
  const t = fileType.toLowerCase()
  if (t.includes("image") || ["jpg","jpeg","png","gif","svg","webp"].some(e => t.includes(e)))
    return <FileImage className="h-5 w-5" />
  if (t.includes("video") || ["mp4","mov","avi"].some(e => t.includes(e)))
    return <FileVideo className="h-5 w-5" />
  if (t.includes("zip") || t.includes("tar") || t.includes("rar"))
    return <FileArchive className="h-5 w-5" />
  return <FileText className="h-5 w-5" />
}

export function AttachmentCard({
  fileName,
  fileSize,
  fileType,
  uploadedBy,
  uploadedAt,
  onDownload,
  onDelete,
  className,
}: AttachmentCardProps) {
  return (
    <CRMBaseCard className={className}>
      <CardContent className="flex items-center gap-3 py-3">
        <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-muted text-muted-foreground shrink-0">
          {getFileIcon(fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{fileName}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            {fileSize && <span>{fileSize}</span>}
            {uploadedBy && <span>· {uploadedBy}</span>}
            {uploadedAt && <span>· {uploadedAt}</span>}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onDownload && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </CRMBaseCard>
  )
}
