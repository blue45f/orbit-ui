import { useCallback, useState } from 'react'

function readVariable(name: string, el: HTMLElement): string {
  return getComputedStyle(el).getPropertyValue(name).trim()
}

function resolveElement(
  element?: { current: HTMLElement | null } | null,
): HTMLElement | null {
  if (typeof document === 'undefined') return null
  if (element === undefined || element === null) return document.documentElement
  return element.current
}

export function useCssVariable(
  name: string,
  element?: { current: HTMLElement | null } | null,
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(() => {
    const el = resolveElement(element)
    if (!el) return ''
    return readVariable(name, el)
  })

  const setProperty = useCallback(
    (newValue: string) => {
      const el = resolveElement(element)
      if (!el) return
      el.style.setProperty(name, newValue)
      setValue(newValue)
    },
    [name, element],
  )

  return [value, setProperty]
}
