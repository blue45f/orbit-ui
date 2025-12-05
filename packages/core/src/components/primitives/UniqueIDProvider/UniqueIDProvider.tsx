import React, { createContext, useContext, useMemo, useRef } from 'react'

const Context = createContext<React.MutableRefObject<number> | null>(null)

interface Props {
  /** UniqueIDProvider 내부에 렌더링되는 요소 */
  children: React.ReactNode
}

/**
 * ### 💡 알아두기
 * - 최상위 경로에 배치해 각 컴포넌트에 고유 ID를 전달해요.
 *
 * @example
 * ### 👇 기본 사용법
 * ```
 * <UniqueIDProvider>
 *   {children}
 * </UniqueIDProvider>
 * ```
 */
export const UniqueIDProvider: React.FC<Props> = ({ children }) => {
  const contextValue = useRef(0)

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

// 항상 존재하지 않는 메서드 접근 시 발생하는 빌드 에러 우회 방안:
// https://github.com/webpack/webpack/issues/14814#issuecomment-1013856049
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const maybeReactUseId: (() => string) | undefined = (React as any)['useId' + '']

/**
 * ### 💡 알아두기
 * - a11y 속성 연결, SSR hydration mismatch 방지에 활용할 고유 ID 생성기예요.
 * - 컴포넌트 배치와 hook 호출 순서를 기반으로 고유값을 생성해요.
 * - `UniqueIDProvider` 컴포넌트 내에서만 활용할 수 있어요.
 *
 * @param idOverride 사용처에서 직접 지정하는 ID
 * @returns ID 문자열
 */
export const useUniqueID = (idOverride?: string): string => {
  const context = useContext(Context)

  if (context === null) {
    throw new Error('useUniqueID hook은 UniqueIDProvider 내에서만 사용 가능합니다')
  }

  // 런타임에서 `React.useId`는 항상 있거나 없으므로 분기 내 hook 선언을 허용함
  if (maybeReactUseId !== undefined) {
    return idOverride ?? maybeReactUseId()
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMemo(() => {
    if (idOverride) {
      return idOverride
    }

    context.current += 1

    return `ui-forge-id-${context.current}`

    // context는 ref 값이므로 의존성 배열에서 제외함
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOverride])
}
