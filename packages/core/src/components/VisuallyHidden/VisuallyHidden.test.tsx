import { createRef } from 'react'
import { afterEach, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { VisuallyHidden } from './VisuallyHidden'

afterEach(() => cleanup())

test('VisuallyHidden: 콘텐츠가 접근성 트리(DOM)에는 존재한다', () => {
  // Arrange & Act
  render(<VisuallyHidden>저장됨</VisuallyHidden>)

  // Assert — 텍스트는 DOM/접근성 트리에 그대로 노출된다 (스크린 리더가 읽을 수 있음)
  expect(screen.getByText('저장됨')).toBeInTheDocument()
})

test('VisuallyHidden: 시각적으로 감추는 sr-only 클래스가 적용된다', () => {
  // Arrange & Act
  render(<VisuallyHidden>저장됨</VisuallyHidden>)
  const node = screen.getByText('저장됨')

  // Assert — sr-only 기법(절대배치 + 1px 클리핑)이 클래스로 적용된다.
  // (jsdom 단위 환경에는 Tailwind 컴파일 스타일시트가 없어 computed style 대신 클래스로 검증한다.)
  expect(node).toHaveClass('absolute')
  expect(node).toHaveClass('h-px')
  expect(node).toHaveClass('w-px')
  expect(node).toHaveClass('overflow-hidden')

  // 접근성 트리에서 제거하는 display:none / visibility:hidden 은 쓰지 않는다.
  expect(node.className).not.toMatch(/(^|\s)hidden(\s|$)/)
  expect(node.className).not.toContain('invisible')
})

test('VisuallyHidden: 기본적으로 span 으로 렌더링된다', () => {
  // Arrange & Act
  render(<VisuallyHidden>건너뛰기</VisuallyHidden>)

  // Assert
  expect(screen.getByText('건너뛰기').tagName).toBe('SPAN')
})

test('VisuallyHidden: as prop 으로 태그를 바꿀 수 있다', () => {
  // Arrange & Act
  render(<VisuallyHidden as="div">상태</VisuallyHidden>)

  // Assert
  expect(screen.getByText('상태').tagName).toBe('DIV')
})

test('VisuallyHidden: ref 를 루트 엘리먼트로 전달한다', () => {
  // Arrange
  const ref = createRef<HTMLSpanElement>()

  // Act
  render(<VisuallyHidden ref={ref}>라벨</VisuallyHidden>)

  // Assert
  expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  expect(ref.current?.textContent).toBe('라벨')
})

test('VisuallyHidden: 사용자가 전달한 className 을 병합한다', () => {
  // Arrange & Act
  render(<VisuallyHidden className="custom-class">라벨</VisuallyHidden>)

  // Assert
  const node = screen.getByText('라벨')
  expect(node).toHaveClass('custom-class')
  expect(node).toHaveClass('absolute')
})
