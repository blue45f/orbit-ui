import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

import { screen, render, cleanup } from '../../test-utils'

import { ListNode } from './ListNode'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test('Leading, Center, Trailing 모두 렌더링된다.', () => {
  render(
    <ListNode>
      <ListNode.Leading>Leading Content</ListNode.Leading>
      <ListNode.Center>Center Content</ListNode.Center>
      <ListNode.Trailing>Trailing Content</ListNode.Trailing>
    </ListNode>
  )

  expect(screen.getByText('Leading Content')).toBeInTheDocument()
  expect(screen.getByText('Center Content')).toBeInTheDocument()
  expect(screen.getByText('Trailing Content')).toBeInTheDocument()
})

test('as prop이 없을 경우 기본적으로 div로 렌더링된다.', () => {
  render(
    <ListNode data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')
  expect(element.tagName).toBe('DIV')
})

test('as="li"로 설정하면 li 요소로 렌더링된다.', () => {
  render(
    <ListNode as="li" data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')
  expect(element.tagName).toBe('LI')
})

test('as="button"으로 설정하면 button 요소로 렌더링된다.', () => {
  render(
    <ListNode as="button" data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')
  expect(element.tagName).toBe('BUTTON')
})

test('as="button"일 때 클릭 이벤트 핸들러가 호출된다.', async () => {
  const clickHandler = vi.fn()

  render(
    <ListNode as="button" onClick={clickHandler}>
      <ListNode.Center>Clickable Content</ListNode.Center>
    </ListNode>
  )

  await userEvent.click(screen.getByRole('button'))
  expect(clickHandler).toHaveBeenCalledTimes(1)
})

test('as="button"이고 disabled일 경우 클릭해도 핸들러가 호출되지 않는다.', async () => {
  const clickHandler = vi.fn()

  render(
    <ListNode as="button" disabled onClick={clickHandler}>
      <ListNode.Center>Disabled Content</ListNode.Center>
    </ListNode>
  )

  await userEvent.click(screen.getByRole('button'))
  expect(clickHandler).not.toHaveBeenCalled()
})

test('as="div"일 때 disabled prop이 전달되어도 영향을 주지 않는다.', () => {
  render(
    <ListNode as="div" disabled data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')
  expect(element).not.toHaveAttribute('disabled')
})

test('focus 이벤트 핸들러가 호출된다.', () => {
  const focusHandler = vi.fn()

  render(
    <ListNode as="button" onFocus={focusHandler}>
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const button = screen.getByRole('button')
  button.focus()

  expect(focusHandler).toHaveBeenCalledTimes(1)
})

test('blur 이벤트 핸들러가 호출된다.', () => {
  const blurHandler = vi.fn()

  render(
    <ListNode as="button" onBlur={blurHandler}>
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const button = screen.getByRole('button')
  button.focus()
  button.blur()

  expect(blurHandler).toHaveBeenCalledTimes(1)
})

test('className이 제대로 적용된다.', () => {
  render(
    <ListNode className="custom-class" data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')
  expect(element).toHaveClass('custom-class')
})

test('style이 제대로 적용된다.', () => {
  render(
    <ListNode style={{ backgroundColor: 'red' }} data-testid="list-node">
      <ListNode.Center>Content</ListNode.Center>
    </ListNode>
  )

  const element = screen.getByTestId('list-node')

  expect(element.style.backgroundColor).toBe('red')
})

test('Center만 있어도 렌더링된다.', () => {
  render(
    <ListNode>
      <ListNode.Center>Center Only</ListNode.Center>
    </ListNode>
  )

  expect(screen.getByText('Center Only')).toBeInTheDocument()
})

test('Leading과 Center만 있어도 렌더링된다.', () => {
  render(
    <ListNode>
      <ListNode.Leading>Leading</ListNode.Leading>
      <ListNode.Center>Center</ListNode.Center>
    </ListNode>
  )

  expect(screen.getByText('Leading')).toBeInTheDocument()
  expect(screen.getByText('Center')).toBeInTheDocument()
})

test('Center와 Trailing만 있어도 렌더링된다.', () => {
  render(
    <ListNode>
      <ListNode.Center>Center</ListNode.Center>
      <ListNode.Trailing>Trailing</ListNode.Trailing>
    </ListNode>
  )

  expect(screen.getByText('Center')).toBeInTheDocument()
  expect(screen.getByText('Trailing')).toBeInTheDocument()
})
