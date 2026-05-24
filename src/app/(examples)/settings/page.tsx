'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Sun, Moon, User, Bell, Lock, Sparkles,
  ChevronLeft,
} from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useToast } from '@/hooks/useToast'
import { Tabs } from '@/components/ui/Tabs'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Divider } from '@/components/ui/Divider'
import { Card } from '@/components/ui/Card'

const TABS = [
  { id: 'profile', label: 'Perfil', icon: <User size={14} /> },
  { id: 'notifications', label: 'Notificações', icon: <Bell size={14} /> },
  { id: 'security', label: 'Segurança', icon: <Lock size={14} /> },
]

const LANGUAGE_OPTIONS = [
  { value: 'pt-BR', label: 'Português (Brasil)' },
  { value: 'en-US', label: 'English (US)' },
  { value: 'es-ES', label: 'Español' },
]

const TIMEZONE_OPTIONS = [
  { value: 'America/Sao_Paulo', label: 'Brasília (UTC-3)' },
  { value: 'America/New_York', label: 'Nova York (UTC-5)' },
  { value: 'Europe/London', label: 'Londres (UTC+0)' },
  { value: 'Asia/Tokyo', label: 'Tóquio (UTC+9)' },
]

export default function SettingsPage() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const toast = useToast()

  const [activeTab, setActiveTab] = useState('profile')

  // Perfil
  const [name, setName] = useState('Gabriel Matheus')
  const [email, setEmail] = useState('dev@orayon.ai')
  const [bio, setBio] = useState('Desenvolvedor front-end apaixonado por design systems e experiências de usuário.')
  const [language, setLanguage] = useState('pt-BR')
  const [timezone, setTimezone] = useState('America/Sao_Paulo')
  const [savingProfile, setSavingProfile] = useState(false)

  // Notificações
  const [notifEmail, setNotifEmail] = useState(true)
  const [notifPush, setNotifPush] = useState(true)
  const [notifUpdates, setNotifUpdates] = useState(false)
  const [notifMarketing, setNotifMarketing] = useState(false)
  const [notifSecurity, setNotifSecurity] = useState(true)

  // Segurança
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [savingPwd, setSavingPwd] = useState(false)
  const [pwdError, setPwdError] = useState('')

  function saveProfile() {
    setSavingProfile(true)
    setTimeout(() => {
      setSavingProfile(false)
      toast.success('Perfil atualizado com sucesso.')
    }, 900)
  }

  function saveNotifications() {
    toast.info('Preferências de notificação salvas.')
  }

  function changePassword() {
    if (newPwd !== confirmPwd) {
      setPwdError('As senhas não coincidem.')
      return
    }
    if (newPwd.length < 8) {
      setPwdError('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    setPwdError('')
    setSavingPwd(true)
    setTimeout(() => {
      setSavingPwd(false)
      setCurrentPwd('')
      setNewPwd('')
      setConfirmPwd('')
      toast.success('Senha alterada com sucesso.')
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)]">

      {/* Header */}
      <header className="sticky top-0 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--bg-modal)] px-5" style={{ zIndex: 'var(--z-sticky)' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--acc-img)] to-[var(--acc-vid)]">
            <Sparkles size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold leading-none text-[var(--text-primary)]">Athenos</p>
            <p className="mt-0.5 text-[10px] leading-none text-[var(--text-muted)]">Configurações</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push('/dashboard')}>
            <ChevronLeft size={14} />
            Dashboard
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8">

        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Configurações</h1>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Gerencie sua conta, notificações e segurança.</p>
        </div>

        <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} variant="underline" />

        <div className="mt-8">

          {/* Perfil */}
          {activeTab === 'profile' && (
            <Card className="p-6">
              <div className="flex flex-col gap-6">

                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <Avatar name={name} size="xl" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{email}</p>
                  </div>
                </div>

                <Divider />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                  />
                  <Input
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>

                <Textarea
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Fale um pouco sobre você..."
                  rows={3}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Select
                    label="Idioma"
                    options={LANGUAGE_OPTIONS}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                  <Select
                    label="Fuso horário"
                    options={TIMEZONE_OPTIONS}
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" isLoading={savingProfile} onClick={saveProfile}>
                    Salvar perfil
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Notificações */}
          {activeTab === 'notifications' && (
            <Card className="p-6">
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Canais</h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">Escolha como deseja receber notificações.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Switch
                    checked={notifEmail}
                    onChange={setNotifEmail}
                    label="E-mail"
                    description="Receba notificações importantes por e-mail."
                  />
                  <Switch
                    checked={notifPush}
                    onChange={setNotifPush}
                    label="Push no browser"
                    description="Notificações em tempo real no navegador."
                  />
                </div>

                <Divider />

                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Tipos</h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">Controle quais eventos geram notificações.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Switch
                    checked={notifSecurity}
                    onChange={setNotifSecurity}
                    label="Segurança"
                    description="Logins, alterações de senha e acessos suspeitos."
                  />
                  <Switch
                    checked={notifUpdates}
                    onChange={setNotifUpdates}
                    label="Atualizações do produto"
                    description="Novidades, releases e melhorias do sistema."
                  />
                  <Switch
                    checked={notifMarketing}
                    onChange={setNotifMarketing}
                    label="Marketing"
                    description="Promoções, dicas e conteúdos exclusivos."
                  />
                </div>

                <div className="flex justify-end">
                  <Button variant="primary" onClick={saveNotifications}>
                    Salvar preferências
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Segurança */}
          {activeTab === 'security' && (
            <Card className="p-6">
              <div className="flex flex-col gap-6">

                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Alterar senha</h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">Use uma senha forte com pelo menos 8 caracteres.</p>
                </div>

                <div className="flex flex-col gap-4">
                  <Input
                    label="Senha atual"
                    type="password"
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    placeholder="••••••••"
                  />
                  <Input
                    label="Nova senha"
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="••••••••"
                    hint="Mínimo de 8 caracteres"
                  />
                  <Input
                    label="Confirmar nova senha"
                    type="password"
                    value={confirmPwd}
                    onChange={(e) => { setConfirmPwd(e.target.value); setPwdError('') }}
                    placeholder="••••••••"
                    error={pwdError}
                  />
                </div>

                <Divider />

                <div>
                  <h2 className="text-sm font-semibold text-[var(--text-primary)]">Sessões ativas</h2>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">Dispositivos com acesso à sua conta.</p>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-deep)] divide-y divide-[var(--border-subtle)]">
                  {[
                    { device: 'Chrome · macOS', location: 'São Paulo, BR', time: 'Agora', current: true },
                    { device: 'Safari · iPhone', location: 'São Paulo, BR', time: 'Há 2 horas', current: false },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-sm text-[var(--text-primary)]">
                          {s.device}
                          {s.current && (
                            <span className="ml-2 rounded-full bg-[var(--semantic-success)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--semantic-success)]">
                              atual
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{s.location} · {s.time}</p>
                      </div>
                      {!s.current && (
                        <Button variant="ghost" size="sm" className="text-[var(--semantic-error)]">
                          Revogar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    isLoading={savingPwd}
                    onClick={changePassword}
                    disabled={!currentPwd || !newPwd || !confirmPwd}
                  >
                    Alterar senha
                  </Button>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
