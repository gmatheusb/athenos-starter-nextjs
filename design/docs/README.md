# Athenos Design System — Documentação

**Versão 2.0** · Dual Theme (Light + Dark) · Escopo: Studio, Galeria, Academy, Admin Panel, Auth

A Athenos é uma plataforma de criação de conteúdo com IA. A UI serve como contentor neutro que amplifica o conteúdo gerado — nunca concorre com ele. Este sistema define tokens, componentes e padrões que garantem consistência em todos os produtos.

> **Arquivo de referência completo:** [`../design.md`](../design.md) (2.674 linhas, fonte única de verdade)

---

## Quick Start

### 1. Copiar os tokens CSS para `globals.css`

```css
/* src/app/globals.css */
/* Copiar o bloco completo de tokens de → docs/02-tokens.md */
:root { /* light */ }
.dark { /* dark  */ }
```

Ver bloco completo em [02-tokens.md → Definição em globals.css](./02-tokens.md#definição-em-globalscss).

### 2. Configurar `tailwind.config.ts`

```ts
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',  // OBRIGATÓRIO
  theme: {
    extend: {
      colors: {
        canvas:   'var(--bg-canvas)',
        modal:    'var(--bg-modal)',
        surface:  'var(--surface)',
        heading:  'var(--text-primary)',
        body:     'var(--text-secondary)',
        muted:    'var(--text-muted)',
        'accent-img': 'var(--acc-img)',
        'accent-vid': 'var(--acc-vid)',
        // ... ver 01-foundations.md para config completa
      },
    },
  },
}
```

Ver configuração completa em [01-foundations.md → tailwind.config.ts](./01-foundations.md#tailwindconfigts--mapeamento-obrigatório-de-css-variables).

### 3. Ativar tema no `layout.tsx`

```tsx
// app/layout.tsx
<html lang="pt-BR" className={theme === 'dark' ? 'dark' : ''}>
```

---

## Índice de Documentação

| Arquivo | Conteúdo | Seções do design.md |
|---|---|---|
| [01-foundations.md](./01-foundations.md) | Filosofia, Stack, Estrutura de Pastas | 1, 2, 3 |
| [02-tokens.md](./02-tokens.md) | CSS Variables, Tipografia, Cores, Espaçamento | 4, 5, 6, 7 |
| [03-components.md](./03-components.md) | 11 Componentes Base | 8 |
| [04-layout.md](./04-layout.md) | Navbar/TopBar ✨, Responsividade, Glass System | 11, 17 |
| [05-templates.md](./05-templates.md) | 8 Templates Obrigatórios + Fluxo de Novas Páginas | 9, 10 |
| [06-admin-panel.md](./06-admin-panel.md) | Admin Panel: Sidebar, Tables, Modais | 18 |
| [07-gallery.md](./07-gallery.md) | Masonry Grid, MediaCard, hooks | 19 |
| [08-guidelines.md](./08-guidelines.md) | A11y, Animações, Convenções, Anti-patterns, Checklist | 12, 13, 14, 15, 16 |

---

## Onde encontro X?

| Preciso de... | Vá para |
|---|---|
| Token de cor ou variável CSS | [02-tokens.md → Tabela de Referência](./02-tokens.md#tabela-de-referência-rápida) |
| Quando usar `--surface` vs `--bg-modal` | [02-tokens.md → Token Decision Tree](./02-tokens.md#token-decision-tree) |
| Código de um botão / input / card | [03-components.md](./03-components.md) |
| Spec do Navbar / TopBar | [04-layout.md → Navbar/TopBar](./04-layout.md#navbartopbar) |
| Como fazer glassmorphism | [04-layout.md → Glass System](./04-layout.md#glass-system) |
| Template para nova página | [05-templates.md](./05-templates.md) |
| Fluxo para criar páginas | [05-templates.md → Fluxo](./05-templates.md#fluxo-para-criar-novas-páginas) |
| Admin panel / sidebar | [06-admin-panel.md](./06-admin-panel.md) |
| Masonry / galeria | [07-gallery.md](./07-gallery.md) |
| Regras de acessibilidade | [08-guidelines.md → Acessibilidade](./08-guidelines.md#acessibilidade) |
| Anti-patterns proibidos | [08-guidelines.md → Anti-patterns](./08-guidelines.md#anti-patterns) |
| Checklist pré-PR | [08-guidelines.md → Checklist](./08-guidelines.md#checklist-final) |
| Keyframes de animação | [08-guidelines.md → Animações](./08-guidelines.md#animações) |

---

## Princípios em 30 segundos

1. **Tokens first** — nunca escrever cor, sombra ou radius literal
2. **Roxo `#a855f7` → imagem · Pink `#ff3dbb` → vídeo · Degradê → brand/todos**
3. **Glass como superfície** — `backdrop-filter: blur(24px)` em barras e modais
4. **Mobile first** — todo componente começa em mobile, desktop é expansão
5. **Estado sempre explícito** — loading, empty e error definidos antes do código

---

## Governança

Qualquer decisão de UI que contrarie este sistema requer:

1. Justificativa documentada no PR
2. Aprovação de outro desenvolvedor
3. Atualização deste documento se a exceção virar padrão

> Dúvida sobre um padrão? Consultar `design.md` antes de inventar.
