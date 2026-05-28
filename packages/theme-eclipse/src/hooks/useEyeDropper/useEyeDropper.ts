import { useState } from 'react'

export type EyeDropperState = {
  isSupported: boolean
  sRGBHex: string | null
  open: () => Promise<string | null>
  error: Error | null
}

type EyeDropperInstance = {
  open: () => Promise<{ sRGBHex: string }>
}

type WindowWithEyeDropper = typeof window & {
  EyeDropper: new () => EyeDropperInstance
}

export function useEyeDropper(): EyeDropperState {
  const isSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const [sRGBHex, setSRGBHex] = useState<string | null>(null)
  const [error, setError] = useState<Error | null>(null)

  const open = async (): Promise<string | null> => {
    if (!isSupported) return null
    try {
      const dropper = new (window as WindowWithEyeDropper).EyeDropper()
      const result = await dropper.open()
      setSRGBHex(result.sRGBHex)
      setError(null)
      return result.sRGBHex
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
      return null
    }
  }

  return { isSupported, sRGBHex, open, error }
}
