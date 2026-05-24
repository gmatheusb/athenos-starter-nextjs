'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sun, Moon, Sparkles, Upload,
  Image, FileText, Film, FolderIcon, Share2,
  Grid3X3, List, MoreHorizontal, Trash2, Link2, Pencil,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { FileUpload } from '@/components/ui/FileUpload'
import { VirtualList } from '@/components/ui/VirtualList'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CopyButton } from '@/components/ui/CopyButton'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

type FileType = 'image' | 'pdf' | 'video' | 'doc'
type Folder = 'all' | 'images' | 'docs' | 'videos' | 'shared'
type ViewMode = 'grid' | 'list'

interface FileItem {
  id: string
  name: string
  type: FileType
  size: string
  date: string
  folder: Folder[]
}

const FOLDER_LABELS: Record<Folder, string> = {
  all: 'Todos',
  images: 'Imagens',
  docs: 'Documentos',
  videos: 'Vídeos',
  shared: 'Compartilhados',
}

const FOLDER_ICON: Record<Folder, React.ReactNode> = {
  all: <FolderIcon size={15} />,
  images: <Image size={15} />,
  docs: <FileText size={15} />,
  videos: <Film size={15} />,
  shared: <Share2 size={15} />,
}

const FOLDER_COUNT: Record<Folder, number> = {
  all: 16,
  images: 7,
  docs: 5,
  videos: 3,
  shared: 4,
}

const TYPE_ICON: Record<FileType, React.ReactNode> = {
  image: <Image size={20} />,
  pdf: <FileText size={20} />,
  video: <Film size={20} />,
  doc: <FileText size={20} />,
}

const TYPE_COLOR: Record<FileType, string> = {
  image: 'var(--acc-img)',
  pdf: 'var(--semantic-error)',
  video: 'var(--acc-vid)',
  doc: 'var(--semantic-info)',
}

const INITIAL_FILES: FileItem[] = [
  { id: 'f1', name: 'athenos-cover.png', type: 'image', size: '2.4 MB', date: '24/06', folder: ['all', 'images', 'shared'] },
  { id: 'f2', name: 'design-tokens.pdf', type: 'pdf', size: '840 KB', date: '23/06', folder: ['all', 'docs'] },
  { id: 'f3', name: 'demo-walkthrough.mp4', type: 'video', size: '18.2 MB', date: '22/06', folder: ['all', 'videos', 'shared'] },
  { id: 'f4', name: 'component-audit.xlsx', type: 'doc', size: '120 KB', date: '21/06', folder: ['all', 'docs'] },
  { id: 'f5', name: 'hero-screenshot.png', type: 'image', size: '1.1 MB', date: '20/06', folder: ['all', 'images'] },
  { id: 'f6', name: 'onboarding-flow.mp4', type: 'video', size: '9.7 MB', date: '19/06', folder: ['all', 'videos'] },
  { id: 'f7', name: 'brand-guidelines.pdf', type: 'pdf', size: '3.2 MB', date: '18/06', folder: ['all', 'docs', 'shared'] },
  { id: 'f8', name: 'dashboard-dark.png', type: 'image', size: '980 KB', date: '17/06', folder: ['all', 'images', 'shared'] },
  { id: 'f9', name: 'api-reference.pdf', type: 'pdf', size: '560 KB', date: '16/06', folder: ['all', 'docs'] },
  { id: 'f10', name: 'color-palette.png', type: 'image', size: '450 KB', date: '15/06', folder: ['all', 'images'] },
  { id: 'f11', name: 'sprint-retro.mp4', type: 'video', size: '22.1 MB', date: '14/06', folder: ['all', 'videos'] },
  { id: 'f12', name: 'changelog-v2.pdf', type: 'pdf', size: '210 KB', date: '13/06', folder: ['all', 'docs'] },
  { id: 'f13', name: 'typography-scale.png', type: 'image', size: '340 KB', date: '12/06', folder: ['all', 'images'] },
  { id: 'f14', name: 'roadmap-2024.doc', type: 'doc', size: '88 KB', date: '11/06', folder: ['all', 'docs', 'shared'] },
  { id: 'f15', name: 'kanban-preview.png', type: 'image', size: '1.8 MB', date: '10/06', folder: ['all', 'images', 'shared'] },
  { id: 'f16', name: 'components-demo.mp4', type: 'video', size: '34.6 MB', date: '09/06', folder: ['all', 'videos', 'shared'] },
]

export default function FilesPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES)
  const [activeFolder, setActiveFolder] = useState<Folder>('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showUpload, setShowUpload] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filteredFiles = files.filter((f) => {
    const inFolder = f.folder.includes(activeFolder)
    const matchType = typeFilter === 'all' || f.type === typeFilter
    const matchSearch = !search || f.name.toLowerCase().includes(search.toLowerCase())
    return inFolder && matchType && matchSearch
  })

  function handleUpload(uploadedFiles: File[]) {
    const newFiles: FileItem[] = uploadedFiles.map((file) => {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
      const type: FileType = ['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(ext) ? 'image'
        : ['mp4', 'mov', 'avi'].includes(ext) ? 'video'
        : ext === 'pdf' ? 'pdf' : 'doc'
      const sizeKB = Math.round(file.size / 1024)
      const size = sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`
      return {
        id: `f${Date.now()}-${Math.random()}`,
        name: file.name,
        type,
        size,
        date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        folder: ['all'],
      }
    })
    setFiles((prev) => [...newFiles, ...prev])
    setShowUpload(false)
    toast.success(`${uploadedFiles.length} arquivo(s) enviado(s)!`)
  }

  function deleteFile() {
    setFiles((prev) => prev.filter((f) => f.id !== deleteId))
    setDeleteId(null)
    toast.success('Arquivo excluído.')
  }

  const FOLDERS: Folder[] = ['all', 'images', 'docs', 'videos', 'shared']

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">

      <header
        className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)] px-5"
        style={{ zIndex: 'var(--z-sticky)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-[var(--text-primary)]">Athenos</p>
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Arquivos</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Folder tree — primary sidebar */}
        <div className="flex w-52 shrink-0 flex-col overflow-hidden border-r border-[var(--border-subtle)] bg-[var(--surface-deep)]">
          <div className="flex-1 overflow-y-auto px-2 py-4">
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-dim)]">
              Pastas
            </p>
            {FOLDERS.map((folder) => (
              <button
                key={folder}
                onClick={() => setActiveFolder(folder)}
                className={cn(
                  'flex w-full items-center justify-between rounded-[var(--radius-md)] px-2 py-2 text-sm transition-colors',
                  activeFolder === folder
                    ? 'bg-[rgba(168,85,247,0.12)] text-[var(--acc-img)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                )}
              >
                <span className="flex items-center gap-2">
                  {FOLDER_ICON[folder]}
                  {FOLDER_LABELS[folder]}
                </span>
                <span className="text-[10px] text-[var(--text-muted-dim)]">{FOLDER_COUNT[folder]}</span>
              </button>
            ))}
          </div>
          <div className="border-t border-[var(--border-subtle)] px-3 py-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-1 text-left text-[10px] text-[var(--text-muted-dim)] transition-colors hover:text-[var(--text-muted)]"
            >
              ← Dashboard
            </button>
          </div>
        </div>

        {/* Main content */}
        <main className="flex flex-1 flex-col overflow-hidden">

          {/* Toolbar */}
          <div className="shrink-0 space-y-3 border-b border-[var(--border)] px-6 py-4">
            <Breadcrumb
              items={[
                { label: 'Arquivos' },
                { label: FOLDER_LABELS[activeFolder] },
              ]}
            />
            <div className="flex items-center gap-2">
              <SearchInput
                value={search}
                onChange={setSearch}
                placeholder="Buscar arquivo..."
                className="max-w-xs"
              />
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                options={[
                  { value: 'all', label: 'Todos os tipos' },
                  { value: 'image', label: 'Imagens' },
                  { value: 'pdf', label: 'PDFs' },
                  { value: 'video', label: 'Vídeos' },
                  { value: 'doc', label: 'Documentos' },
                ]}
              />
              <div className="ml-auto flex items-center gap-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] transition-colors',
                    viewMode === 'grid' ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)]',
                  )}
                  aria-label="Visualização em grade"
                >
                  <Grid3X3 size={15} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] transition-colors',
                    viewMode === 'list' ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]' : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)]',
                  )}
                  aria-label="Visualização em lista"
                >
                  <List size={15} />
                </button>
                <Button variant="primary" size="sm" onClick={() => setShowUpload((s) => !s)} className="ml-2">
                  <Upload size={13} />
                  Upload
                </Button>
              </div>
            </div>

            {showUpload && (
              <FileUpload onFiles={handleUpload} multiple accept="image/*,.pdf,.doc,.docx,.mp4,.mov" />
            )}
          </div>

          {/* File list */}
          <div className="flex-1 overflow-auto p-6">

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="group relative flex flex-col items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--surface)] p-4 transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)]"
                      style={{ background: `color-mix(in srgb, ${TYPE_COLOR[file.type]} 12%, transparent)` }}
                    >
                      <span style={{ color: TYPE_COLOR[file.type] }}>{TYPE_ICON[file.type]}</span>
                    </div>
                    <p className="w-full truncate text-center text-xs font-medium text-[var(--text-primary)]">{file.name}</p>
                    <p className="text-[10px] text-[var(--text-muted-dim)]">{file.size}</p>

                    <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <DropdownMenu
                        trigger={
                          <button className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                            <MoreHorizontal size={13} />
                          </button>
                        }
                        items={[
                          { label: 'Renomear', icon: <Pencil size={13} />, onClick: () => toast.info('Renomear: ' + file.name) },
                          { label: 'Copiar link', icon: <Link2 size={13} />, onClick: () => toast.success('Link copiado!') },
                          { separator: true },
                          { label: 'Excluir', icon: <Trash2 size={13} />, variant: 'destructive', onClick: () => setDeleteId(file.id) },
                        ]}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <VirtualList
                items={filteredFiles}
                itemHeight={52}
                containerHeight={Math.max(300, filteredFiles.length * 52)}
                keyExtractor={(f) => f.id}
                renderItem={(file) => (
                  <div className="flex h-[52px] items-center gap-3 border-b border-[var(--border-subtle)] px-2 transition-colors hover:bg-[var(--surface-hover)]">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                      style={{ background: `color-mix(in srgb, ${TYPE_COLOR[file.type]} 12%, transparent)` }}
                    >
                      <span style={{ color: TYPE_COLOR[file.type] }} className="[&>svg]:h-3.5 [&>svg]:w-3.5">
                        {TYPE_ICON[file.type]}
                      </span>
                    </div>
                    <span className="flex-1 truncate text-sm text-[var(--text-primary)]">{file.name}</span>
                    <span className="hidden w-16 text-right text-xs text-[var(--text-muted-dim)] sm:block">{file.type.toUpperCase()}</span>
                    <span className="hidden w-16 text-right text-xs text-[var(--text-muted-dim)] sm:block">{file.size}</span>
                    <span className="hidden w-14 text-right text-xs text-[var(--text-muted-dim)] md:block">{file.date}</span>
                    <div className="flex items-center gap-1">
                      <CopyButton text={`https://athenos.dev/files/${file.id}`} />
                      <button
                        onClick={() => setDeleteId(file.id)}
                        className="flex h-7 w-7 items-center justify-center rounded text-[var(--text-muted)] transition-colors hover:text-[var(--semantic-error)]"
                        aria-label="Excluir"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                )}
              />
            )}

            {filteredFiles.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                <FolderIcon size={32} className="text-[var(--text-muted-dim)]" />
                <p className="text-sm text-[var(--text-muted)]">Nenhum arquivo encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={deleteFile}
        title="Excluir arquivo"
        description="O arquivo será removido permanentemente. Esta ação não pode ser desfeita."
        variant="destructive"
        confirmLabel="Excluir"
      />
    </div>
  )
}
