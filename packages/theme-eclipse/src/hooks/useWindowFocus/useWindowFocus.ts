import { useEffect, useState } from 'react'

/**
 * 브라우저 창/탭의 포커스 상태를 추적합니다.
 *
 * @returns 창이 포커스를 가지고 있으면 `true`, 그렇지 않으면 `false`
 *
 * @example
 * ```tsx
 * function App() {
 *   const focused = useWindowFocus()
 *   return <div>{focused ? 'Active' : 'Inactive'}</div>
 * }
 * ```
 */
export function useWindowFocus(): boolean {
  const [focused, setFocused] = useState(() =>
    typeof document !== 'undefined' ? document.hasFocus() : true
  )

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return focused
}
