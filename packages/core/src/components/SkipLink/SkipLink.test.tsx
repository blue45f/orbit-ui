import { createRef } from 'react'
import { afterEach, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { SkipLink } from './SkipLink'

afterEach(() => cleanup())

test('SkipLink: 기본 텍스트와 main 대상으로 렌더링된다', () => {
  // Arrange & Act
  render(<SkipLink />)
  const link = screen.getByRole('link', { name: '본문 바로가기' })

  // Assert
  expect(link).toBeInTheDocument()
  expect(link).toHaveAttribute('href', '#main')
})

test('SkipLink: targetId 로 href 가 결정된다', () => {
  // Arrange & Act
  render(<SkipLink targetId="content">콘텐츠로 이동</SkipLink>)

  // Assert
  expect(screen.getByRole('link', { name: '콘텐츠로 이동' })).toHaveAttribute('href', '#content')
})

test('SkipLink: targetId 에 선행 # 이 있어도 중복되지 않는다', () => {
  // Arrange & Act
  render(<SkipLink targetId="#main" />)

  // Assert
  expect(screen.getByRole('link')).toHaveAttribute('href', '#main')
})

test('SkipLink: 평소에는 화면 밖으로 숨겨져 있다 (translate)', () => {
  // Arrange & Act
  render(<SkipLink />)
  const link = screen.getByRole('link')

  // Assert — 평소에는 화면 위로 밀려 시각적으로 숨겨진다
  expect(link).toHaveClass('-translate-y-[200%]')
  // 포커스를 받으면 화면 안으로 돌아오는 클래스도 존재한다
  expect(link).toHaveClass('focus:translate-y-0')
})

test('SkipLink: 포커스를 받을 수 있다', () => {
  // Arrange
  render(<SkipLink />)
  const link = screen.getByRole('link')

  // Act
  link.focus()

  // Assert
  expect(link).toHaveFocus()
})

test('SkipLink: ref 를 anchor 엘리먼트로 전달한다', () => {
  // Arrange
  const ref = createRef<HTMLAnchorElement>()

  // Act
  render(<SkipLink ref={ref} />)

  // Assert
  expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
})

test('SkipLink: 사용자가 전달한 className 을 병합한다', () => {
  // Arrange & Act
  render(<SkipLink className="custom-class" />)

  // Assert
  expect(screen.getByRole('link')).toHaveClass('custom-class')
})
