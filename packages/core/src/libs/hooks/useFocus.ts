import { FocusEventHandler, MouseEventHandler, RefObject, useRef, useState } from 'react'

type UseFocusParameters<T extends HTMLElement> = {
  disabled?: boolean
  onFocus?: FocusEventHandler<T>
  onBlur?: FocusEventHandler<T>
}

type UseFocusReturnValue<T extends HTMLElement> = {
  isFocused: boolean
  ref: RefObject<T>
  focusElement: () => void
  preventElementBlur: MouseEventHandler<HTMLOrSVGElement>
  /** DOM-safe handlers (only onFocus/onBlur). Safe to spread onto elements. */
  handlers: Pick<UseFocusParameters<T>, 'onFocus' | 'onBlur'>
  onFocus: FocusEventHandler<T>
  onBlur: FocusEventHandler<T>
}

export const useFocus = <T extends HTMLElement>(params: UseFocusParameters<T>): UseFocusReturnValue<T> => {
  const ref = useRef<T>(null)
  const [isFocused, setIsFocused] = useState(false)

  const onFocus: FocusEventHandler<T> = (e) => {
    if (params?.disabled) return
    setIsFocused(true)
    params.onFocus?.(e)
  }

  const onBlur: FocusEventHandler<T> = (e) => {
    setIsFocused(false)
    params.onBlur?.(e)
  }

  const focusElement = () => {
    ref.current?.focus()
  }

  // NOTE: Prevent blur event when clicking on the element
  const preventElementBlur: MouseEventHandler<HTMLElement> = (e) => {
    if (e.target !== ref.current) {
      e.preventDefault()
    }
  }

  return {
    isFocused,
    onFocus,
    onBlur,
    focusElement,
    ref: ref as RefObject<T>,
    preventElementBlur,
    handlers: { onFocus, onBlur },
  }
}
