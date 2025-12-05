import { afterEach, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { Badge } from './Badge'

afterEach(() => cleanup())

test('`Badge` 컴포넌트를 렌더링한다', () => {
  // Arrange & Act
  render(
    <Badge>
      <Badge.Leading>Leading</Badge.Leading>
      <Badge.Trailing>Trailing</Badge.Trailing>
    </Badge>,
  )

  // Assert
  expect(screen.getByText('Leading')).toBeInTheDocument()
  expect(screen.getByText('Trailing')).toBeInTheDocument()
})
