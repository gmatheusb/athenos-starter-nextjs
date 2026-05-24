'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Sun, Moon, UserPlus, MessageSquare,
  GitCommit, GitPullRequest, GitMerge, Star, Zap,
  Globe, Twitter, Github,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { Avatar } from '@/components/ui/Avatar'
import { AvatarGroup } from '@/components/ui/AvatarGroup'
import { Tag } from '@/components/ui/Tag'
import { Tabs } from '@/components/ui/Tabs'
import { Timeline } from '@/components/ui/Timeline'
import { Card } from '@/components/ui/Card'
import { Carousel } from '@/components/ui/Carousel'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { StatusBadge } from '@/components/ui/Badge'

const PROFILE = {
  name: 'Gabriel Matheus',
  username: '@gmatheus',
  role: 'Frontend Engineer',
  bio: 'Construindo sistemas de design e interfaces de alta performance. Obcecado com tipografia, tokens de design e experiências fluidas.',
  location: 'São Paulo, Brasil',
  website: 'athenos.dev',
  twitter: '@gmatheusb',
  github: 'gmatheusb',
  stats: { projects: 24, followers: 1_248, following: 89 },
}

const ACTIVITY = [
  { id: 'a1', title: 'Push para feat/kanban-board', description: '3 commits · +284 −42 linhas', timestamp: 'há 2h', variant: 'info' as const, icon: <GitCommit size={13} /> },
  { id: 'a2', title: 'PR #144 aberto', description: 'feat: add Kanban page example', timestamp: 'há 3h', variant: 'default' as const, icon: <GitPullRequest size={13} /> },
  { id: 'a3', title: 'PR #142 mergeado', description: 'feat: add Charts (BarChart, LineChart, DonutChart)', timestamp: 'ontem', variant: 'success' as const, icon: <GitMerge size={13} /> },
  { id: 'a4', title: 'Release v2.0 publicada', description: '63 componentes · 9 hooks · 3 módulos utilitários', timestamp: '3 dias atrás', variant: 'success' as const, icon: <Star size={13} /> },
  { id: 'a5', title: 'PR #138 mergeado', description: 'feat: add Analytics and Pricing pages', timestamp: '4 dias atrás', variant: 'success' as const, icon: <GitMerge size={13} /> },
  { id: 'a6', title: 'Sprint 15 iniciada', description: '24 tasks · 2 semanas', timestamp: '5 dias atrás', variant: 'default' as const, icon: <Zap size={13} /> },
]

const PROJECTS = [
  { id: 'p1', name: 'Athenos Design System', desc: 'Sistema de design completo com 63 componentes, dual theme e utilitários.', status: 'success' as const, statusLabel: 'Ativo', lang: 'TypeScript', stars: 1248 },
  { id: 'p2', name: 'Orayon Studio', desc: 'Plataforma de edição de vídeo colaborativa com IA integrada.', status: 'warning' as const, statusLabel: 'Beta', lang: 'Next.js', stars: 384 },
  { id: 'p3', name: 'Horizon CLI', desc: 'Ferramenta CLI para scaffolding de projetos Next.js com opiniões fortes.', status: 'success' as const, statusLabel: 'Ativo', lang: 'Node.js', stars: 207 },
  { id: 'p4', name: 'DataFlow', desc: 'Visualizações interativas de dados com React e SVG puro.', status: 'error' as const, statusLabel: 'Arquivado', lang: 'React', stars: 93 },
]

const SKILLS = ['TypeScript', 'React', 'Next.js', 'TailwindCSS', 'Design Systems', 'SVG', 'Acessibilidade', 'Node.js', 'Figma']

const COLLABORATORS = [
  { name: 'Ana Lima' },
  { name: 'Bruno Costa' },
  { name: 'Carla Dias' },
  { name: 'Diego Faria' },
  { name: 'Elena Rocha' },
]

const PROFILE_TABS = [
  { id: 'activity', label: 'Atividade' },
  { id: 'projects', label: 'Projetos' },
  { id: 'about', label: 'Sobre' },
]

const CAROUSEL_ITEMS = PROJECTS.map((p) => (
  <div
    key={p.id}
    className="flex h-40 flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-deep)] p-5"
  >
    <div>
      <p className="text-sm font-semibold text-[var(--text-primary)]">{p.name}</p>
      <p className="mt-1 text-xs leading-relaxed text-[var(--text-muted)]">{p.desc}</p>
    </div>
    <div className="flex items-center gap-2">
      <Tag label={p.lang} variant="default" />
      <span className="flex items-center gap-1 text-xs text-[var(--text-muted-dim)]">
        <Star size={11} />
        {p.stars.toLocaleString('pt-BR')}
      </span>
    </div>
  </div>
))

export default function ProfilePage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('activity')
  const [following, setFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">

      {/* Header */}
      <header className="sticky top-0 z-[var(--z-sticky)] flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/90 px-6 backdrop-blur-sm">
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          aria-label="Voltar"
        >
          <ArrowLeft size={16} />
        </button>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </header>

      {/* Cover */}
      <div
        className="h-36 w-full"
        style={{ background: 'var(--grad)' }}
        aria-hidden="true"
      />

      {/* Profile card */}
      <div className="mx-auto max-w-3xl px-4">
        <div className="-mt-12 flex items-end justify-between gap-4 pb-5">
          <div className="relative">
            <Avatar name={PROFILE.name} size="lg" className="ring-4 ring-[var(--bg-canvas)]" />
          </div>
          <div className="flex items-center gap-2 pb-1">
            <Button
              variant={following ? 'secondary' : 'primary'}
              size="sm"
              onClick={() => {
                setFollowing((f) => !f)
                toast.success(following ? 'Deixou de seguir' : 'Seguindo!')
              }}
            >
              <UserPlus size={13} />
              {following ? 'Seguindo' : 'Seguir'}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toast.info('Mensagem enviada!')}
            >
              <MessageSquare size={13} />
              Mensagem
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="pb-5">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{PROFILE.name}</h1>
          <p className="text-sm text-[var(--text-muted)]">{PROFILE.username} · {PROFILE.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{PROFILE.bio}</p>

          {/* Links */}
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-[var(--text-muted-dim)]">
            <span className="flex items-center gap-1">
              <Globe size={12} />
              {PROFILE.website}
            </span>
            <span className="flex items-center gap-1">
              <Twitter size={12} />
              {PROFILE.twitter}
            </span>
            <span className="flex items-center gap-1">
              <Github size={12} />
              {PROFILE.github}
            </span>
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-5">
            {Object.entries(PROFILE.stats).map(([key, val]) => (
              <div key={key}>
                <span className="text-sm font-bold text-[var(--text-primary)]">{val.toLocaleString('pt-BR')}</span>
                <span className="ml-1 text-xs text-[var(--text-muted)] capitalize">{key}</span>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Tabs */}
        <Tabs
          tabs={PROFILE_TABS}
          active={activeTab}
          onChange={setActiveTab}
          variant="underline"
          className="mt-1"
        />

        {/* Tab content */}
        <div className="py-6">

          {/* Atividade */}
          {activeTab === 'activity' && (
            <Timeline events={ACTIVITY} />
          )}

          {/* Projetos */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <Carousel items={CAROUSEL_ITEMS} showDots showArrows />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PROJECTS.map((p) => (
                  <Card key={p.id} className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{p.name}</p>
                      <StatusBadge status={p.status} label={p.statusLabel} />
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-muted)]">{p.desc}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <Tag label={p.lang} variant="default" />
                      <span className="flex items-center gap-1 text-xs text-[var(--text-muted-dim)]">
                        <Star size={11} />
                        {p.stars.toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Sobre */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                  Bio
                </p>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                  Desenvolvedor frontend com foco em design systems e acessibilidade. Trabalho com React e Next.js há mais de 4 anos,
                  construindo interfaces escaláveis com atenção obsessiva a tipografia, espaçamento e tokens de design.
                  Acredito que boas ferramentas elevam toda a equipe — por isso construo e compartilho componentes abertos.
                </p>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                  Tecnologias
                </p>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Tag key={skill} label={skill} variant="default" />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                  Colaboradores
                </p>
                <div className="flex items-center gap-3">
                  <AvatarGroup avatars={COLLABORATORS} max={5} size="sm" />
                  <span className="text-xs text-[var(--text-muted)]">
                    {COLLABORATORS.length} colaboradores ativos
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
