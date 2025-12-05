import { useCallback } from 'react'

export type PossibleRef<T> = React.Ref<T> | undefined

/**
 * ### 💡 알아두기
 * - 여러 `React.Ref`를 하나로 합쳐요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```ts
 * const Component = (props, forwardedRef) => {
 *   const selfRef = useRef()
 *   const ref = useComposedRefs(forwardedRef, selfRef)
 *
 *   return <div ref={ref} />
 * }
 * ```
 */
export function useComposedRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs(...refs), refs)
}

export function composeRefs<T>(...refs: PossibleRef<T>[]): (node: T | null) => void {
  return (node: T | null) => refs.forEach((ref) => setRef(ref, node))
}

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (ref === null || ref === undefined) {
    return
  }

  if (typeof ref === 'function') {
    ref(value)
  } else {
    ;(ref as React.MutableRefObject<T | null>).current = value
  }
}
