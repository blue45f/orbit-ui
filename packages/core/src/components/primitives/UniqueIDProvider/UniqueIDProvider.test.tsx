import { screen, render, cleanup, renderHook } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'

import { UniqueIDProvider, useUniqueID } from './UniqueIDProvider'

afterEach(() => cleanup())

test('children을 렌더링한다', () => {
  // Arrange & Act
  render(
    <UniqueIDProvider>
      <>children</>
    </UniqueIDProvider>
  )

  // Assert
  expect(screen.getByText('children')).toBeInTheDocument()
})

test('useUniqueID hook은 고유 ID를 반환한다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useUniqueID(), {
    wrapper: UniqueIDProvider,
  })

  // Assert
  expect(typeof result.current).toBe('string')
})

test('useUniqueID hook은 UniqueIDProvider 내에서만 사용 가능하다', () => {
  // Arrange: 콘솔 에러 off
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

  // Act & Assert
  expect(() => {
    renderHook(() => useUniqueID())
  }).toThrow('useUniqueID hook은 UniqueIDProvider 내에서만 사용 가능합니다')

  // 콘솔 에러 복원
  consoleSpy.mockRestore()
})

test('useUniqueID hook마다 고유한 ID를 반환한다', () => {
  // Arrange & Act: 2개의 hook 생성 및 호출
  const { result } = renderHook(
    () => ({
      firstHook: useUniqueID(),
      secondHook: useUniqueID(),
    }),
    {
      wrapper: UniqueIDProvider,
    }
  )

  // Assert
  expect(result.current.firstHook).not.toBe(result.current.secondHook)
})

test('useUniqueID hook에 원하는 ID 값을 직접 전달할 수 있다', () => {
  // Arrange & Act
  const { result } = renderHook(() => useUniqueID('idOverride'), {
    wrapper: UniqueIDProvider,
  })

  expect(result.current).toBe('idOverride')
})

test('useUniqueID hook은 렌더링이 반복되어도 동일한 값을 반환한다', () => {
  // Arrange
  const { result, rerender } = renderHook(() => useUniqueID(), {
    wrapper: UniqueIDProvider,
  })

  // Act
  const initialId = result.current
  rerender()
  const afterFirstRerender = result.current
  rerender()
  const afterSecondRerender = result.current

  // Assert
  expect(initialId).toBe(afterFirstRerender)
  expect(afterFirstRerender).toBe(afterSecondRerender)
})

test('React.useId hook은 context value보다 우선 순위를 가진다', () => {
  // Arrange & Act: React 18/19 런타임에는 React.useId가 존재하므로
  // context 기반 카운터(`orbit-ui-id-N`) 대신 React.useId가 우선 사용된다.
  const { result } = renderHook(() => useUniqueID(), {
    wrapper: UniqueIDProvider,
  })

  // Assert: context fallback 포맷이 아니어야 React.useId 경로가 우선했음을 의미한다.
  // (`maybeReactUseId`가 모듈 로드 시점에 캡처되어 사후 mocking이 불가하므로,
  //  반환 ID의 시그니처로 우선순위를 검증한다)
  expect(result.current).not.toMatch(/^orbit-ui-id-\d+$/)
  expect(result.current).toBeTruthy()
})
