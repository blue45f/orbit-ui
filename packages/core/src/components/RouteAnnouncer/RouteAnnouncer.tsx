import { forwardRef } from 'react'

import { useRouteAnnouncer, type UseRouteAnnouncerOptions } from '../../libs'
import { VisuallyHidden } from '../VisuallyHidden'

/* ========================================================================
 * Types
 * ======================================================================== */

type RouteAnnouncerCommonProps = {
  /**
   * aria-live 영역의 정중함 수준.
   * @defaultValue `polite`
   */
  politeness?: 'polite' | 'assertive'
} & Omit<React.HTMLAttributes<HTMLElement>, 'children'>

/**
 * 제어형(controlled): 안내 문구를 직접 넘겨 라이브 영역만 렌더링해요.
 * 라우팅/포커스 관리를 호출부에서 직접 하고 싶을 때 사용해요.
 */
type ControlledRouteAnnouncerProps = RouteAnnouncerCommonProps & {
  /** 라이브 영역에 노출할 현재 안내 메시지. */
  message: string
  location?: never
  label?: never
  focusTargetId?: never
}

/**
 * 자체 관리형(uncontrolled): `useRouteAnnouncer`를 내부에서 호출해
 * 라우트 변경 감지·포커스 이동·안내를 한 번에 처리해요.
 */
type ManagedRouteAnnouncerProps = RouteAnnouncerCommonProps &
  UseRouteAnnouncerOptions & {
    message?: never
  }

export type RouteAnnouncerProps = ControlledRouteAnnouncerProps | ManagedRouteAnnouncerProps

/* ========================================================================
 * Component
 * ======================================================================== */

/**
 * ### 💡 알아두기
 * - SPA 라우트 변경을 스크린 리더에 알리는 polite `aria-live` 영역이에요.
 * - **라우터에 의존하지 않아요.** 두 가지 방식으로 쓸 수 있어요.
 *   1. 제어형: `message`만 넘겨 라이브 영역만 렌더링.
 *   2. 자체 관리형: `location`/`label`/`focusTargetId`를 넘기면 `useRouteAnnouncer`로 변경 감지·포커스 이동까지 처리.
 * - 라우터 컨텍스트 내부, 본문 랜드마크(`<main id="main" tabIndex={-1}>`)와 함께 한 번만 마운트하세요.
 *
 * @example
 * ### 자체 관리형 (react-router 등)
 * ```tsx
 * const { pathname } = useLocation()
 * <RouteAnnouncer location={pathname} label={() => document.title} focusTargetId="main" />
 * ```
 *
 * @example
 * ### 제어형
 * ```tsx
 * <RouteAnnouncer message={`${pageTitle} 페이지로 이동했어요`} />
 * ```
 */
export const RouteAnnouncer = forwardRef<HTMLDivElement, RouteAnnouncerProps>((props, ref) => {
  if ('message' in props && props.message !== undefined) {
    const { message, politeness = 'polite', ...rest } = props as ControlledRouteAnnouncerProps
    return <LiveRegion ref={ref} message={message} politeness={politeness} {...rest} />
  }

  return <ManagedRouteAnnouncer ref={ref} {...(props as ManagedRouteAnnouncerProps)} />
})

RouteAnnouncer.displayName = 'RouteAnnouncer'

/* ========================================================================
 * Internal
 * ======================================================================== */

const ManagedRouteAnnouncer = forwardRef<HTMLDivElement, ManagedRouteAnnouncerProps>(
  (props, ref) => {
    const { location, label, focusTargetId, politeness = 'polite', ...rest } = props
    const { message } = useRouteAnnouncer({ location, label, focusTargetId })
    return <LiveRegion ref={ref} message={message} politeness={politeness} {...rest} />
  }
)

ManagedRouteAnnouncer.displayName = 'ManagedRouteAnnouncer'

type LiveRegionProps = RouteAnnouncerCommonProps & { message: string }

const LiveRegion = forwardRef<HTMLDivElement, LiveRegionProps>((props, ref) => {
  const { message, politeness = 'polite', ...rest } = props
  return (
    <VisuallyHidden
      as="div"
      ref={ref}
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      data-orbit-ui-component="RouteAnnouncer"
      data-route-announcer=""
      {...rest}
    >
      {message}
    </VisuallyHidden>
  )
})

LiveRegion.displayName = 'RouteAnnouncerLiveRegion'
