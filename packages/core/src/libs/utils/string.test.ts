import { expect, test } from 'vitest'

import { toCSSLength, toNumberRatio } from './string'

test('toNumberRatio: "width:height" 문자열을 height / width 비율로 변환한다', () => {
  // Act & Assert
  expect(toNumberRatio('16:9')).toBe(9 / 16)
  expect(toNumberRatio('4:3')).toBe(3 / 4)
  expect(toNumberRatio('2:1')).toBe(0.5)
})

test('toNumberRatio: 정사각형 비율(1:1)은 1을 반환한다', () => {
  // Act & Assert
  expect(toNumberRatio('1:1')).toBe(1)
})

test('toCSSLength: 숫자는 기본 단위 px를 붙여 반환한다', () => {
  // Act & Assert
  expect(toCSSLength(100)).toBe('100px')
})

test('toCSSLength: 단위를 지정하면 해당 단위를 붙인다', () => {
  // Act & Assert
  expect(toCSSLength(50, '%')).toBe('50%')
  expect(toCSSLength(2, 'rem')).toBe('2rem')
})

test('toCSSLength: 0은 falsy지만 단위를 붙여 "0px"로 반환한다', () => {
  // Act & Assert: 0이 빈 문자열로 처리되지 않아야 한다
  expect(toCSSLength(0)).toBe('0px')
})

test('toCSSLength: 문자열은 단위를 붙이지 않고 그대로 반환한다', () => {
  // Act & Assert
  expect(toCSSLength('50%')).toBe('50%')
  expect(toCSSLength('100px')).toBe('100px')
})

test('toCSSLength: undefined/null/미전달은 빈 문자열을 반환한다', () => {
  // Act & Assert
  expect(toCSSLength(undefined)).toBe('')
  expect(toCSSLength(null as unknown as undefined)).toBe('')
  expect(toCSSLength()).toBe('')
})
