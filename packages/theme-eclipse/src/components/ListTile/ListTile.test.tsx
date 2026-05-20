import { afterEach, describe, expect, test, vi } from 'vitest'

import { render, screen, cleanup } from '../../test-utils'

import { ListTile } from './ListTile'

afterEach(() => cleanup())

describe('ListTile', () => {
  test('Title이 렌더된다', () => {
    render(
      <ListTile>
        <ListTile.Title>Title</ListTile.Title>
      </ListTile>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  test('Title과 Description이 함께 렌더된다', () => {
    render(
      <ListTile>
        <ListTile.Title>제목</ListTile.Title>
        <ListTile.Description>설명</ListTile.Description>
      </ListTile>
    )
    expect(screen.getByText('제목')).toBeInTheDocument()
    expect(screen.getByText('설명')).toBeInTheDocument()
  })

  test('Leading/Trailing 서브컴포넌트가 렌더된다', () => {
    render(
      <ListTile>
        <ListTile.Leading>
          <span data-testid="lead">L</span>
        </ListTile.Leading>
        <ListTile.Title>제목</ListTile.Title>
        <ListTile.Trailing>
          <span data-testid="trail">T</span>
        </ListTile.Trailing>
      </ListTile>
    )
    expect(screen.getByTestId('lead')).toBeInTheDocument()
    expect(screen.getByTestId('trail')).toBeInTheDocument()
  })

  test('as="button"으로 클릭 가능하게 만들 수 있다', () => {
    const onClick = vi.fn()
    render(
      <ListTile as="button" onClick={onClick}>
        <ListTile.Title>제목</ListTile.Title>
      </ListTile>
    )
    const btn = screen.getByRole('button')
    btn.click()
    expect(onClick).toHaveBeenCalled()
  })

  test('disabled 상태에서는 클릭 핸들러가 호출되지 않는다', () => {
    const onClick = vi.fn()
    render(
      <ListTile as="button" disabled onClick={onClick}>
        <ListTile.Title>제목</ListTile.Title>
      </ListTile>
    )
    screen.getByRole('button').click()
    expect(onClick).not.toHaveBeenCalled()
  })

  test('fontWeight prop이 Title에 적용된다', () => {
    const { rerender } = render(
      <ListTile>
        <ListTile.Title fontWeight="regular">x</ListTile.Title>
      </ListTile>
    )
    const before = screen.getByText('x').outerHTML

    rerender(
      <ListTile>
        <ListTile.Title fontWeight="bold">x</ListTile.Title>
      </ListTile>
    )
    const after = screen.getByText('x').outerHTML
    expect(after).not.toBe(before)
  })
})
