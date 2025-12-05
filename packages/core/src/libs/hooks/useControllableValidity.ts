import { useEffect, useRef } from 'react'

import { useComposedRefs, PossibleRef } from './useComposedRefs'

/**
 * ### 💡 알아두기
 * - input, textarea, select 컨트롤 요소의 유효성 상태를 제어 방식으로 관리할 때 사용해요.
 * - 🚨 `<Form.Message asError match />`와 함께 사용 시 유효성 상태 경합이 발생할 수 있으니 유의해주세요.
 *
 * @param invalid 유효성 상태
 * @param refs 컨트롤 요소에 연결할 ref 인자 목록
 * @returns 컨트롤 요소에 연결할 ref
 *
 * @example
 * ### 👇 기본 사용법
 * ```ts
 * const Component = (props, forwardedRef) => {
 *   const refs = useControllableValidity(props.invalid, forwardedRef)
 *
 *   return <input ref={refs} />
 * }
 * ```
 */
export const useControllableValidity = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
  invalid: boolean | undefined,
  ...refs: PossibleRef<T>[]
): ReturnType<typeof useComposedRefs<T>> => {
  const selfRef = useRef<T>(null)
  const composedRefs = useComposedRefs<T>(selfRef, ...refs)

  useEffect(() => {
    if (!selfRef.current || invalid === undefined) return

    selfRef.current.setCustomValidity(invalid ? 'invalid' : '')
  }, [invalid])

  return composedRefs
}
