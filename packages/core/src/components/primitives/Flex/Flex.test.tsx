import { afterEach, describe, expect, test } from 'vitest'

import { screen, render, cleanup } from '../../../test-utils'

import { Flex } from './Flex'
import * as styles from './Flex.css'

afterEach(() => cleanup())

/** 'var(--rowGap__123abc)' 형식을 갖는 `CSSVarFunction` 타입에서 괄호 안 속성만 추출 */
const extractCustomProp = (cssVar: string): string => cssVar.match(/var\((.+)\)/)?.[1] || ''

test('gap 관련 prop이 없으면 CSS 변수를 설정하지 않는다', () => {
  render(<Flex data-testid='flex' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('')
  expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('')
})

test('rowGap prop이 있으면 CSS 변수를 설정한다', () => {
  render(<Flex data-testid='flex' rowGap='10px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
  expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('')
})

test('columnGap prop이 있으면 CSS 변수를 설정한다', () => {
  render(<Flex data-testid='flex' columnGap='20px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('')
  expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
})

test('rowGap과 columnGap prop이 모두 있으면 CSS 변수를 모두 설정한다', () => {
  render(<Flex data-testid='flex' rowGap='10px' columnGap='20px' />)

  const flex = screen.getByTestId('flex')

  expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
  expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
})

describe('flexWrap과 관계없이 gap이 설정된다', () => {
  test('flexWrap: nowrap일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexWrap='nowrap' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
    expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
  })

  test('flexWrap: wrap일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexWrap='wrap' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
    expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
  })
})

describe('flexDirection과 관계없이 gap이 설정된다', () => {
  test('flexDirection: row일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexDirection='row' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
    expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
  })

  test('flexDirection: column일 때도 gap이 설정된다', () => {
    render(<Flex data-testid='flex' flexDirection='column' rowGap='10px' columnGap='20px' />)

    const flex = screen.getByTestId('flex')

    expect(flex.style.getPropertyValue(extractCustomProp(styles.rowGap))).toBe('10px')
    expect(flex.style.getPropertyValue(extractCustomProp(styles.columnGap))).toBe('20px')
  })
})
