import { expect, test } from 'vitest'

import { countElements, filterElements, isComponentTypeOf } from './componentType'

const Item = (_: { children?: React.ReactNode }) => null
const Other = (_: { children?: React.ReactNode }) => null

// children prop은 실제 사용처에서 배열로 전달된다 (Fragment는 Children API가 단일 노드로 취급).
const nodes = [<Item key="1" />, <Other key="2" />, <Item key="3" />]

test('isComponentTypeOf: 동일한 컴포넌트 타입이면 true, 다르면 false', () => {
  // Act & Assert
  expect(isComponentTypeOf(<Item />, Item)).toBe(true)
  expect(isComponentTypeOf(<Item />, Other)).toBe(false)
})

test('isComponentTypeOf: 유효한 엘리먼트가 아니면 false', () => {
  // Act & Assert
  expect(isComponentTypeOf('text', Item)).toBe(false)
  expect(isComponentTypeOf(null, Item)).toBe(false)
})

test('filterElements: 일치하는 타입의 요소만 거른다', () => {
  // Act & Assert
  expect(filterElements(nodes, Item)).toHaveLength(2)
  expect(filterElements(nodes, Other)).toHaveLength(1)
})

test('countElements: 일치하는 타입의 요소 개수를 센다', () => {
  // Act & Assert
  expect(countElements(nodes, Item)).toBe(2)
  expect(countElements(nodes, Other)).toBe(1)
})
