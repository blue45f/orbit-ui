import { Children, cloneElement, ReactElement, useEffect } from 'react'
import { Presence as RadixPresence } from '@radix-ui/react-presence'

import { noop, useEvent, useIsMounted } from '../../../libs'

// =========== Presence ===========

export interface PresenceProps {
  children: ReactElement
  present: boolean
  onChange?: (state: boolean) => void
}

/**
 * ### 💡 알아두기
 * - 애니메이션 가능한 조건 렌더링 컴포넌트예요.
 * - `present={false}`면 트리에서 자식 요소를 제외해요.
 * - 자식 요소에 애니메이션이 있으면, 사라지기 전에 애니메이션을 끝까지 재생해요.
 * - 열림과 닫힘 상태는 HTML 요소에 추가되는 `data-present` 어트리뷰트로 알 수 있어요. (예제 참고)
 * - 🚨 자식은 HTML 요소이거나, HTML 요소 참조를 포워딩하는 컴포넌트 하나만 존재해야해요.
 * - 🚨 열 때와 닫을 때의 애니메이션 식별자는 서로 달라야 해요. (예제 참고)
 *
 * @example
 * ### 👇 CSS 애니메이션 식별자
 * ```scss
 * .presentable[data-present=true] {
 *   animation: fadeIn 0.3s forwards;
 * }
 * .presentable[data-present=false] {
 *   // animation: fadeIn 0.3s reverse; // 불가능, fadeIn 식별자 중복
 *   animation: fadeOut 0.3s forwards;
 * }
 * ```
 *
 * ### 👇 컴포넌트
 * ```tsx
 * const [state, toggle] = useReducer((v) => !v, false)
 *
 * return (
 *   <>
 *     <button type="button" onClick={toggle}>{state ? '숨기기' : '보이기'}</button>
 *     <Presence present={state}>
 *       <div className="presentable" />
 *     </Presence>
 *   </>
 * )
 * ```
 */
export const Presence: React.FC<PresenceProps> = ({ children, present, onChange }) => {
  const child = Children.only(children)
  const onChange_ = useEvent(onChange || noop)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (!isMounted) return
    onChange_?.(present)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [present, onChange_])

  // Radix Presence handles animation-aware mount/unmount internally.
  // We wrap the child with data-present and aria-hidden attributes to preserve API compatibility.
  const wrappedChild = cloneElement(child, {
    // aria-hidden="false"를 렌더링할 필요는 없으니까 undefined
    'aria-hidden': !present || undefined,
    ...(child.props as React.HTMLAttributes<HTMLElement>),
    'data-present': present,
  } as React.HTMLAttributes<HTMLElement>)

  return <RadixPresence present={present}>{wrappedChild}</RadixPresence>
}
