# Athenos Design System
**version:** 2.0 — Dual Theme (Light + Dark)  
**nome:** Athenos-Design-System  
**escopo:** Studio, Galeria, Academy, Admin Panel, Auth Pages  

---

## Índice Rápido

1. [Filosofia do Sistema](#1-filosofia-do-sistema)
2. [Stack Visual](#2-stack-visual)
3. [Estrutura de Pastas](#3-estrutura-de-pastas)
4. [Tokens Visuais e CSS Variables](#4-tokens-visuais-e-css-variables)
5. [Tipografia](#5-tipografia)
6. [Paleta de Cores](#6-paleta-de-cores)
7. [Sistema de Espaçamento](#7-sistema-de-espaçamento)
8. [Componentes Base](#8-componentes-base)
9. [Templates Obrigatórios](#9-templates-obrigatórios)
10. [Fluxo Para Criar Novas Páginas](#10-fluxo-para-criar-novas-páginas)
11. [Regras de Responsividade](#11-regras-de-responsividade)
12. [Regras de Acessibilidade](#12-regras-de-acessibilidade)
13. [Regras de Animação](#13-regras-de-animação)
14. [Convenções de Código](#14-convenções-de-código)
15. [Anti-patterns](#15-anti-patterns)
16. [Checklist Final](#16-checklist-final)
17. [Sistema Glass e Efeitos Especiais](#17-sistema-glass-e-efeitos-especiais)
18. [Admin Panel](#18-admin-panel)
19. [Masonry Grid](#19-masonry-grid)
20. [Hooks & Utilitários](#20-hooks--utilitários)

---

# 1. Filosofia do Sistema

## Identidade Visual

A Athenos é uma plataforma de criação de conteúdo com IA — studio, galeria, academy. A identidade visual carrega dois princípios centrais:

**Legibilidade sobre decoração.** Imagens e vídeos gerados pela IA são o conteúdo principal. A UI serve como contentor neutro que amplifica o conteúdo, nunca concorre com ele.

**Dois modos, uma identidade.** Light e dark compartilham a mesma lógica de acento (roxo + pink), a mesma tipografia, os mesmos tokens de espaçamento e a mesma hierarquia. O que muda é o valor das variáveis — nunca a estrutura.

## Princípios Operacionais

| Princípio | O que significa na prática |
|---|---|
| **Tokens first** | Nunca escrever cor, sombra ou border-radius literal. Sempre usar CSS variable ou classe Tailwind mapeada ao token. |
| **Contexto por accent** | Roxo `#a855f7` → contexto de imagem. Pink `#ff3dbb` → contexto de vídeo. Degradê global → elementos brand / "Todos". |
| **Glass como superfície** | Cards, barras sticky e modais usam camadas de vidro com `backdrop-filter`. Não usar fundos opacos em UI dark. |
| **Responsividade first** | Toda página começa mobile. Desktop é expansão, não refatoração. |
| **Estado sempre explícito** | Toda tela tem loading, empty e error state definidos antes de começar o código. |
| **Zero invenção** | Antes de criar qualquer componente novo, verificar se existe em `/components/ui`, `/components/forms` ou em shadcn/ui. |

## O que este documento proíbe

Este documento funciona como **constituição visual**. Qualquer decisão de UI que contrarie as regras aqui definidas requer:

1. Justificativa documentada no PR
2. Aprovação de um outro desenvolvedor
3. Atualização deste documento caso a exceção vire padrão

---

# 2. Stack Visual

## Tecnologias Obrigatórias

| Camada | Tecnologia | Versão mínima | Observação |
|---|---|---|---|
| Framework | Next.js (App Router) | 14+ | Páginas em `/app`, não `/pages` |
| Estilização | TailwindCSS | 3.4+ | Config em `tailwind.config.ts` |
| Componentes base | shadcn/ui | latest | Sempre usar como ponto de partida |
| Variáveis de tema | CSS Custom Properties | nativo | Definidas em `globals.css` |
| Ícones | Lucide React | latest | Nenhuma outra lib de ícones |
| Animações | Framer Motion | 11+ | Para transições de layout e microinterações |
| Fontes | sohne-var + SF Pro Display | — | Fallback: `system-ui, -apple-system, sans-serif` |

## Convenções de Configuração

### `tailwind.config.ts` — mapeamento obrigatório de CSS variables

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',  // OBRIGATÓRIO: tema controlado pela classe .dark no <html>
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:       'var(--bg-canvas)',
        modal:        'var(--bg-modal)',
        panel:        'var(--bg-panel-deep)',
        surface:      'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        'glass-bar':  'var(--glass)',
        border:          'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'border-input':  'var(--border-input)',
        heading:      'var(--text-primary)',
        body:         'var(--text-secondary)',
        muted:        'var(--text-muted)',
        'muted-dim':  'var(--text-muted-dim)',
        // Accents
        'accent-img':     'var(--acc-img)',
        'accent-img-mid': 'var(--acc-img-mid)',
        'accent-img-bg':  'var(--acc-img-soft)',
        'accent-vid':     'var(--acc-vid)',
        'accent-vid-mid': 'var(--acc-vid-mid)',
        'accent-vid-bg':  'var(--acc-vid-soft)',
        // Semântico
        success:          'var(--semantic-success)',
        error:            'var(--semantic-error)',
        warning:          'var(--semantic-warning)',
        info:             'var(--semantic-info)',
        'success-soft':   'var(--semantic-success-soft)',
        'error-soft':     'var(--semantic-error-soft)',
        'warning-soft':   'var(--semantic-warning-soft)',
        'info-soft':      'var(--semantic-info-soft)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: '9999px',
      },
      boxShadow: {
        sm:    'var(--shadow-sm)',
        md:    'var(--shadow-md)',
        lg:    'var(--shadow-lg)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '350ms',
      },
      fontFamily: {
        sans: ["sohne-var", "'SF Pro Display'", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
}

export default config
```

### Ativação de tema

```tsx
// app/layout.tsx — lógica de tema
// O atributo class no <html> controla o tema.
// 'dark' ativa o bloco .dark { } no globals.css.

<html lang="pt-BR" className={theme === 'dark' ? 'dark' : ''}>
```

---

# 3. Estrutura de Pastas

## Arquitetura Canônica

```
src/
├── app/                    # Rotas Next.js App Router
│   ├── (auth)/             # Grupo de rotas de autenticação
│   │   ├── login/
│   │   └── change-password/
│   ├── (app)/              # Rotas autenticadas
│   │   ├── studio/
│   │   ├── galeria/
│   │   ├── academy/
│   │   └── admin/
│   ├── globals.css         # Tokens CSS, @keyframes, reset
│   └── layout.tsx          # Shell global: <html>, ThemeProvider, fonts
│
├── components/
│   ├── ui/                 # Átomos e shadcn/ui customizados
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Dialog.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Select.tsx
│   │   ├── Tabs.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   ├── forms/              # Formulários compostos
│   │   ├── LoginForm.tsx
│   │   ├── UserCreateForm.tsx
│   │   └── ...
│   ├── layout/             # Estrutura de página
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageShell.tsx
│   │   └── GlassBar.tsx
│   ├── gallery/            # Componentes específicos da galeria
│   │   ├── MasonryGrid.tsx
│   │   ├── MediaCard.tsx
│   │   ├── ImageDetailModal.tsx
│   │   └── VideoDetailModal.tsx
│   └── studio/             # Componentes específicos do studio
│       ├── PromptBox.tsx
│       ├── GenerateButton.tsx
│       └── SkeletonGrid.tsx
│
├── templates/              # Layouts de página reutilizáveis
│   ├── DashboardTemplate.tsx
│   ├── CRUDTemplate.tsx
│   ├── ListTemplate.tsx
│   ├── AuthTemplate.tsx
│   └── WizardTemplate.tsx
│
├── hooks/                  # 9 custom React hooks
│   ├── useAsync.ts         # operações assíncronas (loading, error, execute, reset)
│   ├── useDebounce.ts      # debounce de valor com delay configurável
│   ├── useInterval.ts      # setInterval declarativo (delay: null pausa)
│   ├── useKeyboard.ts      # atalhos de teclado com modificadores
│   ├── useLocalStorage.ts  # estado persistido com sync entre abas
│   ├── useMediaQuery.ts    # breakpoints responsivos
│   ├── useOnClickOutside.ts # fechar dropdown/popover ao clicar fora
│   ├── useTheme.ts         # toggle dark/light com persistência
│   ├── useToast.ts         # disparar toasts globais
│   └── index.ts            # barrel export
│
├── lib/                    # 3 módulos de utilitários + cn
│   ├── format.ts           # formatCurrency, formatDate, formatBytes, slugify, truncate...
│   ├── validators.ts       # isValidCPF, isValidEmail, isValidPhone, isValidURL...
│   ├── dates.ts            # addDays, diffInDays, startOfMonth, isBefore, isBetween...
│   ├── utils.ts            # cn() — clsx + tailwind-merge
│   └── index.ts            # barrel export
│
├── styles/                 # Estilos auxiliares (NÃO para tokens — ficam em globals.css)
│   └── animations.css      # @keyframes complexos que não cabem em Tailwind
│
├── theme/                  # Configuração e utilitários de tema
│   ├── tokens.ts           # Tokens exportados como objetos TS para uso em Framer Motion etc.
│   └── ThemeProvider.tsx
│
└── tokens/                 # Fonte única de verdade dos valores brutos
    └── index.ts            # Exporta constantes: COLORS, RADIUS, SHADOWS, etc.
```

## Responsabilidades por Pasta

| Pasta | O que entra | O que NÃO entra |
|---|---|---|
| `components/ui` | Botões, inputs, badges, dialogs — stateless ou com estado mínimo de UI | Lógica de negócio, chamadas de API |
| `components/forms` | Formulários com validação (React Hook Form + Zod) | Lógica de submissão além de `onSubmit(data)` |
| `components/layout` | Sidebar, Navbar, shells — estruturas de página | Conteúdo específico de feature |
| `templates` | Layouts reutilizáveis de página (com slots para conteúdo) | Conteúdo real — só estrutura |
| `hooks` | Custom hooks reutilizáveis | Hooks de componente único — ficar no próprio arquivo |
| `styles` | Keyframes complexos, reset global | Classes utilitárias (usar Tailwind) |
| `theme` | ThemeProvider, utilitários de tema | Lógica de UI |
| `tokens` | Valores brutos exportados como TS const | Lógica de aplicação |

---

# 4. Tokens Visuais e CSS Variables

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
  --glass:         rgba(248, 249, 252, 0.90);
  --glass-dark:        rgba(241, 245, 249, 0.90);

  /* ── Bordas ──────────────────────────────────────── */
  --border:            rgba(0, 0, 0, 0.08);
  --border-subtle:     rgba(0, 0, 0, 0.06);
  --border-strong:     rgba(0, 0, 0, 0.18);
  --border-input:      rgba(100, 116, 139, 0.22);

  /* ── Texto ───────────────────────────────────────── */
  --text-primary:      #0f172a;
  --text-secondary:         rgba(15, 23, 42, 0.75);
  --text-muted:        rgba(100, 116, 139, 0.75);
  --text-muted-dim:    rgba(100, 116, 139, 0.40);

  /* ── Accent: Imagem (roxo) — light ──────────────── */
  --acc-img:      #7c3aed;
  --acc-img-mid:  #6d28d9;
  --acc-img-soft:   rgba(124, 58, 237, 0.08);
  --acc-img-border:  rgba(124, 58, 237, 0.28);
  --acc-img-border-soft: rgba(124, 58, 237, 0.18);

  /* ── Accent: Vídeo (pink) — light ───────────────── */
  --acc-vid:      #db2777;
  --acc-vid-mid:  #be185d;
  --acc-vid-soft:   rgba(219, 39, 119, 0.08);
  --acc-vid-border:  rgba(219, 39, 119, 0.28);
  --acc-vid-border-soft: rgba(219, 39, 119, 0.18);

  /* ── Gradientes ─────────────────────────────────── */
  --grad:           linear-gradient(135deg, #7c3aed, #db2777);
  --grad-text:      linear-gradient(135deg, #7c3aed, #db2777);
  --grad-img:       linear-gradient(135deg, #5b21b6, #7c3aed);
  --grad-vid:       linear-gradient(135deg, #db2777, #ec4899);
  --grad-progress:  linear-gradient(90deg, #7c3aed 0%, #db2777 100%);

  /* ── Semântico ───────────────────────────────────── */
  --semantic-success:      #16a34a;
  --semantic-error:        #dc2626;
  --semantic-warning:      #d97706;
  --semantic-info:         #2563eb;
  --semantic-success-soft: rgba(22, 163, 74, 0.10);
  --semantic-error-soft:   rgba(220, 38, 38, 0.10);
  --semantic-warning-soft: rgba(217, 119, 6, 0.10);
  --semantic-info-soft:    rgba(37, 99, 235, 0.10);

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
  --glass:         rgba(6, 8, 15, 0.88);
  --glass-dark:        rgba(10, 13, 22, 0.88);

  /* ── Bordas ──────────────────────────────────────── */
  --border:            rgba(255, 255, 255, 0.07);
  --border-subtle:     rgba(255, 255, 255, 0.06);
  --border-strong:     rgba(255, 255, 255, 0.14);
  --border-input:      rgba(148, 163, 184, 0.14);

  /* ── Texto ───────────────────────────────────────── */
  --text-primary:      #e2e8f0;
  --text-secondary:         rgba(203, 213, 225, 0.85);
  --text-muted:        rgba(148, 163, 184, 0.65);
  --text-muted-dim:    rgba(148, 163, 184, 0.30);

  /* ── Accent: Imagem (roxo) — dark ───────────────── */
  --acc-img:      #a855f7;
  --acc-img-mid:  #c084fc;
  --acc-img-soft:   rgba(168, 85, 247, 0.12);
  --acc-img-border:  rgba(168, 85, 247, 0.35);
  --acc-img-border-soft: rgba(168, 85, 247, 0.22);

  /* ── Accent: Vídeo (pink) — dark ─────────────────── */
  --acc-vid:      #ff3dbb;
  --acc-vid-mid:  #f472b6;
  --acc-vid-soft:   rgba(255, 61, 187, 0.12);
  --acc-vid-border:  rgba(255, 61, 187, 0.35);
  --acc-vid-border-soft: rgba(255, 61, 187, 0.22);

  /* ── Gradientes ─────────────────────────────────── */
  --grad:           linear-gradient(135deg, #a855f7, #ff3dbb);
  --grad-text:      linear-gradient(135deg, #a855f7, #ff3dbb);
  --grad-img:       linear-gradient(135deg, #7c3aed, #a855f7);
  --grad-vid:       linear-gradient(135deg, #ff3dbb, #ec4899);
  --grad-progress:  linear-gradient(90deg, #a855f7 0%, #ff3dbb 100%);

  /* ── Semântico ───────────────────────────────────── */
  --semantic-info:         #60a5fa;
  --semantic-success-soft: rgba(16, 185, 129, 0.14);
  --semantic-error-soft:   rgba(239, 68, 68, 0.14);
  --semantic-warning-soft: rgba(245, 158, 11, 0.14);
  --semantic-info-soft:    rgba(96, 165, 250, 0.14);

  /* ── Sombras ─────────────────────────────────────── */
  --shadow-sm:  0 1px 3px rgba(0, 0, 0, 0.30);
  --shadow-md:  0 4px 16px rgba(0, 0, 0, 0.40);
  --shadow-lg:  0 32px 100px rgba(0, 0, 0, 0.80), 0 0 0 1px rgba(255, 255, 255, 0.04);
}
```

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
| `--acc-img-mid` | `#6d28d9` | `#c084fc` | Texto sobre fundo acc-img (melhor contraste) |
| `--acc-img-soft` | `rgba(124,58,237,0.08)` | `rgba(168,85,247,0.12)` | Fundo de pills e tags de imagem |
| `--acc-vid` | `#db2777` | `#ff3dbb` | Cor primária de ações de vídeo |
| `--acc-vid-mid` | `#be185d` | `#f472b6` | Texto sobre fundo acc-vid |
| `--acc-vid-soft` | `rgba(219,39,119,0.08)` | `rgba(255,61,187,0.12)` | Fundo de pills e tags de vídeo |
| `--grad` | `135deg #7c3aed→#db2777` | `135deg #a855f7→#ff3dbb` | Gradiente brand (botões, logo) |
| `--semantic-success` | `#16a34a` | `#10b981` | Confirmação, status ativo |
| `--semantic-error` | `#dc2626` | `#ef4444` | Erros e ações destrutivas |
| `--semantic-warning` | `#d97706` | `#f59e0b` | Avisos, limites próximos |
| `--semantic-info` | `#2563eb` | `#60a5fa` | Informações neutras |
| `--shadow-sm` | `0 1px 3px …` | `0 1px 3px …` | Cards padrão |
| `--shadow-md` | `0 4px 12px …` | `0 4px 16px …` | Dropdowns, popovers |
| `--shadow-lg` | `0 20px 60px …` | `0 32px 100px …` | Modais, drawers |

## Z-Index Scale (invariante entre temas)

```
0   → base (conteúdo de página)
10  → sticky (barras fixas, headers)
20  → dropdown (menus flutuantes)
40  → overlay (backdrop de modal)
50  → modal (janelas modais)
60  → toast (notificações)
70  → tooltip (dicas flutuantes)
```

Usar sempre a variável `var(--z-modal)` etc., nunca valor numérico literal.

---

# 5. Tipografia

## Fonte

```css
font-family: "sohne-var", "SF Pro Display", system-ui, -apple-system, sans-serif;
```

A fonte `sohne-var` é uma variável font — suporta `font-weight` em qualquer valor inteiro (300–700). Nunca usar fontes de terceiros sem aprovação.

## Escala Tipográfica

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

## Classes Tailwind para cada role

```tsx
// Correto — usar os aliases
<h1 className="text-[22px] font-bold tracking-tight text-heading">Título</h1>
<h2 className="text-[17px] font-medium text-heading">Seção</h2>
<p  className="text-sm font-light leading-relaxed text-body">Corpo</p>
<span className="text-[10px] font-medium uppercase tracking-widest text-muted">LABEL</span>
<span className="text-xs text-muted">Caption</span>
```

## Hierarquia Visual — Regra dos 3 Níveis

Em qualquer tela só devem existir **no máximo 3 níveis de hierarquia** tipográfica visíveis simultaneamente:

1. **Título da página** — `page-title` — único por tela
2. **Títulos de seção** — `section-heading` — máx. 4 por tela
3. **Conteúdo** — `body` ou `body-sm` — conteúdo principal

Labels (`label-upper`) e captions não contam como níveis de hierarquia — são metadados.

---

# 6. Paleta de Cores

## Regra Central

**Nunca escrever um valor de cor diretamente no JSX ou CSS.** Sempre referenciar um token.

```tsx
// ❌ Errado
<div style={{ color: '#a855f7' }}>
<div className="text-purple-500">

// ✅ Correto
<div className="text-[var(--acc-img-mid)]">
<div className="text-accent-img-mid">   // se mapeado no tailwind.config
```

## Fundos e Superfícies

### Quando usar cada nível de fundo

```
--bg-canvas        → fundo de toda a página (body / main)
--bg-modal         → fundo de modais, drawers, painéis flutuantes
--bg-panel-deep    → painel secundário dentro de modal (ex: preview de imagem)
--surface          → cards, caixas de conteúdo sobre o canvas
--surface-hover    → estado hover de surface
--glass        → barras sticky com backdrop-filter
```

### Anti-patterns de fundo

```tsx
// ❌ Errado — cor opaca em dark mode
<div className="bg-white dark:bg-gray-900">

// ❌ Errado — hardcode de cor
<div style={{ backgroundColor: '#06080f' }}>

// ✅ Correto — token via CSS variable
<div className="bg-canvas">
<div className="bg-[var(--surface)]">
```

## Accents por Contexto

O sistema possui **dois accents temáticos** que determinam o contexto visual:

### Roxo — Contexto de Imagem

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--acc-img` | `#7c3aed` | `#a855f7` | Cor principal de ações de imagem |
| `--acc-img-mid` | `#6d28d9` | `#c084fc` | **Texto sobre fundo do tema** (melhor contraste) |
| `--acc-img-soft` | `rgba(124,58,237,0.08)` | `rgba(168,85,247,0.12)` | Fundo de pills e tags ativos |
| `--acc-img-border` | `rgba(124,58,237,0.28)` | `rgba(168,85,247,0.35)` | Borda de pills e tags ativos |
| `--acc-img-border-soft` | `rgba(124,58,237,0.18)` | `rgba(168,85,247,0.22)` | Borda de botões secundários |

### Pink — Contexto de Vídeo

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--acc-vid` | `#db2777` | `#ff3dbb` | Cor principal de ações de vídeo |
| `--acc-vid-mid` | `#be185d` | `#f472b6` | Texto sobre fundo do tema |
| `--acc-vid-soft` | `rgba(219,39,119,0.08)` | `rgba(255,61,187,0.12)` | Fundo de pills e tags ativos |
| `--acc-vid-border` | `rgba(219,39,119,0.28)` | `rgba(255,61,187,0.35)` | Borda de pills e tags ativos |

### Degradê Global (Brand)

```css
/* --grad: tabs "Todos", barra de progresso, CTAs de brand, logotipo */
/* light */ linear-gradient(135deg, #7c3aed, #db2777)
/* dark  */ linear-gradient(135deg, #a855f7, #ff3dbb)

/* --grad-img: botões e pills de ação de imagem */
linear-gradient(135deg, #5b21b6, #7c3aed)

/* --grad-vid: botões e pills de ação de vídeo */
linear-gradient(135deg, #db2777, #ec4899)

/* --grad-text: aplicado via background-clip:text em valores de destaque */
/* mesmo valor de --grad no tema ativo */
```

**Regra:** `--grad` é exclusivo para elementos brand ou "todos os contextos". Nunca usar em elementos específicos de imagem ou vídeo — use `--acc-img` / `--acc-vid` direto.

## Semântico

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--semantic-success` | `#16a34a` | `#10b981` | Confirmação, upload completo, status ativo |
| `--semantic-error` | `#dc2626` | `#ef4444` | Erro, ação destrutiva, validação falha |
| `--semantic-warning` | `#d97706` | `#f59e0b` | Aviso, senha pendente, atenção |
| `--semantic-info` | `#2563eb` | `#60a5fa` | Informações neutras, dicas, status de sistema |
| `--semantic-success-soft` | `rgba(22,163,74,0.10)` | `rgba(16,185,129,0.14)` | Fundo de badges e banners de sucesso |
| `--semantic-error-soft` | `rgba(220,38,38,0.10)` | `rgba(239,68,68,0.14)` | Fundo de badges e banners de erro |
| `--semantic-warning-soft` | `rgba(217,119,6,0.10)` | `rgba(245,158,11,0.14)` | Fundo de badges e banners de aviso |
| `--semantic-info-soft` | `rgba(37,99,235,0.10)` | `rgba(96,165,250,0.14)` | Fundo de badges e banners de info |

## Badges de Role (Admin Panel)

Invariantes entre temas (alfa baixo funciona em ambos):

```css
/* admin */
background: rgba(168, 85, 247, 0.12);  border: 1px solid rgba(168, 85, 247, 0.3);  color: #c084fc;
/* clevel */
background: rgba(59, 130, 246, 0.12);  border: 1px solid rgba(59, 130, 246, 0.3);  color: #93c5fd;
/* finance */
background: rgba(34, 197, 94, 0.12);   border: 1px solid rgba(34, 197, 94, 0.3);   color: #86efac;
/* marketing */
background: rgba(245, 158, 11, 0.12);  border: 1px solid rgba(245, 158, 11, 0.3);  color: #fcd34d;
```

---

# 7. Sistema de Espaçamento

## Escala Base (4px grid)

O sistema usa o grid de 4px do Tailwind. Nunca usar valores intermediários (`p-2.5`, `gap-3.5`) exceto em casos de ajuste fino explicitamente justificados.

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

## Containers

```tsx
// Container padrão de página
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

// Container estreito (formulários, auth)
<div className="max-w-md mx-auto px-4 py-12">

// Container de modal
<div className="w-full max-w-[min(1100px,calc(100vw-32px))] max-h-[calc(100vh-48px)]">
```

## Grid de Colunas

```tsx
// Grid de cards responsivo
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Grid de formulário 2 colunas
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// Grid de stat cards
<div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
```

## Padding de Componentes

| Componente | Padding |
|---|---|
| Button (md) | `py-2 px-4` (8px 16px) |
| Button (sm) | `py-1.5 px-3` (6px 12px) |
| Button (pill) | `py-2 px-4 rounded-pill` |
| Input | `py-2 px-3` (8px 12px) |
| Card | `p-4` ou `p-5` |
| Modal | `p-6` |
| Sidebar item | `py-2.5 px-3.5` |
| Table row | `py-3 px-4` |
| Badge/Pill | `py-1 px-2.5` (4px 10px) |
| Filter pill (lg) | `py-1.5 px-4` (6px 16px) |

---

# 8. Componentes Base

## 8.1 Button

### Objetivo
Ação primária, secundária, destrutiva ou ghost. Nunca usar `<div>` como botão.

### Variantes

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

- Sempre incluir `focus-visible:ring-2` para acessibilidade
- Sempre incluir `disabled:opacity-40 disabled:cursor-not-allowed`
- `active:scale-[0.98]` em botões primários — feedback táctil
- Botões de submit em formulários: sempre `type="submit"`
- Botões sem ação de submit: sempre `type="button"`
- Nunca `onClick` com `href` — usar `<Link>` do Next.js

### Variantes Proibidas

```tsx
// ❌ Cor hardcoded
<button className="bg-purple-500">

// ❌ Div como botão
<div onClick={fn} className="cursor-pointer">

// ❌ Botão sem texto acessível e sem aria-label
<button><X /></button>
```

---

## 8.2 Input

### Objetivo
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
```

### Regras

- Label sempre acima do input, com `htmlFor` + `id` correspondentes
- `placeholder` opacity 30% — nunca como substituto de label
- Foco com borda accent + ring sutil (não apenas mudança de cor)
- Inputs de senha: sempre incluir toggle de visibilidade
- Validação de erro: adicionar `aria-invalid="true"` e `aria-describedby` apontando para a mensagem de erro

### Estado de Erro

```tsx
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

---

## 8.3 Card

### Objetivo
Contentor de conteúdo genérico — media card, stat card, info card.

```tsx
// ── Card padrão ──────────────────────────────────────────────────
<div
  className="
    rounded-[var(--radius-xl)] p-4
    bg-[var(--surface)]
    border border-[var(--border)]
    shadow-card
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

- Cards de galeria/media: `border-radius: var(--radius-md)` (8px), sem padding
- Cards de conteúdo: `border-radius: var(--radius-xl)` (16px), com padding
- Nunca usar `box-shadow` colorido para simular borda — usar `border`
- Cards clicáveis: adicionar `cursor-pointer` e `role="button"` ou envolver em `<button>`

---

## 8.4 Modal / Dialog

### Objetivo
Janela flutuante para detalhes, confirmações e formulários complexos.

```tsx
// ── Estrutura de Modal ────────────────────────────────────────────
// Backdrop
<div
  className="
    fixed inset-0 z-[var(--z-overlay)]
    bg-black/80 backdrop-blur-[20px]
    flex items-center justify-center p-4
  "
  onClick={onClose}
  aria-hidden="true"
>
  {/* Container — stopPropagation impede fechar ao clicar no modal */}
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
      shadow-modal
      overflow-hidden
    "
  >
    {/* Botão fechar */}
    <button
      onClick={onClose}
      aria-label="Fechar modal"
      className="absolute top-3 right-3 ..."
    >
      <X size={14} />
    </button>

    {/* Conteúdo */}
    <div id="modal-title" className="text-[17px] font-medium text-[var(--text-primary)] p-6">
      Título do modal
    </div>
    {children}
  </div>
</div>
```

### Layout de Modal Duplo Painel (Image/Video Detail)

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

- Sempre `aria-modal="true"` e `aria-labelledby` apontando para o título
- Fechar ao pressionar `Escape`: `useEffect` com `keydown` listener
- Foco: ao abrir o modal, mover foco para o primeiro elemento interativo
- Backdrop: `bg-black/80` + `backdrop-blur-[20px]` — nunca apenas overlay sem blur
- Modal de confirmação de exclusão: max-width `380px`; modal de form: max-width `420px`

---

## 8.5 Table

### Objetivo
Exibição de dados tabulares no admin panel.

```tsx
// ── Tabela de dados ──────────────────────────────────────────────
<div className="rounded-[var(--radius-lg)] border border-[var(--border)] overflow-hidden">
  <table className="w-full">
    <thead>
      <tr className="bg-[var(--surface-deep)] border-b border-[var(--border-subtle)]">
        <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted-dim)]">
          Nome
        </th>
        {/* ... */}
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
          {/* ações aparecem só no hover */}
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
- Sempre incluir estado vazio quando `rows.length === 0`
- Linhas clicáveis: cursor-pointer + aria para acessibilidade

---

## 8.6 Badge / Pill

### Objetivo
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

// ── Status badge ──────────────────────────────────────────────────
<span className="inline-flex items-center rounded-pill px-2.5 py-0.5 text-[11px] font-medium bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] text-[#4ade80]">
  Ativo
</span>

// ── Filter pill (galeria) — inativo ───────────────────────────────
<button className="rounded-pill px-4 py-1.5 text-[13px] font-normal whitespace-nowrap text-[var(--text-muted)] bg-[var(--surface)] border border-[var(--border)] transition-all duration-fast hover:bg-[var(--surface-hover)]">
  Retratos
</button>

// ── Filter pill — ativo (contexto imagem) ─────────────────────────
<button className="rounded-pill px-4 py-1.5 text-[13px] font-semibold whitespace-nowrap text-[var(--acc-img-mid)] bg-[var(--acc-img-soft)] border border-[var(--acc-img-border)]">
  Retratos
</button>
```

---

## 8.7 Tabs

### Objetivo
Navegação entre subseções dentro de uma mesma página.

```tsx
// ── Tabs com underline (navegação interna) ────────────────────────
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

### Objetivo
Feedback contextual — erro, aviso, sucesso. Nunca usar para informação genérica.

```tsx
// ── Alert de erro ─────────────────────────────────────────────────
<div
  role="alert"
  className="flex items-start gap-2.5 p-3 rounded-[var(--radius-md)] text-sm bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] text-[var(--semantic-error)]"
>
  <AlertCircle size={16} className="mt-0.5 shrink-0" />
  <p>{message}</p>
</div>

// ── Conta bloqueada (LOCKED) ──────────────────────────────────────
<div className="... bg-[rgba(251,191,36,0.07)] border-[rgba(251,191,36,0.2)] text-[#fbbf24]">

// ── Rate limit ────────────────────────────────────────────────────
<div className="... bg-[rgba(251,146,60,0.07)] border-[rgba(251,146,60,0.2)] text-[#fb923c]">
```

---

## 8.9 Sidebar

Ver seção completa [18. Admin Panel](#18-admin-panel).

---

## 8.10 Toast / Notification

### Objetivo
Feedback transitório de ações (sucesso ao salvar, erro de API).

```tsx
// Usar Sonner ou shadcn/ui toast.
// Posição: bottom-right em desktop, bottom-center em mobile.
// z-index: var(--z-toast) — 60

toast.success('Imagem gerada com sucesso')
toast.error('Falha ao processar. Tente novamente.')

// Customização de estilo (no ThemeProvider):
<Toaster
  position="bottom-right"
  toastOptions={{
    className: 'bg-[var(--bg-modal)] border border-[var(--border)] text-[var(--text-secondary)] shadow-modal',
  }}
/>
```

---

## 8.11 Select / Dropdown

```tsx
// Sempre usar shadcn/ui Select — não criar select nativo estilizado.
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
  <SelectContent className="bg-[var(--bg-modal)] border border-[var(--border)] shadow-modal">
    <SelectItem value="option1" className="text-sm text-[var(--text-secondary)] focus:bg-[var(--surface-hover)]">
      Opção 1
    </SelectItem>
  </SelectContent>
</Select>
```

---

# 9. Templates Obrigatórios

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
      {/* Orbs decorativos — ver seção 17 */}
      <AuthOrbs />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[380px]">
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <AthenosLogo />
          <span className="text-[17px] font-bold tracking-tight text-[var(--text-primary)]">Athenos</span>
        </div>

        {/* Formulário */}
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-xl)] p-6 shadow-card">
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
        {/* Header sticky */}
        <GlassBar>
          <h1 className="text-[22px] font-bold tracking-[-0.3px] text-[var(--text-primary)]">{pageTitle}</h1>
          <div className="flex items-center gap-3">{actions}</div>
        </GlassBar>
        {/* Content */}
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
// Estrutura de página CRUD completa
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

// Skeleton de cards de galeria — ver seção 19
```

---

## 9.6 Template: Error State

```tsx
// Para erros de página completa (404, 500, falha de API)
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

Ver seção completa [19. Masonry Grid](#19-masonry-grid).

---

## 9.8 Template: Wizard / Multi-step

```tsx
// Estrutura de wizard com steps
export function WizardTemplate({ steps, currentStep, children }: WizardProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <div className={`flex items-center gap-2 ${i <= currentStep ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < currentStep ? 'bg-[var(--grad)]' : i === currentStep ? 'border-2 border-[var(--acc-img)]' : 'bg-[var(--surface)]'}`}>
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
      {/* Conteúdo do step atual */}
      {children}
    </div>
  )
}
```

---

# 10. Fluxo Para Criar Novas Páginas

## Passo a Passo Obrigatório

### 1. Identificar o template

Antes de qualquer código, responder:
- Qual template se aplica? (Dashboard, CRUD, Auth, Galeria, Wizard?)
- Se nenhum: documentar o motivo e criar o template reutilizável primeiro.

### 2. Mapear os estados da página

Toda página tem **obrigatoriamente**:

```
[ ] Loading state — como é o skeleton?
[ ] Empty state — o que aparece sem dados?
[ ] Error state — o que aparece com falha?
[ ] Populated state — o estado normal com dados
```

### 3. Verificar componentes existentes

Antes de criar qualquer novo componente:

1. Buscar em `/components/ui`
2. Buscar em `/components/forms`
3. Buscar em shadcn/ui (https://ui.shadcn.com)
4. Só criar se realmente não existir

### 4. Usar tokens, não valores hardcoded

```tsx
// ❌ Antes de criar
style={{ color: '#e2e8f0', background: '#06080f' }}
className="text-slate-200 bg-[#06080f]"

// ✅ Depois da verificação
className="text-[var(--text-primary)] bg-canvas"
```

### 5. Estruturar o JSX

Ordem obrigatória dentro de um page component:

```tsx
export default function MinhaPagina() {
  // 1. Hooks (useState, useEffect, custom hooks)
  // 2. Queries / mutations (React Query, SWR)
  // 3. Handlers (funções de evento — prefixo handle)
  // 4. Early returns (loading, error)
  // 5. Render principal
}
```

### 6. Checklist de responsividade

```
[ ] Mobile (320px): layout não quebra, texto não overflows
[ ] Tablet (768px): mudança de layout se necessário
[ ] Desktop (1280px+): uso do espaço extra
[ ] Testar com larguras intermediárias (480px, 640px, 1024px)
```

### 7. Checklist de acessibilidade

```
[ ] Todos os botões têm texto ou aria-label
[ ] Todos os inputs têm label associada
[ ] Imagens têm alt (ou alt="" se decorativas)
[ ] Contraste de texto ≥ 4.5:1 (normal) ou ≥ 3:1 (grande)
[ ] Navegação por Tab funciona na ordem lógica
[ ] Focus visible em todos os elementos interativos
```

### 8. Validar tema dark e light

```
[ ] Abrir no Chrome com prefers-color-scheme: dark
[ ] Alternar via toggle de tema da aplicação
[ ] Verificar se cores não "somem" em algum tema
[ ] Verificar se glassmorphism tem contraste suficiente no light
```

---

## Anti-patterns ao criar páginas

### ❌ Criar CSS novo sem verificar tokens

```css
/* globals.css — ERRADO */
.my-card {
  background: #0f111a;
  border: 1px solid rgba(255,255,255,0.07);
}
```

```tsx
/* CORRETO */
<div className="bg-[var(--bg-modal)] border border-[var(--border)]">
```

### ❌ Componente ad-hoc em vez de reutilizável

```tsx
// ❌ Dentro de uma página — não reutilizável
function UserBadge({ role }) {
  return <span style={{ color: role === 'admin' ? '#c084fc' : '#86efac' }}>{role}</span>
}

// ✅ Em components/ui/Badge.tsx
import { RoleBadge } from '@/components/ui/Badge'
<RoleBadge role={user.role} />
```

### ❌ Lógica de negócio dentro do JSX

```tsx
// ❌
{users.filter(u => u.role === 'admin').map(u => ...)}

// ✅
const adminUsers = useMemo(() => users.filter(u => u.role === 'admin'), [users])
{adminUsers.map(u => ...)}
```

---

# 11. Regras de Responsividade

## Mobile First — Regra Absoluta

Todo componente começa com estilos para mobile (sem prefixo). Breakpoints adicionam estilos para telas maiores.

```tsx
// ✅ Mobile first
<div className="flex flex-col gap-4 md:flex-row md:gap-6">

// ❌ Desktop first (proibido)
<div className="flex flex-row gap-6 sm:flex-col">
```

## Breakpoints

Usar exclusivamente os breakpoints do Tailwind. Nunca criar media queries customizadas em CSS.

| Prefixo | Min-width | Dispositivo |
|---|---|---|
| (nenhum) | 0px | Mobile pequeno |
| `sm:` | 640px | Mobile grande |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Laptop |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Desktop grande |

## Comportamentos por Breakpoint

### Sidebar (Admin Panel)

```
Mobile (< md):  sidebar escondida, ícone de hambúrguer no header
md:             sidebar em drawer lateral (sheet)
lg+:            sidebar fixa 236px
```

### Galeria / Masonry

```
Mobile:   1–2 colunas (calculado por ResizeObserver)
md:       3–4 colunas
lg:       4–6 colunas
xl+:      6–10 colunas (max 10)
```

### Modal duplo painel

```
Mobile:   column — imagem no topo (260px), detalhes embaixo (scroll)
md+:      row — imagem à esquerda (flex:1), detalhes à direita (360px)
```

### Containers de página

```tsx
// Padding lateral responsivo padrão
<div className="px-4 sm:px-6 lg:px-8">

// Container com largura máxima
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```

## Texto Responsivo

```tsx
// Títulos que escalam
<h1 className="text-[18px] sm:text-[22px] font-bold tracking-tight">

// Grids que se adaptam
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
```

## Nunca

```tsx
// ❌ Ocultar conteúdo em mobile sem fallback
<div className="hidden md:block">conteúdo importante</div>

// ❌ Usar px fixo em larguras que precisam ser fluidas
<div style={{ width: '1200px' }}>

// ❌ Font-size fixo que não considera mobile
className="text-[22px]"  // quando deveria ser text-[18px] sm:text-[22px]
```

---

# 12. Regras de Acessibilidade

## Requisitos Mínimos Obrigatórios

### Semântica HTML

```tsx
// ✅ Usar elementos semânticos
<header>, <nav>, <main>, <aside>, <footer>
<article>, <section>, <h1>–<h6>
<button> para ações, <a> para navegação
<ul>/<ol>/<li> para listas
<table>/<thead>/<tbody>/<tr>/<th>/<td> para dados tabulares

// ❌ Nunca usar div/span para estrutura semântica
<div className="navbar">...</div>
<div onClick={fn}>Clique aqui</div>
```

### Contraste

| Combinação | Mínimo | Target |
|---|---|---|
| Texto normal (< 18px) sobre fundo | 4.5:1 | 7:1 |
| Texto grande (≥ 18px ou 14px bold) | 3:1 | 4.5:1 |
| Ícones e elementos gráficos informativos | 3:1 | 4.5:1 |

Verificação: usar [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) com os valores dos tokens.

### ARIA

```tsx
// Modais
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">

// Alerts
<div role="alert">  {/* lido imediatamente pelo screen reader */}
<div role="status">  {/* para atualizações não urgentes */}

// Tabs
<div role="tablist">
<button role="tab" aria-selected={isActive} aria-controls="panel-id">
<div role="tabpanel" id="panel-id">

// Botões com apenas ícone
<button aria-label="Fechar modal">
  <X size={16} aria-hidden="true" />
</button>

// Imagens
<img src="..." alt="Descrição da imagem gerada por IA" />
<img src="..." alt="" />  {/* decorativa — alt vazio, não omitido */}
```

### Foco

```tsx
// Focus visible obrigatório em todos os elementos interativos
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2"

// NUNCA remover foco sem substituição
// ❌
className="outline-none"  // sem focus-visible alternativo

// ✅
className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)]"
```

### Navegação por Teclado

- `Tab`: avança para próximo elemento interativo
- `Shift+Tab`: volta
- `Enter`/`Space`: ativa botão ou link
- `Escape`: fecha modal, dropdown, drawer
- `Arrow keys`: navega dentro de tabs, selects, menus

```tsx
// Fechar modal com Escape
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
  document.addEventListener('keydown', handleEsc)
  return () => document.removeEventListener('keydown', handleEsc)
}, [onClose])
```

### Estados Disabled

```tsx
// ✅ Sempre indicar visualmente E semanticamente
<button
  disabled={isLoading}
  aria-disabled={isLoading}
  className="... disabled:opacity-40 disabled:cursor-not-allowed"
>
  {isLoading ? <Spinner /> : 'Salvar'}
</button>
```

---

# 13. Regras de Animação

## Durações Padrão

| Caso | Duração | Easing |
|---|---|---|
| Hover / focus (cor, opacidade) | 150ms | `ease` |
| Transições de UI (expand, slide) | 200ms | `ease` |
| Entrada de modal / drawer | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Skeletons | 1.8s | `ease-in-out` |
| Animações de loop (orbs, pulse) | 14s–22s | `ease-in-out` |

## Keyframes Canônicos

Definidos em `globals.css`:

```css
/* Skeleton de galeria */
@keyframes gal-pulse {
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 0.90; }
}

/* Favoritar */
@keyframes heart-pop {
  0%   { transform: scale(1);    }
  35%  { transform: scale(1.30); }
  65%  { transform: scale(0.90); }
  100% { transform: scale(1);    }
}

/* Notificação (bell) */
@keyframes bell-pulse {
  0%, 100% { box-shadow: 0 0 0 0 transparent; }
  50%       { box-shadow: 0 0 0 4px rgba(47, 70, 228, 0.10); }
}

/* Orb decorativo 1 */
@keyframes orb-float-1 {
  0%, 100% { transform: translate(0, 0) scale(1);       }
  33%       { transform: translate(40px, -30px) scale(1.05); }
  66%       { transform: translate(-20px, 20px) scale(0.95); }
}

/* Orb decorativo 2 */
@keyframes orb-float-2 {
  0%, 100% { transform: translate(0, 0) scale(1);        }
  33%       { transform: translate(-50px, 20px) scale(1.08); }
  66%       { transform: translate(30px, -40px) scale(0.92); }
}

/* Orb decorativo 3 */
@keyframes orb-float-3 {
  0%, 100% { transform: translate(-50%, -50%) scale(1);       }
  50%       { transform: translate(-50%, -50%) scale(1.12);   }
}
```

## Regras de Uso

### ✅ Usar animação quando

- Feedback de ação do usuário (heart-pop, loading spinner)
- Entrada de elementos novos na tela (fade-in, slide-in)
- Skeleton loading (ritmo de espera)
- Microinterações que confirmam uma ação (botão → check)
- Decoração de fundo em páginas especiais (orbs de auth)

### ❌ Nunca usar animação quando

- O conteúdo principal demora mais de 300ms para carregar (o usuário espera dados, não efeitos)
- O elemento é pequeno demais para a animação ser perceptível
- O movimento pode causar desconforto (respeitar `prefers-reduced-motion`)
- Tabelas, grids de dados — entram sem animação
- Erros e alertas — aparecem imediatamente, sem delay

### Respeitar `prefers-reduced-motion`

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// Com Framer Motion
import { useReducedMotion } from 'framer-motion'

const shouldReduce = useReducedMotion()
<motion.div
  animate={{ opacity: 1, y: 0 }}
  initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
  transition={{ duration: shouldReduce ? 0 : 0.2 }}
/>
```

### Hover Transitions

```tsx
// ✅ Sempre usar transition-all ou transition específico
className="transition-all duration-[150ms] ease"
className="transition-colors duration-[150ms]"
className="transition-opacity duration-[150ms]"

// ❌ Nunca animar sem transition — mudança instantânea
className="hover:bg-[var(--surface-hover)]"  // sem transition
```

---

# 14. Convenções de Código

## Nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Componente React | PascalCase | `MediaCard`, `GlassBar` |
| Hook | camelCase + `use` prefix | `useAsync`, `useDebounce` |
| Arquivo de componente | PascalCase.tsx | `MediaCard.tsx` |
| Página (Next.js) | lowercase com hífen | `page.tsx` dentro de `galeria/` |
| CSS class local | kebab-case | `gal-pulse`, `bell-pulse` |
| Props interface | `ComponentProps` | `MediaCardProps` |
| Event handlers | `handle` prefix | `handleClose`, `handleSubmit` |
| State booleans | verbo + substantivo | `isLoading`, `hasError`, `isOpen` |

## Estrutura de Arquivo de Componente

```tsx
// 1. Imports externos
import { useState } from 'react'
import { X } from 'lucide-react'

// 2. Imports internos (componentes, hooks, types)
import { GlassBar } from '@/components/layout/GlassBar'
import type { UserRole } from '@/types'

// 3. Types/Interface
interface RoleBadgeProps {
  role: UserRole
  size?: 'sm' | 'md'
}

// 4. Constantes do módulo
const ROLE_STYLES = {
  admin:     '...',
  clevel:    '...',
} as const

// 5. Componente principal
export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  // hooks
  // handlers
  // early returns
  // render
}

// 6. Sub-componentes (se pequenos e usados apenas aqui)
function RoleDot({ role }: { role: UserRole }) { ... }
```

## Ordem de Classes Tailwind

Seguir a ordem: layout → flexbox/grid → sizing → spacing → typography → colors → borders → effects → states.

```tsx
// ✅ Ordem correta
className="
  relative flex items-center gap-2   /* layout e posição */
  w-full max-w-sm                    /* sizing */
  px-3 py-2                          /* spacing */
  text-sm font-medium                /* typography */
  text-[var(--text-primary)]         /* cor de texto */
  bg-[var(--surface)]                /* background */
  border border-[var(--border)]      /* border */
  rounded-[var(--radius-md)]         /* border-radius */
  shadow-card                        /* sombra */
  transition-all duration-fast       /* transição */
  hover:bg-[var(--surface-hover)]    /* states */
  focus-visible:ring-2               /* focus */
  disabled:opacity-40                /* disabled */
"
```

## Props e Composição

```tsx
// ✅ Props explícitas, tipadas
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

// ✅ Spread de props HTML quando fazer sentido
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn('base-classes', className)}
      {...props}
    />
  )
}

// Usar cn() (clsx + twMerge) para merge de classes
import { cn } from '@/lib/utils'
```

## Separação de Lógica

```tsx
// ✅ Separar lógica de dados do componente visual
// hooks/useUsers.ts — lógica de dados
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: fetchUsers })
}

// components/ui/UserTable.tsx — componente visual puro
export function UserTable({ users, onEdit, onDelete }: UserTableProps) { ... }

// app/(app)/admin/page.tsx — composição
export default function AdminPage() {
  const { data } = useUsers()
  return <UserTable users={data} onEdit={...} onDelete={...} />
}
```

---

# 15. Anti-patterns

## Lista de Proibições Absolutas

### Estilos

```tsx
// ❌ Inline style
<div style={{ color: '#a855f7', background: '#06080f' }}>

// ❌ Cor hardcoded em className
<div className="text-purple-500 bg-[#06080f]">

// ❌ CSS externo não mapeado como token
.my-component { color: var(--some-random-var) }

// ❌ Margens arbitrárias sem justificativa
<div className="mt-[37px] mb-[13px]">

// ❌ Z-index arbitrário
className="z-[999]"  // usar var(--z-modal), var(--z-toast) etc.

// ❌ Width/height hardcoded sem razão semântica
<div className="w-[847px]">
```

### Componentes

```tsx
// ❌ Div como botão
<div onClick={handleClick} className="cursor-pointer">Ação</div>

// ❌ Componente duplicado
// Se já existe Badge em components/ui — não criar outro em components/admin

// ❌ Prop drilling mais de 2 níveis — usar Context ou state manager
<Page data={data}>
  <Section data={data}>
    <Card data={data}>   {/* ← 3 níveis: use Context */}

// ❌ Lógica de negócio dentro de componente visual
export function UserCard({ userId }) {
  const [user, setUser] = useState()
  useEffect(() => { fetch(`/api/users/${userId}`).then(... }) // ← mover para hook
```

### Acessibilidade

```tsx
// ❌ Botão sem texto acessível
<button><X /></button>

// ❌ Input sem label
<input placeholder="Digite seu email" />

// ❌ Role="button" em div (usar button nativo)
<div role="button" onClick={fn}>

// ❌ Remover outline sem substituição
className="outline-none"  // sem focus-visible

// ❌ Texto branco sobre fundo claro sem verificar contraste
className="text-white bg-[rgba(255,255,255,0.15)]"
```

### Responsividade

```tsx
// ❌ Largura fixa em componentes que precisam ser fluidos
<div className="w-[1200px]">

// ❌ Texto sem quebra em mobile
<p className="whitespace-nowrap text-xl">Título muito longo que vai além da tela</p>

// ❌ Touch targets menores que 44px
<button className="w-4 h-4">  // inacessível em touch
```

### Dark/Light mode

```tsx
// ❌ Usar classes dark: sem o equivalente light definido
className="dark:bg-[#06080f]"  // e no light? sem definição

// ❌ Assumir que dark mode é o único tema
// Todo componente deve ser testado em ambos os temas

// ❌ Usar CSS variables do shadcn/ui sem mapear para os tokens da Athenos
className="bg-background"  // usar bg-canvas — não misturar sistemas
```

### Animações

```tsx
// ❌ Animação sem transition
className="hover:bg-[var(--surface-hover)]"  // sem transition-colors

// ❌ Duration muito longa em elementos de UI utilitários
className="transition-all duration-[1000ms]"  // apenas para decoração

// ❌ Animação de entrada em tabelas e grids de dados
<motion.tr animate={{ opacity: 1 }}>  // tabelas entram sem animação
```

---

# 16. Checklist Final

Antes de qualquer PR/commit com mudanças de UI:

## Visual

```
[ ] Tokens usados em vez de valores hardcoded
[ ] Cores corretas para o contexto (imagem=roxo, vídeo=pink, global=degradê)
[ ] Hierarquia tipográfica respeitada (máx. 3 níveis por tela)
[ ] Border-radius consistente com o componente (md=card media, xl=modal)
[ ] Sombras dos tokens (--shadow-sm, --shadow-lg)
```

## Tema

```
[ ] Testado no tema dark (classe .dark no html)
[ ] Testado no tema light (sem classe .dark)
[ ] Glass bars têm backdrop-filter em ambos os temas
[ ] Bordas visíveis em ambos os temas
[ ] Texto com contraste suficiente em ambos os temas
```

## Responsividade

```
[ ] Mobile (320px): layout sem overflow horizontal
[ ] Tablet (768px): mudança de layout se necessário
[ ] Desktop (1280px): espaço extra aproveitado corretamente
[ ] Imagens e cards sem distorção em qualquer largura
```

## Acessibilidade

```
[ ] Botões com texto ou aria-label
[ ] Inputs com label associada via htmlFor/id
[ ] Imagens com alt (ou alt="" se decorativas)
[ ] Focus visible em todos os elementos interativos
[ ] Modal fecha com Escape
[ ] Tab order lógico
```

## Estados

```
[ ] Loading state implementado (skeleton ou spinner)
[ ] Empty state implementado (EmptyState component)
[ ] Error state implementado (ErrorState component ou Alert)
[ ] Estados de botão: default, hover, active, disabled, loading
```

## Código

```
[ ] Nenhum inline style
[ ] Nenhuma classe Tailwind com cor hardcoded (#hex ou rgb())
[ ] Lógica de dados separada em hooks
[ ] Nenhum componente duplicado criado sem verificar existentes
[ ] Props tipadas com TypeScript
[ ] Nenhum console.log ou código de debug
```

---

# 17. Sistema Glass e Efeitos Especiais

## Glassmorphism — Regras de Aplicação

O efeito glass é central na identidade da Athenos no dark mode. No light mode, é mais sutil mas mantém a coerência.

### Quando usar

- Barras sticky (header, filtros de galeria)
- Bottom bar do Studio
- Botões flutuantes (notificação, som, fechar)
- Backdrop de modal

### CSS Obrigatório para Glass

```css
/* Sempre incluir WebkitBackdropFilter para compatibilidade Safari */
.glass-bar {
  background: var(--glass);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--border);
}

.glass-modal-backdrop {
  background: rgba(0, 0, 0, 0.80);    /* light: rgba(0,0,0,0.50) */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

### Valores de blur por contexto

| Contexto | blur | Dark bg | Light bg |
|---|---|---|---|
| Sticky bar | `blur(24px)` | `rgba(6,8,15,0.88)` | `rgba(248,249,252,0.90)` |
| Modal backdrop | `blur(20px)` | `rgba(0,0,0,0.82)` | `rgba(0,0,0,0.50)` |
| Icon button glass | `blur(24px)` | `rgba(10,13,22,0.88)` | `rgba(241,245,249,0.90)` |
| Card sutil | `blur(8px)` | `rgba(255,255,255,0.04)` | `rgba(0,0,0,0.025)` |

## Componente GlassBar

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

## Orbs de Fundo Animados (Auth Pages)

Decoração de profundidade nas páginas `/login` e `/change-password`. **Não usar em outras páginas.**

```tsx
// components/auth/AuthOrbs.tsx
export function AuthOrbs() {
  return (
    <>
      {/* Roxo — top-left */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '5%', left: '10%',
          width: 560, height: 560,
          background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'orb-float-1 14s ease-in-out infinite',
        }}
      />
      {/* Pink — bottom-right */}
      <div
        className="pointer-events-none fixed"
        style={{
          bottom: '5%', right: '8%',
          width: 480, height: 480,
          background: 'radial-gradient(circle, rgba(255,61,187,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'orb-float-2 18s ease-in-out infinite',
        }}
      />
      {/* Violet — center sutil */}
      <div
        className="pointer-events-none fixed"
        style={{
          top: '50%', left: '50%',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(124,58,237,0.09) 0%, transparent 60%)',
          filter: 'blur(72px)',
          transform: 'translate(-50%, -50%)',
          animation: 'orb-float-3 22s ease-in-out infinite',
        }}
      />
    </>
  )
}
```

---

# 18. Admin Panel

## Layout Geral

```
┌─────────────────────────────────────────────────────────────┐
│  Sidebar 236px (lg+)   │  Content area (flex: 1)            │
│  bg: dark=#07080f      │  bg-canvas                         │
│       light=#f8f9fc    │  overflow-y: auto                  │
│  border-right: border  │                                    │
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

## Sidebar — Anatomia Completa

```tsx
// components/layout/Sidebar.tsx
export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="
        w-[236px] h-screen flex flex-col
        bg-[#07080f] dark:bg-[#07080f]  /* exceção: sidebar dark sempre */
        border-r border-[var(--border)]
        sticky top-0
      "
    >
      {/* ── Logo ── */}
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5">
        <AsteriskIcon className="w-[22px] h-[22px] text-white" />
        <span className="text-[17px] font-bold tracking-[-0.4px] text-white">atlas</span>
      </div>

      {/* Divider */}
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

      {/* Divider */}
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
  const { user } = useAuth()
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

## Tabela de Dados

```tsx
// Referência na seção 8.5 — complemento específico para admin

// Action buttons de linha
const actionBtnStyles = {
  edit: {
    base: 'px-2 py-1 rounded-[var(--radius-sm)] text-xs text-[rgba(148,163,184,0.5)] transition-all duration-fast',
    hover: 'hover:bg-[rgba(168,85,247,0.08)] hover:border hover:border-[rgba(168,85,247,0.2)] hover:text-[#c084fc]',
  },
  delete: {
    base: '...',
    hover: 'hover:bg-[rgba(239,68,68,0.08)] hover:border hover:border-[rgba(239,68,68,0.18)] hover:text-[#f87171]',
  },
}
```

## Modal de Admin (Create / Edit / Delete)

```tsx
// Modal padrão de admin — menor que o modal de detalhe
<div className="fixed inset-0 z-[var(--z-overlay)] bg-black/70 backdrop-blur-[4px] flex items-center justify-center p-4">
  <div
    role="dialog"
    aria-modal="true"
    className="
      w-full max-w-[420px]           /* create/edit */
      /* max-w-[380px] para delete confirm */
      bg-[var(--bg-modal)]
      border border-[rgba(255,255,255,0.08)]
      rounded-[var(--radius-lg)]
      p-6
      shadow-modal
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
// Mesmo padrão — reutilizar o componente Input de 8.2
// Focus accent: rgba(168,85,247,0.5) borda + rgba(168,85,247,0.1) ring

// Placeholder: opacity 30%
// Label: text-[10px] uppercase tracking-widest text-[var(--text-muted)]
```

## Avatar de Usuário

```tsx
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

---

# 19. Masonry Grid

## Algoritmo

O masonry usa JavaScript (`ResizeObserver`) — **nunca** `column-count` CSS (que não permite controle de ordem).

```ts
// hooks/useMasonry.ts
import { useEffect, useRef, useState } from 'react'

interface MasonryItem {
  id: string
  ar: number  // aspect ratio: width / height
}

export function useMasonry<T extends MasonryItem>(items: T[], colWidth = 200) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cols, setCols] = useState<T[][]>([])

  useEffect(() => {
    if (!containerRef.current) return

    const calculate = () => {
      const width = containerRef.current!.offsetWidth
      const numCols = Math.min(10, Math.max(1, Math.floor(width / colWidth)))
      const columns: T[][] = Array.from({ length: numCols }, () => [])
      const colHeights = new Array(numCols).fill(0)

      items.forEach(item => {
        const shortest = colHeights.indexOf(Math.min(...colHeights))
        columns[shortest].push(item)
        colHeights[shortest] += 1 / item.ar
      })

      setCols(columns)
    }

    const observer = new ResizeObserver(calculate)
    observer.observe(containerRef.current)
    calculate()

    return () => observer.disconnect()
  }, [items, colWidth])

  return { containerRef, cols }
}
```

## Componente MasonryGrid

```tsx
// components/gallery/MasonryGrid.tsx
export function MasonryGrid<T extends MasonryItem>({ items, renderItem }: MasonryGridProps<T>) {
  const { containerRef, cols } = useMasonry(items)

  return (
    <div ref={containerRef} className="flex gap-2">
      {cols.map((col, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-2">
          {col.map((item, rowIdx) => renderItem(item, colIdx, rowIdx))}
        </div>
      ))}
    </div>
  )
}
```

## Skeleton de Galeria

```tsx
// components/gallery/GallerySkeleton.tsx
const SKELETON_HEIGHTS = [180, 130, 220, 160, 200]

export function GallerySkeleton({ numCols = 4 }: { numCols?: number }) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: numCols }).map((_, colIdx) => (
        <div key={colIdx} className="flex-1 flex flex-col gap-2">
          {SKELETON_HEIGHTS.map((height, rowIdx) => (
            <div
              key={rowIdx}
              className="rounded-[var(--radius-md)] bg-[var(--surface-skeleton)]"
              style={{
                height,
                animation: 'gal-pulse 1.8s ease-in-out infinite',
                animationDelay: `${(colIdx * 5 + rowIdx) * 0.07}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
```

## Card de Mídia (Galeria)

```tsx
// components/gallery/MediaCard.tsx
export function MediaCard({ item, onClick }: MediaCardProps) {
  return (
    <button
      onClick={() => onClick(item)}
      className="group relative w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2"
      aria-label={`Abrir detalhes: ${item.prompt ?? 'mídia gerada'}`}
    >
      <img
        src={item.url}
        alt={item.prompt ?? ''}
        className="w-full h-auto rounded-[var(--radius-md)] border border-[var(--border)] block"
        loading="lazy"
      />
      {/* Indicador de vídeo */}
      {item.type === 'video' && (
        <div
          className="absolute bottom-2 right-2 w-[26px] h-[26px] rounded-full flex items-center justify-center bg-black/60 backdrop-blur-[8px]"
          aria-hidden="true"
        >
          <Play size={10} className="text-white ml-0.5" />
        </div>
      )}
    </button>
  )
}
```

## Função `jobAspectRatio`

```ts
// utils/media.ts
export function jobAspectRatio(job: JobStatusView): number {
  if (job.size) {
    const [w, h] = job.size.split('x').map(Number)
    if (w && h) return w / h
  }
  if (job.aspectRatio && job.aspectRatio !== 'auto') {
    const [a, b] = job.aspectRatio.split(':').map(Number)
    if (a && b) return a / b
  }
  return 1  // fallback: quadrado
}
```

### Regras críticas do Masonry

- `height: auto` em imagens — nunca `aspectRatio: "1"` ou `objectFit: "cover"` em cards de galeria
- Calcular `numCols` via `ResizeObserver` — nunca `window.innerWidth` estático
- `numCols = Math.min(10, Math.max(1, Math.floor(containerWidth / 200)))` — fórmula canônica
- Gap fixo de `8px` entre colunas e entre itens — nunca gap variável
- Não adicionar hover overlay em cards — clique abre modal diretamente

---

---

# 20. Hooks & Utilitários

Documentação completa de APIs em [`design/docs/09-hooks-utils.md`](./docs/09-hooks-utils.md).

## Hooks — Referência rápida

Import: `import { useAsync, useDebounce } from '@/hooks'`

| Hook | Retorna | Uso principal |
|---|---|---|
| `useAsync<T>(fn, immediate?)` | `{ data, loading, error, execute, reset }` | Operações assíncronas com loading/error |
| `useDebounce<T>(value, delay?)` | `T` | Debounce de valor (evita re-renders por tecla) |
| `useInterval(callback, delay)` | `void` | Polling ou animação em loop (null pausa) |
| `useKeyboard(key, handler, options?)` | `void` | Atalhos de teclado com modificadores |
| `useLocalStorage<T>(key, initial)` | `[value, set, remove]` | Estado persistido com sync entre abas |
| `useMediaQuery(query)` | `boolean` | Breakpoints: `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` |
| `useOnClickOutside(ref, handler, enabled?)` | `void` | Fechar dropdown/popover ao clicar fora |
| `useTheme()` | `{ theme, toggleTheme }` | Toggle dark/light com persistência |
| `useToast()` | `{ success, error, warning, info }` | Disparar toasts globais |

## Utilitários — Referência rápida

Import: `import { formatCurrency, isValidCPF, addDays, cn } from '@/lib'`

**format.ts** — `formatCurrency`, `formatNumber`, `formatDate`, `formatDateTime`, `formatRelativeTime`, `truncate`, `capitalize`, `slugify`, `formatBytes`, `getInitials`

**validators.ts** — `isValidCPF`, `isValidCNPJ`, `isValidEmail`, `isValidPhone`, `isValidCEP`, `isValidURL`, `isRequired`, `hasMinLength`, `hasMaxLength`

**dates.ts** — `isSameDay`, `isToday`, `isBefore`, `isAfter`, `isBetween`, `addDays`, `addMonths`, `addYears`, `diffInDays`, `diffInMonths`, `startOfDay`, `endOfDay`, `startOfMonth`, `endOfMonth`, `startOfWeek`, `endOfWeek`, `toISODate`, `fromISODate`, `getDaysInMonth`

---

## Versão e Histórico

| Versão | Data | Mudança |
|---|---|---|
| 1.0 | — | Sistema dark inicial (designdark.md) |
| 2.0 | 2026-05-24 | Dual theme (light + dark), CSS Variables, 16 seções operacionais, templates, checklist |
| 2.1 | 2026-05-24 | 63 componentes, 9 hooks, 3 módulos utilitários, Sidebar accordion, Hooks/Utils showcase sections |
