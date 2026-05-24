'use client'

import { ShowcaseBlock } from './ShowcaseBlock'
import { BarChart } from '@/components/ui/BarChart'
import { LineChart } from '@/components/ui/LineChart'
import { DonutChart } from '@/components/ui/DonutChart'

const MONTHLY_REVENUE = [
  { label: 'Jan', value: 32400 },
  { label: 'Fev', value: 28900 },
  { label: 'Mar', value: 41200 },
  { label: 'Abr', value: 38700 },
  { label: 'Mai', value: 47100 },
  { label: 'Jun', value: 48320 },
]

const CATEGORY_SALES = [
  { label: 'Studio', value: 18420, color: 'var(--acc-img)' },
  { label: 'Academy', value: 12800, color: '#8b5cf6' },
  { label: 'API', value: 9600, color: 'var(--acc-vid)' },
  { label: 'Outros', value: 5200, color: 'var(--semantic-info)' },
  { label: 'Afiliados', value: 2300, color: 'var(--semantic-success)' },
]

const WEEKLY_USERS = [
  { label: 'Seg', value: 840 },
  { label: 'Ter', value: 920 },
  { label: 'Qua', value: 1100 },
  { label: 'Qui', value: 980 },
  { label: 'Sex', value: 1248 },
  { label: 'Sáb', value: 740 },
  { label: 'Dom', value: 610 },
]

const DAILY_REQUESTS = [
  { label: '00h', value: 120 },
  { label: '04h', value: 48 },
  { label: '08h', value: 380 },
  { label: '12h', value: 740 },
  { label: '16h', value: 920 },
  { label: '20h', value: 560 },
  { label: '23h', value: 210 },
]

const REVENUE_SEGMENTS = [
  { label: 'Studio', value: 48, color: 'var(--acc-img)' },
  { label: 'Academy', value: 27, color: '#8b5cf6' },
  { label: 'API', value: 18, color: 'var(--acc-vid)' },
  { label: 'Outros', value: 7, color: 'var(--semantic-info)' },
]

const PLAN_SEGMENTS = [
  { label: 'Pro', value: 52, color: 'var(--acc-img)' },
  { label: 'Starter', value: 30, color: 'var(--semantic-info)' },
  { label: 'Free', value: 18, color: 'var(--border-strong)' },
]

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="BarChart — Vertical" description="Receita mensal com animação de entrada">
        <BarChart
          data={MONTHLY_REVENUE}
          height={160}
          unit=""
          showValues
        />
        <p className="mt-2 text-[10px] text-[var(--text-muted-dim)]">
          Valores em R$ · Anima na montagem do componente
        </p>
      </ShowcaseBlock>

      <ShowcaseBlock title="BarChart — Horizontal" description="Vendas por categoria com cor por barra">
        <BarChart
          data={CATEGORY_SALES}
          orientation="horizontal"
          showValues
          unit=""
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="LineChart — Usuários ativos" description="Série temporal com área preenchida e grid">
        <LineChart
          data={WEEKLY_USERS}
          height={160}
          showArea
          showGrid
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="LineChart — Requisições/hora" description="Pico às 16h · cor var(--acc-vid)">
        <LineChart
          data={DAILY_REQUESTS}
          height={160}
          color="var(--acc-vid)"
          showArea
          showGrid
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="DonutChart — Receita" description="Distribuição por produto com legenda">
        <div className="flex justify-center py-2">
          <DonutChart
            segments={REVENUE_SEGMENTS}
            size={160}
            thickness={24}
            label="R$48k"
            sublabel="total/mês"
          />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="DonutChart — Planos" description="Distribuição de assinantes por plano">
        <div className="flex justify-center py-2">
          <DonutChart
            segments={PLAN_SEGMENTS}
            size={160}
            thickness={24}
            label="1.248"
            sublabel="usuários"
          />
        </div>
      </ShowcaseBlock>

    </div>
  )
}
