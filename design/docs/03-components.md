# 03 · Componentes Base

[← Tokens](./02-tokens.md) · [Layout →](./04-layout.md)

---

## 8.1 Button

Ação primária, secundária, destrutiva ou ghost. **Nunca usar `<div>` como botão.**

```tsx
// ── Primary (gradient brand) ─────────────────────────────────────
<button
  className="
    flex items-center gap-2 rounded-pill px-4 py-2
    text-sm font-medium text-white
    bg-[linear-gradient(135deg,#7c3aed,#a855f7)]
    hover:opacity-90 active:scale-[0.98]
    transition-all duration-fast
    disabled:opacity-40 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2
  "
>
  Gerar imagem
</button>

// ── Secondary ────────────────────────────────────────────────────
<button
  className="
    flex items-center gap-2 rounded-pill px-4 py-2
    text-sm font-medium text-[var(--text-muted)]
    bg-[var(--surface)] border border-[var(--border)]
    hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
    transition-all duration-fast
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2
  "
>
  Cancelar
</button>

// ── Destructive ──────────────────────────────────────────────────
<button
  className="
    flex items-center gap-2 rounded-pill px-4 py-2
    text-sm font-medium
    text-[var(--semantic-error)] bg-[rgba(239,68,68,0.08)]
    border border-[rgba(239,68,68,0.2)]
    hover:bg-[rgba(239,68,68,0.15)]
    transition-all duration-fast
  "
>
  Excluir
</button>

// ── Ghost ─────────────────────────────────────────────────────────
<button
  className="
    flex items-center gap-2 rounded-md px-3 py-1.5
    text-sm text-[var(--text-muted)]
    hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]
    transition-all duration-fast
  "
>
  Mais opções
</button>

// ── Icon button ──────────────────────────────────────────────────
<button
  aria-label="Fechar modal"
  className="
    flex items-center justify-center w-8 h-8 rounded-md
    text-[var(--text-muted)]
    bg-[var(--glass-dark)] backdrop-blur-[24px]
    border border-[var(--border-input)]
    hover:bg-[var(--surface-hover)]
    transition-all duration-fast
  "
>
  <X size={14} />
</button>
```

### Regras

- Sempre incluir `focus-visible:ring-2` — nunca `outline-none` sem substituição
- Sempre incluir `disabled:opacity-40 disabled:cursor-not-allowed`
- `active:scale-[0.98]` em botões primários — feedback tátil
- Botões de submit: `type="submit"` · Botões sem ação de submit: `type="button"`
- Nunca `onClick` com `href` — usar `<Link>` do Next.js

---

## 8.2 Input

Campo de entrada de texto, senha, email. Base para todos os formulários.

```tsx
// ── Input padrão ─────────────────────────────────────────────────
<div className="flex flex-col gap-1.5">
  <label
    htmlFor="email"
    className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]"
  >
    E-mail
  </label>
  <input
    id="email"
    type="email"
    placeholder="seu@email.com"
    className="
      w-full rounded-[var(--radius-md)] px-3 py-2
      text-sm text-[var(--text-primary)]
      bg-[var(--surface-prompt)]
      border border-[var(--border-input)]
      placeholder:opacity-30
      outline-none
      transition-all duration-fast
      focus:border-[var(--acc-img-border)]
      focus:ring-2 focus:ring-[var(--acc-img-soft)]
      disabled:opacity-50 disabled:cursor-not-allowed
    "
  />
</div>

// ── Estado de erro ────────────────────────────────────────────────
<div className="flex flex-col gap-1.5">
  <label htmlFor="senha" className="text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted)]">
    Senha
  </label>
  <input
    id="senha"
    aria-invalid="true"
    aria-describedby="senha-error"
    className="
      ... /* classes base */
      border-[rgba(239,68,68,0.5)]
      focus:border-[rgba(239,68,68,0.7)]
      focus:ring-[rgba(239,68,68,0.1)]
    "
  />
  <p id="senha-error" className="text-xs text-[var(--semantic-error)]" role="alert">
    Senha inválida
  </p>
</div>
```

### Regras

- Label sempre acima do input, com `htmlFor` + `id` correspondentes
- `placeholder` opacity 30% — nunca como substituto de label
- Foco com borda accent + ring sutil
- Inputs de senha: sempre incluir toggle de visibilidade
- Estado de erro: `aria-invalid="true"` + `aria-describedby` apontando para a mensagem

---

## 8.3 Card

Contentor de conteúdo genérico — media card, stat card, info card.

```tsx
// ── Card padrão ──────────────────────────────────────────────────
<div
  className="
    rounded-[var(--radius-xl)] p-4
    bg-[var(--surface)]
    border border-[var(--border)]
    shadow-sm
    transition-all duration-fast
    hover:bg-[var(--surface-hover)]
  "
>
  {children}
</div>

// ── Stat Card (admin) ─────────────────────────────────────────────
<div
  className="
    rounded-[var(--radius-lg)] p-4
    bg-[var(--surface-deep)]
    border border-[var(--border-subtle)]
  "
>
  <p className="text-[22px] font-bold tracking-tight text-[var(--text-primary)]">{value}</p>
  <p className="mt-0.5 text-[10px] font-medium uppercase tracking-widest text-[var(--text-muted-dim)]">{label}</p>
</div>
```

### Regras

- Cards de galeria/media: `--radius-md` (8px), sem padding
- Cards de conteúdo: `--radius-xl` (16px), com padding
- Nunca `box-shadow` colorido para simular borda — usar `border`
- Cards clicáveis: `cursor-pointer` + `role="button"` ou envolver em `<button>`

---

## 8.4 Modal / Dialog

Janela flutuante para detalhes, confirmações e formulários complexos.

```tsx
// ── Estrutura de Modal ────────────────────────────────────────────
<div
  className="fixed inset-0 z-[var(--z-overlay)] bg-black/80 backdrop-blur-[20px] flex items-center justify-center p-4"
  onClick={onClose}
  aria-hidden="true"
>
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
    onClick={e => e.stopPropagation()}
    className="
      relative z-[var(--z-modal)]
      w-full max-w-[min(1100px,calc(100vw-32px))]
      max-h-[calc(100vh-48px)]
      bg-[var(--bg-modal)]
      rounded-[var(--radius-xl)]
      border border-[var(--border)]
      shadow-lg
      overflow-hidden
    "
  >
    <button onClick={onClose} aria-label="Fechar modal" className="absolute top-3 right-3 ...">
      <X size={14} />
    </button>
    <div id="modal-title" className="text-[17px] font-medium text-[var(--text-primary)] p-6">
      Título do modal
    </div>
    {children}
  </div>
</div>
```

### Layout Duplo Painel (Image/Video Detail)

```
Desktop (md+): row layout
┌──────────────────────────┬────────────────┐
│  Painel esquerdo flex:1  │  Painel dir.   │
│  bg-panel-deep           │  w-[360px]     │
│  imagem/vídeo            │  p-5           │
└──────────────────────────┴────────────────┘

Mobile: column layout
┌────────────────────────────────────────────┐
│  Painel topo h-[260px]  bg-panel-deep      │
├────────────────────────────────────────────┤
│  Painel inferior flex:1  overflow-y:auto   │
└────────────────────────────────────────────┘
```

```tsx
<div className="flex flex-col md:flex-row h-full">
  <div className="h-[260px] md:h-auto md:flex-1 bg-[var(--bg-panel-deep)] flex items-center justify-center">
    <img ... />
  </div>
  <div className="border-t md:border-t-0 md:border-l border-[var(--border-subtle)] w-full md:w-[360px] p-5 overflow-y-auto">
    {details}
  </div>
</div>
```

### Regras

- Sempre `aria-modal="true"` + `aria-labelledby` apontando para o título
- Fechar com `Escape`: `useEffect` com `keydown` listener
- Ao abrir: mover foco para o primeiro elemento interativo
- Backdrop: `bg-black/80` + `backdrop-blur-[20px]` — nunca apenas overlay sem blur
- Modal de delete confirm: `max-w-[380px]` · Modal de form: `max-w-[420px]`

---

## 8.5 Table

Exibição de dados tabulares no admin panel.

```tsx
<div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="bg-[var(--surface-deep)] border-b border-[var(--border-subtle)]">
        <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted-dim)]">
          Nome
        </th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.id}
          onMouseEnter={() => setHoveredId(row.id)}
          onMouseLeave={() => setHoveredId(null)}
          className="border-b border-[var(--border-subtle)] last:border-0 transition-colors duration-fast hover:bg-[var(--surface)]"
        >
          <td className="px-4 py-3 text-sm text-[var(--text-secondary)]">{row.name}</td>
          <td className="px-4 py-3">
            <div
              className="flex gap-2 transition-opacity duration-fast"
              style={{ opacity: hoveredId === row.id ? 1 : 0 }}
            >
              <ActionBtn variant="edit" onClick={() => onEdit(row)} />
              <ActionBtn variant="delete" onClick={() => onDelete(row)} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Regras

- Cabeçalhos: `text-[10px] uppercase tracking-[0.08em]` — nunca bold ou tamanho normal
- Ações de linha: `opacity-0` por padrão, `opacity-100` no hover da linha
- Tabelas com muitos dados: `overflow-x-auto` no wrapper
- Sempre incluir empty state quando `rows.length === 0`

---

## 8.6 Badge / Pill

Status, roles, tags de contexto, filtros de categoria.

```tsx
// ── Role badge ────────────────────────────────────────────────────
const roleBadgeStyles = {
  admin:     'bg-[rgba(168,85,247,0.12)] border-[rgba(168,85,247,0.3)] text-[#c084fc]',
  clevel:    'bg-[rgba(59,130,246,0.12)] border-[rgba(59,130,246,0.3)] text-[#93c5fd]',
  finance:   'bg-[rgba(34,197,94,0.12)]  border-[rgba(34,197,94,0.3)]  text-[#86efac]',
  marketing: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.3)] text-[#fcd34d]',
}
<span className={`inline-flex items-center rounded-pill px-2 py-0.5 text-[10px] font-medium border ${roleBadgeStyles[role]}`}>
  {role}
</span>

// ── Filter pill — inativo ─────────────────────────────────────────
<button className="rounded-pill px-4 py-1.5 text-[13px] font-normal text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] transition-all duration-fast hover:bg-[var(--surface-hover)]">
  Retratos
</button>

// ── Filter pill — ativo (contexto imagem) ─────────────────────────
<button className="rounded-pill px-4 py-1.5 text-[13px] font-semibold text-[var(--acc-img-mid)] bg-[var(--acc-img-soft)] border border-[var(--acc-img-border)]">
  Retratos
</button>
```

---

## 8.7 Tabs

Navegação entre subseções dentro de uma mesma página.

```tsx
<div className="flex gap-1 border-b border-[var(--border)]" role="tablist">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      role="tab"
      aria-selected={activeTab === tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`
        px-4 py-2.5 text-sm font-medium
        border-b-2 -mb-px transition-all duration-fast
        ${activeTab === tab.id
          ? 'border-[var(--acc-img)] text-[var(--text-primary)]'
          : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
        }
      `}
    >
      {tab.label}
    </button>
  ))}
</div>
```

---

## 8.8 Alert

Feedback contextual — erro, aviso, sucesso.

```tsx
// ── Alert de erro ─────────────────────────────────────────────────
<div
  role="alert"
  className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] text-sm bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-[var(--semantic-error)]"
>
  <AlertCircle size={16} className="mt-0.5 shrink-0" />
  <p>{message}</p>
</div>

// ── Conta bloqueada (warning) ─────────────────────────────────────
<div className="... bg-[rgba(251,191,36,0.07)] border-[rgba(251,191,36,0.2)] text-[#fbbf24]">

// ── Rate limit (orange) ───────────────────────────────────────────
<div className="... bg-[rgba(251,146,60,0.07)] border-[rgba(251,146,60,0.2)] text-[#fb923c]">
```

---

## 8.9 Sidebar

Ver spec completa em [06-admin-panel.md](./06-admin-panel.md#sidebar--anatomia-completa).

---

## 8.10 Toast / Notification

Feedback transitório de ações (sucesso ao salvar, erro de API).

```tsx
// Posição: bottom-right em desktop, bottom-center em mobile.
// z-index: var(--z-toast) — 60

toast.success('Imagem gerada com sucesso')
toast.error('Falha ao processar. Tente novamente.')

// Customização (no ThemeProvider):
<Toaster
  position="bottom-right"
  toastOptions={{
    className: 'bg-[var(--bg-modal)] border border-[var(--border)] text-[var(--text-secondary)] shadow-lg',
  }}
/>
```

Usar **Sonner** ou shadcn/ui toast. Nunca criar toast customizado do zero.

---

## 8.11 Select / Dropdown

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

<Select onValueChange={setValue} value={value}>
  <SelectTrigger
    className="
      w-full rounded-[var(--radius-md)] px-3 py-2 text-sm
      bg-[var(--surface-prompt)] border border-[var(--border-input)]
      text-[var(--text-primary)]
      focus:border-[var(--acc-img-border)]
    "
  >
    <SelectValue placeholder="Selecione..." />
  </SelectTrigger>
  <SelectContent className="bg-[var(--bg-modal)] border border-[var(--border)] shadow-lg">
    <SelectItem value="option1" className="text-sm text-[var(--text-secondary)] focus:bg-[var(--surface-hover)]">
      Opção 1
    </SelectItem>
  </SelectContent>
</Select>
```

Sempre usar shadcn/ui Select — **não criar select nativo estilizado**.
