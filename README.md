# Athenos Design System

**Versão 2.0** · Dual Theme (Light + Dark)  
Sistema visual open-source — studio, galeria, academy, admin panel, auth.

---

## O que é este repositório

Este repositório é um **starterkit Next.js** pré-configurado com o design system completo do Projeto Athenos.

| O que | Onde | Para que |
|---|---|---|
| Constituição visual completa | [`design/design.md`](./design/design.md) | Referência definitiva — 19 seções, 2.674 linhas |
| Documentação navegável | [`design/docs/`](./design/docs/) | Consulta rápida por tema durante o desenvolvimento |
| Projeto Next.js | raiz do repositório | `git clone` → `npm install` → `npm run dev` |

---

## Início rápido

### Novo projeto

```bash
# 1. Clone o repositório
git clone https://github.com/gmatheusb/athenos-starter-nextjs.git meu-projeto
cd meu-projeto

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` — você verá o showcase interativo com todos os componentes, tokens e variações de tema.

### Projeto existente

Se você já tem um projeto Next.js e quer integrar os tokens:

**1. Copie os tokens CSS para o seu `globals.css`:**
```css
/* Copiar o bloco completo de */
/* design/docs/02-tokens.md → "Definição em globals.css" */
```

**2. Copie o `tailwind.config.ts`:**
```bash
cp tailwind.config.ts seu-projeto/tailwind.config.ts
```

**3. Adicione o `ThemeProvider` no seu `layout.tsx`:**
```tsx
import { ThemeProvider } from '@/theme/ThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
```

---

## Estrutura do repositório

```
athenos/
│
├── package.json              # ← Next.js 16 + React 19
├── next.config.ts
├── tailwind.config.ts        # ← tokens do design system mapeados
├── tsconfig.json
├── postcss.config.mjs
│
├── src/                      # ← código-fonte Next.js
│   ├── app/
│   │   ├── globals.css       # Tokens CSS completos + keyframes
│   │   ├── layout.tsx        # ThemeProvider + metadata
│   │   └── page.tsx          # Showcase de componentes (pode deletar)
│   ├── components/
│   │   ├── ui/               # Button, Input, Card, Badge, Alert
│   │   ├── layout/           # Navbar, GlassBar
│   │   └── auth/             # AuthOrbs
│   ├── hooks/useTheme.ts
│   ├── theme/ThemeProvider.tsx
│   └── lib/utils.ts          # cn() — clsx + tailwind-merge
│
└── design/                   # ← Documentação do design system
    ├── design.md             # Constituição visual (fonte única de verdade)
    └── docs/
        ├── README.md         # Índice + quick start + "onde encontro X?"
        ├── 01-foundations.md # Filosofia, Stack Visual, Estrutura de Pastas
        ├── 02-tokens.md      # CSS Variables, Tipografia, Cores, Espaçamento
        ├── 03-components.md  # 11 Componentes Base
        ├── 04-layout.md      # Navbar/TopBar, Glass System, Responsividade
        ├── 05-templates.md   # 8 Templates obrigatórios + Fluxo de novas páginas
        ├── 06-admin-panel.md # Sidebar, Tables, Modais de admin
        ├── 07-gallery.md     # Masonry Grid, MediaCard, useMasonry hook
        └── 08-guidelines.md  # A11y, Animações, Anti-patterns, Checklist
```

---

## Stack do design system

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework | Next.js (App Router) | 16+ |
| Estilização | TailwindCSS | 3.4+ |
| Componentes base | shadcn/ui | latest |
| Tema | CSS Custom Properties | nativo |
| Ícones | Lucide React | latest |
| Animações | Framer Motion | 11+ |
| Fontes | sohne-var + SF Pro Display | — |

---

## Princípios fundamentais

**1. Tokens first** — nenhuma cor, sombra ou border-radius é escrita diretamente no JSX. Sempre via CSS variable ou classe Tailwind mapeada.

**2. Dual theme por variável** — light e dark compartilham a mesma estrutura. O que muda são os valores das variáveis em `:root` (light) e `.dark` (dark).

```css
:root { --acc-img: #7c3aed; }   /* light */
.dark { --acc-img: #a855f7; }   /* dark  */
```

**3. Contexto por accent:**
- Roxo `--acc-img` → contexto de imagem
- Pink `--acc-vid` → contexto de vídeo
- Degradê `--grad` → elementos brand / "Todos"

**4. Glass como superfície** — barras sticky e modais usam `backdrop-filter: blur(24px)`, nunca fundos opacos sólidos.

**5. Mobile first** — todo componente começa em mobile. Desktop é expansão.

---

## Onde encontro X?

| Procuro... | Vá para |
|---|---|
| Token de cor ou variável CSS | [design/docs/02-tokens.md → Tabela de Referência](./design/docs/02-tokens.md#tabela-de-referência-rápida) |
| Quando usar `--surface` vs `--bg-modal` | [design/docs/02-tokens.md → Token Decision Tree](./design/docs/02-tokens.md#token-decision-tree) |
| Código de botão / input / card | [design/docs/03-components.md](./design/docs/03-components.md) |
| Spec do Navbar / TopBar | [design/docs/04-layout.md → Navbar/TopBar](./design/docs/04-layout.md#navbartopbar) |
| Como fazer glassmorphism | [design/docs/04-layout.md → Glass System](./design/docs/04-layout.md#glass-system--regras-de-aplicação) |
| Template para nova página | [design/docs/05-templates.md](./design/docs/05-templates.md) |
| Admin panel / sidebar | [design/docs/06-admin-panel.md](./design/docs/06-admin-panel.md) |
| Masonry / galeria de imagens | [design/docs/07-gallery.md](./design/docs/07-gallery.md) |
| Regras de acessibilidade | [design/docs/08-guidelines.md → Acessibilidade](./design/docs/08-guidelines.md#acessibilidade) |
| Anti-patterns proibidos | [design/docs/08-guidelines.md → Anti-patterns](./design/docs/08-guidelines.md#anti-patterns) |
| Checklist pré-PR | [design/docs/08-guidelines.md → Checklist](./design/docs/08-guidelines.md#checklist-final) |

---

## Componentes incluídos

| Componente | Arquivo | Variantes |
|---|---|---|
| `Button` | `src/components/ui/Button.tsx` | primary, secondary, destructive, ghost + isLoading |
| `Input` | `src/components/ui/Input.tsx` | label, error, hint, leftIcon |
| `Card` | `src/components/ui/Card.tsx` | default, stat, clickable |
| `StatCard` | `src/components/ui/Card.tsx` | — |
| `RoleBadge` | `src/components/ui/Badge.tsx` | admin, clevel, finance, marketing |
| `StatusBadge` | `src/components/ui/Badge.tsx` | success, error, warning, info |
| `Alert` | `src/components/ui/Alert.tsx` | error, success, warning, info |
| `Navbar` | `src/components/layout/Navbar.tsx` | search, theme toggle, avatar |
| `GlassBar` | `src/components/layout/GlassBar.tsx` | header sticky com backdrop-blur |
| `AuthOrbs` | `src/components/auth/AuthOrbs.tsx` | decoração animada (só auth pages) |
| `ThemeProvider` | `src/theme/ThemeProvider.tsx` | dark/light com localStorage |
