'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sparkles, Sun, Moon, Check,
  User, Briefcase, Bell, Shield,
  ArrowRight, ArrowLeft, LayoutDashboard,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { Stepper } from '@/components/ui/Stepper'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { RadioGroup } from '@/components/ui/Radio'
import { Switch } from '@/components/ui/Switch'
import { OTPInput } from '@/components/ui/OTPInput'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const STEPS = [
  { id: 'account', label: 'Conta', description: 'Seus dados de acesso' },
  { id: 'profile', label: 'Perfil', description: 'Sobre você' },
  { id: 'plan', label: 'Plano', description: 'Escolha seu plano' },
  { id: 'verify', label: 'Verificação', description: 'Confirme seu e-mail' },
]

const ROLE_OPTIONS = [
  { value: 'developer', label: 'Desenvolvedor', description: 'Frontend, Backend ou Full-stack' },
  { value: 'designer', label: 'Designer', description: 'UI/UX, Product Design' },
  { value: 'manager', label: 'Gerente / PO', description: 'Gestão de produto ou projetos' },
  { value: 'other', label: 'Outro', description: 'Outra área de atuação' },
]

const TEAM_OPTIONS = [
  { value: 'solo', label: 'Só eu', description: 'Trabalho individual ou freelancer' },
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
    accent: 'var(--border)',
    accentSoft: 'var(--surface-deep)',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 'R$ 49',
    period: '/mês',
    features: ['20 projetos', '3 usuários', 'Todos os componentes', 'Suporte por e-mail'],
    accent: 'var(--semantic-info)',
    accentSoft: 'rgba(59,130,246,0.06)',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 'R$ 129',
    period: '/mês',
    features: ['Projetos ilimitados', 'Usuários ilimitados', 'White-label', 'Suporte prioritário'],
    accent: 'var(--acc-img)',
    accentSoft: 'var(--acc-img-soft)',
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

  // Step 0 — Conta
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // Step 1 — Perfil
  const [role, setRole] = useState('developer')
  const [team, setTeam] = useState('small')
  const [bio, setBio] = useState('')

  // Step 2 — Plano
  const [plan, setPlan] = useState('pro')
  const [notifUpdates, setNotifUpdates] = useState(true)
  const [notifMarketing, setNotifMarketing] = useState(false)

  // Step 3 — Verificação
  const [otp, setOtp] = useState('')

  function validateStep0() {
    if (!name || !email || !password || !confirmPassword) return false
    if (password !== confirmPassword) { setPasswordError('As senhas não coincidem.'); return false }
    if (password.length < 8) { setPasswordError('Mínimo de 8 caracteres.'); return false }
    setPasswordError('')
    return true
  }

  function canAdvance() {
    if (step === 0) return name.trim() !== '' && email.trim() !== '' && password.length >= 8 && password === confirmPassword
    if (step === 3) return otp.length === 6
    return true
  }

  function handleNext() {
    if (step === 0 && !validateStep0()) return
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1)
      return
    }
    // Last step: verify OTP
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setDone(true)
      toast.success('Conta criada com sucesso! Bem-vindo ao Athenos.')
    }, 1200)
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--bg-canvas)] px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--semantic-success)]/10">
          <Check size={28} className="text-[var(--semantic-success)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Tudo pronto, {name.split(' ')[0]}!</h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Sua conta foi criada no plano {PLANS.find(p => p.id === plan)?.name}. Vamos começar?
          </p>
        </div>
        <Button variant="primary" onClick={() => router.push('/dashboard')}>
          <LayoutDashboard size={14} />
          Ir para o dashboard
          <ArrowRight size={13} />
        </Button>
        <button
          onClick={() => router.push('/')}
          className="text-xs text-[var(--text-muted-dim)] hover:text-[var(--text-muted)] transition-colors"
        >
          Voltar ao início
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">

      {/* Header */}
      <header className="sticky top-0 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)]/80 px-6 backdrop-blur-sm" style={{ zIndex: 'var(--z-sticky)' }}>
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={13} className="text-white" />
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">Athenos</span>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </Button>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-lg px-4 py-10">

        {/* Stepper */}
        <Stepper steps={STEPS} currentStep={step} orientation="horizontal" />

        {/* Step content */}
        <div className="mt-10">

          {/* Step 0 — Conta */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Crie sua conta</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Seus dados de acesso ao Athenos.</p>
              </div>
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
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Conte sobre você</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Vamos personalizar sua experiência.</p>
              </div>
              <RadioGroup
                name="role"
                label="Qual é sua área de atuação?"
                options={ROLE_OPTIONS}
                value={role}
                onChange={setRole}
              />
              <RadioGroup
                name="team"
                label="Tamanho da sua equipe"
                options={TEAM_OPTIONS}
                value={team}
                onChange={setTeam}
              />
              <Textarea
                label="Bio (opcional)"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Fale um pouco sobre você ou seu projeto..."
                rows={3}
              />
            </div>
          )}

          {/* Step 2 — Plano */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Escolha seu plano</h2>
                <p className="mt-1 text-sm text-[var(--text-muted)]">Você pode mudar a qualquer momento.</p>
              </div>

              <div className="flex flex-col gap-3">
                {PLANS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlan(p.id)}
                    className={cn(
                      'relative w-full rounded-[var(--radius-lg)] border p-4 text-left transition-all duration-[150ms]',
                      plan === p.id
                        ? 'border-[var(--acc-img)] bg-[var(--acc-img-soft)]'
                        : 'border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)]',
                    )}
                  >
                    {p.recommended && (
                      <span className="absolute right-3 top-3 rounded-full bg-[var(--acc-img)] px-2 py-0.5 text-[10px] font-semibold text-white">
                        Recomendado
                      </span>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-bold text-[var(--text-primary)]">{p.price}</span>
                      <span className="text-xs text-[var(--text-muted)]">{p.period}</span>
                      <span className="ml-2 text-sm font-semibold text-[var(--text-primary)]">{p.name}</span>
                    </div>
                    <ul className="mt-2 flex flex-col gap-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                          <Check size={11} className="shrink-0 text-[var(--semantic-success)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-deep)] p-4">
                <p className="text-xs font-semibold text-[var(--text-muted)]">Notificações</p>
                <Switch
                  checked={notifUpdates}
                  onChange={setNotifUpdates}
                  label="Novidades e lançamentos"
                  description="Seja o primeiro a saber sobre novas features."
                />
                <Switch
                  checked={notifMarketing}
                  onChange={setNotifMarketing}
                  label="Ofertas e promoções"
                  description="Receba descontos exclusivos por e-mail."
                />
              </div>
            </div>
          )}

          {/* Step 3 — Verificação */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--acc-img-soft)]">
                <Shield size={22} className="text-[var(--acc-img)]" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">Verifique seu e-mail</h2>
                <p className="mt-2 text-sm text-[var(--text-muted)]">
                  Enviamos um código de 6 dígitos para{' '}
                  <span className="font-medium text-[var(--text-primary)]">{email}</span>
                </p>
              </div>
              <OTPInput length={6} value={otp} onChange={setOtp} />
              <p className="text-xs text-[var(--text-muted-dim)]">
                Use <span className="font-mono text-[var(--acc-img)]">123456</span> para testar
              </p>
              <button
                type="button"
                className="text-xs text-[var(--acc-img)] hover:opacity-70 transition-opacity"
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

          <div className="flex items-center gap-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  i === step
                    ? 'w-6 bg-[var(--acc-img)]'
                    : i < step
                    ? 'w-1.5 bg-[var(--acc-img)]/40'
                    : 'w-1.5 bg-[var(--border-strong)]',
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
            {step === STEPS.length - 1 ? 'Verificar e criar conta' : 'Continuar'}
            {step < STEPS.length - 1 && <ArrowRight size={13} />}
          </Button>
        </div>

      </div>
    </div>
  )
}
