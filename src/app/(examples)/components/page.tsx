'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon, Layers, PenLine, Bell, Navigation, Database } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Sidebar } from '@/components/layout/Sidebar'
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

  const sidebarSections = [
    {
      title: 'Categorias',
      items: NAV.map((s) => ({
        id: s.id,
        label: s.label,
        icon: <s.icon size={15} />,
        badge: s.items.length,
      })),
    },
    {
      title: active.label,
      items: active.items.map((name) => ({
        id: `item-${name}`,
        label: name,
        disabled: true,
      })),
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
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Design System v2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 sm:flex">
            {['63 componentes', '7 hooks', '3 utilitários'].map((label) => (
              <span
                key={label}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[10px] font-medium text-[var(--text-muted)]"
              >
                {label}
              </span>
            ))}
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

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar do design system */}
        <Sidebar
          activeId={activeId}
          onNavigate={(id) => { if (NAV.some((s) => s.id === id)) setActiveId(id) }}
          sections={sidebarSections}
          footer={
            <p className="text-[10px] text-[rgba(148,163,184,0.35)]">
              Next.js 16 · React 19 · TailwindCSS
            </p>
          }
        />

        {/* Content */}
        <main className="flex flex-1 flex-col overflow-hidden">
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
