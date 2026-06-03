import axe, { type RunOptions, type Result, type ImpactValue } from 'axe-core'
import { render, RenderOptions } from '@testing-library/react'
import { expect, vi } from 'vitest'

import { ThemeProvider } from './components/primitives'

export function createMockResizeObserver(): typeof ResizeObserver {
  return class MockResizeObserver {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()

    constructor(_callback?: ResizeObserverCallback) {}
  } as unknown as typeof ResizeObserver
}

export function createMockIntersectionObserver(): typeof IntersectionObserver {
  return class MockIntersectionObserver {
    root: Element | Document | null = null
    rootMargin = ''
    thresholds: ReadonlyArray<number> = []
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
    takeRecords = vi.fn((): IntersectionObserverEntry[] => [])

    constructor(_callback: IntersectionObserverCallback, options: IntersectionObserverInit = {}) {
      this.root = options.root ?? null
      this.rootMargin = options.rootMargin ?? ''
      const threshold = options.threshold ?? 0
      this.thresholds = Array.isArray(threshold) ? threshold : [threshold]
    }
  } as unknown as typeof IntersectionObserver
}

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

// ======== Accessibility (axe-core) ========

/** axe 위반의 심각도 단계. jsdom 단위 테스트에서는 serious/critical 만 게이트한다. */
export type A11yImpact = NonNullable<ImpactValue>

export type ExpectNoA11yViolationsOptions = {
  /**
   * 실패로 간주할 최소 심각도.
   * jsdom 은 실제 레이아웃/대비 계산을 하지 못하므로
   * 기본값은 'serious' 이상(serious, critical)만 게이트한다.
   * @default 'serious'
   */
  minImpact?: A11yImpact
  /** axe.run 에 전달할 추가 옵션 (특정 rule 비활성화 등) */
  runOptions?: RunOptions
}

const IMPACT_WEIGHT: Record<A11yImpact, number> = {
  minor: 1,
  moderate: 2,
  serious: 3,
  critical: 4,
}

const formatViolations = (violations: Result[]): string =>
  violations
    .map((violation) => {
      const targets = violation.nodes
        .map((node) => node.target.join(' '))
        .filter(Boolean)
        .join(', ')
      return `  [${violation.impact ?? 'unknown'}] ${violation.id}: ${violation.help}\n    nodes: ${targets}\n    see: ${violation.helpUrl}`
    })
    .join('\n')

/**
 * 주어진 DOM 노드에 axe-core 접근성 검사를 실행하고
 * minImpact 이상(기본 serious/critical) 위반이 없는지 단언한다.
 *
 * @example
 * ```tsx
 * const { container } = render(<Dialog defaultOpen>...</Dialog>)
 * await expectNoA11yViolations(container)
 * ```
 */
export async function expectNoA11yViolations(
  element: Element | Document = document.body,
  { minImpact = 'serious', runOptions }: ExpectNoA11yViolationsOptions = {}
): Promise<void> {
  const threshold = IMPACT_WEIGHT[minImpact]
  // axe 는 Document/Element context 를 받는다. RenderResult.container 를 직접 넘기면 된다.
  const results = await axe.run(element as never, {
    // 색상 대비는 jsdom 이 실제 렌더 색을 계산하지 못해 위양성이 잦으므로 제외한다.
    rules: { 'color-contrast': { enabled: false } },
    resultTypes: ['violations'],
    ...runOptions,
  })

  const gated = results.violations.filter(
    (violation) => IMPACT_WEIGHT[(violation.impact ?? 'minor') as A11yImpact] >= threshold
  )

  expect(
    gated,
    gated.length > 0
      ? `expected no ${minImpact}+ a11y violations but found ${gated.length}:\n${formatViolations(gated)}`
      : undefined
  ).toEqual([])
}
