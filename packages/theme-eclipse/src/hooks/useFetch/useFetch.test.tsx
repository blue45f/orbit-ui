import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { useFetch } from './useFetch'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('useFetch', () => {
  it('initial state is loading on first render', () => {
    vi.spyOn(window, 'fetch').mockReturnValue(new Promise(() => {}))
    let capturedStatus: string | undefined
    renderHook(() => {
      const state = useFetch('/api/test')
      if (capturedStatus === undefined) capturedStatus = state.status
      return state
    })
    expect(capturedStatus).toBe('loading')
  })

  it('returns success state after successful fetch', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    } as Response)

    const { result } = renderHook(() => useFetch<{ id: number }>('/api/test'))

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.status).toBe('success')
    expect(result.current.data).toEqual({ id: 1 })
    expect(result.current.error).toBeNull()
  })

  it('returns error state after failed fetch', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response)

    const { result } = renderHook(() => useFetch('/api/missing'))

    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.status).toBe('error')
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeInstanceOf(Error)
  })

  it('refetch triggers a new request and re-enters loading', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    } as Response)

    const { result } = renderHook(() => useFetch<{ id: number }>('/api/test'))
    await act(async () => {
      await Promise.resolve()
    })
    expect(result.current.status).toBe('success')
    expect(fetchSpy).toHaveBeenCalledTimes(1)

    // refetch: loading으로 재진입(L26) + counter 증가로 재요청(L27)
    act(() => result.current.refetch())
    expect(result.current.status).toBe('loading')

    await act(async () => {
      await Promise.resolve()
    })
    expect(result.current.status).toBe('success')
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })
})
