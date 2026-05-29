import { expect, test } from 'vitest'

import { layerVars } from './Layer'
import { padding, paddingHorizontal, paddingVertical, radius, textStyle } from './shorthand'

test('paddingVertical: top/bottom padding 변수를 설정한다', () => {
  expect(paddingVertical('8px')).toEqual({
    [layerVars.paddingTop]: '8px',
    [layerVars.paddingBottom]: '8px',
  })
})

test('paddingHorizontal: left/right padding 변수를 설정한다', () => {
  expect(paddingHorizontal('12px')).toEqual({
    [layerVars.paddingLeft]: '12px',
    [layerVars.paddingRight]: '12px',
  })
})

test('padding: 네 방향 padding 변수를 모두 설정한다', () => {
  expect(padding('4px')).toEqual({
    [layerVars.paddingTop]: '4px',
    [layerVars.paddingRight]: '4px',
    [layerVars.paddingBottom]: '4px',
    [layerVars.paddingLeft]: '4px',
  })
})

test('radius: 기본값(all)은 네 모서리를 모두 설정한다', () => {
  expect(radius('6px')).toEqual({
    [layerVars.radiusTopLeft]: '6px',
    [layerVars.radiusTopRight]: '6px',
    [layerVars.radiusBottomRight]: '6px',
    [layerVars.radiusBottomLeft]: '6px',
  })
})

test('radius: top은 위쪽 두 모서리만 설정한다', () => {
  expect(radius('6px', 'top')).toEqual({
    [layerVars.radiusTopLeft]: '6px',
    [layerVars.radiusTopRight]: '6px',
  })
})

test('radius: left는 왼쪽 두 모서리만 설정한다', () => {
  expect(radius('6px', 'left')).toEqual({
    [layerVars.radiusTopLeft]: '6px',
    [layerVars.radiusBottomLeft]: '6px',
  })
})

test('radius: 단일 모서리(bottom-right)만 설정한다', () => {
  expect(radius('6px', 'bottom-right')).toEqual({
    [layerVars.radiusBottomRight]: '6px',
  })
})

test('textStyle: 제공된 값에 해당하는 변수만 포함한다', () => {
  expect(textStyle({ textStyleSize: '14px', textStyleWeight: '600' })).toEqual({
    '--layer-text-size': '14px',
    '--layer-text-weight': '600',
  })
})

test('textStyle: 값이 없으면 빈 객체를 반환한다', () => {
  expect(textStyle({})).toEqual({})
})
