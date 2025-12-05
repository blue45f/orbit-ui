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
} & Pick<UseFocusParameters<T>, 'onFocus' | 'onBlur'>

export const useFocus = <T extends HTMLElement>(params: UseFocusParameters<T>): UseFocusReturnValue<T> => {
  const ref = useRef<T>(null)
  const [isFocused, setIsFocused] = useState(false)

  const onFocus: UseFocusParameters<T>['onFocus'] = (e) => {
    if (params?.disabled) return
    setIsFocused(true)
    params.onFocus?.(e)
  }

  const onBlur: UseFocusParameters<T>['onBlur'] = (e) => {
    setIsFocused(false)
    params.onBlur?.(e)
  }

  const focusElement = () => {
    ref.current?.focus()
  }

  // NOTE: Prevent blur event when clicking on the element
  const preventElementBlur: MouseEventHandler<HTMLElement> = (e) => {
    e.target !== ref.current && e.preventDefault()
  }
  return { isFocused, onFocus, onBlur, focusElement, ref: ref as RefObject<T>, preventElementBlur }
}
