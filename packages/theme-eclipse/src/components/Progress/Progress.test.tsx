import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { render, cleanup } from '../../test-utils'

import { Progress } from './Progress'

afterEach(() => cleanup())

describe('Progress', () => {
  test('progressbar role을 가진다', () => {
    const { container } = render(<Progress value={50} />)
    const bar = container.querySelector('[role="progressbar"]')
    expect(bar).toBeInTheDocument()
  })

  test('value 변경 시 transform 스타일이 달라진다', () => {
    const { container, rerender } = render(<Progress value={25} />)
    const indicator25 = container.querySelector('[role="progressbar"] > *') as HTMLElement
    const before = indicator25.style.transform

    rerender(<Progress value={75} />)
    const indicator75 = container.querySelector('[role="progressbar"] > *') as HTMLElement
    expect(indicator75.style.transform).not.toBe(before)
  })

  test('size 변경 시 root 클래스가 달라진다', () => {
    const { container, rerender } = render(<Progress value={50} size="small" />)
    const beforeClass = (container.firstChild as HTMLElement).className

    rerender(<Progress value={50} size="large" />)
    const afterClass = (container.firstChild as HTMLElement).className
    expect(afterClass).not.toBe(beforeClass)
  })

  test('indeterminate 모드를 지원한다', () => {
    const { container } = render(<Progress indeterminate />)
    const indicator = container.querySelector('[role="progressbar"] > *') as HTMLElement
    expect(indicator.className).toMatch(/animate/)
  })

  test('indeterminate 모드에서는 transform 스타일을 설정하지 않는다', () => {
    const { container } = render(<Progress indeterminate value={50} />)
    const indicator = container.querySelector('[role="progressbar"] > *') as HTMLElement
    // indeterminate면 transform 대신 undefined → DOM 상 빈 문자열
    expect(indicator.style.transform).toBe('')
  })

  test('color 변형에 따라 indicator 클래스가 달라진다', () => {
    const { container, rerender } = render(<Progress value={50} color="success" />)
    const success = (container.querySelector('[role="progressbar"] > *') as HTMLElement).className
    expect(success).toMatch(/systemMainTertiary/)

    rerender(<Progress value={50} color="warning" />)
    const warning = (container.querySelector('[role="progressbar"] > *') as HTMLElement).className
    expect(warning).toMatch(/systemSubPrimary/)
    expect(warning).not.toBe(success)
  })

  test('value가 없으면 transform은 빈 상태(-100%)로 시작한다', () => {
    const { container } = render(<Progress />)
    const indicator = container.querySelector('[role="progressbar"] > *') as HTMLElement
    // value 미지정 → value || 0 → translateX(-100%)
    expect(indicator.style.transform).toBe('translateX(-100%)')
  })

  test('ref를 forward 한다', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Progress ref={ref} value={50} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
