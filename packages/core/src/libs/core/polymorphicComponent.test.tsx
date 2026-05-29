import { expect, test } from 'vitest'

import { polymorphic } from './polymorphicComponent'

test('polymorphic: 기본은 전달한 컴포넌트 함수를 그대로 반환한다', () => {
  // Arrange
  const Comp = () => null

  // Act & Assert: 동일 참조
  expect(polymorphic(Comp as never)).toBe(Comp)
})

test('polymorphic: useForwardRef=true면 forwardRef로 감싼 컴포넌트를 반환한다', () => {
  // Arrange
  const Comp = () => null

  // Act
  const wrapped = polymorphic(Comp as never, { useForwardRef: true })

  // Assert: 원본과 다른, forwardRef 객체($$typeof 보유)
  expect(wrapped).not.toBe(Comp)
  expect((wrapped as { $$typeof?: symbol }).$$typeof).toBeDefined()
})
