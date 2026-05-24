# 06 · Admin Panel

[← Templates](./05-templates.md) · [Gallery →](./07-gallery.md)

---

## Layout Geral

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar 236px (lg+)   │  Content area (flex: 1)            │
│  bg-panel-deep         │  bg-canvas                         │
│  border-right: border  │  overflow-y: auto                  │
└─────────────────────────────────────────────────────────────┘
```

```tsx
// components/layout/AdminShell.tsx
export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
```

---

## Sidebar — Anatomia Completa

> A Sidebar responde ao tema via `--bg-panel-deep` — light e dark alternam automaticamente.

```tsx
// components/layout/Sidebar.tsx
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="
        w-[236px] h-screen flex flex-col
        bg-[var(--bg-panel-deep)]
        border-r border-[var(--border-subtle)]
        sticky top-0
      "
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5">
        <AsteriskIcon className="w-[22px] h-[22px] text-white" />
        <span className="text-[17px] font-bold tracking-[-0.4px] text-white">atlas</span>
      </div>

      <div className="h-px bg-[rgba(255,255,255,0.055)] mx-4 mb-2" />

      {/* ── Navegação ── */}
      <nav className="flex-1 px-3 py-2 space-y-0.5">
        {NAV_SECTIONS.map(section => (
          <div key={section.label} className="mb-4">
            <p className="px-3.5 mb-1.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[rgba(148,163,184,0.30)]">
              {section.label}
            </p>
            {section.items.map(item => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2.5 px-3.5 py-2.5 rounded-pill mb-0.5',
                    'text-[13.5px] transition-all duration-fast',
                    isActive
                      ? 'bg-[linear-gradient(135deg,#7c3aed,#db2777)] text-white font-semibold shadow-[0_4px_20px_rgba(124,58,237,0.35)]'
                      : 'text-[rgba(148,163,184,0.65)] font-normal hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(203,213,225,0.9)]'
                  )}
                >
                  <item.icon
                    size={16}
                    className={isActive ? 'opacity-100' : 'opacity-60'}
                    aria-hidden="true"
                  />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="h-px bg-[rgba(255,255,255,0.055)] mx-4" />

      {/* ── Rodapé: Usuário ── */}
      <SidebarFooter />
    </aside>
  )
}
```

### Sidebar Footer (Usuário Logado)

```tsx
function SidebarFooter() {
  const { user, signOut } = useAuth()
  const initial = user?.email?.charAt(0).toUpperCase() ?? '?'
  const displayName = user?.email?.split('@')[0] ?? 'usuário'
  const topRole = getTopRole(user?.roles ?? [])

  return (
    <div className="px-3.5 pt-3 pb-4 flex flex-col gap-2.5">
      {/* Avatar + info */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 2px 12px rgba(124,58,237,0.4)' }}
        >
          {initial}
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-[#f1f5f9] tracking-[-0.1px] truncate">{displayName}</p>
          <span
            className="inline-block mt-0.5 px-2 py-0.5 rounded-pill text-[10px] font-semibold text-[#c084fc]"
            style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.18), rgba(219,39,119,0.18))', border: '1px solid rgba(168,85,247,0.3)' }}
          >
            {topRole}
          </span>
        </div>
      </div>
      {/* Sair */}
      <button
        onClick={signOut}
        className="w-full flex items-center gap-2 px-3.5 py-1.5 rounded-pill text-[12.5px] text-[rgba(148,163,184,0.4)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[rgba(148,163,184,0.8)] transition-all duration-fast"
      >
        <LogOut size={13} className="opacity-60" aria-hidden="true" />
        Sair
      </button>
    </div>
  )
}
```

---

## Tabela de Dados

Action buttons de linha com reveal no hover:

```tsx
const actionBtnStyles = {
  edit: {
    base: 'px-2 py-1 rounded-[var(--radius-sm)] text-xs text-[rgba(148,163,184,0.5)] transition-all duration-fast',
    hover: 'hover:bg-[rgba(168,85,247,0.08)] hover:border hover:border-[rgba(168,85,247,0.2)] hover:text-[#c084fc]',
  },
  delete: {
    base: 'px-2 py-1 rounded-[var(--radius-sm)] text-xs text-[rgba(148,163,184,0.5)] transition-all duration-fast',
    hover: 'hover:bg-[rgba(239,68,68,0.08)] hover:border hover:border-[rgba(239,68,68,0.18)] hover:text-[#f87171]',
  },
}
```

Ver estrutura completa da tabela em [03-components.md → Table](./03-components.md#85-table).

---

## Modal de Admin (Create / Edit / Delete)

Menor que o modal de detalhe — focado em formulário ou confirmação.

```tsx
<div className="fixed inset-0 z-[var(--z-overlay)] bg-black/70 backdrop-blur-[4px] flex items-center justify-center p-4">
  <div
    role="dialog"
    aria-modal="true"
    className="
      w-full max-w-[420px]       /* create/edit */
      /* max-w-[380px] para delete confirm */
      bg-[var(--bg-modal)]
      border border-[rgba(255,255,255,0.08)]
      rounded-[var(--radius-lg)]
      p-6
      shadow-lg
    "
  >
    <h2 className="text-[16px] font-semibold text-[var(--text-primary)] mb-4">Título</h2>

    {/* Form inputs — padrão 8.2 */}

    {/* Botões */}
    <div className="flex gap-3 mt-6">
      <button className="flex-1 ... secondary variant">Cancelar</button>
      <button className="flex-1 ... primary variant">Confirmar</button>
    </div>
  </div>
</div>
```

### Inputs de Formulário — Admin / Auth

```tsx
// Reutilizar o padrão de 03-components.md → 8.2 Input
// Focus accent: rgba(168,85,247,0.5) borda + rgba(168,85,247,0.1) ring
// Placeholder: opacity 30%
// Label: text-[10px] uppercase tracking-widest text-[var(--text-muted)]
```

---

## Avatar de Usuário

```tsx
// components/ui/UserAvatar.tsx
function UserAvatar({ email, roles, size = 32 }: AvatarProps) {
  const initial = email.charAt(0).toUpperCase()
  const topRole = getTopRole(roles)

  const gradients = {
    admin:     'linear-gradient(135deg, #7c3aed, #a855f7)',
    clevel:    'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    finance:   'linear-gradient(135deg, #059669, #22c55e)',
    marketing: 'linear-gradient(135deg, #b45309, #f59e0b)',
  }

  return (
    <div
      aria-label={`Avatar de ${email}`}
      className="rounded-full flex items-center justify-center text-white font-semibold"
      style={{
        width: size, height: size,
        fontSize: size * 0.375,
        background: gradients[topRole] ?? gradients.admin,
      }}
    >
      {initial}
    </div>
  )
}
```
