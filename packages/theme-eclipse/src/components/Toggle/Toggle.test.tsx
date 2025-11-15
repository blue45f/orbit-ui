import { render, cleanup } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'

import { Toggle } from './Toggle'

afterEach(() => cleanup())

describe('Toggle.Input', () => {
  test('label 요소와 연결할 수 있다', () => {
    const { getByLabelText } = render(
      <>
        <label htmlFor="my-switch">레이블</label>
        <Toggle id="my-switch" />
      </>
    )

    expect(getByLabelText('레이블')).toBeInTheDocument()
  })
})
