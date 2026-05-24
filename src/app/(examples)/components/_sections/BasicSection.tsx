'use client'

import { ShowcaseBlock } from './ShowcaseBlock'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Avatar } from '@/components/ui/Avatar'
import { AvatarGroup } from '@/components/ui/AvatarGroup'
import { Spinner } from '@/components/ui/Spinner'
import { Progress } from '@/components/ui/Progress'
import { Tag } from '@/components/ui/Tag'
import { RoleBadge, StatusBadge } from '@/components/ui/Badge'
import { Divider } from '@/components/ui/Divider'
import { Skeleton } from '@/components/ui/Skeleton'
import { KbdShortcut } from '@/components/ui/KbdShortcut'
import { StatCard } from '@/components/ui/StatCard'
import { CountUp } from '@/components/ui/CountUp'
import { EmptyState } from '@/components/ui/EmptyState'
import { Card } from '@/components/ui/Card'
import { Sparkles, Users, DollarSign, TrendingUp, Inbox } from 'lucide-react'

export function BasicSection() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="Button" description="Variantes, tamanhos e estados">
        <div className="flex flex-wrap gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost" disabled>Outline</Button>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">sm</Button>
          <Button size="md">md</Button>
        </div>
        <Divider className="my-4" />
        <div className="flex flex-wrap gap-2">
          <Button isLoading>Carregando</Button>
          <Button disabled>Desabilitado</Button>
          <Button><Sparkles size={14} className="mr-1.5 inline" />Com ícone</Button>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Alert" description="Feedback contextual inline">
        <div className="flex flex-col gap-2">
          <Alert variant="success">Operação realizada com sucesso.</Alert>
          <Alert variant="error">Erro ao processar a solicitação.</Alert>
          <Alert variant="warning">Atenção: dados incompletos.</Alert>
          <Alert variant="info">Atualização disponível na versão 2.1.</Alert>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Avatar & AvatarGroup">
        <div className="flex flex-wrap items-end gap-4">
          <Avatar name="Gabriel Matheusberg" size="xs" />
          <Avatar name="Gabriel Matheusberg" size="sm" />
          <Avatar name="Gabriel Matheusberg" size="md" />
          <Avatar name="Gabriel Matheusberg" size="lg" />
          <Avatar name="Gabriel Matheusberg" size="xl" />
        </div>
        <Divider className="my-4" />
        <AvatarGroup
          size="md"
          avatars={[
            { name: 'Ana Lima' },
            { name: 'Bruno Costa' },
            { name: 'Carla Dias' },
            { name: 'Diego Faria' },
            { name: 'Elena Rocha' },
            { name: 'Felipe Neto' },
          ]}
          max={4}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="Badge">
        <div className="mb-3 flex flex-wrap gap-2">
          <RoleBadge role="admin" />
          <RoleBadge role="clevel" />
          <RoleBadge role="finance" />
          <RoleBadge role="marketing" />
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="success" label="Ativo" />
          <StatusBadge status="error" label="Inativo" />
          <StatusBadge status="warning" label="Pendente" />
          <StatusBadge status="info" label="Revisão" />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Tag" description="Chips com variantes e remoção">
        <div className="flex flex-wrap gap-2">
          <Tag label="Default" variant="default" />
          <Tag label="Success" variant="success" />
          <Tag label="Error" variant="error" />
          <Tag label="Warning" variant="warning" />
          <Tag label="Info" variant="info" />
          <Tag label="Img" variant="img" />
          <Tag label="Vid" variant="vid" />
          <Tag label="Removível" variant="info" onRemove={() => {}} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Spinner & Progress">
        <div className="mb-4 flex items-center gap-4">
          <Spinner size="xs" />
          <Spinner size="sm" />
          <Spinner size="md" />
          <Spinner size="lg" />
        </div>
        <div className="flex flex-col gap-2">
          <Progress value={30} label="Progresso" showValue />
          <Progress value={65} variant="success" />
          <Progress value={85} variant="error" />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="StatCard" description="Métricas de dashboard">
        <div className="grid grid-cols-2 gap-3">
          <StatCard value="R$ 48.290" label="Receita" trend="up" trendValue="+12%" description="vs. mês anterior" icon={<DollarSign size={15} />} />
          <StatCard value="1.284" label="Usuários" trend="down" trendValue="-3%" description="vs. semana anterior" icon={<Users size={15} />} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="CountUp" description="Contador animado">
        <div className="flex items-end gap-8">
          <div className="text-center">
            <CountUp to={48290} from={0} duration={1800} prefix="R$ " className="text-3xl font-bold text-[var(--text-primary)]" />
            <p className="mt-1 text-xs text-[var(--text-muted)]">Receita total</p>
          </div>
          <div className="text-center">
            <CountUp to={99.8} decimals={1} suffix="%" className="text-3xl font-bold text-[var(--semantic-success)]" />
            <p className="mt-1 text-xs text-[var(--text-muted)]">Uptime</p>
          </div>
          <div className="text-center">
            <CountUp to={1284} className="text-3xl font-bold text-[var(--acc-img)]" />
            <p className="mt-1 text-xs text-[var(--text-muted)]">Usuários</p>
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Skeleton" description="Estado de carregamento">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={40} height={40} />
            <div className="flex-1">
              <Skeleton variant="line" lines={2} />
            </div>
          </div>
          <Skeleton variant="block" height={80} />
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="KbdShortcut & Divider">
        <div className="mb-4 flex flex-wrap items-center gap-4">
          <KbdShortcut keys={['⌘', 'K']} />
          <KbdShortcut keys={['Ctrl', 'S']} />
          <KbdShortcut keys={['⌘', 'Shift', 'P']} />
          <KbdShortcut keys={['Esc']} size="sm" />
        </div>
        <Divider label="ou" />
      </ShowcaseBlock>

      <ShowcaseBlock title="EmptyState" wide>
        <EmptyState
          icon={<Inbox size={28} />}
          title="Nenhum resultado encontrado"
          description="Tente ajustar os filtros ou criar um novo item para começar."
          action={{ label: 'Criar item', onClick: () => {} }}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="Card" description="Variantes de superfície" wide>
        <div className="grid grid-cols-3 gap-3">
          <Card><p className="text-sm text-[var(--text-muted)]">Card default</p></Card>
          <Card variant="stat"><p className="text-sm text-[var(--text-muted)]">Card stat</p></Card>
          <Card><p className="text-sm text-[var(--text-muted)] opacity-50">Card ghost</p></Card>
        </div>
      </ShowcaseBlock>

    </div>
  )
}
