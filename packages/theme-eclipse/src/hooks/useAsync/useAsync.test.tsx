import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useAsync } from './useAsync'

afterEach(() => {
  cleanup()
})

describe('useAsync', () => {
  it('immediate=false이면 초기 상태는 idle이다', () => {
    const asyncFn = vi.fn().mockResolvedValue('data')
    const { result } = renderHook(() => useAsync(asyncFn))

    expect(result.current.status).toBe('idle')
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
    expect(asyncFn).not.toHaveBeenCalled()
  })

  it('run() 호출 시 pending → success로 전환된다', async () => {
    const asyncFn = vi.fn().mockResolvedValue('hello')
    const { result } = renderHook(() => useAsync(asyncFn))

    const runPromise = act(async () => {
      await result.current.run()
    })

    await runPromise

    expect(result.current.status).toBe('success')
    expect(result.current.data).toBe('hello')
    expect(result.current.error).toBeUndefined()
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isPending).toBe(false)
  })

  it('run() 호출 중에는 pending 상태다', async () => {
    let resolvePromise!: (value: string) => void
    const asyncFn = vi.fn(
      () => new Promise<string>((res) => { resolvePromise = res }),
    )

    const { result } = renderHook(() => useAsync(asyncFn))

    act(() => {
      void result.current.run()
    })

    expect(result.current.status).toBe('pending')
    expect(result.current.isPending).toBe(true)
    expect(result.current.isIdle).toBe(false)

    await act(async () => {
      resolvePromise('done')
    })

    expect(result.current.status).toBe('success')
  })

  it('asyncFn이 reject하면 pending → error로 전환된다', async () => {
    const asyncFn = vi.fn().mockRejectedValue(new Error('something went wrong'))
    const { result } = renderHook(() => useAsync(asyncFn))

    await act(async () => {
      await result.current.run()
    })

    expect(result.current.status).toBe('error')
    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('something went wrong')
    expect(result.current.data).toBeUndefined()
    expect(result.current.isError).toBe(true)
    expect(result.current.isPending).toBe(false)
  })

  it('Error 인스턴스가 아닌 reject 값도 Error로 래핑된다', async () => {
    const asyncFn = vi.fn().mockRejectedValue('raw string error')
    const { result } = renderHook(() => useAsync(asyncFn))

    await act(async () => {
      await result.current.run()
    })

    expect(result.current.error).toBeInstanceOf(Error)
    expect(result.current.error?.message).toBe('raw string error')
  })

  it('reset()을 호출하면 idle 상태로 돌아간다', async () => {
    const asyncFn = vi.fn().mockResolvedValue('data')
    const { result } = renderHook(() => useAsync(asyncFn))

    await act(async () => {
      await result.current.run()
    })
    expect(result.current.status).toBe('success')

    act(() => {
      result.current.reset()
    })

    expect(result.current.status).toBe('idle')
    expect(result.current.data).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(result.current.isIdle).toBe(true)
  })

  it('immediate=true이면 마운트 시 자동으로 실행된다', async () => {
    const asyncFn = vi.fn().mockResolvedValue('auto')

    const { result } = renderHook(() =>
      useAsync(asyncFn, { immediate: true }),
    )

    // 마운트 직후에는 pending 또는 success(마이크로태스크 후)
    // act로 모든 비동기를 flush
    await act(async () => {
      await Promise.resolve()
    })

    expect(asyncFn).toHaveBeenCalledTimes(1)
    expect(result.current.status).toBe('success')
    expect(result.current.data).toBe('auto')
  })

  it('run을 두 번 빠르게 호출하면 첫 번째 결과는 무시된다 (stale 방지)', async () => {
    let resolve1!: (value: string) => void
    let resolve2!: (value: string) => void

    const asyncFn = vi
      .fn()
      .mockImplementationOnce(
        () => new Promise<string>((res) => { resolve1 = res }),
      )
      .mockImplementationOnce(
        () => new Promise<string>((res) => { resolve2 = res }),
      )

    const { result } = renderHook(() => useAsync(asyncFn))

    // 첫 번째 run 시작 (완료 전)
    act(() => {
      void result.current.run()
    })

    // 두 번째 run 시작 (첫 번째가 아직 완료되지 않은 상태)
    act(() => {
      void result.current.run()
    })

    // 두 번째 먼저 완료
    await act(async () => {
      resolve2('second')
    })

    expect(result.current.status).toBe('success')
    expect(result.current.data).toBe('second')

    // 첫 번째 뒤늦게 완료 — stale이므로 무시되어야 함
    await act(async () => {
      resolve1('first')
    })

    expect(result.current.data).toBe('second')
  })

  it('모든 boolean 플래그가 status와 일치한다', async () => {
    const asyncFn = vi.fn().mockResolvedValue(42)
    const { result } = renderHook(() => useAsync(asyncFn))

    // idle
    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)

    await act(async () => {
      await result.current.run()
    })

    // success
    expect(result.current.isIdle).toBe(false)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(true)
    expect(result.current.isError).toBe(false)

    act(() => {
      result.current.reset()
    })

    // back to idle
    expect(result.current.isIdle).toBe(true)
    expect(result.current.isPending).toBe(false)
    expect(result.current.isSuccess).toBe(false)
    expect(result.current.isError).toBe(false)
  })
})
