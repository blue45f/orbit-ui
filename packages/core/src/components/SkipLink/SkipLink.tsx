import { forwardRef } from 'react'

import { cn } from '../../styles'

/* ========================================================================
 * Types
 * ======================================================================== */

export type SkipLinkProps = {
  /**
   * 이동할 대상의 `id`. (`#` 없이 id 값만, 혹은 `#id` 형태 모두 허용)
   * - 대상 엘리먼트에는 `id`와 `tabIndex={-1}`을 함께 부여하는 것을 권장해요.
   * @defaultValue `main`
   */
  targetId?: string
  /**
   * 링크에 노출되는 텍스트.
   * @defaultValue `본문 바로가기`
   */
  children?: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

/* ========================================================================
 * Style
 * ======================================================================== */

/**
 * 평소에는 화면 밖(sr-only 유사)으로 숨겨 두었다가, 키보드 포커스를 받으면
 * 좌상단에 나타나 클릭/엔터로 본문으로 이동할 수 있게 해요.
 *
 * `display:none`을 쓰지 않고 화면 밖으로 밀어내는 방식이라, 포커스를 받을 수 있고
 * 접근성 트리에서도 사라지지 않아요.
 */
const skipLinkClass = cn(
  // 평소: 화면 밖으로 밀어내 시각적으로 숨김 (포커스 가능 상태는 유지)
  'fixed left-2 top-2 z-[9999]',
  'inline-block -translate-y-[200%]',
  'rounded-md px-4 py-2',
  'bg-white text-black no-underline',
  'shadow-md outline-none',
  'border border-solid border-current',
  // 포커스 시: 화면 안으로 등장
  'focus:translate-y-0',
  'focus-visible:translate-y-0',
  'transition-transform'
)

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * ### 💡 알아두기
 * - 키보드/스크린 리더 사용자가 반복되는 내비게이션을 건너뛰고 본문으로 바로 이동할 수 있게 해주는 링크예요.
 * - 페이지의 **가장 첫 포커스 가능한 요소**가 되도록 `<body>` 최상단(보통 `<header>` 앞)에 두세요.
 * - 대상 엘리먼트(예: `<main id="main" tabIndex={-1}>`)에 일치하는 `id`를 부여해야 해요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```tsx
 * <SkipLink targetId="main">본문 바로가기</SkipLink>
 * // ...
 * <main id="main" tabIndex={-1}>...</main>
 * ```
 */
export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>((props, ref) => {
  const { targetId = 'main', children = '본문 바로가기', className, ...rest } = props

  const href = `#${targetId.replace(/^#/, '')}`

  return (
    <a
      ref={ref}
      href={href}
      className={cn(skipLinkClass, className)}
      data-orbit-ui-component="SkipLink"
      {...rest}
    >
      {children}
    </a>
  )
})

SkipLink.displayName = 'SkipLink'
