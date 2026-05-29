import { expect, test, vi } from 'vitest'

import { listen, parseSelectValue, setNativeValue } from './dom'

test('setNativeValue: input value를 설정하고 change 이벤트를 발생시킨다', () => {
  // Arrange
  const input = document.createElement('input')
  const onChange = vi.fn()
  input.addEventListener('change', onChange)

  // Act
  setNativeValue(input, 'hello')

  // Assert
  expect(input.value).toBe('hello')
  expect(onChange).toHaveBeenCalledOnce()
})

test('parseSelectValue: 단일 선택은 선택된 value 문자열을 반환한다', () => {
  // Arrange
  const select = document.createElement('select')
  const a = document.createElement('option')
  a.value = 'a'
  const b = document.createElement('option')
  b.value = 'b'
  select.append(a, b)
  select.value = 'b'

  // Act & Assert
  expect(parseSelectValue(select)).toBe('b')
})

test('parseSelectValue: multiple 선택은 선택된 value 배열을 반환한다', () => {
  // Arrange
  const select = document.createElement('select')
  select.multiple = true
  const a = document.createElement('option')
  a.value = 'a'
  const b = document.createElement('option')
  b.value = 'b'
  const c = document.createElement('option')
  c.value = 'c'
  select.append(a, b, c)
  a.selected = true
  c.selected = true

  // Act & Assert
  expect(parseSelectValue(select)).toEqual(['a', 'c'])
})

test('listen: 리스너를 등록하고 반환된 정리 함수로 해제한다', () => {
  // Arrange
  const target = document.createElement('button')
  const handler = vi.fn()

  // Act: 등록 후 클릭
  const clear = listen(target, 'click', handler)
  target.dispatchEvent(new Event('click'))

  // Assert
  expect(handler).toHaveBeenCalledOnce()

  // Act: 해제 후 클릭
  clear()
  target.dispatchEvent(new Event('click'))

  // Assert: 더 이상 호출되지 않는다
  expect(handler).toHaveBeenCalledOnce()
})
