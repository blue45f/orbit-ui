import { useCallback, useState } from 'react'

export type UseQueueReturn<T> = {
  queue: T[]
  enqueue: (item: T) => void
  dequeue: () => T | undefined
  peek: () => T | undefined
  clear: () => void
  size: number
  isEmpty: boolean
}

/**
 * FIFO 큐 자료구조를 React state로 관리합니다.
 *
 * @example
 * ```tsx
 * const { queue, enqueue, dequeue, peek, clear, size, isEmpty } = useQueue<string>()
 *
 * enqueue('first')
 * enqueue('second')
 * peek()    // 'first' (제거하지 않음)
 * dequeue() // 'first' (제거됨)
 * size      // 1
 * isEmpty   // false
 * ```
 */
export function useQueue<T>(initialItems: T[] = []): UseQueueReturn<T> {
  const [queue, setQueue] = useState<T[]>(initialItems)

  const enqueue = useCallback((item: T) => {
    setQueue((prev) => [...prev, item])
  }, [])

  const dequeue = useCallback((): T | undefined => {
    let removed: T | undefined
    setQueue((prev) => {
      if (prev.length === 0) return prev
      const [first, ...rest] = prev
      removed = first
      return rest
    })
    return removed
  }, [])

  const peek = useCallback((): T | undefined => {
    return queue[0]
  }, [queue])

  const clear = useCallback(() => {
    setQueue([])
  }, [])

  return {
    queue,
    enqueue,
    dequeue,
    peek,
    clear,
    size: queue.length,
    isEmpty: queue.length === 0,
  }
}
