import { useEffect, useState } from 'react'

export type GamepadState = {
  gamepads: (Gamepad | null)[]
  isSupported: boolean
}

export function useGamepad(): GamepadState {
  const isSupported =
    typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'

  const [gamepads, setGamepads] = useState<(Gamepad | null)[]>([])

  useEffect(() => {
    if (!isSupported) return

    const update = () => {
      setGamepads(Array.from(navigator.getGamepads()))
    }

    globalThis.addEventListener('gamepadconnected', update)
    globalThis.addEventListener('gamepaddisconnected', update)

    return () => {
      globalThis.removeEventListener('gamepadconnected', update)
      globalThis.removeEventListener('gamepaddisconnected', update)
    }
  }, [isSupported])

  return { gamepads, isSupported }
}
