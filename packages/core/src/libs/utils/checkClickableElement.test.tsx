import { cleanup } from '@testing-library/react'
import { afterEach, expect, describe, test, beforeEach } from 'vitest'

import { checkClickableElement } from './checkClickableElement'

afterEach(() => {
  cleanup()
})

describe('checkClickableElement', () => {
  const mockEvent: Partial<React.MouseEvent> = {}
  let targetElement = document.createElement('div')
  let clickableElement = document.createElement('button')
  let nonClickableElement = document.createElement('div')

  beforeEach(() => {
    targetElement = document.createElement('div')
    clickableElement = document.createElement('button')
    nonClickableElement = document.createElement('div')
    mockEvent.target = targetElement
  })

  test('상위에 currentTarget이 아닌 클릭가능한 요소가 없다면 false를 반환한다.', () => {
    clickableElement.appendChild(targetElement)
    mockEvent.currentTarget = clickableElement

    const result = checkClickableElement(mockEvent as React.MouseEvent)
    expect(result).toBe(false)
  })

  test('상위에 currentTarget이 아닌 클릭 가능한 요소가 있으면 true를 반환한다', () => {
    nonClickableElement.appendChild(clickableElement)
    clickableElement.appendChild(targetElement)
    mockEvent.currentTarget = nonClickableElement

    const result = checkClickableElement(mockEvent as React.MouseEvent)
    expect(result).toBe(true)
  })

  test('stopCheckCount가 0보다 작으면 false를 반환한다.', () => {
    mockEvent.currentTarget = nonClickableElement
    const result = checkClickableElement(mockEvent as React.MouseEvent, { stopCheckCount: 0 })
    expect(result).toBe(false)
  })
})
