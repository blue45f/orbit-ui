import { createRef } from 'react'
import { afterEach, describe, expect, test } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { AvatarComponent as Avatar } from './Avatar'

afterEach(() => cleanup())

describe('Avatar', () => {
  test('컴포넌트가 정상적으로 렌더링된다.', () => {
    render(
      <Avatar data-testid="avatar">
        <Avatar.Fallback>HJ</Avatar.Fallback>
      </Avatar>
    )

    expect(screen.getByTestId('avatar')).toBeInTheDocument()
  })

  test('ref가 root 요소에 전달된다.', () => {
    const ref = createRef<HTMLSpanElement>()
    render(
      <Avatar ref={ref} data-testid="avatar">
        <Avatar.Fallback>HJ</Avatar.Fallback>
      </Avatar>
    )

    expect(ref.current).toBe(screen.getByTestId('avatar'))
  })

  test('Fallback이 렌더링된다.', () => {
    render(
      <Avatar>
        <Avatar.Fallback>FB</Avatar.Fallback>
      </Avatar>
    )

    expect(screen.getByText('FB')).toBeInTheDocument()
  })

  test('전달된 className이 적용된다.', () => {
    render(
      <Avatar data-testid="avatar" className="custom-avatar">
        <Avatar.Fallback>HJ</Avatar.Fallback>
      </Avatar>
    )

    expect(screen.getByTestId('avatar')).toHaveClass('custom-avatar')
  })

  test('Fallback에 className이 적용된다.', () => {
    render(
      <Avatar>
        <Avatar.Fallback data-testid="fallback" className="my-fallback">
          HJ
        </Avatar.Fallback>
      </Avatar>
    )

    expect(screen.getByTestId('fallback')).toHaveClass('my-fallback')
  })

  test('Image 컴포넌트를 사용할 수 있다.', () => {
    render(
      <Avatar>
        <Avatar.Image src="https://example.com/avatar.png" alt="user" />
        <Avatar.Fallback>HJ</Avatar.Fallback>
      </Avatar>
    )

    // Radix는 이미지 로드 전 fallback을 표시
    expect(screen.getByText('HJ')).toBeInTheDocument()
  })
})
