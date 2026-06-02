import { useCallback } from 'react'

// Use structural type to accept both RefObject<T> (React 19 non-nullable) and
// MutableRefObject<T | null> (the common useRef(null) pattern).
type ReactRef<T> = React.RefCallback<T> | { current: T | null } | null | undefined

function assignRef<T>(ref: ReactRef<T>, value: T | null): void {
  if (!ref) return
  if (typeof ref === 'function') {
    ref(value)
  } else {
    ;(ref as { current: T | null }).current = value
  }
}

export function useMergeRefs<T>(...refs: ReactRef<T>[]): React.RefCallback<T> {
  return useCallback(
    (node: T | null) => {
      refs.forEach((ref) => assignRef(ref, node))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/use-memo
    [...refs]
  )
}
