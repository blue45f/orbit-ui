import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'

import { cleanup, render, screen } from '../../../test-utils'

import { CheckboxWithLabel } from './CheckboxWithLabel'

beforeAll(() => {
  console.error = vi.fn()
})

describe('CheckboxWithLabel (eclipse)', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  test('label children과 함께 checkbox role로 렌더링된다', () => {
    render(<CheckboxWithLabel>약관 동의</CheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByText('약관 동의')).toBeInTheDocument()
  })

  test('label 클릭으로 체크박스를 선택할 수 있다 (htmlFor 연결)', () => {
    render(<CheckboxWithLabel>약관 동의</CheckboxWithLabel>)
    expect(screen.getByLabelText('약관 동의')).toBeInTheDocument()
  })

  test('checked prop이 true이면 aria-checked가 true다', () => {
    render(<CheckboxWithLabel checked>옵션</CheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  test('checked prop이 false이면 aria-checked가 false다', () => {
    render(<CheckboxWithLabel checked={false}>옵션</CheckboxWithLabel>)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'false')
  })

  test('체크박스 클릭 시 onChange가 호출된다', async () => {
    const onChange = vi.fn()
    render(<CheckboxWithLabel onChange={onChange}>옵션</CheckboxWithLabel>)

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  test('disabled이면 클릭해도 onChange가 호출되지 않는다', async () => {
    const onChange = vi.fn()
    render(
      <CheckboxWithLabel disabled onChange={onChange}>
        옵션
      </CheckboxWithLabel>
    )

    await userEvent.click(screen.getByRole('checkbox'))

    expect(onChange).not.toHaveBeenCalled()
  })

  test('ref가 button 요소에 부착된다', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<CheckboxWithLabel ref={ref}>옵션</CheckboxWithLabel>)

    expect(ref.current).toBe(screen.getByRole('checkbox'))
  })

  test('id를 명시적으로 전달하면 label htmlFor와 일치한다', () => {
    render(<CheckboxWithLabel id="custom-id">레이블</CheckboxWithLabel>)
    const label = screen.getByText('레이블').closest('label')
    expect(label).toHaveAttribute('for', 'custom-id')
  })

  test('children이 없으면 label 요소를 렌더링하지 않는다', () => {
    render(<CheckboxWithLabel data-testid="cb" />)
    expect(screen.queryByRole('checkbox')).toBeInTheDocument()
    expect(document.querySelector('label')).toBeNull()
  })
})
