import { forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { useIsomorphicLayoutEffect } from '../../../libs'

type Props = {
  /**
   * 포탈을 배치할 요소
   * - `null`이면 렌더링하지 않아요.
   * @defaultValue `document.body`
   */
  host?: HTMLElement | null
} & React.HTMLAttributes<HTMLElement>

/**
 * ### 💡 알아두기
 * - 선언형 포탈이에요.
 * - 기본적으로 `document.body`에 `<div>`를 추가하여 렌더링해요.
 * - `host` prop으로 포탈을 배치할 요소를 지정할 수도 있어요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * render(
 *   <>
 *     <Portal id="portal">
 *       <p>Out of flow</p>
 *     </Portal>
 *     <h1>Flow</h1>
 *   </>
 * )
 * ```
 * 렌더링 결과:
 * ```html
 * <react-root>
 *   <h1>Flow</h1>
 * </react-root>
 * <div id="portal">
 *   <p>Out of flow</p>
 * </div>
 * ```
 */
export const Portal = forwardRef<HTMLDivElement, Props>(({ host: hostProp, ...props }, ref) => {
  const [host, setHost] = useState<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (!host) {
      setHost(hostProp === undefined ? document.body : hostProp)
      return
    }
  }, [hostProp, host])

  return host ? createPortal(<div ref={ref} {...props} />, host) : null
})
