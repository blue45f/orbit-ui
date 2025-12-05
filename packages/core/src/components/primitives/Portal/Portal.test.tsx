import { render, cleanup } from '@testing-library/react'
import { useState } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { Portal } from './Portal'

beforeAll(() => {
  console.error = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('지정한 요소 또는 document.body에 렌더링한다', () => {
  // Arrange
  const PortalRoom: React.FC = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null)

    return (
      <>
        <div ref={setRef} />
        <h1>Main flow</h1>
        <Portal>Portal to body</Portal>
        {ref && <Portal host={ref as HTMLElement}>Hosted portal A</Portal>}
        {ref && <Portal host={ref as HTMLElement}>Hosted portal B</Portal>}
        <Portal host={null}>To void</Portal>
      </>
    )
  }
  const screen = render(<PortalRoom />)

  // Act
  // noop

  // Assert
  expect(screen.baseElement).toContainHTML('Hosted portal A')
  expect(screen.baseElement).toContainHTML('Hosted portal B')
  expect(screen.baseElement).toContainHTML('Portal to body')
  expect(screen.baseElement).toContainHTML('Main flow')
})

test('문제 없이 리렌더한다', () => {
  // Arrange
  const screen = render(
    <>
      <h1>Main flow</h1>
      <Portal id='id'>Portal A</Portal>
      <Portal className='class'>Portal B</Portal>
    </>,
  )

  // Act
  screen.rerender(
    <>
      <h1>Main flow</h1>
      <Portal id='id'>Portal C</Portal>
    </>,
  )

  // Assert
  expect(screen.baseElement).toContainHTML('Portal C')
  expect(screen.baseElement).toContainHTML('Main flow')
})

// =========== SSR ===========

test('서버에서 렌더링하지 않는다', () => {
  // Arrange

  // useLayoutEffect 경고 서프레션
  // typeof window !== 'undefined'인 곳에서 react-dom/server를 사용하고 있으니...
  const result = renderToString(<Portal>Portal A</Portal>)

  // Act
  // noop

  // Assert
  expect(result).toBe('')
})

test('하이드레이션 시 불일치가 발생하지 않는다', () => {
  // Arrange
  document.body.innerHTML = '<div id="root"></div>'

  // Act
  hydrateRoot(document.querySelector('#root') as HTMLElement, <Portal>Portal</Portal>)

  // Assert
  expect(console.error).not.toBeCalled()
})
