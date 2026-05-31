![Athenos Banner](design/project-img.png)

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/license-MIT-22c55e?style=flat-square" />
</p>

<p align="center">
  Design System starter kit — <strong>63 componentes</strong>, <strong>10 hooks</strong> e <strong>3 módulos utilitários</strong>.<br/>
  Zero dependências de UI externas. Dual theme nativo. Pronto para produção.
</p>

---

## Quick start

```bash
git clone https://github.com/gmatheusb/athenos-starter-nextjs.git
cd athenos-starter-nextjs
npm install && npm run dev
```

Abra [http://localhost:3000/components](http://localhost:3000/components) — showcase interativo com todos os componentes, tema claro/escuro e navegação por categoria.

---

## Componentes

63 componentes exportados de `@/components/ui`:

```tsx
import { Button, Input, Modal, DataTable } from '@/components/ui'
```

<details>
<summary><strong>Básico</strong> · 15 componentes</summary>
<br/>

`Button` `Alert` `Avatar` `AvatarGroup` `Badge` `Tag` `Spinner` `Progress` `Skeleton` `KbdShortcut` `StatCard` `CountUp` `EmptyState` `Card` `Divider`

</details>

<details>
<summary><strong>Formulários</strong> · 20 componentes</summary>
<br/>

`Input` `Select` `Textarea` `Checkbox` `Switch` `RadioGroup` `Slider` `NumberInput` `Rating` `SearchInput` `MaskInput` `TimeInput` `ColorPicker` `OTPInput` `TagInput` `Combobox` `MultiSelect` `DatePicker` `DateRangePicker` `FileUpload`

</details>

<details>
<summary><strong>Feedback</strong> · 7 componentes</summary>
<br/>

`Banner` `Callout` `Toast` `NotificationCenter` `Modal` `Drawer` `ConfirmDialog`

</details>

<details>
<summary><strong>Navegação</strong> · 12 componentes</summary>
<br/>

`Tabs` `Pagination` `Breadcrumb` `Stepper` `Accordion` `Collapsible` `Tooltip` `Popover` `HoverCard` `DropdownMenu` `NavigationMenu` `CommandPalette`

</details>

<details>
<summary><strong>Dados & Charts</strong> · 9+ componentes</summary>
<br/>

`PageHeader` `DataTable` `Timeline` `CodeBlock` `Carousel` `VirtualList` `ScrollArea` `CopyButton` · `BarChart` `LineChart` `DonutChart`

</details>

---

## Hooks

10 hooks exportados de `@/hooks`:

```tsx
import { useAsync, useDebounce, useDragDrop } from '@/hooks'
```

| Hook | Descrição |
|---|---|
| `useTheme` | Toggle dark/light com persistência em localStorage |
| `useToast` | `toast.success()` · `toast.error()` · `toast.warning()` · `toast.info()` |
| `useAsync` | Estado de operações assíncronas: `data`, `loading`, `error`, `execute` |
| `useDragDrop` | HTML5 Drag & Drop nativo: `draggingId`, `dragOverColumn`, handlers |
| `useDebounce` | Valor debounced com delay configurável |
| `useLocalStorage` | Estado persistido com sincronização entre abas |
| `useMediaQuery` | Breakpoints nomeados: `{ sm, md, lg, xl, '2xl' }` |
| `useOnClickOutside` | Detecta clique fora de um ref |
| `useKeyboard` | Atalhos com modificadores: `ctrl`, `meta`, `shift`, `alt` |
| `useInterval` | `setInterval` declarativo — `delay: null` pausa |

---

## Utilitários

3 módulos em `@/lib`:

| Módulo | Exemplos |
|---|---|
| `format` | `formatDate` `formatDateTime` `formatCurrency` `formatNumber` `formatFileSize` |
| `validators` | `isEmail` `isCPF` `isCNPJ` `isPhone` `isURL` |
| `dates` | `addDays` `diffDays` `startOfWeek` `isToday` `isBefore` |

---

## Design System

Dual theme via CSS Custom Properties — zero valores hardcoded nos componentes:

```css
:root  { --bg-canvas: #f8f9fc; --text-primary: #0f172a; --acc-img: #7c3aed; }
.dark  { --bg-canvas: #06080f; --text-primary: #e2e8f0; --acc-img: #a855f7; }
```

Escala de z-index padronizada:

| Token | Valor | Uso |
|---|---|---|
| `--z-base` | 0 | Conteúdo padrão |
| `--z-sticky` | 10 | Headers e sidebars fixas |
| `--z-popover` | 30 | Dropdowns e popovers |
| `--z-overlay` | 40 | Fundo de modais |
| `--z-modal` | 50 | Modais e drawers |
| `--z-toast` | 60 | Notificações toast |
| `--z-tooltip` | 70 | Tooltips |

Documentação completa em [`design/design.md`](design/design.md) e [`design/docs/`](design/docs/).

---

## Stack

| | Versão | Papel |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2 | Framework (App Router + Turbopack) |
| [React](https://react.dev) | 19 | UI runtime |
| [TypeScript](https://typescriptlang.org) | 5 | Tipagem estrita |
| [TailwindCSS](https://tailwindcss.com) | 3.4 | Utilitários CSS |
| [Lucide React](https://lucide.dev) | 0.441 | Ícones |
| clsx + tailwind-merge | — | Composição de classes (`cn`) |

---

## Estrutura

```
src/
├── app/
│   ├── (examples)/         # Páginas de exemplo
│   ├── globals.css         # Tokens CSS, dual theme, animações
│   └── layout.tsx          # Root layout com ThemeProvider + ToastProvider
├── components/
│   ├── ui/                 # 63 componentes do design system
│   ├── layout/             # Sidebar, Navbar
│   └── auth/               # AuthOrbs (background animado)
├── hooks/                  # 10 hooks customizados
└── lib/                    # format · validators · dates · cn

design/
├── design.md               # Fonte única de verdade do design system
└── docs/                   # Documentação detalhada por módulo
```

---

## Scripts

```bash
npm run dev      # Desenvolvimento com Turbopack
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # ESLint
```

---

## Licença

MIT — uso livre em projetos pessoais e comerciais.
