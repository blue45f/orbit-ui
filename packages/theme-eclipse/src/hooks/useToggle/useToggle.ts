import { useCallback, useState } from 'react'

export type UseToggleReturn = [boolean, (next?: boolean) => void]

/**
 * boolean 토글 state. setter는 인자 없이 호출하면 토글, true/false 명시 시 설정.
 *
 * `useDisclosure`보다 가볍습니다: 단일 boolean에 ARIA·콜백 분기가 필요 없을 때.
 *
 * @example
 * ```tsx
 * const [expanded, toggle] = useToggle(false)
 * <button onClick={() => toggle()}>{expanded ? '접기' : '펼치기'}</button>
 *
 * // 명시적 set
 * useEffect(() => {
 *   if (error) toggle(true)
 * }, [error])
 * ```
 */
export function useToggle(initial = false): UseToggleReturn {
  const [value, setValue] = useState(initial)
  const toggle = useCallback((next?: boolean) => {
    setValue((prev) => (next === undefined ? !prev : next))
  }, [])
  return [value, toggle]
}
