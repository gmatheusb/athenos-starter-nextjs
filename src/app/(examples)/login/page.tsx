'use client'

import { useState } from 'react'
import { Sparkles, Sun, Moon, Mail, Lock } from 'lucide-react'
import { AuthOrbs } from '@/components/auth/AuthOrbs'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { useTheme } from '@/hooks/useTheme'

export default function LoginPage() {
  const { theme, toggleTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Preencha todos os campos.')
      return
    }

    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setIsLoading(false)
    setError('Credenciais inválidas. Verifique seu e-mail e senha.')
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--bg-canvas)] px-4">
      <AuthOrbs />

      <button
        onClick={toggleTheme}
        type="button"
        aria-label="Alternar tema"
        className="fixed top-4 right-4 z-10 p-2 rounded-[var(--radius-md)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-colors duration-fast"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      <div
        className="relative z-10 w-full max-w-[380px] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg"
        style={{ animation: 'fade-in-up 0.35s ease both' }}
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--grad)' }}
          >
            <Sparkles size={18} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[var(--text-primary)]">
            Bem-vindo de volta
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            Entre com suas credenciais
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {error && <Alert variant="error">{error}</Alert>}

          <Input
            label="E-mail"
            type="email"
            placeholder="voce@exemplo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={14} />}
          />

          <div className="flex flex-col gap-1.5">
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={14} />}
            />
            <div className="flex justify-end">
              <a
                href="#"
                className="text-xs text-[var(--acc-img)] hover:underline"
              >
                Esqueceu a senha?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="mt-1 w-full"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-[11px] text-[var(--text-muted-dim)]">
          Acesso restrito a membros autorizados
        </p>
      </div>
    </div>
  )
}
