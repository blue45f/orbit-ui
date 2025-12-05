import { afterEach, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { RadioButton } from './RadioButton'

afterEach(() => cleanup())

test('`RadioButton` 컴포넌트를 렌더링한다', () => {
  // Arrange & Act
  render(
    <RadioButton width={10} height={10} borderWidth={1}>
      My Component
    </RadioButton>,
  )

  // Assert
  expect(screen.getByText('My Component')).toBeInTheDocument()
})
