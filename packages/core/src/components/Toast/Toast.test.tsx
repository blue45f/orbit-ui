import { afterEach, beforeEach, describe, expect, test } from 'vitest'

import { cleanup, render, waitFor } from '../../test-utils'

import { Toaster, toast } from './Toast'

beforeEach(() => {
  // sonner는 이전 toast 상태를 모듈 레벨에 유지하므로 매 테스트마다 비운다.
  toast.dismiss()
})

afterEach(() => {
  cleanup()
  // 잔여 Toaster 포털 정리
  document.querySelectorAll('[data-sonner-toaster]').forEach((el) => el.remove())
})

describe('Toast', () => {
  test('Toaster 컴포넌트가 toast 호출 후 정상적으로 렌더링된다.', async () => {
    render(<Toaster />)

    toast('테스트 메시지')

    // Sonner는 document.body에 포털로 마운트하므로 document 단위로 찾는다.
    await waitFor(() => {
      expect(document.querySelector('[data-sonner-toaster]')).toBeTruthy()
    })
  })

  test('Toaster에 position prop을 전달하면 data-y-position에 반영된다.', async () => {
    render(<Toaster position="top-right" duration={3000} />)

    toast('테스트')

    await waitFor(() => {
      const toaster = document.querySelector('[data-sonner-toaster]')
      expect(toaster).toBeTruthy()
      expect(toaster).toHaveAttribute('data-y-position', 'top')
    })
  })

  test('toast 함수가 export된다.', () => {
    expect(typeof toast).toBe('function')
  })

  test('toast.success, toast.error 등의 메서드가 존재한다.', () => {
    expect(typeof toast.success).toBe('function')
    expect(typeof toast.error).toBe('function')
    expect(typeof toast.dismiss).toBe('function')
  })
})
