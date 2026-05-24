'use client'

import { useState } from 'react'
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

interface NavbarProps {
  pageTitle?: string
  showSearch?: boolean
}

export function Navbar({ pageTitle, showSearch = true }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)]',
        'flex items-center justify-between gap-4',
        'h-[56px] px-4 lg:px-6',
        'bg-[var(--glass)]',
        'backdrop-blur-[24px] [-webkit-backdrop-filter:blur(24px)]',
        'border-b border-[var(--border)]',
      )}
    >
      {/* ── Zona esquerda ── */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
          aria-label="Abrir menu"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          type="button"
        >
          <Menu size={18} aria-hidden="true" />
        </button>
        {pageTitle && (
          <h1 className="text-[17px] font-semibold tracking-[-0.2px] text-[var(--text-primary)] truncate lg:hidden">
            {pageTitle}
          </h1>
        )}
      </div>

      {/* ── Zona centro — Search ── */}
      {showSearch && (
        <div
          className={cn(
            'hidden lg:flex items-center gap-2',
            'rounded-[var(--radius-md)] px-3 py-1.5',
            'bg-[var(--surface-prompt)] border',
            'transition-all duration-base',
            searchFocused
              ? 'w-[320px] border-[var(--acc-img-border)] ring-2 ring-[var(--acc-img-soft)]'
              : 'w-[220px] border-[var(--border-input)]',
          )}
        >
          <Search size={14} className="shrink-0 text-[var(--text-muted-dim)]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Buscar..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] placeholder:opacity-60 outline-none"
          />
        </div>
      )}

      {/* ── Zona direita — Actions ── */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button
          aria-label="Notificações"
          type="button"
          className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
        >
          <Bell size={16} aria-hidden="true" />
        </button>

        <button
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
        >
          {theme === 'dark'
            ? <Sun size={15} aria-hidden="true" />
            : <Moon size={15} aria-hidden="true" />
          }
        </button>

        {/* Avatar placeholder */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
          aria-label="Avatar do usuário"
        >
          U
        </div>
      </div>
    </header>
  )
}
