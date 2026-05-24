'use client'

import { useState } from 'react'
import { ShowcaseBlock } from './ShowcaseBlock'
import { Tabs } from '@/components/ui/Tabs'
import { Pagination } from '@/components/ui/Pagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Stepper } from '@/components/ui/Stepper'
import { Accordion } from '@/components/ui/Accordion'
import { Collapsible } from '@/components/ui/Collapsible'
import { Tooltip } from '@/components/ui/Tooltip'
import { Popover } from '@/components/ui/Popover'
import { HoverCard } from '@/components/ui/HoverCard'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { NavigationMenu } from '@/components/ui/NavigationMenu'
import { CommandPalette } from '@/components/ui/CommandPalette'
import { Button } from '@/components/ui/Button'
import { KbdShortcut } from '@/components/ui/KbdShortcut'
import { Avatar } from '@/components/ui/Avatar'
import { LayoutDashboard, Users, Settings, FileText, MoreHorizontal, Edit, Trash2, Copy, LayoutGrid, Globe } from 'lucide-react'

const TABS_ITEMS = [
  { id: 'overview', label: 'Visão geral' },
  { id: 'activity', label: 'Atividade' },
  { id: 'settings', label: 'Configurações' },
  { id: 'billing', label: 'Cobrança' },
]

const STEPPER_STEPS = [
  { id: 'account', label: 'Conta', description: 'Dados básicos' },
  { id: 'profile', label: 'Perfil', description: 'Informações públicas' },
  { id: 'payment', label: 'Pagamento', description: 'Método de cobrança' },
  { id: 'confirm', label: 'Confirmar', description: 'Revisar e ativar' },
]

const ACCORDION_ITEMS = [
  { id: 'a1', title: 'O que é o Athenos Design System?', content: 'Um starter kit Next.js com sistema de design completo, dual-theme e mais de 60 componentes prontos para produção.' },
  { id: 'a2', title: 'Como customizar os tokens?', content: 'Edite as variáveis CSS em src/app/globals.css. Os tokens de light e dark são definidos em :root e .dark respectivamente.' },
  { id: 'a3', title: 'Posso usar sem o Tailwind?', content: 'Os componentes dependem do Tailwind para classes utilitárias. Remover o Tailwind exigiria reescrever os estilos dos componentes.' },
]

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', active: true },
  {
    label: 'Produtos',
    children: [
      { label: 'Catálogo', href: '/produtos', description: 'Todos os produtos cadastrados', icon: <LayoutGrid size={14} /> },
      { label: 'Categorias', href: '/categorias', description: 'Organização por grupos', icon: <FileText size={14} /> },
    ],
  },
  { label: 'Usuários', href: '/usuarios' },
  {
    label: 'Config',
    children: [
      { label: 'Geral', href: '/config', description: 'Preferências do sistema', icon: <Settings size={14} /> },
      { label: 'Integrações', href: '/integracoes', description: 'APIs e webhooks', icon: <Globe size={14} /> },
    ],
  },
]

export function NavigationSection() {
  const [activeTab, setActiveTab] = useState('overview')
  const [page, setPage] = useState(3)
  const [step, setStep] = useState(1)
  const [cmdOpen, setCmdOpen] = useState(false)

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="Tabs — variante underline" wide>
        <Tabs tabs={TABS_ITEMS} active={activeTab} onChange={setActiveTab} variant="underline" />
        <p className="mt-4 text-sm text-[var(--text-muted)]">Aba ativa: <strong>{activeTab}</strong></p>
      </ShowcaseBlock>

      <ShowcaseBlock title="Tabs — variante pill">
        <Tabs tabs={TABS_ITEMS.slice(0, 3)} active={activeTab} onChange={setActiveTab} variant="pill" />
      </ShowcaseBlock>

      <ShowcaseBlock title="Pagination">
        <Pagination page={page} totalPages={12} onChange={setPage} siblings={1} />
        <p className="mt-3 text-xs text-[var(--text-muted)]">Página {page} de 12</p>
      </ShowcaseBlock>

      <ShowcaseBlock title="Breadcrumb">
        <Breadcrumb items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Usuários', href: '/usuarios' },
          { label: 'Perfil' },
        ]} />
      </ShowcaseBlock>

      <ShowcaseBlock title="Stepper" wide>
        <Stepper steps={STEPPER_STEPS} currentStep={step} />
        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="ghost" disabled={step === 0} onClick={() => setStep(s => s - 1)}>Anterior</Button>
          <Button size="sm" disabled={step === STEPPER_STEPS.length - 1} onClick={() => setStep(s => s + 1)}>Próximo</Button>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="Accordion">
        <Accordion items={ACCORDION_ITEMS} single />
      </ShowcaseBlock>

      <ShowcaseBlock title="Collapsible">
        <Collapsible trigger="O que são tokens CSS?" defaultOpen>
          <p className="leading-relaxed">Tokens são variáveis CSS centralizadas que garantem consistência visual entre componentes e temas. No Athenos, todos os valores de cor, espaçamento e tipografia são definidos como tokens.</p>
        </Collapsible>
        <Collapsible trigger="Como funciona o dual-theme?">
          <p className="leading-relaxed">A classe .dark no elemento html alterna os valores dos tokens. O ThemeProvider gerencia isso via localStorage.</p>
        </Collapsible>
      </ShowcaseBlock>

      <ShowcaseBlock title="Tooltip, Popover & HoverCard">
        <div className="flex flex-wrap items-start gap-6">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-[var(--text-muted)]">Tooltip</p>
            <Tooltip content="Dica rápida" side="top">
              <Button size="sm" variant="secondary">Hover aqui</Button>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-[var(--text-muted)]">Popover</p>
            <Popover trigger={<Button size="sm" variant="secondary">Clique aqui</Button>} side="bottom" align="start">
              <div className="p-4">
                <p className="text-sm font-medium text-[var(--text-primary)]">Popover</p>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Overlay ancorado com conteúdo rico.</p>
              </div>
            </Popover>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-[var(--text-muted)]">HoverCard</p>
            <HoverCard
              trigger={<span className="cursor-pointer text-sm font-medium text-[var(--acc-img)] underline">@gabriel</span>}
              side="bottom"
            >
              <div className="flex items-center gap-3">
                <Avatar name="Gabriel M" size="md" />
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Gabriel Matheusberg</p>
                  <p className="text-xs text-[var(--text-muted)]">dev@orayon.ai</p>
                </div>
              </div>
            </HoverCard>
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="DropdownMenu">
        <DropdownMenu
          trigger={<Button variant="secondary">Ações <MoreHorizontal size={14} className="ml-1.5 inline" /></Button>}
          items={[
            { label: 'Editar', icon: <Edit size={13} />, onClick: () => {} },
            { label: 'Duplicar', icon: <Copy size={13} />, onClick: () => {} },
            { separator: true },
            { label: 'Excluir', icon: <Trash2 size={13} />, variant: 'destructive' as const, onClick: () => {} },
          ]}
        />
      </ShowcaseBlock>

      <ShowcaseBlock title="NavigationMenu" wide>
        <NavigationMenu items={NAV_ITEMS} />
      </ShowcaseBlock>

      <ShowcaseBlock title="CommandPalette" description="Busca global com ⌘K" wide>
        <div className="flex items-center gap-4">
          <Button variant="secondary" onClick={() => setCmdOpen(true)}>
            Abrir Command Palette
          </Button>
          <KbdShortcut keys={['⌘', 'K']} />
        </div>
        <CommandPalette
          open={cmdOpen}
          onOpenChange={setCmdOpen}
          placeholder="Buscar páginas, ações..."
          items={[
            { id: 'dashboard', label: 'Dashboard', group: 'Páginas', icon: <LayoutDashboard size={14} />, onSelect: () => setCmdOpen(false) },
            { id: 'users', label: 'Usuários', group: 'Páginas', icon: <Users size={14} />, onSelect: () => setCmdOpen(false) },
            { id: 'settings', label: 'Configurações', group: 'Páginas', icon: <Settings size={14} />, onSelect: () => setCmdOpen(false) },
          ]}
        />
      </ShowcaseBlock>

    </div>
  )
}
