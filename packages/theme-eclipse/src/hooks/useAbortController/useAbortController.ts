import { useCallback, useEffect, useState } from 'react'

export type UseAbortControllerReturn = {
  /** 현재 AbortController의 signal */
  signal: AbortSignal
  /** controller.abort()를 호출합니다 */
  abort: (reason?: unknown) => void
  /** 새 AbortController를 생성합니다 (이전 signal은 abort됨) */
  reset: () => void
}

/**
 * 자동으로 언마운트 시 abort되는 AbortController를 제공합니다.
 *
 * - unmount 또는 `reset()` 호출 시 현재 controller를 abort
 * - `signal`을 fetch/axios 등에 전달하면 컴포넌트 언마운트 시 요청이 취소됨
 *
 * @example
 * ```tsx
 * const { signal, abort, reset } = useAbortController()
 *
 * const load = async () => {
 *   const data = await fetch('/api/data', { signal }).then(r => r.json())
 *   setData(data)
 * }
 * ```
 */
export function useAbortController(): UseAbortControllerReturn {
  const [controller, setController] = useState(() => new AbortController())

  useEffect(() => {
    return () => {
      controller.abort()
    }
  }, [controller])

  const abort = useCallback(
    (reason?: unknown) => {
      controller.abort(reason)
    },
    [controller]
  )

  const reset = useCallback(() => {
    setController(new AbortController())
  }, [])

  return { signal: controller.signal, abort, reset }
}
