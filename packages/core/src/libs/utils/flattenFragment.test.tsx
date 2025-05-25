import { cleanup } from '@testing-library/react'
import { afterEach, expect, test } from 'vitest'

import { flattenFragment } from './flattenFragment'

afterEach(() => {
  cleanup()
})

test('Fragment로 감싸여진 자식 노드를 배열로 반환한다', () => {
  // Act
  const result = flattenFragment(
    <>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </>
  )

  // Assert
  expect(result.length).toBe(3)
})

test('1-depth까지만 처리한다', () => {
  // Act
  const result = flattenFragment(
    <>
      <div>1</div>
      <div>
        <div>2</div>
        <div>3</div>
      </div>
    </>
  )

  // Assert
  expect(result.length).toBe(2)
})

test('Fragment가 없으면 그대로 반환한다', () => {
  // Act
  const result = flattenFragment(
    <div>
      <div>1</div>
      <div>2</div>
    </div>
  )

  // Assert
  expect(result.length).toBe(1)
})
