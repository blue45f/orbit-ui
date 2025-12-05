import { Children, cloneElement, ReactElement, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import {
  getReactElementRef,
  noop,
  useComposedRefs,
  useEvent,
  useIsMounted,
  useIsomorphicLayoutEffect,
  usePrevious,
} from '../../../libs'

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
  const { isPresent, ref: selfRef } = usePresence(present, onChange)

  const child = Children.only(children)

  const refProp = getReactElementRef(child)
  const ref = useComposedRefs(selfRef, refProp)

  // 사용처가 숨기고 싶어하면 숨겨줘야 하니 순서 주의
  const cloakedProps = {
    // aria-hidden="false"를 렌더링할 필요는 없으니까 undefined
    'aria-hidden': !present || undefined,
    ...(child.props as React.HTMLAttributes<HTMLElement>),
  }

  return isPresent
    ? cloneElement(child, {
        ...cloakedProps,
        ref,
        'data-present': present,
      } as React.HTMLAttributes<HTMLElement>)
    : null
}

// =========== * ===========

function usePresence(present: boolean, onChangeProp?: (state: boolean) => void) {
  const ref = useRef<HTMLElement>(null)
  const onChange = useEvent(onChangeProp || noop)

  const [resolvedPresence, setResolvedPresence] = useState(present)
  const prevPresence = usePrevious(present)
  const isMounted = useIsMounted()

  // 애니메이션 끝나면 isPresent: false
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const handleAnimationEnd = () => {
      if (present) {
        return
      }

      // React v18 automatic batch로 인한 애니메이션 버그 해결
      flushSync(() => setResolvedPresence(false))
    }

    ref.current.addEventListener('animationend', handleAnimationEnd)

    return () => {
      ref.current?.removeEventListener('animationend', handleAnimationEnd)
    }
  }, [present, resolvedPresence])

  // 애니메이션 없는 경우 즉시 isPresent: false
  useIsomorphicLayoutEffect(() => {
    // 없다가 나타날 땐 별 처리 안해도 됨
    if (present && !resolvedPresence) {
      setResolvedPresence(true)
      return
    }

    if (!ref.current) {
      return
    }

    const presenceChanged = prevPresence !== present
    if (!presenceChanged) {
      return
    }

    const animationInPlay = getComputedStyle(ref.current).animationName

    // 애니메이션 없으면 바로 isPresent: false
    if (!animationInPlay || animationInPlay === 'none') {
      setResolvedPresence(false)
    }
  }, [present, resolvedPresence])

  useEffect(() => {
    if (!isMounted) return
    onChange?.(resolvedPresence)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedPresence, onChange])

  return {
    isPresent: resolvedPresence,
    ref,
  }
}
