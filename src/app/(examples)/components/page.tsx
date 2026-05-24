'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/hooks/useTheme'
import { BasicSection } from './_sections/BasicSection'
import { FormsSection } from './_sections/FormsSection'
import { FeedbackSection } from './_sections/FeedbackSection'
import { NavigationSection } from './_sections/NavigationSection'
import { DataSection } from './_sections/DataSection'

const NAV = [
  {
    id: 'basic',
    label: 'Básico',
    items: ['Button', 'Alert', 'Avatar', 'AvatarGroup', 'Badge', 'Tag', 'Spinner', 'Progress', 'Skeleton', 'KbdShortcut', 'StatCard', 'CountUp', 'EmptyState', 'Card', 'Divider'],
    component: BasicSection,
  },
  {
    id: 'forms',
    label: 'Formulários',
    items: ['Input', 'Select', 'Textarea', 'Checkbox', 'Switch', 'RadioGroup', 'Slider', 'NumberInput', 'Rating', 'SearchInput', 'MaskInput', 'TimeInput', 'ColorPicker', 'OTPInput', 'TagInput', 'Combobox', 'MultiSelect', 'DatePicker', 'DateRangePicker', 'FileUpload'],
    component: FormsSection,
  },
  {
    id: 'feedback',
    label: 'Feedback',
    items: ['Banner', 'Callout', 'Toast', 'NotificationCenter', 'Modal', 'Drawer', 'ConfirmDialog'],
    component: FeedbackSection,
  },
  {
    id: 'navigation',
    label: 'Navegação',
    items: ['Tabs', 'Pagination', 'Breadcrumb', 'Stepper', 'Accordion', 'Collapsible', 'Tooltip', 'Popover', 'HoverCard', 'DropdownMenu', 'NavigationMenu', 'CommandPalette'],
    component: NavigationSection,
  },
  {
    id: 'data',
    label: 'Dados',
    items: ['PageHeader', 'DataTable', 'Timeline', 'CodeBlock', 'Carousel', 'VirtualList', 'ScrollArea', 'CopyButton'],
    component: DataSection,
  },
]

export default function ComponentsPage() {
  const [activeId, setActiveId] = useState('basic')
  const { theme, toggleTheme } = useTheme()

  const active = NAV.find((s) => s.id === activeId)!
  const ActiveSection = active.component

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">

      {/* Top header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/80 px-5 backdrop-blur-md" style={{ zIndex: 'var(--z-sticky)' }}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--acc-img)]/10">
            <Sparkles size={14} className="text-[var(--acc-img)]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-bold text-[var(--text-primary)]">Athenos</span>
            <span className="hidden text-xs text-[var(--text-muted)] sm:inline">Component Showcase</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-[var(--text-muted-dim)] md:inline">
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
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="scroll-area flex w-56 shrink-0 flex-col overflow-y-auto border-r border-[var(--border)] bg-[var(--bg-modal)]">
          <nav className="flex-1 p-2">
            {NAV.map((section) => {
              const isActive = activeId === section.id
              return (
                <div key={section.id} className="mb-1">
                  <button
                    type="button"
                    onClick={() => setActiveId(section.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-[var(--acc-img)]/10 text-[var(--acc-img)]'
                        : 'text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]',
                    )}
                  >
                    <span>{section.label}</span>
                    <span className={cn(
                      'rounded-full px-1.5 py-0.5 text-[9px] font-semibold',
                      isActive
                        ? 'bg-[var(--acc-img)]/15 text-[var(--acc-img)]'
                        : 'bg-[var(--surface-deep)] text-[var(--text-muted-dim)]',
                    )}>
                      {section.items.length}
                    </span>
                  </button>

                  {/* Component list */}
                  {isActive && (
                    <ul className="mt-1 mb-2 ml-3 border-l border-[var(--border-subtle)] pl-3">
                      {section.items.map((item) => (
                        <li key={item}>
                          <span className="block py-0.5 text-[11px] text-[var(--text-muted-dim)]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )
            })}
          </nav>

          <div className="border-t border-[var(--border-subtle)] p-3">
            <p className="text-[10px] text-[var(--text-muted-dim)]">Athenos Design System v2.0</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="scroll-area flex-1 overflow-y-auto p-8">
          <ActiveSection />
        </main>
      </div>
    </div>
  )
}
