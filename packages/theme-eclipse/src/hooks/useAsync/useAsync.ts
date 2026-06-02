import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error'

export type UseAsyncState<T> =
  | { status: 'idle'; data: undefined; error: undefined }
  | { status: 'pending'; data: undefined; error: undefined }
  | { status: 'success'; data: T; error: undefined }
  | { status: 'error'; data: undefined; error: Error }

export type UseAsyncReturn<T> = UseAsyncState<T> & {
  run: () => Promise<void>
  reset: () => void
  isIdle: boolean
  isPending: boolean
  isSuccess: boolean
  isError: boolean
}

export type UseAsyncOptions = {
  /**
   * true이면 마운트 시 asyncFn을 즉시 실행합니다.
   * @defaultValue false
   */
  immediate?: boolean
}

const IDLE_STATE: UseAsyncState<never> = {
  status: 'idle',
  data: undefined,
  error: undefined,
}

const PENDING_STATE: UseAsyncState<never> = {
  status: 'pending',
  data: undefined,
  error: undefined,
}

/**
 * 비동기 함수의 loading/error/data 상태를 추적합니다.
 *
 * - `run()`을 호출하면 pending → success/error 상태로 전환됩니다.
 * - `immediate: true`이면 마운트 시 자동 실행됩니다.
 * - 컴포넌트가 언마운트되거나 재호출되면 이전 결과를 무시합니다 (stale 방지).
 * - `reset()`으로 idle 상태로 되돌립니다.
 *
 * @example
 * ```tsx
 * const { data, isPending, isError, error, run } = useAsync(fetchUser)
 *
 * return (
 *   <>
 *     {isPending && <Spinner />}
 *     {isError && <ErrorMsg>{error.message}</ErrorMsg>}
 *     {data && <UserCard user={data} />}
 *     <button onClick={run}>Reload</button>
 *   </>
 * )
 * ```
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  options: UseAsyncOptions = {}
): UseAsyncReturn<T> {
  const { immediate = false } = options

  const [state, setState] = useState<UseAsyncState<T>>(IDLE_STATE as UseAsyncState<T>)

  // stale 결과 무시를 위한 호출 카운터
  const callCounterRef = useRef(0)

  // 최신 asyncFn 참조 (run 콜백이 stale closure를 만들지 않도록)
  const asyncFnRef = useRef(asyncFn)
  useLayoutEffect(() => {
    asyncFnRef.current = asyncFn
  })

  const run = useCallback(async () => {
    const callId = ++callCounterRef.current

    setState(PENDING_STATE as UseAsyncState<T>)

    try {
      const data = await asyncFnRef.current()
      if (callId !== callCounterRef.current) return
      setState({ status: 'success', data, error: undefined })
    } catch (err) {
      if (callId !== callCounterRef.current) return
      const error = err instanceof Error ? err : new Error(String(err))
      setState({ status: 'error', data: undefined, error })
    }
  }, [])

  const reset = useCallback(() => {
    // 진행 중인 호출 결과를 무시하도록 카운터 증가
    callCounterRef.current++
    setState(IDLE_STATE as UseAsyncState<T>)
  }, [])

  useEffect(() => {
    if (immediate) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void run()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ...state,
    run,
    reset,
    isIdle: state.status === 'idle',
    isPending: state.status === 'pending',
    isSuccess: state.status === 'success',
    isError: state.status === 'error',
  }
}
