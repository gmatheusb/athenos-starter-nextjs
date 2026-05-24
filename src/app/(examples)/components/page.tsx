'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { BasicSection } from './_sections/BasicSection'
import { FormsSection } from './_sections/FormsSection'
import { FeedbackSection } from './_sections/FeedbackSection'
import { NavigationSection } from './_sections/NavigationSection'
import { DataSection } from './_sections/DataSection'

const TABS = [
  { id: 'basic',      label: 'Básico',      count: 14 },
  { id: 'forms',      label: 'Formulários', count: 20 },
  { id: 'feedback',   label: 'Feedback',    count: 7  },
  { id: 'navigation', label: 'Navegação',   count: 12 },
  { id: 'data',       label: 'Dados',       count: 8  },
]

const SECTIONS: Record<string, React.ComponentType> = {
  basic:      BasicSection,
  forms:      FormsSection,
  feedback:   FeedbackSection,
  navigation: NavigationSection,
  data:       DataSection,
}

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState('basic')
  const { theme, toggleTheme } = useTheme()
  const ActiveSection = SECTIONS[activeTab]

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-modal)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--acc-img)]/10">
              <Sparkles size={14} className="text-[var(--acc-img)]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[var(--text-primary)]">Athenos</span>
              <span className="text-xs text-[var(--text-muted)]">Component Showcase</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted-dim)]">
              63 componentes · 7 hooks · 3 módulos
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Alternar tema"
              className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>

        {/* Tab strip */}
        <div className="mx-auto max-w-7xl border-t border-[var(--border-subtle)] px-6">
          <div className="flex gap-0.5 py-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors duration-150',
                  activeTab === tab.id
                    ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]'
                    : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                ].join(' ')}
              >
                {tab.label}
                <span className={[
                  'rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                  activeTab === tab.id
                    ? 'bg-[var(--acc-img)]/15 text-[var(--acc-img)]'
                    : 'bg-[var(--surface-deep)] text-[var(--text-muted-dim)]',
                ].join(' ')}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        <ActiveSection />
      </main>
    </div>
  )
}
