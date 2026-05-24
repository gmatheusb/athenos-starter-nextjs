'use client'

import { useState, useCallback } from 'react'
import type { DragEvent } from 'react'

interface UseDragDropOptions {
  onDrop: (draggedId: string, targetColumn: string) => void
}

interface UseDragDropReturn {
  draggingId: string | null
  dragOverColumn: string | null
  handleDragStart: (id: string) => (e: DragEvent) => void
  handleDragOver: (column: string) => (e: DragEvent) => void
  handleDragLeave: () => void
  handleDrop: (column: string) => (e: DragEvent) => void
  handleDragEnd: () => void
}

export function useDragDrop({ onDrop }: UseDragDropOptions): UseDragDropReturn {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null)

  const handleDragStart = useCallback(
    (id: string) => (e: DragEvent) => {
      setDraggingId(id)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', id)
    },
    [],
  )

  const handleDragOver = useCallback(
    (column: string) => (e: DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
      setDragOverColumn(column)
    },
    [],
  )

  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null)
  }, [])

  const handleDrop = useCallback(
    (column: string) => (e: DragEvent) => {
      e.preventDefault()
      const id = e.dataTransfer.getData('text/plain') || draggingId
      if (id) onDrop(id, column)
      setDraggingId(null)
      setDragOverColumn(null)
    },
    [draggingId, onDrop],
  )

  const handleDragEnd = useCallback(() => {
    setDraggingId(null)
    setDragOverColumn(null)
  }, [])

  return {
    draggingId,
    dragOverColumn,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd,
  }
}
