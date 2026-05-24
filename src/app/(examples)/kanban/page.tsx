'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutGrid, AlignLeft, CheckCheck, Users, Activity,
  Sun, Moon, Plus, Sparkles,
  Pencil, Trash2, MoreHorizontal, ArrowRight,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { useDragDrop } from '@/hooks/useDragDrop'
import { Sidebar } from '@/components/layout/Sidebar'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { cn } from '@/lib/utils'

type Priority = 'high' | 'medium' | 'low'
type Column = 'todo' | 'progress' | 'review' | 'done'

interface KanbanCard {
  id: string
  title: string
  description: string
  priority: Priority
  column: Column
  assignee: string
  date: string
}

const PRIORITY_COLOR: Record<Priority, string> = {
  high:   'var(--semantic-error)',
  medium: 'var(--semantic-warning)',
  low:    'var(--semantic-success)',
}

const PRIORITY_LABEL: Record<Priority, string> = {
  high: 'Alta', medium: 'Média', low: 'Baixa',
}

const COLUMN_LABELS: Record<Column, string> = {
  todo: 'A Fazer',
  progress: 'Em Progresso',
  review: 'Revisão',
  done: 'Concluído',
}

const COLUMNS: Column[] = ['todo', 'progress', 'review', 'done']

const MEMBERS = ['Gabriel Matheus', 'Ana Lima', 'Bruno Costa', 'Carla Dias', 'Diego Faria']

const INITIAL_CARDS: KanbanCard[] = [
  { id: 'c1', title: 'Criar página de Analytics', description: 'Dashboard com charts e DateRangePicker.', priority: 'high', column: 'done', assignee: 'Gabriel Matheus', date: '20/06' },
  { id: 'c2', title: 'Implementar Pricing page', description: 'Planos com toggle mensal/anual e FAQ.', priority: 'medium', column: 'done', assignee: 'Ana Lima', date: '21/06' },
  { id: 'c3', title: 'Kanban board', description: 'Board com 4 colunas e drag simulado via dropdown.', priority: 'high', column: 'progress', assignee: 'Gabriel Matheus', date: '24/06' },
  { id: 'c4', title: 'Checkout wizard', description: 'Wizard com MaskInput de cartão, PIX e boleto.', priority: 'medium', column: 'progress', assignee: 'Bruno Costa', date: '25/06' },
  { id: 'c5', title: 'Gerenciador de arquivos', description: 'FileUpload + VirtualList + DropdownMenu.', priority: 'low', column: 'review', assignee: 'Carla Dias', date: '26/06' },
  { id: 'c6', title: 'Testes E2E das páginas novas', description: 'Cobertura de fluxos principais com Playwright.', priority: 'low', column: 'todo', assignee: 'Diego Faria', date: '28/06' },
  { id: 'c7', title: 'Atualizar README', description: 'Documentar as 7 novas páginas de exemplo.', priority: 'low', column: 'todo', assignee: 'Ana Lima', date: '29/06' },
  { id: 'c8', title: 'Design review da Inbox', description: 'Validar espaçamentos e estados da lista.', priority: 'medium', column: 'review', assignee: 'Bruno Costa', date: '23/06' },
]

const EMPTY_FORM = { title: '', description: '', priority: 'medium' as Priority, column: 'todo' as Column, assignee: MEMBERS[0], date: '' }

export default function KanbanPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [cards, setCards] = useState<KanbanCard[]>(INITIAL_CARDS)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<KanbanCard | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const sidebarSections = [
    {
      title: 'Boards',
      items: [
        { id: 'sprint', label: 'Sprint Atual', icon: <LayoutGrid size={15} /> },
        { id: 'backlog', label: 'Backlog', icon: <AlignLeft size={15} /> },
        { id: 'completed', label: 'Concluídos', icon: <CheckCheck size={15} /> },
      ],
    },
    {
      title: 'Equipe',
      items: [
        { id: 'members', label: 'Membros', icon: <Users size={15} /> },
        { id: 'activity', label: 'Atividade', icon: <Activity size={15} /> },
      ],
    },
  ]

  function openCreate(column: Column) {
    setEditingCard(null)
    setForm({ ...EMPTY_FORM, column })
    setModalOpen(true)
  }

  function openEdit(card: KanbanCard) {
    setEditingCard(card)
    setForm({ title: card.title, description: card.description, priority: card.priority, column: card.column, assignee: card.assignee, date: card.date })
    setModalOpen(true)
  }

  function handleSave() {
    if (!form.title.trim()) return
    if (editingCard) {
      setCards((prev) => prev.map((c) => c.id === editingCard.id ? { ...c, ...form } : c))
      toast.success('Card atualizado!')
    } else {
      const newCard: KanbanCard = { id: `c${Date.now()}`, ...form }
      setCards((prev) => [...prev, newCard])
      toast.success('Card criado!')
    }
    setModalOpen(false)
  }

  function handleDelete() {
    setCards((prev) => prev.filter((c) => c.id !== deleteId))
    setDeleteId(null)
    toast.success('Card excluído.')
  }

  function moveCard(id: string, target: Column) {
    setCards((prev) => prev.map((c) => c.id === id ? { ...c, column: target } : c))
    toast.info(`Card movido para ${COLUMN_LABELS[target]}`)
  }

  const { draggingId, dragOverColumn, handleDragStart, handleDragOver, handleDragLeave, handleDrop, handleDragEnd } = useDragDrop({
    onDrop: (id, targetColumn) => moveCard(id, targetColumn as Column),
  })

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
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Kanban</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={() => openCreate('todo')}>
            <Plus size={13} />
            Novo card
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          activeId="sprint"
          onNavigate={(id) => {
            if (id === 'backlog') toast.info('Backlog — em breve')
            if (id === 'completed') toast.info('Concluídos — em breve')
            if (id === 'members') toast.info('Membros — em breve')
            if (id === 'activity') toast.info('Atividade — em breve')
          }}
          sections={sidebarSections}
          footer={
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full px-1 text-left text-[10px] text-[var(--text-muted-dim)] transition-colors hover:text-[var(--text-muted)]"
            >
              ← Dashboard
            </button>
          }
        />

        {/* Kanban board — horizontal scroll */}
        <main className="flex flex-1 gap-4 overflow-x-auto p-6">
          {COLUMNS.map((col) => {
            const colCards = cards.filter((c) => c.column === col)
            return (
              <div
                key={col}
                onDragOver={handleDragOver(col)}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop(col)}
                className={cn(
                  'flex w-72 shrink-0 flex-col rounded-[var(--radius-lg)] border bg-[var(--surface-deep)] transition-colors',
                  dragOverColumn === col && draggingId !== null
                    ? 'border-[var(--acc-img)] bg-[var(--acc-img)]/5 ring-2 ring-[var(--acc-img)] ring-inset'
                    : 'border-[var(--border)]',
                )}
              >
                {/* Column header */}
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{COLUMN_LABELS[col]}</span>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--surface-hover)] px-1.5 text-[10px] font-semibold text-[var(--text-muted)]">
                      {colCards.length}
                    </span>
                  </div>
                  <button
                    onClick={() => openCreate(col)}
                    className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted-dim)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                    aria-label={`Criar card em ${COLUMN_LABELS[col]}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Cards */}
                <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-3">
                  {colCards.map((card) => (
                    <div
                      key={card.id}
                      draggable
                      onDragStart={handleDragStart(card.id)}
                      onDragEnd={handleDragEnd}
                      className={cn(
                        'group rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface)] p-3.5 transition-all',
                        'cursor-grab active:cursor-grabbing',
                        draggingId === card.id
                          ? 'opacity-40 scale-[0.98] ring-2 ring-[var(--acc-img)] shadow-none'
                          : 'hover:shadow-sm',
                      )}
                    >
                      {/* Priority + menu */}
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span
                          className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                          style={{
                            color: PRIORITY_COLOR[card.priority],
                            borderColor: `color-mix(in srgb, ${PRIORITY_COLOR[card.priority]} 30%, transparent)`,
                            background: `color-mix(in srgb, ${PRIORITY_COLOR[card.priority]} 10%, transparent)`,
                          }}
                        >
                          {PRIORITY_LABEL[card.priority]}
                        </span>
                        <DropdownMenu
                          trigger={
                            <button className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-muted-dim)] opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
                              <MoreHorizontal size={14} />
                            </button>
                          }
                          items={[
                            { label: 'Editar', icon: <Pencil size={13} />, onClick: () => openEdit(card) },
                            { separator: true },
                            ...COLUMNS.filter((c) => c !== card.column).map((c) => ({
                              label: `Mover para ${COLUMN_LABELS[c]}`,
                              icon: <ArrowRight size={13} />,
                              onClick: () => moveCard(card.id, c),
                            })),
                            { separator: true },
                            { label: 'Excluir', icon: <Trash2 size={13} />, variant: 'destructive' as const, onClick: () => setDeleteId(card.id) },
                          ]}
                        />
                      </div>

                      <p className="text-sm font-medium text-[var(--text-primary)]">{card.title}</p>
                      {card.description && (
                        <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{card.description}</p>
                      )}

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Avatar name={card.assignee} size="xs" />
                          <span className="text-[10px] text-[var(--text-muted-dim)]">{card.assignee.split(' ')[0]}</span>
                        </div>
                        {card.date && (
                          <span className="text-[10px] text-[var(--text-muted-dim)]">{card.date}</span>
                        )}
                      </div>
                    </div>
                  ))}

                  {colCards.length === 0 && (
                    <button
                      onClick={() => openCreate(col)}
                      className="flex flex-col items-center gap-1.5 rounded-[var(--radius-md)] border border-dashed border-[var(--border-subtle)] py-6 text-[var(--text-muted-dim)] transition-colors hover:border-[var(--border)] hover:text-[var(--text-muted)]"
                    >
                      <Plus size={16} />
                      <span className="text-xs">Adicionar card</span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </main>
      </div>

      {/* Create/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCard ? 'Editar card' : 'Novo card'}
        size="sm"
      >
        <div className="flex flex-col gap-3">
          <Input
            label="Título"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Título do card"
          />
          <Textarea
            label="Descrição"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Descreva a tarefa..."
            rows={2}
          />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Prioridade"
              value={form.priority}
              onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Priority }))}
              options={[
                { value: 'high', label: 'Alta' },
                { value: 'medium', label: 'Média' },
                { value: 'low', label: 'Baixa' },
              ]}
            />
            <Select
              label="Coluna"
              value={form.column}
              onChange={(e) => setForm((f) => ({ ...f, column: e.target.value as Column }))}
              options={COLUMNS.map((c) => ({ value: c, label: COLUMN_LABELS[c] }))}
            />
          </div>
          <Select
            label="Responsável"
            value={form.assignee}
            onChange={(e) => setForm((f) => ({ ...f, assignee: e.target.value }))}
            options={MEMBERS.map((m) => ({ value: m, label: m }))}
          />
          <Input
            label="Data (opcional)"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            placeholder="ex: 30/06"
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button variant="primary" size="sm" onClick={handleSave} disabled={!form.title.trim()}>
              {editingCard ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Excluir card"
        description="Esta ação não pode ser desfeita. O card será removido permanentemente."
        variant="destructive"
        confirmLabel="Excluir"
      />
    </div>
  )
}
