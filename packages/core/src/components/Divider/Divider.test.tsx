import { afterEach, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { Divider } from './Divider'

afterEach(() => cleanup())

test('`Divider` 컴포넌트를 렌더링한다', () => {
  // Arrange & Act
  render(<Divider />)

  // Assert
  expect(screen.getByRole('separator')).toBeInTheDocument()
})
