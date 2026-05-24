'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon, Layers, PenLine, Bell, Navigation, Database } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { BasicSection } from './_sections/BasicSection'
import { FormsSection } from './_sections/FormsSection'
import { FeedbackSection } from './_sections/FeedbackSection'
import { NavigationSection } from './_sections/NavigationSection'
import { DataSection } from './_sections/DataSection'
import type { LucideIcon } from 'lucide-react'

interface NavSection {
  id: string
  label: string
  icon: LucideIcon
  items: string[]
  component: React.ComponentType
}

const NAV: NavSection[] = [
  {
    id: 'basic',
    label: 'Básico',
    icon: Layers,
    items: ['Button', 'Alert', 'Avatar', 'AvatarGroup', 'Badge', 'Tag', 'Spinner', 'Progress', 'Skeleton', 'KbdShortcut', 'StatCard', 'CountUp', 'EmptyState', 'Card', 'Divider'],
    component: BasicSection,
  },
  {
    id: 'forms',
    label: 'Formulários',
    icon: PenLine,
    items: ['Input', 'Select', 'Textarea', 'Checkbox', 'Switch', 'RadioGroup', 'Slider', 'NumberInput', 'Rating', 'SearchInput', 'MaskInput', 'TimeInput', 'ColorPicker', 'OTPInput', 'TagInput', 'Combobox', 'MultiSelect', 'DatePicker', 'DateRangePicker', 'FileUpload'],
    component: FormsSection,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    icon: Bell,
    items: ['Banner', 'Callout', 'Toast', 'NotificationCenter', 'Modal', 'Drawer', 'ConfirmDialog'],
    component: FeedbackSection,
  },
  {
    id: 'navigation',
    label: 'Navegação',
    icon: Navigation,
    items: ['Tabs', 'Pagination', 'Breadcrumb', 'Stepper', 'Accordion', 'Collapsible', 'Tooltip', 'Popover', 'HoverCard', 'DropdownMenu', 'NavigationMenu', 'CommandPalette'],
    component: NavigationSection,
  },
  {
    id: 'data',
    label: 'Dados',
    icon: Database,
    items: ['PageHeader', 'DataTable', 'Timeline', 'CodeBlock', 'Carousel', 'VirtualList', 'ScrollArea', 'CopyButton'],
    component: DataSection,
  },
]

export default function ComponentsPage() {
  const [activeId, setActiveId] = useState('basic')
  const { theme, toggleTheme } = useTheme()

  const active = NAV.find((s) => s.id === activeId)!
  const ActiveSection = active.component
  const ActiveIcon = active.icon

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)] px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-[var(--text-primary)]">Athenos</p>
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Design System v2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)]">
              63 componentes
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)]">
              7 hooks
            </span>
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)]">
              3 utilitários
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="scroll-area flex w-60 shrink-0 flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-modal)]">

          {/* Categories */}
          <nav className="p-3">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
              Categorias
            </p>
            {NAV.map((section) => {
              const isActive = activeId === section.id
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveId(section.id)}
                  className={cn(
                    'mb-0.5 flex w-full items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                    isActive
                      ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                  )}
                >
                  <Icon size={15} className="shrink-0" />
                  <span className="flex-1 text-left">{section.label}</span>
                  <span className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums',
                    isActive
                      ? 'bg-[var(--acc-img)]/20 text-[var(--acc-img)]'
                      : 'bg-[var(--surface-deep)] text-[var(--text-muted-dim)]',
                  )}>
                    {section.items.length}
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Component list for active section */}
          <div className="mx-3 border-t border-[var(--border-subtle)] pt-3 pb-2">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
              {active.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {active.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2 py-1.5">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-[var(--acc-img)]/40" />
                  <span className="text-xs text-[var(--text-muted)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="mt-auto border-t border-[var(--border-subtle)] p-4">
            <p className="text-[10px] text-[var(--text-muted-dim)]">
              Next.js 16 · React 19 · TailwindCSS
            </p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {/* Section header */}
          <div className="flex shrink-0 items-center gap-3 border-b border-[var(--border)] bg-[var(--bg-canvas)]/80 px-8 py-4 backdrop-blur-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--acc-img)]/10">
              <ActiveIcon size={15} className="text-[var(--acc-img)]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-[var(--text-primary)]">{active.label}</h1>
              <p className="text-xs text-[var(--text-muted)]">{active.items.length} componentes nesta categoria</p>
            </div>
          </div>

          <div className="scroll-area flex-1 overflow-y-auto p-8">
            <ActiveSection />
          </div>
        </main>

      </div>
    </div>
  )
}
