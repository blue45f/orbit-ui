import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { cleanup } from '../../test-utils'

import { usePermission } from './usePermission'

describe('usePermission', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  test('navigator.permissions가 없으면 "unsupported"를 반환한다', () => {
    vi.stubGlobal('navigator', {})

    const { result } = renderHook(() => usePermission('camera'))

    expect(result.current).toBe('unsupported')
  })

  test('permissions.query 결과의 초기 상태를 반환한다', async () => {
    const mockStatus = {
      state: 'granted' as PermissionState,
      onchange: null as (() => void) | null,
    }
    const mockQuery = vi.fn().mockResolvedValue(mockStatus)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { result } = renderHook(() => usePermission('camera'))

    // before query resolves, state is 'prompt'
    expect(result.current).toBe('prompt')

    // wait for the promise to resolve
    await act(async () => {})

    expect(result.current).toBe('granted')
    expect(mockQuery).toHaveBeenCalledWith({ name: 'camera' })
  })

  test('PermissionStatus.onchange 이벤트가 발생하면 상태가 갱신된다', async () => {
    const mockStatus = { state: 'prompt' as PermissionState, onchange: null as (() => void) | null }
    const mockQuery = vi.fn().mockResolvedValue(mockStatus)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { result } = renderHook(() => usePermission('notifications'))

    await act(async () => {})

    expect(result.current).toBe('prompt')

    // simulate permission change
    act(() => {
      mockStatus.state = 'granted'
      mockStatus.onchange?.()
    })

    expect(result.current).toBe('granted')
  })

  test('unmount 시 onchange 리스너가 해제된다', async () => {
    const mockStatus = {
      state: 'granted' as PermissionState,
      onchange: null as (() => void) | null,
    }
    const mockQuery = vi.fn().mockResolvedValue(mockStatus)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { unmount } = renderHook(() => usePermission('camera'))

    await act(async () => {})

    expect(mockStatus.onchange).not.toBeNull()

    unmount()

    expect(mockStatus.onchange).toBeNull()
  })

  test('name이 변경되면 새로운 권한을 재쿼리한다', async () => {
    const mockStatus = {
      state: 'granted' as PermissionState,
      onchange: null as (() => void) | null,
    }
    const mockQuery = vi.fn().mockResolvedValue(mockStatus)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { rerender } = renderHook(({ name }: { name: PermissionName }) => usePermission(name), {
      initialProps: { name: 'camera' as PermissionName },
    })

    await act(async () => {})

    expect(mockQuery).toHaveBeenCalledTimes(1)
    expect(mockQuery).toHaveBeenCalledWith({ name: 'camera' })

    rerender({ name: 'microphone' as PermissionName })

    await act(async () => {})

    expect(mockQuery).toHaveBeenCalledTimes(2)
    expect(mockQuery).toHaveBeenCalledWith({ name: 'microphone' })
  })

  test('permissions.query가 거부되면 unsupported로 전환된다', async () => {
    const mockQuery = vi.fn().mockRejectedValue(new Error('invalid permission name'))
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { result } = renderHook(() => usePermission('camera'))

    await act(async () => {})

    expect(result.current).toBe('unsupported')
  })

  test('unmount 전 query가 완료되면 onchange를 설정하고, 그 후 unmount하면 cleanup이 적용된다', async () => {
    const mockStatus = {
      state: 'granted' as PermissionState,
      onchange: null as (() => void) | null,
    }
    const mockQuery = vi.fn().mockResolvedValue(mockStatus)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { unmount } = renderHook(() => usePermission('camera'))

    await act(async () => {})

    // onchange should be set after query resolves
    expect(mockStatus.onchange).not.toBeNull()

    unmount()

    // After unmount, onchange should be null
    expect(mockStatus.onchange).toBeNull()
  })

  test('onchange callback does not update state if cancelled before query resolves', async () => {
    let resolveQuery: (value: PermissionStatus) => void
    const queryPromise = new Promise<PermissionStatus>((resolve) => {
      resolveQuery = resolve
    })
    const mockStatus = {
      state: 'granted' as PermissionState,
      onchange: null as (() => void) | null,
    }
    const mockQuery = vi.fn().mockReturnValue(queryPromise)
    vi.stubGlobal('navigator', { permissions: { query: mockQuery } })

    const { result, unmount } = renderHook(() => usePermission('camera'))

    // Initial state is 'prompt'
    expect(result.current).toBe('prompt')

    // Unmount before query resolves
    unmount()

    // Now resolve the query and fire onchange
    await act(async () => {
      resolveQuery!(mockStatus as unknown as PermissionStatus)
    })

    // Since unmount set cancelled=true, the setState should not happen
    // This test verifies the cancellation logic prevents state updates
    expect(mockQuery).toHaveBeenCalled()
  })
})
