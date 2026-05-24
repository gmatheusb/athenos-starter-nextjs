'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, Sun, Moon, Bell, Check, CheckCheck, Trash2, X,
  GitCommit, ShieldAlert, Star, Zap, MessageSquare, AlertTriangle,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Tabs } from '@/components/ui/Tabs'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { cn } from '@/lib/utils'
import type { NotificationItem } from '@/components/ui/NotificationCenter'

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  { id: '1', title: 'Deploy v2.4.1 concluído', description: 'Todos os serviços estão operacionais em produção.', timestamp: 'há 5 min', read: false, variant: 'success', icon: <Zap size={14} /> },
  { id: '2', title: 'PR #142 aprovado', description: 'Gabriel Matheus aprovou sua pull request "feat: add Charts".', timestamp: 'há 23 min', read: false, variant: 'info', icon: <GitCommit size={14} /> },
  { id: '3', title: 'Falha no job de CI', description: 'Testes falharam em 3 módulos no branch feat/kanban.', timestamp: 'há 1h', read: false, variant: 'error', icon: <AlertTriangle size={14} /> },
  { id: '4', title: 'Nova menção em #design-system', description: '@gmatheus pode revisar o token --acc-vid?', timestamp: 'há 2h', read: false, variant: 'default', icon: <MessageSquare size={14} /> },
  { id: '5', title: 'Assinatura renovada', description: 'Seu plano Pro foi renovado com sucesso. Próxima cobrança: 24/06.', timestamp: 'há 3h', read: false, variant: 'success', icon: <Star size={14} /> },
  { id: '6', title: 'Alerta de segurança', description: 'Login detectado de um novo dispositivo em São Paulo, SP.', timestamp: 'há 5h', read: true, variant: 'warning', icon: <ShieldAlert size={14} /> },
  { id: '7', title: 'Novo comentário no PR #139', description: 'Ana Lima: "Ótima abordagem para o VirtualList!"', timestamp: 'há 6h', read: true, variant: 'info', icon: <MessageSquare size={14} /> },
  { id: '8', title: 'Sprint 15 iniciada', description: 'A equipe iniciou a sprint 15 com 24 tasks planejadas.', timestamp: 'ontem', read: true, variant: 'default', icon: <Zap size={14} /> },
  { id: '9', title: 'Dependências desatualizadas', description: '3 pacotes com vulnerabilidades conhecidas foram encontrados.', timestamp: 'ontem', read: true, variant: 'warning', icon: <AlertTriangle size={14} /> },
  { id: '10', title: 'Relatório semanal disponível', description: 'Seu relatório de analytics da semana 24 está pronto.', timestamp: '2 dias atrás', read: true, variant: 'default', icon: <Star size={14} /> },
  { id: '11', title: 'Menção em code review', description: '@gmatheus pode explicar o offset do DonutChart?', timestamp: '3 dias atrás', read: true, variant: 'default', icon: <MessageSquare size={14} /> },
  { id: '12', title: 'Backup concluído', description: 'Backup automático do banco de dados realizado com sucesso.', timestamp: '3 dias atrás', read: true, variant: 'success', icon: <Check size={14} /> },
]

const variantDot: Record<string, string> = {
  default: 'bg-[var(--acc-img)]',
  success: 'bg-[var(--semantic-success)]',
  error:   'bg-[var(--semantic-error)]',
  warning: 'bg-[var(--semantic-warning)]',
  info:    'bg-[var(--semantic-info)]',
}

const TABS = [
  { id: 'all', label: 'Todas' },
  { id: 'unread', label: 'Não lidas' },
  { id: 'mentions', label: 'Menções' },
  { id: 'system', label: 'Sistema' },
]

export default function InboxPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useLocalStorage<NotificationItem[]>(
    'inbox-notifications',
    INITIAL_NOTIFICATIONS,
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n))
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function dismiss(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  function clearAll() {
    setNotifications([])
  }

  const filtered = notifications.filter((n) => {
    if (activeTab === 'unread') return !n.read
    if (activeTab === 'mentions') return n.icon !== undefined && (n.title.toLowerCase().includes('menção') || n.description?.includes('@'))
    if (activeTab === 'system') return ['success', 'error', 'warning'].includes(n.variant ?? '')
    return true
  })

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">

      {/* Header */}
      <header className="sticky top-0 z-[var(--z-sticky)] flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/90 px-6 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
            aria-label="Voltar"
          >
            <ArrowLeft size={16} />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold text-[var(--text-primary)]">Inbox</h1>
            {unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--semantic-error)] px-1.5 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCheck size={13} />
              Marcar todas lidas
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 size={13} />
              Limpar
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-8">

        {/* Tabs */}
        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} variant="pill" className="mb-6" />

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<Bell size={28} />}
            title="Tudo em dia"
            description="Não há notificações nesta categoria."
          />
        ) : (
          <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)]">
            <ul>
              {filtered.map((notif, i) => {
                const variant = notif.variant ?? 'default'
                return (
                  <li
                    key={notif.id}
                    className={cn(
                      'group relative flex gap-4 px-5 py-4 transition-colors',
                      i < filtered.length - 1 && 'border-b border-[var(--border-subtle)]',
                      !notif.read && 'bg-[var(--acc-img)]/[0.03]',
                      'hover:bg-[var(--surface-hover)]',
                    )}
                  >
                    {/* Icon */}
                    <div className="relative mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-deep)]">
                      <span className="text-[var(--text-muted)]">{notif.icon ?? <Bell size={14} />}</span>
                      {!notif.read && (
                        <span
                          className={cn(
                            'absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--surface)]',
                            variantDot[variant],
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        'text-sm font-medium',
                        notif.read ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]',
                      )}>
                        {notif.title}
                      </p>
                      {notif.description && (
                        <p className="mt-0.5 text-xs leading-relaxed text-[var(--text-muted)]">
                          {notif.description}
                        </p>
                      )}
                      <p className="mt-1.5 text-[10px] text-[var(--text-muted-dim)]">{notif.timestamp}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 flex-col items-end gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                      {!notif.read && (
                        <button
                          type="button"
                          onClick={() => markRead(notif.id)}
                          title="Marcar como lida"
                          className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--semantic-success)]"
                        >
                          <Check size={13} />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => dismiss(notif.id)}
                        title="Remover"
                        className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--semantic-error)]"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
