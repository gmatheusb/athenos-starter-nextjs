'use client'

import Link from 'next/link'
import {
  Sparkles, Sun, Moon,
  Layers, Zap, Wrench, Palette, Code2, Shield,
  ArrowRight, LayoutDashboard, LogIn, UserPlus,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { AuthOrbs } from '@/components/auth/AuthOrbs'

const FEATURES = [
  {
    icon: Layers,
    title: '63 componentes',
    description: 'Button, Modal, DataTable, DatePicker, CommandPalette e mais — prontos para produção.',
    accent: 'var(--acc-img)',
  },
  {
    icon: Zap,
    title: '9 hooks customizados',
    description: 'useAsync, useDebounce, useLocalStorage, useKeyboard e outros. Exportados de @/hooks.',
    accent: 'var(--acc-img)',
  },
  {
    icon: Wrench,
    title: '3 módulos utilitários',
    description: 'format, validators e dates — 39 funções utilitárias prontas, com locale pt-BR.',
    accent: 'var(--acc-img)',
  },
  {
    icon: Palette,
    title: 'Dual theme',
    description: 'Dark e light via CSS Custom Properties. Toggle sem flash — persistido em localStorage.',
    accent: 'var(--acc-vid)',
  },
  {
    icon: Code2,
    title: 'Next.js 16 + TypeScript',
    description: 'App Router, Turbopack, React 19 e tipagem estrita. Zero config para começar.',
    accent: 'var(--acc-vid)',
  },
  {
    icon: Shield,
    title: 'Acessibilidade',
    description: 'Focus visible, aria-labels, roles semânticos e navegação por teclado em todos os componentes.',
    accent: 'var(--acc-vid)',
  },
]

const STACK = [
  { name: 'Next.js', version: '16.2' },
  { name: 'React', version: '19' },
  { name: 'TypeScript', version: '5' },
  { name: 'TailwindCSS', version: '3.4' },
  { name: 'Lucide', version: '0.441' },
]

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--bg-canvas)]">

      {/* Background orbs */}
      <AuthOrbs />

      {/* Header */}
      <header className="relative sticky top-0 z-[var(--z-sticky)] flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/80 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">Athenos</span>
          <Tag label="v2.0" variant="default" />
        </div>

        <div className="flex items-center gap-2">
          <Link href="/components" className="hidden text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors sm:block">
            Componentes
          </Link>
          <Link href="/dashboard" className="hidden text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors sm:block">
            Dashboard
          </Link>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center px-4 pb-16 pt-24 text-center">
        <div className="mb-4 flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--semantic-success)]" />
          <span className="text-xs text-[var(--text-muted)]">Next.js 16 · React 19 · TypeScript 5</span>
        </div>

        <h1 className="max-w-2xl text-[42px] font-black leading-[1.1] tracking-[-1.5px] text-[var(--text-primary)] sm:text-[56px]">
          Design System pronto
          <span className="block bg-gradient-to-r from-[var(--acc-img)] to-[var(--acc-vid)] bg-clip-text text-transparent">
            para produção.
          </span>
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[var(--text-muted)]">
          63 componentes, 9 hooks e 3 módulos de utilitários. Clone, instale e comece a construir.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/components">
            <Button variant="primary" size="sm">
              <Layers size={14} />
              Ver componentes
              <ArrowRight size={13} />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              <LayoutDashboard size={14} />
              Ver dashboard
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">
              <LogIn size={14} />
              Ver login
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button variant="ghost" size="sm">
              <UserPlus size={14} />
              Onboarding
            </Button>
          </Link>
        </div>

        {/* Install command */}
        <div className="mt-8 flex items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-deep)] px-4 py-2.5">
          <span className="select-none text-xs text-[var(--text-muted-dim)]">$</span>
          <code className="text-xs text-[var(--acc-img)]">
            git clone https://github.com/gmatheusb/athenos-starter-nextjs.git
          </code>
        </div>
      </section>

      {/* Features grid */}
      <section className="relative mx-auto max-w-4xl px-4 pb-20">
        <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted-dim)]">
          Tudo incluído
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors hover:bg-[var(--surface-hover)]"
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)]"
                style={{ background: `color-mix(in srgb, ${f.accent} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${f.accent} 25%, transparent)` }}
              >
                <f.icon size={15} style={{ color: f.accent }} />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-[var(--text-primary)]">{f.title}</h3>
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack strip */}
      <section className="border-t border-[var(--border)] bg-[var(--surface-deep)] py-6">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4">
          {STACK.map((s) => (
            <div key={s.name} className="flex items-baseline gap-1.5">
              <span className="text-sm font-semibold text-[var(--text-primary)]">{s.name}</span>
              <span className="text-xs text-[var(--text-muted-dim)]">{s.version}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <p className="text-[11px] text-[var(--text-muted-dim)]">
            Athenos Design System v2.0 · MIT License
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
            <Link href="/components" className="hover:text-[var(--text-primary)] transition-colors">Componentes</Link>
            <Link href="/dashboard" className="hover:text-[var(--text-primary)] transition-colors">Dashboard</Link>
            <Link href="/admin" className="hover:text-[var(--text-primary)] transition-colors">Admin</Link>
            <Link href="/settings" className="hover:text-[var(--text-primary)] transition-colors">Settings</Link>
            <Link href="/login" className="hover:text-[var(--text-primary)] transition-colors">Login</Link>
            <Link href="/onboarding" className="hover:text-[var(--text-primary)] transition-colors">Onboarding</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
