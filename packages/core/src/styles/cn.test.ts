import { expect, test } from 'vitest'

import { cn, stateClasses, variants } from './cn'

/* ── cn ─────────────────────────────────────────────────────── */

test('cn: tailwind 충돌 클래스는 마지막 값이 이긴다', () => {
  // 같은 속성(padding-x)은 뒤가 앞을 덮어쓴다
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

/* ── stateClasses ───────────────────────────────────────────── */

test('stateClasses: disabled면 disabled, 아니면 enabled 클래스를 적용한다', () => {
  const fn = stateClasses({ base: 'btn', enabled: 'cursor-pointer', disabled: 'opacity-50' })
  expect(fn({ disabled: true })).toBe('btn opacity-50')
  expect(fn({ disabled: false })).toBe('btn cursor-pointer')
})

test('stateClasses: focused일 때만 focused 클래스를 추가한다', () => {
  const fn = stateClasses({ base: 'btn', focused: 'ring-2' })
  expect(fn({ focused: true })).toContain('ring-2')
  expect(fn({ focused: false })).not.toContain('ring-2')
})

test('stateClasses: disabled면 hovered/pressed 클래스를 억제한다', () => {
  // 충돌하지 않는 유틸(underline/scale-95)을 써서 twMerge 정리가 아닌 억제 로직만 검증
  const fn = stateClasses({
    base: 'btn',
    disabled: 'opacity-50',
    hovered: 'underline',
    pressed: 'scale-95',
  })
  const result = fn({ disabled: true, hovered: true, pressed: true })
  expect(result).not.toContain('underline')
  expect(result).not.toContain('scale-95')
})

test('stateClasses: 활성 상태에서는 hovered/pressed 클래스를 적용한다', () => {
  const fn = stateClasses({ base: 'btn', hovered: 'underline', pressed: 'scale-95' })
  const result = fn({ hovered: true, pressed: true })
  expect(result).toContain('underline')
  expect(result).toContain('scale-95')
})

/* ── variants ───────────────────────────────────────────────── */

test('variants: 선택한 variant 클래스를 base와 함께 적용한다', () => {
  const button = variants({
    base: 'btn',
    variants: {
      color: { primary: 'bg-blue-500', secondary: 'bg-gray-500' },
      size: { sm: 'text-sm', lg: 'text-lg' },
    },
  })
  const result = button({ color: 'secondary', size: 'lg' })
  expect(result).toContain('btn')
  expect(result).toContain('bg-gray-500')
  expect(result).toContain('text-lg')
})

test('variants: props 미지정 시 defaultVariants를 적용한다', () => {
  const button = variants({
    base: 'btn',
    variants: { color: { primary: 'bg-blue-500', secondary: 'bg-gray-500' } },
    defaultVariants: { color: 'primary' },
  })
  expect(button()).toContain('bg-blue-500')
})
