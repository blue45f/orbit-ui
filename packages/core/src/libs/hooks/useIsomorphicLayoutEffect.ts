import { useLayoutEffect } from 'react'

export const useIsomorphicLayoutEffect: typeof useLayoutEffect =
  typeof window === 'undefined' ? () => undefined : useLayoutEffect
