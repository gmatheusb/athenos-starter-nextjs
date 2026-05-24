'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, X, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileInfo {
  file: File
  preview?: string
}

interface FileUploadProps {
  onFiles: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function FileUpload({ onFiles, accept, multiple = false, maxSizeMB, className }: FileUploadProps) {
  const [dragging, setDragging] = useState(false)
  const [files, setFiles] = useState<FileInfo[]>([])
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const process = useCallback((incoming: FileList | File[]) => {
    setError('')
    const arr = Array.from(incoming)
    if (maxSizeMB) {
      const oversized = arr.find(f => f.size > maxSizeMB * 1024 * 1024)
      if (oversized) {
        setError(`Arquivo muito grande. Máximo: ${maxSizeMB} MB.`)
        return
      }
    }
    const infos: FileInfo[] = arr.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
    }))
    setFiles(multiple ? prev => [...prev, ...infos] : infos)
    onFiles(arr)
  }, [multiple, maxSizeMB, onFiles])

  function remove(i: number) {
    setFiles(prev => {
      const next = [...prev]
      if (next[i].preview) URL.revokeObjectURL(next[i].preview!)
      next.splice(i, 1)
      return next
    })
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div
        role="button"
        tabIndex={0}
        aria-label="Clique ou arraste arquivos para enviar"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click() }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); process(e.dataTransfer.files) }}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-3 p-8',
          'rounded-[var(--radius-xl)] border-2 border-dashed transition-all duration-fast',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]',
          dragging
            ? 'border-[var(--acc-img)] bg-[var(--acc-img-soft)]'
            : 'border-[var(--border)] bg-[var(--surface-deep)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]',
        )}
      >
        <div className={cn(
          'flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] transition-colors duration-fast',
          dragging ? 'bg-[var(--acc-img-soft)] text-[var(--acc-img)]' : 'bg-[var(--surface)] text-[var(--text-muted-dim)]',
        )}>
          <Upload size={20} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--text-primary)]">
            Clique para enviar{multiple ? ' arquivos' : ' um arquivo'}
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {accept ? `Formatos: ${accept}` : 'Qualquer formato'}
            {maxSizeMB ? ` · Máx. ${maxSizeMB} MB` : ''}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => e.target.files && process(e.target.files)}
        />
      </div>

      {error && <p role="alert" className="text-xs text-[var(--semantic-error)]">{error}</p>}

      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((info, i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5"
            >
              {info.preview ? (
                <img src={info.preview} alt="" className="h-9 w-9 shrink-0 rounded-[var(--radius-md)] object-cover" />
              ) : (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--surface-deep)] text-[var(--text-muted-dim)]">
                  <FileText size={16} />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{info.file.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{formatBytes(info.file.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label={`Remover ${info.file.name}`}
                className="shrink-0 rounded-[var(--radius-sm)] p-1 text-[var(--text-muted-dim)] transition-colors duration-fast hover:bg-[var(--semantic-error-soft)] hover:text-[var(--semantic-error)]"
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
