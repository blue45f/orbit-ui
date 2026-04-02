import { afterEach, describe, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../../test-utils'

import { Flex } from './Flex'

afterEach(() => cleanup())

test('gap 관련 prop이 없으면 gap 스타일을 설정하지 않는다', () => {
  render(<Flex data-testid='flex' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.rowGap).toBe('')
  expect(flex.style.columnGap).toBe('')
  expect(flex.style.gap).toBe('')
})

test('rowGap prop이 있으면 rowGap 스타일을 설정한다', () => {
  render(<Flex data-testid='flex' rowGap='10px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.rowGap).toBe('10px')
  expect(flex.style.columnGap).toBe('')
})

test('columnGap prop이 있으면 columnGap 스타일을 설정한다', () => {
  render(<Flex data-testid='flex' columnGap='20px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.rowGap).toBe('')
  expect(flex.style.columnGap).toBe('20px')
})

test('rowGap과 columnGap prop이 모두 있으면 스타일을 모두 설정한다', () => {
  render(<Flex data-testid='flex' rowGap='10px' columnGap='20px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.rowGap).toBe('10px')
  expect(flex.style.columnGap).toBe('20px')
})

describe('flexWrap과 관계없이 gap이 설정된다', () => {
  test('flexWrap: nowrap일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexWrap='nowrap' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.rowGap).toBe('10px')
    expect(flex.style.columnGap).toBe('20px')
  })

  test('flexWrap: wrap일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexWrap='wrap' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.rowGap).toBe('10px')
    expect(flex.style.columnGap).toBe('20px')
  })
})

describe('flexDirection과 관계없이 gap이 설정된다', () => {
  test('flexDirection: row일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexDirection='row' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.rowGap).toBe('10px')
    expect(flex.style.columnGap).toBe('20px')
  })

  test('flexDirection: column일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexDirection='column' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.rowGap).toBe('10px')
    expect(flex.style.columnGap).toBe('20px')
  })
})
