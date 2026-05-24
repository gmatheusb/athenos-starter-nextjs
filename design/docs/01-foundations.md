# 01 · Fundações

[← README](./README.md) · [Tokens →](./02-tokens.md)

---

## Filosofia do Sistema

### Identidade Visual

A Athenos é uma plataforma de criação de conteúdo com IA — studio, galeria, academy. A identidade visual carrega dois princípios centrais:

**Legibilidade sobre decoração.** Imagens e vídeos gerados pela IA são o conteúdo principal. A UI serve como contentor neutro que amplifica o conteúdo, nunca concorre com ele.

**Dois modos, uma identidade.** Light e dark compartilham a mesma lógica de acento (roxo + pink), a mesma tipografia, os mesmos tokens de espaçamento e a mesma hierarquia. O que muda é o valor das variáveis — nunca a estrutura.

### Princípios Operacionais

| Princípio | O que significa na prática |
|---|---|
| **Tokens first** | Nunca escrever cor, sombra ou border-radius literal. Sempre usar CSS variable ou classe Tailwind mapeada ao token. |
| **Contexto por accent** | Roxo `#a855f7` → contexto de imagem. Pink `#ff3dbb` → contexto de vídeo. Degradê global → elementos brand / "Todos". |
| **Glass como superfície** | Cards, barras sticky e modais usam camadas de vidro com `backdrop-filter`. Não usar fundos opacos em UI dark. |
| **Responsividade first** | Toda página começa mobile. Desktop é expansão, não refatoração. |
| **Estado sempre explícito** | Toda tela tem loading, empty e error state definidos antes de começar o código. |
| **Zero invenção** | Antes de criar qualquer componente novo, verificar se existe em `/components/ui`, `/components/forms` ou em shadcn/ui. |

---

## Stack Visual

### Tecnologias Obrigatórias

| Camada | Tecnologia | Versão mínima | Observação |
|---|---|---|---|
| Framework | Next.js (App Router) | 14+ | Páginas em `/app`, não `/pages` |
| Estilização | TailwindCSS | 3.4+ | Config em `tailwind.config.ts` |
| Componentes base | shadcn/ui | latest | Sempre usar como ponto de partida |
| Variáveis de tema | CSS Custom Properties | nativo | Definidas em `globals.css` |
| Ícones | Lucide React | latest | Nenhuma outra lib de ícones |
| Animações | Framer Motion | 11+ | Para transições de layout e microinterações |
| Fontes | sohne-var + SF Pro Display | — | Fallback: `system-ui, -apple-system, sans-serif` |

### `tailwind.config.ts` — mapeamento obrigatório de CSS variables

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',  // OBRIGATÓRIO: tema controlado pela classe .dark no <html>
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:          'var(--bg-canvas)',
        modal:           'var(--bg-modal)',
        panel:           'var(--bg-panel-deep)',
        surface:         'var(--surface)',
        'surface-hover': 'var(--surface-hover)',
        'glass-bar':     'var(--glass)',
        border:          'var(--border)',
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'border-input':  'var(--border-input)',
        heading:         'var(--text-primary)',
        body:            'var(--text-secondary)',
        muted:           'var(--text-muted)',
        'muted-dim':     'var(--text-muted-dim)',
        // Accents
        'accent-img':      'var(--acc-img)',
        'accent-img-mid':  'var(--acc-img-mid)',
        'accent-img-bg':   'var(--acc-img-soft)',
        'accent-vid':      'var(--acc-vid)',
        'accent-vid-mid':  'var(--acc-vid-mid)',
        'accent-vid-bg':   'var(--acc-vid-soft)',
        // Semântico
        success:         'var(--semantic-success)',
        error:           'var(--semantic-error)',
        warning:         'var(--semantic-warning)',
        info:            'var(--semantic-info)',
        'success-soft':  'var(--semantic-success-soft)',
        'error-soft':    'var(--semantic-error-soft)',
        'warning-soft':  'var(--semantic-warning-soft)',
        'info-soft':     'var(--semantic-info-soft)',
      },
      borderRadius: {
        sm:   'var(--radius-sm)',
        md:   'var(--radius-md)',
        lg:   'var(--radius-lg)',
        xl:   'var(--radius-xl)',
        pill: '9999px',
      },
      boxShadow: {
        sm:   'var(--shadow-sm)',
        md:   'var(--shadow-md)',
        lg:   'var(--shadow-lg)',
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
// app/layout.tsx
// O atributo class no <html> controla o tema.
// 'dark' ativa o bloco .dark { } no globals.css.
<html lang="pt-BR" className={theme === 'dark' ? 'dark' : ''}>
```

---

## Estrutura de Pastas

### Arquitetura Canônica

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
├── hooks/                  # Custom React hooks
│   ├── useTheme.ts
│   ├── useMasonry.ts
│   ├── useModal.ts
│   └── useDebounce.ts
│
├── styles/                 # Estilos auxiliares (NÃO para tokens)
│   └── animations.css      # @keyframes complexos que não cabem em Tailwind
│
├── theme/                  # Configuração e utilitários de tema
│   ├── tokens.ts           # Tokens exportados como objetos TS para Framer Motion
│   └── ThemeProvider.tsx
│
└── tokens/                 # Fonte única de verdade dos valores brutos
    └── index.ts            # Exporta constantes: COLORS, RADIUS, SHADOWS, etc.
```

### Responsabilidades por Pasta

| Pasta | O que entra | O que NÃO entra |
|---|---|---|
| `components/ui` | Botões, inputs, badges, dialogs — stateless ou estado mínimo de UI | Lógica de negócio, chamadas de API |
| `components/forms` | Formulários com validação (React Hook Form + Zod) | Lógica de submissão além de `onSubmit(data)` |
| `components/layout` | Sidebar, Navbar, shells — estruturas de página | Conteúdo específico de feature |
| `templates` | Layouts reutilizáveis de página (com slots para conteúdo) | Conteúdo real — só estrutura |
| `hooks` | Custom hooks reutilizáveis | Hooks de componente único |
| `styles` | Keyframes complexos, reset global | Classes utilitárias (usar Tailwind) |
| `theme` | ThemeProvider, utilitários de tema | Lógica de UI |
| `tokens` | Valores brutos exportados como TS const | Lógica de aplicação |
