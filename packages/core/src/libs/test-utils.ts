/**
 * Test utilities for @heejun-com/core
 */
import { render, screen, cleanup } from '@testing-library/react'

// Re-export testing-library utilities
export { render, screen, cleanup }

// Accessibility (axe-core) assertion helper. 구현은 src/test-utils.tsx 에 있으며
// 컴포넌트 테스트가 import 하는 위치(`../../test-utils`)와 동일한 헬퍼를 재노출한다.
export {
  expectNoA11yViolations,
  type A11yImpact,
  type ExpectNoA11yViolationsOptions,
} from '../test-utils'

/**
 * Creates a stub for requestAnimationFrame for testing
 */
export function createRAFStub() {
  let callbacks: Array<(time: number) => void> = []
  let time = 0

  const requestAnimationFrame = (callback: (time: number) => void) => {
    callbacks.push(callback)
    return callbacks.length
  }

  const stub = {
    requestAnimationFrame,
    // Alias for vi.stubGlobal usage
    init: requestAnimationFrame,
    cancelAnimationFrame: (id: number) => {
      callbacks = callbacks.filter((_, index) => index !== id - 1)
    },
    flush: () => {
      const cbs = callbacks
      callbacks = []
      cbs.forEach((cb) => cb(time))
    },
    step: (ms: number = 16) => {
      time += ms
      const cbs = callbacks
      callbacks = []
      cbs.forEach((cb) => cb(time))
    },
    install: () => {
      window.requestAnimationFrame = stub.requestAnimationFrame
      window.cancelAnimationFrame = stub.cancelAnimationFrame
    },
    uninstall: () => {
      // Restore original implementations if needed
    },
  }

  return stub
}

/**
 * Creates a mock DOMRect for testing
 */
export function createDOMRect(options: Partial<DOMRect> = {}): DOMRect {
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    toJSON: () => ({}),
    ...options,
  } as DOMRect
}
