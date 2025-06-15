import { render, RenderOptions } from '@testing-library/react'

import { ThemeProvider } from './components/primitives'

// ======== 기본 유틸 ========
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider mode="light" themeClass="light">
    {children}
  </ThemeProvider>
)

// https://testing-library.com/docs/react-testing-library/setup#custom-render
const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => render(ui, { wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render }

// ======== RequestAnimationFrame Stub ========

type RAFCallback = (timestamp: number) => void

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createRAFStub = () => {
  let timestamp = performance?.now() ?? Date.now()
  let callback: RAFCallback | null = null
  let frameID = 0

  return {
    init: (cb: RAFCallback) => {
      callback = cb

      frameID += 1
      return frameID
    },
    cancel: () => {
      frameID = 0
    },
    /**
     * 매 프레임 단위 호출은 step 메서드로 제어해요.
     * 시간 증분을 제대로 전달 받으려면 최초 호출이 한번 더 필요해요.
     *
     * @example
     * step() // 최초 호출
     * step(5000) // 5초 경과
     */
    step: (frameDuration = 0) => {
      if (frameID === 0) return

      timestamp += frameDuration
      callback?.(timestamp)
    },
  }
}

// ======== DOMRect Stub ========

type DOMRectParams = {
  x: number
  y: number
  width: number
  height: number
}

export const createDOMRect = ({ x, y, width, height }: DOMRectParams): DOMRect => ({
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
export class VirtualDOMRectClass {
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
 * 가상의 DOMRect 클래스를 주입함에도 불구하고
 * 실제 렌더링 시에 필요한 계산 로직을 테스트에서 이용하는 경우
 * 계산 식 간에 오류를 최소화하기 위핸 DOMRect 프록시 객체 생성 함수입니다.
 */
export const createProxyForDOMRect = (target: HTMLElement, params: DOMRectParams): HTMLElement => {
  return new Proxy(target, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(obj: any, prop) {
      if (typeof obj[prop] === 'function') {
        if (prop === 'getBoundingClientRect') {
          return () => createDOMRect(params)
        }
        obj[prop].bind(obj)
      }
      if (prop === 'offsetWidth') return params.width
      if (prop === 'offsetHeight') return params.height

      return Reflect.get(obj, prop)
    },
  })
}
