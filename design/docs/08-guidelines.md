# 08 · Guidelines

[← Gallery](./07-gallery.md) · [README](./README.md)

---

## Acessibilidade

### Semântica HTML

```tsx
// ✅ Usar elementos semânticos
<header>, <nav>, <main>, <aside>, <footer>
<article>, <section>, <h1>–<h6>
<button>  // para ações
<a>       // para navegação
<ul>/<ol>/<li> // para listas
<table>/<thead>/<tbody>/<tr>/<th>/<td>  // para dados tabulares

// ❌ Nunca div/span para estrutura semântica
<div className="navbar">...</div>
<div onClick={fn}>Clique aqui</div>
```

### Contraste

| Combinação | Mínimo | Target |
|---|---|---|
| Texto normal (< 18px) sobre fundo | 4.5:1 | 7:1 |
| Texto grande (≥ 18px ou 14px bold) | 3:1 | 4.5:1 |
| Ícones e elementos gráficos informativos | 3:1 | 4.5:1 |

Verificação: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) com os valores dos tokens.

### ARIA

```tsx
// Modais
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">

// Alerts
<div role="alert">   {/* lido imediatamente */}
<div role="status">  {/* para atualizações não urgentes */}

// Tabs
<div role="tablist">
<button role="tab" aria-selected={isActive} aria-controls="panel-id">
<div role="tabpanel" id="panel-id">

// Botões icon-only
<button aria-label="Fechar modal">
  <X size={16} aria-hidden="true" />
</button>

// Imagens
<img src="..." alt="Descrição da imagem gerada por IA" />
<img src="..." alt="" />  {/* decorativa — alt vazio, não omitido */}
```

### Foco

```tsx
// ✅ Focus visible obrigatório em todos os elementos interativos
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--acc-img)] focus-visible:ring-offset-2"

// ❌ Nunca remover foco sem substituição
className="outline-none"  // sem focus-visible

// ✅ Fechar modal com Escape
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
  document.addEventListener('keydown', handleEsc)
  return () => document.removeEventListener('keydown', handleEsc)
}, [onClose])
```

### Navegação por Teclado

- `Tab` / `Shift+Tab`: avança/volta elementos interativos
- `Enter` / `Space`: ativa botão ou link
- `Escape`: fecha modal, dropdown, drawer
- `Arrow keys`: navega dentro de tabs, selects, menus

### Estados Disabled

```tsx
<button
  disabled={isLoading}
  aria-disabled={isLoading}
  className="... disabled:opacity-40 disabled:cursor-not-allowed"
>
  {isLoading ? <Spinner /> : 'Salvar'}
</button>
```

---

## Animações

### Durações Padrão

| Caso | Duração | Easing |
|---|---|---|
| Hover / focus (cor, opacidade) | 150ms | `ease` |
| Transições de UI (expand, slide) | 200ms | `ease` |
| Entrada de modal / drawer | 250ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Skeletons | 1.8s | `ease-in-out` |
| Animações de loop (orbs, pulse) | 14s–22s | `ease-in-out` |

### Keyframes Canônicos

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
  0%, 100% { transform: translate(-50%, -50%) scale(1);     }
  50%       { transform: translate(-50%, -50%) scale(1.12); }
}
```

### Quando usar / não usar animação

**✅ Usar quando:**
- Feedback de ação do usuário (heart-pop, loading spinner)
- Entrada de elementos novos (fade-in, slide-in)
- Skeleton loading (ritmo de espera)
- Microinterações que confirmam ação (botão → check)
- Decoração de fundo em páginas especiais (orbs de auth)

**❌ Nunca usar quando:**
- O conteúdo principal demora mais de 300ms para carregar
- O elemento é pequeno demais para a animação ser perceptível
- Tabelas e grids de dados — entram sem animação
- Erros e alertas — aparecem imediatamente, sem delay

### `prefers-reduced-motion`

```css
/* globals.css — obrigatório */
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
// ✅ Sempre incluir transition
className="transition-all duration-[150ms] ease"
className="transition-colors duration-[150ms]"

// ❌ Mudança sem transition
className="hover:bg-[var(--surface-hover)]"  // sem transition
```

---

## Convenções de Código

### Nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Componente React | PascalCase | `MediaCard`, `GlassBar` |
| Hook | camelCase + `use` | `useMasonry`, `useModal` |
| Arquivo de componente | PascalCase.tsx | `MediaCard.tsx` |
| Página (Next.js) | lowercase com hífen | `page.tsx` dentro de `galeria/` |
| CSS class local | kebab-case | `gal-pulse`, `bell-pulse` |
| Props interface | `ComponentProps` | `MediaCardProps` |
| Event handlers | `handle` prefix | `handleClose`, `handleSubmit` |
| State booleans | verbo + substantivo | `isLoading`, `hasError`, `isOpen` |

### Estrutura de Arquivo de Componente

```tsx
// 1. Imports externos
import { useState } from 'react'
import { X } from 'lucide-react'

// 2. Imports internos
import { GlassBar } from '@/components/layout/GlassBar'
import type { UserRole } from '@/types'

// 3. Types/Interface
interface RoleBadgeProps {
  role: UserRole
  size?: 'sm' | 'md'
}

// 4. Constantes do módulo
const ROLE_STYLES = { admin: '...', clevel: '...' } as const

// 5. Componente principal
export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  // hooks → handlers → early returns → render
}

// 6. Sub-componentes pequenos usados apenas aqui
function RoleDot({ role }: { role: UserRole }) { ... }
```

### Ordem de Classes Tailwind

Layout → flexbox/grid → sizing → spacing → typography → colors → borders → effects → states.

```tsx
className="
  relative flex items-center gap-2   /* layout e posição */
  w-full max-w-sm                    /* sizing */
  px-3 py-2                          /* spacing */
  text-sm font-medium                /* typography */
  text-[var(--text-primary)]         /* cor de texto */
  bg-[var(--surface)]                /* background */
  border border-[var(--border)]      /* border */
  rounded-[var(--radius-md)]         /* border-radius */
  shadow-sm                          /* sombra */
  transition-all duration-fast       /* transição */
  hover:bg-[var(--surface-hover)]    /* states */
  focus-visible:ring-2               /* focus */
  disabled:opacity-40                /* disabled */
"
```

### `'use client'` — quando usar

Adicionar `'use client'` **apenas** quando o componente usa estado client-side. Componentes puramente visuais são Server Components por padrão e não precisam da diretiva.

```tsx
// ✅ Precisa de 'use client' — usa useState / hooks de browser
'use client'
export function Combobox() { const [open, setOpen] = useState(false) ... }

// ✅ Não precisa — componente puramente visual
export function PageHeader({ title, description }: PageHeaderProps) {
  return <div>...</div>
}
```

| Com `'use client'` | Sem `'use client'` |
|---|---|
| Button, Input, Modal, Dropdown | PageHeader, Divider, Tag |
| Qualquer componente com `useState` | Componentes só de renderização |
| Hooks de browser (`useRef`, `useEffect`) | Componentes de layout estático |

### `scroll-area` — scrollbar customizado

Adicionar a classe CSS `.scroll-area` a qualquer elemento com `overflow-y-auto` ou `overflow-x-auto` para aplicar o scrollbar fino do design system (6px, thumb `--border-strong`, hover `--text-muted-dim`).

```tsx
// ✅ Com scrollbar do design system
<div className="scroll-area flex-1 overflow-y-auto px-2 py-3">

// ❌ Scrollbar nativo padrão do browser
<div className="flex-1 overflow-y-auto px-2 py-3">
```

### Separação de Lógica

```tsx
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

## Anti-patterns

### `overflow-hidden` + posicionamento absoluto

```tsx
// ❌ overflow-hidden no wrapper externo — corta dropdowns e popovers
<Card className="overflow-hidden">
  <Combobox />   {/* dropdown invisível — cortado pelo overflow-hidden */}
</Card>

// ✅ overflow-hidden apenas no elemento que precisa clipar visualmente
<Card>
  <div className="rounded-t-xl overflow-hidden bg-[var(--surface-deep)]">
    {/* header com background clipado ao border-radius */}
  </div>
  <Combobox />   {/* dropdown flutua livremente */}
</Card>
```

> Regra: `overflow-hidden` em um ancestral corta **todos** os filhos com `position: absolute` — dropdowns, tooltips, popovers e datepickers somem ou ficam cortados. Aplicar somente no elemento mínimo necessário.

### Estilos

```tsx
// ❌ Inline style com cor
<div style={{ color: '#a855f7', background: '#06080f' }}>

// ❌ Cor hardcoded em className
<div className="text-purple-500 bg-[#06080f]">
  /* Por quê proibido: hardcodes quebram quando os tokens de tema mudam */

// ❌ Z-index arbitrário
className="z-[999]"
  /* Por quê: z-index não gerenciado causa stack context bugs difíceis de depurar */
  /* Correto: var(--z-modal), var(--z-toast) etc. */

// ❌ Margens arbitrárias
<div className="mt-[37px] mb-[13px]">
  /* Por quê: viola o grid de 4px — usar p-8, p-9, p-10 etc. */
```

### Componentes

```tsx
// ❌ Div como botão
<div onClick={handleClick} className="cursor-pointer">Ação</div>
  /* Por quê: divs não recebem foco por teclado, inacessíveis */

// ❌ Componente duplicado
// Se existe Badge em components/ui — não criar outro em components/admin
  /* Por quê: divergência de estilos ao longo do tempo, bugs de manutenção */

// ❌ Prop drilling mais de 2 níveis
<Page data={data}><Section data={data}><Card data={data}>
  /* Por quê: acoplamento rígido — usar Context */

// ❌ Lógica de negócio dentro de componente visual
export function UserCard({ userId }) {
  useEffect(() => { fetch(`/api/users/${userId}`) }) // ← mover para hook
}
```

### Acessibilidade

```tsx
// ❌ Botão sem texto acessível
<button><X /></button>
  /* Por quê: screen readers não conseguem comunicar a função */

// ❌ Input sem label
<input placeholder="Digite seu email" />
  /* Por quê: placeholder não substitui label para tecnologias assistivas */

// ❌ Remover outline sem substituição
className="outline-none"  // sem focus-visible
  /* Por quê: navegação por teclado perde rastreamento de foco */
```

### Responsividade

```tsx
// ❌ Largura fixa em elementos fluidos
<div className="w-[1200px]">

// ❌ Touch targets menores que 44px
<button className="w-4 h-4">  // inacessível em touch

// ❌ Texto sem quebra em mobile
<p className="whitespace-nowrap text-xl">Título muito longo</p>
```

### Dark/Light Mode

```tsx
// ❌ Classes dark: sem equivalente light
className="dark:bg-[#06080f]"
  /* Por quê: sem definição light, o componente quebra no tema claro */

// ❌ Misturar sistemas de tokens
className="bg-background"  // token do shadcn/ui, não mapeado para Athenos
  /* Usar bg-canvas, bg-[var(--bg-modal)] etc. */
```

### Animações

```tsx
// ❌ Animação sem transition
className="hover:bg-[var(--surface-hover)]"  // sem transition-colors

// ❌ Duration longa em elementos utilitários
className="transition-all duration-[1000ms]"  // apenas para decoração

// ❌ Animação de entrada em tabelas
<motion.tr animate={{ opacity: 1 }}>  // tabelas entram sem animação
```

---

## Checklist Final

Antes de qualquer PR/commit com mudanças de UI:

### Visual
```
[ ] Tokens usados em vez de valores hardcoded
[ ] Cores corretas para o contexto (imagem=roxo, vídeo=pink, global=degradê)
[ ] Hierarquia tipográfica respeitada (máx. 3 níveis por tela)
[ ] Border-radius consistente com o componente (md=card media, xl=modal)
[ ] Sombras dos tokens (--shadow-sm, --shadow-lg)
```

### Tema
```
[ ] Testado no tema dark (classe .dark no html)
[ ] Testado no tema light (sem classe .dark)
[ ] Glass bars têm backdrop-filter em ambos os temas
[ ] Bordas visíveis em ambos os temas
[ ] Texto com contraste suficiente em ambos os temas
```

### Responsividade
```
[ ] Mobile (320px): layout sem overflow horizontal
[ ] Tablet (768px): mudança de layout se necessário
[ ] Desktop (1280px): espaço extra aproveitado corretamente
[ ] Imagens e cards sem distorção em qualquer largura
```

### Acessibilidade
```
[ ] Botões com texto ou aria-label
[ ] Inputs com label associada via htmlFor/id
[ ] Imagens com alt (ou alt="" se decorativas)
[ ] Focus visible em todos os elementos interativos
[ ] Modal fecha com Escape
[ ] Tab order lógico
```

### Estados
```
[ ] Loading state implementado (skeleton ou spinner)
[ ] Empty state implementado (EmptyState component)
[ ] Error state implementado (ErrorState ou Alert)
[ ] Estados de botão: default, hover, active, disabled, loading
```

### Código
```
[ ] Nenhum inline style
[ ] Nenhuma classe Tailwind com cor hardcoded (#hex ou rgb())
[ ] Lógica de dados separada em hooks
[ ] Nenhum componente duplicado criado sem verificar existentes
[ ] Props tipadas com TypeScript
[ ] Nenhum console.log ou código de debug
```
