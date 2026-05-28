import { useEffect, useState } from 'react'

export type GamepadState = {
  gamepads: (Gamepad | null)[]
  isSupported: boolean
}

export function useGamepad(): GamepadState {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'

  const [gamepads, setGamepads] = useState<(Gamepad | null)[]>([])

  useEffect(() => {
    if (!isSupported) return

    const update = () => {
      setGamepads(Array.from(navigator.getGamepads()))
    }

    window.addEventListener('gamepadconnected', update)
    window.addEventListener('gamepaddisconnected', update)

    return () => {
      window.removeEventListener('gamepadconnected', update)
      window.removeEventListener('gamepaddisconnected', update)
    }
  }, [isSupported])

  return { gamepads, isSupported }
}
