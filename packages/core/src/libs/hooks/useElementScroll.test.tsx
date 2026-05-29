import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { useElementScroll } from './useElementScroll'

afterEach(() => cleanup())

// NOTE: 실제 스크롤 감지(isScrolled/isScrollable/isScrollEnd)는 레이아웃 측정값
// (scrollTop/offsetHeight/scrollHeight)에 의존하는데 jsdom에는 레이아웃 엔진이 없어
// 의미 있는 단위 검증이 어렵다. 실거동은 ScrollableTabGroup 등 컴포넌트 통합 테스트가 담당하고,
// 여기서는 초기 상태와 반환 형태만 회귀 가드한다.
test('useElementScroll: 초기 상태는 모두 false이고 scrollRef는 콜백 ref(함수)다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useElementScroll())

  // Assert
  expect(result.current.isScrolled).toBe(false)
  expect(result.current.isScrollable).toBe(false)
  expect(result.current.isScrollEnd).toBe(false)
  expect(typeof result.current.scrollRef).toBe('function')
})
