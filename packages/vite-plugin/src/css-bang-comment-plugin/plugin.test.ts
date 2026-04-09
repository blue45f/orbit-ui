import { describe, test, expect } from 'vitest'

import { getFilenameSegment } from './utils'

describe('getFilenameSegment 함수 테스트', () => {
  test('depth를 지정하지 않을 경우 프로젝트 명과 파일 명이 노출되어야 한다', () => {
    const root = '/Users/me/projects/my-app'
    const id = '/Users/me/projects/my-app/src/utils/helpers.ts'
    const result = getFilenameSegment(root, id)
    expect(result).toBe('my-app/.../helpers.ts')
  })

  test('depth가 1일 경우 프로젝트 명과 파일 명이 노출되어야 한다', () => {
    const root = '/projects/my-app'
    const id = '/projects/my-app/src/index.ts'
    const result = getFilenameSegment(root, id, 1)
    expect(result).toBe('my-app/.../index.ts')
  })

  test('depth가 3일 경우 프로젝트 명과 파일의 상위 두 계층(존재한다면)이 노출되어야 한다', () => {
    const root = '/projects/my-app'
    const id = '/projects/my-app/src/components/Button/index.ts'
    const result = getFilenameSegment(root, id, 3)
    expect(result).toBe('my-app/.../components/Button/index.ts')
  })

  test('depth가 상위 계층보다 많다면 가능한 최대 계층으로 노출된다', () => {
    const root = '/projects/my-app'
    const id = '/projects/my-app/src/file.ts'
    const result = getFilenameSegment(root, id, 5)
    expect(result).toBe('my-app/.../src/file.ts')
  })
})
