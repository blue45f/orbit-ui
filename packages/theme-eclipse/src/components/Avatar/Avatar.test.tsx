import { afterEach, describe, expect, test } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { Avatar } from './Avatar'

afterEach(() => cleanup())

describe('Avatar', () => {
  test('Fallback이 렌더된다', () => {
    render(
      <Avatar>
        <Avatar.Fallback>HJ</Avatar.Fallback>
      </Avatar>
    )
    expect(screen.getByText('HJ')).toBeInTheDocument()
  })

  test('Image 서브컴포넌트가 정의되어 있다', () => {
    // Image 렌더는 비동기로 load 결과에 따라 결정됨 (jsdom에선 fallback이 보이므로)
    // 서브컴포넌트가 존재함을 검증
    expect(Avatar.Image).toBeDefined()
    expect(Avatar.Fallback).toBeDefined()
  })

  test('className이 적용된다', () => {
    render(
      <Avatar className="custom-class" data-testid="avatar">
        <Avatar.Fallback>X</Avatar.Fallback>
      </Avatar>
    )
    expect(screen.getByTestId('avatar')).toHaveClass('custom-class')
  })
})
