/**
 * ### 💡 알아두기
 * - 여러 `React.Ref`를 하나로 합쳐요.
 * - 내부적으로 @radix-ui/react-compose-refs를 사용합니다.
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
export { useComposedRefs, composeRefs } from '@radix-ui/react-compose-refs'

export type PossibleRef<T> = React.Ref<T> | undefined
