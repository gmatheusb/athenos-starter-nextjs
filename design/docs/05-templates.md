# 05 · Templates Obrigatórios

[← Layout](./04-layout.md) · [Admin Panel →](./06-admin-panel.md)

---

## 9.1 Template: Login / Auth

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  ORBS DE FUNDO (fixed, decorativo)                          │
│  ┌──────────────────────────────────┐                       │
│  │  Card centralizado max-w-[380px] │                       │
│  │  ┌──────────────────────────┐    │                       │
│  │  │  Logo / Brand            │    │                       │
│  │  │  Título                  │    │                       │
│  │  │  Formulário              │    │                       │
│  │  │  CTA primário            │    │                       │
│  │  │  Links auxiliares        │    │                       │
│  │  └──────────────────────────┘    │                       │
│  └──────────────────────────────────┘                       │
│  Restricted notice (rodapé)                                 │
└─────────────────────────────────────────────────────────────┘
```

```tsx
// templates/AuthTemplate.tsx
export function AuthTemplate({ children, title, subtitle }: AuthTemplateProps) {
  return (
    <div className="relative min-h-screen bg-canvas flex flex-col items-center justify-center p-4">
      <AuthOrbs />
      <div className="relative z-10 w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <AthenosLogo />
          <span className="text-[17px] font-bold tracking-tight text-[var(--text-primary)]">Athenos</span>
        </div>
        {/* Card */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-sm">
          <h1 className="text-[22px] font-bold tracking-tight text-[var(--text-primary)] mb-1">{title}</h1>
          {subtitle && <p className="text-sm text-[var(--text-muted)] mb-6">{subtitle}</p>}
          {children}
        </div>
        {/* Restricted notice */}
        <p className="mt-6 text-center text-[11px] tracking-[0.05em] text-[var(--text-muted-dim)]">
          Acesso restrito a membros autorizados
        </p>
      </div>
    </div>
  )
}
```

---

## 9.2 Template: Dashboard

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar 236px  │  Main content                             │
│  (fixo)         │  ┌─────────────────────────────────────┐  │
│                 │  │  Sticky header / GlassBar            │  │
│                 │  ├─────────────────────────────────────┤  │
│                 │  │  Stat cards row                      │  │
│                 │  │  ─────────────────────────────────── │  │
│                 │  │  Main content area                   │  │
│                 │  └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

```tsx
// templates/DashboardTemplate.tsx
export function DashboardTemplate({ children, pageTitle, actions }: DashboardTemplateProps) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <GlassBar>
          <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[var(--text-primary)]">{pageTitle}</h1>
          <div className="flex items-center gap-3">{actions}</div>
        </GlassBar>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
```

---

## 9.3 Template: CRUD

### Componentes obrigatórios

1. GlassBar com título + botão "Novo"
2. Stat cards (total, ativos, desativados)
3. Tabela de dados com hover actions
4. Modal de criação/edição
5. Modal de confirmação de exclusão
6. Empty state quando sem registros
7. Loading state (skeleton)

```tsx
export function CRUDPage() {
  const { data, isLoading } = useData()
  const [modal, setModal] = useState<'create' | 'edit' | 'delete' | null>(null)

  if (isLoading) return <CRUDSkeleton />

  return (
    <DashboardTemplate pageTitle="Usuários" actions={<CreateButton onClick={() => setModal('create')} />}>
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <StatCard value={data.total} label="Total" />
        <StatCard value={data.active} label="Ativos" />
        <StatCard value={data.disabled} label="Desativados" />
      </div>

      {/* Tabela */}
      {data.rows.length === 0
        ? <EmptyState message="Nenhum usuário encontrado" />
        : <DataTable rows={data.rows} onEdit={...} onDelete={...} />
      }

      {/* Modals */}
      {modal === 'create' && <CreateModal onClose={() => setModal(null)} />}
      {modal === 'edit'   && <EditModal   onClose={() => setModal(null)} />}
      {modal === 'delete' && <DeleteConfirm onClose={() => setModal(null)} />}
    </DashboardTemplate>
  )
}
```

---

## 9.4 Template: Empty State

```tsx
// components/ui/EmptyState.tsx
export function EmptyState({ icon: Icon = Inbox, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center bg-[var(--surface)]">
        <Icon size={20} className="text-[var(--text-muted-dim)]" />
      </div>
      <h3 className="text-[15px] font-medium text-[var(--text-primary)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] max-w-xs">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
```

---

## 9.5 Template: Loading / Skeleton

```tsx
// Skeleton de tabela
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 px-4 py-3 border-b border-[var(--border-subtle)] last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="h-4 rounded bg-[var(--surface-skeleton)] animate-pulse"
              style={{ width: `${[40, 30, 20, 10][j] ?? 20}%` }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Skeleton de galeria → ver 07-gallery.md
```

---

## 9.6 Template: Error State

```tsx
export function ErrorState({ code, title, message, retry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
      <p className="text-[48px] font-bold tracking-tight text-[var(--text-muted-dim)]">{code}</p>
      <h2 className="text-[22px] font-bold text-[var(--text-primary)] mt-2 mb-1">{title}</h2>
      <p className="text-sm text-[var(--text-muted)] max-w-sm">{message}</p>
      {retry && (
        <button onClick={retry} className="mt-6 ... /* primary button */">
          Tentar novamente
        </button>
      )}
    </div>
  )
}
```

---

## 9.7 Template: Galeria / Listagem com Masonry

Ver spec completa em [07-gallery.md](./07-gallery.md).

---

## 9.8 Template: Wizard / Multi-step

```tsx
export function WizardTemplate({ steps, currentStep, children }: WizardProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <div className={`flex items-center gap-2 ${i <= currentStep ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                i < currentStep
                  ? 'bg-[var(--grad)] text-white'
                  : i === currentStep
                    ? 'border-2 border-[var(--acc-img)] text-[var(--acc-img)]'
                    : 'bg-[var(--surface)] text-[var(--text-muted)]'
              }`}>
                {i < currentStep ? <Check size={12} /> : i + 1}
              </div>
              <span className="text-sm hidden sm:block">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px ${i < currentStep ? 'bg-[var(--acc-img)]' : 'bg-[var(--border)]'}`} />
            )}
          </Fragment>
        ))}
      </div>
      {children}
    </div>
  )
}
```

---

## Fluxo Para Criar Novas Páginas

### Passo a passo obrigatório

**1. Identificar o template**
- Qual template se aplica? (Dashboard, CRUD, Auth, Galeria, Wizard?)
- Se nenhum: documentar o motivo e criar o template reutilizável primeiro.

**2. Mapear os estados da página** — toda página precisa ter:
```
[ ] Loading state — como é o skeleton?
[ ] Empty state  — o que aparece sem dados?
[ ] Error state  — o que aparece com falha?
[ ] Populated    — o estado normal com dados
```

**3. Verificar componentes existentes** antes de criar qualquer coisa:
1. Buscar em `/components/ui`
2. Buscar em `/components/forms`
3. Buscar em shadcn/ui
4. Só criar se realmente não existir

**4. Usar tokens, não valores hardcoded**
```tsx
// ❌
style={{ color: '#e2e8f0', background: '#06080f' }}

// ✅
className="text-[var(--text-primary)] bg-canvas"
```

**5. Estruturar o JSX** — ordem obrigatória dentro de um page component:
```tsx
export default function MinhaPagina() {
  // 1. Hooks (useState, useEffect, custom hooks)
  // 2. Queries / mutations (React Query, SWR)
  // 3. Handlers (funções de evento — prefixo handle)
  // 4. Early returns (loading, error)
  // 5. Render principal
}
```

**6. Checklist de responsividade**
```
[ ] Mobile (320px): layout não quebra, texto não overflows
[ ] Tablet (768px): mudança de layout se necessário
[ ] Desktop (1280px+): uso do espaço extra
[ ] Testar larguras intermediárias (480px, 640px, 1024px)
```

**7. Checklist de acessibilidade**
```
[ ] Botões têm texto ou aria-label
[ ] Inputs têm label associada
[ ] Imagens têm alt
[ ] Contraste ≥ 4.5:1 (normal) ou ≥ 3:1 (grande)
[ ] Tab funciona na ordem lógica
[ ] Focus visible em todos os elementos interativos
```

**8. Validar tema dark e light**
```
[ ] Alternar via toggle de tema
[ ] Cores não "somem" em nenhum tema
[ ] Glassmorphism tem contraste suficiente no light
```

---

## Anti-patterns ao Criar Páginas

```css
/* ❌ CSS novo sem verificar tokens */
.my-card { background: #0f111a; border: 1px solid rgba(255,255,255,0.07); }

/* ✅ Correto */
/* <div className="bg-[var(--bg-modal)] border border-[var(--border)]"> */
```

```tsx
// ❌ Componente ad-hoc em vez de reutilizável
function UserBadge({ role }) {
  return <span style={{ color: role === 'admin' ? '#c084fc' : '#86efac' }}>{role}</span>
}

// ✅ Usar componente existente
import { RoleBadge } from '@/components/ui/Badge'
<RoleBadge role={user.role} />
```

```tsx
// ❌ Lógica de negócio dentro do JSX
{users.filter(u => u.role === 'admin').map(u => ...)}

// ✅ Separar com useMemo
const adminUsers = useMemo(() => users.filter(u => u.role === 'admin'), [users])
{adminUsers.map(u => ...)}

---

## Exemplo implementado: Login

**Arquivo:** `src/app/(examples)/login/page.tsx`

### Estrutura JSX

```
LoginPage
├── AuthOrbs                   (fundo animado, fixed)
├── button toggle dark/light   (fixed top-4 right-4)
└── div.card (max-w-[380px])
    ├── Logo: ícone Sparkles + gradient
    ├── h1 "Bem-vindo de volta"
    ├── p subtítulo (--text-muted)
    ├── Alert variant="error"  (condicional)
    ├── form
    │   ├── Input label="E-mail" type="email" leftIcon={Mail}
    │   ├── Input label="Senha" type="password" leftIcon={Lock}
    │   ├── link "Esqueceu a senha?" (--acc-img)
    │   └── Button primary full-width isLoading
    └── p "Acesso restrito..." (--text-muted-dim, 11px)
```

### Tokens utilizados

| Token | Onde |
|---|---|
| `--bg-canvas` | fundo da página |
| `--surface` | card |
| `--border` | borda do card |
| `--radius-xl` | border-radius do card |
| `--grad` | background do ícone logo |
| `--text-primary` | h1 |
| `--text-muted` | subtítulo |
| `--text-muted-dim` | rodapé restrito |
| `--acc-img` | link "Esqueceu a senha?" |

### Regras do padrão

- `AuthOrbs` **apenas** em páginas de auth — nunca em páginas autenticadas
- Card sempre `max-w-[380px]` — sem exceções
- Sem `Navbar` ou `Sidebar` — layout limpo
- Toggle dark/light **sempre** disponível em páginas de auth
- `animation: 'fade-in-up'` no card para entrada suave
```
