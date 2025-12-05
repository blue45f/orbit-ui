import { describe, expect, test } from 'vitest'

import { createDOMRect } from '../test-utils'

import { computeThreshold } from './useSwipe'

describe('threshold 계산', () => {
  const rect = createDOMRect({ x: 0, y: 0, width: 1000, height: 500 })

  test('% 단위가 아니면 px 값을 반환한다', () => {
    // Assert
    expect(computeThreshold({ axis: 'x', threshold: 20 }, rect)).toBe(20)
    expect(computeThreshold({ axis: 'x', threshold: '20px' }, rect)).toBe(20)
  })

  test('% 단위인 경우 axis와 요소 크기를 기준으로 threshold를 계산한다', () => {
    // Assert
    expect(computeThreshold({ axis: 'x', threshold: '20%' }, rect)).toBe(200)
    expect(computeThreshold({ axis: 'y', threshold: '20%' }, rect)).toBe(100)
  })
})
