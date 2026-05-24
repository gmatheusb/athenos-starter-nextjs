'use client'

import { useState } from 'react'
import {
  Image, Video, Sparkles, Sun, Moon,
  Check, AlertCircle, Info, Bell, Search,
} from 'lucide-react'
import { Button }                    from '@/components/ui/Button'
import { Input }                     from '@/components/ui/Input'
import { Card, StatCard }            from '@/components/ui/Card'
import { RoleBadge, StatusBadge }    from '@/components/ui/Badge'
import { Alert }                     from '@/components/ui/Alert'
import { Navbar }                    from '@/components/layout/Navbar'
import { GlassBar }                  from '@/components/layout/GlassBar'
import { AuthOrbs }                  from '@/components/auth/AuthOrbs'
import { useTheme }                  from '@/hooks/useTheme'

/* ─────────────────────────────────────────────────────────────── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-dim)] mb-4">
        {title}
      </p>
      {children}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────── */

export default function ShowcasePage() {
  const { theme, toggleTheme } = useTheme()
  const [inputValue, setInputValue]   = useState('')
  const [inputError, setInputError]   = useState('')
  const [activeTab, setActiveTab]     = useState('all')
  const [loadingBtn, setLoadingBtn]   = useState(false)

  function simulateLoad() {
    setLoadingBtn(true)
    setTimeout(() => setLoadingBtn(false), 2000)
  }

  function validateInput(v: string) {
    setInputValue(v)
    setInputError(v.length > 0 && v.length < 4 ? 'Mínimo de 4 caracteres' : '')
  }

  const tabs = [
    { id: 'all',    label: 'Todos',   icon: Sparkles },
    { id: 'images', label: 'Imagens', icon: Image    },
    { id: 'videos', label: 'Vídeos',  icon: Video    },
  ]

  return (
    <div className="min-h-screen bg-canvas">
      {/* ── Navbar ── */}
      <Navbar pageTitle="Design System" showSearch />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <div className="mb-12" style={{ animation: 'fade-in-up 0.4s ease both' }}>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--grad)' }}
            >
              <Sparkles size={16} className="text-white" aria-hidden="true" />
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Athenos Design System v2.0
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[34px] font-bold tracking-[-0.5px] text-[var(--text-primary)] leading-tight">
            Starter Template
          </h1>
          <p className="mt-2 text-[15px] text-[var(--text-muted)] max-w-lg leading-relaxed">
            Tokens, componentes e padrões pré-configurados. Clone, instale e comece a construir.
          </p>
        </div>

        {/* ── Stat Cards ── */}
        <Section title="Métricas">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatCard value="48" label="Tokens CSS" />
            <StatCard value="11" label="Componentes" />
            <StatCard value="8" label="Templates" />
            <StatCard value="2" label="Temas" />
          </div>
        </Section>

        {/* ── Botões ── */}
        <Section title="Botões">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button variant="primary" onClick={simulateLoad} isLoading={loadingBtn}>
              <Sparkles size={14} aria-hidden="true" />
              Gerar imagem
            </Button>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="destructive">Excluir</Button>
            <Button variant="ghost">Mais opções</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="sm">
              <Image size={12} aria-hidden="true" />
              Pequeno
            </Button>
            <Button variant="secondary" size="sm">Secundário sm</Button>
            <Button variant="primary" disabled>Desabilitado</Button>
          </div>
        </Section>

        {/* ── Tabs ── */}
        <Section title="Navegação por tabs">
          <div className="flex gap-1 border-b border-[var(--border)] mb-4" role="tablist">
            {tabs.map(tab => (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium',
                  'border-b-2 -mb-px transition-all duration-fast',
                  activeTab === tab.id
                    ? 'border-[var(--acc-img)] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]',
                ].join(' ')}
              >
                <tab.icon size={13} aria-hidden="true" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {['Retratos', 'Paisagens', 'Abstrato', 'Arquitetura'].map(filter => {
              const active = filter === 'Retratos'
              return (
                <button
                  key={filter}
                  type="button"
                  className={[
                    'rounded-pill px-4 py-1.5 text-[13px] transition-all duration-fast',
                    active
                      ? 'font-semibold text-[var(--acc-img-mid)] bg-[var(--acc-img-soft)] border border-[var(--acc-img-border)]'
                      : 'font-normal text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)]',
                  ].join(' ')}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </Section>

        {/* ── Inputs ── */}
        <Section title="Formulário">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              leftIcon={<Search size={14} aria-hidden="true" />}
            />
            <Input
              label="Nome de usuário"
              placeholder="@usuario"
              value={inputValue}
              onChange={e => validateInput(e.target.value)}
              error={inputError}
              hint={!inputError ? 'Mínimo 4 caracteres' : undefined}
            />
            <Input label="Desabilitado" placeholder="Não editável" disabled />
          </div>
        </Section>

        {/* ── Badges ── */}
        <Section title="Badges e status">
          <div className="flex flex-wrap gap-3 mb-4">
            <RoleBadge role="admin" />
            <RoleBadge role="clevel" />
            <RoleBadge role="finance" />
            <RoleBadge role="marketing" />
          </div>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="success" label="Ativo" />
            <StatusBadge status="error"   label="Inativo" />
            <StatusBadge status="warning" label="Pendente" />
            <StatusBadge status="info"    label="Processando" />
          </div>
        </Section>

        {/* ── Alerts ── */}
        <Section title="Alertas">
          <div className="flex flex-col gap-3 max-w-xl">
            <Alert variant="success">Imagem gerada com sucesso e salva na galeria.</Alert>
            <Alert variant="error">Falha ao processar. Verifique sua conexão e tente novamente.</Alert>
            <Alert variant="warning">Limite de gerações próximo. Você tem 3 créditos restantes.</Alert>
            <Alert variant="info">Novo modelo disponível: Athenos Vision 3.0</Alert>
          </div>
        </Section>

        {/* ── Cards ── */}
        <Section title="Cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--acc-img-soft)', border: '1px solid var(--acc-img-border)' }}
                >
                  <Image size={13} className="text-[var(--acc-img)]" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">Imagens</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Contexto de imagem usa accent roxo em todos os elementos interativos.
              </p>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--acc-vid-soft)', border: '1px solid var(--acc-vid-border)' }}
                >
                  <Video size={13} className="text-[var(--acc-vid)]" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">Vídeos</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Contexto de vídeo usa accent pink. Nunca misturar os dois contextos.
              </p>
            </Card>
            <Card clickable>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--grad)' }}
                >
                  <Sparkles size={13} className="text-white" aria-hidden="true" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">Brand</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Degradê brand para elementos "Todos" ou CTAs globais. Card clicável.
              </p>
            </Card>
          </div>
        </Section>

        {/* ── Paleta de tokens ── */}
        <Section title="Tokens de cor">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'canvas',       bg: 'var(--bg-canvas)',      text: 'var(--text-primary)'   },
              { label: 'modal',        bg: 'var(--bg-modal)',        text: 'var(--text-primary)'   },
              { label: 'surface',      bg: 'var(--surface)',         text: 'var(--text-secondary)' },
              { label: 'surface-deep', bg: 'var(--surface-deep)',    text: 'var(--text-muted)'     },
              { label: 'acc-img',      bg: 'var(--acc-img)',         text: '#fff'                  },
              { label: 'acc-vid',      bg: 'var(--acc-vid)',         text: '#fff'                  },
              { label: 'success',      bg: 'var(--semantic-success)', text: '#fff'                  },
              { label: 'error',        bg: 'var(--semantic-error)',   text: '#fff'                  },
            ].map(token => (
              <div
                key={token.label}
                className="rounded-[var(--radius-md)] p-3 border border-[var(--border)]"
                style={{ background: token.bg }}
              >
                <p className="text-[10px] font-mono" style={{ color: token.text }}>
                  --{token.label}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Glass demo ── */}
        <Section title="Glass effect">
          <div className="relative h-32 rounded-xl overflow-hidden border border-[var(--border)]"
            style={{ background: 'var(--grad)' }}>
            <div
              className="absolute inset-4 rounded-lg flex items-center px-4"
              style={{
                background: 'var(--glass)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-sm font-medium text-[var(--text-primary)]">
                GlassBar sobre gradiente — backdrop-blur(24px)
              </p>
            </div>
          </div>
        </Section>

        {/* ── Footer ── */}
        <footer className="border-t border-[var(--border-subtle)] pt-8 mt-4 flex items-center justify-between">
          <p className="text-[11px] tracking-[0.05em] text-[var(--text-muted-dim)]">
            Athenos Design System v2.0 · Dual Theme
          </p>
          <button
            onClick={toggleTheme}
            type="button"
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
          >
            {theme === 'dark'
              ? <><Sun size={12} aria-hidden="true" /> Light</>
              : <><Moon size={12} aria-hidden="true" /> Dark</>
            }
          </button>
        </footer>

      </main>
    </div>
  )
}
