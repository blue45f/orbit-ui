import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { cleanup, render, screen, act } from '../../test-utils'

import { RouteAnnouncer } from './RouteAnnouncer'

// jsdom 은 requestAnimationFrame 을 동기 콜백으로 흉내내기 어려우므로 즉시 실행으로 스텁한다.
beforeEach(() => {
  vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
    cb(0)
    return 1
  })
  vi.stubGlobal('cancelAnimationFrame', () => {})
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  window.location.hash = ''
})

/* ========================================================================
 * Controlled
 * ======================================================================== */

test('RouteAnnouncer(제어형): polite aria-live status 영역을 렌더링한다', () => {
  // Arrange & Act
  render(<RouteAnnouncer message="홈 페이지로 이동했어요" />)
  const region = screen.getByRole('status')

  // Assert
  expect(region).toHaveAttribute('aria-live', 'polite')
  expect(region).toHaveAttribute('aria-atomic', 'true')
  expect(region).toHaveTextContent('홈 페이지로 이동했어요')
})

test('RouteAnnouncer(제어형): 시각적으로 숨겨진다 (sr-only)', () => {
  // Arrange & Act
  render(<RouteAnnouncer message="안내" />)
  const region = screen.getByRole('status')

  // Assert — VisuallyHidden 의 sr-only 클래스로 시각적으로 감추되 DOM/접근성 트리에는 남는다.
  expect(region).toHaveClass('absolute')
  expect(region).toHaveClass('overflow-hidden')
  expect(region.className).not.toMatch(/(^|\s)hidden(\s|$)/)
})

test('RouteAnnouncer(제어형): politeness 를 assertive 로 바꿀 수 있다', () => {
  // Arrange & Act
  render(<RouteAnnouncer message="긴급" politeness="assertive" />)

  // Assert
  expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'assertive')
})

/* ========================================================================
 * Managed (useRouteAnnouncer 내부 사용)
 * ======================================================================== */

test('RouteAnnouncer(자체관리형): 최초 페인트에서는 안내하지 않는다', () => {
  // Arrange & Act
  render(<RouteAnnouncer location="/home" label="홈" />)

  // Assert — 첫 렌더에서는 메시지가 비어 있다 (포커스/안내를 빼앗지 않음)
  expect(screen.getByRole('status')).toHaveTextContent('')
})

test('RouteAnnouncer(자체관리형): location 이 바뀌면 label 을 안내한다', () => {
  // Arrange
  const { rerender } = render(<RouteAnnouncer location="/home" label="홈" />)

  // Act — 라우트 변경
  act(() => {
    rerender(<RouteAnnouncer location="/about" label="소개 페이지" />)
  })

  // Assert
  expect(screen.getByRole('status')).toHaveTextContent('소개 페이지')
})

test('RouteAnnouncer(자체관리형): label 함수는 안내 시점에 호출된다', () => {
  // Arrange
  const label = vi.fn(() => '동적 제목')
  const { rerender } = render(<RouteAnnouncer location="/a" label={label} />)
  expect(label).not.toHaveBeenCalled() // 최초 페인트에서는 호출되지 않음

  // Act
  act(() => {
    rerender(<RouteAnnouncer location="/b" label={label} />)
  })

  // Assert
  expect(label).toHaveBeenCalledTimes(1)
  expect(screen.getByRole('status')).toHaveTextContent('동적 제목')
})

test('RouteAnnouncer(자체관리형): focusTargetId 대상으로 포커스를 옮긴다', () => {
  // Arrange
  const main = document.createElement('main')
  main.id = 'main'
  main.tabIndex = -1
  document.body.appendChild(main)

  const { rerender } = render(<RouteAnnouncer location="/home" label="홈" focusTargetId="main" />)

  // Act
  act(() => {
    rerender(<RouteAnnouncer location="/next" label="다음" focusTargetId="main" />)
  })

  // Assert
  expect(document.activeElement).toBe(main)

  // Cleanup
  document.body.removeChild(main)
})

test('RouteAnnouncer(자체관리형): 인페이지 해시 이동이면 포커스를 옮기지 않는다', () => {
  // Arrange
  const main = document.createElement('main')
  main.id = 'main'
  main.tabIndex = -1
  document.body.appendChild(main)
  window.location.hash = '#section'

  const { rerender } = render(<RouteAnnouncer location="/home" label="홈" focusTargetId="main" />)

  // Act
  act(() => {
    rerender(<RouteAnnouncer location="/home#section" label="홈" focusTargetId="main" />)
  })

  // Assert — 해시가 있으면 포커스 이동을 건너뛴다
  expect(document.activeElement).not.toBe(main)

  // Cleanup
  document.body.removeChild(main)
})
