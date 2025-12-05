import { screen, render, cleanup } from '@testing-library/react'
import { afterEach, beforeAll, expect, test, vi } from 'vitest'

import { IconPropsContext, IconRoot } from './IconRoot'

const DEFAULT_SIZE = '24'

beforeAll(() => {
  console.warn = vi.fn()
})

afterEach(() => cleanup())

test('size 프롭이 있으면 그 크기를 사용한다', () => {
  render(<IconRoot size={50}>icon</IconRoot>)

  expect(screen.getByText('icon')).toHaveAttribute('width', '50')
  expect(screen.getByText('icon')).toHaveAttribute('height', '50')
})

test('size 프롭이 없고 IconPropsContext에 size가 있으면 그 크기를 사용한다', () => {
  render(
    <IconPropsContext.Provider value={{ size: 72 }}>
      <IconRoot>icon</IconRoot>
    </IconPropsContext.Provider>,
  )

  expect(screen.getByText('icon')).toHaveAttribute('width', '72')
  expect(screen.getByText('icon')).toHaveAttribute('height', '72')
})

test('size 프롭도 없고 IconPropsContext도 없으면 기본 값을 사용한다', () => {
  render(<IconRoot>icon</IconRoot>)

  expect(screen.getByText('icon')).toHaveAttribute('width', DEFAULT_SIZE)
  expect(screen.getByText('icon')).toHaveAttribute('height', DEFAULT_SIZE)
})

test('size 프롭은 px, rem 단위를 지원한다', () => {
  render(<IconRoot size='50px'>px</IconRoot>)

  expect(screen.getByText('px')).toHaveAttribute('width', '50px')
  expect(screen.getByText('px')).toHaveAttribute('height', '50px')

  render(<IconRoot size='50rem'>rem</IconRoot>)

  expect(screen.getByText('rem')).toHaveAttribute('width', '50rem')
  expect(screen.getByText('rem')).toHaveAttribute('height', '50rem')
})

test('유효하지 않은 size 프롭이 전달되면 기본 값을 사용한다', () => {
  render(<IconRoot size={0}>zero</IconRoot>)

  expect(screen.getByText('zero')).toHaveAttribute('width', DEFAULT_SIZE)
  expect(screen.getByText('zero')).toHaveAttribute('height', DEFAULT_SIZE)

  render(<IconRoot size='-50px'>negative</IconRoot>)

  expect(screen.getByText('negative')).toHaveAttribute('width', DEFAULT_SIZE)
  expect(screen.getByText('negative')).toHaveAttribute('height', DEFAULT_SIZE)

  render(<IconRoot size={Infinity}>infinity</IconRoot>)

  expect(screen.getByText('infinity')).toHaveAttribute('width', DEFAULT_SIZE)
  expect(screen.getByText('infinity')).toHaveAttribute('height', DEFAULT_SIZE)
})

test('color 프롭이 없으면 기본 값은 currentColor다', () => {
  render(<IconRoot>icon</IconRoot>)

  expect(screen.getByText('icon')).toHaveStyle({ fill: 'currentColor' })
})

test('alt 프롭이 있으면 aria-label 속성을 할당한다', () => {
  render(<IconRoot alt='라벨'>icon</IconRoot>)

  expect(screen.queryByLabelText('라벨')).toBeInTheDocument()
})

test('title 프롭이 있으면 aria-labelledby 속성과 연결된 title 태그가 제공된다', () => {
  render(<IconRoot title='제목'>icon</IconRoot>)

  expect(screen.getByRole('img')).toHaveAccessibleName('제목')

  const titleID = screen.getByText('제목').getAttribute('id')
  expect(screen.getByRole('img')).toHaveAttribute('aria-labelledby', titleID)
})

test('description 프롭이 있으면 aria-describedby 속성과 연결된 desc 태그가 제공된다', () => {
  render(<IconRoot description='설명'>icon</IconRoot>)

  expect(screen.getByRole('img')).toHaveAccessibleDescription('설명')

  const descID = screen.getByText('설명').getAttribute('id')
  expect(screen.getByRole('img')).toHaveAttribute('aria-describedby', descID)
})

test('alt, title, description 프롭이 모두 없다면 role 속성 없이 aria-hidden 속성만 할당한다', () => {
  render(<IconRoot>icon</IconRoot>)

  expect(screen.getByText('icon')).not.toHaveAttribute('role')
  expect(screen.getByText('icon')).toHaveAttribute('aria-hidden', 'true')
})

test('접근성 속성이 하나라도 있다면 기본 role은 img이고 재정의할 수 있다', () => {
  render(<IconRoot alt='대체 문구'>default</IconRoot>)

  expect(screen.getByText('default')).toHaveAttribute('role', 'img')

  render(
    <IconRoot role='progressbar' alt='대체 문구'>
      custom
    </IconRoot>,
  )

  expect(screen.getByText('custom')).toHaveAttribute('role', 'progressbar')
})
