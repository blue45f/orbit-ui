import { useEffect, useRef, useState } from 'react'

/**
 * value값이 변경되었는지 여부를 판단해요
 * @param value 변경되었는지 체크할 값
 * @returns value값이 처음으로 변경되었는지 여부
 */
export function useValueChanged<T>(value: T): boolean {
  const [changed, setChanged] = useState(false)
  const prevValue = useRef<T>(value)

  useEffect(() => {
    if (!changed && prevValue.current !== value) {
      setChanged(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return changed
}
