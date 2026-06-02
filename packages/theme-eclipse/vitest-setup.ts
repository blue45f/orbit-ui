import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// 테스트 환경에서 Lottie 라이브러리 임포트 시 발생하는 아래 에러를 우회함
// TypeError: Cannot set properties of null (setting 'fillStyle')
vi.mock('lottie-web/build/player/lottie_light', () => ({}))

// jsdom 폴리필
if (typeof Element !== 'undefined') {
  if (!Element.prototype.hasPointerCapture) {
    Element.prototype.hasPointerCapture = () => false
  }
  if (!Element.prototype.setPointerCapture) {
    Element.prototype.setPointerCapture = () => {}
  }
  if (!Element.prototype.releasePointerCapture) {
    Element.prototype.releasePointerCapture = () => {}
  }
  if (!Element.prototype.scrollIntoView) {
    Element.prototype.scrollIntoView = () => {}
  }
}

// jsdom은 elementFromPoint를 구현하지 않는다. tiptap 3.24.0+의 viewport-boundary 계산이
// prosemirror EditorView.posAtCoords → document.elementFromPoint를 호출하므로,
// 레이아웃이 없는 jsdom에서 Editor가 마운트 시 throw하지 않도록 null 반환 폴리필을 둔다.
if (typeof document !== 'undefined' && typeof document.elementFromPoint !== 'function') {
  document.elementFromPoint = (() => null) as typeof document.elementFromPoint
}

if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

globalThis.ResizeObserver = class MockResizeObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  constructor(_callback: ResizeObserverCallback, _options?: ResizeObserverOptions) {}
} as unknown as typeof ResizeObserver

globalThis.IntersectionObserver = class MockIntersectionObserver {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
  readonly root: Element | Document | null = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
} as unknown as typeof IntersectionObserver
