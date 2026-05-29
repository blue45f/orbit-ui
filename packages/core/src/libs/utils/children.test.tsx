import { Children, type ReactElement } from 'react'
import { expect, test, vi } from 'vitest'

import { filterComponents, findComponent, mapChildrenWithSelection } from './children'

const Leading = (_: { children?: React.ReactNode }) => null
const Center = (_: { children?: React.ReactNode }) => null
const Trailing = (_: { children?: React.ReactNode }) => null
const Other = (_: { children?: React.ReactNode }) => null

// children은 실제 사용처에서 배열로 전달된다 (Fragment는 Children API가 단일 노드로 취급).

test('filterComponents: 타입별로 분리하고 나머지는 unfiltered로 반환한다', () => {
  // Arrange
  const childrenArray = [
    <Leading key="1" />,
    <Other key="2" />,
    <Leading key="3" />,
    <Trailing key="4" />,
  ]

  // Act
  const { filtered, unfiltered } = filterComponents(childrenArray, Leading, Trailing)

  // Assert
  expect(filtered[0]).toHaveLength(2) // Leading 2개
  expect(filtered[1]).toHaveLength(1) // Trailing 1개
  expect(unfiltered).toHaveLength(1) // Other 1개
})

test('findComponent: 지정한 컴포넌트를 이름 키 객체로 추출하고, 없으면 undefined', () => {
  // Arrange
  const childrenArray = [<Leading key="1" />, <Center key="2" />]

  // Act
  const result = findComponent({
    childrenArray,
    target: [
      { name: 'leading', component: Leading },
      { name: 'center', component: Center },
      { name: 'trailing', component: Trailing },
    ],
  })

  // Assert
  expect(result.leading).toBeDefined()
  expect(result.center).toBeDefined()
  expect(result.trailing).toBeUndefined()
})

test('mapChildrenWithSelection: selectedIndex에 해당하는 자식만 selected=true가 된다', () => {
  // Arrange
  const children = [<Center key="0" />, <Center key="1" />, <Center key="2" />]

  // Act
  const result = mapChildrenWithSelection(children, 1, () => {})

  // Assert
  const arr = Children.toArray(result) as ReactElement<{ selected?: boolean }>[]
  expect(arr[0].props.selected).toBe(false)
  expect(arr[1].props.selected).toBe(true)
  expect(arr[2].props.selected).toBe(false)
})

test('mapChildrenWithSelection: 클릭 시 해당 인덱스로 onSelect를 호출한다', () => {
  // Arrange
  const onSelect = vi.fn()
  const children = [<Center key="0" />, <Center key="1" />]

  // Act
  const result = mapChildrenWithSelection(children, 0, onSelect)
  const arr = Children.toArray(result) as ReactElement<{ onClick?: () => void }>[]
  arr[1].props.onClick?.()

  // Assert
  expect(onSelect).toHaveBeenCalledWith(1)
})

test('mapChildrenWithSelection: displayName이 Indicator로 끝나는 자식은 선택 인덱스에서 제외된다', () => {
  // Arrange
  const ActiveIndicator = (_: { children?: React.ReactNode }) => null
  ActiveIndicator.displayName = 'ActiveIndicator'
  const children = [<ActiveIndicator key="i" />, <Center key="0" />, <Center key="1" />]

  // Act
  const result = mapChildrenWithSelection(children, 1, () => {})

  // Assert
  const arr = Children.toArray(result) as ReactElement<{ selected?: boolean }>[]
  expect(arr[0].props.selected).toBeUndefined() // Indicator는 주입 제외
  expect(arr[1].props.selected).toBe(false) // 선택 가능 index 0
  expect(arr[2].props.selected).toBe(true) // 선택 가능 index 1 === selectedIndex
})

test('mapChildrenWithSelection: object가 아닌 자식(문자열)은 인덱스 소비 없이 그대로 반환한다', () => {
  // Arrange: 문자열 자식은 선택 대상이 아니다
  const children = ['plain text', <Center key="0" />]

  // Act
  const result = mapChildrenWithSelection(children, 0, () => {})

  // Assert
  const arr = Children.toArray(result) as Array<string | ReactElement<{ selected?: boolean }>>
  expect(arr[0]).toBe('plain text')
  expect((arr[1] as ReactElement<{ selected?: boolean }>).props.selected).toBe(true)
})
