import { expect, test } from 'vitest'

import { getFilenameSegment } from './utils'

test('getFilenameSegment: 프로젝트명 + 마지막 세그먼트를 조합한다 (기본 depth=1)', () => {
  // Arrange
  const root = '/Users/me/project'
  const id = '/Users/me/project/src/components/Button/Button.css.ts'

  // Act & Assert
  expect(getFilenameSegment(root, id)).toBe('project/.../Button.css.ts')
})

test('getFilenameSegment: depth만큼 뒤 경로 세그먼트를 포함한다', () => {
  // Arrange
  const root = '/Users/me/project'
  const id = '/Users/me/project/src/components/Button/Button.css.ts'

  // Act & Assert
  expect(getFilenameSegment(root, id, 2)).toBe('project/.../Button/Button.css.ts')
})

test('getFilenameSegment: 프로젝트명은 root 경로의 마지막 디렉터리에서 가져온다', () => {
  // Arrange
  const root = '/srv/orbit-ui'
  const id = '/srv/orbit-ui/packages/core/src/styles/globals.css'

  // Act & Assert
  expect(getFilenameSegment(root, id)).toBe('orbit-ui/.../globals.css')
})
