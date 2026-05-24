'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  BarChart2, Sun, Moon, Download, Sparkles,
  DollarSign, Eye, TrendingUp, Zap,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageHeader } from '@/components/ui/PageHeader'
import { StatCard } from '@/components/ui/StatCard'
import { DataTable, type DataTableColumn } from '@/components/ui/DataTable'
import { BarChart } from '@/components/ui/BarChart'
import { LineChart } from '@/components/ui/LineChart'
import { DonutChart } from '@/components/ui/DonutChart'
import { DateRangePicker } from '@/components/ui/DateRangePicker'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { ScrollArea } from '@/components/ui/ScrollArea'

const MONTHLY_REVENUE = [
  { label: 'Jan', value: 32400 },
  { label: 'Fev', value: 28900 },
  { label: 'Mar', value: 41200 },
  { label: 'Abr', value: 38700 },
  { label: 'Mai', value: 47100 },
  { label: 'Jun', value: 48320 },
]

const DAILY_VISITORS = [
  { label: 'Seg', value: 2840 },
  { label: 'Ter', value: 3120 },
  { label: 'Qua', value: 2980 },
  { label: 'Qui', value: 3540 },
  { label: 'Sex', value: 4210 },
  { label: 'Sáb', value: 1890 },
  { label: 'Dom', value: 1420 },
]

const REVENUE_SEGMENTS = [
  { label: 'Studio', value: 48, color: 'var(--acc-img)' },
  { label: 'Academy', value: 27, color: '#8b5cf6' },
  { label: 'API', value: 18, color: 'var(--acc-vid)' },
  { label: 'Outros', value: 7, color: 'var(--semantic-info)' },
]

const CONVERSION_RATE = [
  { label: 'Seg', value: 3.2 },
  { label: 'Ter', value: 3.8 },
  { label: 'Qua', value: 4.1 },
  { label: 'Qui', value: 3.9 },
  { label: 'Sex', value: 4.5 },
  { label: 'Sáb', value: 3.1 },
  { label: 'Dom', value: 2.8 },
]

interface PageStat {
  id: string
  page: string
  visits: number
  avgTime: string
  bounce: string
}

const TOP_PAGES: PageStat[] = [
  { id: '1', page: '/dashboard', visits: 8420, avgTime: '4m 32s', bounce: '18%' },
  { id: '2', page: '/components', visits: 6180, avgTime: '7m 15s', bounce: '12%' },
  { id: '3', page: '/pricing', visits: 4920, avgTime: '2m 48s', bounce: '34%' },
  { id: '4', page: '/login', visits: 3840, avgTime: '1m 12s', bounce: '42%' },
  { id: '5', page: '/onboarding', visits: 2100, avgTime: '6m 20s', bounce: '9%' },
]

const PAGE_COLUMNS: DataTableColumn<PageStat>[] = [
  {
    key: 'page',
    header: 'Página',
    searchValue: (p) => p.page,
    sortValue: (p) => p.page,
    cell: (p) => (
      <span className="font-mono text-sm text-[var(--acc-img)]">{p.page}</span>
    ),
  },
  {
    key: 'visits',
    header: 'Visitas',
    align: 'right',
    sortValue: (p) => p.visits,
    cell: (p) => (
      <span className="text-sm font-medium text-[var(--text-primary)]">
        {p.visits.toLocaleString('pt-BR')}
      </span>
    ),
  },
  {
    key: 'avgTime',
    header: 'Tempo médio',
    align: 'center',
    cell: (p) => <span className="text-sm text-[var(--text-muted)]">{p.avgTime}</span>,
  },
  {
    key: 'bounce',
    header: 'Bounce',
    align: 'center',
    cell: (p) => <span className="text-sm text-[var(--text-muted)]">{p.bounce}</span>,
  },
]

export default function AnalyticsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [dateRange, setDateRange] = useState<{ start: string | null; end: string | null }>({
    start: '2024-06-17',
    end: '2024-06-23',
  })
  const [granularity, setGranularity] = useState('daily')

  const sidebarSections = [
    {
      title: 'Métricas',
      items: [
        { id: 'overview', label: 'Visão Geral', icon: <BarChart2 size={15} /> },
        { id: 'revenue', label: 'Receita', icon: <DollarSign size={15} /> },
        { id: 'traffic', label: 'Tráfego', icon: <Eye size={15} /> },
        { id: 'conversion', label: 'Conversão', icon: <TrendingUp size={15} /> },
      ],
    },
    {
      title: 'Relatórios',
      items: [
        { id: 'reports-export', label: 'Exportar', icon: <Download size={15} /> },
        { id: 'reports-schedule', label: 'Agendados', icon: <Zap size={15} /> },
      ],
    },
  ]

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
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Analytics</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        <Sidebar
          activeId="overview"
          onNavigate={(id) => {
            if (id === 'revenue') toast.info('Receita — em breve')
            if (id === 'traffic') toast.info('Tráfego — em breve')
            if (id === 'conversion') toast.info('Conversão — em breve')
            if (id === 'reports-export') toast.success('Relatório exportado!')
            if (id === 'reports-schedule') toast.info('Agendados — em breve')
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

        <main className="flex flex-1 flex-col overflow-hidden">

          <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-canvas)]/80 px-8 py-5 backdrop-blur-sm">
            <PageHeader
              title="Analytics"
              description="Visão geral de desempenho e métricas do produto"
              actions={
                <div className="flex flex-wrap items-center gap-2">
                  <DateRangePicker value={dateRange} onChange={setDateRange} />
                  <Select
                    value={granularity}
                    onChange={(e) => setGranularity(e.target.value)}
                    options={[
                      { value: 'daily', label: 'Diário' },
                      { value: 'weekly', label: 'Semanal' },
                      { value: 'monthly', label: 'Mensal' },
                    ]}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => toast.success('Relatório exportado com sucesso!')}
                  >
                    <Download size={13} />
                    Exportar
                  </Button>
                </div>
              }
            />
          </div>

          <ScrollArea className="flex-1 p-8">
            <div className="mx-auto max-w-5xl space-y-8">

              {/* StatCards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard
                  value="R$ 48.320"
                  label="Receita total"
                  description="vs. período anterior"
                  icon={<DollarSign size={16} />}
                  trend="up"
                  trendValue="+12.0%"
                />
                <StatCard
                  value="18.4k"
                  label="Visitantes únicos"
                  description="vs. período anterior"
                  icon={<Eye size={16} />}
                  trend="up"
                  trendValue="+23.1%"
                />
                <StatCard
                  value="3.8%"
                  label="Conversão"
                  description="vs. período anterior"
                  icon={<TrendingUp size={16} />}
                  trend="up"
                  trendValue="+0.4pp"
                />
                <StatCard
                  value="2.1%"
                  label="Churn rate"
                  description="vs. período anterior"
                  icon={<Zap size={16} />}
                  trend="down"
                  trendValue="-0.3pp"
                />
              </div>

              {/* Charts 2×2 */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Receita mensal</p>
                  <p className="mb-4 text-xs text-[var(--text-muted)]">Últimos 6 meses · em R$</p>
                  <BarChart data={MONTHLY_REVENUE} height={150} unit="" showValues />
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Visitantes únicos</p>
                  <p className="mb-4 text-xs text-[var(--text-muted)]">Por dia da semana</p>
                  <LineChart data={DAILY_VISITORS} height={150} showArea showGrid />
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Receita por produto</p>
                  <p className="mb-4 text-xs text-[var(--text-muted)]">Distribuição percentual</p>
                  <div className="flex justify-center py-2">
                    <DonutChart
                      segments={REVENUE_SEGMENTS}
                      size={150}
                      thickness={22}
                      label="R$48k"
                      sublabel="total"
                    />
                  </div>
                </div>

                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5">
                  <p className="mb-1 text-sm font-semibold text-[var(--text-primary)]">Taxa de conversão</p>
                  <p className="mb-4 text-xs text-[var(--text-muted)]">% diário · meta 4.0%</p>
                  <LineChart data={CONVERSION_RATE} height={150} color="var(--acc-vid)" showArea showGrid />
                </div>

              </div>

              {/* Top pages */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                  Páginas mais acessadas
                </p>
                <DataTable
                  data={TOP_PAGES}
                  columns={PAGE_COLUMNS}
                  keyExtractor={(p) => p.id}
                  searchable
                  searchPlaceholder="Buscar página..."
                />
              </div>

            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  )
}
