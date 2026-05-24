# 07 · Gallery / Masonry Grid

[← Admin Panel](./06-admin-panel.md) · [Guidelines →](./08-guidelines.md)

---

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
      // Fórmula canônica — não alterar
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

---

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

---

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

Keyframe `gal-pulse` deve estar em `globals.css`:

```css
@keyframes gal-pulse {
  0%, 100% { opacity: 0.45; }
  50%       { opacity: 0.90; }
}
```

---

## Card de Mídia

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

---

## Utilitário `jobAspectRatio`

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

---

## Regras Críticas do Masonry

| Regra | Correto | Proibido |
|---|---|---|
| Altura de imagens | `height: auto` | `aspectRatio: "1"` ou `objectFit: "cover"` em cards |
| Cálculo de colunas | `ResizeObserver` | `window.innerWidth` estático |
| Fórmula de colunas | `Math.min(10, Math.max(1, Math.floor(w / 200)))` | Qualquer variação |
| Gap | Fixo `8px` entre colunas e itens | Gap variável |
| Hover em cards | Clique direto abre modal | Overlay de hover |
| Ordenação | Algoritmo shortest-column | `column-count` CSS |
