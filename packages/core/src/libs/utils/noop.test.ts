import { expect, test } from 'vitest'

import { noop } from './noop'

test('noop: 호출해도 예외 없이 undefined를 반환한다', () => {
  // Act & Assert
  expect(noop()).toBeUndefined()
})
