import { expect, test, vi } from 'vitest'

import { composeEventHandlers } from './composeEvent'

type FakeEvent = { defaultPrevented: boolean }

test('composeEventHandlers: original 핸들러 후 ours 핸들러를 순서대로 호출한다', () => {
  // Arrange
  const calls: string[] = []
  const original = vi.fn(() => calls.push('original'))
  const ours = vi.fn(() => calls.push('ours'))
  const handler = composeEventHandlers<FakeEvent>(original, ours)
  const event: FakeEvent = { defaultPrevented: false }

  // Act
  handler(event)

  // Assert
  expect(original).toHaveBeenCalledWith(event)
  expect(ours).toHaveBeenCalledWith(event)
  expect(calls).toEqual(['original', 'ours'])
})

test('composeEventHandlers: original이 defaultPrevented면 ours를 호출하지 않는다', () => {
  // Arrange
  const original = vi.fn()
  const ours = vi.fn()
  const handler = composeEventHandlers<FakeEvent>(original, ours)

  // Act
  handler({ defaultPrevented: true })

  // Assert
  expect(original).toHaveBeenCalledOnce()
  expect(ours).not.toHaveBeenCalled()
})

test('composeEventHandlers: checkDefaultPrevented=false면 defaultPrevented여도 ours를 호출한다', () => {
  // Arrange
  const ours = vi.fn()
  const handler = composeEventHandlers<FakeEvent>(undefined, ours, {
    checkDefaultPrevented: false,
  })

  // Act
  handler({ defaultPrevented: true })

  // Assert
  expect(ours).toHaveBeenCalledOnce()
})

test('composeEventHandlers: 핸들러가 없어도 예외 없이 동작한다', () => {
  // Arrange
  const handler = composeEventHandlers<FakeEvent>()

  // Act & Assert
  expect(() => handler({ defaultPrevented: false })).not.toThrow()
})
