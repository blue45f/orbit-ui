import { expect, test } from 'vitest'

import { cn } from './cn'

test('cn: tailwind 충돌 클래스는 마지막 값이 이긴다', () => {
  expect(cn('px-4', 'px-6')).toBe('px-6')
})

test('cn: 충돌하지 않는 클래스는 보존하고 충돌만 정리한다', () => {
  const result = cn('px-4 py-2', 'px-6')
  expect(result).toContain('px-6')
  expect(result).toContain('py-2')
  expect(result).not.toContain('px-4')
})

test('cn: falsy/조건부 값은 무시한다', () => {
  expect(cn('text-red-500', false, undefined, null, 'font-bold')).toBe('text-red-500 font-bold')
})

test('cn: 객체 문법으로 truthy 키만 적용한다', () => {
  expect(cn({ 'bg-red-500': true, 'bg-green-500': false })).toBe('bg-red-500')
})
