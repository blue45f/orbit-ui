import { fireEvent } from '@testing-library/react'
import { useRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { useFocusTrap } from './useFocusTrap'

function TrapShell({
  enabled = true,
  autoFocus,
  restoreFocus,
  withInputs = true,
}: {
  enabled?: boolean
  autoFocus?: boolean
  restoreFocus?: boolean
  withInputs?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(ref, { enabled, autoFocus, restoreFocus })

  return (
    <div>
      <button data-testid="outside-before">outside-before</button>
      <div ref={ref} role="dialog" aria-label="test">
        {withInputs && (
          <>
            <button data-testid="first">first</button>
            <input data-testid="middle" />
            <button data-testid="last">last</button>
          </>
        )}
      </div>
      <button data-testid="outside-after">outside-after</button>
    </div>
  )
}

describe('useFocusTrap', () => {
  afterEach(() => {
    cleanup()
  })

  test('활성화되면 첫 포커스 가능 요소가 자동 포커스된다', () => {
    render(<TrapShell />)
    expect(document.activeElement).toBe(screen.getByTestId('first'))
  })

  test('Tab으로 마지막에서 첫번째로 순환한다', () => {
    render(<TrapShell />)
    screen.getByTestId('last').focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(screen.getByTestId('first'))
  })

  test('Shift+Tab으로 첫번째에서 마지막으로 순환한다', () => {
    render(<TrapShell />)
    screen.getByTestId('first').focus()
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(screen.getByTestId('last'))
  })

  test('포커스가 컨테이너 밖으로 빠지면 첫번째로 다시 가져온다', () => {
    render(<TrapShell />)
    screen.getByTestId('outside-after').focus()
    fireEvent.keyDown(document, { key: 'Tab' })
    expect(document.activeElement).toBe(screen.getByTestId('first'))
  })

  test('enabled=false 면 자동 포커스를 건드리지 않는다', () => {
    const outside = document.createElement('button')
    outside.textContent = 'pre-focused'
    document.body.appendChild(outside)
    outside.focus()
    expect(document.activeElement).toBe(outside)

    render(<TrapShell enabled={false} />)
    expect(document.activeElement).toBe(outside)
    document.body.removeChild(outside)
  })

  test('비활성화 시 진입 직전 포커스를 복원한다 (restoreFocus 기본 true)', () => {
    const opener = document.createElement('button')
    opener.textContent = 'opener'
    document.body.appendChild(opener)
    opener.focus()
    expect(document.activeElement).toBe(opener)

    const { unmount } = render(<TrapShell />)
    expect(document.activeElement).toBe(screen.getByTestId('first'))

    unmount()
    expect(document.activeElement).toBe(opener)
    document.body.removeChild(opener)
  })

  test('Tab 외의 키는 트랩이 가로채지 않는다', () => {
    render(<TrapShell />)
    screen.getByTestId('first').focus()
    fireEvent.keyDown(document, { key: 'a' })
    expect(document.activeElement).toBe(screen.getByTestId('first'))
  })
})
