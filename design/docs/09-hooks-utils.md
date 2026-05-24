# 09 · Hooks & Utilitários

[← Admin Panel](./06-admin-panel.md) · [README](./README.md)

---

## Hooks

Todos os hooks estão em `src/hooks/` e exportados de `@/hooks`.

```ts
import { useAsync, useDebounce, useLocalStorage } from '@/hooks'
```

### Referência rápida

| Hook | Retorna | Uso principal |
|---|---|---|
| `useAsync` | `{ data, loading, error, execute, reset }` | Operações assíncronas com loading/error |
| `useDebounce` | `T` | Debounce de valor para evitar re-renders |
| `useInterval` | `void` | Polling ou animação em loop |
| `useKeyboard` | `void` | Atalhos de teclado globais |
| `useLocalStorage` | `[value, set, remove]` | Estado persistido com sync entre abas |
| `useMediaQuery` | `boolean` | Breakpoints responsivos |
| `useOnClickOutside` | `void` | Fechar dropdown/popover ao clicar fora |
| `useTheme` | `{ theme, toggleTheme }` | Toggle dark/light com persistência |
| `useToast` | `{ success, error, warning, info }` | Disparar toasts |

---

### `useAsync<T>`

Gerencia o ciclo completo de uma operação assíncrona: loading, dados e erro. Previne `setState` em componentes desmontados via `mountedRef`.

```ts
function useAsync<T>(
  fn: (...args: unknown[]) => Promise<T>,
  immediate?: boolean  // default: false
): {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: unknown[]) => Promise<void>
  reset: () => void
}
```

```tsx
// Exemplo: buscar usuários ao montar
const { data: users, loading, error, execute } = useAsync(fetchUsers, true)

// Exemplo: disparar manualmente
const { loading, execute } = useAsync(saveProfile)
<Button isLoading={loading} onClick={() => execute(formData)}>Salvar</Button>
```

---

### `useDebounce<T>`

Retorna uma versão atrasada do valor — útil para evitar chamadas de API a cada tecla.

```ts
function useDebounce<T>(value: T, delay?: number): T
// delay default: 300ms
```

```tsx
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 400)

useEffect(() => {
  if (debouncedQuery) search(debouncedQuery)
}, [debouncedQuery])
```

---

### `useInterval`

`setInterval` declarativo. Passar `delay: null` pausa o intervalo sem desmontar.

```ts
function useInterval(callback: () => void, delay: number | null): void
```

```tsx
const [count, setCount] = useState(0)
const [running, setRunning] = useState(true)

useInterval(() => setCount(c => c + 1), running ? 1000 : null)
```

---

### `useKeyboard`

Escuta atalhos de teclado globais com suporte a modificadores.

```ts
interface KeyboardOptions {
  modifiers?: ('ctrl' | 'meta' | 'shift' | 'alt')[]
  enabled?: boolean       // default: true
  preventDefault?: boolean // default: false
}

function useKeyboard(
  key: string,
  handler: (event: KeyboardEvent) => void,
  options?: KeyboardOptions
): void
```

```tsx
// ⌘K abre CommandPalette
useKeyboard('k', () => setOpen(true), {
  modifiers: ['meta'],
  preventDefault: true,
})

// Escape fecha modal
useKeyboard('Escape', onClose, { enabled: isOpen })
```

---

### `useLocalStorage<T>`

Estado sincronizado com `localStorage`. Persiste entre reloads e sincroniza entre abas via `StorageEvent`.

```ts
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void]
//   ^value  ^setValue                            ^removeValue
```

```tsx
const [theme, setTheme, removeTheme] = useLocalStorage('theme', 'dark')

// Atualizar
setTheme('light')

// Atualizar com base no valor anterior
setTheme(prev => prev === 'dark' ? 'light' : 'dark')

// Remover (volta para initialValue)
removeTheme()
```

---

### `useMediaQuery`

Retorna `true` se o breakpoint ou media query estiver ativo. Atualiza em tempo real.

```ts
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

function useMediaQuery(query: Breakpoint | string): boolean
```

| Breakpoint | Media query equivalente |
|---|---|
| `'sm'` | `(min-width: 640px)` |
| `'md'` | `(min-width: 768px)` |
| `'lg'` | `(min-width: 1024px)` |
| `'xl'` | `(min-width: 1280px)` |
| `'2xl'` | `(min-width: 1536px)` |

```tsx
const isDesktop = useMediaQuery('lg')
const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

return isDesktop ? <DesktopLayout /> : <MobileLayout />
```

---

### `useOnClickOutside`

Detecta cliques e toques fora de um elemento referenciado. Útil para fechar dropdowns, popovers e painéis.

```ts
function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled?: boolean  // default: true
): void
```

```tsx
const ref = useRef<HTMLDivElement>(null)
const [open, setOpen] = useState(false)

useOnClickOutside(ref, () => setOpen(false), open)

return <div ref={ref}>{open && <Dropdown />}</div>
```

---

### `useTheme`

Toggle dark/light com persistência em `localStorage`. Já usado pelo `ThemeProvider` no root layout.

```ts
function useTheme(): {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}
```

```tsx
const { theme, toggleTheme } = useTheme()

<Button onClick={toggleTheme}>
  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
</Button>
```

---

### `useToast`

Dispara toasts globais. Requer `ToastProvider` no root layout (já incluso).

```ts
function useToast(): {
  success: (message: string) => void
  error:   (message: string) => void
  warning: (message: string) => void
  info:    (message: string) => void
}
```

```tsx
const toast = useToast()

toast.success('Registro salvo com sucesso.')
toast.error('Falha ao processar a solicitação.')
toast.warning('Dados incompletos detectados.')
toast.info('Processamento iniciado em background.')
```

---

## Utilitários

Todos em `src/lib/` e exportados de `@/lib`.

```ts
import { formatCurrency, isValidCPF, addDays, cn } from '@/lib'
```

---

### format.ts — Formatação

| Função | Exemplo de uso | Saída |
|---|---|---|
| `formatCurrency(value, currency?, locale?)` | `formatCurrency(1990.5)` | `"R$ 1.990,50"` |
| `formatNumber(value, options?, locale?)` | `formatNumber(1234567)` | `"1.234.567"` |
| `formatDate(input, options?, locale?)` | `formatDate('2025-05-24')` | `"24/05/2025"` |
| `formatDateTime(input, locale?)` | `formatDateTime(new Date())` | `"24/05/2025 14:30"` |
| `formatRelativeTime(input, locale?)` | `formatRelativeTime(ontem)` | `"há 1 dia"` |
| `truncate(str, maxLength, ellipsis?)` | `truncate('Título longo', 8)` | `"Título l..."` |
| `capitalize(str)` | `capitalize('athenos')` | `"Athenos"` |
| `slugify(str)` | `slugify('Olá Mundo')` | `"ola-mundo"` |
| `formatBytes(bytes, decimals?)` | `formatBytes(1536000)` | `"1.46 MB"` |
| `getInitials(name, max?)` | `getInitials('Gabriel M')` | `"GM"` |

Todos usam `locale: 'pt-BR'` por padrão. Passar `locale` como último parâmetro para sobrescrever.

---

### validators.ts — Validação

Todas retornam `boolean`. Aceitam strings com ou sem máscara (os dígitos são extraídos internamente).

| Função | Valida |
|---|---|
| `isValidCPF(value)` | CPF brasileiro — formato + dígitos verificadores |
| `isValidCNPJ(value)` | CNPJ brasileiro — formato + dígitos verificadores |
| `isValidEmail(value)` | Formato de e-mail via regex |
| `isValidPhone(value)` | Telefone brasileiro — 10 ou 11 dígitos |
| `isValidCEP(value)` | CEP brasileiro — 8 dígitos |
| `isValidURL(value)` | URL válida via `URL` constructor |
| `isRequired(value)` | String não vazia após `trim()` |
| `hasMinLength(value, min)` | `value.length >= min` |
| `hasMaxLength(value, max)` | `value.length <= max` |

```tsx
// Validação de formulário
if (!isValidCPF(cpf)) setError('CPF inválido')
if (!isValidEmail(email)) setError('E-mail inválido')
if (!hasMinLength(password, 8)) setError('Mínimo 8 caracteres')
```

---

### dates.ts — Datas

Todas aceitam `DateInput: string | number | Date`. Strings no formato `YYYY-MM-DD` são tratadas corretamente (sem bug de fuso horário).

**Comparação**

| Função | Descrição |
|---|---|
| `isSameDay(a, b)` | Mesma data (ignora hora) |
| `isToday(input)` | É hoje |
| `isBefore(a, b)` | `a` antes de `b` |
| `isAfter(a, b)` | `a` depois de `b` |
| `isBetween(date, start, end)` | Intervalo inclusivo |

**Aritmética**

| Função | Descrição |
|---|---|
| `addDays(input, days)` | Adiciona dias |
| `addMonths(input, months)` | Adiciona meses |
| `addYears(input, years)` | Adiciona anos |
| `diffInDays(a, b)` | Diferença em dias |
| `diffInMonths(a, b)` | Diferença em meses |

**Limites**

| Função | Descrição |
|---|---|
| `startOfDay(input)` | `00:00:00.000` |
| `endOfDay(input)` | `23:59:59.999` |
| `startOfMonth(input)` | Primeiro dia do mês |
| `endOfMonth(input)` | Último dia do mês |
| `startOfWeek(input, weekStartsOn?)` | Início da semana (0=Dom, 1=Seg) |
| `endOfWeek(input, weekStartsOn?)` | Fim da semana |

**Utilidade**

| Função | Descrição |
|---|---|
| `getDaysInMonth(year, month)` | Quantidade de dias no mês |
| `toISODate(input)` | Date → `"YYYY-MM-DD"` |
| `fromISODate(iso)` | `"YYYY-MM-DD"` → Date |

```tsx
// Exemplo: DateRangePicker
const inRange = isBetween(day, range.start, range.end)
const isDisabled = isBefore(day, startOfDay(new Date()))
const label = formatRelativeTime(createdAt) // "há 3 dias"
```

---

### cn — Composição de classes

Re-exportado de `@/lib/utils`. Combina `clsx` + `tailwind-merge`.

```ts
import { cn } from '@/lib'

cn('px-4 py-2', isActive && 'bg-[var(--acc-img)]', className)
```
