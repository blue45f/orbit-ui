import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../test-utils'

import { Tab } from './TabItem'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('Tab', () => {
  test('Center 텍스트가 렌더링된다', () => {
    render(
      <Tab value="home">
        <Tab.Center>Home</Tab.Center>
      </Tab>
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('Leading/Center/Trailing 슬롯이 모두 렌더링된다', () => {
    render(
      <Tab value="x">
        <Tab.Leading>L</Tab.Leading>
        <Tab.Center>C</Tab.Center>
        <Tab.Trailing>T</Tab.Trailing>
      </Tab>
    )

    expect(screen.getByText('L')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
    expect(screen.getByText('T')).toBeInTheDocument()
  })

  test('tab 역할로 렌더링된다', () => {
    render(
      <Tab value="tab">
        <Tab.Center>Tab</Tab.Center>
      </Tab>
    )

    expect(screen.getByRole('tab')).toBeInTheDocument()
  })

  test('클릭 시 onClick 핸들러가 호출된다', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Tab value="click" onClick={onClick}>
        <Tab.Center>Click</Tab.Center>
      </Tab>
    )

    await user.click(screen.getByRole('tab'))
    expect(onClick).toHaveBeenCalled()
  })

  test('selected 상태를 전달할 수 있다', () => {
    render(
      <Tab value="sel" selected>
        <Tab.Center>Selected</Tab.Center>
      </Tab>
    )

    expect(screen.getByText('Selected')).toBeInTheDocument()
  })

  test('ref를 전달할 수 있다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <Tab value="ref" ref={ref}>
        <Tab.Center>Ref</Tab.Center>
      </Tab>
    )

    expect(ref.current).not.toBeNull()
    expect(ref.current?.tagName).toBe('BUTTON')
  })
})
