'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon, Layers, PenLine, Bell, Navigation, Database, Zap, Wrench, BarChart2 } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Sidebar } from '@/components/layout/Sidebar'
import { Button } from '@/components/ui/Button'
import { Tag } from '@/components/ui/Tag'
import { PageHeader } from '@/components/ui/PageHeader'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { Divider } from '@/components/ui/Divider'
import { BasicSection } from './_sections/BasicSection'
import { FormsSection } from './_sections/FormsSection'
import { FeedbackSection } from './_sections/FeedbackSection'
import { NavigationSection } from './_sections/NavigationSection'
import { DataSection } from './_sections/DataSection'
import { HooksSection } from './_sections/HooksSection'
import { UtilsSection } from './_sections/UtilsSection'
import { ChartsSection } from './_sections/ChartsSection'
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
  {
    id: 'hooks',
    label: 'Hooks',
    icon: Zap,
    items: ['useAsync', 'useDebounce', 'useInterval', 'useLocalStorage', 'useMediaQuery', 'useOnClickOutside', 'useKeyboard'],
    component: HooksSection,
  },
  {
    id: 'utils',
    label: 'Utilitários',
    icon: Wrench,
    items: ['format — Números', 'format — Datas', 'format — Strings', 'dates — Cálculos', 'validators — CPF & CNPJ', 'validators — Contato'],
    component: UtilsSection,
  },
  {
    id: 'charts',
    label: 'Charts',
    icon: BarChart2,
    items: ['BarChart — Vertical', 'BarChart — Horizontal', 'LineChart — Usuários ativos', 'LineChart — Requisições/hora', 'DonutChart — Receita', 'DonutChart — Planos'],
    component: ChartsSection,
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
        subitems: s.items.map((name) => ({ id: `item-${name}`, label: name })),
      })),
    },
  ]

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[var(--bg-canvas)]">

      {/* Header — usa Button e Tag do design system */}
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
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Design System v2.0</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1.5 sm:flex">
            <Tag label="63 componentes" variant="default" />
            <Tag label="9 hooks" variant="default" />
            <Tag label="3 utilitários" variant="default" />
          </div>

          <Divider orientation="vertical" className="mx-1 hidden h-5 sm:block" />

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
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

          {/* Section header — usa PageHeader do design system */}
          <div className="shrink-0 border-b border-[var(--border)] bg-[var(--bg-canvas)]/80 px-8 py-5 backdrop-blur-sm">
            <PageHeader
              title={active.label}
              description={`${active.items.length} ${active.id === 'hooks' ? 'hooks' : active.id === 'utils' ? 'módulos de utilitários' : active.id === 'charts' ? 'tipos de gráfico' : 'componentes'} nesta categoria`}
              actions={
                <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--acc-img)]/10">
                  <ActiveIcon size={15} className="text-[var(--acc-img)]" />
                </div>
              }
            />
          </div>

          {/* Scroll area — usa ScrollArea do design system */}
          <ScrollArea className="flex-1 p-8">
            <ActiveSection />
          </ScrollArea>

        </main>
      </div>
    </div>
  )
}
