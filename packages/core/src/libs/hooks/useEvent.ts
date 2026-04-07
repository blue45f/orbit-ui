import { useRef, useCallback, useLayoutEffect } from 'react'

/**
 *
 * [React.useEvent](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)를 모사한 코드
 * - 렌더링될 때 마다 의존성 배열에 의해 useEffect가 호출되는 것을 방지하기 위해 사용해요.
 *
 */
export const useEvent = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  F extends (...args: any[]) => any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  P extends any[] = Parameters<F>,
  R = ReturnType<F>,
>(
  cb: (...args: P) => R
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
) => {
  const cache = useRef(cb)

  useLayoutEffect(() => {
    cache.current = cb
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: P) => cache.current(...args), [])
}
