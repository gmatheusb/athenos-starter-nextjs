# 04 · Layout

[← Componentes](./03-components.md) · [Templates →](./05-templates.md)

---

## Navbar / TopBar

> **Seção nova** — spec criada para complementar a [Sidebar](./06-admin-panel.md#sidebar--anatomia-completa).

### Anatomia

```
┌─────────────────────────────────────────────────────────────────────┐
│  [☰ Logo]          [🔍 Search / Page Title]          [🔔 ⊙ Avatar]  │
│  zona-esquerda          zona-centro                   zona-direita  │
│  h-[56px]  bg-glass  backdrop-blur-[24px]  border-b  sticky top-0  │
└─────────────────────────────────────────────────────────────────────┘
```

| Zona | Mobile | Desktop (lg+) |
|---|---|---|
| Esquerda | Botão hambúrguer + Logo | Logo na Sidebar; zona vazia ou breadcrumb |
| Centro | Título da página | Campo de busca (`max-w-[320px]`) |
| Direita | Theme toggle + Avatar | Notificações + Theme toggle + Avatar |

### Código — `components/layout/Navbar.tsx`

```tsx
'use client'
import { useState } from 'react'
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { UserAvatar } from '@/components/ui/UserAvatar'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Sidebar } from '@/components/layout/Sidebar'
import { cn } from '@/lib/utils'

interface NavbarProps {
  pageTitle?: string
  showSearch?: boolean
}

export function Navbar({ pageTitle, showSearch = true }: NavbarProps) {
  const { theme, toggleTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [notifCount] = useState(0)   // conectar ao estado real

  return (
    <>
      {/* ── Barra principal ── */}
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
          {/* Hambúrguer — só mobile */}
          <button
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
            aria-label="Abrir menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={18} />
          </button>

          {/* Título de página — mobile ou quando sem search */}
          {(!showSearch || pageTitle) && (
            <h1 className="text-[17px] font-semibold tracking-[-0.2px] text-[var(--text-primary)] truncate lg:hidden">
              {pageTitle}
            </h1>
          )}
        </div>

        {/* ── Zona centro — Search (desktop) ── */}
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
              className="
                flex-1 bg-transparent text-sm text-[var(--text-primary)]
                placeholder:text-[var(--text-muted)] placeholder:opacity-60
                outline-none
              "
            />
          </div>
        )}

        {/* ── Zona direita — Actions ── */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Notificações */}
          <button
            aria-label={notifCount > 0 ? `${notifCount} notificações` : 'Notificações'}
            className="relative flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
          >
            <Bell size={16} aria-hidden="true" />
            {notifCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-1 w-[7px] h-[7px] rounded-full bg-[var(--acc-vid)]"
              />
            )}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            className="flex items-center justify-center w-8 h-8 rounded-md text-[var(--text-muted)] hover:bg-[var(--surface-hover)] transition-all duration-fast"
          >
            {theme === 'dark'
              ? <Sun size={15} aria-hidden="true" />
              : <Moon size={15} aria-hidden="true" />
            }
          </button>

          {/* Avatar do usuário */}
          <UserAvatarMenu />
        </div>
      </header>

      {/* ── Sidebar drawer — mobile ── */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-[236px] p-0 bg-[var(--bg-panel-deep)] border-r border-[var(--border-subtle)]">
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  )
}

// ── Avatar com dropdown ────────────────────────────────────────────
function UserAvatarMenu() {
  const { user, signOut } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Menu do usuário"
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2"
        >
          <UserAvatar email={user?.email ?? ''} roles={user?.roles ?? []} size={32} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[180px] bg-[var(--bg-modal)] border border-[var(--border)] shadow-lg rounded-[var(--radius-lg)] p-1"
      >
        <div className="px-3 py-2 border-b border-[var(--border-subtle)] mb-1">
          <p className="text-[12px] font-medium text-[var(--text-primary)] truncate">{user?.email}</p>
        </div>
        <DropdownMenuItem
          onClick={signOut}
          className="text-sm text-[var(--text-muted)] hover:bg-[var(--surface-hover)] rounded-md px-2 py-1.5 cursor-pointer"
        >
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

### Regras do Navbar

- **`sticky top-0 z-[var(--z-sticky)]`** — sempre sticky, nunca fixed (fixed quebra scroll em mobile)
- **`backdrop-blur-[24px]`** com `-webkit-backdrop-filter` para compatibilidade Safari
- **Nunca shadow colorido** — borda `border-b border-[var(--border)]` é suficiente
- **Search só expande com foco** — `w-[220px]` repouso → `w-[320px]` foco, transição `duration-base`
- **Hambúrguer desaparece em `lg:`** (`hidden lg:hidden`) — sidebar fica visível no layout
- **Touch targets mínimos 44px** — ícones em `w-8 h-8` atendem ao requisito

---

## Componente GlassBar

Usado como header sticky de páginas (Admin, Studio, Galeria).

```tsx
// components/layout/GlassBar.tsx
export function GlassBar({ children, className }: GlassBarProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-[var(--z-sticky)]',
        'flex items-center justify-between',
        'px-7 py-2.5',
        'bg-[var(--glass)]',
        'backdrop-blur-[24px]',
        '[backdrop-filter:blur(24px)]',
        '[-webkit-backdrop-filter:blur(24px)]',
        'border-b border-[var(--border)]',
        className
      )}
    >
      {children}
    </div>
  )
}
```

**Diferença Navbar vs GlassBar:**
- `Navbar` — barra superior de produto com hambúrguer, search, notificações e avatar
- `GlassBar` — header de página com título e actions; não inclui navegação global

---

## Glass System — Regras de Aplicação

O efeito glass é central na identidade Athenos no dark mode. No light mode, é mais sutil mas coerente.

### Quando usar

- Barras sticky (header, filtros de galeria)
- Bottom bar do Studio
- Botões flutuantes (notificação, fechar modal)
- Backdrop de modal

### Valores de blur por contexto

| Contexto | blur | Dark bg | Light bg |
|---|---|---|---|
| Sticky bar / Navbar | `blur(24px)` | `rgba(6,8,15,0.88)` | `rgba(248,249,252,0.90)` |
| Modal backdrop | `blur(20px)` | `rgba(0,0,0,0.82)` | `rgba(0,0,0,0.50)` |
| Icon button glass | `blur(24px)` | `rgba(10,13,22,0.88)` | `rgba(241,245,249,0.90)` |
| Card sutil | `blur(8px)` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.025)` |

```css
/* Sempre incluir -webkit-backdrop-filter para Safari */
.glass-bar {
  background: var(--glass);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}
```

---

## Orbs de Fundo Animados

Decoração de profundidade nas páginas `/login` e `/change-password`. **Não usar em outras páginas.**

```tsx
// components/auth/AuthOrbs.tsx
export function AuthOrbs() {
  return (
    <>
      {/* Roxo — top-left */}
      <div className="pointer-events-none fixed" style={{
        top: '5%', left: '10%', width: 560, height: 560,
        background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
        filter: 'blur(48px)',
        animation: 'orb-float-1 14s ease-in-out infinite',
      }} />
      {/* Pink — bottom-right */}
      <div className="pointer-events-none fixed" style={{
        bottom: '5%', right: '8%', width: 480, height: 480,
        background: 'radial-gradient(circle, rgba(255,61,187,0.14) 0%, transparent 70%)',
        filter: 'blur(48px)',
        animation: 'orb-float-2 18s ease-in-out infinite',
      }} />
      {/* Violet — center sutil */}
      <div className="pointer-events-none fixed" style={{
        top: '50%', left: '50%', width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 60%)',
        filter: 'blur(72px)',
        transform: 'translate(-50%, -50%)',
        animation: 'orb-float-3 22s ease-in-out infinite',
      }} />
    </>
  )
}
```

Keyframes `orb-float-1/2/3` devem estar em `globals.css` — ver [08-guidelines.md → Keyframes](./08-guidelines.md#keyframes-canônicos).

---

## Responsividade

### Mobile First — Regra Absoluta

Todo componente começa com estilos para mobile (sem prefixo). Breakpoints adicionam estilos para telas maiores.

```tsx
// ✅ Mobile first
<div className="flex flex-col gap-4 md:flex-row md:gap-6">

// ❌ Desktop first (proibido)
<div className="flex flex-row gap-6 sm:flex-col">
```

### Breakpoints

Usar exclusivamente os breakpoints do Tailwind. **Nunca criar media queries customizadas em CSS.**

| Prefixo | Min-width | Dispositivo |
|---|---|---|
| (nenhum) | 0px | Mobile pequeno |
| `sm:` | 640px | Mobile grande |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |

### Comportamento por Componente

**Navbar / Sidebar**
```
Mobile (< lg):  Sidebar escondida; hambúrguer no Navbar abre como Sheet
lg+:            Sidebar fixa 236px; hambúrguer desaparece
```

**Galeria / Masonry**
```
Mobile:   1–2 colunas
md:       3–4 colunas
lg:       4–6 colunas
xl+:      6–10 colunas (max 10)
```

**Modal duplo painel**
```
Mobile:   column — imagem no topo (260px), detalhes embaixo (scroll)
md+:      row — imagem à esquerda (flex:1), detalhes à direita (360px)
```

**Containers de página**
```tsx
<div className="px-4 sm:px-6 lg:px-8">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

### Texto e Grids Responsivos

```tsx
// Títulos que escalam
<h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight">

// Grids que se adaptam
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
```

### Nunca

```tsx
// ❌ Ocultar conteúdo importante em mobile sem fallback
<div className="hidden md:block">conteúdo importante</div>

// ❌ Width fixo em elementos fluidos
<div style={{ width: '1200px' }}>

// ❌ Font-size fixo sem considerar mobile
className="text-[22px]"  // quando deveria ser text-[18px] sm:text-[22px]
```
