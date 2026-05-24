'use client'

import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, Users, Settings, Sun, Moon,
  DollarSign, ShoppingCart, TrendingUp, Percent, Plus, Sparkles,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable'
import { Timeline } from '@/components/ui/Timeline'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge, RoleBadge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { formatDate, formatDateTime } from '@/lib/format'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'clevel' | 'finance' | 'marketing'
  status: 'success' | 'warning' | 'error'
  joined: string
  revenue: number
}

const USERS: User[] = [
  { id: '1', name: 'Ana Lima', email: 'ana@orayon.ai', role: 'admin', status: 'success', joined: '2024-01-15', revenue: 12400 },
  { id: '2', name: 'Bruno Costa', email: 'bruno@orayon.ai', role: 'clevel', status: 'success', joined: '2024-02-20', revenue: 9800 },
  { id: '3', name: 'Carla Dias', email: 'carla@orayon.ai', role: 'finance', status: 'warning', joined: '2024-03-10', revenue: 7200 },
  { id: '4', name: 'Diego Faria', email: 'diego@orayon.ai', role: 'marketing', status: 'error', joined: '2024-04-05', revenue: 5100 },
  { id: '5', name: 'Elena Rocha', email: 'elena@orayon.ai', role: 'admin', status: 'success', joined: '2024-05-01', revenue: 8900 },
  { id: '6', name: 'Felipe Melo', email: 'felipe@orayon.ai', role: 'finance', status: 'success', joined: '2024-05-12', revenue: 4920 },
]

const COLUMNS: DataTableColumn<User>[] = [
  {
    key: 'name',
    header: 'Usuário',
    searchValue: (u) => u.name,
    sortValue: (u) => u.name,
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
    sortValue: (u) => u.role,
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
]

const TIMELINE = [
  { id: 'e1', title: 'Deploy v2.4.1 em produção', timestamp: '14:32', variant: 'success' as const, description: 'Todos os serviços operacionais.' },
  { id: 'e2', title: 'Revisão de PR #142 aprovada', timestamp: '13:15', variant: 'info' as const, description: 'Mergeado na main com sucesso.' },
  { id: 'e3', title: 'Falha no job de CI', timestamp: '12:08', variant: 'error' as const, description: 'Testes falharam em 3 módulos.' },
  { id: 'e4', title: 'Sprint 14 iniciada', timestamp: '09:00', variant: 'default' as const },
]

export default function DashboardPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

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
          activeId="dashboard"
          onNavigate={(id) => {
            if (id === 'admin') router.push('/admin')
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
              title={`${greeting}, Gabriel`}
              description={formatDateTime(now)}
              actions={
                <Button size="sm" variant="primary">
                  <Plus size={13} />
                  Novo relatório
                </Button>
              }
            />
          </div>

          <ScrollArea className="flex-1 p-8">
            <div className="mx-auto max-w-5xl space-y-8">

              {/* StatCards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  value="R$ 48.320"
                  label="Receita mensal"
                  description="vs. mês anterior"
                  icon={<DollarSign size={16} />}
                  trend="up"
                  trendValue="+12.4%"
                />
                <StatCard
                  value="1.248"
                  label="Usuários ativos"
                  description="últimos 30 dias"
                  icon={<Users size={16} />}
                  trend="up"
                  trendValue="+8.2%"
                />
                <StatCard
                  value="342"
                  label="Pedidos no mês"
                  description="vs. mês anterior"
                  icon={<ShoppingCart size={16} />}
                  trend="down"
                  trendValue="-3.1%"
                />
                <StatCard
                  value="3.8%"
                  label="Taxa de conversão"
                  description="sem variação"
                  icon={<Percent size={16} />}
                  trend="neutral"
                  trendValue="0.0%"
                />
              </div>

              {/* Table + Timeline */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                    Usuários recentes
                  </p>
                  <DataTable
                    data={USERS}
                    columns={COLUMNS}
                    keyExtractor={(u) => u.id}
                    searchable
                    searchPlaceholder="Buscar usuário..."
                  />
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                    Atividade recente
                  </p>
                  <Timeline events={TIMELINE} />
                </div>
              </div>

            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
