import { memo } from 'react'
import { IconRoot } from '../IconRoot'
import type { IconProps } from '../types'

function RadioThumbIcon(props: IconProps) {
  return (
  <IconRoot {...props}>
    <circle cx='12.5' cy='12' r='4' />
  </IconRoot>
  )
}

RadioThumbIcon.displayName = 'RadioThumbIcon'

export default memo(RadioThumbIcon)
export { RadioThumbIcon }
