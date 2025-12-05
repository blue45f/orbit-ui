import { cleanup, render } from '@testing-library/react'
import { afterEach, assert, beforeAll, expect, test, vi } from 'vitest'

import { asPlug, slotted, slottedForwardRef } from './Slot'

const Slotted = slotted(['prefix', 'suffix'], ({ slots }) => {
  return (
    <div data-testid='root'>
      {slots.prefix}
      {slots.default}
      {slots.suffix}
    </div>
  )
})

const SlottedRefForwarding = slottedForwardRef<'prefix' | 'suffix', HTMLDivElement>(
  ['prefix', 'suffix'],
  ({ slots }, ref) => {
    return (
      <div ref={ref} data-testid='root'>
        {slots.prefix}
        {slots.default}
        {slots.suffix}
      </div>
    )
  },
)

const CustomPrefixPlug = asPlug<{ children: string }>('prefix', ({ children }) => {
  return <small>{children}</small>
})

beforeAll(() => {
  console.warn = vi.fn()
})

afterEach(() => cleanup())

test('렌더링 순서가 유지된다', () => {
  // Arrange
  const screen = render(
    <Slotted>
      center!
      <Slotted.Plug name='suffix'>bye!</Slotted.Plug>
      <Slotted.Plug name='prefix'>hi!</Slotted.Plug>
    </Slotted>,
  )

  // Act
  // noop

  // Assert
  expect(screen.getByTestId('root').textContent).toBe('hi!center!bye!')
})

test('중복 슬롯과 알 수 없는 슬롯 이름은 무시한다', () => {
  // Arrange
  const screen = render(
    <Slotted>
      center!
      <Slotted.Plug name='prefix'>prefix A!</Slotted.Plug>
      <Slotted.Plug name='prefix'>prefix B!</Slotted.Plug>
      {/* @ts-expect-error 없는 이름 의도됨 */}
      <Slotted.Plug name='bad'>bad!</Slotted.Plug>
    </Slotted>,
  )

  // Act
  // noop

  // Assert
  expect(screen.getByTestId('root').textContent).toBe('prefix A!center!')
})

test('참조 포워딩이 깨지지 않는다', () => {
  // Arrange
  // let ref: HTMLDivElement | null = null
  // 위와 같이 하면 HTMLDivElement가 무시됨. (r) => (ref = r)이 콜백 내에 있기 때문
  let ref = null as HTMLDivElement | null
  render(
    <SlottedRefForwarding
      ref={(r) => {
        ref = r
      }}
    >
      forwarded
    </SlottedRefForwarding>,
  )

  // Act
  // noop

  // Assert
  assert(ref && ref instanceof HTMLDivElement)
  expect(ref.textContent).toBe('forwarded')
})

test('조건부 렌더링과 Fragment 안에서도 정상 동작한다', () => {
  // Arrange
  const LazySlotted = ({ ready }: { ready?: boolean }) => {
    return (
      <Slotted>
        center!
        {ready && (
          <>
            <Slotted.Plug name='prefix'>prefix!</Slotted.Plug>
            <Slotted.Plug name='suffix'>suffix!</Slotted.Plug>
          </>
        )}
      </Slotted>
    )
  }

  // Act & Assert
  const screen = render(<LazySlotted />)
  expect(screen.getByTestId('root').textContent).toBe('center!')

  // Act & Assert
  screen.rerender(<LazySlotted ready />)
  expect(screen.getByTestId('root').textContent).toBe('prefix!center!suffix!')
})

test('커스텀 플러그 컴포넌트를 선언하고 사용할 수 있다', () => {
  // Arrange
  const screen = render(
    <Slotted>
      center!
      <CustomPrefixPlug>custom prefix!</CustomPrefixPlug>
    </Slotted>,
  )

  // Act
  // noop

  // Assert
  const root = screen.getByTestId('root')
  expect(root).toContainHTML('custom prefix!')
  expect(root).toContainHTML('center!')
  expect(root).toBeInTheDocument()
})
