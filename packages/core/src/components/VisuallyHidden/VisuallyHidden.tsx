import { createElement, useRef } from 'react'

import { composeRefs, polymorphic } from '../../libs'
import { cn } from '../../styles'

/* ========================================================================
 * Types
 * ======================================================================== */

export type VisuallyHiddenProps = {
  children?: React.ReactNode
}

/* ========================================================================
 * Style
 * ======================================================================== */

/**
 * The well-known "sr-only" technique: keep content in the accessibility tree
 * (and the DOM) while hiding it from sighted users. Equivalent to the
 * `.sr-only` utility in `globals.css`, but inlined as Tailwind classes so the
 * component works even when consumers don't ship the core stylesheet.
 *
 * `display: none` / `visibility: hidden` are intentionally avoided — they also
 * remove the node from the accessibility tree, which defeats the purpose.
 */
const visuallyHiddenClass = cn(
  'absolute',
  'h-px w-px',
  'p-0 -m-px',
  'overflow-hidden whitespace-nowrap',
  'border-0',
  '[clip:rect(0,0,0,0)]',
  '[clip-path:inset(50%)]'
)

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * ### 💡 알아두기
 * - 시각적으로는 감추되 스크린 리더 등 보조기기에는 노출하고 싶은 콘텐츠에 사용해요.
 * - 흔히 `sr-only` 기법이라고 불러요. (`display:none`은 접근성 트리에서도 제거되므로 사용하지 않아요.)
 * - `as` prop으로 렌더링할 태그를 바꿀 수 있어요. (기본값 `span`)
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * <button>
 *   <IconTrash />
 *   <VisuallyHidden>삭제</VisuallyHidden>
 * </button>
 * ```
 */
export const VisuallyHidden = polymorphic<
  'span',
  keyof React.JSX.IntrinsicElements,
  VisuallyHiddenProps
>(
  (props, ref) => {
    const { as, className, children, ...rest } = props
    const selfRef = useRef<HTMLElement>(null)
    const refs = composeRefs(ref as React.RefObject<HTMLElement | null>, selfRef)

    return createElement(
      as ?? 'span',
      {
        ref: refs,
        className: cn(visuallyHiddenClass, className),
        'data-orbit-ui-component': 'VisuallyHidden',
        ...rest,
      },
      children
    )
  },
  { useForwardRef: true }
)
