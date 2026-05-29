import { expect, test } from 'vitest'

import { sortBlocks } from './utils'

const block = (key: string, body = 'a{}') => `/*! ${key} */ ${body}`

test('sortBlocks: priorityList 순서대로 블록을 정렬한다', () => {
  // Arrange
  const sort = sortBlocks(['reset', 'base', 'components'])
  const input = [block('components'), block('reset'), block('base')]

  // Act & Assert
  expect(sort(input)).toEqual([block('reset'), block('base'), block('components')])
})

test('sortBlocks: priorityList에 없는 키의 블록은 뒤로 보낸다', () => {
  // Arrange
  const sort = sortBlocks(['reset', 'base'])
  const input = [block('unknown'), block('base'), block('reset')]

  // Act
  const result = sort(input)

  // Assert
  expect(result[0]).toBe(block('reset'))
  expect(result[1]).toBe(block('base'))
  expect(result[2]).toBe(block('unknown'))
})

test('sortBlocks: 키 주석(/*! ... */)이 없는 블록도 뒤로 보낸다', () => {
  // Arrange
  const sort = sortBlocks(['reset'])
  const input = ['no-key-block { x:1 }', block('reset')]

  // Act
  const result = sort(input)

  // Assert
  expect(result[0]).toBe(block('reset'))
  expect(result[1]).toBe('no-key-block { x:1 }')
})

test('sortBlocks: 원본 배열을 변경하지 않는다 (불변)', () => {
  // Arrange
  const sort = sortBlocks(['a', 'b'])
  const input = [block('b'), block('a')]
  const snapshot = [...input]

  // Act
  sort(input)

  // Assert
  expect(input).toEqual(snapshot)
})
