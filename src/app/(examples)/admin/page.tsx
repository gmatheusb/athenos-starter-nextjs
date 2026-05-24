'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, Settings, Sun, Moon,
  Pencil, Trash2, Plus, Sparkles, UserPlus,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageHeader } from '@/components/ui/PageHeader'
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable'
import { Pagination } from '@/components/ui/Pagination'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge, RoleBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { formatDate } from '@/lib/format'

type Role = 'admin' | 'clevel' | 'finance' | 'marketing'
type Status = 'success' | 'warning' | 'error'

interface User {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  active: boolean
  joined: string
}

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Ana Lima', email: 'ana@orayon.ai', role: 'admin', status: 'success', active: true, joined: '2024-01-15' },
  { id: '2', name: 'Bruno Costa', email: 'bruno@orayon.ai', role: 'clevel', status: 'success', active: true, joined: '2024-02-20' },
  { id: '3', name: 'Carla Dias', email: 'carla@orayon.ai', role: 'finance', status: 'warning', active: true, joined: '2024-03-10' },
  { id: '4', name: 'Diego Faria', email: 'diego@orayon.ai', role: 'marketing', status: 'error', active: false, joined: '2024-04-05' },
  { id: '5', name: 'Elena Rocha', email: 'elena@orayon.ai', role: 'admin', status: 'success', active: true, joined: '2024-05-01' },
  { id: '6', name: 'Felipe Melo', email: 'felipe@orayon.ai', role: 'finance', status: 'success', active: true, joined: '2024-05-12' },
  { id: '7', name: 'Gabriela Nunes', email: 'gabriela@orayon.ai', role: 'marketing', status: 'warning', active: true, joined: '2024-06-03' },
  { id: '8', name: 'Hugo Pires', email: 'hugo@orayon.ai', role: 'clevel', status: 'success', active: false, joined: '2024-06-18' },
]

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'clevel', label: 'C-Level' },
  { value: 'finance', label: 'Financeiro' },
  { value: 'marketing', label: 'Marketing' },
]

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Todos os status' },
  { value: 'success', label: 'Ativo' },
  { value: 'warning', label: 'Pendente' },
  { value: 'error', label: 'Inativo' },
]

const ITEMS_PER_PAGE = 5

type FormState = { name: string; email: string; role: Role; active: boolean }
const emptyForm: FormState = { name: '', email: '', role: 'marketing', active: true }

export default function AdminPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [users, setUsers] = useState<User[]>(INITIAL_USERS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)

  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deletingUser, setDeletingUser] = useState<User | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = users.filter((u) => {
    const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === '' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  function openCreate() {
    setEditingUser(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  function openEdit(user: User) {
    setEditingUser(user)
    setForm({ name: user.name, email: user.email, role: user.role, active: user.active })
    setModalOpen(true)
  }

  function openDelete(user: User) {
    setDeletingUser(user)
    setDeleteOpen(true)
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === editingUser.id
              ? { ...u, ...form, status: form.active ? 'success' : 'error' }
              : u
          )
        )
        toast.success(`${form.name} atualizado com sucesso.`)
      } else {
        const newUser: User = {
          id: String(Date.now()),
          ...form,
          status: form.active ? 'success' : 'error',
          joined: new Date().toISOString().split('T')[0],
        }
        setUsers((prev) => [newUser, ...prev])
        toast.success(`${form.name} criado com sucesso.`)
      }
      setSaving(false)
      setModalOpen(false)
    }, 800)
  }

  function handleDelete() {
    if (!deletingUser) return
    setDeleting(true)
    setTimeout(() => {
      setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id))
      toast.error(`${deletingUser.name} removido.`)
      setDeleting(false)
      setDeleteOpen(false)
    }, 600)
  }

  const columns: DataTableColumn<User>[] = [
    {
      key: 'name',
      header: 'Usuário',
      cell: (u) => (
        <div className="flex items-center gap-2.5">
          <Avatar name={u.name} size="xs" />
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">{u.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{u.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Papel',
      cell: (u) => <RoleBadge role={u.role} />,
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      cell: (u) => (
        <StatusBadge
          status={u.status}
          label={u.status === 'success' ? 'Ativo' : u.status === 'warning' ? 'Pendente' : 'Inativo'}
        />
      ),
    },
    {
      key: 'joined',
      header: 'Entrada',
      sortValue: (u) => u.joined,
      cell: (u) => <span className="text-sm text-[var(--text-muted)]">{formatDate(u.joined)}</span>,
    },
    {
      key: 'actions',
      header: '',
      align: 'right',
      cell: (u) => (
        <div className="flex items-center justify-end gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(u) }}
            className="rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[rgba(148,163,184,0.5)] transition-all duration-[150ms] hover:border hover:border-[rgba(168,85,247,0.2)] hover:bg-[rgba(168,85,247,0.08)] hover:text-[#c084fc]"
            aria-label={`Editar ${u.name}`}
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); openDelete(u) }}
            className="rounded-[var(--radius-sm)] px-2 py-1 text-xs text-[rgba(148,163,184,0.5)] transition-all duration-[150ms] hover:border hover:border-[rgba(239,68,68,0.18)] hover:bg-[rgba(239,68,68,0.08)] hover:text-[#f87171]"
            aria-label={`Deletar ${u.name}`}
          >
            <Trash2 size={13} />
          </button>
        </div>
      ),
    },
  ]

  const sidebarSections = [
    {
      title: 'Principal',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={15} /> },
        { id: 'admin', label: 'Usuários', icon: <Users size={15} /> },
      ],
    },
    {
      title: 'Conta',
      items: [
        { id: 'settings', label: 'Configurações', icon: <Settings size={15} /> },
      ],
    },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">

      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)] px-5" style={{ zIndex: 'var(--z-sticky)' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-[var(--text-primary)]">Athenos</p>
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Admin Panel</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          activeId="admin"
          onNavigate={(id) => {
            if (id === 'dashboard') router.push('/dashboard')
            if (id === 'settings') router.push('/settings')
          }}
          sections={sidebarSections}
          footer={
            <button
              onClick={() => router.push('/components')}
              className="w-full text-left px-1 text-[10px] text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] transition-colors"
            >
              ← Ver componentes
            </button>
          }
        />

        <main className="flex flex-1 flex-col overflow-hidden">

          {/* Section header */}
          <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-canvas)]/80 px-8 py-5 backdrop-blur-sm">
            <PageHeader
              title="Usuários"
              description={`${users.length} usuários cadastrados`}
              actions={
                <Button size="sm" variant="primary" onClick={openCreate}>
                  <UserPlus size={13} />
                  Novo usuário
                </Button>
              }
            />
          </div>

          <ScrollArea className="flex-1 p-8">
            <div className="mx-auto max-w-5xl space-y-4">

              {/* Toolbar */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1">
                  <SearchInput
                    value={search}
                    onChange={(v) => { setSearch(v); setPage(1) }}
                    placeholder="Buscar por nome ou e-mail..."
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    options={STATUS_FILTER_OPTIONS}
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
                  />
                </div>
              </div>

              {/* Table */}
              <DataTable
                data={paginated}
                columns={columns}
                keyExtractor={(u) => u.id}
                emptyMessage="Nenhum usuário encontrado."
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-end">
                  <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </div>
              )}
            </div>
          </ScrollArea>
        </main>
      </div>

      {/* Create / Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Editar usuário' : 'Novo usuário'}
        description={editingUser ? `Editando dados de ${editingUser.name}.` : 'Preencha os dados do novo usuário.'}
        size="sm"
      >
        <div className="flex flex-col gap-4 pt-2">
          <Input
            label="Nome completo"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Ex: Gabriel Matheus"
          />
          <Input
            label="E-mail"
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="usuario@orayon.ai"
          />
          <Select
            label="Papel"
            options={ROLE_OPTIONS}
            value={form.role}
            onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Role }))}
          />
          <Switch
            checked={form.active}
            onChange={(v) => setForm((f) => ({ ...f, active: v }))}
            label="Usuário ativo"
            description="Usuários inativos não conseguem fazer login."
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" className="flex-1" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              isLoading={saving}
              onClick={handleSave}
              disabled={!form.name || !form.email}
            >
              {editingUser ? 'Salvar' : 'Criar usuário'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete ConfirmDialog */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Remover usuário"
        description={`Tem certeza que deseja remover ${deletingUser?.name}? Essa ação não pode ser desfeita.`}
        confirmLabel="Remover"
        variant="destructive"
        isLoading={deleting}
      />
    </div>
  )
}
