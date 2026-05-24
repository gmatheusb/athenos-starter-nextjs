'use client'

import { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ShowcaseBlock } from './ShowcaseBlock'
import { useAsync } from '@/hooks/useAsync'
import { useDebounce } from '@/hooks/useDebounce'
import { useInterval } from '@/hooks/useInterval'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Spinner } from '@/components/ui/Spinner'
import { KbdShortcut } from '@/components/ui/KbdShortcut'

const mockFetch = (): Promise<{ name: string; email: string }> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      Math.random() > 0.3
        ? resolve({ name: 'Gabriel M.', email: 'dev@orayon.ai' })
        : reject(new Error('Falha ao carregar dados'))
    }, 1500)
  )

export function HooksSection() {
  const { data, loading, error, execute, reset } = useAsync(mockFetch)

  const [searchInput, setSearchInput] = useState('')
  const debounced = useDebounce(searchInput, 500)

  const [count, setCount] = useState(0)
  const [running, setRunning] = useState(false)
  useInterval(() => setCount((c) => c + 1), running ? 1000 : null)

  const [stored, setStored, removeStored] = useLocalStorage('showcase-name', '')
  const [localInput, setLocalInput] = useState(stored)

  const isSm = useMediaQuery('sm')
  const isMd = useMediaQuery('md')
  const isLg = useMediaQuery('lg')
  const isXl = useMediaQuery('xl')

  const panelRef = useRef<HTMLDivElement>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  useOnClickOutside(panelRef, () => setPanelOpen(false), panelOpen)

  const [kbdCount, setKbdCount] = useState(0)
  useKeyboard('k', () => setKbdCount((n) => n + 1), {
    modifiers: ['ctrl', 'shift'],
    preventDefault: true,
  })

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

      <ShowcaseBlock title="useAsync" description="Estado de operações assíncronas com loading, erro e reset">
        <div className="flex flex-col gap-3">
          {!data && !loading && !error && (
            <p className="text-sm text-[var(--text-muted)]">30% de chance de erro simulado</p>
          )}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <Spinner size="sm" /> Carregando...
            </div>
          )}
          {error && (
            <p className="rounded-[var(--radius-md)] bg-[var(--semantic-error)]/10 px-3 py-2 text-sm text-[var(--semantic-error)]">
              {error.message}
            </p>
          )}
          {data && (
            <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-deep)] p-3 text-sm">
              <p className="font-semibold text-[var(--text-primary)]">{data.name}</p>
              <p className="text-[var(--text-muted)]">{data.email}</p>
            </div>
          )}
          <div className="flex gap-2">
            <Button size="sm" isLoading={loading} onClick={() => execute()}>
              Buscar dados
            </Button>
            {(data || error) && (
              <Button size="sm" variant="ghost" onClick={reset}>Resetar</Button>
            )}
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="useDebounce" description="Adia a atualização do valor por 500ms">
        <div className="flex flex-col gap-3">
          <Input
            label="Digite algo"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Digitar para debounce..."
          />
          <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-deep)] px-3 py-2 text-sm">
            <span className="text-[var(--text-muted)]">Valor debounced</span>
            <span className="font-mono text-[var(--acc-img)]">{debounced || '—'}</span>
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="useInterval" description="setInterval declarativo — delay: null pausa">
        <div className="flex items-center gap-6">
          <p className="text-5xl font-bold tabular-nums text-[var(--text-primary)]">{count}</p>
          <div className="flex flex-col gap-2">
            <Button size="sm" variant={running ? 'ghost' : 'primary'} onClick={() => setRunning((r) => !r)}>
              {running ? 'Pausar' : 'Iniciar'}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => { setRunning(false); setCount(0) }}>
              Resetar
            </Button>
          </div>
        </div>
        <p className="mt-3 text-xs text-[var(--text-muted)]">
          delay: <span className="font-mono">{running ? '1000' : 'null'}</span>
        </p>
      </ShowcaseBlock>

      <ShowcaseBlock title="useLocalStorage" description="Estado persistido — recarregue a página para confirmar">
        <div className="flex flex-col gap-3">
          <Input
            label="Nome (chave: showcase-name)"
            value={localInput}
            onChange={(e) => { setLocalInput(e.target.value); setStored(e.target.value) }}
            placeholder="Digite e recarregue a página..."
          />
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span>Armazenado: <span className="font-mono text-[var(--acc-img)]">{stored || '—'}</span></span>
            <button
              className="text-[var(--semantic-error)] transition-opacity hover:opacity-70"
              onClick={() => { removeStored(); setLocalInput('') }}
            >
              Limpar
            </button>
          </div>
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="useMediaQuery" description="Breakpoints do Tailwind em tempo real">
        <div className="grid grid-cols-4 gap-2">
          {([
            { label: 'sm', value: isSm, min: '640px' },
            { label: 'md', value: isMd, min: '768px' },
            { label: 'lg', value: isLg, min: '1024px' },
            { label: 'xl', value: isXl, min: '1280px' },
          ] as const).map((bp) => (
            <div
              key={bp.label}
              className={cn(
                'flex flex-col items-center gap-1 rounded-[var(--radius-md)] border p-3 transition-colors',
                bp.value
                  ? 'border-[var(--acc-img)] bg-[rgba(168,85,247,0.08)]'
                  : 'border-[var(--border)] bg-[var(--surface-deep)]',
              )}
            >
              <span className={cn('font-mono text-sm font-bold', bp.value ? 'text-[var(--acc-img)]' : 'text-[var(--text-muted)]')}>
                {bp.label}
              </span>
              <span className="text-[10px] text-[var(--text-muted-dim)]">≥{bp.min}</span>
              <span className={cn('text-[10px] font-semibold', bp.value ? 'text-[var(--semantic-success)]' : 'text-[var(--text-muted-dim)]')}>
                {bp.value ? 'ativo' : 'inativo'}
              </span>
            </div>
          ))}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="useOnClickOutside" description="Fecha ao clicar fora do elemento referenciado">
        <div className="flex flex-col gap-3">
          {!panelOpen && (
            <Button size="sm" variant="secondary" onClick={() => setPanelOpen(true)}>
              Abrir painel
            </Button>
          )}
          {panelOpen && (
            <div ref={panelRef} className="rounded-[var(--radius-lg)] border border-[var(--acc-img)] bg-[var(--surface)] p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">Painel aberto</p>
              <p className="mt-1 text-xs text-[var(--text-muted)]">Clique fora deste card para fechar.</p>
            </div>
          )}
          {!panelOpen && (
            <p className="text-xs text-[var(--text-muted)]">Painel fechado pelo useOnClickOutside</p>
          )}
        </div>
      </ShowcaseBlock>

      <ShowcaseBlock title="useKeyboard" description="Atalhos globais com modificadores" wide>
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[var(--text-muted)]">Pressione o atalho abaixo:</p>
            <KbdShortcut keys={['Ctrl', 'Shift', 'K']} />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-4xl font-bold tabular-nums text-[var(--acc-img)]">{kbdCount}</p>
            <p className="text-xs text-[var(--text-muted)]">vezes acionado</p>
          </div>
          {kbdCount > 0 && (
            <Button size="sm" variant="ghost" onClick={() => setKbdCount(0)}>Resetar</Button>
          )}
        </div>
      </ShowcaseBlock>

    </div>
  )
}
