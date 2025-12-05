import { afterEach, expect, test } from 'vitest'

import { render, cleanup } from '../../test-utils'

import { Space } from './Space'

afterEach(() => cleanup())

test('`Space` 컴포넌트의 gap 이 설정된다', () => {
  // Arrange & Act
  const gap = '10px'
  const { getByTestId } = render(<Space x={gap} />)
  const spacer = getByTestId('spacer')
  const spacerGap = window.getComputedStyle(spacer).getPropertyValue('width')

  // Assert
  expect(spacerGap).toBe(gap)
})
