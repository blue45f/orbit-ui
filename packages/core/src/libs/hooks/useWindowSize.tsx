import { useState } from 'react'

import { setupContext } from '../core/context'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

type WindowSize = { width: number; height: number }

const [WindowSizeBaseProvider, useWindowSizeContext] = setupContext<{
  size: WindowSize
  setSize: (size: WindowSize) => void
}>('WindowSize')

export const WindowSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [size, setSize] = useState({ width: 0, height: 0 })

  return (
    <WindowSizeBaseProvider size={size} setSize={setSize}>
      {children}
    </WindowSizeBaseProvider>
  )
}

export const useWindowSize = (): WindowSize => {
  const { size, setSize } = useWindowSizeContext('useWindowSize')

  useIsomorphicLayoutEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}
