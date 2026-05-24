'use client'

import { ShowcaseBlock } from './ShowcaseBlock'
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable'
import { Timeline } from '@/components/ui/Timeline'
import { Carousel } from '@/components/ui/Carousel'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { VirtualList } from '@/components/ui/VirtualList'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { PageHeader } from '@/components/ui/PageHeader'
import { CopyButton } from '@/components/ui/CopyButton'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/ui/Badge'
import { RoleBadge } from '@/components/ui/Badge'
import { Plus } from 'lucide-react'

interface User { id: string; name: string; email: string; role: 'admin' | 'clevel' | 'finance' | 'marketing'; status: 'success' | 'warning' | 'error'; joined: string }

const USERS: User[] = [
  { id: '1', name: 'Ana Lima', email: 'ana@orayon.ai', role: 'admin', status: 'success', joined: '2024-01-15' },
  { id: '2', name: 'Bruno Costa', email: 'bruno@orayon.ai', role: 'clevel', status: 'success', joined: '2024-02-20' },
  { id: '3', name: 'Carla Dias', email: 'carla@orayon.ai', role: 'finance', status: 'warning', joined: '2024-03-10' },
  { id: '4', name: 'Diego Faria', email: 'diego@orayon.ai', role: 'marketing', status: 'error', joined: '2024-04-05' },
  { id: '5', name: 'Elena Rocha', email: 'elena@orayon.ai', role: 'admin', status: 'success', joined: '2024-05-01' },
]

const COLUMNS: DataTableColumn<User>[] = [
  {
    key: 'name',
    header: 'Usuário',
    searchValue: u => u.name,
    sortValue: u => u.name,
    cell: u => (
      <div className="flex items-center gap-2">
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
    sortValue: u => u.role,
    cell: u => <RoleBadge role={u.role} />,
  },
  {
    key: 'status',
    header: 'Status',
    align: 'center',
    cell: u => <StatusBadge status={u.status} label={u.status === 'success' ? 'Ativo' : u.status === 'warning' ? 'Pendente' : 'Inativo'} />,
  },
  {
    key: 'joined',
    header: 'Entrada',
    sortValue: u => u.joined,
    cell: u => <span className="text-sm text-[var(--text-muted)]">{u.joined}</span>,
  },
]

const TIMELINE_EVENTS = [
  { id: 'e1', title: 'Deploy v2.4.1 em produção', timestamp: '14:32', variant: 'success' as const, description: 'Todos os serviços operacionais.' },
  { id: 'e2', title: 'Revisão de código aprovada', timestamp: '13:15', variant: 'info' as const, description: 'PR #142 mergeado na main.' },
  { id: 'e3', title: 'Falha no job de CI', timestamp: '12:08', variant: 'error' as const, description: 'Testes falharam em 3 módulos.' },
  { id: 'e4', title: 'Sprint 14 iniciada', timestamp: '09:00', variant: 'default' as const },
]

const CODE_EXAMPLE = `import { Button, DataTable, useToast } from '@/components/ui'
import { useDebounce, useAsync } from '@/hooks'
import { formatCurrency, isValidCPF } from '@/lib'

export function UserList() {
  const { toast } = useToast()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 300)

  return <DataTable data={users} columns={columns} searchable />
}`

const VIRTUAL_ITEMS = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  label: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 1000),
}))

export function DataSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="PageHeader" description="Cabeçalho de página com breadcrumb e ações" wide>
        <PageHeader
          title="Usuários"
          description="Gerencie os membros da plataforma"
          breadcrumb={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Usuários' }]}
          actions={<Button size="sm"><Plus size={14} className="mr-1.5 inline" />Novo usuário</Button>}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="DataTable" description="Tabela com sort e busca integrados" wide>
        <DataTable
          data={USERS}
          columns={COLUMNS}
          keyExtractor={u => u.id}
          searchable
          searchPlaceholder="Buscar por nome..."
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="Timeline" description="Histórico de eventos">
        <Timeline events={TIMELINE_EVENTS} />
      </ShowcaseBlock>

      <ShowcaseBlock title="CodeBlock" description="Código com syntax highlight e cópia">
        <CodeBlock code={CODE_EXAMPLE} language="TypeScript" showLineNumbers />
      </ShowcaseBlock>

      <ShowcaseBlock title="Carousel" description="Slides com navegação e dots" wide>
        <Carousel
          showDots
          showArrows
          items={[
            <div key={1} className="flex h-40 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-purple-500 to-pink-500">
              <p className="text-lg font-bold text-white">Slide 1 — Design System</p>
            </div>,
            <div key={2} className="flex h-40 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-blue-500 to-cyan-500">
              <p className="text-lg font-bold text-white">Slide 2 — 63 Componentes</p>
            </div>,
            <div key={3} className="flex h-40 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-green-500 to-teal-500">
              <p className="text-lg font-bold text-white">Slide 3 — Dual Theme</p>
            </div>,
          ]}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="VirtualList" description="10.000 itens com renderização virtualizada">
        <VirtualList
          items={VIRTUAL_ITEMS}
          itemHeight={44}
          containerHeight={220}
          keyExtractor={item => String(item.id)}
          renderItem={(item) => (
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-3 py-2.5 text-sm">
              <span className="text-[var(--text-secondary)]">{item.label}</span>
              <span className="font-mono text-xs text-[var(--text-muted)]">{item.value}</span>
            </div>
          )}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="ScrollArea & CopyButton">
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium text-[var(--text-muted)]">ScrollArea com conteúdo longo</p>
          <ScrollArea className="h-28 rounded-[var(--radius-md)] border border-[var(--border)] p-3">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i} className="py-0.5 text-sm text-[var(--text-muted)]">Linha {i + 1} — conteúdo que ultrapassa a altura do container</p>
            ))}
          </ScrollArea>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-xs font-medium text-[var(--text-muted)]">CopyButton</p>
          <div className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5">
            <code className="text-xs text-[var(--text-secondary)]">npm install athenos-starter</code>
            <CopyButton text="npm install athenos-starter" />
          </div>
        </div>
      </ShowcaseBlock>

    </div>
  )
}
