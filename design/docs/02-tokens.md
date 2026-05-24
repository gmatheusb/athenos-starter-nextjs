# 02 · Tokens Visuais

[← Fundações](./01-foundations.md) · [Componentes →](./03-components.md)

---

## Definição em `globals.css`

Todo este bloco deve estar em `src/app/globals.css`. Nunca duplicar em outros arquivos.

```css
/* ═══════════════════════════════════════════════════════════════
   Athenos DESIGN SYSTEM — TOKEN DEFINITIONS
   Modo light: :root  |  Modo dark: .dark
   ═══════════════════════════════════════════════════════════════ */

:root {
  /* ── Fundos ──────────────────────────────────────── */
  --bg-canvas:         #f8f9fc;
  --bg-modal:          #ffffff;
  --bg-panel-deep:     #f1f5f9;
  --bg-video-player:   #000000;

  /* ── Superfícies ─────────────────────────────────── */
  --surface:           rgba(0, 0, 0, 0.025);
  --surface-hover:     rgba(0, 0, 0, 0.05);
  --surface-deep:      rgba(0, 0, 0, 0.018);
  --surface-prompt:    rgba(0, 0, 0, 0.03);
  --surface-skeleton:  rgba(0, 0, 0, 0.06);

  /* ── Glass ───────────────────────────────────────── */
  --glass:             rgba(248, 249, 252, 0.90);
  --glass-dark:        rgba(241, 245, 249, 0.90);

  /* ── Bordas ──────────────────────────────────────── */
  --border:            rgba(0, 0, 0, 0.08);
  --border-subtle:     rgba(0, 0, 0, 0.06);
  --border-strong:     rgba(0, 0, 0, 0.18);
  --border-input:      rgba(100, 116, 139, 0.22);

  /* ── Texto ───────────────────────────────────────── */
  --text-primary:      #0f172a;
  --text-secondary:    rgba(15, 23, 42, 0.75);
  --text-muted:        rgba(100, 116, 139, 0.75);
  --text-muted-dim:    rgba(100, 116, 139, 0.40);

  /* ── Accent: Imagem (roxo) ───────────────────────── */
  --acc-img:               #7c3aed;
  --acc-img-mid:           #6d28d9;
  --acc-img-soft:          rgba(124, 58, 237, 0.08);
  --acc-img-border:        rgba(124, 58, 237, 0.28);
  --acc-img-border-soft:   rgba(124, 58, 237, 0.18);

  /* ── Accent: Vídeo (pink) ────────────────────────── */
  --acc-vid:               #db2777;
  --acc-vid-mid:           #be185d;
  --acc-vid-soft:          rgba(219, 39, 119, 0.08);
  --acc-vid-border:        rgba(219, 39, 119, 0.28);
  --acc-vid-border-soft:   rgba(219, 39, 119, 0.18);

  /* ── Gradientes ─────────────────────────────────── */
  --grad:           linear-gradient(135deg, #7c3aed, #db2777);
  --grad-text:      linear-gradient(135deg, #7c3aed, #db2777);
  --grad-img:       linear-gradient(135deg, #5b21b6, #7c3aed);
  --grad-vid:       linear-gradient(135deg, #db2777, #ec4899);
  --grad-progress:  linear-gradient(90deg, #7c3aed 0%, #db2777 100%);

  /* ── Semântico ───────────────────────────────────── */
  --semantic-success:       #16a34a;
  --semantic-error:         #dc2626;
  --semantic-warning:       #d97706;
  --semantic-info:          #2563eb;
  --semantic-success-soft:  rgba(22, 163, 74, 0.10);
  --semantic-error-soft:    rgba(220, 38, 38, 0.10);
  --semantic-warning-soft:  rgba(217, 119, 6, 0.10);
  --semantic-info-soft:     rgba(37, 99, 235, 0.10);

  /* ── Border Radius ───────────────────────────────── */
  --radius-sm:   6px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;

  /* ── Sombras ─────────────────────────────────────── */
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.10), 0 2px 6px rgba(0, 0, 0, 0.06);
  --shadow-lg:  0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.06);

  /* ── Transições ──────────────────────────────────── */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 350ms ease;

  /* ── Z-index ─────────────────────────────────────── */
  --z-base:    0;
  --z-sticky:  10;
  --z-popover: 30;
  --z-overlay: 40;
  --z-modal:   50;
  --z-toast:   60;
  --z-tooltip: 70;
}

.dark {
  /* ── Fundos ──────────────────────────────────────── */
  --bg-canvas:         #06080f;
  --bg-modal:          #0f111a;
  --bg-panel-deep:     #080a10;
  --bg-video-player:   #000000;

  /* ── Superfícies ─────────────────────────────────── */
  --surface:           rgba(255, 255, 255, 0.04);
  --surface-hover:     rgba(255, 255, 255, 0.07);
  --surface-deep:      rgba(255, 255, 255, 0.035);
  --surface-prompt:    rgba(255, 255, 255, 0.04);
  --surface-skeleton:  rgba(255, 255, 255, 0.05);

  /* ── Glass ───────────────────────────────────────── */
  --glass:             rgba(6, 8, 15, 0.88);
  --glass-dark:        rgba(10, 13, 22, 0.88);

  /* ── Bordas ──────────────────────────────────────── */
  --border:            rgba(255, 255, 255, 0.07);
  --border-subtle:     rgba(255, 255, 255, 0.06);
  --border-strong:     rgba(255, 255, 255, 0.14);
  --border-input:      rgba(148, 163, 184, 0.14);

  /* ── Texto ───────────────────────────────────────── */
  --text-primary:      #e2e8f0;
  --text-secondary:    rgba(203, 213, 225, 0.85);
  --text-muted:        rgba(148, 163, 184, 0.65);
  --text-muted-dim:    rgba(148, 163, 184, 0.30);

  /* ── Accent: Imagem (roxo) ───────────────────────── */
  --acc-img:               #a855f7;
  --acc-img-mid:           #c084fc;
  --acc-img-soft:          rgba(168, 85, 247, 0.12);
  --acc-img-border:        rgba(168, 85, 247, 0.35);
  --acc-img-border-soft:   rgba(168, 85, 247, 0.22);

  /* ── Accent: Vídeo (pink) ────────────────────────── */
  --acc-vid:               #ff3dbb;
  --acc-vid-mid:           #f472b6;
  --acc-vid-soft:          rgba(255, 61, 187, 0.12);
  --acc-vid-border:        rgba(255, 61, 187, 0.35);
  --acc-vid-border-soft:   rgba(255, 61, 187, 0.22);

  /* ── Gradientes ─────────────────────────────────── */
  --grad:           linear-gradient(135deg, #a855f7, #ff3dbb);
  --grad-text:      linear-gradient(135deg, #a855f7, #ff3dbb);
  --grad-img:       linear-gradient(135deg, #7c3aed, #a855f7);
  --grad-vid:       linear-gradient(135deg, #ff3dbb, #ec4899);
  --grad-progress:  linear-gradient(90deg, #a855f7 0%, #ff3dbb 100%);

  /* ── Semântico ───────────────────────────────────── */
  --semantic-success:       #10b981;
  --semantic-error:         #ef4444;
  --semantic-warning:       #f59e0b;
  --semantic-info:          #60a5fa;
  --semantic-success-soft:  rgba(16, 185, 129, 0.14);
  --semantic-error-soft:    rgba(239, 68, 68, 0.14);
  --semantic-warning-soft:  rgba(245, 158, 11, 0.14);
  --semantic-info-soft:     rgba(96, 165, 250, 0.14);

  /* ── Sombras ─────────────────────────────────────── */
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.30);
  --shadow-md:  0 4px 16px rgba(0, 0, 0, 0.40);
  --shadow-lg:  0 32px 100px rgba(0, 0, 0, 0.80), 0 0 0 1px rgba(255, 255, 255, 0.04);
}

/* ── prefers-reduced-motion ──────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Tabela de Referência Rápida

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--bg-canvas` | `#f8f9fc` | `#06080f` | Fundo de todas as páginas |
| `--bg-modal` | `#ffffff` | `#0f111a` | Fundo de modais e drawers |
| `--surface` | `rgba(0,0,0,0.025)` | `rgba(255,255,255,0.04)` | Cards, caixas |
| `--surface-hover` | `rgba(0,0,0,0.05)` | `rgba(255,255,255,0.07)` | Hover de cards |
| `--glass` | `rgba(248,249,252,0.90)` | `rgba(6,8,15,0.88)` | Barras sticky com backdrop-filter |
| `--border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.07)` | Bordas padrão de cards e modais |
| `--border-strong` | `rgba(0,0,0,0.18)` | `rgba(255,255,255,0.14)` | Bordas de separação e foco |
| `--border-input` | `rgba(100,116,139,0.22)` | `rgba(148,163,184,0.14)` | Borda de inputs em repouso |
| `--text-primary` | `#0f172a` | `#e2e8f0` | Títulos e valores de métrica |
| `--text-secondary` | `rgba(15,23,42,0.75)` | `rgba(203,213,225,0.85)` | Corpo de texto e labels |
| `--text-muted` | `rgba(100,116,139,0.75)` | `rgba(148,163,184,0.65)` | Captions, placeholders, metadados |
| `--acc-img` | `#7c3aed` | `#a855f7` | Cor primária de ações de imagem |
| `--acc-img-mid` | `#6d28d9` | `#c084fc` | Texto sobre fundo acc-img |
| `--acc-img-soft` | `rgba(124,58,237,0.08)` | `rgba(168,85,247,0.12)` | Fundo de pills e tags de imagem |
| `--acc-vid` | `#db2777` | `#ff3dbb` | Cor primária de ações de vídeo |
| `--acc-vid-mid` | `#be185d` | `#f472b6` | Texto sobre fundo acc-vid |
| `--acc-vid-soft` | `rgba(219,39,119,0.08)` | `rgba(255,61,187,0.12)` | Fundo de pills e tags de vídeo |
| `--grad` | `135deg #7c3aed→#db2777` | `135deg #a855f7→#ff3dbb` | Gradiente brand |
| `--semantic-success` | `#16a34a` | `#10b981` | Confirmação, status ativo |
| `--semantic-error` | `#dc2626` | `#ef4444` | Erros e ações destrutivas |
| `--semantic-warning` | `#d97706` | `#f59e0b` | Avisos, limites próximos |
| `--semantic-info` | `#2563eb` | `#60a5fa` | Informações neutras |
| `--shadow-sm` | `0 1px 3px …` | `0 1px 3px …` | Cards padrão |
| `--shadow-md` | `0 4px 12px …` | `0 4px 16px …` | Dropdowns, popovers |
| `--shadow-lg` | `0 20px 60px …` | `0 32px 100px …` | Modais, drawers |

---

## Token Decision Tree

Dúvida sobre qual token de fundo usar? Siga este fluxo:

```
Preciso colorir um fundo. Qual token usar?
│
├─ É a página inteira (body/main)?
│   └─ → --bg-canvas
│
├─ É um modal, drawer ou painel flutuante?
│   └─ → --bg-modal
│
├─ É um painel secundário DENTRO de um modal (ex: preview de imagem)?
│   └─ → --bg-panel-deep
│
├─ É uma barra sticky com blur (header, filtros)?
│   └─ → --glass  (com backdrop-filter: blur(24px))
│
├─ É um card ou caixa de conteúdo normal?
│   ├─ Estado padrão   → --surface
│   ├─ Estado hover    → --surface-hover
│   ├─ Camada mais profunda (dentro de card) → --surface-deep
│   └─ Fundo de input / prompt box → --surface-prompt
│
└─ É um placeholder/skeleton de loading?
    └─ → --surface-skeleton
```

---

## Z-Index Scale

Invariante entre temas. **Sempre usar a variável, nunca o número literal.**

```
--z-base:    0   → conteúdo de página
--z-sticky:  10  → barras fixas, headers
--z-popover: 30  → dropdowns, menus flutuantes, popovers
--z-overlay: 40  → backdrop de modal
--z-modal:   50  → janelas modais
--z-toast:   60  → notificações
--z-tooltip: 70  → dicas flutuantes
```

```tsx
// ✅ Correto
className="z-[var(--z-modal)]"

// ❌ Proibido
className="z-[999]"
```

---

## Tipografia

### Fonte

```css
font-family: "sohne-var", "SF Pro Display", system-ui, -apple-system, sans-serif;
```

`sohne-var` é variável font — suporta `font-weight` em qualquer valor inteiro (300–700). Nunca usar outras fontes sem aprovação.

### Escala Tipográfica

| Role | `font-size` | `font-weight` | `line-height` | `letter-spacing` | Cor padrão |
|---|---|---|---|---|---|
| `page-title` | 22px | 700 | 1.2 | -0.3px | `--text-primary` |
| `section-heading` | 17px | 500 | 1.3 | 0 | `--text-primary` |
| `subsection` | 15px | 500 | 1.4 | 0 | `--text-primary` |
| `body` | 14px | 300 | 1.55 | 0 | `--text-secondary` |
| `body-sm` | 13px | 300 | 1.55 | 0 | `--text-secondary` |
| `label-upper` | 10px | 500 | 1 | 0.08em | `--text-muted` |
| `pill-label-active` | 12–13px | 600 | 1 | 0 | accent-mid |
| `pill-label-inactive` | 12–13px | 400 | 1 | 0 | `--text-muted` |
| `caption` | 12px | 400 | 1.4 | 0 | `--text-muted` |
| `micro` | 10px | 500 | 1 | 0.08em | `--text-muted` |
| `button` | 13px | 500 | 1 | 0 | contextual |
| `restricted-notice` | 11px | 400 | 1.4 | 0.05em | `--text-muted` |

### Classes Tailwind para cada role

```tsx
<h1 className="text-[22px] font-bold tracking-tight text-heading">Título</h1>
<h2 className="text-[17px] font-medium text-heading">Seção</h2>
<p  className="text-sm font-light leading-relaxed text-body">Corpo</p>
<span className="text-[10px] font-medium uppercase tracking-widest text-muted">LABEL</span>
<span className="text-xs text-muted">Caption</span>
```

### Hierarquia Visual — Regra dos 3 Níveis

Em qualquer tela só devem existir **no máximo 3 níveis de hierarquia** tipográfica visíveis simultaneamente:

1. **Título da página** — `page-title` — único por tela
2. **Títulos de seção** — `section-heading` — máx. 4 por tela
3. **Conteúdo** — `body` ou `body-sm` — conteúdo principal

Labels (`label-upper`) e captions não contam como níveis — são metadados.

---

## Sistema de Espaçamento

### Escala Base (4px grid)

Nunca usar valores intermediários (`p-2.5`, `gap-3.5`) exceto em casos de ajuste fino explicitamente justificados.

| Classe | px | Uso |
|---|---|---|
| `gap-1` / `p-1` | 4px | Micro — dentro de badges, entre ícone e texto em pill |
| `gap-2` / `p-2` | 8px | Pequeno — padding interno de tags, gaps de ícones |
| `gap-3` / `p-3` | 12px | Compacto — padding de inputs, botões pequenos |
| `gap-4` / `p-4` | 16px | **Padrão** — padding de cards, gap entre elementos de formulário |
| `gap-5` / `p-5` | 20px | Médio — padding de seções dentro de painéis |
| `gap-6` / `p-6` | 24px | Seção — padding lateral de sidebar, gap entre cards |
| `gap-8` / `p-8` | 32px | Layout — padding de modais, gap entre seções de página |
| `gap-10` / `p-10` | 40px | Grande — espaço entre blocos de conteúdo |
| `gap-12` / `p-12` | 48px | Macro — padding de páginas em desktop |

### Padding de Componentes

| Componente | Padding |
|---|---|
| Button (md) | `py-2 px-4` (8×16px) |
| Button (sm) | `py-1.5 px-3` (6×12px) |
| Button (pill) | `py-2 px-4 rounded-pill` |
| Input | `py-2 px-3` (8×12px) |
| Card | `p-4` ou `p-5` |
| Modal | `p-6` |
| Sidebar item | `py-2.5 px-3.5` |
| Table row | `py-3 px-4` |
| Badge/Pill | `py-1 px-2.5` (4×10px) |
| Filter pill (lg) | `py-1.5 px-4` (6×16px) |

### Containers

```tsx
// Container padrão de página
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

// Container estreito (formulários, auth)
<div className="max-w-md mx-auto px-4 py-12">

// Container de modal
<div className="w-full max-w-[min(1100px,calc(100vw-32px))] max-h-[calc(100vh-48px)]">
```

### Grids de Colunas

```tsx
// Grid de cards responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Grid de formulário 2 colunas
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Grid de stat cards
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
```

---

## Cores de Contexto

### Regra Central

**Nunca escrever um valor de cor diretamente no JSX ou CSS.**

```tsx
// ❌ Errado
<div style={{ color: '#a855f7' }}>
<div className="text-purple-500">

// ✅ Correto
<div className="text-[var(--acc-img-mid)]">
<div className="text-accent-img-mid">
```

### Accents por Contexto

| Contexto | Token principal | Quando usar |
|---|---|---|
| Imagem / Studio | `--acc-img` (roxo) | Botões de geração, pills de imagem, foco |
| Vídeo | `--acc-vid` (pink) | Botões de vídeo, pills de vídeo |
| Brand / "Todos" | `--grad` | Tabs "Todos", CTAs globais, logo |

`--grad` é exclusivo para elementos brand. Nunca usar em elementos específicos de imagem ou vídeo — use `--acc-img` / `--acc-vid` direto.

### Badges de Role (Admin Panel)

Invariantes entre temas — usam alfa baixo, funcionam em ambos:

```css
/* admin */   background: rgba(168,85,247,0.12); border: 1px solid rgba(168,85,247,0.3); color: #c084fc;
/* clevel */  background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.3); color: #93c5fd;
/* finance */ background: rgba(34,197,94,0.12);  border: 1px solid rgba(34,197,94,0.3);  color: #86efac;
/* mktg */    background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.3); color: #fcd34d;
```
