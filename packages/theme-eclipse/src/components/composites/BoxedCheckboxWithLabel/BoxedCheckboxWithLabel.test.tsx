import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../../test-utils'

import { BoxedCheckboxWithLabel } from './BoxedCheckboxWithLabel'

beforeAll(() => {
  console.error = vi.fn()
})

describe('BoxedCheckboxWithLabel (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('label children과 함께 checkbox role로 렌더링된다', () => {
    render(<BoxedCheckboxWithLabel>약관 동의</BoxedCheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByText('약관 동의')).toBeInTheDocument()
  })

  test('label과 checkbox가 htmlFor로 연결되어 있다', () => {
    render(<BoxedCheckboxWithLabel>약관 동의</BoxedCheckboxWithLabel>)
    expect(screen.getByLabelText('약관 동의')).toBeInTheDocument()
  })

  test('checked prop이 true이면 aria-checked가 true다', () => {
    render(<BoxedCheckboxWithLabel checked>옵션</BoxedCheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked prop이 false이면 aria-checked가 false다', () => {
    render(<BoxedCheckboxWithLabel checked={false}>옵션</BoxedCheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
  })

  test('체크박스 클릭 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<BoxedCheckboxWithLabel onChange={onChange}>옵션</BoxedCheckboxWithLabel>)

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn()
    render(
      <BoxedCheckboxWithLabel disabled onChange={onChange}>
        옵션
      </BoxedCheckboxWithLabel>
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onChange).not.toHaveBeenCalled()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<BoxedCheckboxWithLabel ref={ref}>옵션</BoxedCheckboxWithLabel>)

    expect(ref.current).toBe(screen.getByRole('checkbox'))
  })

  test('id를 명시적으로 전달하면 label htmlFor와 일치한다', () => {
    render(<BoxedCheckboxWithLabel id="bcb-id">레이블</BoxedCheckboxWithLabel>)
    const label = screen.getByText('레이블').closest('label')
    expect(label).toHaveAttribute('for', 'bcb-id')
  })

  test('children이 없으면 label 요소를 렌더링하지 않는다', () => {
    render(<BoxedCheckboxWithLabel />)
    expect(screen.queryByRole('checkbox')).toBeInTheDocument()
    expect(document.querySelector('label')).toBeNull()
  })
})
