import { useLayoutEffect } from 'react'
import { expect, test } from 'vitest'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

test('useIsomorphicLayoutEffect: 브라우저(window 존재) 환경에서는 useLayoutEffect를 사용한다', () => {
  // jsdom 환경에는 window가 있으므로 useLayoutEffect와 동일 참조여야 한다
  expect(typeof window).not.toBe('undefined')
  expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
})
