import { useEffect, useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/* ========================================================================
 * Types
 * ======================================================================== */

export type UseRouteAnnouncerOptions = {
  /**
   * 라우트를 식별하는 값. 보통 `location.pathname`을 넘겨요.
   * 이 값이 바뀔 때마다 (최초 페인트 제외) 새 안내가 발생해요.
   */
  location: string
  /**
   * 안내할 메시지. 보통 새 페이지의 제목(`document.title`)이에요.
   * - 함수를 넘기면 안내 시점에 호출돼서 동적으로 메시지를 만들 수 있어요.
   *   (예: `document.title`을 한 프레임 뒤에 읽고 싶을 때)
   * - 생략하면 메시지를 비워 두고 포커스 이동만 수행해요.
   */
  label?: string | (() => string)
  /**
   * 라우트 변경 후 프로그래밍적으로 포커스를 옮길 대상 엘리먼트의 `id`.
   * - 보통 `<main id="main" tabIndex={-1}>`을 가리켜요.
   * - 지정하지 않으면 포커스를 옮기지 않아요.
   */
  focusTargetId?: string
}

export type UseRouteAnnouncerResult = {
  /** aria-live 영역에 렌더링할 현재 안내 메시지. */
  message: string
}

/* ========================================================================
 * Hook
 * ======================================================================== */

const isBrowser = typeof window !== 'undefined'

const resolveLabel = (label: UseRouteAnnouncerOptions['label']): string => {
  if (typeof label === 'function') return label()
  return label ?? ''
}

/**
 * ### 💡 알아두기
 * - SPA는 전체 문서 로드 없이 콘텐츠만 교체되기 때문에, 멀티 페이지에서 "공짜로" 따라오던 두 가지가 깨져요.
 *   1. 스크린 리더가 페이지 변경을 인지하지 못함 → polite `aria-live` 영역으로 새 제목을 알려요.
 *   2. 포커스가 클릭한 링크에 남아 있음 → `focusTargetId`로 본문 랜드마크에 포커스를 옮겨요.
 * - **라우터에 의존하지 않아요.** `react-router`/`next`/`tanstack-router` 무엇을 쓰든
 *   `location`(경로 식별 값)과 `label`(안내 문구)만 넘기면 동작해요.
 * - 첫 페인트에서는 안내/포커스 이동을 건너뛰어, 사용자가 이미 있는 위치에서 포커스를 빼앗지 않아요.
 *
 * @example
 * ### react-router
 * ```tsx
 * const { pathname } = useLocation()
 * const { message } = useRouteAnnouncer({
 *   location: pathname,
 *   label: () => document.title,
 *   focusTargetId: 'main',
 * })
 * return <RouteAnnouncer message={message} />
 * ```
 *
 * @example
 * ### Next.js (app router)
 * ```tsx
 * const pathname = usePathname()
 * const { message } = useRouteAnnouncer({ location: pathname, label: title })
 * ```
 */
export function useRouteAnnouncer(options: UseRouteAnnouncerOptions): UseRouteAnnouncerResult {
  const { location, label, focusTargetId } = options

  const [message, setMessage] = useState('')
  const isInitialRender = useRef(true)

  // 최신 값을 effect 안에서 안전하게 읽기 위한 ref (location 변경에만 반응시키기 위함).
  // 렌더 중 ref 쓰기는 React Compiler 친화적이지 않으므로 layout effect 에서 갱신한다.
  const labelRef = useRef(label)
  const focusTargetIdRef = useRef(focusTargetId)
  useIsomorphicLayoutEffect(() => {
    labelRef.current = label
    focusTargetIdRef.current = focusTargetId
  })

  useEffect(() => {
    // 최초 페인트에서는 안내/포커스 이동을 하지 않는다 — 사용자는 이미 기대한 위치에 있다.
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (!isBrowser) return

    // 한 프레임 기다려, 목적지 페이지가 document.title 등을 갱신할 시간을 준다.
    const rafId = window.requestAnimationFrame(() => {
      setMessage(resolveLabel(labelRef.current))

      // 인페이지 앵커(#section) 이동이면 포커스를 빼앗지 않고 흐름을 유지한다.
      if (window.location.hash) return

      const targetId = focusTargetIdRef.current
      if (!targetId) return

      const target = document.getElementById(targetId)
      // 대상은 tabIndex={-1} 등으로 프로그래밍적 포커스가 가능해야 한다.
      target?.focus({ preventScroll: true })
    })

    return () => window.cancelAnimationFrame(rafId)
    // location이 바뀔 때만 재실행 — search/hash만 바뀌는 경우는 호출부에서 location을 고정해 제외할 수 있다.
  }, [location])

  return { message }
}
