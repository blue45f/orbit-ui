import { ThemeProvider } from '@heejun-com/core'
import { render, RenderOptions } from '@testing-library/react'
import { vi } from 'vitest'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider themeClass="light">{children}</ThemeProvider>
)

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => render(ui, { wrapper, ...options })

// ======== DOMRect Stub ========

type DOMRectParams = {
  x: number
  y: number
  width: number
  height: number
}

const createDOMRect = ({ x, y, width, height }: DOMRectParams): DOMRect => ({
  x,
  y,
  width,
  height,
  top: y,
  right: x + width,
  bottom: y + height,
  left: x,
  toJSON: () => '',
})

/**
 * vitest에서 browser-mode가 아닌 경우 window, document API를 지원하지 않습니다.
 * 가상의 DOM Rect를 사용해야하는 경우, DOMRect 호출 시 있는 것처럼 지원하기 위한 클래스입니다.
 */
class VirtualDOMRectClass {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    return createDOMRect({ x, y, width, height })
  }
}

/**
 * ResizeObserver 모킹
 */
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

export * from '@testing-library/react'
export { customRender as render, createDOMRect, VirtualDOMRectClass }
