import { renderHook, act } from '@testing-library/react'
import { beforeAll, expect, test, vi, afterAll } from 'vitest'

import { createRAFStub } from '../test-utils'

import { useAnimationFrame } from './useAnimationFrame'

const rafStub = createRAFStub()

beforeAll(() => {
  vi.stubGlobal('requestAnimationFrame', rafStub.init)
})

afterAll(() => {
  vi.unstubAllGlobals()
})

test('매 프레임 사이 시간 증분을 콜백으로 전달한다', () => {
  // Arrange
  const callback = vi.fn()

  // Act
  renderHook(() => useAnimationFrame(callback))
  rafStub.step()

  // Assert
  rafStub.step(1000)
  expect(callback).toHaveBeenCalledWith(expect.closeTo(1000, 5))

  rafStub.step(1000)
  expect(callback).toHaveBeenCalledWith(expect.closeTo(1000, 5))
})

test('프레임 호출을 중단하거나 재개할 수 있다', () => {
  // Arrange
  const callback = vi.fn()
  const cancel = vi.fn()

  vi.stubGlobal('cancelAnimationFrame', cancel)

  // Act
  const { result } = renderHook(() => useAnimationFrame(callback))

  act(() => {
    result.current.pause()
  })

  // Assert
  expect(cancel).toBeCalled()

  act(() => {
    result.current.resume()

    rafStub.step()
    rafStub.step(1000)
  })

  expect(callback).toBeCalled()
})
