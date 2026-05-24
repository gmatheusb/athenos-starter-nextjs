'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Sun, Moon, Check,
  User, ArrowRight, ArrowLeft,
  Shield, LayoutDashboard,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { AuthOrbs } from '@/components/auth/AuthOrbs'
import { Stepper } from '@/components/ui/Stepper'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { RadioGroup } from '@/components/ui/Radio'
import { Switch } from '@/components/ui/Switch'
import { OTPInput } from '@/components/ui/OTPInput'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'account', label: 'Conta', description: 'Dados de acesso' },
  { id: 'profile', label: 'Perfil', description: 'Sobre você' },
  { id: 'plan', label: 'Plano', description: 'Escolha seu plano' },
  { id: 'verify', label: 'Verificação', description: 'Confirme o e-mail' },
]

const ROLE_OPTIONS = [
  { value: 'developer', label: 'Desenvolvedor', description: 'Frontend, Backend ou Full-stack' },
  { value: 'designer', label: 'Designer', description: 'UI/UX, Product Design' },
  { value: 'manager', label: 'Gerente / PO', description: 'Gestão de produto ou projetos' },
  { value: 'other', label: 'Outro', description: 'Outra área de atuação' },
]

const TEAM_OPTIONS = [
  { value: 'solo', label: 'Só eu', description: 'Individual ou freelancer' },
  { value: 'small', label: '2–10 pessoas', description: 'Startup ou time pequeno' },
  { value: 'medium', label: '11–50 pessoas', description: 'Empresa em crescimento' },
  { value: 'large', label: '50+ pessoas', description: 'Empresa estabelecida' },
]

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 'R$ 0',
    period: '/mês',
    features: ['5 projetos', '1 usuário', 'Componentes básicos'],
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 'R$ 49',
    period: '/mês',
    features: ['20 projetos', '3 usuários', 'Todos os componentes', 'Suporte por e-mail'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 129',
    period: '/mês',
    features: ['Projetos ilimitados', 'Usuários ilimitados', 'White-label', 'Suporte prioritário'],
    recommended: true,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [step, setStep] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [role, setRole] = useState('developer')
  const [team, setTeam] = useState('small')
  const [bio, setBio] = useState('')

  const [plan, setPlan] = useState('pro')
  const [notifUpdates, setNotifUpdates] = useState(true)
  const [notifMarketing, setNotifMarketing] = useState(false)

  const [otp, setOtp] = useState('')

  function canAdvance() {
    if (step === 0) return name.trim() !== '' && email.trim() !== '' && password.length >= 8 && password === confirmPassword
    if (step === 3) return otp.length === 6
    return true
  }

  function handleNext() {
    if (step === 0) {
      if (password !== confirmPassword) { setPasswordError('As senhas não coincidem.'); return }
      if (password.length < 8) { setPasswordError('Mínimo de 8 caracteres.'); return }
      setPasswordError('')
    }
    if (step < STEPS.length - 1) { setStep((s) => s + 1); return }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
    }, 1200)
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-[var(--bg-canvas)] px-4">
        <AuthOrbs />
        <div
          className="relative z-10 flex flex-col items-center gap-5 text-center"
          style={{ animation: 'fade-in-up 0.35s ease both' }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--semantic-success)]/20 bg-[var(--semantic-success)]/10">
            <Check size={28} className="text-[var(--semantic-success)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Tudo pronto, {name.split(' ')[0]}!
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Sua conta foi criada no plano{' '}
              <span className="font-semibold text-[var(--acc-img)]">
                {PLANS.find((p) => p.id === plan)?.name}
              </span>
              .
            </p>
          </div>
          <Button variant="primary" onClick={() => router.push('/dashboard')}>
            <LayoutDashboard size={14} />
            Ir para o dashboard
            <ArrowRight size={13} />
          </Button>
          <button
            onClick={() => router.push('/')}
            className="text-xs text-[var(--text-muted-dim)] transition-colors hover:text-[var(--text-muted)]"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    )
  }

  // ── Main wizard ───────────────────────────────────────────────────────────
  return (
    <div className="relative flex min-h-screen items-start justify-center bg-[var(--bg-canvas)] px-4 py-10">
      <AuthOrbs />

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        type="button"
        aria-label="Alternar tema"
        className="fixed right-4 top-4 z-20 rounded-[var(--radius-md)] p-2 text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)]"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-[520px] rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-lg"
        style={{ animation: 'fade-in-up 0.35s ease both' }}
      >
        {/* Logo + heading */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: 'var(--grad)' }}
          >
            <Sparkles size={18} className="text-white" aria-hidden="true" />
          </div>
          <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[var(--text-primary)]">
            Criar sua conta
          </h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            {STEPS[step].description}
          </p>
        </div>

        {/* Stepper */}
        <Stepper steps={STEPS} currentStep={step} orientation="horizontal" />

        {/* Step content */}
        <div className="mt-7">

          {/* Step 0 — Conta */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <Input
                label="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Gabriel Matheus"
                leftIcon={<User size={14} />}
              />
              <Input
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
              />
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setPasswordError('') }}
                placeholder="••••••••"
                hint="Mínimo de 8 caracteres"
              />
              <Input
                label="Confirmar senha"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setPasswordError('') }}
                placeholder="••••••••"
                error={passwordError}
              />
            </div>
          )}

          {/* Step 1 — Perfil */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <RadioGroup
                name="role"
                label="Área de atuação"
                options={ROLE_OPTIONS}
                value={role}
                onChange={setRole}
              />
              <RadioGroup
                name="team"
                label="Tamanho da equipe"
                options={TEAM_OPTIONS}
                value={team}
                onChange={setTeam}
              />
              <Textarea
                label="Bio (opcional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Fale um pouco sobre você ou seu projeto..."
                rows={2}
              />
            </div>
          )}

          {/* Step 2 — Plano */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={cn(
                      'relative w-full rounded-[var(--radius-lg)] border p-4 text-left transition-all duration-[150ms]',
                      plan === p.id
                        ? 'border-[var(--acc-img)] bg-[var(--acc-img-soft)]'
                        : 'border-[var(--border)] bg-[var(--surface-deep)] hover:bg-[var(--surface-hover)]',
                    )}
                  >
                    {p.recommended && (
                      <span className="absolute right-3 top-3 rounded-full bg-[var(--acc-img)] px-2 py-0.5 text-[10px] font-semibold text-white">
                        Recomendado
                      </span>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-bold text-[var(--text-primary)]">{p.price}</span>
                      <span className="text-xs text-[var(--text-muted)]">{p.period}</span>
                      <span className="ml-2 text-sm font-semibold text-[var(--text-primary)]">{p.name}</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                      {p.features.map((f) => (
                        <span key={f} className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                          <Check size={10} className="shrink-0 text-[var(--semantic-success)]" />
                          {f}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-deep)] p-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted-dim)]">
                  Notificações
                </p>
                <Switch checked={notifUpdates} onChange={setNotifUpdates} label="Novidades e lançamentos" />
                <Switch checked={notifMarketing} onChange={setNotifMarketing} label="Ofertas e promoções" />
              </div>
            </div>
          )}

          {/* Step 3 — Verificação */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--acc-img-soft)]">
                <Shield size={20} className="text-[var(--acc-img)]" />
              </div>
              <div>
                <p className="text-sm text-[var(--text-muted)]">
                  Enviamos um código de 6 dígitos para{' '}
                  <span className="font-medium text-[var(--text-primary)]">{email}</span>
                </p>
              </div>
              <OTPInput length={6} value={otp} onChange={setOtp} />
              <p className="text-[11px] text-[var(--text-muted-dim)]">
                Use <span className="font-mono text-[var(--acc-img)]">123456</span> para testar
              </p>
              <button
                type="button"
                className="text-xs text-[var(--acc-img)] transition-opacity hover:opacity-70"
                onClick={() => toast.info('Novo código enviado para ' + email)}
              >
                Reenviar código
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
          >
            <ArrowLeft size={13} />
            Voltar
          </Button>

          {/* Dot progress */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === step
                    ? 'h-1.5 w-5 bg-[var(--acc-img)]'
                    : i < step
                    ? 'h-1.5 w-1.5 bg-[var(--acc-img)]/40'
                    : 'h-1.5 w-1.5 bg-[var(--border-strong)]',
                )}
              />
            ))}
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleNext}
            isLoading={submitting}
            disabled={!canAdvance()}
          >
            {step === STEPS.length - 1 ? 'Criar conta' : 'Continuar'}
            {step < STEPS.length - 1 && <ArrowRight size={13} />}
          </Button>
        </div>
      </div>
    </div>
  )
}
