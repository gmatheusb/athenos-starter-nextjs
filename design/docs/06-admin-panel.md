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

## Sidebar — API Completa

> Responde ao tema via `--bg-panel-deep` — light e dark alternam automaticamente.
> Arquivo: `src/components/layout/Sidebar.tsx`

### Interfaces

```ts
interface SidebarSubItem {
  id: string
  label: string
}

interface SidebarItem {
  id: string
  label: string
  icon?: ReactNode
  href?: string
  badge?: string | number
  disabled?: boolean
  subitems?: SidebarSubItem[]   // ativa comportamento accordion
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface SidebarProps {
  sections: SidebarSection[]
  activeId?: string
  onNavigate?: (id: string) => void
  header?: ReactNode            // slot acima da lista
  footer?: ReactNode            // slot abaixo da lista
  className?: string
}
```

### Comportamento de subitems (accordion)

- Quando `item.subitems` existe, um chevron rotacionável aparece à direita do item
- Ao ativar o item (`activeId === item.id`), os subitems expandem com borda guia à esquerda
- Subitems são `<button>` clicáveis — ao clicar, fazem scroll suave até o elemento com `id` correspondente no container scrollável mais próximo (usando `getBoundingClientRect` + `scrollTo`)
- O `badge` é ocultado automaticamente quando `subitems` existe
- Itens com `disabled: true` ficam com `cursor-default` e `--text-muted` sem `opacity` adicional

### Exemplo de uso

```tsx
import { Sidebar } from '@/components/layout/Sidebar'

const NAV = [
  { id: 'basic', label: 'Básico', icon: Layers, items: ['Button', 'Alert', 'Card'] },
  { id: 'forms', label: 'Formulários', icon: PenLine, items: ['Input', 'Select'] },
]

const sections = [{
  title: 'Categorias',
  items: NAV.map(s => ({
    id: s.id,
    label: s.label,
    icon: <s.icon size={15} />,
    subitems: s.items.map(name => ({ id: `item-${name}`, label: name })),
  })),
}]

<Sidebar
  activeId={activeId}
  onNavigate={setActiveId}
  sections={sections}
  footer={
    <p className="text-[10px] text-[var(--text-muted-dim)]">v2.0</p>
  }
/>
```

### Scroll para subitem via `data-showcase`

O mecanismo de scroll do subitem usa dois estágios de busca:

```ts
// 1. Busca exata pelo id
document.getElementById(label.replace(/\s+/g, ''))

// 2. Fallback: busca parcial em data-showcase (cobre títulos compostos)
document.querySelector(`[data-showcase*="${label}"]`)
```

Para que o scroll funcione, o elemento alvo deve ter um `id` ou `data-showcase` compatível com o label do subitem. O componente `ShowcaseBlock` faz isso automaticamente.

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
