import React, { PropsWithChildren, useMemo } from 'react'

/**
 * 메모이징을 적용한 프로바이더와, 이 프로바이더에 대응하는 컨슈머 훅을 `[프로바이더, 컨슈머]` 튜플로 반환해요.
 *
 * {@link https://github.com/radix-ui/primitives/tree/b324ec2d7ddf13a2a115cb5b11478e24d2f45b87/packages/react/context Radix UI}에서 일부 따옴
 *
 * @param providerName 컨텍스트를 제공할 루트 컴포넌트의 이름. 컨텍스트 프로바이더의 `displayName`과 컨슈머 오류 메시지에 사용해요.
 * @param defaultValue 컨텍스트 프로바이더를 찾을 수 없을 때 대신 사용할 기본값. 지정하지 않으면 이 컨텍스트는 필수 컨텍스트가 돼요. (컨슈머 훅에서 오류 발생 가능)
 *
 * @template ContextValue 컨텍스트 값의 타입
 *
 * @example
 * type FooContextType = {
 *   a: number
 *   b: string
 * }
 *
 * const [FooProvider, useFooContext] = setupContext<FooContextType>('FooRoot')
 *
 * const FooBody = () => {
 *   const context = useFooContext()
 * }
 *
 * const FooRoot = () => {
 *   <FooProvider a={3} b='uhhuh'>
 *     <FooBody />
 *   </FooProvider>
 * }
 */
export function setupContext<ContextValue extends object>(
  providerName: string,
  defaultValue?: ContextValue
): [
  React.FC<PropsWithChildren<ContextValue>>,
  (consumerName: string) => PropsWithChildren<ContextValue>,
] {
  const Context = React.createContext<ContextValue | undefined>(defaultValue)

  const Provider: React.FC<PropsWithChildren<ContextValue>> = ({ children, ...providerProps }) => {
    // 프로바이더를 리렌더링하는 것은 자제...?
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = useMemo(() => providerProps as ContextValue, Object.values(providerProps))

    return <Context.Provider value={value}>{children}</Context.Provider>
  }
  Provider.displayName = providerName + 'Provider'

  const useContext = ((consumerName: string) => {
    const context = React.useContext(Context)
    if (context) {
      return context
    }
    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new Error(`${consumerName} 컴포넌트는 ${providerName} 컴포넌트 아래에 위치해야 합니다. `)
  }) as () => ContextValue

  return [Provider, useContext]
}
